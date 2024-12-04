const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const cron = require('node-cron');
const { notifyUsers, saveCompletedEvent } = require('./utils/logger');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Event storage
let events = [];

// Load routes
const eventRoutes = require('./routes/events')(events); // Pass `events` array to the router
app.use('/events', eventRoutes);

// WebSocket setup
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket');
    ws.send(JSON.stringify({ message: 'Welcome to the Real-Time Event Notifier!' }));
});

// Notify 5 minutes before events
cron.schedule('* * * * *', () => {
    const now = new Date();
    events.forEach((event, index) => {
        const eventTime = new Date(event.time);
        const diff = (eventTime - now) / (1000 * 60); // Difference in minutes

        if (diff <= 5 && diff > 0) {
            notifyUsers(wss, event);
        } else if (diff <= 0) {
            saveCompletedEvent(events.splice(index, 1)[0]); // Remove completed event
        }
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
