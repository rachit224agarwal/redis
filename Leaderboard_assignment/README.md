# Redis Leaderboard System

A simple leaderboard and post view counter built with Express.js and Redis.

This project helped me understand how Redis Sorted Sets work for building real-time ranking systems.

## Features

- Track post views using Redis `INCR`
- Add scores dynamically using Redis `ZINCRBY`
- Fetch top users using Redis `ZREVRANGE`
- Get user rank using Redis `ZREVRANK`
- Simulate real-time leaderboard updates

## Tech Stack

- Node.js
- Express.js
- Redis
- ioredis

## Redis Concepts Used

- Redis Strings
- Redis Counters
- Redis Sorted Sets
- Ranking Systems
- Real-time Score Updates

## API Endpoints

### 1. Increment Post Views

**Endpoint**

```bash
POST /post/:id/view
```

**Example**

```bash
curl -X POST http://localhost:3000/post/rachit_194/view
```

**Response**

```json
"Post rachit_194 view count incremented! Total count is 1"
```

![Post view counter](./public/post-view.png)

### 2. Add Score to Leaderboard

**Endpoint**

```bash
POST /leaderboard/score
```

**Body**

```json
{
  "userID": "rachit_194",
  "score": "8"
}
```

**Example**

```bash
curl -X POST http://localhost:3000/leaderboard/score \
  -H "Content-Type: application/json" \
  -d '{"userID":"rachit_194","score":"8"}'
```

**Response**

```json
"Score of 8 added for user rachit_194 in the leaderboard!"
```

![Add score](./public/add-score.png)

### 3. Get Leaderboard

**Endpoint**

```bash
GET /leaderboard
```

**Example**

```bash
curl http://localhost:3000/leaderboard
```

**Response**

Returns the top users with scores in descending order.

```json
[
  "rachit_194",
  "8",
  "keshav_124",
  "8",
  "rishi_208",
  "7",
  "harshit_123",
  "7"
]
```

![Leaderboard](./public/leaderboard.png)

### 4. Get User Rank

**Endpoint**

```bash
GET /leaderboard/:userID/rank
```

**Example**

```bash
curl http://localhost:3000/leaderboard/rachit_194/rank
```

**Response**

```json
{
  "userID": "rachit_194",
  "rank": 1
}
```

![User rank](./public/user-rank.png)

## What I Learned

This project helped me understand:

- how leaderboards work internally
- real-time ranking systems
- sorted sets in Redis
- fast score updates and retrieval

## Screenshots

Store the API screenshots in the `public` folder inside this project:

```bash
Leaderboard_assignment/
├── public/
│   ├── add-score.png
│   ├── leaderboard.png
│   ├── post-view.png
│   ├── user-rank.png
│   └── user-rank-raunak.png
```

## Run Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Start Redis

```bash
redis-server
```

### 3. Start the app

```bash
npm run dev
```
