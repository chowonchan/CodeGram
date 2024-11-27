package edu.kh.cgram.follow.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


@Mapper
public interface FollowMapper {

  Integer findMemberNoByNickname(@Param("nickname") String nickname);
  
  int insertFollow(@Param("loggedInMemberNo") int loggedInMemberNo, @Param("profileMemberNo") int profileMemberNo);




}
