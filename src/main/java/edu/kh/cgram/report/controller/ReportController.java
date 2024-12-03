package edu.kh.cgram.report.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.cgram.member.dto.Member;
import edu.kh.cgram.report.service.ReportService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/report")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @PostMapping("/create")
    @ResponseBody
    public ResponseEntity<?> createReport(
            @RequestBody edu.kh.cgram.common.dto.Report reportRequest, 
            HttpSession session) {
        
        // 세션에서 로그인한 회원 정보 가져오기
        Member loginMember = (Member) session.getAttribute("loginMember");
        
        if (loginMember == null) {
            // 로그인되지 않은 경우 에러 응답
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        // ReportDTO 구성
        edu.kh.cgram.common.dto.Report report = edu.kh.cgram.common.dto.Report.builder()
            .memberNo(loginMember.getMemberNo())
            .contentNo(reportRequest.getContentNo())
            .reportCategory(reportRequest.getReportCategory())
            .contentCategory('1')  // 피드 신고는 '1'로 고정
            .reportView('N')  // 기본값 'N'
            .createdAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
            .build();

        // 신고 처리
        boolean result = reportService.createReport(report);

        if (result) {
            return ResponseEntity.ok().body("신고가 성공적으로 접수되었습니다.");
        } else {
            return ResponseEntity.status(500).body("신고 처리 중 오류가 발생했습니다.");
        }
    }
}