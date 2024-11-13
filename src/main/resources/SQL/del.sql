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
