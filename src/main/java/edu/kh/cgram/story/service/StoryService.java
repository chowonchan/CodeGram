package edu.kh.cgram.story.service;

import java.util.List;

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
	
	int storyDelete(int storyNo, int memberNo);
	


}
