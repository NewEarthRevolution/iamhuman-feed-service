"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redisClient_1 = __importDefault(require("../clients/redisClient"));
const sseService_1 = require("../services/sseService");
// Connect when your application starts
redisClient_1.default.connect();
redisClient_1.default.subscribe('pledgeUpdates', (message) => {
    try {
        const parsedMessage = JSON.parse(message);
        (0, sseService_1.sendToClients)(parsedMessage);
        console.log(`Received message: ${message}`);
    }
    catch (error) {
        console.error(`Error parsing message: ${message}`, error);
    }
});
