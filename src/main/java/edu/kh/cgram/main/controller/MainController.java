package edu.kh.cgram.main.controller;

import java.util.List;
import java.util.Map;

import edu.kh.cgram.board.dto.Board;
import edu.kh.cgram.board.service.BoardService;
import edu.kh.cgram.board.service.EditBoardService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
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
	
	private final EditBoardService service;
	
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
	
	@GetMapping("main2")
	public String selectFeedList(
		@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
		Model model,
		@RequestParam Map<String, Object> paramMap
		) {
		
		int cp2 = 1;
		
		// if(paramMap.get("key") == null) cp2 = service.selectFeedList(cp);
		
		// return "/feed/test";
		// return "/board/randomPeed";
		return "/feed/mainFeed";
	}

	@GetMapping("board/insert")
	public String insertBoard() {
		return "write/modal-feed-write";
	}
	
	@ResponseBody
	@PostMapping("submitFeed")
	public int submitFeed(
			@ModelAttribute Board inputBoard,
			@SessionAttribute("loginMember") Member loginMember,
			@RequestParam("images") List<MultipartFile> images
	) {
		inputBoard.setMemberNo(loginMember.getMemberNo());
		
		int result = service.boardInsert(inputBoard, images);
	
		return result;
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
