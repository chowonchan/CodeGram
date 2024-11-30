package edu.kh.cgram.board.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.kh.cgram.board.dto.Board;
import edu.kh.cgram.board.mapper.BoardMapper;
import edu.kh.cgram.board.service.BoardService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class ApiBoardController {

	private final BoardService boardService;


	// 게시물 목록을 반환하는 엔드포인트
	@GetMapping
	public ResponseEntity<Map<String, Object>> getBoards(
			@RequestParam int page, // 페이지 번호
			@RequestParam(required = false) Long lastBoardNo) { // 마지막 게시물 번호

		// 게시물 목록 조회
		List<Board> boards = boardService.getBoards(page, lastBoardNo);
		boolean hasMore = boards.size() == 10; // 10개를 반환하면 더 많은 게시물이 있다고 판단

		// 응답 객체
		Map<String, Object> response = new HashMap<>();
		response.put("boards", boards); // 게시물 목록
		response.put("hasMore", hasMore); // 더 많은 게시물 존재 여부

		return ResponseEntity.ok(response); // JSON 응답 반환
	}
	
	
	
}
