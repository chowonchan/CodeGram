SELECT  * FROM MEMBER ORDER BY MEMBER_NO;
SELECT  * FROM BOARD ORDER BY BOARD_NO DESC;
SELECT  * FROM BOARD_IMG ORDER BY BOARD_NO DESC;
SELECT  * FROM BOARD_IMG ORDER BY IMG_NO DESC;
SELECT  * FROM HASHTAG ORDER BY TAG_NAME DESC;
SELECT  * FROM STORY;

/* PL/SQL을 이용해서 맴버 샘플 데이터 삽입 (PW는 pass01!) */
BEGIN
    FOR I IN 1..21 LOOP
            INSERT INTO "MEMBER"
            VALUES(
                   SEQ_MEMBER_NO.NEXTVAL,
                   'sample' || SEQ_MEMBER_NO.CURRVAL,
                   '$2a$10$RY0ttpgkDhNnm/ZExrVZqe4HfzjSoJizjbJBGybCJGdmSOWER4a7m',
                   'test' || SEQ_MEMBER_NO.CURRVAL || '@cgram.com',
                   'nick' || SEQ_MEMBER_NO.CURRVAL,
                   'name' || SEQ_MEMBER_NO.CURRVAL,
                   NULL, DEFAULT, DEFAULT, NULL, NULL, DEFAULT, DEFAULT, DEFAULT
                  );
        END LOOP;
END;

COMMIT;

-- 게시글 샘플 데이터
BEGIN
    FOR I IN 1..100 LOOP
            INSERT INTO "BOARD"
            VALUES(
                   SEQ_BOARD_NO.NEXTVAL,
                   SEQ_BOARD_NO.CURRVAL || '번째 게시글입니다.',
                   0, CURRENT_DATE, NULL, 'N', 2
                  );
        END LOOP;
END;

-- 게시글에 이미지 두개씩 넣는 샘플 데이터
BEGIN
    FOR I IN 1..100 LOOP
            INSERT INTO "BOARD_IMG"
            VALUES(
                   SEQ_IMG_NO.NEXTVAL,
                   '/images/board/',
                   'sample3.gif',
                   1,
                   I
                  );

            INSERT INTO "BOARD_IMG"
            VALUES(
                   SEQ_IMG_NO.NEXTVAL,
                   '/images/board/',
                   'sample4.gif',
                   2,
                   I
                  );
    END LOOP;
END;

-- 현재 시퀀스 번호 확인용
-- SELECT SEQ_IMG_NO.CURRVAL FROM DUAL;



BEGIN
    FOR I IN 1..100 LOOP
            INSERT INTO "STORY"
            VALUES(
                   SEQ_STORY_NO.NEXTVAL,
                   '/images/story/',
                   CURRENT_DATE,
                   'N',
                   0,
                   CEIL(DBMS_RANDOM.VALUE(1,6)),
                   'dev-jeans1.png'
                  );
        END LOOP;
END;

SELECT * FROM "COMMENT";
SELECT * FROM BOARD ORDER BY BOARD_NO DESC ;

-- 댓글 생성
BEGIN
    FOR I IN 1..100 LOOP
            INSERT INTO "COMMENT"
            VALUES(
                    SEQ_COMMENT_NO.NEXTVAL,
                    SEQ_COMMENT_NO.CURRVAL || '번째 댓글입니다',
                    CURRENT_DATE,
                    NULL,
                    DEFAULT,
                    CEIL(DBMS_RANDOM.VALUE(140,157)),
                    CEIL(DBMS_RANDOM.VALUE(1,6)),
                    NULL
                  );
        END LOOP;
END;

SELECT * FROM "COMMENT";

UPDATE "COMMENT"
SET PARENT_COMMENT_NO = NULL
WHERE PARENT_COMMENT_NO IS NOT NULL;

COMMIT;



-- 20% 확률로 부모 댓글을 지정
-- BEGIN
--     FOR I IN 1..100 LOOP
--         IF DBMS_RANDOM.VALUE(0, 1) <= 0.2 THEN
--             UPDATE "COMMENT"
--             SET PARENT_COMMENT_NO = CEIL(DBMS_RANDOM.VALUE(5, 107))
--             WHERE COMMENT_NO = I+4;
--         END IF;
--     END LOOP;
-- END;



SELECT
    S.STORY_NO, S.IMG_PATH, S.IMG_RENAME, S.CREATED_AT,
    M.MEMBER_NO, M.MEMBER_NICKNAME, M.PROFILE_IMG,
    S.READ_COUNT,
    (SELECT COUNT(*) FROM STORY_LIKE WHERE STORY_NO = S.STORY_NO) AS LIKE_COUNT,
    NVL2(
            (SELECT 'Y' FROM STORY_LIKE
             WHERE STORY_NO = S.STORY_NO
               AND MEMBER_NO = 4),
            'Y', 'N'
    ) AS STORY_LIKED
FROM STORY S
         JOIN MEMBER M ON S.MEMBER_NO = M.MEMBER_NO
WHERE S.STORY_NO = 198
          AND S.STORY_DEL_FL = 'N';


