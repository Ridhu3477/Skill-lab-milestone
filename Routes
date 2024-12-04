const express = require('express');

const fs = require('fs');

const path = require('path');



const eventFilePath = path.join(__dirname, '../data/events.json');



module.exports = (events) => {

    const router = express.Router();



    // Add an event

    router.post('/', (req, res) => {

        const { title, description, time } = req.body;



        if (!title || !description || !time) {

            return res.status(400).json({ error: 'All fields are required' });

        }



        const newEvent = { title, description, time };

        events.push(newEvent);



        // Save events to file

        fs.writeFileSync(eventFilePath, JSON.stringify(events, null, 2));

        res.status(201).json({ message: 'Event added successfully', event: newEvent });

    });



    // Get all events

    router.get('/', (req, res) => {

        res.status(200).json(events);

    });



    return router;

};
