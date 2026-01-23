const { createClient } = require("redis");

const isProd = process.env.NODE_ENV === "production";

const redisClient = createClient({
  url: isProd
    ? process.env.REDIS_URL               // Upstash (Render)
    : "redis://127.0.0.1:6379",            // Local Redis

  socket: isProd
    ? {
        tls: true,
        rejectUnauthorized: false,
      }
    : undefined,
});

redisClient.on("connect", () => {
  console.log(`🟢 Redis connected (${isProd ? "PROD" : "LOCAL"})`);
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
