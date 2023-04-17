import nextSession from "next-session";
import RedisStore from 'connect-redis';
import Redis from "ioredis";
import RedisStoreFactory from 'connect-redis';
import { expressSession, promisifyStore } from "next-session/lib/compat";

const redisClient = new Redis(process.env.REDIS_URI);

const redisStore = new RedisStore({
    client: redisClient,
})

export const getSession = nextSession({
  name: "USER_SESSION",
  store: promisifyStore(
    redisStore
  ),
  cookie: {
    secure: true,
  },
  autoCommit: false
});