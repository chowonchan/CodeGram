package edu.kh.cgram.myPage.servive;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface MyPageService {
  // 프로필 이미지 저장 메서드 정의
	String saveProfileImage(MultipartFile file, int memberNo) throws IOException;
}