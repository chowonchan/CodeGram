package edu.kh.cgram.story.service;

import java.util.List;
import java.util.Map;

import edu.kh.cgram.story.dto.Story;
import org.springframework.web.multipart.MultipartFile;

public interface StoryService {

	Story storyDetail(String memberNickname, int storyNo);
	
	int storyInsert(Story story, MultipartFile image);

	// 메인피드에서 스토리 처리
	Map<String, Object> updateStoryCheck1(int storyNo, int memberNo);
	


}


