package edu.kh.cgram.hashtag.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import edu.kh.cgram.hashtag.dto.HashTag;

@Mapper
public interface HashtagMapper {

	List<HashTag> searchHashtags(@Param("query") String query);
		
}
