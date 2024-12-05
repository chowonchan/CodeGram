package edu.kh.cgram.member.controller;

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
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.cgram.board.dto.BoardImg;
import edu.kh.cgram.member.dto.Member;
import edu.kh.cgram.member.service.MemberService;
import edu.kh.cgram.myPage.servive.MyPageService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@SessionAttributes({ "loginMember" })
@Controller
@RequestMapping("member")
@Slf4j
public class MemberController {

	@Autowired
	private MemberService service;

	@PostMapping("login")
	@ResponseBody
	public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest, HttpSession session) {
		String memberId = loginRequest.get("memberId");
		String memberPw = loginRequest.get("memberPw");

		// DB에서 회원 정보 조회 및 비밀번호 검증
		Member loginMember = service.login(memberId, memberPw);

		int adminNumber = loginMember.getAdmin();

		if (loginMember == null) {
			return ResponseEntity.ok(Map.of("success", false, "message", "아이디 또는 비밀번호가 맞지 않습니다."));
		} // 응답 데이터

		if (adminNumber == 2) {
			session.setAttribute("loginMember", loginMember);
			return ResponseEntity.ok(Map.of("success", true, "message", "로그인 성공!", "url", "/admin/admin-memberList"));
		} else {
			session.setAttribute("loginMember", loginMember);
			return ResponseEntity.ok(Map.of("success", true, "message", "로그인 성공!", "url", "/main"));
//	    	return ResponseEntity.ok(Map.of("success", true, "message", "로그인 성공!", "url", "/board/randomPeed"));
		}
	}

	@GetMapping("logout")
	public String logout(SessionStatus status) {
		status.setComplete();// 세션 종료
		return "redirect:/";// 로그인 페이지로 리다이렉트
	}
	// ----------------------------------------------------

	// 약관 동의 페이지로 이동하는 메서드
	@GetMapping("terms")
	public String termsPage() {
		return "member/terms"; // 약관 동의 페이지로 이동
	}

	// 약관 동의 후 회원가입 페이지로 이동
	@GetMapping("signUp")
	public String agreeTerms(@RequestParam(name = "agree", required = false) Boolean agree, RedirectAttributes ra) {

		if (Boolean.TRUE.equals(agree)) {
			return "member/signUp"; // 약관에 동의한 경우 회원가입 페이지로 이동
		} else {
			ra.addFlashAttribute("message", "약관에 동의해야 회원가입이 가능합니다.");
			return "redirect:/terms"; // 동의하지 않은 경우 약관 동의 페이지로 다시 이동
		}
	}

	// 회원가입 처리
	@PostMapping("signUp")
	public String signUp(@RequestParam("birthYear") String birthYear, @RequestParam("birthMonth") String birthMonth,
			@RequestParam("birthDay") String birthDay, @ModelAttribute Member inputMember, RedirectAttributes ra) {

		// 생년월일 조합
		String formattedBirth = String.format("%s-%02d-%02d", birthYear, Integer.parseInt(birthMonth),
				Integer.parseInt(birthDay));
		inputMember.setMemberBirth(formattedBirth);

		int result = service.signUp(inputMember);

		if (result > 0) {
			ra.addFlashAttribute("message", inputMember.getMemberNickname() + "님의 가입을 환영합니다");
			return "redirect:/member/login";
		} else {
			ra.addFlashAttribute("message", "회원 가입 실패...");
			return "redirect:/member/signUp";
		}
	}

	@PostMapping("/findId")
	@ResponseBody
	public ResponseEntity<?> findUserId(@RequestBody Map<String, String> request) {
		String name = request.get("name");
		String email = request.get("email");
		String birthDate = request.get("birthDate");

		try {
			// 유효성 검사
			if (name == null || email == null || birthDate == null) {
				return ResponseEntity.badRequest().body("필수 필드가 누락되었습니다.");
			}

			// 데이터베이스에서 이름, 이메일, 생년월일로 사용자 조회
			Member member = service.findMemberByNameEmailAndBirth(name, email, birthDate);

			if (member != null) {
				// 유저가 존재하면 이메일로 아이디 전송
				boolean emailSent = service.sendUserIdToEmail(email, member.getMemberId());
				if (emailSent) {
					return ResponseEntity.ok(Map.of("success", true, "message", "아이디가 이메일로 전송되었습니다."));
				} else {
					return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
							.body(Map.of("success", false, "message", "이메일 전송에 실패했습니다."));
				}
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(Map.of("success", false, "message", "일치하는 유저 정보를 찾을 수 없습니다."));
			}
		} catch (Exception e) {
			// 서버 예외 처리
			log.error("아이디 찾기 중 오류 발생", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 내부 오류가 발생했습니다.");
		}
	}

	@PostMapping("/verifyUser")
	@ResponseBody
	public ResponseEntity<?> verifyUserForPassword(@RequestBody Map<String, String> request) {
		String name = request.get("name");
		String email = request.get("email");
		String birthDate = request.get("birthDate");
		String memberId = request.get("id");

		try {
			if (name == null || email == null || birthDate == null || memberId == null) {
				return ResponseEntity.badRequest().body("필수 필드가 누락되었습니다.");
			}

			// 유저 확인
			Member member = service.findMemberByNameEmailBirthAndId(name, email, birthDate, memberId);
			if (member != null) {
				return ResponseEntity.ok(Map.of("success", true, "message", "유저가 확인되었습니다."));

			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(Map.of("success", false, "message", "일치하는 유저 정보를 찾을 수 없습니다."));
			}
		} catch (Exception e) {
			log.error("유저 확인 중 오류 발생", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 내부 오류가 발생했습니다.");
		}
	}

	@PostMapping("/changePassword")
	@ResponseBody
	public ResponseEntity<?> changePassword(@RequestBody Map<String, String> request) {
		String newPassword = request.get("newPassword");
		String memberId = request.get("memberId");

		log.debug("수신된 데이터 - memberId: {}, newPassword: {}", memberId, newPassword);

		try {
			if (newPassword == null || memberId == null) {
				return ResponseEntity.badRequest().body("필수 필드가 누락되었습니다.");
			}

			int result = service.changePassword(memberId, newPassword);

			log.debug("비밀번호 변경 결과: {}", result);

			if (result > 0) {
				return ResponseEntity.ok(Map.of("success", true, "message", "비밀번호가 성공적으로 변경되었습니다."));
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body(Map.of("success", false, "message", "비밀번호 변경에 실패했습니다."));
			}
		} catch (Exception e) {
			log.error("비밀번호 변경 중 오류 발생", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 내부 오류가 발생했습니다.");
		}
	}

	/**************************************************/

	@GetMapping("{nickname}")
	public String showUserPage(@PathVariable(value = "nickname", required = false) String nickname, HttpSession session,
			RedirectAttributes ra, Model model) {

		// 세션에서 로그인 사용자 정보 가져오기
		Member loginMember = (Member) session.getAttribute("loginMember");
		if (loginMember == null) {
			log.warn("세션에 로그인된 사용자가 없습니다.");
			model.addAttribute("message", "로그인이 필요합니다.");
			return "redirect:/";
		}

		// 닉네임으로 사용자 조회
		Member member = null;
		if (nickname != null && !nickname.isEmpty()) {
			member = service.getMemberByNickname(nickname);
		}

		// 닉네임 조회 실패 시 로그인된 사용자 정보 사용
		if (member == null) {
			member = loginMember;
		}

		// 사용자 정보가 여전히 null이면 로그인 페이지로 리다이렉트
		if (member == null) {
			ra.addFlashAttribute("message", "사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.");
			return "redirect:/";
		}

		int loginMemberNo = loginMember.getMemberNo();
		int targetMemberNo = member.getMemberNo();
		log.info("로그인 사용자 번호: {}", loginMemberNo);
		log.info("타겟 사용자 번호: {}", targetMemberNo);

		// 차단 여부 확인
		boolean isBlocked = service.isBlocked(loginMemberNo, targetMemberNo);
		log.debug("차단 여부 확인 결과: {}", isBlocked);


		if (isBlocked) {
			log.warn("차단된 계정에 접근 시도: {}", member.getMemberNickname());
			model.addAttribute("message", "차단당한 계정입니다.");
			return "error/accessDenied"; // 접근 차단 페이지로 리다이렉트
		}
		
		// 비공개 여부 확인
//		boolean disclosure = service.disclosure(loginMemberNo, targetMemberNo);
//		log.debug("비공개 여부 확인 결과: {}", disclosure);
//		
//		if (disclosure) {
//
//		}

		// 추가 데이터 조회
		int postCount = service.getPostCountByMemberNo(member.getMemberNo());
		int followerCount = service.getFollowerCount(member.getMemberNo());
		int followCount = service.getFollowCount(member.getMemberNo());

		// **게시물 데이터 조회**
//		List<BoardImg> posts = service.getMemberPosts(nickname, 1);

		// 모델에 데이터 추가
		model.addAttribute("member", member);
		model.addAttribute("postCount", postCount);
		model.addAttribute("followerCount", followerCount);
		model.addAttribute("followCount", followCount);
//		model.addAttribute("posts", posts);

		log.info("프로필 조회 완료: {}", member);
		return "myPage/myPage";
	}

	/** 닉네임이 일치하는 회원의 원하는 페이지 FEED 조회하기*/
	@GetMapping("{nickname}/posts")
	@ResponseBody
	public List<BoardImg> getMemberPosts(
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			@PathVariable(value = "nickname", required = false) String nickname) {
		List<BoardImg> memberPosts = service.getMemberPosts(nickname, cp);

		return memberPosts;
	}

	/**************************************************/

	@ResponseBody
	@GetMapping("emailCheck")
	public int emailCheck(@RequestParam("email") String email) {
		return service.emailCheck(email);
	}

	@ResponseBody
	@GetMapping("idCheck")
	public int idCheck(@RequestParam("id") String id) {
		return service.idCheck(id);
	}

	@ResponseBody
	@GetMapping("nicknameCheck")
	public int nicknameCheck(@RequestParam("nickname") String nickname) {
		return service.nicknameCheck(nickname);
	}

	@ResponseBody
	@GetMapping("/search")
	public ResponseEntity<List<Member>> searchMembers(@SessionAttribute("loginMember") Member loginMember,
			@RequestParam("query") String keyword, @RequestParam("type") String type) {

		int memberNo = loginMember.getMemberNo();

		List<Member> members;

		if ("name".equals(type)) {
			// 한글 이름 검색
			members = service.searchMembersByName(keyword, memberNo);
		} else {
			// 닉네임 검색
			members = service.searchMembersByNickname(keyword, memberNo);
		}
		return new ResponseEntity<>(members, HttpStatus.OK);
	}
}