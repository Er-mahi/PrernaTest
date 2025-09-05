import { PrismaClient, Prisma } from '@prisma/client';
import { logger } from '@/utils/logger';

// Global Prisma instance to avoid connection issues in dev
declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

// Explicitly type log levels
type LogLevel = 'query' | 'info' | 'warn' | 'error';

// Create Prisma client with correct typing
const prisma: PrismaClient<Prisma.PrismaClientOptions, LogLevel> =
  globalThis.__prisma ||
  new PrismaClient({
    log: [
      { emit: 'event', level: 'query' },
      { emit: 'event', level: 'error' },
      { emit: 'event', level: 'info' },
      { emit: 'event', level: 'warn' },
    ],
  });

/**
 * Prisma Event Listeners
 */

// Error event
prisma.$on('error', (e: Prisma.LogEvent) => {
  logger.error(e);
});

// Warn event
prisma.$on('warn', (e: Prisma.LogEvent) => {
  logger.warn(e);
});

// Info event
prisma.$on('info', (e: Prisma.LogEvent) => {
  logger.info(e);
});

// Query event (special type)
prisma.$on('query', (e: Prisma.QueryEvent) => {
  if (process.env.NODE_ENV === 'development') {
    logger.debug(
      `Query: ${e.query} | Params: ${e.params} | Duration: ${e.duration}ms`
    );
  }
});

// Ensure connection on startup
prisma
  .$connect()
  .then(() => {
    logger.info('Database connected successfully');
  })
  .catch((error) => {
    logger.error('Database connection failed:', error);
    process.exit(1);
  });

// Graceful shutdown
const gracefulShutdown = async () => {
  await prisma.$disconnect();
  logger.info('Database disconnected');
};

process.on('beforeExit', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

if (process.env.NODE_ENV === 'development') {
  globalThis.__prisma = prisma;
}

export default prisma;
