package edu.kh.cgram.board.service;

import java.util.List;
import java.util.Map;

import edu.kh.cgram.board.dto.Board;
import edu.kh.cgram.board.dto.BoardImg;
import edu.kh.cgram.board.dto.Comment;
import edu.kh.cgram.member.dto.Member;

public interface BoardService {

	List<Board> getBoards(int page, Long lastBoardNo);

	List<BoardImg> getRandomPosts(int memberNo);
    
  // 게시글 수정 모달에 필요한 부분 로딩
  int selectDetail(int boardNo);

	Board selectBoardDetail(int boardNo);
	
	boolean isLiked(int boardNo, int memberNo);

	List<Comment> selectBoardComments(int boardNo);

	int likeBoard(int memberNo, int boardNo);

	int unlikeBoard(int memberNo, int boardNo);

	boolean isAuthor(int boardNo, int memberNo);

	List<Member> getLikes(int boardNo);

	int reportBoard(int boardNo, int memberNo, String reportReason);

//	String getMemberNickNameByBoardNo(int boardNo, int memberNo);
}
