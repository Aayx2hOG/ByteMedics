import { WebSocketServer, WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { prismaClient } from "db/client";
import {
    ChatMessageCreateSchema,
    type ChatMessageCreate
} from "validator";
import { AI_SERVICE_URL } from '../config.js';

const prisma = prismaClient;
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

interface AuthenticatedWebSocket extends WebSocket {
    userId?: string;
    email?: string;
    sessionId?: string;
}

interface WebSocketMessage {
    type: 'join_session' | 'send_message' | 'typing' | 'stop_typing' | 'heartbeat';
    sessionId?: string;
    message?: string;
    sender?: string;
    role?: 'USER' | 'BOT';
    data?: any;
}

class ChatWebSocketServer {
    private wss: WebSocketServer;
    private clients: Map<string, Set<AuthenticatedWebSocket>> = new Map(); // sessionId -> clients
    private userSessions: Map<string, string> = new Map(); // userId -> sessionId

    constructor(port: number) {
        this.wss = new WebSocketServer({
            port,
            verifyClient: this.verifyClient.bind(this)
        });

        this.wss.on('connection', this.handleConnection.bind(this));
        console.log(`WebSocket Chat server running on port ${port}`);
    }

    private async callAIService(message: string, sessionId: string, userId: string): Promise<string | null> {
        try {
            const response = await axios.post(`${AI_SERVICE_URL}/chat`, {
                message: message,
                sessionId: sessionId,
                userId: userId
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000 // 10 second timeout
            });

            return response.data.response || null;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // Server responded with error status
                    console.error('AI service error:', error.response.status, error.response.data);
                } else if (error.request) {
                    // Request made but no response received
                    console.error('AI service timeout or connection error:', error.message);
                } else {
                    // Request setup error
                    console.error('AI service request setup error:', error.message);
                }
            } else {
                console.error('Failed to call AI service:', error);
            }
            return null;
        }
    }

    private verifyClient(info: { origin: string; secure: boolean; req: IncomingMessage }): boolean {
        const url = new URL(info.req.url!, `ws://localhost`);
        const token = url.searchParams.get('token');

        if (!token) {
            console.log('WebSocket connection rejected: No token provided');
            return false;
        }

        try {
            jwt.verify(token, JWT_SECRET);
            return true;
        } catch (error) {
            console.log('WebSocket connection rejected: Invalid token');
            return false;
        }
    }

    private async handleConnection(ws: AuthenticatedWebSocket, req: IncomingMessage) {
        console.log('New WebSocket connection');

        const url = new URL(req.url!, `ws://localhost`);
        const token = url.searchParams.get('token');

        if (!token) {
            ws.close(1008, 'Token required');
            return;
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as any;
            ws.userId = decoded.userId;
            ws.email = decoded.email;

            console.log(`User ${ws.email} connected via WebSocket`);

            ws.on('message', (data: Buffer) => {
                this.handleMessage(ws, data);
            });

            ws.on('close', () => {
                this.handleDisconnection(ws);
            });

            ws.on('error', (error) => {
                console.error('WebSocket error:', error);
            });

            // Send welcome message
            this.sendToClient(ws, {
                type: 'connection_established',
                data: {
                    message: 'Connected to chat server',
                    userId: ws.userId
                }
            });

        } catch (error) {
            console.error('Error authenticating WebSocket:', error);
            ws.close(1008, 'Invalid token');
        }
    }

    private async handleMessage(ws: AuthenticatedWebSocket, data: Buffer) {
        try {
            const message: WebSocketMessage = JSON.parse(data.toString());
            console.log(`=== WEBSOCKET MESSAGE RECEIVED ===`);
            console.log(`Raw data:`, data.toString());
            console.log(`Parsed message:`, JSON.stringify(message, null, 2));
            console.log(`Message type:`, message.type);

            switch (message.type) {
                case 'join_session':
                    await this.handleJoinSession(ws, message);
                    break;

                case 'send_message':
                    await this.handleSendMessage(ws, message);
                    break;

                case 'typing':
                    this.handleTyping(ws, message);
                    break;

                case 'stop_typing':
                    this.handleStopTyping(ws, message);
                    break;

                case 'heartbeat':
                    this.sendToClient(ws, { type: 'heartbeat_ack' });
                    break;

                default:
                    console.log(`Unknown message type: ${message.type}`);
                    this.sendToClient(ws, {
                        type: 'error',
                        data: { message: 'Unknown message type' }
                    });
            }
        } catch (error) {
            console.error('Error handling WebSocket message:', error);
            console.error('Raw data that caused error:', data.toString());
            this.sendToClient(ws, {
                type: 'error',
                data: { message: 'Invalid message format' }
            });
        }
    }

    private async handleJoinSession(ws: AuthenticatedWebSocket, message: WebSocketMessage) {
        console.log(`=== JOIN SESSION DEBUG ===`);
        console.log(`Message received:`, JSON.stringify(message, null, 2));
        console.log(`WebSocket userId:`, ws.userId);
        console.log(`WebSocket email:`, ws.email);

        if (!message.sessionId || !ws.userId) {
            console.log(`Missing requirements - sessionId: ${!!message.sessionId}, userId: ${!!ws.userId}`);
            this.sendToClient(ws, {
                type: 'error',
                data: { message: 'Session ID and user authentication required' }
            });
            return;
        }

        try {
            // First, let's check database connection
            console.log(`Testing database connection...`);
            const dbTest = await prisma.$queryRaw`SELECT 1`;
            console.log(`Database connection: OK`);

            // Verify user owns this session
            console.log(`Looking for session: ${message.sessionId} for user: ${ws.userId}`);

            // FIXED: Use proper Prisma query with exact types
            const session = await prisma.chatSession.findUnique({
                where: {
                    id: message.sessionId
                },
                include: {
                    user: true
                }
            });

            console.log(`Session found:`, session ? 'Yes' : 'No');
            if (session) {
                console.log(`Session owner:`, session.userId);
                console.log(`Requesting user:`, ws.userId);
                console.log(`User match:`, session.userId === ws.userId);
            }

            // Check if session exists but belongs to different user
            if (session && session.userId !== ws.userId) {
                console.log(`ERROR: Session belongs to different user`);
                this.sendToClient(ws, {
                    type: 'error',
                    data: {
                        message: 'Chat session access denied - session belongs to different user',
                        debug: {
                            sessionId: message.sessionId,
                            sessionOwner: session.userId,
                            requestingUser: ws.userId
                        }
                    }
                });
                return;
            }

            if (!session) {
                // Check what sessions this user has
                const userSessions = await prisma.chatSession.findMany({
                    where: { userId: ws.userId },
                    select: { id: true, startedAt: true }
                });

                console.log(`User's available sessions:`, userSessions);

                this.sendToClient(ws, {
                    type: 'error',
                    data: {
                        message: 'Chat session not found',
                        debug: {
                            sessionId: message.sessionId,
                            userId: ws.userId,
                            userAvailableSessions: userSessions.map(s => s.id)
                        }
                    }
                });
                return;
            }

            // Remove from previous session if any
            if (ws.sessionId) {
                this.removeClientFromSession(ws.sessionId, ws);
            }

            // Add to new session
            ws.sessionId = message.sessionId;
            this.addClientToSession(message.sessionId, ws);
            this.userSessions.set(ws.userId, message.sessionId);

            // Notify client
            this.sendToClient(ws, {
                type: 'session_joined',
                data: {
                    sessionId: message.sessionId,
                    message: 'Successfully joined chat session'
                }
            });

            // Notify other clients in the session
            this.broadcastToSession(message.sessionId, {
                type: 'user_joined',
                data: {
                    userId: ws.userId,
                    email: ws.email
                }
            }, ws);

            console.log(`User ${ws.email} joined session ${message.sessionId}`);

        } catch (error) {
            console.error('Error joining session:', error);
            this.sendToClient(ws, {
                type: 'error',
                data: { message: 'Failed to join session' }
            });
        }
    }

    private async handleSendMessage(ws: AuthenticatedWebSocket, message: WebSocketMessage) {
        if (!ws.sessionId || !message.message || !message.sender || !message.role) {
            this.sendToClient(ws, {
                type: 'error',
                data: { message: 'Session ID, message content, sender, and role are required' }
            });
            return;
        }

        try {
            // Validate message data
            const messageData: ChatMessageCreate = {
                sessionId: ws.sessionId,
                sender: message.sender,
                message: message.message,
                role: message.role,
                chatSessionId: ws.sessionId
            };

            const validatedData = ChatMessageCreateSchema.parse(messageData);

            // Save message to database
            const savedMessage = await prisma.chatMessage.create({
                data: {
                    ...validatedData,
                    timestamp: new Date()
                }
            });

            // Broadcast to all clients in the session
            this.broadcastToSession(ws.sessionId, {
                type: 'new_message',
                data: savedMessage
            });

            console.log(`Message sent in session ${ws.sessionId} by ${message.sender}`);

            // If this is a user message, get AI bot response
            if (message.role === 'USER') {
                console.log('Getting AI response...');
                const aiResponse = await this.callAIService(message.message, ws.sessionId, ws.userId!);

                if (aiResponse) {
                    // Save bot response to database
                    const botMessageData: ChatMessageCreate = {
                        sessionId: ws.sessionId,
                        sender: 'HealthBot',
                        message: aiResponse,
                        role: 'BOT',
                        chatSessionId: ws.sessionId
                    };

                    const validatedBotData = ChatMessageCreateSchema.parse(botMessageData);

                    const savedBotMessage = await prisma.chatMessage.create({
                        data: {
                            ...validatedBotData,
                            timestamp: new Date()
                        }
                    });

                    // Broadcast bot response to all clients in the session
                    this.broadcastToSession(ws.sessionId, {
                        type: 'new_message',
                        data: savedBotMessage
                    });

                    console.log(`Bot response sent in session ${ws.sessionId}`);
                } else {
                    console.log('No AI response received');
                }
            }

        } catch (error) {
            console.error('Error sending message:', error);
            this.sendToClient(ws, {
                type: 'error',
                data: { message: 'Failed to send message' }
            });
        }
    }

    private handleTyping(ws: AuthenticatedWebSocket, message: WebSocketMessage) {
        if (!ws.sessionId) return;

        this.broadcastToSession(ws.sessionId, {
            type: 'user_typing',
            data: {
                userId: ws.userId,
                email: ws.email
            }
        }, ws);
    }

    private handleStopTyping(ws: AuthenticatedWebSocket, message: WebSocketMessage) {
        if (!ws.sessionId) return;

        this.broadcastToSession(ws.sessionId, {
            type: 'user_stop_typing',
            data: {
                userId: ws.userId,
                email: ws.email
            }
        }, ws);
    }

    private handleDisconnection(ws: AuthenticatedWebSocket) {
        console.log(`User ${ws.email} disconnected from WebSocket`);

        if (ws.sessionId) {
            this.removeClientFromSession(ws.sessionId, ws);

            // Notify other clients
            this.broadcastToSession(ws.sessionId, {
                type: 'user_left',
                data: {
                    userId: ws.userId,
                    email: ws.email
                }
            }, ws);
        }

        if (ws.userId) {
            this.userSessions.delete(ws.userId);
        }
    }

    private addClientToSession(sessionId: string, client: AuthenticatedWebSocket) {
        if (!this.clients.has(sessionId)) {
            this.clients.set(sessionId, new Set());
        }
        this.clients.get(sessionId)!.add(client);
    }

    private removeClientFromSession(sessionId: string, client: AuthenticatedWebSocket) {
        const sessionClients = this.clients.get(sessionId);
        if (sessionClients) {
            sessionClients.delete(client);
            if (sessionClients.size === 0) {
                this.clients.delete(sessionId);
            }
        }
    }

    private sendToClient(client: AuthenticatedWebSocket, message: any) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    }

    private broadcastToSession(sessionId: string, message: any, excludeClient?: AuthenticatedWebSocket) {
        const sessionClients = this.clients.get(sessionId);
        if (sessionClients) {
            sessionClients.forEach(client => {
                if (client !== excludeClient && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(message));
                }
            });
        }
    }

    // Method to send messages from external sources (like HTTP API or AI bot)
    public async sendMessageToSession(sessionId: string, messageData: ChatMessageCreate) {
        try {
            // Save to database
            const savedMessage = await prisma.chatMessage.create({
                data: {
                    ...messageData,
                    timestamp: new Date()
                }
            });

            // Broadcast to WebSocket clients
            this.broadcastToSession(sessionId, {
                type: 'new_message',
                data: savedMessage
            });

            return savedMessage;
        } catch (error) {
            console.error('Error sending external message:', error);
            throw error;
        }
    }

    public getConnectedSessions(): string[] {
        return Array.from(this.clients.keys());
    }

    public getSessionClientCount(sessionId: string): number {
        return this.clients.get(sessionId)?.size || 0;
    }
}

const WS_PORT = process.env.WS_PORT || 4001;
export const chatWebSocketServer = new ChatWebSocketServer(Number(WS_PORT));

export { ChatWebSocketServer };