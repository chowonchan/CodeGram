package edu.kh.cgram.block.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import edu.kh.cgram.block.service.BlockService;
import edu.kh.cgram.member.dto.Member;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Slf4j
@RestController
@SessionAttributes({"loginMember"})
@RequestMapping("block")
public class BlockController {
	
	private final BlockService service;
	
	public BlockController(BlockService blockService) { this.service = blockService; }
	
	@PostMapping("{nickname}")
	public ResponseEntity<?> followMember(
      @PathVariable("nickname") String nickname,
      @SessionAttribute("loginMember") Member loginMember) {

  int loggedInMemberNo = loginMember.getMemberNo();
  log.debug("차단 요청: loggedInMemberNo={}, nickname={}", loggedInMemberNo, nickname);

  // 닉네임으로 회원 번호 조회
  int profileMemberNo = service.getMemberNoByNickname(nickname);

  if (profileMemberNo == 0) {
      log.warn("차단 대상 사용자 없음: 닉네임={}", nickname);
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
          "success", false,
          "message", "해당 사용자를 찾을 수 없습니다."
      ));
  }

  // 차단 처리
  boolean success = service.BlockMember(loggedInMemberNo, profileMemberNo);

  if (success) {
      log.info("차단 성공: {} -> {}", loggedInMemberNo, profileMemberNo);
      return ResponseEntity.ok(Map.of(
          "success", true,
          "message", nickname + "님을 차단했습니다.",
          "blockMemberNo", loggedInMemberNo,
          "blockedMemberNo", profileMemberNo
      ));
  } else {
      log.error("차단 실패: {} -> {}", loggedInMemberNo, profileMemberNo);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
          "success", false,
          "message", "차단 처리 중 문제가 발생했습니다."

      ));
  }
}
	@GetMapping("/blockList")
	public ResponseEntity<?> getBlockList(
	    @SessionAttribute("loginMember") Member loginMember) {

	    int loggedInMemberNo = loginMember.getMemberNo();
	    log.debug("GET 차단 목록 요청: loggedInMemberNo={}", loggedInMemberNo);

	    // 차단 목록 조회
	    List<Map<String, Object>> blockList = service.getBlockedList(loggedInMemberNo);

	    log.debug("차단 목록 데이터: {}", blockList);
	    
	    if (blockList.isEmpty()) {
	        log.info("차단 목록 비어 있음: loggedInMemberNo={}", loggedInMemberNo);
	        return ResponseEntity.ok(Map.of(
	            "success", true,
	            "message", "차단 목록이 비어 있습니다.",
	            "blockList", blockList
	        ));
	    }

	    log.info("GET 차단 목록 조회 성공: loggedInMemberNo={}, size={}", loggedInMemberNo, blockList.size());
	    return ResponseEntity.ok(Map.of(
	        "success", true,
	        "message", "차단 목록 조회 성공",
	        "blockList", blockList
	    ));
	}
	
	 @DeleteMapping("/unBlock")
   public ResponseEntity<?> unblockMember(
           @RequestBody Map<String, Integer> requestBody,
           @SessionAttribute("loginMember") Member loginMember) {

       int loggedInMemberNo = loginMember.getMemberNo();
       int blockedMemberNo = requestBody.get("blockedMemberNo");
       log.debug("차단한 멤버: {}", loggedInMemberNo);
       log.debug("차단당한 멤버: {}", blockedMemberNo);
       boolean isUnblocked = service.unblockMember(loggedInMemberNo, blockedMemberNo);

       if (isUnblocked) {
           return ResponseEntity.ok(Map.of(
                   "success", true,
                   "message", "차단이 해제되었습니다."
           ));
       } else {
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                   "success", false,
                   "message", "차단 해제 중 문제가 발생했습니다."
           ));
       }
   }
	


}