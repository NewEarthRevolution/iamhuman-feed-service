import { createClient, RedisClientType } from 'redis';
require('dotenv').config();

class RedisSubscriber {
    private subscriber: RedisClientType;

    constructor() {
        this.subscriber = createClient({ url: process.env.REDIS_URI });
        this.initializeEventHandlers();
    }

    private initializeEventHandlers() {
        this.subscriber.on('connect', () => {
            console.log('Redis subscriber connected');
        });
        this.subscriber.on('error', (error) => {
            console.error('Redis error:', error);
        });
        this.subscriber.on('end', () => {
            console.log('Redis subscriber disconnected');
        });
    }

    public async subscribe(channel: string, callback: (message: string) => void) {
        await this.subscriber.connect();
        this.subscriber.subscribe(channel, callback);
    }

    public quit() {
        this.subscriber.quit();
    }
}
const redisSubscriberInstance = new RedisSubscriber();

// Graceful Shutdown
const cleanup = () => {
    console.log('Cleaning up before shutdown...');
    redisSubscriberInstance.quit();
    console.log('Cleanup completed. Shutting down.');
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

export default redisSubscriberInstance;
