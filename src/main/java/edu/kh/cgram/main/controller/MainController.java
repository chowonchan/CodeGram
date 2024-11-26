package edu.kh.cgram.main.controller;

import java.util.List;

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
	
	private final BoardService boardService;
	
	private final MainService mainService;
	
	@RequestMapping("/")
	public String loginPage() {
		return "/member/login";
	}
	
	public String mainPage(
		) {

	 // return "/feed/test";
		 return "/board/randomPeed";
		// return "/feed/mainPeed";
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
	
	
	

}
