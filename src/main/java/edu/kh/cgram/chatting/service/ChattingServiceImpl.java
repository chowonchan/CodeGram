package edu.kh.cgram.chatting.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.cgram.chatting.dto.ChattingRoom;
import edu.kh.cgram.member.dto.Member;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ChattingServiceImpl implements ChattingService {
	
	private final edu.kh.cgram.chatting.mapper.ChattingMapper mapper;

	@Override
	public List<ChattingRoom> chatRoomList(int memberNo) {
		return mapper.chatRoomList(memberNo);
	}
	
	// 회원 검색
	@Override
	public List<Member> selectSearch(String query, int memberNo) {
		return mapper.selectSearch(query, memberNo);
	}
	
	
	@Override
	public int chattingEnter(int partnerNo, int memberNo) {
		
		// 두회원이 있는 채팅방 존재 할때
		int chattingNo = mapper.checkChattingRoom(partnerNo, memberNo);
		
    // 두 회원이 참여한 채팅방이 없을 경우
    if(chattingNo == 0){
      Map<String, Object> map = new HashMap<>();
      map.put("partnerNo", partnerNo);
      map.put("memberNo", memberNo);
      
  
      
      // 채팅방 테이블 삽입
      int result = mapper.createChattingRoom(map);
      
      chattingNo = (int)map.get("chattingNo");
      }
    
		return chattingNo;
	}
	

}
