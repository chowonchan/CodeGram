package edu.kh.cgram.main.controller;

import java.util.List;
import java.util.Map;

import edu.kh.cgram.board.dto.Board;
import edu.kh.cgram.board.dto.Recommend;
import edu.kh.cgram.board.service.EditBoardService;
import edu.kh.cgram.common.dto.Pagination;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.cgram.main.service.MainService;
import edu.kh.cgram.member.dto.Member;
import edu.kh.cgram.story.dto.Story;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@SessionAttributes("loginMember")
@RequestMapping("/")
@Slf4j
public class MainController {
	
	private final MainService mainService;
	
	
	
	@RequestMapping("/")
	public String loginPage() {
		return "/member/login";
	}
	
	
	@RequestMapping("/login")
	public String loginPage2() {
		return "/member/login";
	}

	
//	public String mainPage() 
//		{
//
//	  return "/board/randomPeed";
//	}
	
	
	
	
	// 메인 페이지 ( Feed 목록 조회 )
	@GetMapping("/main")
	public String selectFeedListTest(
		@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
		@ModelAttribute("loginMember") Member loginMember,
		Model model
		) {
		
		// 로그인 여부 확인
		if (loginMember == null) {
			//model.addAttribute("message", "로그인 후 이용해주세요.");
			
			return "/member/login";
			//return "redirect:/login"; 
		}
		
		int memberNo = loginMember.getMemberNo();
		
//		model.addAttribute("loginMember", loginMember);
		
		Map<String, Object> map = null;
		
		// Feed 목록 조회
		map = mainService.selectFeedList(memberNo, cp);
		
		List<Story> storyList = (List<Story>) map.get("storyList");
		List<Recommend> recommendList = (List<Recommend>) map.get("recommendList");
		List<Board> feedList = (List<Board>) map.get("feedList");
		Pagination pagination = (Pagination) map.get("pagination");
		
		model.addAttribute("storyList", storyList);
		model.addAttribute("recommendList", recommendList);
		model.addAttribute("feedList", feedList);
		model.addAttribute("pagination", pagination);
		
		log.debug("feedList : {}",feedList);
		
		return "feed/feedMain(Do)";
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
