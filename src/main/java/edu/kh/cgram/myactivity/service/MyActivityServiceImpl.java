package edu.kh.cgram.myactivity.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.cgram.board.dto.BoardImg;
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
}
