package edu.kh.cgram.report.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.kh.cgram.member.dto.Member;
import edu.kh.cgram.report.service.ReportService;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/report")
@RequiredArgsConstructor
public class ReportController {

	private final ReportService reportService;

	@PostMapping("/insert")
	public ResponseEntity<Boolean> reportContent(
		@RequestBody String reson, 
		@ModelAttribute("loginMember") Member loginMember,
		Model model
		) {
		
		// 세션에서 회원 번호 가져오기
		int memberNo = loginMember.getMemberNo();

		// 신고 처리
		boolean result = reportService.reportContent(reson, memberNo);

		return ResponseEntity.ok(result);
	}

	
}