package edu.kh.cgram.myPage.servive;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.cgram.myPage.mapper.MyPageMapper;

@Service // 이 클래스가 서비스 역할을 한다는 것을 스프링에 알림
public class MyPageServiceImpl implements MyPageService {

    @Autowired // 등록된 Bean 중에서 같은 타입의 Bean을 주입 (DI)
    private MyPageMapper mapper;

    @Value("${my.profile.folder-path}") // application.properties 또는 application.yml에서 설정된 값 주입
    private String folderPath;

    @Value("${my.profile.web-path}") // 웹에서 접근 가능한 이미지 경로
    private String webPath;

    @Override
    public String saveProfileImage(MultipartFile file, int memberNo) throws IOException {
        // 원본 파일명에서 확장자 추출
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf(".")); // 확장자 추출

        // 고유한 파일명을 생성 (UUID + 확장자)
        String savedFilename = UUID.randomUUID().toString() + extension;

        // 파일의 실제 저장 경로 생성
        String savedPath = folderPath + savedFilename;

        // 저장 디렉토리가 없으면 생성
        File directory = new File(folderPath);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // 업로드된 파일을 지정된 경로에 저장
        file.transferTo(new File(savedPath));

        // 저장된 파일의 웹 경로 생성
        String relativePath = webPath + savedFilename;

        // 데이터베이스에 저장된 프로필 이미지 경로 업데이트
        mapper.updateProfileImg(memberNo, relativePath);

        // 저장된 웹 경로 반환
        return relativePath;
    }

    @Override
    public int deleteProfileImage(int memberNo) {
        return mapper.deleteProfileImg(memberNo); // 변경된 행의 수 반환
    }

}
