import express from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

app.post('/user/:id/json', async (req, res) => {
    const { id } = req.params;
    await redis.set(`user:${id}:json`, JSON.stringify(req.body));
    res.json({ success: true });
});

app.get('/user/:id/json', async (req, res) => {
    const { id } = req.params;
    const data = await redis.get(`user:${id}:json`);
    res.json({ user: data ? JSON.parse(data) : null });
});

// Hash-based endpoints : effectively same as json but with better memory efficiency and field-level access

app.post('/user/:id/hash', async (req, res) => {
    const { id } = req.params;
    await redis.hset(`user:${id}:hash`, req.body);
    res.json({ success: true });
});

app.get('/user/:id/hash', async (req, res) => {
    const { id } = req.params;
    const data = await redis.hgetall(`user:${id}:hash`);
    res.json({ user: data });
});

app.listen(3000, () => {
    console.log('User profile cache service running on http://localhost:3000');
});