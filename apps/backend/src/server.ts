import app from './app';
import { config, isDevelopment } from '@/config/env';
import { logger } from '@/utils/logger';
import { connectRedis } from '@/config/redis';
import prisma from '@/config/database';
import http from 'http';

// Use Render port if provided, else fallback to config or 8000
const PORT = process.env.PORT || config.PORT || 8000;

// Store server instance globally for graceful shutdown
let server: http.Server;

const startServer = async () => {
  try {
    // Initialize Redis (optional)
    try {
      await connectRedis();
      logger.info('Redis connected successfully');
    } catch (redisError) {
      logger.warn('Redis connection failed, continuing without Redis:', redisError);
    }

    // Start HTTP server and bind to 0.0.0.0 for Render compatibility
    server = app.listen(PORT || '0.0.0.0', () => {
      logger.info(`🚀 Backend Server running on port ${PORT}`);
      logger.info(`📚 Environment: ${config.NODE_ENV}`);
      logger.info(`🔗 Health check: /health`);

      if (isDevelopment) {
        logger.info(`📋 Prisma Studio: npx prisma studio`);
        logger.info(`🌐 Frontend URL: ${config.FRONTEND_URL}`);
      }
    });

    // Handle server errors
    server.on('error', (error: any) => {
      if (error.syscall !== 'listen') throw error;

      const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

      switch (error.code) {
        case 'EACCES':
          logger.error(bind + ' requires elevated privileges');
          process.exit(1);
        case 'EADDRINUSE':
          logger.error(bind + ' is already in use');
          process.exit(1);
        default:
          throw error;
      }
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown logic remains unchanged
const gracefulShutdown = async (signal: string) => {
  logger.info(`Received ${signal}, shutting down gracefully...`);

  if (!server) {
    logger.warn('Server not running, exiting...');
    process.exit(0);
  }

  server.close(async (err) => {
    if (err) {
      logger.error('Error during server shutdown:', err);
      process.exit(1);
    }

    try {
      await prisma.$disconnect();
      logger.info('Database disconnected');
      logger.info('Graceful shutdown completed');
      process.exit(0);
    } catch (error) {
      logger.error('Error during graceful shutdown:', error);
      process.exit(1);
    }
  });

  // Force shutdown after 30s
  setTimeout(() => {
    logger.error('Forced shutdown due to timeout');
    process.exit(1);
  }, 30000);
};

// Handle termination signals
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
startServer();
