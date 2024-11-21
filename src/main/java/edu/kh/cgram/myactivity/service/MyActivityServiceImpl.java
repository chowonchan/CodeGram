package edu.kh.cgram.myactivity.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.cgram.board.dto.BoardImg;
import edu.kh.cgram.myactivity.dto.CommentDetails;
import edu.kh.cgram.myactivity.mapper.MyActivityMapper;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MyActivityServiceImpl implements MyActivityService {
	
	private final MyActivityMapper mapper;

	@Override
	public List<BoardImg> getLikedPosts(int memberNo) {
		return mapper.selectLikedPosts(memberNo);
	}
	
	@Override
	public int deleteLikes(int memberNo, List<Integer> postIds) {
		return mapper.deleteLikes(memberNo, postIds);
	}
	
	@Override
	public List<BoardImg> getMemberPosts(int memberNo) {
		return mapper.selectMemberPosts(memberNo);
	}
	
	@Override
	public int deletePosts(int memberNo, List<Integer> postIds) {
    return mapper.deleteBoards(memberNo, postIds);
	}
	
	@Override
	public List<CommentDetails> getComments(int memberNo) {
		return mapper.selectComments(memberNo);
	}
	
	@Override
	public int deleteComments(int memberNo, List<Integer> commentIds) {
		return mapper.deleteComments(memberNo, commentIds);
	}
}
