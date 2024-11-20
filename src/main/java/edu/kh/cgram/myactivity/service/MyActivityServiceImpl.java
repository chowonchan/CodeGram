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
		 // 1. 자식 레코드(이미지) 먼저 삭제
    int imgDeleteResult = mapper.deleteBoardImgs(postIds);
    
    // 2. 부모 레코드(게시글) 삭제
    int boardDeleteResult = mapper.deleteBoards(memberNo, postIds);
    
    return boardDeleteResult;
	}
	
	@Override
	public List<CommentDetails> getComments(int memberNo) {
		return mapper.selectComments(memberNo);
	}
}
