package edu.kh.cgram.member.service;

import edu.kh.cgram.member.dto.Member;

public interface MemberService {

	Member login(String memberId, String memberPw);

	int signUp(Member inputMember);

	int emailCheck(String email);

	int nicknameCheck(String nickname);

	int idCheck(String id);

}
