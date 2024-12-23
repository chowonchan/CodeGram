package edu.kh.cgram.board.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import edu.kh.cgram.board.dto.Board;
import edu.kh.cgram.board.service.EditBoardService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import edu.kh.cgram.board.dto.BoardImg;
import edu.kh.cgram.board.dto.Comment;
import edu.kh.cgram.board.service.BoardService;
import edu.kh.cgram.member.dto.Member;
import edu.kh.cgram.myactivity.service.MyActivityService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;


@Controller
@RequestMapping("board")
@RequiredArgsConstructor
public class BoardController {
	
	private static final Logger log = LoggerFactory.getLogger(BoardController.class);
	private final BoardService service;
	private final MyActivityService myActivityService;
	
	@GetMapping("myActivity")
	public String myActivityPage() {
		return "/board/myActivity";
	}
	
	@GetMapping("randomPeed")
	public String randomPeedPage() {
		return "/board/randomPeed";
	}
	
	@GetMapping("randomPeed/posts")
	@ResponseBody
	public List<BoardImg> getRandomPosts(
		@SessionAttribute("loginMember") Member loginMember) {
		
		// 로그인된 회원의 번호 가져오기
		int memberNo = loginMember.getMemberNo();
		
		List<BoardImg> randomPosts = service.getRandomPosts(memberNo);
		
		return randomPosts;
	}
	
	@GetMapping("/detail")
	@ResponseBody
	public Map<String, Object> getBoardDetail(
			@RequestParam("boardNo") int boardNo,
			@SessionAttribute("loginMember") Member loginMember) {
		
      Map<String, Object> result = new HashMap<>();

      int memberNo = loginMember.getMemberNo();
 	    boolean isLiked = service.isLiked(boardNo, memberNo);
 	    
      // 게시글 데이터 조회
      Board board = service.selectBoardDetail(boardNo);
      if (board == null) {
           throw new IllegalArgumentException("게시글이 존재하지 않습니다.");
      }
      
      List<Map<String, Object>> images = service.selectBoardImages(boardNo);

      // 댓글 데이터 조회
      List<Comment> comments = service.selectBoardComments(boardNo, memberNo);

      // 데이터 저장
			result.put("boardNo", board.getBoardNo());
      result.put("imagePath", board.getImagePath());
      result.put("memberNickname", board.getMemberNickname());
      result.put("boardContent", board.getBoardContent());
      result.put("likeCount", board.getLikeCount());
      result.put("createdAt", board.getCreatedAt());
      result.put("imageRename", board.getImageRename());
      result.put("commentCount", board.getCommentCount());
      result.put("comments", comments);
			result.put("isLiked", isLiked);
			result.put("images", images);

      return result;
  }
	
	@DeleteMapping("/unlike")
	@ResponseBody
	public int unlikeBoard(
	    @RequestBody Map<String, Integer> requestData,
	    @SessionAttribute("loginMember") Member loginMember) {
		
	    int memberNo = loginMember.getMemberNo();
	    int boardNo = requestData.get("boardNo");

	    return service.unlikeBoard(memberNo, boardNo);
	}
	
	@PostMapping("/boardLike")
  @ResponseBody
  public int likeBoard(
  		@RequestBody Map<String, Integer> requestData,
			@SessionAttribute("loginMember") Member loginMember,
  		HttpSession session) {
		
      int memberNo = loginMember.getMemberNo();
      int boardNo = requestData.get("boardNo");

      int result = service.likeBoard(memberNo, boardNo);

      return result;
  }
	
	@GetMapping("/checkAuthor")
	@ResponseBody
	public boolean checkAuthor(
			@RequestParam("boardNo") int boardNo,
	    @SessionAttribute("loginMember") Member loginMember) {
	    int memberNo = loginMember.getMemberNo();
	    return service.isAuthor(boardNo, memberNo);
	}
	
	@GetMapping("/likes/{boardNo}")
	@ResponseBody
	public List<Member> getLikes(@PathVariable("boardNo") int boardNo) {
	    return service.getLikes(boardNo);
	}
	
	@PostMapping("/report")
	@ResponseBody
	public int reportBoard(
			@RequestBody Map<String, Object> requestData,
	    @SessionAttribute("loginMember") Member loginMember) {
	    
	    int memberNo = loginMember.getMemberNo();
	    int contentType =  Integer.parseInt((String) requestData.get("contentType"));
	    int boardNo = Integer.parseInt((String) requestData.get("contentNo"));
	    String reportReason = (String) requestData.get("reportReason");
	    
	    
	    return service.reportBoard(boardNo, memberNo, reportReason, contentType);
	}

	@PostMapping("/postComment")
	@ResponseBody
	public int postComment(
			@RequestBody Map<String, String> commentData,
	    @SessionAttribute("loginMember") Member loginMember) {
		
		  int memberNo = loginMember.getMemberNo();
	    int boardNo = Integer.parseInt(commentData.get("boardNo"));
	    String commentContent = commentData.get("commentContent");
	    
	    return service.postComment(boardNo, memberNo, commentContent);
	}
	
	@PostMapping("/comment/like")
	@ResponseBody
  public int likeComment(
  		@RequestBody Map<String, String> likeData,
      @SessionAttribute("loginMember") Member loginMember) {
		
      int commentNo = Integer.parseInt(likeData.get("commentNo"));
      
      int memberNo = loginMember.getMemberNo();

      return service.likeComment(commentNo, memberNo);
  }

  @DeleteMapping("/comment/unlike")
  @ResponseBody
  public int unlikeComment(
  		@RequestBody Map<String, String> unlikeData,
      @SessionAttribute("loginMember") Member loginMember) {
  	
      int commentNo = Integer.parseInt(unlikeData.get("commentNo"));
      
      int memberNo = loginMember.getMemberNo();

      return service.unlikeComment(commentNo, memberNo);
  }
	
	
	@PutMapping("delete")
	@ResponseBody
	public int feedDelete(
			@RequestBody int boardNo,
			@SessionAttribute("loginMember") Member loginMember
	) {
		log.debug("boardNo: {}", boardNo);
		return service.feedDelete(boardNo, loginMember.getMemberNo());
	}



}
