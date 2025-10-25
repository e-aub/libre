package com.libre.redis;

import lombok.AllArgsConstructor;
import lombok.Getter;
import redis.clients.jedis.JedisPool;

@AllArgsConstructor
@Getter
public class RedisClient {
    private final JedisPool jedisPool;
}
