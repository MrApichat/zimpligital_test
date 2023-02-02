import redis from "redis";
const redisClient = redis.createClient();

export const SetCaching = async (key, value) => {
  try {
    await redisClient.setEx(key, 600, JSON.stringify(value));
  } catch (err) {
    throw err;
  }
};

export const GetCaching = async (key) => {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : undefined;
  } catch (err) {
    throw err;
  }
};

export const ConnectCaching = async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    throw err;
  }
};

export const DisconnectCaching = () => {
  redisClient.disconnect().catch((err) => console.log(err));
};
