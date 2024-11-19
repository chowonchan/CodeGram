package edu.kh.cgram.myactivity.service;

import java.util.List;

import edu.kh.cgram.board.dto.BoardImg;

public interface MyActivityService {

	List<BoardImg> getLikedPosts(int memberNo);

	int deleteLikes(int memberNo, List<Integer> postIds);

}
