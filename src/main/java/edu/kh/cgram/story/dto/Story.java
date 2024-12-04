package edu.kh.cgram.story.dto;

import edu.kh.cgram.member.dto.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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
	private String 	modifiedAt;
	private char 	storyDelFl;
	private int 	readCount;
	private int 	memberNo;
	
	
	private String 	profileImg;
	private String 	memberNickname;
	
	private int 	likeCount;

	private String 	storyCheck; // 'Y' or 'N'
	private String 	storyLiked; // 'Y' or 'N'
	
	private List<Member> visitorList;
}

/*
	storyNo;	imgPath;		createdAt;			modifiedAt;		storyDelFl;		readCount;
	memberNo;	profileImg;		memberNickname;		likeCount;		storyCheck;		storyLiked;
	imgRename;
 */