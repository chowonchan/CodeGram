package edu.kh.cgram.board.mapper;

import edu.kh.cgram.board.dto.Board;
import edu.kh.cgram.board.dto.BoardImg;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.multipart.MultipartFile;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface EditBoardMapper {
    int boardInsert(Board inputBoard);
    
    int boardImgInsert(List<BoardImg> boardImgs);

    int boardDelete(@Param("memberNo") int memberNo, @Param("boardNo") int boardNo);

    int boardUpdate(Board updateBoard);

    int deleteImage(@Param("deleteOrderList") String deleteOrderList, @Param("boardNo") int boardNo);

    int updateImage(MultipartFile img);
}
