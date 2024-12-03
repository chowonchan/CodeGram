package edu.kh.cgram.story.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.cgram.story.dto.Story;
import io.lettuce.core.dynamic.annotation.Param;

@Mapper
public interface StoryMapper {

	List<Story> getFollowingStories(String memberNickname);

	Story getStoryDetail(Long storyNo);

	void updateStoryCheck(
			@Param("storyNo") Long storyNo,
			@Param("memberNickname") String memberNickname);
	
	/*
	 * // 좋아요 추가 public int insertStoryLike(@Param("storyNo") Long
	 * storyNo, @Param("memberNo") Long memberNo);
	 * 
	 * // 좋아요 삭제 public int deleteStoryLike(@Param("storyNo") Long
	 * storyNo, @Param("memberNo") Long memberNo);
	 */
	
	
	// 회원 번호로 memberNo 조회
	int getMemberNo(String memberNickname);
	
	Story storyDetail(@Param("memberNo") int memberNo, @Param("storyNo") int storyNo);
	
	int storyInsert(Story story);
}
