package edu.kh.cgram.myPage.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MyStory {
	private int memberNo;
	private int storyNo;
	private String imgRename;
	private String imgPath;
	private String createdAt;
	private String thumbnail=imgPath + imgRename;
}
