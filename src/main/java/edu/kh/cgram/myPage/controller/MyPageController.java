package edu.kh.cgram.myPage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import edu.kh.cgram.member.dto.Member;
import edu.kh.cgram.myPage.servive.MyPageService;
import jakarta.servlet.http.HttpSession;


@SessionAttributes("loginMember")
@Controller
@RequestMapping("/myPage")
public class MyPageController {
	
	@Autowired
	private MyPageService service;
	
  @GetMapping
  public String showMyPage(Model model, HttpSession session) {
      // 세션에서 로그인 사용자 정보 가져오기
      Member loginMember = (Member) session.getAttribute("loginMember");
      
      // 프로필 이미지가 없는 경우 기본 이미지 설정
      if (loginMember.getProfileImg() == null || loginMember.getProfileImg().isEmpty()) {
          loginMember.setProfileImg("/images/defaultImg.png");
      }

      // 로그인한 사용자 정보를 모델에 추가
      model.addAttribute("loginMember", loginMember);

      return "myPage/myPage"; // /templates/myPage/myPage.html 템플릿 렌더링
  }
	
	
	

}
