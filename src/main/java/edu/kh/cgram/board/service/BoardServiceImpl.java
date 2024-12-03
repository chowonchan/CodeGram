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
import edu.kh.cgram.member.dto.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
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
	public List<Map<String, Object>> selectBoardImages(int boardNo) {
		return mapper.selectBoardImages(boardNo);
	}

  @Override
  public List<Comment> selectBoardComments(int boardNo, int memberNo) {
  	return mapper.selectBoardComments(boardNo, memberNo);
  }
  
  @Override
  public boolean isLiked(int boardNo, int memberNo) {
  	Map<String, Object> paramMap = new HashMap<>();
  	paramMap.put("memberNo", memberNo);
		paramMap.put("boardNo", boardNo);
  	return mapper.checkLike(paramMap) > 0;
  }
  
  @Override
  public int unlikeBoard(int memberNo, int boardNo) {
  	Map<String, Object> paramMap = new HashMap<>();
  	paramMap.put("memberNo", memberNo);
		paramMap.put("boardNo", boardNo);
  	return mapper.deleteBoardLike(paramMap);
  }
    
  @Override
  public int likeBoard(int memberNo, int boardNo) {
  	Map<String, Object> paramMap = new HashMap<>();
  	paramMap.put("memberNo", memberNo);
		paramMap.put("boardNo", boardNo);
  	// 이미 좋아요를 누른 상태인지 확인
    int check = mapper.checkLike(paramMap);

    if (check > 0) {
        return 0; // 이미 좋아요 상태
    } else {
    	int result = mapper.insertLike(paramMap);
    	if (result > 0) {
			return result; // 좋아요 상태
    	} else {
			return 0;
    	}
    }
  }
  
  @Override
  public boolean isAuthor(int boardNo, int memberNo) {
  	Map<String, Object> paramMap = new HashMap<>();
  	paramMap.put("memberNo", memberNo);
		paramMap.put("boardNo", boardNo);
  	return mapper.checkAuthor(paramMap) > 0;
  }
  
	@Override
	public List<Member> getLikes(int boardNo) {
	   return mapper.selectLikesByBoardNo(boardNo);
	}
	
	@Override
	public int reportBoard(int boardNo, int memberNo, String reportReason, int contentType) {
		Map<String, Object> paramMap = new HashMap<>();
  	paramMap.put("memberNo", memberNo);
		paramMap.put("boardNo", boardNo);
		paramMap.put("reportReason", reportReason);
		paramMap.put("contentType", contentType);
		return mapper.insertReport(paramMap);
	}
	
	@Override
	public int postComment(int boardNo, int memberNo, String commentContent) {
		Map<String, Object> paramMap = new HashMap<>();
  	paramMap.put("memberNo", memberNo);
		paramMap.put("boardNo", boardNo);
		paramMap.put("commentContent", commentContent);
		return mapper.insertComment(paramMap);
	}
	
	@Override
	public int likeComment(int commentNo, int memberNo) {
		Map<String, Object> paramMap = new HashMap<>();
  	paramMap.put("memberNo", memberNo);
		paramMap.put("commentNo", commentNo);
		log.debug("memberNo: {}, commentNo: {}", memberNo, commentNo);
		return mapper.insertCommentLike(paramMap);
	}
	
	@Override
	public int unlikeComment(int commentNo, int memberNo) {
		Map<String, Object> paramMap = new HashMap<>();
  	paramMap.put("memberNo", memberNo);
		paramMap.put("commentNo", commentNo);
		log.debug("memberNo: {}, commentNo: {}", memberNo, commentNo);
		return mapper.deleteCommentLike(paramMap);
	}

}