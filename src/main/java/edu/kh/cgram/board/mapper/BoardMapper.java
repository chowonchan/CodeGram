package edu.kh.cgram.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.cgram.board.dto.Board;

@Mapper
public interface BoardMapper {

	//처음 로드 시 최신 게시물 조회
	List<Board> findLatestBoards(int page, int pageSize);

	//마지막 게시물 번호 이후로 게시물 조회
	List<Board> findBoardsAfter(Long lastBoardNo, int page, int pageSize);

}
