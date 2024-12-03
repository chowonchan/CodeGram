package edu.kh.cgram.myPage.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.cgram.board.dto.BoardImg;
import edu.kh.cgram.common.dto.Pagination;
import edu.kh.cgram.member.dto.Member;
import edu.kh.cgram.myPage.servive.MyPageService;
import edu.kh.cgram.story.dto.Story;
import jakarta.servlet.http.HttpSession;

@SessionAttributes("loginMember") // 세션에서 "loginMember" 속성을 관리하도록 설정
@Controller // 이 클래스가 Spring MVC에서 컨트롤러 역할을 한다는 것을 Spring에 알림
@RequestMapping("/myPage") // 이 컨트롤러는 "/myPage"로 시작하는 모든 요청을 처리
public class MyPageController {

    @Autowired
    private MyPageService service; // MyPageService 객체를 의존성 주입하여 사용
    
    // 생성자 주입
    public MyPageController(MyPageService myPageService) {
        this.service = myPageService;
    }


    /**
     * 마이페이지 화면을 렌더링합니다.
     * 
     * @param model   뷰에 데이터를 전달하기 위한 객체
     * @param session 현재 사용자 세션 객체
     * @return 마이페이지 템플릿 이름
     */
    @GetMapping
    public String showMyPage(Model model, HttpSession session) {
        // 세션에서 로그인 사용자 정보를 가져옵니다.
        Member loginMember = (Member) session.getAttribute("loginMember");

        // 사용자가 프로필 이미지를 설정하지 않은 경우, 기본 이미지를 설정합니다.
        if (loginMember.getProfileImg() == null || loginMember.getProfileImg().isEmpty()) {
            loginMember.setProfileImg("/images/defaultImg.png");
        }

        // 로그인한 사용자 정보를 모델에 추가하여 뷰에 전달
        model.addAttribute("loginMember", loginMember);

        // "myPage/myPage.html" 템플릿을 렌더링합니다.
        return "myPage/myPage";
    }

    /**
     * 프로필 이미지를 업로드하고 저장합니다.
     * 
     * @param file        사용자가 업로드한 파일
     * @param loginMember 세션에서 가져온 로그인 사용자 정보
     * @param session     현재 사용자 세션
     * @return JSON 형태의 응답 (상태 및 이미지 URL 포함)
     */
    @PostMapping("/profile")
    @ResponseBody // 반환값을 JSON 형식으로 클라이언트에 전달
    public Map<String, String> uploadProfileImage(
            @RequestParam("profileImg") MultipartFile file, // 클라이언트에서 업로드한 파일
            @SessionAttribute("loginMember") Member loginMember, // 세션에서 로그인된 사용자 정보
            HttpSession session) {

        Map<String, String> result = new HashMap<>(); // 응답 데이터를 저장할 Map 객체 생성

        try {
            if (!file.isEmpty()) { // 파일이 비어있지 않은 경우에만 처리
                // 파일을 저장하고 저장된 경로를 반환받음
                String savedPath = service.saveProfileImage(file, loginMember.getMemberNo());

                // 세션에 저장된 프로필 이미지 경로를 업데이트
                loginMember.setProfileImg(savedPath);
                session.setAttribute("loginMember", loginMember);

                // 성공 응답 작성
                result.put("status", "success");
                result.put("imageUrl", savedPath); // 클라이언트가 사용할 이미지 경로 포함
            } else {
                // 업로드된 파일이 없는 경우 에러 응답 작성
                result.put("status", "error");
                result.put("message", "업로드된 파일이 없습니다.");
            }
        } catch (IOException e) {
            // 파일 처리 중 오류가 발생한 경우
            e.printStackTrace(); // 서버 로그에 에러 메시지 출력
            result.put("status", "error");
            result.put("message", "프로필 이미지 변경 중 오류가 발생했습니다.");
        }

        return result; // JSON 형태로 클라이언트에 응답
    }

    /**
     * 프로필 이미지를 기본 이미지로 변경합니다.
     * 
     * @param loginMember 세션에서 가져온 로그인 사용자 정보
     * @param model       뷰에 데이터를 전달하기 위한 객체
     * @return 성공 시 프로필 페이지로 리다이렉트, 실패 시 에러 메시지와 함께 페이지 유지
     */
    @PostMapping("/profile/delete")
    public String deleteProfileImage(
            @ModelAttribute("loginMember") Member loginMember, // 세션에서 "loginMember" 속성을 가져옴
            Model model) {
        try {
            // 사용자의 회원 번호를 가져옴
            int memberNo = loginMember.getMemberNo();

            // 서비스 호출하여 기본 이미지로 변경
            boolean isDeleted = service.resetProfileImageToDefault(memberNo);

            if (isDeleted) {
                // 세션 정보 업데이트 (기본 이미지로 설정)
                loginMember.setProfileImg("/images/defaultImg.png");
                model.addAttribute("loginMember", loginMember);

                // 성공 시 마이페이지로 리다이렉트
                return "redirect:/myPage/profile";
            } else {
                // 실패 시 에러 메시지 추가
                model.addAttribute("errorMessage", "프로필 사진 삭제 중 문제가 발생했습니다.");
                return "myPage/profile";
            }
        } catch (Exception e) {
            // 예외 발생 시 에러 메시지 추가
            model.addAttribute("errorMessage", "예기치 못한 오류가 발생했습니다.");
            return "myPage/profile";
        }
    }

