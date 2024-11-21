package edu.kh.cgram.board.service;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.kh.cgram.board.dto.Board;
import edu.kh.cgram.board.mapper.BoardMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

	private final BoardMapper boardMapper;

	@Override
	public List<Board> getBoards(int page, Long lastBoardNo) {
		int pageSize = 10; // 한 번에 가져올 게시물 개수 (예: 10개)

		if (lastBoardNo == null) {
			// 처음 로드 시 최신 게시물 조회
			return boardMapper.findLatestBoards(page, pageSize);
		} else {
			// 마지막 게시물 번호 이후로 게시물 조회
			return boardMapper.findBoardsAfter(lastBoardNo, page, pageSize);
		}

	}
}