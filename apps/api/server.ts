import { Server } from 'socket.io';
import { createServer } from 'http';
import { app } from './http/chat-api.js';

const HTTP_PORT = process.env.HTTP_PORT || 4000;

// Create HTTP server
const httpServer = createServer(app);

// Create Socket.io server
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle chat messages
  socket.on('chat_message', async (data) => {
    console.log('Received message:', data);
    
    try {
      // Handle chat message processing
      // For now, let's send a simple echo response
      const response = {
        message: `Echo: ${data.message}`,
        timestamp: new Date().toISOString(),
        id: Date.now().toString()
      };

      // Send response back to the client
      socket.emit('chat_response', response);
    } catch (error) {
      console.error('Error processing message:', error);
      socket.emit('chat_error', { error: 'Failed to process message' });
    }
  });

  // Handle typing indicators
  socket.on('typing', () => {
    socket.broadcast.emit('user_typing');
  });

  socket.on('stop_typing', () => {
    socket.broadcast.emit('user_stop_typing');
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
httpServer.listen(HTTP_PORT, () => {
  console.log(`🚀 Server running on port ${HTTP_PORT}`);
  console.log(`📡 Socket.io server ready for connections`);
  console.log(`🌐 Frontend should connect to: http://localhost:${HTTP_PORT}`);
});

export { io };