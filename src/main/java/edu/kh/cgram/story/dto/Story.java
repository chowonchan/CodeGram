package edu.kh.cgram.story.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Story {


	private int 	storyNo;
	private String 	imgPath;
	private String  imgRename;
	private String 	createdAt;
	private char 	storyDelFl;
	private int 	memberNo;
	
	
	private String 	profileImg;
	private String 	memberNickname;
	
	private int 	likeCount;

	private String 	storyCheck; // 'Y' or 'N'
	private String 	storyLiked; // 'Y' or 'N'
}