    /**
     * 프로필 편집 페이지를 렌더링합니다.
     * 
     * @param model       뷰에 데이터를 전달하기 위한 객체
     * @param loginMember 세션에서 가져온 로그인 사용자 정보
     * @return 프로필 편집 페이지 템플릿 이름
     */
    
    @GetMapping("/editProfile")
    public String showEditProfilePage(Model model, @SessionAttribute("loginMember") Member loginMember) {
        // 로그인된 사용자 정보를 모델에 추가
        model.addAttribute("loginMember", loginMember);

        // "myPage/editProfile.html" 템플릿을 렌더링
        return "myPage/editProfile";
    }
    
    @GetMapping("/savedStory")
    public String showSavedStoryPage(Model model, @SessionAttribute("loginMember") Member loginMember) {
        // 로그인된 사용자의 MEMBER_NO를 가져옴
        int memberNo = loginMember.getMemberNo();

        // 해당 MEMBER_NO에 해당하는 STORY 리스트를 조회
        List<Story> stories = service.getStoriesByMemberNo(memberNo);

        // 조회한 데이터를 모델에 추가
        model.addAttribute("stories", stories);
        model.addAttribute("loginMember", loginMember);

        // "myPage/saveStory.html" 템플릿을 렌더링
        return "myPage/saveStory";
    }
//    
//    @GetMapping("/posts")
//    @ResponseBody
//    public ResponseEntity<Map<String, Object>> getMemberPosts(
//            @SessionAttribute("loginMember") Member loginMember,
//            @RequestParam(value = "page", defaultValue = "1") int page,
//            @RequestParam(value = "size", defaultValue = "9") int size) {
//
//        // 로그인된 회원 번호 가져오기
//        int memberNo = loginMember.getMemberNo();
//
//        // 서비스 계층에서 해당 페이지의 게시물 데이터 가져오기
//        List<BoardImg> posts = service.getMemberPosts(memberNo, page, size);
//
//        // 총 게시물 개수 가져오기
//        int totalPostCount = service.getTotalPostCount(memberNo);
//
//        // 페이지네이션 정보 계산
//        int totalPages = (int) Math.ceil((double) totalPostCount / size);
//
//        // 응답 데이터 구성
//        Map<String, Object> response = new HashMap<>();
//        response.put("posts", posts);
//        response.put("currentPage", page);
//        response.put("totalPages", totalPages);
//        response.put("totalPostCount", totalPostCount);
//
//        return ResponseEntity.ok(response);
//    }



  	
  	@GetMapping("/saved")
  	@ResponseBody
  	public List<BoardImg> getMemberSaved(
  		@SessionAttribute("loginMember") Member loginMember) {
  		// 로그인된 회원의 번호 가져오기
  		int memberNo = loginMember.getMemberNo();
  		
  		List<BoardImg> memberSaved = service.getMemberSaved(memberNo);
  		
  		return memberSaved;
  	}

    
    /**
     * 프로필 업데이트 요청을 처리하는 메서드
     *
     * @param profileData 클라이언트에서 전달받은 JSON 데이터를 담을 DTO 객체
     * @param session 현재 로그인한 사용자의 세션 정보
     * @return 성공 또는 실패 메시지와 상태 코드
     */
    @PostMapping("/updateProfile")
    @ResponseBody // 반환 데이터를 JSON 형식으로 변환
    public ResponseEntity<?> updateProfile(
            @RequestBody Member profileData, // 클라이언트에서 전달한 JSON 데이터를 Member DTO로 매핑
            HttpSession session // 현재 세션 정보를 가져오기
    ) {
        try {
            // 세션에서 로그인한 사용자 정보를 가져옴
            Member loginMember = (Member) session.getAttribute("loginMember");

            if (loginMember == null) {
                // 세션에 로그인 정보가 없으면 에러 응답 반환
                return ResponseEntity.status(401).body("로그인이 필요합니다.");
            }

            // 서비스 계층을 통해 업데이트 요청 처리
            boolean isUpdated = service.updateProfile(
                    loginMember.getMemberNo(), // 로그인된 회원 번호
                    profileData.getSelfIntroduction(), // 클라이언트가 보낸 소개글
                    profileData.getMemberDisclosureScope() // 계정 비공개 여부
            );

            if (isUpdated) {
                // 세션 정보 업데이트
                loginMember.setSelfIntroduction(profileData.getSelfIntroduction());
                loginMember.setMemberDisclosureScope(profileData.getMemberDisclosureScope());
                session.setAttribute("loginMember", loginMember);

                // 성공 응답 반환
                return ResponseEntity.ok().body("{\"status\": \"success\"}");
            } else {
                // 실패 응답 반환
                return ResponseEntity.status(500).body("{\"status\": \"error\"}");
            }

        } catch (Exception e) {
            // 예외 발생 시 에러 응답 반환
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"status\": \"error\", \"message\": \"서버 오류 발생\"}");
        }
    }
    
    
}
