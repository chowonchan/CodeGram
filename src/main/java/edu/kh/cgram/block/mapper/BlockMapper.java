package edu.kh.cgram.block.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface BlockMapper {

	int getMemberNoByNickname(@Param("nickname") String nickname);

	int insertBlock(@Param("loggedInMemberNo") int loggedInMemberNo, @Param("profileMemberNo") int profileMemberNo);

	List<java.util.Map<String, Object>> selectBlockedList(int loggedInMemberNo);

  int deleteBlock(@Param("loggedInMemberNo") int loggedInMemberNo, @Param("blockedMemberNo") int blockedMemberNo);



}
