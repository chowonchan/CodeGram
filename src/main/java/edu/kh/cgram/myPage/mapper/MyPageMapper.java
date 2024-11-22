package edu.kh.cgram.myPage.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * MyPageMapper
 * 
 * 마이페이지와 관련된 데이터베이스 작업을 처리하는 MyBatis Mapper 인터페이스입니다.
 * 이 인터페이스는 MyBatis와 연동되어 SQL 쿼리를 실행합니다.
 */
@Mapper // 이 인터페이스가 MyBatis 매퍼임을 스프링에 알림
public interface MyPageMapper {

    /**
     * 특정 회원의 프로필 이미지를 업데이트합니다.
     *
     * @param memberNo   회원 번호 (프로필 이미지가 업데이트될 대상 사용자 ID)
     * @param profileImg 새 프로필 이미지 경로 (서버에 저장된 이미지의 웹 경로)
     * @return 업데이트된 행의 개수 (1이면 성공, 0이면 실패)
     */
    int updateProfileImg(
            @Param("memberNo") int memberNo, // 회원 번호 매핑 (SQL의 #{memberNo}와 연결)
            @Param("profileImg") String relativePath // 이미지 경로 매핑 (SQL의 #{profileImg}와 연결)
    );

    /**
     * 사용자의 프로필 정보를 업데이트하는 메서드
     *
     * @param memberNo 업데이트할 회원 번호
     * @param selfIntroduction 새로운 소개글
     * @param recommendToggle 계정 추천 여부
     * @param privateToggle 계정 비공개 여부
     * @return 업데이트된 행의 개수
     */
    int updateProfile(
            @Param("memberNo") int memberNo,
            @Param("selfIntroduction") String selfIntroduction,
            @Param("memberDisclosureScope") int memberDisclosureScope
    );
}
