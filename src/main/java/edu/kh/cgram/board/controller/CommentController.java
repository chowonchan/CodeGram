package edu.kh.cgram.board.controller;

import edu.kh.cgram.board.dto.Comment;
import edu.kh.cgram.board.service.CommentService;
import edu.kh.cgram.member.dto.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService service;

    @PostMapping("comment")
    public int commentInsert(
            @RequestBody Comment comment,
            @SessionAttribute("loginMember") Member loginMember
    ) {
        comment.setMemberNo(loginMember.getMemberNo());

        return service.commentInsert(comment);
    }


    @PutMapping("comment")
    public int commentUpdate() {
        return 0;
    }


    @DeleteMapping("comment")
    public int commentDelete(
            @RequestBody int commentNo,
            @SessionAttribute("loginMember") Member loginMember
    ) {


        return service.commentDelete(commentNo, loginMember.getMemberNo());
    }
}
