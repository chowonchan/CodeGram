package edu.kh.cgram.main.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import edu.kh.cgram.board.dto.Board;
import edu.kh.cgram.board.dto.Recommend;
import edu.kh.cgram.follow.dto.Follow;
import edu.kh.cgram.member.dto.Member;

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

	// Follow 리스트 조회
	List<Follow> getFollowList(int memberNo);

	// 팔로우하고 있는 회원들 Peed의 전체 개수 조회
	int getFollowListCount(int memberNo);

	// 지정된 페이지 분량의 Feed 목록 조회
	List<Board> selectFeedList(int memberNo, RowBounds rowBounds);

	// 팔로우하지 않은 회원 추천 목록
	List<Recommend> selectRecommendList(int memberNo);

}
