import { createClient, RedisClientType } from 'redis';
import { config } from './env';
import { logger } from '@/utils/logger';

class RedisManager {
  private client: RedisClientType | null = null;
  private isConnected = false;

  async connect(): Promise<RedisClientType> {
  if (this.client && this.isConnected) {
    return this.client;
  }

  try {
    const clientOptions: any = {
      url: config.REDIS_URL,
      socket: {
        connectTimeout: 10000,
      },
    };

    if (config.REDIS_PASSWORD) {
      clientOptions.password = config.REDIS_PASSWORD;
    }

    // Initialize client
    this.client = createClient(clientOptions);

    // Event handlers
    this.client.on('connect', () => {
      logger.info('Redis client connected');
      this.isConnected = true;
    });

    this.client.on('ready', () => {
      logger.info('Redis client ready');
    });

    this.client.on('error', (error) => {
      logger.error('Redis error:', error);
      this.isConnected = false;
    });

    this.client.on('end', () => {
      logger.info('Redis connection ended');
      this.isConnected = false;
    });

    this.client.on('reconnecting', () => {
      logger.info('Redis client reconnecting...');
      this.isConnected = false;
    });

    // Connect manually
    await this.client.connect();
    return this.client;
  } catch (error) {
    logger.error('Redis connection failed:', error);
    throw error;
  }
}

  async disconnect(): Promise<void> {
    if (this.client && this.isConnected) {
      try {
        await this.client.quit();
        this.isConnected = false;
        logger.info('Redis client disconnected');
      } catch (error) {
        logger.error('Error disconnecting Redis:', error);
      }
    }
  }

  getClient(): RedisClientType | null {
    return this.client;
  }

  isConnectedToRedis(): boolean {
    return this.isConnected;
  }

  // Session helpers
  async setSession(sessionId: string, data: any, expireInSeconds: number = 86400): Promise<void> {
    if (!this.client || !this.isConnected) throw new Error('Redis not connected');
    await this.client.setEx(`session:${sessionId}`, expireInSeconds, JSON.stringify(data));
  }

  async getSession(sessionId: string): Promise<any | null> {
    if (!this.client || !this.isConnected) return null;
    const data = await this.client.get(`session:${sessionId}`);
    return data ? JSON.parse(data) : null;
  }

  async deleteSession(sessionId: string): Promise<void> {
    if (!this.client || !this.isConnected) return;
    await this.client.del(`session:${sessionId}`);
  }

  // Cache helpers
  async setCache(key: string, value: any, expireInSeconds: number = 3600): Promise<void> {
    if (!this.client || !this.isConnected) return;
    await this.client.setEx(`cache:${key}`, expireInSeconds, JSON.stringify(value));
  }

  async getCache(key: string): Promise<any | null> {
    if (!this.client || !this.isConnected) return null;
    const data = await this.client.get(`cache:${key}`);
    return data ? JSON.parse(data) : null;
  }

  async deleteCache(key: string): Promise<void> {
    if (!this.client || !this.isConnected) return;
    await this.client.del(`cache:${key}`);
  }

  async clearCachePattern(pattern: string): Promise<void> {
    if (!this.client || !this.isConnected) return;
    const keys = await this.client.keys(`cache:${pattern}`);
    if (keys.length > 0) {
      await this.client.del(keys);
    }
  }
}

// Singleton
const redisManager = new RedisManager();

// Exports
export const connectRedis = () => redisManager.connect();
export const disconnectRedis = () => redisManager.disconnect();
export const getRedisClient = () => redisManager.getClient();
export const isRedisConnected = () => redisManager.isConnectedToRedis();

export const setSession = (sessionId: string, data: any, expireInSeconds?: number) =>
  redisManager.setSession(sessionId, data, expireInSeconds);

export const getSession = (sessionId: string) =>
  redisManager.getSession(sessionId);

export const deleteSession = (sessionId: string) =>
  redisManager.deleteSession(sessionId);

export const setCache = (key: string, value: any, expireInSeconds?: number) =>
  redisManager.setCache(key, value, expireInSeconds);

export const getCache = (key: string) =>
  redisManager.getCache(key);

export const deleteCache = (key: string) =>
  redisManager.deleteCache(key);

export const clearCachePattern = (pattern: string) =>
  redisManager.clearCachePattern(pattern);

// Graceful shutdown
process.on('SIGTERM', async () => await redisManager.disconnect());
process.on('SIGINT', async () => await redisManager.disconnect());

export default redisManager;
