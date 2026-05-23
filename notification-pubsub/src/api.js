import Publisher from "ioredis";
import express from "express";

const app = express();
const publisher = new Publisher(process.env.REDIS_URL || 'redis://localhost:6379');

app.use(express.json());

app.post('/notifications', async (req, res) => {
    const message = {
        title: req.body.title || 'No Title',
        createdAt: new Date().toISOString()
    }
    const receiver = await publisher.publish('notifications', JSON.stringify(message));
    res.json('Notification sent to ' + receiver);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});