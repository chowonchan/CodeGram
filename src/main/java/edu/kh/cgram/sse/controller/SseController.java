package edu.kh.cgram.sse.controller;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import edu.kh.cgram.member.dto.Member;
import edu.kh.cgram.sse.dto.Notification;
import edu.kh.cgram.sse.service.SseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController // @Controller + @ResponseBody
@SessionAttributes({"loginMember"})
@Slf4j
@RequiredArgsConstructor
@RequestMapping("sse")
public class SseController {

	@Autowired
	private SseService service;

	// SseEmitter : 서버로 부터 메시지를 전달 받을
	// 클라이언트 정보를 저장한 객체 == 연결된 클라이언트

	private final Map<String, SseEmitter> emitters 
			= new ConcurrentHashMap<>();

	/* 클라이언트 연결요청 */
	@GetMapping("/connect")
	public SseEmitter SseConnect(
			@SessionAttribute("loginMember") Member loginMember) {

		String clientId = loginMember.getMemberNo() + "";
		SseEmitter emitter = new SseEmitter(10 * 60 * 1000L);
		
		emitters.put(clientId, emitter);
		
    emitter.onCompletion(() -> emitters.remove(clientId));

    // 클라이언트 타임 아웃 시 Map에서 제거
    emitter.onTimeout(() -> emitters.remove(clientId));

		return emitter;
	}
	
	
	@PostMapping("/send")
	public void sendNotification(
			@RequestBody Notification notification,
			@SessionAttribute("loginMember") Member loginMember
			) {
		
		
		notification.setSendMemberNo(loginMember.getMemberNo());
		
  	Map<String, Object> map = service.insertNotification(notification);
  	
  	String clientId = map.get("receiveMemberNo").toString();
  	
    SseEmitter emitter = emitters.get(clientId);

    // clientId가 일치하는 클라이언트가 있을 경우
    if(emitter != null){
      try{
        emitter.send( map );
      }catch(Exception e){
        emitters.remove(clientId);
      }
    }
		
	}
	
	@GetMapping("notification")
	public List<Notification> selectNotificationList(
			@SessionAttribute("loginMember") Member loginMember
			){
		
		int memberNo = loginMember.getMemberNo();
		
		return service.selectNotificationList(memberNo);
	}
	
	
  @DeleteMapping("notification")
  public void deleteNotification(
  		@RequestBody int notificationNo,
  		@SessionAttribute("loginMember") Member loginMember) {

  	service.deleteNotification(notificationNo);
  }
	
	@PutMapping("notification")
	public void updateNotification(
			@RequestBody int notificationNo) {
		
		service.updateNotification(notificationNo);		
	}
	
	// 팔로우 알람
	@PostMapping("/follow")
	public void sendFollowNotification(
	        @RequestBody Map<String, Object> notificationData,
	        @SessionAttribute("loginMember") Member loginMember) {

	    // 요청 데이터에서 필요한 정보를 추출
	    int senderMemberNo = loginMember.getMemberNo(); // 세션에서 가져온 보낸 사람 번호
	    int receiverMemberNo = (int) notificationData.get("receiverMemberNo"); // 팔로우 대상 번호
	    String type = (String) notificationData.get("type"); // 알림 타입
	    String message = (String) notificationData.get("message"); // 알림 메시지

	    // Notification 객체 생성 및 데이터 설정
	    Notification notification = new Notification();
	    notification.setSendMemberNo(senderMemberNo);
	    notification.setReceiveMemberNo(receiverMemberNo);
	    notification.setType(type);
	    notification.setMessage(message);

	    // 알림 저장 로직 호출
	    Map<String, Object> resultMap = service.insertNotification(notification);

	    // SSE를 통해 클라이언트로 알림 전송
	    String clientId = String.valueOf(receiverMemberNo); // 수신자 ID
	    SseEmitter emitter = emitters.get(clientId);

	    if (emitter != null) {
	        try {
	            emitter.send(resultMap); // 알림 데이터 전송
	            log.info("알림 전송 성공: {}", resultMap);
	        } catch (Exception e) {
	            emitters.remove(clientId); // 오류 시 연결 제거
	            log.error("알림 전송 실패: {}", e.getMessage());
	        }
	    } else {
	        log.warn("수신 클라이언트가 연결되지 않았습니다: memberNo={}", receiverMemberNo);
	    }
	}


}
