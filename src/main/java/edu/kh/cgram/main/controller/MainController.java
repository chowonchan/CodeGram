package edu.kh.cgram.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class MainController {
	@RequestMapping("/")
	public String mainPage() {
		return "/board/randomPeed";
	}

}
