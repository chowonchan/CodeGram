package edu.kh.cgram.main.controller;

import java.util.List;
import java.util.Map;

import edu.kh.cgram.board.dto.Board;
import edu.kh.cgram.board.service.EditBoardService;
import edu.kh.cgram.common.dto.Pagination;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.cgram.main.service.MainService;
import edu.kh.cgram.member.dto.Member;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@SessionAttributes("loginMember")
@RequestMapping("/")
public class MainController {
	
	private final MainService mainService;
	
	@RequestMapping("/")
	public String loginPage() {
		return "/member/login";
	}

	
	public String mainPage(
	) {
	

	 // return "/feed/test";
		  return "/board/randomPeed";
		 // return "/feed/mainFeed";
	}
	
	// 메인 페이지 ( Feed 목록 조회 )
	@GetMapping("main2")
	public String selectFeedList(
		@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
		@ModelAttribute("loginMember") Member loginMember,
		Model model
		) {
		
		int memberNo = loginMember.getMemberNo();
		
		model.addAttribute("loginMember", loginMember);
		
		Map<String, Object> map = null;
		
		// Feed 목록 조회
		map = mainService.selectFeedList(memberNo, cp);
		
		List<Board> feedList = (List<Board>) map.get("feedList");
		Pagination pagination = (Pagination) map.get("pagination");
		
		model.addAttribute("feedList", feedList);
		model.addAttribute("pagination", pagination);
		
		return "feed/mainFeed";
	}

	// 좋아요
	@ResponseBody
	@PostMapping("/board/like")
	public Map<String, Object> boardLike(
			@RequestBody int boardNo,
			@SessionAttribute("loginMember") Member loginMember){
			
			int memberNo = loginMember.getMemberNo();
			
			return mainService.boardLike(boardNo, memberNo);
		}
	
	// Keep
	@ResponseBody
	@PostMapping("/board/mark")
	public Map<String, Object> boardMark(
		@RequestBody int boardNo,
		@SessionAttribute("loginMember") Member loginMember){
		
		int memberNo = loginMember.getMemberNo();
		
		return mainService.boardMark(boardNo, memberNo);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
