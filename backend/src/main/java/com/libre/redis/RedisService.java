package com.libre.redis;

import java.time.Duration;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisService {
    private final StringRedisTemplate redisTemplate;

    public RedisService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void saveRefreshToken(String token, Long userId) {
        redisTemplate.opsForValue().set(token, userId.toString(), Duration.ofDays(7));
    }


    public Long getUserIdByToken(String token) {
        String userId = redisTemplate.opsForValue().get(token);
        return userId != null ? Long.parseLong(userId) : null;
    }

  
    public void deleteRefreshToken(String token) {
        redisTemplate.delete(token);
    }

    public boolean tokenExists(String token) {
        return redisTemplate.hasKey(token);
    }

}