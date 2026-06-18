const { createClient } = require("redis");

const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: true,
    rejectUnauthorized: false,
  },
});

redisClient.on("connect", () => {
  console.log("🟢 Redis connected");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis error:", err.message);
});

(async () => {
  try {
    await redisClient.connect();

    const pong = await redisClient.ping();
    console.log("PING:", pong);
  } catch (err) {
    console.error("❌ Redis connect failed:", err.message);
  }
})();

module.exports = redisClient;