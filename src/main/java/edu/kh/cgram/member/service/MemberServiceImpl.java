package edu.kh.cgram.member.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import edu.kh.cgram.board.dto.BoardImg;
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
  public List<Member> searchMembersByName(String keyword, int memberNo) {
  	// 초성 검색 패턴 생성
  	String chosungPattern = HangulUtils.getChosungPattern(keyword);
  	return mapper.searchMembersByName(chosungPattern, memberNo);
  }
  
  @Override
  public List<Member> searchMembersByNickname(String keyword, int memberNo) {
  	return mapper.searchMembersByNickname(keyword, memberNo);
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
  
//  @Override
//  public Member getMemberByNickname(String nickname) {
//  	
//      return mapper.selectMemberByNickname(nickname);
//  }
//  @Override
//  public Member getMemberByNickname(String nickname) {
//      Member member = mapper.selectMemberByNickname(nickname);
//
//      if (member == null) {
//          log.warn("닉네임으로 조회된 회원이 없습니다: {}", nickname);
//          return null;
//      }
//
//      int memberNo = member.getMemberNo();
//      log.info("조회된 회원 번호: {}", memberNo);
//
//      log.info("회원 데이터: {}", member);
//      return member;
//  }
  @Override
  public Member getMemberByNickname(String nickname) {
      Member member = mapper.selectMemberByNickname(nickname);

      if (member != null) {
          int postCount = mapper.getPostCountByMemberNo(member.getMemberNo());
          member.setPostCount(postCount);

          int followerCount = mapper.getFollowerCount(member.getMemberNo());
          member.setFollowerCount(followerCount);

          int followCount = mapper.getFollowCount(member.getMemberNo());
          member.setFollowCount(followCount);

          log.info("회원 번호 {}의 게시물 수: {}", member.getMemberNo(), postCount);
          log.info("회원 데이터 업데이트 완료: {}", member);
      }
      return member;
  }

	@Override
	public int getPostCountByMemberNo(int memberNo) {
	  // 매퍼를 호출하여 게시물 수 조회
	  int postCount = mapper.getPostCountByMemberNo(memberNo);
	
	  // 디버깅용 로그 추가
	  log.info("회원 번호 {}의 게시물 수: {}", memberNo, postCount);
	
	  return postCount;
	}
	@Override
	public int getFollowCount(int memberNo) {
	  int followCount = mapper.getFollowCount(memberNo);
		return followCount;
		
	}@Override
	public int getFollowerCount(int memberNo) {
	  int followerCount = mapper.getFollowerCount(memberNo);
		return followerCount;
	}
	@Override
	public List<BoardImg> getPostsByMemberNo(int memberNo) {
		List<BoardImg> posts = mapper.selectPostsByMemberNo(memberNo);
		return posts;
	}
}