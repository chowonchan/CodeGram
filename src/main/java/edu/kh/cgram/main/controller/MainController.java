package edu.kh.cgram.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import edu.kh.cgram.member.dto.Member;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@SessionAttributes("loginMember")
public class MainController {
	

	
	@RequestMapping("/")
	public String mainPage() {
		
	 // return "/feed/test";
		 return "/board/randomPeed";
		// return "/feed/mainPeed";
	}
	
}

	public String loginPage() {
			return "/member/login";
	}
	

}

