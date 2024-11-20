package edu.kh.cgram.myPage.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.cgram.member.dto.Member;
import edu.kh.cgram.myPage.servive.MyPageService;
import jakarta.servlet.http.HttpSession;


@SessionAttributes("loginMember")
@Controller
@RequestMapping("myPage")
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
  
  @PostMapping("/profile")
  @ResponseBody
  public Map<String, String> uploadProfileImage(
          @RequestParam("profileImg") MultipartFile file,
          @SessionAttribute("loginMember") Member loginMember,
          HttpSession session) {
      Map<String, String> result = new HashMap<>();

      try {
          if (!file.isEmpty()) {
              // 서비스 호출하여 파일 저장 및 경로 반환
              String savedPath = service.saveProfileImage(file, loginMember.getMemberNo());

              // 세션 갱신
              loginMember.setProfileImg(savedPath);
              session.setAttribute("loginMember", loginMember);

              result.put("status", "success");
              result.put("imageUrl", savedPath); // 클라이언트가 사용할 이미지 경로 반환
          } else {
              result.put("status", "error");
              result.put("message", "업로드된 파일이 없습니다.");
          }
      } catch (IOException e) {
          e.printStackTrace();
          result.put("status", "error");
          result.put("message", "프로필 이미지 변경 중 오류가 발생했습니다.");
      }

      return result; // JSON 형태로 반환
  }

  @GetMapping("/editProfile")
  public String showEditProfilePage(Model model, @SessionAttribute("loginMember") Member loginMember) {
      model.addAttribute("loginMember", loginMember);
      return "myPage/editProfile"; // 프로필 편집 페이지 템플릿
  }

}