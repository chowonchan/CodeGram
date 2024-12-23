package edu.kh.cgram.story.service;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import edu.kh.cgram.board.dto.BoardImg;
import edu.kh.cgram.common.util.FileUtil;
import edu.kh.cgram.member.dto.Member;
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
			File folder = new File(folderPath);
			if(folder.exists() == false) {	// 폴더가 없을 경우
				folder.mkdirs();		// 폴더 생성
			}
			
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
	
	
	// 작성 코드
	
	@Override
	public Map<String, Object> updateStoryCheck1(String memberNickname, int memberNo) {
		
		// memberNickname으로 24시간 내 스토리 갯수 조회하기
		int storyNo2 = storyMapper.selectStoryNo(memberNickname, memberNo);

		// 팔로우한 회원의 24시간 내 스토리 존재 여부 확인
		int count = storyMapper.selectStoryHas(memberNo);
		
		// 로그인한 회원이 팔로우한 회원들의 24시간 이내 스토리 목록 조회
		if(count > 0) {
			int result3 = storyMapper.selectStoryList(memberNo);
		}
		
		// 스토리를 이미 읽었는지 확인
		int result = storyMapper.checkStory(memberNickname, memberNo);
		
		if(result > 0) {
			// 안 읽은 스토리 존재
		} else {
			// 스토리 다 읽음
		}
		
		
		// 읽지 않은 스토리를 읽을 경우 스토리 리드에 값 저장
		if(result == 0) {
		}
		
		Map<String, Object> map = new HashMap<>();
		
		map.put("count", count); // 팔로우한 회원의 24시간 내 스토리 존재 여부 확인
		map.put("result", result); // 스토리를 이미 읽었는지 확인( 0 초과일때 읽지 않은 스토리 존재)
		
		if(result == 0) map.put("check", "insert");
		
		
		return map;
	}
	
	@Override
	public List<Member> memberStoryList(int memberNo) {
		
		// 팔로우한 회원의 24시간 내 스토리 목록 조회
		List<Story> list = storyMapper.memberStoryList(memberNo);
		
		List<Member> memberList = new ArrayList<>();
		
		for(Story story : list) {
			Member member = checkInListMember(memberList, story.getMemberNo());
			
			// memberList에 이미 존재하는 회원인 경우
			if(member != null) {
				member.getStoryList().add(story);
				continue;
			}
			
			// memberList에 없는 회원인 경우
			member = new Member();
			member.setMemberNo(story.getMemberNo());
			member.setMemberNickname(story.getMemberNickname());
			member.setProfileImg(story.getProfileImg());
			member.setStoryList(new ArrayList<>());
			member.getStoryList().add(story);
			memberList.add(member);
		}
		
		return memberList;
	}
	
	
	// memberList에 같은 회원 번호를 가진 회원이 있는지 검사
	private Member checkInListMember(List<Member> memberList,int memberNo){
		for(Member member : memberList) {
			if(member.getMemberNo() == memberNo) {
				return member;
			}
		}
		return null;
	}
	
	@Override
	public int storyRead(int storyNo, int memberNo) {
		
		int result = storyMapper.storyReadCheck(memberNo, storyNo);
		if(result > 0) { return 0; }
		
		return storyMapper.storyRead(memberNo, storyNo);
		
		
	}
}
