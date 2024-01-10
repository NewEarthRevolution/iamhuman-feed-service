import express from 'express';

export type PledgeUpdateMessage = {
  name: string;
  countryName: string;
};

const clients: Set<express.Response> = new Set();

export const setupSSE = (app: express.Application) => {
  app.get('/events', (req, res) => {
    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });
    res.flushHeaders();

    clients.add(res);
    req.on('close', () => {
      clients.delete(res);
    });
  });

  // Send a keep-alive message every 30 seconds
  setInterval(() => {
    clients.forEach(client => {
      client.write(':keep-alive\n\n');
    });
  }, 30000); // 30 seconds
};

export const sendToClients = (data: PledgeUpdateMessage) => {
  console.log("sending to clients", data);
  const formattedData = `data: ${JSON.stringify(data)}\n\n`;
  clients.forEach(client => client.write(formattedData));
};
