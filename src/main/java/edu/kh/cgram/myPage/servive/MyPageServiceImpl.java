package edu.kh.cgram.myPage.servive;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.cgram.board.dto.BoardImg;
import edu.kh.cgram.common.dto.Pagination;
import edu.kh.cgram.member.dto.Member;
import edu.kh.cgram.myPage.mapper.MyPageMapper;
import edu.kh.cgram.story.dto.Story;

/**
 * MyPageServiceImpl
 * 
 * 마이페이지 관련 비즈니스 로직을 구현한 클래스입니다.
 */
@Service // 이 클래스가 Spring의 서비스 컴포넌트임을 선언합니다.
public class MyPageServiceImpl implements MyPageService {

    @Autowired // MyPageMapper를 의존성 주입받아 사용합니다.
    private MyPageMapper mapper;

    // 기본 이미지 경로 (서버에 저장된 기본 이미지 URL)
    private final String DEFAULT_PROFILE_IMAGE_PATH = "/images/defaultImg.png";

    @Value("${my.profile.folder-path}") // 프로필 이미지 파일이 저장될 서버 디렉토리 경로
    private String folderPath;

    @Value("${my.profile.web-path}") // 웹에서 접근 가능한 프로필 이미지 경로
    private String webPath;

    /**
     * 사용자가 업로드한 프로필 이미지를 저장하고, 저장된 경로를 반환합니다.
     *
     * @param file      업로드된 이미지 파일
     * @param memberNo  회원 번호
     * @return 저장된 이미지의 웹 경로
     * @throws IOException 파일 저장 중 오류가 발생하면 예외를 던집니다.
     */
    @Override
    public String saveProfileImage(MultipartFile file, int memberNo) throws IOException {
        // 1. 업로드된 파일의 원본 파일명 가져오기
        String originalFilename = file.getOriginalFilename(); // 예: "profile.jpg"

        // 2. 파일 확장자 추출
        String extension = originalFilename.substring(originalFilename.lastIndexOf(".")); // 예: ".jpg"

        // 3. 고유한 파일명 생성 (UUID + 확장자)
        String savedFilename = UUID.randomUUID().toString() + extension; // 예: "abcd1234-efgh5678.jpg"

        // 4. 파일이 실제로 저장될 경로 생성
        String savedPath = folderPath + savedFilename; // 예: "/upload/profile/abcd1234-efgh5678.jpg"

        // 5. 저장 디렉토리가 존재하지 않으면 생성
        File directory = new File(folderPath); // 디렉토리 객체 생성
        if (!directory.exists()) { // 디렉토리가 없으면
            directory.mkdirs(); // 디렉토리를 생성
        }

        // 6. 업로드된 파일을 지정된 경로에 저장
        file.transferTo(new File(savedPath)); // 실제 파일 저장

        // 7. 저장된 파일의 웹 경로 생성
        String relativePath = webPath + savedFilename; // 예: "/images/profile/abcd1234-efgh5678.jpg"

        // 8. 데이터베이스에 저장된 프로필 이미지 경로를 업데이트
        mapper.updateProfileImg(memberNo, relativePath);

        // 9. 저장된 웹 경로 반환
        return relativePath; // 클라이언트에서 사용할 수 있는 경로 반환
    }

    /**
     * 회원의 프로필 이미지를 기본 이미지로 변경합니다.
     *
     * @param memberNo 회원 번호
     * @return 변경 성공 여부
     */
    @Override
    public boolean resetProfileImageToDefault(int memberNo) {
        // 1. 기본 이미지 경로로 데이터베이스 업데이트
        int result = mapper.updateProfileImg(memberNo, DEFAULT_PROFILE_IMAGE_PATH);

        // 2. 업데이트 결과를 반환 (1 이상이면 성공)
        return result > 0;
    }
    
    @Override
    public boolean updateProfile(int memberNo, String selfIntroduction, int memberDisclosureScope) {
      int result = mapper.updateProfile(memberNo, selfIntroduction, memberDisclosureScope);
      // 업데이트된 행의 개수가 1 이상이면 성공
      return result > 0;
  }
 
  	
  	@Override
  	public Member getMemberByNickname(String nickname) {
  	    return mapper.findMemberByNickname(nickname);
  	}
  	
  	@Override
  	public List<BoardImg> getMemberSaved(int memberNo) {
  		return mapper.selectMemberSaved(memberNo);
  	}
  	
    @Override
    public List<Story> getStoriesByMemberNo(int memberNo) {
        return mapper.getStoriesByMemberNo(memberNo);
    }
  	
  	

}
