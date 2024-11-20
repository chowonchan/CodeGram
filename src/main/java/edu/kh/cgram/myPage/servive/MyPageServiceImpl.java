package edu.kh.cgram.myPage.servive;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.cgram.myPage.mapper.MyPageMapper;
//import lombok.RequiredArgsConstructor;

@Service
//@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService {


  @Value("${my.profile.folder-path}")
  private String folderPath;

  @Value("${my.profile.web-path}")
  private String webPath;

  private final MyPageMapper mapper;

  public MyPageServiceImpl(MyPageMapper mapper) {
      this.mapper = mapper;
  }

  @Override
  public String saveProfileImage(MultipartFile file, int memberNo) throws IOException {
      String originalFilename = file.getOriginalFilename();
      String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
      String savedFilename = UUID.randomUUID().toString() + extension;

      String savedPath = folderPath + savedFilename;

      File directory = new File(folderPath);
      if (!directory.exists()) {
          directory.mkdirs();
      }

      file.transferTo(new File(savedPath));

      String relativePath = webPath + savedFilename;

      // int 타입 memberNo를 MyBatis 매퍼로 전달
      mapper.updateProfileImg(memberNo, relativePath);

      return relativePath;
  }

}