package edu.kh.cgram.board.controller;

import java.util.List;

import edu.kh.cgram.board.dto.Board;
import edu.kh.cgram.board.service.EditBoardService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import edu.kh.cgram.board.dto.BoardImg;
import edu.kh.cgram.board.service.BoardService;
import edu.kh.cgram.member.dto.Member;
import edu.kh.cgram.myactivity.service.MyActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;


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
	
	
	private final EditBoardService editBoardService;
	@GetMapping("insert")
	public String insertBoard() {
		return "write/modal-feed-write";
	}
	
	@GetMapping("update")
	public String updateBoard() {
		return "write/modal-feed-update";
	}
	
	@ResponseBody
	@PostMapping("submitFeed")
	public int submitFeed(
			@ModelAttribute Board inputBoard,
			@SessionAttribute("loginMember") Member loginMember,
			@RequestParam("images") List<MultipartFile> images
	) {
		inputBoard.setMemberNo(loginMember.getMemberNo());
		
		int result = editBoardService.boardInsert(inputBoard, images);
		
		return result;
	}
	
	@ResponseBody
	@PostMapping("updateFeed")
	public int updateFeed(
			@SessionAttribute("loginMember") Member loginMember
	) {
	
		return 0;
	}
	
	
	
}
