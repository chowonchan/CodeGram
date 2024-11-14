package edu.kh.cgram.email.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.cgram.common.util.RedisUtil;
import edu.kh.cgram.email.service.EmailService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
@RequestMapping("email")
public class EmailController {
	
	@Autowired
	public RedisUtil redisUtil;
	
	@Autowired
	public EmailService service;
	
	@ResponseBody
	@GetMapping("redis")
	public int redisTest(
			@RequestParam("key") String key,
			@RequestParam("value") String value) {
		redisUtil.setValue(key, value, 60);
		return 1;
	}
	@ResponseBody
	@PostMapping("sendAuthKey")
	public int sendAuthKey(
			@RequestBody String email) {
		return service.sendEmail("signUp", email);
	}

	@ResponseBody
	@PostMapping("checkAuthKey")
	public boolean checkAuthKey(
			@RequestBody Map<String, String> map) {
		
		return service.checkAuthKey(map);
	}
}
