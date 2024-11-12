package edu.kh.cgram.member.dto;

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
  private int 		memberNo;
  private String 	memberId;
  private String 	memberPw;
  private String 	memberEmail;
  private String 	memberNickname;
  private String 	memberName;
  private String 	profileImg;
  private String 	createdAt;
  private String 	memberDelBanFl;
  private String 	memberBirth;
  private String 	selfIntroduction;
  private String 	memberDisclosureScope;
  private String 	reportCount;
  private int 		authority; 
}
