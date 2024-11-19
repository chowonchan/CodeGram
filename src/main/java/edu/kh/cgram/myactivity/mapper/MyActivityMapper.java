package edu.kh.cgram.myactivity.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import edu.kh.cgram.board.dto.BoardImg;

@Mapper
public interface MyActivityMapper {

	List<BoardImg> selectLikedPosts(int memberNo);

	int deleteLikes(@Param("memberNo") int memberNo, @Param("postIds") List<Integer> postIds);

}
