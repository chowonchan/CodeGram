package edu.kh.cgram.board.mapper;

import edu.kh.cgram.board.dto.Board;
import edu.kh.cgram.board.dto.BoardImg;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface EditBoardMapper {
    int boardInsert(Board inputBoard);
    
    int boardImgInsert(List<BoardImg> boardImgs);
}
