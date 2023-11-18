import redisClient from '../clients/redisClient';
import { sendToClients, PledgeUpdateMessage } from '../services/sseService'
// Connect when your application starts
redisClient.connect();

redisClient.subscribe('pledgeUpdates', (message) => {
  try {
    const parsedMessage = JSON.parse(message) as PledgeUpdateMessage;
    sendToClients(parsedMessage);
    console.log(`Received message: ${message}`);
  } catch (error) {
    console.error(`Error parsing message: ${message}`, error);
  }
});
