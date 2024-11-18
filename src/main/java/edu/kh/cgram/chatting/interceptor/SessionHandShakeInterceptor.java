package edu.kh.cgram.chatting.interceptor;

import java.util.Map;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import jakarta.servlet.http.HttpSession;

@Component
public class SessionHandShakeInterceptor implements HandshakeInterceptor{
	
	@Override
	public boolean beforeHandshake(
			ServerHttpRequest request, ServerHttpResponse response, 
			WebSocketHandler wsHandler, Map<String, Object> attributes) 
					throws Exception {

		if(request instanceof ServletServerHttpRequest) {
			
			// 다운 캐스팅 시킨다
			ServletServerHttpRequest servletRequest
				= (ServletServerHttpRequest) request;
			
			// HTTP Sessiont 얻어온다
			HttpSession session
				= servletRequest.getServletRequest().getSession();
			
      // HTTP session을 가로채서 핸들러에 전달
			attributes.put("session", session);
		}
		
		return true;
	}
	
	
	
	@Override
	public void afterHandshake(
			ServerHttpRequest request, ServerHttpResponse response, 
			WebSocketHandler wsHandler, Exception exception) {

		
	}

}
