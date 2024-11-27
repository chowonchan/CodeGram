package edu.kh.cgram.member.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import edu.kh.cgram.member.dto.Member;

@Mapper
public interface MemberMapper {
	Member login(String memberId);
	
	int signUp(Member inputMember);
	
	int emailCheck(String email);
	
	int nicknameCheck(String nickname);
	
	int idCheck(String id);
	
	List<Member> searchMembersByName(@Param("chosungPattern") String chosungPattern, @Param("memberNo") int memberNo);
	
  List<Member> searchMembersByNickname(@Param("keyword") String keyword, @Param("memberNo") int memberNo);

  Member findMemberByNameEmailAndBirth(
  		@Param("name") String name,
      @Param("email") String email,
      @Param("birthDate") String birthDate);
  
  Member findMemberByNameEmailBirthAndId(@Param("name") String name, @Param("email") String email,
      @Param("birthDate") String birthDate, @Param("memberId") String memberId);

int updatePassword(@Param("memberId") String memberId, @Param("newPassword") String newPassword);

Member selectMemberByNickname(String nickname);

int getPostCountByMemberNo(@Param("memberNo") int memberNo);

int getFollowerCount(@Param("memberNo") int memberNo);

int getFollowCount(@Param("memberNo") int memberNo);

}
