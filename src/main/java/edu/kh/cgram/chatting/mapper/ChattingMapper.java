package edu.kh.cgram.chatting.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import edu.kh.cgram.chatting.dto.ChattingRoom;
import edu.kh.cgram.member.dto.Member;

@Mapper
public interface ChattingMapper {

	// 채팅 방 조회
	List<ChattingRoom> chatRoomList(int memberNo);

	// 채팅 상대 검색
	List<Member> selectSearch(@Param("query") String query, @Param("memberNo") int memberNo);

	// 채팅 방이 있는지 확인
	int checkChattingRoom(@Param("partnerNo") int partnerNo, @Param("memberNo") int memberNo);

	// 채팅방 테이블 삽입
	int createChattingRoom(Map<String, Object> map);
	
	

}
