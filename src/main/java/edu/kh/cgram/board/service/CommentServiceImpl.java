package edu.kh.cgram.board.service;

import edu.kh.cgram.board.dto.Comment;
import edu.kh.cgram.board.mapper.CommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentMapper mapper;

    @Override
    public int commentInsert(Comment comment) {

        int result = mapper.commentInsert(comment);

        // 삽입 성공 시 댓글 번호 반환
        if(result > 0) return comment.getCommentNo();

        // 실패 시 0 반환
        return 0;
    }

    // 댓글 삭제
    @Override
    public int commentDelete(int commentNo, int memberNo) {
        return mapper.commentDelete(commentNo, memberNo);
    }

}