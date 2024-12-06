package edu.kh.cgram.story.service;

import java.util.List;
import java.util.Map;

import edu.kh.cgram.member.dto.Member;
import edu.kh.cgram.story.dto.Story;
import org.springframework.web.multipart.MultipartFile;

public interface StoryService {


	
	
	

	Story storyDetail(String memberNickname, int storyNo);
	
	int storyInsert(Story story, MultipartFile image);

	// 메인피드에서 스토리 처리
	Map<String, Object> updateStoryCheck1(String memberNickname, int memberNo);
	
	int storyDelete(int storyNo, int memberNo);
	
	// 팔로우한 회원의 24시간 내 스토리 목록 조회
	List<Member> memberStoryList(int memberNo);
    
    int storyRead(int storyNo, int memberNo);
}


