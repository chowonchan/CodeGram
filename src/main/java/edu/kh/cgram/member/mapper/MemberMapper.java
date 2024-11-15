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
	
	List<Member> searchMembersByName(@Param("chosungPattern") String chosungPattern);
	
  List<Member> searchMembersByNickname(String keyword);
}
