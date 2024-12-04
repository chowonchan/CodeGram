package edu.kh.cgram.story.service;

import java.util.List;
import java.util.Map;

import edu.kh.cgram.story.dto.Story;
import org.springframework.web.multipart.MultipartFile;

public interface StoryService {

	List<Story> getFollowingStories(String memberNickname);

	Story getStoryDetail(Long storyNo);

	void updateStoryCheck(Long storyNo, String memberNickname);
	
	/*
	 * void insertStoryLike(Long storyNo, String username);
	 *
	 * void deleteStoryLike(Long storyNo, String username);
	 */
	
	
	
	

	Story storyDetail(String memberNickname, int storyNo);
	
	int storyInsert(Story story, MultipartFile image);

	// 메인피드에서 스토리 처리
	Map<String, Object> updateStoryCheck1(int storyNo, int memberNo);
	
	int storyDelete(int storyNo, int memberNo);
	



}
