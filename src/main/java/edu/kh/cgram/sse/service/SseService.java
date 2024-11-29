package edu.kh.cgram.sse.service;

import java.util.List;
import java.util.Map;

import edu.kh.cgram.sse.dto.Notification;

public interface SseService {

	Map<String, Object> insertNotification(Notification notification);

	List<Notification> selectNotificationList(int memberNo);

	void deleteNotification(int notificationNo);

	void updateNotification(int notificationNo);

	boolean notReadCheck(int memberNo);

}
