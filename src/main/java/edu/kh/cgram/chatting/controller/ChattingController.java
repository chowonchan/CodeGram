package edu.kh.cgram.chatting.controller;

import java.lang.reflect.Member;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.cgram.chatting.dto.ChattingRoom;
import lombok.RequiredArgsConstructor;


@Controller
@RequestMapping("chatting")
@RequiredArgsConstructor
public class ChattingController {
	
	@RequestMapping("/")
	  public String chattingPage(
//	    @SessionAttribute("loginMember") Member loginMember,
//	    Model model
	  ){
//	    List<ChattingRoom> roomList 
//	      = service.selectRoomList(loginMember.getMemberNo());
//
//	    model.addAttribute("roomList", roomList);

	    return "chatting/chatting";
	  }
}
