package edu.kh.cgram.story.service;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	
	
	// 작성 코드
	
	@Override
	public Map<String, Object> updateStoryCheck1(int storyNo, int memberNo) {
		
		// 팔로우한 회원의 24시간 내 스토리 존재 여부 확인
		int count = storyMapper.selectStoryHas(memberNo);
		
		// 로그인한 회원이 팔로우한 회원들의 24시간 이내 스토리 목록 조회
		if(count > 0) {
			int result3 = storyMapper.selectStoryList(memberNo);
		}
		
		// 스토리를 이미 읽었는지 확인
		int result = storyMapper.checkStory(storyNo, memberNo);
		
		// 읽지 않은 스토리를 읽을 경우 스토리 리드에 값 저장
		int result2 = 0;
		if(result == 0) {
			result2 = storyMapper.insertStoryRead(storyNo, memberNo);
		}
		
		Map<String, Object> map = new HashMap<>();
		
		map.put("count", count); // 팔로우한 회원의 24시간 내 스토리 존재 여부 확인
		
		if(result == 0) map.put("check", "insert");
		
		
		return map;
	}
	

}
