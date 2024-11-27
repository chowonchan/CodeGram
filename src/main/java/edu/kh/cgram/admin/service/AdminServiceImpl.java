package edu.kh.cgram.admin.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.cgram.admin.mapper.AdminMapper;
import edu.kh.cgram.board.dto.Board;
import edu.kh.cgram.common.dto.Pagination;
import edu.kh.cgram.common.dto.Report;
import edu.kh.cgram.member.dto.Member;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
	
	private final AdminMapper mapper;

  @Override
  public int getMemberCount() {
  	return mapper.getMemberCount();
  }

  @Override
  public Map<String, Object> selectMemberList(Pagination pagination) {
    List<Member> memberList = mapper.selectMemberList(pagination);
    Map<String, Object> resultMap = new HashMap<>();
    resultMap.put("memberList", memberList);
    return resultMap;
  }
   
  @Override
  public int updateMemberStatus(String memberNickname) {
  	return mapper.updateMemberStatus(memberNickname);
  }
  
  @Override
  public int getFeedCount() {
  	return mapper.getFeedCount();
  }
  
  @Override
  public Map<String, Object> selectFeedList(Pagination pagination) {
  	List<Board> feedList = mapper.selectFeedList(pagination);
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("feedList", feedList);
  	return resultMap;
  }
  
  @Override
  public int updateFeedStatus(int boardNo) {
  	return mapper.updateFeedStatus(boardNo);
  }
  
  @Override
  public int getFeedReportCount() {
  	return mapper.getFeedReportCount();
  }
  
  @Override
  public Map<String, Object> selectFeedReportList(Pagination pagination) {
		List<Report> feedReportList = mapper.selectFeedReportList(pagination);
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("feedReportList", feedReportList);
  	return resultMap;
  }
  
  @Override
  public int getCommentReportCount() {
  	return mapper.getCommentReportCount();
  }
  
  @Override
  public Map<String, Object> selectCommentReportList(Pagination pagination) {
		List<Report> commentReportList = mapper.selectCommentReportList(pagination);
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("commentReportList", commentReportList);
  	return resultMap;
  }

}
