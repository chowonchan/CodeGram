package edu.kh.cgram.myactivity.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.cgram.board.dto.BoardImg;
import edu.kh.cgram.member.dto.Member;
import edu.kh.cgram.myactivity.dto.CommentDetails;
import edu.kh.cgram.myactivity.service.MyActivityService;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("myActivity")
@RequiredArgsConstructor
public class MyActivityController {
	
	private final MyActivityService service;
	
	@GetMapping("/interactions/likes")
	@ResponseBody
	public List<BoardImg> getLikedPosts(
		@SessionAttribute("loginMember") Member loginMember) {
		// 로그인된 회원의 번호 가져오기
		int memberNo = loginMember.getMemberNo();
		
		List<BoardImg> likedPosts = service.getLikedPosts(memberNo);
		
		return likedPosts;
	}
	
	@PostMapping("/deleteLikes")
	@ResponseBody
	public int deleteLikes(
		@RequestBody List<Integer> postIds,
		@SessionAttribute("loginMember") Member loginMember) {
		// 로그인된 회원의 번호 가져오기
		int memberNo = loginMember.getMemberNo();
		
		int result = service.deleteLikes(memberNo, postIds);
		
		return result;
	}
	
	@GetMapping("/posts")
	@ResponseBody
	public List<BoardImg> getMemberPosts(
		@SessionAttribute("loginMember") Member loginMember) {
		// 로그인된 회원의 번호 가져오기
		int memberNo = loginMember.getMemberNo();
		
		List<BoardImg> memberPosts = service.getMemberPosts(memberNo);
		
		return memberPosts;
	}
	
	@PostMapping("/deletePosts")
	@ResponseBody
	public int deletePosts(
		@RequestBody List<Integer> postIds,
		@SessionAttribute("loginMember") Member loginMember) {
		// 로그인된 회원의 번호 가져오기
		int memberNo = loginMember.getMemberNo();
		
		int result = service.deletePosts(memberNo, postIds);
		
		return result;
	}
	
	@GetMapping("/comments")
	@ResponseBody
	public List<CommentDetails> getComments(
		@SessionAttribute("loginMember") Member loginMember) {
		// 로그인된 회원의 번호 가져오기
		int memberNo = loginMember.getMemberNo();
		
		List<CommentDetails> comments = service.getComments(memberNo);
		
		return comments;
	}
	
	
}