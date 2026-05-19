import express from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

function otpKey(phone) {
    return `otp:${phone}`;
}

app.post('/otp', async (req, res) => {
    const { phone } = req.body;
    if (!phone) {
        return res.status(400).json({ error: "Phone number is required" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await redis.set(otpKey(phone), otp, 'EX', 30); // OTP valid for 30 seconds
    console.log(`OTP for ${phone}: ${otp}`); // In real app, send via SMS
    res.json({ otp : otp });
});

app.post('/otp/verify', async (req, res) => {
    const { phone, otp } = req.body;        
    const storedOtp = await redis.get(otpKey(phone));
    if(!storedOtp) res.json({ success: false, message: "OTP expired or not found" });
    else if(storedOtp === otp) res.json({ success: true , message: "OTP verified successfully" });
    else res.json({ success: false, message: "Invalid OTP" });
});

app.get('/otp/:phone/ttl', async (req, res) => {
    const { phone } = req.params;
    const ttl = await redis.ttl(otpKey(phone));
    res.json({ ttl });
});

app.listen(3000, () => {
    console.log('OTP service running on http://localhost:3000');
});