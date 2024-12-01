package edu.kh.cgram.board.service;

import edu.kh.cgram.board.dto.Comment;

public interface CommentService {

    int commentInsert(Comment comment);

    int commentDelete(int commentNo, int memberNo);
}
