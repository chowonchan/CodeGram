package edu.kh.cgram.main.service;

import java.util.Map;

import edu.kh.cgram.member.dto.Member;

public interface MainService {

	
	// 좋아요
	Map<String, Object> boardLike(int boardNo, int memberNo);

	// Keep
	Map<String, Object> boardMark(int boardNo, int memberNo);

	// Feed 목록 조회
	Map<String, Object> selectFeedList(int memberNo, int cp);


}
