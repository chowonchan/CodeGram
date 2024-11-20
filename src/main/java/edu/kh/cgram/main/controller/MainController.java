package edu.kh.cgram.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@SessionAttributes("loginMember")
public class MainController {
	
	@RequestMapping("/")
	public String mainPage() {
		
		return "/peed/mainPeed";
		//return "/board/randomPeed";
	}

}
