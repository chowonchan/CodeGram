package edu.kh.cgram.chatting.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.cgram.chatting.dto.ChattingRoom;
import edu.kh.cgram.chatting.dto.Message;
import edu.kh.cgram.chatting.mapper.ChattingMapper;
import edu.kh.cgram.member.dto.Member;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ChattingServiceImpl implements ChattingService {
	
	private final ChattingMapper mapper;

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
	
	
	// 메시지 조회
	@Override
	public List<Message> selectMessage(int chattingNo, int memberNo) {
		
		List<Message> messageList = mapper.selectMessage(chattingNo);
		
		
		// 조회된 메시지 목록이 있을 경우
		if(messageList.isEmpty() == false) {

			int result = mapper.updateReadFlag(chattingNo, memberNo);
		}
		
		return messageList;
	}
	
	
	@Override
	public int updateReadFlag(int chattingNo, int memberNo) {

		return mapper.updateReadFlag(chattingNo, memberNo);
	}
	
	@Override
	public int insertMessage(Message msg) {
		return mapper.insertMessage(msg);
	}
	
	

}
