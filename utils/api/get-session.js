import nextSession from "next-session";
import RedisStore from 'connect-redis';
import Redis from "ioredis";
import { expressSession, promisifyStore } from "next-session/lib/compat";
import session from "express-session";

const redisClient = new Redis(process.env.REDIS_URI);

redisClient.on('error', function(err){
  console.log('Could not establish connection with redis');
})

const redisStore = new RedisStore({
    client: redisClient,
})

export const getSession = nextSession({
  name: "USER_SESSION",
  store: promisifyStore(
    redisStore
  ),
  // store: MemoryStore,
  cookie: {
    secure: true,
  },
  autoCommit: false
});