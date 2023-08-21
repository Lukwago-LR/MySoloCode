import express from "express";
import cors from 'cors';


// use the SQL methods in the API routes below
import { joinQueue, leaveQueue, queueLength, taxiDepart, taxiQueueLength, joinTaxiQueue } from './taxi.sql.js';

const app = express();

app.use(express.static('public'))
app.use(cors())

// add middleware to make post routes work
app.use(express.json());

const PORT = process.env.PORT || 4015;

// passenger joins the queue
app.post('/api/passenger/join', async function (req, res) {
    await joinQueue()
    res.json({
        message: 'join queue'
    })
})

// passenger leaves the queue
app.post('/api/passenger/leave', async function (req, res) {
    await leaveQueue();
    res.json({
        message: 'leave queue'
    })
});

app.post('/api/taxi/join', async function (req, res) {
    await joinTaxiQueue();
    res.json({
        message: 'taxi added to queue'
    })
});

// Note there needs to be at least 12 people in the queue for the taxi to depart
app.post('/api/taxi/depart', async function (req, res) {
    await taxiDepart();
    res.json({
        message: 'taxi depart from queue'
    })
});


// return the number of people in the queue
app.get('/api/passenger/queue', async function (req, res) {
    //  return test the API call
    res.json({
        queueCount: await queueLength()
    })
});

// return the number of taxis in the queue
app.get('/api/taxi/queue', async function (req, res) {
    res.json({
        queueCount: await taxiQueueLength()
    })
});

app.listen(PORT, () => console.log(`Taxi App started on port: ${PORT}`))