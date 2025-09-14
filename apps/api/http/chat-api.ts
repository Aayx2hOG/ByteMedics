import express from "express";
import type { Request, Response } from "express";
import {
    ChatSessionCreateSchema,
    ChatMessageCreateSchema,
    UserCreateSchema,
    UserLoginSchema,
    type ChatSessionCreate,
    type ChatMessageCreate,
    type UserCreate,
    type UserLogin
} from "validator";
import { prismaClient } from "db/client";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
const prisma = prismaClient;

// Middleware
app.use(cors());
app.use(express.json());

// JWT Secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Auth middleware
const authenticateToken = (req: Request, res: Response, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Validation middleware
const validateRequest = (schema: any) => {
    return (req: Request, res: Response, next: any) => {
        try {
            const validatedData = schema.parse(req.body);
            req.body = validatedData;
            next();
        } catch (error: any) {
            return res.status(400).json({
                error: "Validation failed",
                details: error.errors || error.message
            });
        }
    };
};

// Health check
app.get("/health", (req: Request, res: Response) => {
    return res.status(200).json({ status: "OK", service: "Chat API" });
});

// User Routes
app.post("/api/v1/users/register", validateRequest(UserCreateSchema), async (req: Request, res: Response) => {
    try {
        const userData: UserCreate = req.body;

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email: userData.email }
        });

        if (existingUser) {
            return res.status(409).json({ error: "User already exists" });
        }

        // Create user (Note: In production, hash the password)
        const user = await prisma.user.create({
            data: {
                email: userData.email,
                name: userData.name,
                password: userData.password, // In production, hash this with bcrypt
            },
            select: {
                id: true,
                email: true,
                name: true
            }
        });

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(201).json({
            success: true,
            data: { user, token }
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/api/v1/users/login", validateRequest(UserLoginSchema), async (req: Request, res: Response) => {
    try {
        const { email, password }: UserLogin = req.body;

        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                name: true,
                password: true
            }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // In production, use bcrypt.compare() to verify hashed password
        if (user.password !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        return res.status(200).json({
            success: true,
            data: { user: userWithoutPassword, token }
        });
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Chat Session Routes
app.post("/api/v1/chat/sessions", authenticateToken, validateRequest(ChatSessionCreateSchema), async (req: Request, res: Response) => {
    try {
        const sessionData: ChatSessionCreate = req.body;
        const userId = (req as any).user.userId;

        const chatSession = await prisma.chatSession.create({
            data: {
                userId: userId,
                symptomsId: sessionData.symptomsId,
                startedAt: new Date(),
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        return res.status(201).json({
            success: true,
            data: chatSession
        });
    } catch (error) {
        console.error("Error creating chat session:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/api/v1/chat/sessions", authenticateToken, async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;
        const { limit = 20, offset = 0 } = req.query;

        const sessions = await prisma.chatSession.findMany({
            where: { userId },
            include: {
                messages: {
                    orderBy: { timestamp: "desc" },
                    take: 1 // Get last message for preview
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: { startedAt: "desc" },
            take: Number(limit),
            skip: Number(offset)
        });

        const totalCount = await prisma.chatSession.count({
            where: { userId }
        });

        return res.status(200).json({
            success: true,
            data: {
                sessions,
                pagination: {
                    total: totalCount,
                    limit: Number(limit),
                    offset: Number(offset),
                    hasMore: Number(offset) + Number(limit) < totalCount
                }
            }
        });
    } catch (error) {
        console.error("Error fetching chat sessions:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/api/v1/chat/sessions/:sessionId", authenticateToken, async (req: Request, res: Response) => {
    try {
        const { sessionId } = req.params;
        const userId = (req as any).user.userId;

        const session = await prisma.chatSession.findFirst({
            where: {
                id: sessionId,
                userId: userId
            },
            include: {
                messages: {
                    orderBy: { timestamp: "asc" }
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        if (!session) {
            return res.status(404).json({ error: "Chat session not found" });
        }

        return res.status(200).json({
            success: true,
            data: session
        });
    } catch (error) {
        console.error("Error fetching chat session:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Chat Message Routes
app.post("/api/v1/chat/messages", authenticateToken, validateRequest(ChatMessageCreateSchema), async (req: Request, res: Response) => {
    try {
        const messageData: ChatMessageCreate = req.body;
        const userId = (req as any).user.userId;

        // Verify session belongs to user
        const session = await prisma.chatSession.findFirst({
            where: {
                id: messageData.sessionId,
                userId: userId
            }
        });

        if (!session) {
            return res.status(404).json({ error: "Chat session not found" });
        }

        const message = await prisma.chatMessage.create({
            data: {
                sessionId: messageData.sessionId,
                sender: messageData.sender,
                message: messageData.message,
                role: messageData.role,
                timestamp: new Date(),
                chatSessionId: messageData.sessionId
            }
        });

        return res.status(201).json({
            success: true,
            data: message
        });
    } catch (error) {
        console.error("Error creating message:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/api/v1/chat/sessions/:sessionId/messages", authenticateToken, async (req: Request, res: Response) => {
    try {
        const { sessionId } = req.params;
        const userId = (req as any).user.userId;
        const { limit = 50, offset = 0 } = req.query;

        // Verify session belongs to user
        const session = await prisma.chatSession.findFirst({
            where: {
                id: sessionId,
                userId: userId
            }
        });

        if (!session) {
            return res.status(404).json({ error: "Chat session not found" });
        }

        const messages = await prisma.chatMessage.findMany({
            where: { sessionId },
            orderBy: { timestamp: "asc" },
            take: Number(limit),
            skip: Number(offset)
        });

        const totalCount = await prisma.chatMessage.count({
            where: { sessionId }
        });

        return res.status(200).json({
            success: true,
            data: {
                messages,
                pagination: {
                    total: totalCount,
                    limit: Number(limit),
                    offset: Number(offset),
                    hasMore: Number(offset) + Number(limit) < totalCount
                }
            }
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// End chat session
app.put("/api/v1/chat/sessions/:sessionId/end", authenticateToken, async (req: Request, res: Response) => {
    try {
        const { sessionId } = req.params;
        const userId = (req as any).user.userId;

        const session = await prisma.chatSession.findFirst({
            where: {
                id: sessionId,
                userId: userId
            }
        });

        if (!session) {
            return res.status(404).json({ error: "Chat session not found" });
        }

        const updatedSession = await prisma.chatSession.update({
            where: { id: sessionId },
            data: { endedAt: new Date() }
        });

        return res.status(200).json({
            success: true,
            data: updatedSession
        });
    } catch (error) {
        console.error("Error ending chat session:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

const HTTP_PORT = process.env.HTTP_PORT || 5000;

export { app };

if (import.meta.main) {
    app.listen(HTTP_PORT, () => {
        console.log(`HTTP Chat API server running on port ${HTTP_PORT}`);
    });
}