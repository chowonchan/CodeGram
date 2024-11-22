package edu.kh.cgram.myactivity.service;

import java.util.List;

import edu.kh.cgram.board.dto.BoardImg;
import edu.kh.cgram.myactivity.dto.CommentDetails;

public interface MyActivityService {

	List<BoardImg> getLikedPosts(int memberNo);

	int deleteLikes(int memberNo, List<Integer> postIds);
	
	List<BoardImg> getMemberPosts(int memberNo);

	int deletePosts(int memberNo, List<Integer> postIds);

	List<CommentDetails> getComments(int memberNo);

	int deleteComments(int memberNo, List<Integer> commentIds);

}
