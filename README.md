# Redis + Mongo Local Setup

This project starts:

- Redis on port `6379`
- MongoDB on port `27017`
- Express API on port `3000`

## Project Structure

- `docker-compose.yml` - starts Redis and MongoDB
- `redis-setup/` - Node.js Express app

## Prerequisites

Make sure these are installed:

- Docker Desktop
- Node.js
- npm

## 1. Start Redis and MongoDB

From the project root, run:

```bash
docker compose up -d
```

This will start:

- Redis at `redis://localhost:6379`
- MongoDB at `mongodb://localhost:27017/mydatabase`

## 2. Install Node Dependencies

Move into the app folder:

```bash
cd redis-setup
```

Install packages:

```bash
npm install
```

## 3. Start the API Server

Run:

```bash
npm run dev
```

You should see:

```bash
Server is running on port 3000
```

## 4. Test the Endpoints

Open a new terminal and run:

### Check Redis

```bash
curl http://localhost:3000/redis
```

Expected response:

```json
{"redis":"PONG"}
```

### Check MongoDB

```bash
curl http://localhost:3000/mongo
```

Expected response:

```json
{"mongo":"connected","database":"mydatabase"}
```

## Useful Commands

Stop Docker containers:

```bash
docker compose down
```

Stop and remove data volumes:

```bash
docker compose down -v
```

## Default Environment Values

The app uses these defaults if no environment variables are set:

- `REDIS_URL=redis://localhost:6379`
- `MONGO_URL=mongodb://localhost:27017/mydatabase`

## Quick Summary

```bash
docker compose up -d
cd redis-setup
npm install
npm run dev
curl http://localhost:3000/redis
curl http://localhost:3000/mongo
```
