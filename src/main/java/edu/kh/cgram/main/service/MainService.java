package edu.kh.cgram.main.service;

import java.util.Map;

public interface MainService {

	
	// 좋아요
	Map<String, Object> boardLike(int boardNo, int memberNo);

	// Keep
	Map<String, Object> boardMark(int boardNo, int memberNo);

}
