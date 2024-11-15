package edu.kh.cgram.common.util;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

@Component
public class RedisUtil {
	@Autowired
	private StringRedisTemplate redisTemplate;
	public String getValue(String key) {
		return redisTemplate.opsForValue().get(key);
		
	}
	public void setValue(String key, String value, long exprireDuration) {
//		Duration duration = Duration.ofSeconds(exprireDuration);.
		System.out.println(value);
		System.out.println(value.trim());
		redisTemplate.opsForValue().set(key, value.trim(), exprireDuration);
	}
	public void deleteValue(String key) {
		redisTemplate.delete(key);
	}
	public boolean hasKey(String key) {
		return redisTemplate.hasKey(key);
	}
	
}
