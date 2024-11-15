package edu.kh.cgram.member.service;

import java.util.List;

import edu.kh.cgram.member.dto.Member;

public interface MemberService {

	Member login(String memberId, String memberPw);

	int signUp(Member inputMember);

	int emailCheck(String email);

	int nicknameCheck(String nickname);

	int idCheck(String id);
	
	List<Member> searchMembersByName(String keyword);
	
	List<Member> searchMembersByNickname(String keyword);

}
