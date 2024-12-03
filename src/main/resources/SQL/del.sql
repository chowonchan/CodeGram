-- 비상용 코드이므로 사용 전 반드시 팀원과 상의 후 사용할것!!!!!
-- 되돌리기 불가능하므로 반드시 확인 후 사용할것!!!!!

-- BEGIN
--     -- 모든 테이블 삭제
--     FOR r IN (SELECT table_name FROM user_tables WHERE table_name NOT LIKE 'BIN$%')
--         LOOP
--             EXECUTE IMMEDIATE 'DROP TABLE "' || r.table_name || '" CASCADE CONSTRAINTS';
--         END LOOP;
--
--     -- 모든 시퀀스 삭제
--     FOR r IN (SELECT sequence_name FROM user_sequences)
--         LOOP
--             EXECUTE IMMEDIATE 'DROP SEQUENCE "' || r.sequence_name || '"';
--         END LOOP;
-- END;


DELETE
FROM REPORT
WHERE REPORT_NO != 0;

SELECT * FROM REPORT;

SELECT SEQ_REPORT_NO.NEXTVAL FROM DUAL;

DROP SEQUENCE SEQ_REPORT_NO;

COMMIT;
CREATE SEQUENCE SEQ_REPORT_NO
    START WITH 1
    INCREMENT BY 1;

DELETE FROM "COMMENT" WHERE COMMENT_NO > 0;
COMMIT;


SELECT * FROM "COMMENT";


DROP SEQUENCE SEQ_COMMENT_NO;

SELECT * FROM COMMENT_LIKE;

DELETE
FROM COMMENT_LIKE
WHERE COMMENT_NO != 0;

COMMIT;



COMMIT;
CREATE SEQUENCE SEQ_COMMENT_NO
    START WITH 1
    INCREMENT BY 1;

SELECT * FROM "COMMENT";

