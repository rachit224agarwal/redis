import Redis from 'ioredis';
import express from 'express';

const app = express();
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

app.use(express.json());

const POST_KEY = 'post:view';

function getPostViewCount(id) {    
    return `${POST_KEY}:${id}`;
}

app.post('/post/:id/view', async (req, res) => {
    const id = req.params.id;
    const count = await redis.incr(getPostViewCount(id));
    res.json(`Post ${id} view count incremented! Total count is ${count}`);
});

app.post('/leaderboard/score', async (req, res) => {
    const userID = req.body.userID;
    const score = req.body.score;
    await redis.zincrby('leaderboard', score, userID);
    res.json(`Score of ${score} added for user ${userID} in the leaderboard!`);
});

app.get('/leaderboard', async (req, res) => {   
    const topPerformers = await redis.zrevrange('leaderboard', 0, 9, 'WITHSCORES');
    res.json(topPerformers);
});

app.get('/leaderboard/:userID/rank', async (req, res) => {
    const userID = req.params.userID;
    const rank = await redis.zrevrank('leaderboard', userID);
    res.json({ userID, rank: rank + 1 }); // Adding 1 to convert from 0-based index to rank
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

