package edu.kh.cgram.chatting.controller;

import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	
//  private final SimpMessageSendingOperations messagingTemplate;

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
//  public ResponseEntity<?> handleImageUpload(@RequestParam("image") MultipartFile image) {
//      try {
//          // 이미지를 Base64로 인코딩
//          String base64Image = Base64.getEncoder().encodeToString(image.getBytes());
//          String imageUrl = "data:" + image.getContentType() + ";base64," + base64Image;
//
//          // 응답 데이터 생성
//          Map<String, String> response = new HashMap<>();
//          response.put("imageUrl", imageUrl);
//
//          // WebSocket을 통해 채팅 참가자들에게 이미지 전송
//          // ChatMessage 객체는 실제 프로젝트의 메시지 형식에 맞게 수정 필요
//          /*
//          ChatMessage chatMessage = ChatMessage.builder()
//              .type(MessageType.IMAGE)
//              .sender(sender)
//              .roomId(roomId)
//              .content(imageUrl)
//              .build();
//          
//          messagingTemplate.convertAndSend("/topic/chat/room/" + roomId, chatMessage);
//          */
//
//          return ResponseEntity.ok(response);
//
//      } catch (Exception e) {
//          return ResponseEntity.internalServerError()
//              .body("이미지 처리 실패: " + e.getMessage());
//      }
//  }

}
