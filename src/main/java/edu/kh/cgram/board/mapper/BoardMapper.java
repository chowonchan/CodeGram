package edu.kh.cgram.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.cgram.board.dto.Board;
import io.lettuce.core.dynamic.annotation.Param;

@Mapper
public interface BoardMapper {

	// 최신 게시물 가져오기
	List<Board> findLatestBoards(
			@Param("page") int page, 
			@Param("pageSize") int pageSize);

	// 마지막 게시물 번호 이후 게시물 가져오기
	List<Board> findBoardsAfter(
			@Param("lastBoardNo") Long lastBoardNo, 
			@Param("page") int page,
			@Param("pageSize") int pageSize);

}
