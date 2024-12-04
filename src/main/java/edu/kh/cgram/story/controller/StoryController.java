package edu.kh.cgram.story.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import edu.kh.cgram.member.dto.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import edu.kh.cgram.story.dto.Story;
import edu.kh.cgram.story.service.StoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@SessionAttributes("loginMember")
@Controller
@RequiredArgsConstructor
public class StoryController {

	
	private final StoryService storyService;
	
	@GetMapping("/feed/feedDetail")
	public String feedDetail() {
		return "/feed/feedDetail";
	}
	
  
  @GetMapping("/story/{memberNickname}/{storyNo}")
  public String showStoryModal(
		  @PathVariable String memberNickname,
		  @PathVariable int storyNo,
		  Model model) {
		
		Story story = storyService.storyDetail(memberNickname, storyNo);
	  	log.debug("스토리 값 : {}", story);
		
		story.setImgPath(story.getImgPath() + story.getImgRename());
	  
      model.addAttribute("story", story);
//      return "story/storyModal";
	  return "story/story-detail";
  }
  
  @ResponseBody
  @PostMapping("/story/submit")
  public int insertStory(
		  @ModelAttribute Story story,
		  @SessionAttribute("loginMember") Member loginMember,
		  @RequestParam("image") MultipartFile image
  ) {
	  story.setMemberNo(loginMember.getMemberNo());
	  
	  int result = storyService.storyInsert(story, image);
	  
	  return result;
  }
  
  
  
  
  // mainFeed에서 스토리 목록 처리
  @PostMapping("/api/story/view/{storyNo}")
  @ResponseBody
  public Map<String, Object> updateStoryCheck(
  	@PathVariable int storyNo,
		@ModelAttribute("loginMember") Member loginMember) {
		
  	int memberNo = loginMember.getMemberNo();
  	
  	return storyService.updateStoryCheck1(storyNo, memberNo);
	}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
}
