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
	
	@RequestMapping("/")
	public String loginPage() {
		return "/member/login";
	}
	
	public String mainPage() {
		
	 // return "/feed/test";
		 return "/board/randomPeed";
		// return "/feed/mainPeed";
	}
	
//	@RequestMapping("member/login")	//남길부분!!!!
//	public String loginPage() {	//남길부분!!!!
//			return "/member/login";	//남길부분!!!!
//	}

	
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
	
	@GetMapping("board/insert")
	public String insertBoard() {
		return "modal/modal-new-post";
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
