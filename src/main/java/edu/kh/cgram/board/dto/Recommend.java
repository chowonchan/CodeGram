package edu.kh.cgram.board.dto;

import lombok.*;

import java.util.List;

import edu.kh.cgram.follow.dto.Follow;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Recommend {
	
	private int memberNo;
	private String memberNickname;
	private String memberName;
	private String profileImg;
	
	private List<Follow> followList;
	
}
