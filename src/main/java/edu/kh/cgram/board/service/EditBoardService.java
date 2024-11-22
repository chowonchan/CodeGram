package edu.kh.cgram.board.service;

import edu.kh.cgram.board.dto.Board;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface EditBoardService {
    int boardInsert(Board inputBoard, List<MultipartFile> images);
}
