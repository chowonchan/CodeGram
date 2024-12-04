package edu.kh.cgram.main.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import edu.kh.cgram.board.dto.Board;
import edu.kh.cgram.board.dto.Recommend;
import edu.kh.cgram.common.dto.Pagination;
import edu.kh.cgram.follow.dto.Follow;
import edu.kh.cgram.main.mapper.MainMapper;
import edu.kh.cgram.member.dto.Member;
import edu.kh.cgram.story.dto.Story;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MainServiceImpl implements MainService {

	private final MainMapper mapper;

	// 좋아요 up 및 down
	@Override
	public Map<String, Object> boardLike(int boardNo, int memberNo) {
		
		// 좋아요를 이미 눌렀는지 확인
		int result = mapper.checkBoardLike(boardNo, memberNo);
		
		int result2 = 0;
		if(result == 0) {
			result2 = mapper.insertBoardLike(boardNo, memberNo);
		} else {
			result2 = mapper.deleteBoardLike(boardNo, memberNo);
		}
		
		int count = 0;
		if(result2 > 0) {
			count = mapper.getLikeCount(boardNo);
		} else {
			return null;
		}
		
		Map<String, Object> map = new HashMap<>();
		
		map.put("count", count);
		
		if(result == 0) map.put("check", "insert");
		else 						map.put("check", "delete");
		
		return map;
	}

	// Keep
	@Override
	public Map<String, Object> boardMark(int boardNo, int memberNo) {
		
		// Keep 이미 눌렀는지 확인
		int result = mapper.checkBoardMark(boardNo,memberNo);
		
		int result2 = 0;
		if(result == 0) {
			result2 = mapper.insertBoardMark(boardNo, memberNo);
		} else {
			result2 = mapper.deleteBoardMark(boardNo, memberNo);
		}
		
		int count = 0;
		if(result2 > 0) {
			count = mapper.getMarkCount(boardNo);
		} else {
			return null;
		}
		
		Map<String, Object> map = new HashMap<>();
		
		map.put("count", count);
		
		if(result == 0) map.put("check", "insert");
		else 						map.put("check", "delete");
		
		return map;
	}
	
	
	@Override
	public Map<String, Object> selectFeedList(int memberNo, int cp) {
		
		// 1. memberNo가 팔로우하고있는 회원들 조회
		List<Follow> followList = mapper.getFollowList(memberNo);
		
		// 2. 팔로우하고 있는 회원들 Feed의 전체 개수 조회 ( 삭제되지 않은 글만 카운트)
		int followListCount = mapper.getFollowListCount(memberNo);
		
		// 3. followListCount, cp를 사용해
		// 조회될 목록 페이지, 출력할 페이지네이션의 값을 계산할 Pagination 객체 생성
		
		// 한 페이지에 보일 게시글 수
		int limit = 10;

		//전체 게시글 수, 현재 페이지 번호, 한 페이지에 보일 게시글 수, 보여질 페이지 번호개수
		Pagination pagination = new Pagination(followListCount, cp, limit, 1);

		// 4. DB에서 cp에 해당하는 행을 조회
		int offset = (cp - 1) * limit;
		RowBounds rowBounds = new RowBounds(offset, limit);
		
		// 팔로우 하고 있는 회원들의 피드 목록 조회
		List<Board> feedList = mapper.selectFeedList(memberNo, rowBounds);
		
		// 팔로우 하지 않은 회원 추천 목록
		List<Recommend> recommendList = mapper.selectRecommendList(memberNo);
		
		List<Story> storyList = mapper.selectStoryList(memberNo);
		
		// 5. 목록 조회 결과 + Pagination 객체를 Map으로 묶어서 반환
		Map<String, Object> map = new HashMap<>();
		map.put("storyList", storyList);
		map.put("feedList", feedList);
		map.put("pagination", pagination);
		map.put("recommendList", recommendList);
		
		return map;
	}

	

	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
