package edu.kh.cgram.board.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import edu.kh.cgram.board.dto.Board;
import edu.kh.cgram.board.dto.BoardImg;
import edu.kh.cgram.board.dto.Comment;
import edu.kh.cgram.member.dto.Member;


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

	// 팔로우 하지 않은 회원들의 피드 랜덤 조회
	List<BoardImg> selectRandomPosts(int memberNo);
 
	// 게시글 상세 조회
    int selectDetail(int boardNo);

 // 게시글 상세 조회
    Board selectBoardDetail(int boardNo);

    // 게시글 댓글 조회
    List<Comment> selectBoardComments(@Param("boardNo") int boardNo, @Param("memberNo") int memberNo);

		int checkLike(Map<String, Object> paramMap);

		int insertLike(Map<String, Object> paramMap);

		int deleteBoardLike(Map<String, Object> paramMap);

		int checkAuthor(Map<String, Object> paramMap);

		List<Member> selectLikesByBoardNo(int boardNo);

		int insertReport(Map<String, Object> paramMap);

		int insertComment(Map<String, Object> paramMap);

		int insertCommentLike(Map<String, Object> paramMap);

		int deleteCommentLike(Map<String, Object> paramMap);

		List<Map<String, Object>> selectBoardImages(int boardNo);
    
		
    int feedDelete(int boardNo, int memberNo);
}
