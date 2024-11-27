package edu.kh.cgram.main.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import edu.kh.cgram.main.mapper.MainMapper;
import edu.kh.cgram.member.dto.Member;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MainServiceImpl implements MainService {

	private final MainMapper mapper;

	// 좋아요 up 및 down
	@Override
	public Map<String, Object> boardLike(int boardNo, int memberNo) {
		
		// 좋아요를 이미 눌렀는지 확인
		int result = mapper.checkBoardLike(boardNo, memberNo);
		
		int result2 = 0;
		if(result == 0) {
			result2 = mapper.insertBoardLike(boardNo, memberNo);
		} else {
			result2 = mapper.deleteBoardLike(boardNo, memberNo);
		}
		
		int count = 0;
		if(result2 > 0) {
			count = mapper.getLikeCount(boardNo);
		} else {
			return null;
		}
		
		Map<String, Object> map = new HashMap<>();
		
		map.put("count", count);
		
		if(result == 0) map.put("check", "insert");
		else 						map.put("check", "delete");
		
		return map;
	}

	// Keep
	@Override
	public Map<String, Object> boardMark(int boardNo, int memberNo) {
		
		// Keep 이미 눌렀는지 확인
		int result = mapper.checkBoardMark(boardNo,memberNo);
		
		int result2 = 0;
		if(result == 0) {
			result2 = mapper.insertBoardMark(boardNo, memberNo);
		} else {
			result2 = mapper.deleteBoardMark(boardNo, memberNo);
		}
		
		int count = 0;
		if(result2 > 0) {
			count = mapper.getMarkCount(boardNo);
		} else {
			return null;
		}
		
		Map<String, Object> map = new HashMap<>();
		
		map.put("count", count);
		
		if(result == 0) map.put("check", "insert");
		else 						map.put("check", "delete");
		
		return map;
	}
	
	
	@Override
	public Map<String, Object> selectFeedList(Member loginMember, int cp) {
		
		// 1. loginMember가 팔로우하고있는 회원들 조회
		int followList = mapper.getFollowList(loginMember);
		
		
		return null;
	}

	

	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
