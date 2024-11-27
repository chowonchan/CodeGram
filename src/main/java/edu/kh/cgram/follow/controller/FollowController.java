package edu.kh.cgram.follow.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import edu.kh.cgram.follow.service.FollowService;
import edu.kh.cgram.member.dto.Member;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@RestController
@SessionAttributes({"loginMember"})
@RequestMapping("/follow")
@Slf4j
public class FollowController {

	private final FollowService service;
	
	public FollowController(FollowService followService) {
    this.service = followService;
}


//	@PostMapping("/{nickname}")
//	public ResponseEntity<?> followMember(
//	        @PathVariable("nickname") String nickname,
//	        @SessionAttribute("loginMember") Member loginMember) {
//
//	    int loggedInMemberNo = loginMember.getMemberNo();
//	    Integer profileMemberNo = service.getMemberNoByNickname(nickname);
//
//	    if (profileMemberNo == null) {
//	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
//	            "success", false,
//	            "message", "사용자를 찾을 수 없습니다."
//	        ));
//	    }
//
//	    boolean success = service.followMember(loggedInMemberNo, profileMemberNo);
//
//	    if (success) {
//	        return ResponseEntity.ok(Map.of(
//	            "success", true,
//	            "message", "팔로우 성공!"
//	        ));
//	    } else {
//	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
//	            "success", false,
//	            "message", "팔로우 처리 중 문제가 발생했습니다."
//	        ));
//	    }
//	}
	@PostMapping("/{nickname}")
	public ResponseEntity<?> followMember(
	        @PathVariable("nickname") String nickname,
	        @SessionAttribute("loginMember") Member loginMember) {

	    int loggedInMemberNo = loginMember.getMemberNo();
	    log.debug("팔로우 요청: loggedInMemberNo={}, nickname={}", loggedInMemberNo, nickname);

	    // 닉네임으로 회원 번호 조회
	    Integer profileMemberNo = service.getMemberNoByNickname(nickname);

	    if (profileMemberNo == null) {
	        log.warn("팔로우 대상 사용자 없음: 닉네임={}", nickname);
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
	            "success", false,
	            "message", "해당 사용자를 찾을 수 없습니다."
	        ));
	    }

	    // 팔로우 처리
	    boolean success = service.followMember(loggedInMemberNo, profileMemberNo);

	    if (success) {
	        log.info("팔로우 성공: {} -> {}", loggedInMemberNo, profileMemberNo);
	        return ResponseEntity.ok(Map.of(
	            "success", true,
	            "message", nickname + "님을 성공적으로 팔로우했습니다."
	        ));
	    } else {
	        log.error("팔로우 실패: {} -> {}", loggedInMemberNo, profileMemberNo);
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
	            "success", false,
	            "message", "팔로우 처리 중 문제가 발생했습니다."
	        ));
	    }
	}



//  @DeleteMapping
//  public ResponseEntity<Map<String, String>> unfollowMember(
//          @RequestBody Map<String, Integer> followData,
//          HttpSession session) {
//
//      // 세션에서 로그인 사용자 확인
//      Member loginMember = (Member) session.getAttribute("loginMember");
//      if (loginMember == null) {
//          return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
//              "message", "로그인이 필요합니다."
//          ));
//      }
//
//      // 요청 데이터에서 사용자 번호 추출
//      Integer profileMemberNo = followData.get("profileMemberNo");
//      if (profileMemberNo == null) {
//          return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
//              "message", "프로필 사용자의 번호가 필요합니다."
//          ));
//      }
//
//      // 언팔로우 처리
//      boolean success = service.unfollowMember(loginMember.getMemberNo(), profileMemberNo);
//
//      if (success) {
//          return ResponseEntity.ok(Map.of(
//              "message", "언팔로우 성공!"
//          ));
//      } else {
//          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
//              "message", "언팔로우 처리 중 문제가 발생했습니다."
//          ));
//      }
//  }
}