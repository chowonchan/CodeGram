package edu.kh.cgram.member.service;

import java.util.List;

import org.springframework.data.repository.query.Param;

import edu.kh.cgram.board.dto.BoardImg;
import edu.kh.cgram.member.dto.Member;

public interface MemberService {

	Member login(String memberId, String memberPw);

	int signUp(Member inputMember);

	int emailCheck(String email);

	int nicknameCheck(String nickname);

	int idCheck(String id);
	
	int changePassword(String memberId, String newPassword);
	
	List<Member> searchMembersByName(String keyword, int memberNo);
	
	List<Member> searchMembersByNickname(String keyword, int memberNo);

	Member findMemberByNameEmailAndBirth(String name, String email, String birthDate);

	boolean sendUserIdToEmail(String email, String userId);
	
  Member findMemberByNameEmailBirthAndId(String name, String email, String birthDate, String memberId);

	Member getMemberByNickname(String nickname);
	
	int getPostCountByMemberNo(int memberNo);

	int getFollowerCount(int memberNo);

	int getFollowCount(int memberNo);

	public boolean isUserBlocked(@Param("loginMemberNo") int loginMemberNo,@Param("targetMemberNo") int targetMemberNo);

	
	List<BoardImg> getMemberPosts(String nickname, int cp);

}
