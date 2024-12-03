SELECT * FROM BOARD;
SELECT * FROM BOARD_IMG;

SELECT BOARD_CONTENT FROM BOARD WHERE BOARD_CONTENT LIKE '가%';
SELECT COUNT(*) FROM BOARD WHERE BOARD_CONTENT LIKE '가%';

SELECT COUNT(*) FROM HASHTAG WHERE TAG_NAME LIKE #{tagName};

SELECT TAG_NAME FROM HASHTAG WHERE TAG_NAME LIKE #{tagName};

-- 태그 저장용 테이블을 따로 만드는 것이 좋아보임


SELECT * FROM BOARD B JOIN MEMBER M ON (B.MEMBER_NO = M.MEMBER_NO);

SELECT * FROM STORY;

select * from MEMBER;

COMMIT;



-- 로그인한 사람이 팔로우한 회원 번호 조회
SELECT MEMBER_NO, MEMBER_NICKNAME, PROFILE_IMG, FOLLOWING_MEMBER
FROM FOLLOW
JOIN MEMBER ON(FOLLOWER_MEMBER = MEMBER_NO)
WHERE FOLLOWING_MEMBER = 18; -- 2 , 1

SELECT * FROM FOLLOW ORDER BY FOLLOWING_MEMBER;


SELECT * FROM MEMBER;

SELECT * FROM STORY;






SELECT *
FROM STORY
JOIN FOLLOW ON MEMBER_NO = FOLLOWER_MEMBER
WHERE FOLLOWING_MEMBER = 18
AND   STORY.CREATED_AT > CURRENT_DATE -1;

SELECT *
FROM STORY
WHERE MEMBER_NO IN (SELECT MEMBER_NO FROM FOLLOW JOIN MEMBER ON(FOLLOWER_MEMBER = MEMBER_NO) WHERE FOLLOWING_MEMBER = 18)
AND  CREATED_AT > CURRENT_DATE -1;

(SELECT MEMBER_NO FROM FOLLOW JOIN MEMBER ON(FOLLOWER_MEMBER = MEMBER_NO) WHERE FOLLOWING_MEMBER = 18);



UPDATE STORY
SET CREATED_AT = CREATED_AT - 0.5
WHERE STORY_NO >0;

commit;

SELECT * FROM STORY order by MEMBER_NO;

SELECT FOLLOWER_MEMBER, MEMBER_NICKNAME, PROFILE_IMG
FROM FOLLOW
         JOIN MEMBER ON(FOLLOWER_MEMBER = MEMBER_NO)
WHERE FOLLOWING_MEMBER = 18;


SELECT *
FROM STORY
WHERE MEMBER_NO in (SELECT FOLLOWER_MEMBER
                    FROM FOLLOW
                             JOIN MEMBER ON(FOLLOWER_MEMBER = MEMBER_NO)
                    WHERE FOLLOWING_MEMBER = 18)
        AND  CREATED_AT > CURRENT_DATE - 1
        AND STORY_DEL_FL = 'N';

