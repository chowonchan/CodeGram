package edu.kh.cgram.member.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import edu.kh.cgram.member.dto.Member;
import edu.kh.cgram.member.mapper.MemberMapper;
import edu.kh.cgram.member.util.HangulUtils;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MemberServiceImpl implements MemberService{
	
  @Autowired // 등록된 Bean 중에서 같은 타입의 Bean을 대입(DI)
	private MemberMapper mapper;
  
  @Autowired // BCrypt 암호화 객체 의존성 주입 받기
  private BCryptPasswordEncoder encoder;
  
  @Autowired
  private JavaMailSender mailSender;
  
  @Override
  public Member login(String memberId, String memberPw) {
      Member loginMember = mapper.login(memberId);
      if (loginMember == null) return null;
      // 암호화된 비밀번호로 비교
		if( !encoder.matches(memberPw, loginMember.getMemberPw()) ) {
		return null;

      }

      return loginMember;
  }

  
  // 회원 가입
  @Override
  public int signUp(Member inputMember) {
      // 비밀번호가 null 또는 빈 문자열인지 확인
      if (inputMember.getMemberPw() == null || inputMember.getMemberPw().isEmpty()) {
          throw new IllegalArgumentException("Password cannot be null or empty");
      }
      // 비밀번호 암호화(BCrypt)
      String encPw = encoder.encode(inputMember.getMemberPw());
      inputMember.setMemberPw(encPw);

      // mapper 호출 후 결과 반환
      return mapper.signUp(inputMember);
  }
  
  @Override
  public int emailCheck(String email) {
  return mapper.emailCheck(email);
  }
  
  @Override
  public int nicknameCheck(String nickname) {
  	return mapper.nicknameCheck(nickname);
  }
  @Override
  public int idCheck(String id) {
  	return mapper.idCheck(id);
  }
  
  @Override
  public List<Member> searchMembersByName(String keyword) {
  	// 초성 검색 패턴 생성
  	String chosungPattern = HangulUtils.getChosungPattern(keyword);
  	return mapper.searchMembersByName(chosungPattern);
  }
  
  @Override
  public List<Member> searchMembersByNickname(String keyword) {
  	return mapper.searchMembersByNickname(keyword);
  }
  
  @Override
  public Member findMemberByNameEmailAndBirth(String name, String email, String birthDate) {
      return mapper.findMemberByNameEmailAndBirth(name, email, birthDate);
  }

  @Override
  public boolean sendUserIdToEmail(String email, String userId) {
      try {
          // 이메일 제목과 내용 설정
          String emailTitle = "CodeGram 아이디 찾기 결과";
          String emailContent = "요청하신 아이디는 다음과 같습니다: " + userId;

          // MimeMessage를 사용해 이메일 설정
          MimeMessage message = mailSender.createMimeMessage();
          MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

          helper.setTo(email); // 수신자 이메일 설정
          helper.setSubject(emailTitle); // 이메일 제목 설정
          helper.setText(emailContent, false); // 이메일 내용 설정 (HTML 사용 안 함)

          // 이메일 발송
          mailSender.send(message);
          log.info("아이디 전송 성공: 이메일={}, 아이디={}", email, userId);
          return true;
      } catch (Exception e) {
          log.error("아이디 전송 실패: 이메일={}, 에러={}", email, e.getMessage());
          e.printStackTrace();
          return false;
      }
  }
  
  @Override
  public Member findMemberByNameEmailBirthAndId(String name, String email, String birthDate, String memberId) {
      return mapper.findMemberByNameEmailBirthAndId(name, email, birthDate, memberId);
  }

//  @Override
//  public int changePassword(String memberId, String newPassword) {
//    String encodedPassword = encoder.encode(newPassword);
//      return mapper.updatePassword(memberId, encodedPassword);
//  }

  @Override
  public int changePassword(String memberId, String newPassword) {
      log.debug("MemberService - 비밀번호 변경 요청: memberId={}, newPassword={}", memberId, newPassword);
      String encodedPassword = encoder.encode(newPassword);
      return mapper.updatePassword(memberId, encodedPassword);
  }

}