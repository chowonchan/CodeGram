package edu.kh.cgram.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import edu.kh.cgram.board.dto.Board;
import edu.kh.cgram.common.dto.Pagination;
import edu.kh.cgram.common.dto.Report;
import edu.kh.cgram.member.dto.Member;

@Mapper
public interface AdminMapper {

	int getMemberCount();

	List<Member> selectMemberList(Pagination pagination);

	int updateMemberStatus(@Param("memberNickname") String memberNickname);

	int getFeedCount();

	List<Board> selectFeedList(Pagination pagination);

	int updateFeedStatus(int boardNo);

	int getFeedReportCount();

	List<Report> selectFeedReportList(Pagination pagination);

	int getCommentReportCount();
	
	List<Report> selectCommentReportList(Pagination pagination);

	int deleteReport(int reportNo);

	int getFeedReportCount1(String queryParam);

	List<Report> selectFeedReportList1(@Param("pagination") Pagination pagination, @Param("queryParam") String queryParam);

	int getCommentReportCount1(String queryParam);

	List<Report> selectCommentReportList1(@Param("pagination") Pagination pagination, @Param("queryParam") String queryParam);

	int updateCommentStatus(int commentNo);

}
