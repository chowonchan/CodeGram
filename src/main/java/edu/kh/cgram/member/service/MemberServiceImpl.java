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
  
  @Override
  public Member login(String memberId, String memberPw) {
  	Member loginMember = mapper.login(memberId);
  	if(loginMember == null) return null;
		if( !encoder.matches(memberPw, loginMember.getMemberPw()) ) {
			return null;
		}
	  return loginMember;
  }
  
}
