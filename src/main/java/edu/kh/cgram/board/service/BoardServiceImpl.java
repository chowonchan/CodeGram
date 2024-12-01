package edu.kh.cgram.board.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.cgram.board.dto.Board;
import edu.kh.cgram.board.dto.BoardImg;
import edu.kh.cgram.board.dto.Comment;
import edu.kh.cgram.board.mapper.BoardMapper;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

	private final BoardMapper mapper;
	
	// 게시글 상세 조회
	@Override
	public int selectDetail(int boardNo) {
		return mapper.selectDetail(boardNo);
	}
	
	@Override
	public List<Board> getBoards(int page, Long lastBoardNo) {
		int pageSize = 10; // 한 번에 가져올 게시물 개수 (예: 10개)

		if (lastBoardNo == null) {
			// 처음 로드 시 최신 게시물 조회
			return mapper.findLatestBoards(page, pageSize);
		} else {
			// 마지막 게시물 번호 이후로 게시물 조회
			return mapper.findBoardsAfter(lastBoardNo, page, pageSize);
		}
	}
	
	@Override
	public List<BoardImg> getRandomPosts(int memberNo) {
		return mapper.selectRandomPosts(memberNo);
	}
	
	@Override
    public Board selectBoardDetail(int boardNo) {
        return mapper.selectBoardDetail(boardNo);
    }

    @Override
    public List<Comment> selectBoardComments(int boardNo) {
        return mapper.selectBoardComments(boardNo);
    }
}