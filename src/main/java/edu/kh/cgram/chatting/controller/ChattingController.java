package edu.kh.cgram.chatting.controller;

import java.lang.reflect.Member;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.cgram.chatting.dto.ChattingRoom;
import edu.kh.cgram.chatting.service.ChattingService;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/")
@RequiredArgsConstructor
public class ChattingController {

	private final ChattingService service;

	@RequestMapping("/chatting")
	public String chattingPage(
	    @SessionAttribute("loginMember") Member loginMember,
			Model model) {
		
//    List<ChattingRoom> roomList 
//    = service.selectRoomList(loginMember.getMemberNo());

		model.addAttribute("chatRoomList", null);
		return "chatting/chatting";
	}

	
//  @GetMapping("selectTarget")
//  @ResponseBody
//  public List<Member> selectTarget(
//    @RequestParam("query") String query,
//    @SessionAttribute("loginMember") Member loginMember
//  ){
//    return service.selectTarget(query, null);
//  }
	
	
	
	
	
	
	
	

}
