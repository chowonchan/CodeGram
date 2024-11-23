package edu.kh.cgram.board.service;

import edu.kh.cgram.board.dto.Board;
import edu.kh.cgram.board.dto.BoardImg;
import edu.kh.cgram.board.mapper.EditBoardMapper;
import edu.kh.cgram.common.util.FileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

@PropertySource("classpath:/config.properties")
@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class EditBoardServiceImpl implements EditBoardService {
    
    @Value("${my.board.folder-path}")
    private String folderPath;
    
    @Value("${my.board.web-path}")
    private String webPath;
    
    private final EditBoardMapper mapper;
    
    @Override
    public int boardInsert(Board inputBoard, List<MultipartFile> images) {
        
        int result = mapper.boardInsert(inputBoard);
        
        if(result == 0) {
            return 0;
        }
     
        
        int boardNo = inputBoard.getBoardNo();
        
        List<BoardImg> boardImgs = new ArrayList<>();
        
        int i = 1;
        for(MultipartFile img : images) {
            BoardImg boardImg = new BoardImg();
            boardImg.setBoardNo(boardNo);
            boardImg.setImgOrder(i++);
            String rename = FileUtil.rename(img.getOriginalFilename());
            boardImg.setImgRename(rename);
            
            boardImg.setImgPath(webPath);
            
            boardImg.setUploadFile(img);
            boardImgs.add(boardImg);
        }
        
        result = mapper.boardImgInsert(boardImgs);
        
        if(result != boardImgs.size()) {
            throw new RuntimeException("이미지 저장 중 오류");
            // 사용자 정의 예외로 변경하기
        }
        
        for(BoardImg boardImg : boardImgs) {
            String rename = boardImg.getImgRename();
            MultipartFile uploadFile = boardImg.getUploadFile();
            
            try {
                uploadFile.transferTo(new File(folderPath + rename));
            } catch (Exception e) {
                e.printStackTrace();
                throw new RuntimeException("이미지 저장 중 오류");
            }
            
        }
        
        return result;
    }
}