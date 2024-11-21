package edu.kh.cgram.myactivity.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import edu.kh.cgram.board.dto.BoardImg;
import edu.kh.cgram.myactivity.dto.CommentDetails;

@Mapper
public interface MyActivityMapper {

	List<BoardImg> selectLikedPosts(int memberNo);

	int deleteLikes(@Param("memberNo") int memberNo, @Param("postIds") List<Integer> postIds);

	List<BoardImg> selectMemberPosts(int memberNo);

	int deleteBoards(@Param("memberNo") int memberNo, @Param("postIds") List<Integer> postIds);

	List<CommentDetails> selectComments(int memberNo);

	int deleteComments(@Param("memberNo") int memberNo, @Param("commentIds") List<Integer> commentIds);

}
