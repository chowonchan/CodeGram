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


DECLARE
    v_sql VARCHAR2(4000);
BEGIN
    -- 외래 키를 가진 모든 테이블에 대해 NULL로 업데이트
    FOR fk IN (
        SELECT table_name, column_name
        FROM user_cons_columns
        WHERE constraint_name IN (
            SELECT constraint_name
            FROM user_constraints
            WHERE constraint_type = 'R'
        )
        ) LOOP
            v_sql := 'UPDATE ' || fk.table_name || ' SET ' || fk.column_name || ' = NULL';
            EXECUTE IMMEDIATE v_sql;
        END LOOP;

    -- 모든 테이블 데이터 삭제
    FOR tbl IN (SELECT table_name FROM user_tables) LOOP
            EXECUTE IMMEDIATE 'DELETE FROM ' || tbl.table_name;
        END LOOP;
END;


UPDATE STORY
SET STORY_DEL_FL = 'Y'
WHERE STORY_NO > 0;

SELECT * FROM STORY WHERE STORY_DEL_FL = 'N';

SELECT * FROM BOARD WHERE BOARD_DEL_FL = 'N';

UPDATE BOARD
SET BOARD_DEL_FL = 'Y'
WHERE BOARD_NO > 0;

UPDATE "COMMENT"
SET COMMENT_DEL_FL = 'Y'
WHERE BOARD_NO > 0;

SELECT * FROM "COMMENT" WHERE COMMENT_DEL_FL = 'N';

DELETE FROM COMMENT_LIKE WHERE MEMBER_NO IS NOT NULL;
SELECT * FROM COMMENT_LIKE;

DELETE FROM BOARD_LIKE WHERE MEMBER_NO IS NOT NULL;
SELECT * FROM BOARD_LIKE;



SELECT * FROM NOTIFICATION;

DELETE
FROM NOTIFICATION
WHERE NOTIFICATION_CHECK = 'Y';


COMMIT;