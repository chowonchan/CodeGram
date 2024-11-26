package edu.kh.cgram.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member {
	
	private int 	 memberNo;
	private String memberEmail;
	private String memberId;
	private String memberPw;
	private String memberNickname;
	private String memberName;
	private String profileImg;
	private String createdAt;
	private String memberDelBanFl;
	private String memberBirth;
	private String selfIntroduction;
	private int    memberDisclosureScope;
	private String admin;
	private int    reportCount;
	
	private int    postCount;
	private int    followerCount;
	private int    followCount;
 
	
}
