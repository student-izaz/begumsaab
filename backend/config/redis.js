const { createClient } = require("redis");

const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    reconnectStrategy: retries => Math.min(retries * 50, 1000)
  }
});

redisClient.on("connect", () => {
  console.log("🔴 Redis connected");
});

redisClient.on("ready", () => {
  console.log("🟢 Redis ready");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis error:", err.message);
});

(async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
})();

module.exports = redisClient;
