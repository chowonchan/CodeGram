package edu.kh.cgram.block.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface BlockMapper {

	int getMemberNoByNickname(@Param("nickname") String nickname);

	int insertBlock(@Param("loggedInMemberNo") int loggedInMemberNo, @Param("profileMemberNo") int profileMemberNo);

}
