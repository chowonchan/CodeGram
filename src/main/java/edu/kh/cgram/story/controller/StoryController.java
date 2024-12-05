package edu.kh.cgram.story.controller;

import java.util.List;
import java.util.Map;

import edu.kh.cgram.member.dto.Member;
import lombok.extern.slf4j.Slf4j;
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
//	  	log.debug("스토리 값 : {}", story);
		
		story.setImgPath(story.getImgPath() + story.getImgRename());
	  
      model.addAttribute("story", story);
//      return "story/storyModal";
	  return "story/story-detail";
  }
  
  @GetMapping("/story/storyList")
  public String storyList(
		  @RequestParam("memberNickname") String memberNickname,
		  @SessionAttribute("loginMember") Member loginMember,
		  Model model
  ) {
	  model.addAttribute("memberNickname", memberNickname);
	  
	  List<Member> memberStoryList = storyService.memberStoryList(loginMember.getMemberNo());
	  
	  model.addAttribute("memberStoryList", memberStoryList);
	  
	  return "story/story-list";
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
  
  @PutMapping("/story")
  @ResponseBody
  public int storyDelete(
		@RequestBody int storyNo,
		@SessionAttribute("loginMember") Member loginMember
  ) {
		return storyService.storyDelete(storyNo, loginMember.getMemberNo());
  }
  
  
  
  
  // mainFeed에서 스토리 목록 처리
  @PostMapping("/api/story/view/{memberNickname}")
  @ResponseBody
  public Map<String, Object> updateStoryCheck(
//  	@RequestBody String memberNickname,
  	@PathVariable String memberNickname,
		@ModelAttribute("loginMember") Member loginMember) {
		
  	int memberNo = loginMember.getMemberNo();
  	
  	return storyService.updateStoryCheck1(memberNickname, memberNo);

	}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
}
