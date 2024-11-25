package edu.kh.cgram.story.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Story {

	// 행 번호
	private int rnum;
	
	// STORY 테이블
	private int    storyNo;
	private String imgPath;
	private String createdAt;
	private String modifiedAt;
	private String storyDelFl;
	private int    readCount;
	private int	   memberNo;
	
	// 스토리 읽음 여부를 저장할 필드 (1 == 읽은 적 있음)
	private int    storyCheck;
	
	// 스토리좋아요 체크 여부를 저장할 필드 (1 == 누른 적 있음) 
	private int    storyLikeCheck;
	
	private String profileImg;
	
}
