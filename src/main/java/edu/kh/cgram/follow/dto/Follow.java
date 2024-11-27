package edu.kh.cgram.follow.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Follow {
	
	// FOLLOW 컬럼과 매핑되는 필드
	private int 		followingMember;
	private int 		followerMember;
	private String 	createdAt;
	private char 		confirm;
	
}
