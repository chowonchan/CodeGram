package edu.kh.cgram.board.service;

import java.util.List;

import edu.kh.cgram.board.dto.Board;
import edu.kh.cgram.board.dto.BoardImg;

public interface BoardService {

	List<Board> getBoards(int page, Long lastBoardNo);

	List<BoardImg> getRandomPosts(int memberNo);


}
