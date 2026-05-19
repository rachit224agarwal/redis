import express from 'express';
import redis from 'ioredis';

const app = express();
app.use(express.json());

const redis = new redis(process.env.REDIS_URL || "redis://localhost:6379");