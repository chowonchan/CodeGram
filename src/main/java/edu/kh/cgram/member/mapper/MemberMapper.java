package edu.kh.cgram.member.mapper;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.cgram.member.dto.Member;

@Mapper
public interface MemberMapper {
	Member login(String memberId);

}