package edu.kh.cgram.chatting.service;

import java.util.List;

import edu.kh.cgram.chatting.dto.ChattingRoom;
import edu.kh.cgram.member.dto.Member;

public interface ChattingService {

	List<ChattingRoom> chatRoomList(int memberNo);

	List<Member> selectSearch(String query, int memberNo);

	int chattingEnter(int partnerNo, int memberNo);

}
