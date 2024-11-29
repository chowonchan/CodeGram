package edu.kh.cgram.board.controller;

import edu.kh.cgram.board.dto.Board;
import edu.kh.cgram.board.service.BoardService;
import edu.kh.cgram.board.service.BoardServiceImpl;
import edu.kh.cgram.board.service.EditBoardService;
import edu.kh.cgram.member.dto.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("board")
@RequiredArgsConstructor
public class EditBoardController {
    
    private final EditBoardService editBoardService;
    private final BoardService boardService;
    
    @GetMapping("insert")
    public String insertBoard() {
        return "write/modal-feed-write";
    }
    
    @GetMapping("update")
    public String updateBoard() {
        return "write/modal-feed-update";
    }
    
    @ResponseBody
    @PostMapping("submitFeed")
    public int submitFeed(
            @ModelAttribute Board inputBoard,
            @SessionAttribute("loginMember") Member loginMember,
            @RequestParam("images") List<MultipartFile> images
    ) {
        inputBoard.setMemberNo(loginMember.getMemberNo());
        
        int result = editBoardService.boardInsert(inputBoard, images);
        
        return result;
    }
    
    @ResponseBody
    @PostMapping("{boardNo}/updateView")
    public int updateFeedView(
            @PathVariable("boardNo") int boardNo
    ) {
        return boardService.selectDetail(boardNo);
    }
    
    @ResponseBody
    @PostMapping("{boardNo}/updateFeed")
    public int updateFeed(
            @PathVariable("boardNo") int boardNo,
            @SessionAttribute("loginMember") Member loginMember
    ) {

        return 0;
    }
    
}
