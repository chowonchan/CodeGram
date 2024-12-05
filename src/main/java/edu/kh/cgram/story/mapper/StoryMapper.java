package edu.kh.cgram.story.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.cgram.story.dto.Story;
import io.lettuce.core.dynamic.annotation.Param;

@Mapper
public interface StoryMapper {

	
	
	// 회원 번호로 memberNo 조회
	int getMemberNo(String memberNickname);
	
	Story storyDetail(@Param("memberNo") int memberNo, @Param("storyNo") int storyNo);
	
	int storyInsert(Story story);

	// 스토리 삭제
	int storyDelete(@Param("storyNo") int storyNo, @Param("memberNo") int memberNo);


	
	// 새로 작성 코드들
	
	// insertStoryRead으로 StoryNo 갯수 조회하기
	int selectStoryNo(@Param("memberNickname") String memberNickname,@Param("memberNo") int memberNo);
	
	// 스토리를 이미 읽었는지 확인
	int checkStory(@Param("memberNickname") String memberNickname,@Param("memberNo") int memberNo);

	// 로그인한 회원이 팔로우한 회원들의 24시간 이내 스토리 목록 조회
	int selectStoryList(int memberNo);

	//팔로우한 회원의 24시간 내 스토리 존재 여부 확인
	int selectStoryHas(int memberNo);


}


