package edu.kh.cgram.member.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.cgram.member.dto.Member;
import edu.kh.cgram.member.service.MemberService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@SessionAttributes({"loginMember"})
@Controller
@RequestMapping("member")
@Slf4j
public class MemberController {

	@Autowired
	private MemberService service;

	@GetMapping("login")
	public String login() {
		return "member/login";
	}
	@PostMapping("login")
	public String login(		
			@RequestParam("memberId")String memberId,
			@RequestParam("memberPw")String memberPw,
			@RequestParam(name="saveId", required = false) String saveId,
			RedirectAttributes ra,
			Model model
			,HttpServletResponse resp
			) {

		// 로그인 서비스 호출
		Member loginMember = service.login(memberId, memberPw);
		
		if(loginMember == null) { // 로그인 실패
			ra.addFlashAttribute("message", "이메일 또는 비밀번호가 일치하지 않습니다");
			return "redirect:/member/login";
		}
		else { // 로그인 성공
			model.addAttribute("loginMember", loginMember);
//			Cookie cookie = new Cookie("saveId",memberId);
//			cookie.setPath("/");
//			if(saveId == null) { //체크 X
//				cookie.setMaxAge(0); // 만들어지자 마자 만료 == 기존에 쿠기가 있으면 덮어씌우고 없어짐
//			} else {
//				cookie.setMaxAge(60*60*24*30); // 30일 초 단위로 작성
//			}
//			resp.addCookie(cookie); // resp 객체에 추가해서 클라이언트에게 전달
			return "redirect:/"; // 메인 페이지 리다이렉트
		} 
	}
	
	
	@GetMapping("logout")
	public String logout(SessionStatus status) {
		status.setComplete();
		return "redirect:/login";
	}
	//----------------------------------------------------
	
	@GetMapping("signUp")
	public String signUp() {
		return "member/signUp";
	}
	@PostMapping("signUp")
	public String signUp(
			@ModelAttribute Member inputMember,
			RedirectAttributes ra) {
			
			// 회원가입 서비스 호출
		int result = service.signUp(inputMember);
		
		// 서비스 결과에 따라 응답 제어
		String path = null;
		String message = null;
		
		if(result > 0) {
			path = "/";
			message 
				= inputMember.getMemberNickname() + "님의 가입을 환영합니다";
		} else {
			path = "signUp";
			message = "회원 가입 실패...";
		}
		
		ra.addFlashAttribute("message",message);
		
		return "redirect:" + path;
	}
	@ResponseBody // 반환 값을 응답 본문(ajax코드)로 반환
	@GetMapping("emailCheck")
	public int emailCheck(
			@RequestParam("email") String email) {
		return service.emailCheck(email);
	}
	
	@ResponseBody
	@GetMapping("idCheck")
	public int idCheck(
			@RequestParam("id") String id) {
		return service.idCheck(id);
	}
	@ResponseBody
	@GetMapping("nicknameCheck")
	public int nicknameCheck(
			@RequestParam("nickname") String nickname) {
		return service.nicknameCheck(nickname);
	}
}
