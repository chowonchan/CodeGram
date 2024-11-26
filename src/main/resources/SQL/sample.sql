/* PL/SQL을 이용해서 BOARD 테이블에 샘플 데이터 삽입 */
BEGIN
    FOR I IN 1..10 LOOP
            INSERT INTO "MEMBER"
            VALUES(
                   SEQ_MEMBER_NO.NEXTVAL,
                   'pass' || SEQ_MEMBER_NO.CURRVAL,
                   '$2a$10$RY0ttpgkDhNnm/ZExrVZqe4HfzjSoJizjbJBGybCJGdmSOWER4a7m',
                   'test' || SEQ_MEMBER_NO.CURRVAL || '@cgram.com',
                   'nick' || SEQ_MEMBER_NO.CURRVAL,
                   'name' || SEQ_MEMBER_NO.CURRVAL,
                   NULL, DEFAULT, DEFAULT, NULL, NULL, DEFAULT, DEFAULT, DEFAULT
                  );
        END LOOP;
END;

SELECT  * FROM MEMBER ORDER BY MEMBER_NO;
SELECT  * FROM BOARD ORDER BY BOARD_NO DESC;
SELECT  * FROM BOARD_IMG ORDER BY BOARD_NO DESC;
SELECT  * FROM BOARD_IMG ORDER BY IMG_NO DESC;
SELECT  * FROM HASHTAG ORDER BY TAG_NAME DESC;

UPDATE BOARD_IMG
SET IMG_PATH = '/images/board/'
WHERE IMG_NO > 0;

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