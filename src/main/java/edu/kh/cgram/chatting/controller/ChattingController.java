package edu.kh.cgram.chatting.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.cgram.chatting.dto.ChattingRoom;
import edu.kh.cgram.chatting.dto.Message;
import edu.kh.cgram.chatting.service.ChattingService;
import edu.kh.cgram.member.dto.Member;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/chatting")
@RequiredArgsConstructor
public class ChattingController {

	private final ChattingService service;

  @GetMapping("") 
	public String chattingPage(
	    @SessionAttribute("loginMember") Member loginMember,
			Model model) {
		
    List<ChattingRoom> chatRoomList 
    = service.chatRoomList(loginMember.getMemberNo());

		model.addAttribute("chatRoomList", chatRoomList);
		return "chatting/chatting";
	}
	

	// 채팅 상대 검색
  @GetMapping("selectSearch")
  @ResponseBody
  public List<Member> selectSearch(
    @SessionAttribute("loginMember") Member loginMember ,
    @RequestParam("query") String query
  ){
  	
    return service.selectSearch(query, loginMember.getMemberNo());
  }
	
  
  @ResponseBody
  @PostMapping("enter")
  public int chattingEnter(
  		@RequestBody int partnerNo,
  		@SessionAttribute("loginMember") Member loginMember
  		) {
  	
    int chattingNo 
    = service.chattingEnter(partnerNo, loginMember.getMemberNo());

  return chattingNo;
  	
  }
	
  
  @GetMapping("chatRoomList")
  @ResponseBody
  public List<ChattingRoom> selectRoomList(
    @SessionAttribute("loginMember") Member loginMember){

    return service.chatRoomList(loginMember.getMemberNo());
  }
	
	// 메시지 조회
	@GetMapping("selectMessage")
	@ResponseBody
	public List<Message> selectMessage(
	    @RequestParam("chattingNo") int chattingNo,
	    @SessionAttribute("loginMember") Member loginMember
			){
		
    return service.selectMessage(chattingNo, loginMember.getMemberNo());
	}
	
	
  @PutMapping("updateReadFlag")
  @ResponseBody
  public int updateReadFlag(
    @RequestBody int chattingNo,
    @SessionAttribute("loginMember") Member loginMember) {
      return service.updateReadFlag(chattingNo, loginMember.getMemberNo());
  }
  

//  @PostMapping("/uploadImage")
//  public Map<String, String> uploadImage(
//          @RequestParam("image") MultipartFile image // 이미지 파일
//
//  ) {
//      // 이미지 업로드 처리
//      String imageUrl = service.uploadChatImage(image);
//
//      // URL을 반환
//      Map<String, String> response = new HashMap<>();
//      response.put("imageUrl", imageUrl);
//
//      return response; // 클라이언트에 이미지 URL 반환
//  }
  
  @PostMapping("/uploadImage")
  public ResponseEntity<Map<String, String>> uploadImage(
      @RequestParam("image") MultipartFile image
  ) {
      String imageUrl = service.uploadChatImage(image);

      // URL을 반환
      Map<String, String> response = new HashMap<>();
      response.put("imageUrl", imageUrl);

      return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }
  
  

}
