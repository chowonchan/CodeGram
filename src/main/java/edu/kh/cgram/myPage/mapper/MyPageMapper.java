package edu.kh.cgram.myPage.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MyPageMapper {

	void updateProfileImg(@Param("memberNo")int memberNo, @Param("profileImg")String relativePath);
	

}
