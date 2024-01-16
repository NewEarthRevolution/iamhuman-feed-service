"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToClients = exports.setupSSE = void 0;
const clients = new Set();
const setupSSE = (app) => {
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
exports.setupSSE = setupSSE;
const sendToClients = (data) => {
    console.log("sending to clients", data);
    const formattedData = `data: ${JSON.stringify(data)}\n\n`;
    clients.forEach(client => client.write(formattedData));
};
exports.sendToClients = sendToClients;
