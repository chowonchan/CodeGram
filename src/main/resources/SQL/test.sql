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

SELECT  * FROM MEMBER;
SELECT  * FROM BOARD;