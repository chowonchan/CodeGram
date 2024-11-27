package edu.kh.cgram.sse.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.cgram.sse.dto.Notification;
import edu.kh.cgram.sse.mapper.SseMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

@Transactional // Java에서 데이터베이스 트랜잭션(transaction)을 관리
	// 1. 트랜잭션 시작 및 커밋
	// 2. 예외 발생 시 롤백(rollback)
	// 3. 데이터 일관성 유지
public class SseServiceImpl implements SseService{
	
	private final SseMapper mapper;
	
	
	@Override
	public Map<String, Object> insertNotification(Notification notification) {
		
		Map<String, Object> map = null;
		
		int insert = mapper.insertNotification(notification);
		
		if(insert > 0) {
			map = mapper.selectReceiveMember(notification.getNotificationNo());
		}
	
		return map;
	}
	
	@Override
	public Map<String, Object> insertFollowNotification(Notification notification) {
	    // FOLLOW 알림 삽입
	    int insert = mapper.insertNotification(notification);

	    if (insert > 0) {
	        // 팔로우 알림에 필요한 데이터만 반환
	        return Map.of(
	            "sendMemberNo", notification.getSendMemberNo(),
	            "receiveMemberNo", notification.getReceiveMemberNo(),
	            "type", notification.getType(),
	            "message", notification.getMessage()
	        );
	    }

	    return null;
	}

	
	
	@Override
	public List<Notification> selectNotificationList(int memberNo) {
		return mapper.selectNotificationList(memberNo);
	}
	
	
	@Override
	public void deleteNotification(int notificationNo) {
		mapper.deleteNotification(notificationNo);
	}
	
	@Override
	public void updateNotification(int notificationNo) {
		mapper.updateNotification(notificationNo);
	}
	
	

}
