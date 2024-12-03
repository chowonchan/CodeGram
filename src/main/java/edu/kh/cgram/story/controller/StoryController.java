package edu.kh.cgram.story.controller;

import java.util.Collections;
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
  
  
  
  
  
  @PostMapping("/api/story/view/{storyNo}")
  @ResponseBody
  public Map<String, Boolean> updateStoryCheck(
  		@PathVariable Long storyNo,
      @AuthenticationPrincipal UserDetails userDetails) {
  	
      storyService.updateStoryCheck(storyNo, userDetails.getUsername());
      return Collections.singletonMap("success", true);
  }
  
  
	/*
	 * @PostMapping("/api/story/like/{storyNo}")
	 * 
	 * @ResponseBody public Map<String, Boolean> likeStory(@PathVariable Long
	 * storyNo,
	 * 
	 * @AuthenticationPrincipal UserDetails userDetails) {
	 * storyService.insertStoryLike(storyNo, userDetails.getUsername()); return
	 * Collections.singletonMap("success", true); }
	 * 
	 * @DeleteMapping("/api/story/like/{storyNo}")
	 * 
	 * @ResponseBody public Map<String, Boolean> unlikeStory(@PathVariable Long
	 * storyNo,
	 * 
	 * @AuthenticationPrincipal UserDetails userDetails) {
	 * storyService.deleteStoryLike(storyNo, userDetails.getUsername()); return
	 * Collections.singletonMap("success", true); }
	 */
}
