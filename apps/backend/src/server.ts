
import app from './app';
import { config, isDevelopment } from '@/config/env';
import { logger } from '@/utils/logger';
import { connectRedis } from '@/config/redis';
import prisma from '@/config/database';

const PORT = config.PORT || 8000;


// Graceful shutdown handler
const gracefulShutdown = async (signal: string) => {
  logger.info(`Received ${signal}, shutting down gracefully...`);
  
  const server = app.listen(PORT);
  
  // Stop accepting new connections
  server.close(async (err) => {
    if (err) {
      logger.error('Error during server shutdown:', err);
      process.exit(1);
    }
    
    try {
      // Close database connections
      await prisma.$disconnect();
      logger.info('Database disconnected');
      
      // Close Redis connection
      // Redis disconnect is handled in redis config
      
      logger.info('Graceful shutdown completed');
      process.exit(0);
    } catch (error) {
      logger.error('Error during graceful shutdown:', error);
      process.exit(1);
    }
  });
  
  // Force shutdown after 30 seconds
  setTimeout(() => {
    logger.error('Forced shutdown due to timeout');
    process.exit(1);
  }, 30000);
};

// Handle graceful shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Start server
const startServer = async () => {
  try {
    // Initialize Redis connection (optional)
    try {
      await connectRedis();
      logger.info('Redis connected successfully');
    } catch (redisError) {
      logger.warn('Redis connection failed, continuing without Redis:', redisError);
    }
    
    // Start HTTP server
    const server = app.listen(PORT, () => {
      logger.info(`🚀 TestMitra Backend Server running on port ${PORT}`);
      logger.info(`📚 Environment: ${config.NODE_ENV}`);
      logger.info(`🔗 Health check: http://localhost:${PORT}/health`);
      
      if (isDevelopment) {
        logger.info(`📋 Prisma Studio: npx prisma studio`);
        logger.info(`🌐 Frontend URL: ${config.FRONTEND_URL}`);
      }
    });

    // Handle server errors
    server.on('error', (error: any) => {
      if (error.syscall !== 'listen') {
        throw error;
      }

      const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

      switch (error.code) {
        case 'EACCES':
          logger.error(bind + ' requires elevated privileges');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          logger.error(bind + ' is already in use');
          process.exit(1);
          break;
        default:
          throw error;
      }
    });

    return server;
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer().catch((error) => {
  logger.error('Server startup error:', error);
  process.exit(1);
});