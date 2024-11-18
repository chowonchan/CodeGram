package edu.kh.cgram.chatting.handler;

import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

import edu.kh.cgram.chatting.dto.Message;
import edu.kh.cgram.chatting.service.ChattingService;
import edu.kh.cgram.member.dto.Member;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;




@Component // 빈 등록
@Slf4j
public class ChattingWebsocketHandler extends TextWebSocketHandler{
	
	@Autowired
	private ChattingService service;
	
	private Set<WebSocketSession> sessions 
		= Collections.synchronizedSet(new HashSet<>());
	
	
	// 클라이언트 연결이 완료된 후 수행
	@Override
	public void afterConnectionEstablished(WebSocketSession session) 
			throws Exception {

		sessions.add(session);
	}
	
	
	// 연결 종료 되었을 때
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session); // 목록 에서 제거
	}
	
	
	
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		log.debug("message : {}", message.getPayload());
		
		// ObjectMapper : JSON <-> DTO 변환하는 객체 (Jackson 라이브러리 제공)
		ObjectMapper objectMapper = new ObjectMapper();
		

		// JSON 메시지를 Message 클래스 형태로 변환후 Message 객체에 대입
		Message msg = objectMapper.readValue(message.getPayload(), Message.class);
		
		
    // 채팅을 보낸 회원의 회원 번호 얻어오기
    // -> 로그인한 회원 번호(session)
    //  -> WebSocketSession에 담겨있음!!!
		HttpSession currentSession = (HttpSession)session
																	.getAttributes().get("session");
		
		// 채팅 보낸 회원
		Member sendMember = ( (Member)currentSession.getAttribute("loginMember") );
		
		int memberNo = sendMember.getMemberNo(); // 보낸 회원 번호
		
		msg.setMemberNo(memberNo);
		
		// ---------- DB INSERT ----------
		
		// 1) chattingService 의존성 주입 받기
		
		// 2) INSERT 서비스 호출 (msg: chattingRoomNo, messageContent, senderNo, targetNo)
		int result = service.insertMessage(msg);
		
		if(result == 0) return;
		
		// 채팅이 보내진 시간을 msg에 기록
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd hh:mm");
		
		msg.setSendTime(sdf.format(new Date()));
		
		// ---------- DB INSERT ----------
		
		log.debug("msg : {}", msg);
		
		// 연결된 모든 클라이언트를 순차 접근
		for (WebSocketSession wss : sessions) {

			// 채팅방에 입장한 사람들( 보낸 사람, 받는 사람)에게만
			// 메시지(msg) 전달
			HttpSession clientSession = (HttpSession)wss.getAttributes().get("session");
			
			// 웹 소켓 접속 회원 목록에서 꺼낸 회원 번호
			int clientNo = ((Member)clientSession
											.getAttribute("loginMember")).getMemberNo();
			
			log.debug("clientNo : {} ", clientNo);
			
      // 메시지를 보낸 사람/받는 사람 찾기
			if(msg.getPartnerNo() == clientNo || msg.getMemberNo() == clientNo) {
				TextMessage textMessage = new TextMessage(objectMapper.writeValueAsString(msg));
				wss.sendMessage(textMessage);
			}
			
		}
	}

}
