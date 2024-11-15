package edu.kh.cgram.chatting.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChattingRoom {
	
  private int chattingRoomNo;
  private String lastMessage;
  private String sendTime;
  private int partnerNo;
  private String partnerName;
  private String partnerNickname;
  private String partnerProfile;
  private int notReadCount;
  private int maxMessageNo;
  
}
