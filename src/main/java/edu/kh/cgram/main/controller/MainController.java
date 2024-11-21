package edu.kh.cgram.main.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.cgram.main.service.MainService;
import edu.kh.cgram.member.dto.Member;
import edu.kh.cgram.story.dto.Story;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@SessionAttributes("loginMember")
@RequestMapping("/")
public class MainController {
	
	@RequestMapping("/")
	public String loginPage() {
		return "/member/login";
	}
	
	public String mainPage() {
		
	 // return "/feed/test";
		 return "/board/randomPeed";
		// return "/feed/mainPeed";
	}


	
//  public String mainPage 안에 넣어야되고 아직 업데이트중
//	@GetMapping
//	public String getFeedStory(
//		Model model,
//		RedirectAttributes ra,
//		@SessionAttribute(value="loginMember", 
//										 required=false) Member loginMember) {
//    List<Story> stories = mainService.getStories(member.getMemberNo());
//    model.addAttribute("stories", stories);
//    return "feedStory";
//	}

}
