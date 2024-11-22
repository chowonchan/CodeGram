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
  
  // ---------------- POST 요청: 프로필 이미지 제거 ----------------
//  @PostMapping("/deleteProfileImage") // "/myPage/deleteProfileImage" 경로로 POST 요청을 처리
//  @ResponseBody // 반환값(Map)을 JSON 형태로 응답
//  public Map<String, String> deleteProfileImage(
//      @SessionAttribute("loginMember") Member loginMember, // 세션에서 로그인된 사용자 정보 가져오기
//      HttpSession session) { // 세션 객체
//  		Map<String, String> result = new HashMap<>(); // 클라이언트에 보낼 응답 데이터를 저장할 Map

//      try {
//        // 서비스 호출: 데이터베이스에서 프로필 이미지 경로를 NULL로 설정
//        boolean isDeleted = service.deleteProfileImage(loginMember.getMemberNo());
//
//        if (isDeleted) {
//            // 프로필 이미지 삭제 성공: 세션 갱신
//            String defaultImagePath = "/images/defaultImg.png"; // 기본 이미지 경로
//            loginMember.setProfileImg(defaultImagePath); // 세션 객체 업데이트
//            session.setAttribute("loginMember", loginMember); // 변경된 세션 값 저장
//
//            // 성공 응답 데이터 설정
//            result.put("status", "success");
//            result.put("message", "프로필 이미지가 삭제되었습니다.");
//            result.put("imageUrl", defaultImagePath); // 기본 이미지 경로 반환
//        } else {
//            // 삭제 실패: 오류 메시지 반환
//            result.put("status", "error");
//            result.put("message", "프로필 이미지 삭제에 실패했습니다.");
//        }
//    } catch (Exception e) { // 예외 처리
//        e.printStackTrace(); // 서버 로그에 오류 출력
//        result.put("status", "error"); // 에러 상태 설정
//        result.put("message", "프로필 이미지 삭제 중 오류가 발생했습니다."); // 오류 메시지 설정
//    }
//
//    return result; // 결과 Map을 JSON 형태로 반환
//}


  @GetMapping("/editProfile")
  public String showEditProfilePage(Model model, @SessionAttribute("loginMember") Member loginMember) {
      model.addAttribute("loginMember", loginMember);
      return "myPage/editProfile"; // 프로필 편집 페이지 템플릿
  }


}