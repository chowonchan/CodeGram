package edu.kh.cgram.board.controller;

import edu.kh.cgram.board.dto.Board;
import edu.kh.cgram.board.service.BoardService;
import edu.kh.cgram.board.service.BoardServiceImpl;
import edu.kh.cgram.board.service.EditBoardService;
import edu.kh.cgram.member.dto.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

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

    @PostMapping("delete")
    public String deleteBoard(
            @RequestParam("boardNo") int boardNo,
            @SessionAttribute("loginMember") Member loginMember,
            @RequestHeader("referer") String referer,
            RedirectAttributes ra
    ) {
        String[] arr = referer.split("/");

        int confirm = editBoardService.boardDelete(loginMember.getMemberNo(), boardNo);

        String path = null;
        String message = null;

        if(confirm == 0) {
            path = "referer";
            message = "삭제 실패";
        } else if(confirm == 1) {
            path = "/" + arr[3];
            message = "게시글이 삭제 되었습니다";
        } else {
            message = "어디서 오류가 난거지?";
        }

        ra.addFlashAttribute("message", message);

        return "redirect:" + path;

//        return "어디로 날릴지 토론";
    }



}
