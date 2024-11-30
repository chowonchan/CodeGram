package edu.kh.cgram.story.service;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.kh.cgram.story.dto.Story;
import edu.kh.cgram.story.mapper.StoryMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StoryServiceImpl implements StoryService {

	private final StoryMapper storyMapper;

	@Override
	public List<Story> getFollowingStories(String memberNickname) {
		return storyMapper.getFollowingStories(memberNickname);
	}

	@Override
	public Story getStoryDetail(Long storyNo) {
		return storyMapper.getStoryDetail(storyNo);
	}

	@Override
	public void updateStoryCheck(Long storyNo, String memberNickname) {
		storyMapper.updateStoryCheck(storyNo, memberNickname);
	}

	/*
	 * @Override public void insertStoryLike(Long storyNo, String memberNickname) {
	 * Long memberNo = storyMapper.getMemberNoByNickname(memberNickname);
	 * storyMapper.insertStoryLike(storyNo, memberNo); }
	 * 
	 * @Override public void deleteStoryLike(Long storyNo, String memberNickname) {
	 * Long memberNo = storyMapper.getMemberNoByNickname(memberNickname);
	 * storyMapper.deleteStoryLike(storyNo, memberNo); }
	 */

}
