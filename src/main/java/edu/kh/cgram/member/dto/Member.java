package edu.kh.cgram.member.dto;

import java.util.Date;

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
@Builder // 빌더 패턴 : 객체 생성 + 초기화를 쉽게하는 패턴
public class Member {
	
	private int 	 memberNo;
	private String memberEmail;
	private String memberId;
	private String memberPw;
	private String memberNickname;
	private String memberName;
	private String profileImg;
	private String createdAt;
	private int    memberDelBanFl;
	private String memberBirth;
	private String selfIntroduction;
	private int		 memberDisclosureScope;
	private int    admin;
	private int 	 reportCount;
	private int    boardCount;

  // 추가 필드
  private int postCount;                 // 게시물 수
  private int followerCount;             // 팔로워 수
  private int followCount;               // 팔로우 수

}
