import Redis, { RedisOptions } from 'ioredis';

export const redisCache: Redis = createRedisInstance()

export const getCacheValue = async <T>(key: string): Promise<T | null> => {
  const result = await redisCache.hgetall(key);
  return result;
}

export const getListCacheValue = async (key: string): Promise<String[] | null> => {
  const result = await redisCache.lrange(key, 0, -1, (err, values) => {
    values?.forEach(value => console.log(value))
    return values
  })
  console.log(result)
  return result
}

export const setCacheValue = async <T>(key: string, value: any, expiresIn: number): Promise<T> => {
  await redisCache.hset(key, value, "EX", expiresIn);
  return value;
}


export const pushCacheValue = async <T>(key: string, value: any): Promise<T> => {
  await redisCache.lpush(key, value);
  return value;
}

function createRedisInstance(
) {
  try {
    const options: RedisOptions = {
      host: process.env.REDIS_HOST,
      lazyConnect: true,
      showFriendlyErrorStack: true,
      enableAutoPipelining: true,
      maxRetriesPerRequest: 0,
      retryStrategy: (times: number) => {
        if (times > 3) {
          throw new Error(`[Redis] Could not connect after ${times} attempts`);
        }

        return Math.min(times * 200, 1000);
      },
    };

    if (process.env.REDIS_PORT) {
      options.port = +process.env.REDIS_PORT;
    }

    if (process.env.REDIS_PASSWORD) {
      options.password = process.env.REDIS_PASSWORD;
    }

    const redis = new Redis(options);

    redis.on('error', (error: unknown) => {
      console.warn('[Redis] Error connecting', error);
    });

    return redis;
  } catch (e) {
    throw new Error(`[Redis] Could not create a Redis instance`);
  }
}

