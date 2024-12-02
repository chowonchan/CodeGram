package edu.kh.cgram.admin.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.cgram.admin.service.AdminService;
import edu.kh.cgram.common.dto.Pagination;
import edu.kh.cgram.member.dto.Member;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
	
	private final AdminService service;
	
	@GetMapping("admin-memberList")
	public String adminPage(
	        @SessionAttribute("loginMember") Member loginMember,
	        HttpServletRequest request) {
	    
	    if (loginMember.getAdmin() != 2) {
	        String referer = request.getHeader("Referer"); // 이전 페이지 URL 가져오기
	        if (referer == null || referer.isEmpty()) {
	            referer = "/main2"; // Referer가 없을 경우 기본 경로 설정
	        }
	        return "redirect:" + referer;
	    }
	    
	    return "/admin/admin-memberList";
	}
	
	
	 @GetMapping("/selectMemberList")
	 @ResponseBody
   public Map<String, Object> selectMemberList(@RequestParam(value = "cp", defaultValue = "1") int currentPage) {
     int listCount = service.getMemberCount();
     Pagination pagination = new Pagination(listCount, currentPage, 10, 5); // 한 페이지에 10명씩, 페이지네이션 블록 5개씩
     Map<String, Object> resultMap = service.selectMemberList(pagination);
     resultMap.put("pagination", pagination);
     return resultMap;
   }
	 
	 @PutMapping("/updateMemberStatus")
	 @ResponseBody
	 public int updateMemberStatus(
	   @RequestBody String memberNickname) {
		 
		 int result = service.updateMemberStatus(memberNickname);
		 
		 return result;
	 }
	 
	 @GetMapping("/selectFeedList")
	 @ResponseBody
	 public Map<String, Object> selectFeedList(@RequestParam(value = "cp", defaultValue = "1") int currentPage) {
		 int listCount = service.getFeedCount();
		 Pagination pagination = new Pagination(listCount, currentPage, 10, 5); // 한 페이지에 10개씩, 페이지네이션 블록 5개씩
		 Map<String, Object> resultMap = service.selectFeedList(pagination);
		 resultMap.put("pagination", pagination);
		 return resultMap;
	 }
	 
	 @PutMapping("/updateFeedStatus")
	 @ResponseBody
	 public int updateFeedStatus(
		 @RequestBody int boardNo) {
		 
		 int result = service.updateFeedStatus(boardNo);
		 
		 return result;
	 }
	 
	 @GetMapping("/selectFeedReportList")
	 @ResponseBody
	 public Map<String, Object> selectFeedReportList(
		 @RequestParam(value = "category", required = false) String queryParam,
		 @RequestParam(value = "cp", defaultValue = "1") int currentPage) {
		 
		 int listCount = 0;
		 Map<String, Object> resultMap= null;
		 
		 if(queryParam != null) {
			 listCount = service.getFeedReportCount1(queryParam);
		 } else {
			 listCount = service.getFeedReportCount();
		 }
		
		 Pagination pagination = new Pagination(listCount, currentPage, 10, 5); // 한 페이지에 10개씩, 페이지네이션 블록 5개씩
		 
		 if(queryParam != null) {
			 resultMap = service.selectFeedReportList1(pagination, queryParam);
			 resultMap.put("pagination", pagination);
		 } else {
			 resultMap = service.selectFeedReportList(pagination);
			 resultMap.put("pagination", pagination);
		 }
		 return resultMap;
	 }

	 @GetMapping("/selectCommentReportList")
	 @ResponseBody
	 public Map<String, Object> selectCommentReportList(
		 @RequestParam(value = "category", required = false) String queryParam,
		 @RequestParam(value = "cp", defaultValue = "1") int currentPage) {
		 
		 int listCount = 0;
		 Map<String, Object> resultMap= null;
		 
		 if(queryParam != null) {
			 listCount = service.getCommentReportCount1(queryParam);
		 } else {
			 listCount = service.getCommentReportCount();
		 }
		 
		 Pagination pagination = new Pagination(listCount, currentPage, 10, 5); // 한 페이지에 10개씩, 페이지네이션 블록 5개씩
		 
		 if(queryParam != null) {
			 resultMap = service.selectCommentReportList1(pagination, queryParam);
			 resultMap.put("pagination", pagination);
		 } else {
			 resultMap = service.selectCommentReportList(pagination);
			 resultMap.put("pagination", pagination);
		 }
		 return resultMap;
	 }
	 
	 @PutMapping("/updateCommentStatus")
	 @ResponseBody
	 public int updateCommentStatus(
		 @RequestBody int commentNo) {
		 
		 int result = service.updateCommentStatus(commentNo);
		 
		 return result;
	 }
	 
	 @PutMapping("/deleteReport")
	 @ResponseBody
	 public int deleteReport(@RequestBody int reportNo) {
		 int result = service.deleteReport(reportNo);
		 return result;
	 }

}
