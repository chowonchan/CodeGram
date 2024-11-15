package edu.kh.cgram.chatting.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Message {
	
  private int messageNo;
  private String messageContent;
  private String readFl;
  private int memberNo;
  private int partnerNo;
  private int chatRoomNo;
  private String sendTime;
  
}
