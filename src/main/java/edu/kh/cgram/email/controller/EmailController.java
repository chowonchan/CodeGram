package edu.kh.cgram.email.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.kh.cgram.common.util.RedisUtil;
import edu.kh.cgram.email.service.EmailService;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/email")
@Slf4j
public class EmailController {

//    @Autowired
//    private RedisUtil redisUtil;
//
//    @Autowired
//    private EmailService emailService;
  private final EmailService emailService;

  public EmailController(EmailService emailService) {
      this.emailService = emailService;
  }

    /**
     * 회원가입 인증번호 발송
     * @param email 클라이언트에서 전송된 이메일
     * @return 인증번호 발송 성공 여부
     */
    @PostMapping("/sendAuthKey")
    public ResponseEntity<String> sendAuthKey(@RequestBody String email) {
        log.info("회원가입 인증번호 발송 요청: {}", email);
        int result = emailService.sendEmail("signUp", email);

        if (result == 1) {
            return ResponseEntity.ok("회원가입 인증번호가 이메일로 발송되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("회원가입 인증번호 발송 실패");
        }
    }

    /**
     * 회원가입 인증번호 확인
     * @param map 인증번호 확인을 위한 데이터 (이메일과 인증번호)
     * @return 인증 성공 여부
     */
    @PostMapping("/checkAuthKey")
    public ResponseEntity<Boolean> checkAuthKey(@RequestBody Map<String, String> map) {
        String email = map.get("email");
        String authKey = map.get("authKey");

        log.info("회원가입 인증번호 확인 요청: 이메일={}, 인증번호={}", email, authKey);

        boolean isVerified = emailService.checkAuthKey(map);

        if (isVerified) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }

    /**
     * 비밀번호 찾기 인증번호 발송
     * @param email 클라이언트에서 전송된 이메일
     * @return 인증번호 발송 성공 여부
     */
    @PostMapping("/sendPwAuthKey")
    public ResponseEntity<Map<String, Object>> sendPwAuthKey(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        try {
            int result = emailService.sendEmail("pwReset", email);
            if (result == 1) {
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "비밀번호 찾기 인증번호가 이메일로 발송되었습니다."
                ));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "비밀번호 찾기 인증번호 발송 실패"
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "서버 오류가 발생했습니다."
            ));
        }
    }

    /**
     * 비밀번호 찾기 인증번호 확인
     * @param map 인증번호 확인을 위한 데이터 (이메일과 인증번호)
     * @return 인증 성공 여부
     */
    @PostMapping("/checkPwAuthKey")
    public ResponseEntity<Boolean> checkPwAuthKey(@RequestBody Map<String, String> map) {
        String email = map.get("email");
        String authKey = map.get("authKey");

        log.info("비밀번호 찾기 인증번호 확인 요청: 이메일={}, 인증번호={}", email, authKey);

        boolean isVerified = emailService.checkAuthKey(map); // 인증번호 검증

        if (isVerified) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }
    @PostMapping("/verifyPwAuthKey")
    public ResponseEntity<Boolean> verifyPwAuthKey(@RequestBody Map<String, String> requestData) {
        String email = requestData.get("email");
        String authKey = requestData.get("authKey");

        log.info("비밀번호 찾기 인증번호 확인 요청: 이메일={}, 인증번호={}", email, authKey);

        if (email == null || email.isEmpty() || authKey == null || authKey.isEmpty()) {
            log.warn("이메일 또는 인증번호가 누락되었습니다.");
            return ResponseEntity.badRequest().body(false);
        }

        boolean isVerified = emailService.checkAuthKey(requestData);

        if (isVerified) {
            log.info("인증 성공: 이메일={}", email);
            return ResponseEntity.ok(true);
        } else {
            log.warn("인증 실패: 이메일={}, 인증번호={}", email, authKey);
            return ResponseEntity.badRequest().body(false);
        }
    }




}
