const { createClient } = require("redis");

const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: true,
    rejectUnauthorized: false, // REQUIRED for Upstash
  },
});

redisClient.on("connect", () => {
  console.log("🟢 Redis connected (TLS)");
});

redisClient.on("ready", () => {
  console.log("🚀 Redis ready");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis error:", err.message);
});

(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error("❌ Redis connect failed:", err.message);
  }
})();

module.exports = redisClient;
