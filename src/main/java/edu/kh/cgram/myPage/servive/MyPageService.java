package edu.kh.cgram.myPage.servive;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import edu.kh.cgram.board.dto.BoardImg;
import edu.kh.cgram.member.dto.Member;
import edu.kh.cgram.story.dto.Story;

/**
 * MyPageService 인터페이스
 * 
 * 마이페이지 관련 비즈니스 로직을 정의하는 서비스 인터페이스입니다.
 */
public interface MyPageService {

    /**
     * 프로필 이미지를 저장합니다.
     *
     * 사용자가 업로드한 파일을 저장소에 저장하고, 저장된 파일의 경로를 반환합니다.
     * 
     * @param file      업로드된 프로필 이미지 파일 (MultipartFile 객체)
     * @param memberNo  회원 번호 (파일이 어떤 사용자와 연결될지 식별하기 위한 ID)
     * @return 저장된 파일의 웹 경로 (클라이언트가 이미지에 접근할 수 있는 경로)
     * @throws IOException 파일 저장 중 오류가 발생하면 예외를 던집니다.
     */
    String saveProfileImage(MultipartFile file, int memberNo) throws IOException;

    /**
     * 회원의 프로필 이미지를 기본 이미지로 변경합니다.
     *
     * 기본 이미지는 서버에 미리 저장된 "defaultImg.png"로 설정됩니다.
     * 데이터베이스에서 해당 사용자의 프로필 이미지 경로를 기본 이미지 경로로 업데이트합니다.
     * 
     * @param memberNo 회원 번호 (프로필 이미지 경로를 업데이트할 사용자의 ID)
     * @return 변경 성공 여부 (성공 시 true, 실패 시 false)
     */
    boolean resetProfileImageToDefault(int memberNo);

		boolean updateProfile(int memberNo, String selfIntroduction, int memberDisclosureScope);

		Member getMemberByNickname(String nickname);

		List<BoardImg> getMemberSaved(int memberNo);

		List<Story> getStoriesByMemberNo(int memberNo);
		
		
		
		




}
