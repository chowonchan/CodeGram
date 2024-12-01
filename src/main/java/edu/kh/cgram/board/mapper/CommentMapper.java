package edu.kh.cgram.board.mapper;

import edu.kh.cgram.board.dto.Comment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface CommentMapper {

    int commentInsert(Comment comment);


    int commentDelete(
            @Param("commentNo") int commentNo,
            @Param("memberNo") int memberNo);
}
