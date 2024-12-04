package edu.kh.cgram.story.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import edu.kh.cgram.board.dto.BoardImg;
import edu.kh.cgram.common.util.FileUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import edu.kh.cgram.story.dto.Story;
import edu.kh.cgram.story.mapper.StoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
@Slf4j
@Service
@RequiredArgsConstructor
public class StoryServiceImpl implements StoryService {
	
	@Value("${my.story.folder-path}")
	private String folderPath;
	
	@Value("${my.story.web-path}")
	private String webPath;

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
	
	
	
	
	
	@Override
	public Story storyDetail(String memberNickname, int storyNo) {
		
		int memberNo = storyMapper.getMemberNo(memberNickname);
		log.debug("맴버넘버 : {}", memberNo);
		
		return storyMapper.storyDetail(memberNo, storyNo);
	}
	
	@Override
	public int storyInsert(Story story, MultipartFile image) {
		
		log.debug("전송받은 이미지는? : {}", image.getOriginalFilename());
		String rename = FileUtil.rename(image.getOriginalFilename());
		story.setImgRename(rename);
		
		story.setImgPath(webPath);
		
		int result = storyMapper.storyInsert(story);
		
		try {
			image.transferTo(new File(folderPath + rename));
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("스토리 저장 중 오류");
		}
		
		return result;
	}
	
	@Override
	public int storyDelete(int storyNo, int memberNo) {
		return storyMapper.storyDelete(storyNo, memberNo);
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
