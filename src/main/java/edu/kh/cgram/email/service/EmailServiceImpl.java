package edu.kh.cgram.email.service;

import java.io.FileNotFoundException;
import java.util.Map;

import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import edu.kh.cgram.common.util.RedisUtil;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender; // 메일 발송 도구
    private final RedisUtil redisUtil; // Redis 유틸리티
    private final SpringTemplateEngine templateEngine; // 타임리프 템플릿 엔진

    @Override
    public int sendEmail(String htmlName, String email) {
        try {
            String emailTitle = getEmailTitle(htmlName); // 이메일 제목 결정
            if (emailTitle == null) {
                log.error("지원하지 않는 이메일 유형: {}", htmlName);
                return 0; // 지원하지 않는 유형일 경우 실패
            }

            String authKey = createAuthKey(); // 인증번호 생성
            String emailContent = loadHtml(authKey, htmlName); // HTML 내용 로드

            // 메일 발송 준비
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setTo(email);
            helper.setSubject(emailTitle);
            helper.setText(emailContent, true);

            // CID를 통해 이메일에 이미지 첨부
            helper.addInline("logo", new ClassPathResource("static/images/DMLOGO.png"));

            // 메일 발송
            mailSender.send(mimeMessage);

            // Redis에 인증번호 저장 (유효 기간: 5분)
            redisUtil.setValue(email, authKey, 60 * 5);
            log.info("인증번호 [{}]가 이메일 [{}]로 발송되었습니다.", authKey, email);

            return 1; // 성공
        } catch (Exception e) {
            log.error("이메일 발송 중 오류 발생: {}", e.getMessage(), e);
            return 0; // 실패
        }
    }

    /**
     * 이메일 유형에 따른 제목 반환
     * 
     * @param htmlName 이메일 유형
     * @return 이메일 제목
     */
    private String getEmailTitle(String htmlName) {
        switch (htmlName) {
            case "signUp":
                return "CodeGram 인증번호입니다.";
//            case "login":
//                return "CodeGram 비밀번호 찾기 인증번호입니다.";
            default:
                return null; // 지원하지 않는 유형
        }
    }

    /**
     * 인증번호 생성 (영어 대문자 + 소문자 + 숫자 6자리)
     * 
     * @return 생성된 인증번호
     */
    private String createAuthKey() {
        StringBuilder key = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            int type = (int) (Math.random() * 3); // 0: 숫자, 1: 대문자, 2: 소문자
            if (type == 0) {
                key.append((int) (Math.random() * 10)); // 숫자
            } else {
                char base = (type == 1) ? 'A' : 'a'; // 대문자 또는 소문자
                key.append((char) (base + (Math.random() * 26)));
            }
        }
        return key.toString();
    }

    /**
     * HTML 템플릿 로드 및 인증번호 삽입
     * 
     * @param authKey 인증번호
     * @param htmlName HTML 파일 이름
     * @return HTML 문자열
     * @throws FileNotFoundException 파일을 찾을 수 없을 경우 예외 발생
     */
    private String loadHtml(String authKey, String htmlName) throws FileNotFoundException {
        // HTML 파일 확인
        if (!new ClassPathResource("templates/email/" + htmlName + ".html").exists()) {
            throw new FileNotFoundException("HTML 템플릿 파일을 찾을 수 없습니다: " + htmlName);
        }

        // 타임리프 Context 생성 및 인증번호 삽입
        Context context = new Context();
        context.setVariable("authKey", authKey);

        // HTML 템플릿 처리
        return templateEngine.process("email/" + htmlName, context);
    }

    @Override
    public boolean checkAuthKey(Map<String, String> map) {
        String email = map.get("email");
        String authKey = map.get("authKey");

        // Redis에서 인증번호 조회
        if (!redisUtil.hasKey(email)) {
            log.warn("Redis에 이메일 [{}]가 존재하지 않습니다.", email);
            return false;
        }

        String storedAuthKey = redisUtil.getValue(email).trim();
        boolean isMatch = authKey.equals(storedAuthKey);

        log.info("입력된 인증번호 [{}], 저장된 인증번호 [{}], 결과 [{}]", authKey, storedAuthKey, isMatch);

        return isMatch;
    }
}
