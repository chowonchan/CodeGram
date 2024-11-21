package edu.kh.cgram.myactivity.dto;

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
public class CommentDetails {

		private int commentNo;
		private int boardNo;
		private int memberNo;
		private String profileImg;
		private String memberNickname;
		private String boardContent;
		private String commentContent;
		private String userProfileImg;
		private String userNickname;
		
}
