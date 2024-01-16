"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
require('dotenv').config();
class RedisSubscriber {
    constructor() {
        this.subscriber = (0, redis_1.createClient)({ url: process.env.REDIS_URI });
        this.initializeEventHandlers();
    }
    initializeEventHandlers() {
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
    subscribe(channel, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.subscriber.connect();
            this.subscriber.subscribe(channel, callback);
        });
    }
    quit() {
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
exports.default = redisSubscriberInstance;
