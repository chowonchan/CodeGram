package edu.kh.cgram.myPage.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MyPageMapper {

	void updateProfileImg(@Param("memberNo")int memberNo, @Param("profileImg")String relativePath);

	int deleteProfileImg(int memberNo);
  // 프로필 이미지 경로를 NULL로 설정
//  int deleteProfileImg(@Param("memberNo") int memberNo);
}
