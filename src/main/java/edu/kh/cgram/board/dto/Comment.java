package edu.kh.cgram.board.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Comment {
    
    /* COMMENT 테이블 컬럼 매핑 필드 */
    private int	   commentNo;
    private String commentContent;
    
    /* 댓글 작성일, 댓글 수정날짜 */
    private String createdAt;
    private String modifiedAt;
    
    private String commentDelFl;
    private int    memberNo;
    private int    boardNo;
    private int    parentCommentNo;
    
    /* 댓글에 포함될 작성자명, 작성자 프로필 */
    private String memberNickname;
    private String profileImg;
    
    // 목록 조회 시 댓글 / 좋아요 수 상관 쿼리 결과
    private int    commentCount;
    private int    likeCount;
    
    // 좋아요 체크 여부를 저장할 필드(1 == 누른적 있음)
    private int likeCheck;
    
}