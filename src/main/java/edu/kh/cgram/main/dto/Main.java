package edu.kh.cgram.main.dto;

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
public class Main {

	// 행 번호
	private int	   rnum;
	
	// 피드 테이블 (board)
	
	private int    boardNo;
	private String boardContent;
	private int    readCount;
	private String createdAt;
	private String modifiedAt;
	private String boardDelFl;
	private int    memberNo;
	
	// 피드 이미지
	
	private int 	 imgNo;
	private String imgPath;
	private String imgRename;
	private String imgOrder;
	// private String boardNo;
	
	
	
}
