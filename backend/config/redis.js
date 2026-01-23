const { createClient } = require("redis");

const isUpstash = !!process.env.REDIS_URL;

const redisClient = createClient({
  url: isUpstash
    ? process.env.REDIS_URL
    : "redis://127.0.0.1:6379",

  socket: isUpstash
    ? { tls: true, rejectUnauthorized: false }
    : undefined,
});

redisClient.on("connect", () => {
  console.log(`🟢 Redis connected (${isUpstash ? "UPSTASH" : "LOCAL"})`);
});

redisClient.on("error", (err) => {
  console.error("❌ Redis error:", err.message);
});

(async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (err) {
    console.error("❌ Redis connect failed:", err.message);
  }
})();

module.exports = redisClient;
