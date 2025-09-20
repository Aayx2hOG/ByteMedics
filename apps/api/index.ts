import { app } from './http/chat-api.js';
import './websocket/chat-websocket.js';

const HTTP_PORT = process.env.HTTP_PORT || 4000;
const WS_PORT = process.env.WS_PORT || 4001;

// Start HTTP server
app.listen(HTTP_PORT, () => {
    console.log(`HTTP Chat API server running on port ${HTTP_PORT}`);
    console.log(`WebSocket Chat server running on port ${WS_PORT}`);
    console.log(`\nAPI Endpoints:`);
    console.log(`  • Health Check: http://localhost:${HTTP_PORT}/health`);
    console.log(`  • Register: POST http://localhost:${HTTP_PORT}/api/v1/users/register`);
    console.log(`  • Login: POST http://localhost:${HTTP_PORT}/api/v1/users/login`);
    console.log(`  • Create Session: POST http://localhost:${HTTP_PORT}/api/v1/chat/sessions`);
    console.log(`  • Get Sessions: GET http://localhost:${HTTP_PORT}/api/v1/chat/sessions`);
    console.log(`  • Send Message: POST http://localhost:${HTTP_PORT}/api/v1/chat/messages`);
    console.log(`  • Health Query: POST http://localhost:${HTTP_PORT}/api/v1/ai/health-query`);
    console.log(`  • AI Status: GET http://localhost:${HTTP_PORT}/api/v1/ai/status`);
    console.log(`  • AI Intents: GET http://localhost:${HTTP_PORT}/api/v1/ai/intents`);
    console.log(`\nWebSocket Connection:`);
    console.log(`  • URL: ws://localhost:${WS_PORT}?token=YOUR_JWT_TOKEN`);
    console.log(`\nAI Service:`);
    console.log(`  • FastAPI service should be running on port 8000`);
    console.log(`  • Start with: cd apps/ai && python main.py`);
    console.log(`\nUsage:`);
    console.log(`  1. Register/Login to get JWT token`);
    console.log(`  2. Create a chat session via HTTP API`);
    console.log(`  3. Connect to WebSocket with token`);
    console.log(`  4. Use /api/v1/ai/health-query for AI-powered health queries`);
    console.log(`  5. Join session and start real-time messaging`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down servers...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\nShutting down servers...');
    process.exit(0);
});