package edu.kh.cgram.main.mapper;

import org.apache.ibatis.annotations.Mapper;

import org.apache.ibatis.annotations.Param;

@Mapper
public interface MainMapper {

	// 좋아요 이미 눌렀는지 확인
	int checkBoardLike(
			@Param("boardNo") 	int boardNo,
			@Param("memberNo") 	int memberNo);

	// 좋아요 추가
	int insertBoardLike(
			@Param("boardNo") 	int boardNo,
			@Param("memberNo") 	int memberNo);

	// 좋아요 삭제
	int deleteBoardLike(
			@Param("boardNo") 	int boardNo,
			@Param("memberNo") 	int memberNo);

	// 좋아요 개수
	int getLikeCount(int boardNo);

	// Keep 이미 눌렀는지 확인
	int checkBoardMark(
			@Param("boardNo")		int boardNo, 
			@Param("memberNo") 	int memberNo);

	// Keep 추가
	int insertBoardMark(
			@Param("boardNo") 	int boardNo, 
			@Param("memberNo") 	int memberNo);

	// Keep 삭제
	int deleteBoardMark(
			@Param("boardNo") 	int boardNo, 
			@Param("memberNo") 	int memberNo);

	// Keep 개수
	int getMarkCount(int boardNo);

}
