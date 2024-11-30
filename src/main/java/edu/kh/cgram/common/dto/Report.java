package edu.kh.cgram.common.dto;

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
public class Report {
	
	private int reportNo;
	private int boardNo;
	private String commentContent;
	private String commentDelFl;
	private String boardDelFl;
	private String boardContent;
	private String memberNickname;
	private String createdAt;
	private String reportCategory;
	private String reportView;
	private int contentNo;
}
