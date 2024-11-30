package edu.kh.cgram.follow.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


@Mapper
public interface FollowMapper {

  Integer getMemberNoByNickname(@Param("nickname") String nickname);
  
  int insertFollow(@Param("loggedInMemberNo") int loggedInMemberNo, @Param("profileMemberNo") int profileMemberNo);

  int deleteFollow(@Param("loggedInMemberNo") int loggedInMemberNo, @Param("profileMemberNo") int profileMemberNo);

  int checkFollowStatus(@Param("loggedInMemberNo") int loggedInMemberNo, @Param("profileMemberNo") int profileMemberNo); // 팔로우 상태 확인




}
