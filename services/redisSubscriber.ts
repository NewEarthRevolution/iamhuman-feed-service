import redisSubscriber from '../clients/redisClient';
import { sendToClients, PledgeUpdateMessage } from '../services/sseService';

redisSubscriber.subscribe('pledgeUpdates', (message) => {
  try {
    const parsedMessage = JSON.parse(message) as PledgeUpdateMessage;
    sendToClients(parsedMessage);
    console.log(`Received message: ${message}`);
  } catch (error) {
    console.error(`Error parsing message: ${message}`, error);
  }
});
