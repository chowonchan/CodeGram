package edu.kh.cgram.hashtag.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.cgram.hashtag.dto.HashTag;
import edu.kh.cgram.hashtag.service.HashtagService;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/hashtag")
@RequiredArgsConstructor
public class HashtagController {
	
	private final HashtagService service;
	
	@GetMapping("search")
	@ResponseBody
	public ResponseEntity<List<HashTag>> searchHashtagsHashTags (
		@RequestParam("query") String query) {
		
		List<HashTag> hashtags = service.searchHashtags(query);
		return new ResponseEntity<>(hashtags, HttpStatus.OK);
	}
	
}
