package edu.kh.cgram.board.service;

import java.util.List;

import edu.kh.cgram.board.dto.Board;

public interface BoardService {

	List<Board> getBoards(int page, Long lastBoardNo);


}
