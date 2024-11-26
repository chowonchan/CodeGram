package edu.kh.cgram.sse.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Notification {
	
  private int 	 notificationNo;
  private String notificationContent;
  private String notificationCheck;
  private String notificationDate;
  private String notificationUrl;
  private int    sendMemberNo;
  private int    receiveMemberNo;

  private String notificationType; // 알림 내용을 구분해서 만드는 용도
  private int    pkNo; // 알림이 보내진 게시글 번호

  private String sendMemberProfileImg;

}
