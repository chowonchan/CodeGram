package edu.kh.cgram.board.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.cgram.board.dto.BoardImg;
import edu.kh.cgram.board.service.BoardService;
import edu.kh.cgram.member.dto.Member;
import edu.kh.cgram.myactivity.service.MyActivityService;
import lombok.RequiredArgsConstructor;


@Controller
@RequestMapping("board")
@RequiredArgsConstructor
public class BoardController {
	
	private final BoardService service;
	private final MyActivityService myActivityService;
	
	@GetMapping("myActivity")
	public String myActivityPage() {
		return "/board/myActivity";
	}
	
	@GetMapping("randomPeed")
	public String randomPeedPage() {
		return "/board/randomPeed";
	}
	
	@GetMapping("randomPeed/posts")
	@ResponseBody
	public List<BoardImg> getRandomPosts(
		@SessionAttribute("loginMember") Member loginMember) {
		
		// 로그인된 회원의 번호 가져오기
		int memberNo = loginMember.getMemberNo();
		
		List<BoardImg> randomPosts = service.getRandomPosts(memberNo);
		
		return randomPosts;
	}
	
	
	
}
