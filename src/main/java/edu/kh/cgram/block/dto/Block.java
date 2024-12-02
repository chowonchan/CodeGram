package edu.kh.cgram.block.dto;

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
public class Block {

	private String profileImg;
	private String memberNickname;
	private int blockMember;
	private int blockedMember;
	private String 	createdAt;
}
