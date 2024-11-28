package edu.kh.cgram.admin.service;

import java.util.Map;

import edu.kh.cgram.common.dto.Pagination;

public interface AdminService {

	int getMemberCount();
	
	Map<String, Object> selectMemberList(Pagination pagination);

	int updateMemberStatus(String memberNickname);

	int getFeedCount();

	Map<String, Object> selectFeedList(Pagination pagination);

	int updateFeedStatus(int boardNo);

	int getFeedReportCount();

	Map<String, Object> selectFeedReportList(Pagination pagination);

	int getCommentReportCount();
	
	Map<String, Object> selectCommentReportList(Pagination pagination);

	int deleteReport(int reportNo);

	int getFeedReportCount1(String queryParam);

	Map<String, Object> selectFeedReportList1(Pagination pagination, String queryParam);

	int getCommentReportCount1(String queryParam);

	Map<String, Object> selectCommentReportList1(Pagination pagination, String queryParam);

	int updateCommentStatus(int commentNo);

}
