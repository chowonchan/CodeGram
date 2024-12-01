package edu.kh.cgram.board.mapper;

import edu.kh.cgram.board.dto.Board;
import edu.kh.cgram.board.dto.BoardImg;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Mapper
public interface EditBoardMapper {
    int boardInsert(Board inputBoard);
    
    int boardImgInsert(List<BoardImg> boardImgs);

    int boardDelete(int memberNo, int boardNo);

    int boardUpdate(Board updateBoard);

    int deleteImage(String deleteOrderList, int boardNo);

    int updateImage(MultipartFile img);
}
