import express from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

const EMAIL_QUEUE_KEY = "email:queue";

app.post('/emails', async (req, res) => {
    const { to, subject, body } = req.body;
    const job = {
        to : to,
        subject : subject,
        body : body,
        createdAt : Date.now().toString()
    }
    await redis.lpush(EMAIL_QUEUE_KEY, JSON.stringify(job));
    res.json({ success: true, message: "Email job added to queue" });
});

app.get('/emails/process-one', async (req, res) => {
    const jobs = await redis.rpop(EMAIL_QUEUE_KEY);
    res.json({ queue: JSON.parse(jobs) });
});

app.listen(3000, () => {
    console.log('Email queue service running on http://localhost:3000');
});