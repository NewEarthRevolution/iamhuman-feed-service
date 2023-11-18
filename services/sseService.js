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
};
exports.setupSSE = setupSSE;
const sendToClients = (data) => {
    console.log("sending to clients", data);
    const formattedData = `data: ${JSON.stringify(data)}\n\n`; // Correctly format data for SSE
    clients.forEach(client => client.write(formattedData)); // Send the formatted string to clients
};
exports.sendToClients = sendToClients;
