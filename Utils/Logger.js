const fs = require('fs');

const path = require('path');



const logFilePath = path.join(__dirname, '../logs/completed.log');



// Notify users

function notifyUsers(wss, event) {

    wss.clients.forEach((client) => {

        if (client.readyState === 1) { // WebSocket OPEN state

            client.send(JSON.stringify({ message: `Reminder: ${event.title} is starting soon!` }));

        }

    });

}



// Save completed events to log file

function saveCompletedEvent(event) {

    const logEntry = `${new Date().toISOString()} - Event Completed: ${event.title}\n`;

    fs.appendFile(logFilePath, logEntry, (err) => {

        if (err) console.error('Error writing to log file', err);

    });

}



module.exports = { notifyUsers, saveCompletedEvent };
