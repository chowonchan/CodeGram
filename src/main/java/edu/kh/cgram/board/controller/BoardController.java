package edu.kh.cgram.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("board")
@RequiredArgsConstructor
public class BoardController {
	
	@GetMapping("myActivity")
	public String myActivityPage() {
		return "/board/myActivity";
	}
	
	@GetMapping("randomPeed")
	public String randomPeedPage() {
		return "/board/randomPeed";
	}
}
