package edu.kh.cgram.story.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.cgram.story.dto.Story;
import edu.kh.cgram.story.service.StoryService;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class StoryController {

	
	private final StoryService storyService;
  
  @GetMapping("/story/{memberNickname}/{storyNo}")
  public String showStoryModal(
  		@PathVariable String memberNickname,
      @PathVariable Long storyNo,
      Model model) {
  	
      Story story = storyService.getStoryDetail(storyNo);
      model.addAttribute("story", story);
      return "story/storyModal";
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
