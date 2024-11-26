package edu.kh.cgram.hashtag.dto;

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
public class HashTag {

	private String tagName; // 해시태그 이름
  private int postCount;  // 해당 해시태그와 연결된 게시물 수
}
