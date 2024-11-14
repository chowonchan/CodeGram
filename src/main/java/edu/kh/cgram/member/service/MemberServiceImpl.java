package edu.kh.cgram.member.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import edu.kh.cgram.member.dto.Member;
import edu.kh.cgram.member.mapper.MemberMapper;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MemberServiceImpl implements MemberService{
	
  @Autowired // 등록된 Bean 중에서 같은 타입의 Bean을 대입(DI)
	private MemberMapper mapper;
  
  @Autowired // BCrypt 암호화 객체 의존성 주입 받기
  private BCryptPasswordEncoder encoder;
  
//  @Override
//  public Member login(String memberId, String memberPw) {
//  	Member loginMember = mapper.login(memberId);
//  	if(loginMember == null) return null;

//		}
//	  return loginMember;
//  }
  
  @Override
  public Member login(String memberId, String memberPw) {
      Member loginMember = mapper.login(memberId);
      if (loginMember == null) return null;
      // 암호화된 비밀번호로 비교
		if( !encoder.matches(memberPw, loginMember.getMemberPw()) ) {
		return null;
      // 암호화된 비밀번호 대신 평문 비밀번호로 비교
//      if (!memberPw.equals(loginMember.getMemberPw())) {
//          return null;
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

}