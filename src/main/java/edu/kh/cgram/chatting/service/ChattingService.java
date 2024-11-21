package edu.kh.cgram.chatting.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import edu.kh.cgram.chatting.dto.ChattingRoom;
import edu.kh.cgram.chatting.dto.Message;
import edu.kh.cgram.member.dto.Member;

public interface ChattingService {

	List<ChattingRoom> chatRoomList(int memberNo);

	List<Member> selectSearch(String query, int memberNo);

	int chattingEnter(int partnerNo, int memberNo);

	List<Message> selectMessage(int chattingNo, int memberNo);

	int insertMessage(Message msg);

	int updateReadFlag(int chattingNo, int memberNo);

	String uploadChatImage(MultipartFile image);



}
