CREATE TABLE "MEMBER"
(
    "MEMBER_NO"               NUMBER                       NOT NULL,
    "MEMBER_ID"               VARCHAR2(20)                 NOT NULL,
    "MEMBER_PW"               VARCHAR2(150)                NOT NULL,
    "MEMBER_EMAIL"            VARCHAR2(50)                 NOT NULL,
    "MEMBER_NICKNAME"         VARCHAR2(30)                 NOT NULL,
    "MEMBER_NAME"             VARCHAR2(10)                 NOT NULL,
    "PROFILE_IMG"             VARCHAR2(300)                NULL,
    "CREATED_AT"              DATE    DEFAULT CURRENT_DATE NOT NULL,
    "MEMBER_DEL_BAN_FL"       CHAR(1) DEFAULT 1            NOT NULL,
    "MEMBER_BIRTH"            DATE                         NULL,
    "SELF_INTRODUCTION"       VARCHAR2(1000)               NULL,
    "MEMBER_DISCLOSURE_SCOPE" NUMBER  DEFAULT 1            NOT NULL,
    "ADMIN"                   CHAR(1) DEFAULT 1            NOT NULL,
    "REPORT_COUNT"            NUMBER  DEFAULT 0            NOT NULL
);

COMMENT ON COLUMN "MEMBER"."MEMBER_NO" IS '회원번호(SEQ_MEMBER_NO)';

COMMENT ON COLUMN "MEMBER"."MEMBER_ID" IS '회원 아이디';

COMMENT ON COLUMN "MEMBER"."MEMBER_PW" IS '회원 비밀번호(암호화)';

COMMENT ON COLUMN "MEMBER"."MEMBER_EMAIL" IS '회원 이메일';

COMMENT ON COLUMN "MEMBER"."MEMBER_NICKNAME" IS '회원명(별명)';

COMMENT ON COLUMN "MEMBER"."MEMBER_NAME" IS '회원이름';

COMMENT ON COLUMN "MEMBER"."PROFILE_IMG" IS '프로필 이미지 경로';

COMMENT ON COLUMN "MEMBER"."CREATED_AT" IS '가입일';

COMMENT ON COLUMN "MEMBER"."MEMBER_DEL_BAN_FL" IS '탈퇴/정지 여부 ( 1: 정상, 2: 탈퇴, 3: 정지 )';

COMMENT ON COLUMN "MEMBER"."MEMBER_BIRTH" IS '생년월일';

COMMENT ON COLUMN "MEMBER"."SELF_INTRODUCTION" IS '자기소개';

COMMENT ON COLUMN "MEMBER"."MEMBER_DISCLOSURE_SCOPE" IS '공개(1:공개, 2: 비공개)';

COMMENT ON COLUMN "MEMBER"."ADMIN" IS '1 : 일반, 2: 관리자';

COMMENT ON COLUMN "MEMBER"."REPORT_COUNT" IS '경고 누적 횟수';

CREATE TABLE "BOARD"
(
    "BOARD_NO"      NUMBER                       NOT NULL,
    "BOARD_CONTENT" VARCHAR2(4000)               NULL,
    "READ_COUNT"    NUMBER  DEFAULT 0            NOT NULL,
    "CREATED_AT"    DATE    DEFAULT CURRENT_DATE NOT NULL,
    "MODIFIED_AT"   DATE                         NULL,
    "BOARD_DEL_FL"  CHAR(1) DEFAULT 'N'          NOT NULL,
    "MEMBER_NO"     NUMBER                       NOT NULL
);

COMMENT ON COLUMN "BOARD"."BOARD_NO" IS '피드 번호(SEQ_BOARD_NO)';

COMMENT ON COLUMN "BOARD"."BOARD_CONTENT" IS '피드 내용';

COMMENT ON COLUMN "BOARD"."READ_COUNT" IS '조회수';

COMMENT ON COLUMN "BOARD"."CREATED_AT" IS '피드 작성일';

COMMENT ON COLUMN "BOARD"."MODIFIED_AT" IS '마지막 수정일';

COMMENT ON COLUMN "BOARD"."BOARD_DEL_FL" IS '삭제 여부(N,Y)';

COMMENT ON COLUMN "BOARD"."MEMBER_NO" IS '작성자 회원 번호';

CREATE TABLE "BOARD_IMG"
(
    "IMG_NO"     NUMBER        NOT NULL,
    "IMG_PATH"   VARCHAR2(200) NOT NULL,
    "IMG_RENAME" NVARCHAR2(50) NOT NULL,
    "IMG_ORDER"  NUMBER        NULL,
    "BOARD_NO"   NUMBER        NOT NULL
);

COMMENT ON COLUMN "BOARD_IMG"."IMG_NO" IS '이미지 번호(SEQ_IMG_NO)';

COMMENT ON COLUMN "BOARD_IMG"."IMG_PATH" IS '이미지 요청 경로';

COMMENT ON COLUMN "BOARD_IMG"."IMG_RENAME" IS '이미지 변경명';

COMMENT ON COLUMN "BOARD_IMG"."IMG_ORDER" IS '이미지 순서';

COMMENT ON COLUMN "BOARD_IMG"."BOARD_NO" IS '이미지가 첨부된 게시글 번호';

CREATE TABLE "COMMENT"
(
    "COMMENT_NO"        NUMBER                       NOT NULL,
    "COMMENT_CONTENT"   VARCHAR2(4000)               NOT NULL,
    "CREATED_AT"        DATE    DEFAULT CURRENT_DATE NOT NULL,
    "MODIFIED_AT"       DATE                         NULL,
    "COMMENT_DEL_FL"    CHAR(1) DEFAULT 'N'          NOT NULL,
    "BOARD_NO"          NUMBER                       NOT NULL,
    "MEMBER_NO"         NUMBER                       NOT NULL,
    "PARENT_COMMENT_NO" NUMBER                       NOT NULL
);

COMMENT ON COLUMN "COMMENT"."COMMENT_NO" IS '댓글 번호(SEQ_COMMENT_NO)';

COMMENT ON COLUMN "COMMENT"."COMMENT_CONTENT" IS '댓글 내용';

COMMENT ON COLUMN "COMMENT"."CREATED_AT" IS '댓글 작성일';

COMMENT ON COLUMN "COMMENT"."MODIFIED_AT" IS '댓글 마지막 수정 날짜';

COMMENT ON COLUMN "COMMENT"."COMMENT_DEL_FL" IS '댓글 삭제 여부(N,Y)';

COMMENT ON COLUMN "COMMENT"."BOARD_NO" IS '게시글 번호(SEQ_BOARD_NO)';

COMMENT ON COLUMN "COMMENT"."MEMBER_NO" IS '회원번호';

COMMENT ON COLUMN "COMMENT"."PARENT_COMMENT_NO" IS '부모 댓글 번호';

CREATE TABLE "NOTIFICATION"
(
    "NOTIFICATION_NO"      NUMBER                       NOT NULL,
    "NOTIFICATION_CONTENT" VARCHAR2(1000)               NOT NULL,
    "NOTIFICATION_CHECK"   CHAR(1) DEFAULT 'N'          NOT NULL,
    "CREATED_AT"           DATE    DEFAULT CURRENT_DATE NOT NULL,
    "NOTIFICATION_URL"     VARCHAR2(1000)               NOT NULL,
    "SEND_MEMBER_NO"       NUMBER                       NOT NULL,
    "RECEIVE_MEMBER_NO"    NUMBER                       NOT NULL
);

COMMENT ON COLUMN "NOTIFICATION"."NOTIFICATION_NO" IS '알림 번호(SEQ_NOTIFICATION_NO)';

COMMENT ON COLUMN "NOTIFICATION"."NOTIFICATION_CONTENT" IS '알림내용';

COMMENT ON COLUMN "NOTIFICATION"."NOTIFICATION_CHECK" IS '읽음 여부(Y,N)';

COMMENT ON COLUMN "NOTIFICATION"."CREATED_AT" IS '알림 생성 시간';

COMMENT ON COLUMN "NOTIFICATION"."NOTIFICATION_URL" IS '연결페이지 주소';

COMMENT ON COLUMN "NOTIFICATION"."SEND_MEMBER_NO" IS '알림보낸회원번호';

COMMENT ON COLUMN "NOTIFICATION"."RECEIVE_MEMBER_NO" IS '알림받는회원번호';

CREATE TABLE "BOARD_LIKE"
(
    "MEMBER_NO" NUMBER NOT NULL,
    "BOARD_NO"  NUMBER NOT NULL
);

COMMENT ON COLUMN "BOARD_LIKE"."MEMBER_NO" IS '회원번호(SEQ_MEMBER_NO)';

COMMENT ON COLUMN "BOARD_LIKE"."BOARD_NO" IS '피드 번호(SEQ_BOARD_NO)';

CREATE TABLE "CHATROOM"
(
    "CHATROOM_NO" NUMBER                    NOT NULL,
    "CREATED_AT"  DATE DEFAULT CURRENT_DATE NOT NULL,
    "OPEN_MEMBER" NUMBER                    NOT NULL,
    "PARTICIPANT" NUMBER                    NOT NULL
);

COMMENT ON COLUMN "CHATROOM"."CHATROOM_NO" IS '채팅방 번호(SEQ_CHATROOM_NO';

COMMENT ON COLUMN "CHATROOM"."CREATED_AT" IS '채팅방 생성일';

COMMENT ON COLUMN "CHATROOM"."OPEN_MEMBER" IS '개설자 회원 번호';

COMMENT ON COLUMN "CHATROOM"."PARTICIPANT" IS '참여자 회원 번호';

CREATE TABLE "MESSAGE"
(
    "MESSAGE_NO"      NUMBER                       NOT NULL,
    "MESSAGE_CONTENT" VARCHAR2(4000)               NOT NULL,
    "READ_FL"         CHAR(1) DEFAULT 'N'          NOT NULL,
    "SEND_TIME"       DATE    DEFAULT CURRENT_DATE NOT NULL,
    "MEMBER_NO"       NUMBER                       NOT NULL,
    "CHATROOM_NO"     NUMBER                       NOT NULL
);

COMMENT ON COLUMN "MESSAGE"."MESSAGE_NO" IS '메시지 번호(SEQ_MESSAGE_NO)';

COMMENT ON COLUMN "MESSAGE"."MESSAGE_CONTENT" IS '메시지 내용';

COMMENT ON COLUMN "MESSAGE"."READ_FL" IS '읽음 여부(Y,N)';

COMMENT ON COLUMN "MESSAGE"."SEND_TIME" IS '메시지 보낸 시간';

COMMENT ON COLUMN "MESSAGE"."MEMBER_NO" IS '회원번호';

COMMENT ON COLUMN "MESSAGE"."CHATROOM_NO" IS '채팅방 번호(SEQ_CHATROOM_NO';

CREATE TABLE "REPORT"
(
    "REPORT_NO"       NUMBER                       NOT NULL,
    "MEMBER_NO"       NUMBER                       NOT NULL,
    "CREATED_AT"      DATE    DEFAULT CURRENT_DATE NOT NULL,
    "REPORT_CATEGORY" NVARCHAR2(300)               NOT NULL,
    "REPORT_VIEW"     CHAR(1) DEFAULT 'N'          NOT NULL,
    "Field"           VARCHAR(255)                 NULL,
    "Field2"          VARCHAR(255)                 NULL
);

COMMENT ON COLUMN "REPORT"."REPORT_NO" IS '신고 번호(SEQ_REPORT_NO)';

COMMENT ON COLUMN "REPORT"."MEMBER_NO" IS '회원번호';

COMMENT ON COLUMN "REPORT"."CREATED_AT" IS '신고 날짜';

COMMENT ON COLUMN "REPORT"."REPORT_CATEGORY" IS '신고 사유 카테고리';

COMMENT ON COLUMN "REPORT"."REPORT_VIEW" IS '신고 처리 여부(N,Y)';

COMMENT ON COLUMN "REPORT"."Field" IS '피드 / 댓글 번호';

COMMENT ON COLUMN "REPORT"."Field2" IS '1: 피드, 2: 댓글';

CREATE TABLE "COMMENT_LIKE"
(
    "MEMBER_NO"  NUMBER NOT NULL,
    "COMMENT_NO" NUMBER NOT NULL
);

COMMENT ON COLUMN "COMMENT_LIKE"."MEMBER_NO" IS '회원번호(SEQ_MEMBER_NO)';

COMMENT ON COLUMN "COMMENT_LIKE"."COMMENT_NO" IS '댓글 번호(SEQ_COMMENT_NO)';

CREATE TABLE "BAN"
(
    "MEMBER_NO"  NUMBER                    NOT NULL,
    "CREATED_AT" DATE DEFAULT CURRENT_DATE NOT NULL,
    "BAN_TERM"   NUMBER                    NOT NULL,
    "BAN_REASON" NVARCHAR2(300)            NOT NULL
);

COMMENT ON COLUMN "BAN"."MEMBER_NO" IS '정지당한 회원 번호';

COMMENT ON COLUMN "BAN"."CREATED_AT" IS '정지 날짜';

COMMENT ON COLUMN "BAN"."BAN_TERM" IS '정지 기간';

COMMENT ON COLUMN "BAN"."BAN_REASON" IS '정지 사유';

CREATE TABLE "BLOCK"
(
    "BLOCK_MEMBER"   NUMBER       NOT NULL,
    "BLOCKED_MEMBER" NUMBER       NOT NULL,
    "CREATED_AT"     VARCHAR(255) NULL
);

COMMENT ON COLUMN "BLOCK"."BLOCK_MEMBER" IS '차단을 한 회원';

COMMENT ON COLUMN "BLOCK"."BLOCKED_MEMBER" IS '차단을 당한 회원';

CREATE TABLE "FOLLOW"
(
    "FOLLOWING_MEMBER" NUMBER                    NOT NULL,
    "FOLLOWER_MEMBER"  NUMBER                    NOT NULL,
    "CREATED_AT"       DATE DEFAULT CURRENT_DATE NOT NULL,
    "CONFIRM"          CHAR(1)                   NOT NULL
);

COMMENT ON COLUMN "FOLLOW"."FOLLOWING_MEMBER" IS '팔로우 하는 회원';

COMMENT ON COLUMN "FOLLOW"."FOLLOWER_MEMBER" IS '팔로잉 회원';

COMMENT ON COLUMN "FOLLOW"."CREATED_AT" IS '팔로우한 날짜';

COMMENT ON COLUMN "FOLLOW"."CONFIRM" IS 'Y / N';

CREATE TABLE "STORY"
(
    "STORY_NO"     NUMBER                       NOT NULL,
    "IMG_PATH"     VARCHAR2(200)                NULL,
    "CREATED_AT"   DATE    DEFAULT CURRENT_DATE NOT NULL,
    "MODIFIED_AT"  DATE                         NULL,
    "STORY_DEL_FL" CHAR(1) DEFAULT 'N'          NOT NULL,
    "READ_COUNT"   NUMBER                       NOT NULL,
    "MEMBER_NO"    NUMBER                       NOT NULL
);

COMMENT ON COLUMN "STORY"."STORY_NO" IS '스토리 번호(SEQ_STORY_NO)';

COMMENT ON COLUMN "STORY"."IMG_PATH" IS '이미지 요청 경로';

COMMENT ON COLUMN "STORY"."CREATED_AT" IS '스토리 생성날짜';

COMMENT ON COLUMN "STORY"."MODIFIED_AT" IS '스토리 수정날짜';

COMMENT ON COLUMN "STORY"."STORY_DEL_FL" IS '스토리 삭제 여부(Y,N)';

COMMENT ON COLUMN "STORY"."READ_COUNT" IS '스토리 조회수';

COMMENT ON COLUMN "STORY"."MEMBER_NO" IS '회원번호(SEQ_MEMBER_NO)';

CREATE TABLE "MARKER"
(
    "MEMBER_NO" NUMBER NOT NULL,
    "BOARD_NO"  NUMBER NOT NULL
);

COMMENT ON COLUMN "MARKER"."MEMBER_NO" IS '회원번호(SEQ_MEMBER_NO)';

COMMENT ON COLUMN "MARKER"."BOARD_NO" IS '피드 번호(SEQ_BOARD_NO)';

CREATE TABLE "STORY_LIKE"
(
    "MEMBER_NO" NUMBER NOT NULL,
    "STORY_NO"  NUMBER NOT NULL
);

COMMENT ON COLUMN "STORY_LIKE"."MEMBER_NO" IS '회원번호(SEQ_MEMBER_NO)';

COMMENT ON COLUMN "STORY_LIKE"."STORY_NO" IS '스토리 번호(SEQ_STORY_NO)';

ALTER TABLE "MEMBER"
    ADD CONSTRAINT "PK_MEMBER" PRIMARY KEY (
                                            "MEMBER_NO"
        );

ALTER TABLE "BOARD"
    ADD CONSTRAINT "PK_BOARD" PRIMARY KEY (
                                           "BOARD_NO"
        );

ALTER TABLE "BOARD_IMG"
    ADD CONSTRAINT "PK_BOARD_IMG" PRIMARY KEY (
                                               "IMG_NO"
        );

ALTER TABLE "COMMENT"
    ADD CONSTRAINT "PK_COMMENT" PRIMARY KEY (
                                             "COMMENT_NO"
        );

ALTER TABLE "NOTIFICATION"
    ADD CONSTRAINT "PK_NOTIFICATION" PRIMARY KEY (
                                                  "NOTIFICATION_NO"
        );

ALTER TABLE "BOARD_LIKE"
    ADD CONSTRAINT "PK_BOARD_LIKE" PRIMARY KEY (
                                                "MEMBER_NO",
                                                "BOARD_NO"
        );

ALTER TABLE "CHATROOM"
    ADD CONSTRAINT "PK_CHATROOM" PRIMARY KEY (
                                              "CHATROOM_NO"
        );

ALTER TABLE "MESSAGE"
    ADD CONSTRAINT "PK_MESSAGE" PRIMARY KEY (
                                             "MESSAGE_NO"
        );

ALTER TABLE "REPORT"
    ADD CONSTRAINT "PK_REPORT" PRIMARY KEY (
                                            "REPORT_NO"
        );

ALTER TABLE "COMMENT_LIKE"
    ADD CONSTRAINT "PK_COMMENT_LIKE" PRIMARY KEY (
                                                  "MEMBER_NO",
                                                  "COMMENT_NO"
        );

ALTER TABLE "BAN"
    ADD CONSTRAINT "PK_BAN" PRIMARY KEY (
                                         "MEMBER_NO"
        );

ALTER TABLE "STORY"
    ADD CONSTRAINT "PK_STORY" PRIMARY KEY (
                                           "STORY_NO"
        );

ALTER TABLE "MARKER"
    ADD CONSTRAINT "PK_MARKER" PRIMARY KEY (
                                            "MEMBER_NO",
                                            "BOARD_NO"
        );

ALTER TABLE "STORY_LIKE"
    ADD CONSTRAINT "PK_STORY_LIKE" PRIMARY KEY (
                                                "MEMBER_NO",
                                                "STORY_NO"
        );

ALTER TABLE "BOARD"
    ADD CONSTRAINT "FK_MEMBER_TO_BOARD_1" FOREIGN KEY (
                                                       "MEMBER_NO"
        )
        REFERENCES "MEMBER" (
                             "MEMBER_NO"
            );

ALTER TABLE "BOARD_IMG"
    ADD CONSTRAINT "FK_BOARD_TO_BOARD_IMG_1" FOREIGN KEY (
                                                          "BOARD_NO"
        )
        REFERENCES "BOARD" (
                            "BOARD_NO"
            );

ALTER TABLE "COMMENT"
    ADD CONSTRAINT "FK_BOARD_TO_COMMENT_1" FOREIGN KEY (
                                                        "BOARD_NO"
        )
        REFERENCES "BOARD" (
                            "BOARD_NO"
            );

ALTER TABLE "COMMENT"
    ADD CONSTRAINT "FK_MEMBER_TO_COMMENT_1" FOREIGN KEY (
                                                         "MEMBER_NO"
        )
        REFERENCES "MEMBER" (
                             "MEMBER_NO"
            );

ALTER TABLE "COMMENT"
    ADD CONSTRAINT "FK_COMMENT_TO_COMMENT_1" FOREIGN KEY (
                                                          "PARENT_COMMENT_NO"
        )
        REFERENCES "COMMENT" (
                              "COMMENT_NO"
            );

ALTER TABLE "NOTIFICATION"
    ADD CONSTRAINT "FK_MEMBER_TO_NOTIFICATION_1" FOREIGN KEY (
                                                              "SEND_MEMBER_NO"
        )
        REFERENCES "MEMBER" (
                             "MEMBER_NO"
            );

ALTER TABLE "NOTIFICATION"
    ADD CONSTRAINT "FK_MEMBER_TO_NOTIFICATION_2" FOREIGN KEY (
                                                              "RECEIVE_MEMBER_NO"
        )
        REFERENCES "MEMBER" (
                             "MEMBER_NO"
            );

ALTER TABLE "BOARD_LIKE"
    ADD CONSTRAINT "FK_MEMBER_TO_BOARD_LIKE_1" FOREIGN KEY (
                                                            "MEMBER_NO"
        )
        REFERENCES "MEMBER" (
                             "MEMBER_NO"
            );

ALTER TABLE "BOARD_LIKE"
    ADD CONSTRAINT "FK_BOARD_TO_BOARD_LIKE_1" FOREIGN KEY (
                                                           "BOARD_NO"
        )
        REFERENCES "BOARD" (
                            "BOARD_NO"
            );

ALTER TABLE "CHATROOM"
    ADD CONSTRAINT "FK_MEMBER_TO_CHATROOM_1" FOREIGN KEY (
                                                          "OPEN_MEMBER"
        )
        REFERENCES "MEMBER" (
                             "MEMBER_NO"
            );

ALTER TABLE "CHATROOM"
    ADD CONSTRAINT "FK_MEMBER_TO_CHATROOM_2" FOREIGN KEY (
                                                          "PARTICIPANT"
        )
        REFERENCES "MEMBER" (
                             "MEMBER_NO"
            );

ALTER TABLE "MESSAGE"
    ADD CONSTRAINT "FK_MEMBER_TO_MESSAGE_1" FOREIGN KEY (
                                                         "MEMBER_NO"
        )
        REFERENCES "MEMBER" (
                             "MEMBER_NO"
            );

ALTER TABLE "MESSAGE"
    ADD CONSTRAINT "FK_CHATROOM_TO_MESSAGE_1" FOREIGN KEY (
                                                           "CHATROOM_NO"
        )
        REFERENCES "CHATROOM" (
                               "CHATROOM_NO"
            );

ALTER TABLE "REPORT"
    ADD CONSTRAINT "FK_MEMBER_TO_REPORT_1" FOREIGN KEY (
                                                        "MEMBER_NO"
        )
        REFERENCES "MEMBER" (
                             "MEMBER_NO"
            );

ALTER TABLE "COMMENT_LIKE"
    ADD CONSTRAINT "FK_MEMBER_TO_COMMENT_LIKE_1" FOREIGN KEY (
                                                              "MEMBER_NO"
        )
        REFERENCES "MEMBER" (
                             "MEMBER_NO"
            );

ALTER TABLE "COMMENT_LIKE"
    ADD CONSTRAINT "FK_COMMENT_TO_COMMENT_LIKE_1" FOREIGN KEY (
                                                               "COMMENT_NO"
        )
        REFERENCES "COMMENT" (
                              "COMMENT_NO"
            );

ALTER TABLE "BAN"
    ADD CONSTRAINT "FK_MEMBER_TO_BAN_1" FOREIGN KEY (
                                                     "MEMBER_NO"
        )
        REFERENCES "MEMBER" (
                             "MEMBER_NO"
            );

ALTER TABLE "BLOCK"
    ADD CONSTRAINT "FK_MEMBER_TO_BLOCK_1" FOREIGN KEY (
                                                       "BLOCK_MEMBER"
        )
        REFERENCES "MEMBER" (
                             "MEMBER_NO"
            );

ALTER TABLE "BLOCK"
    ADD CONSTRAINT "FK_MEMBER_TO_BLOCK_2" FOREIGN KEY (
                                                       "BLOCKED_MEMBER"
        )
        REFERENCES "MEMBER" (
                             "MEMBER_NO"
            );

ALTER TABLE "FOLLOW"
    ADD CONSTRAINT "FK_MEMBER_TO_FOLLOW_1" FOREIGN KEY (
                                                        "FOLLOWING_MEMBER"
        )
        REFERENCES "MEMBER" (
                             "MEMBER_NO"
            );

ALTER TABLE "FOLLOW"
    ADD CONSTRAINT "FK_MEMBER_TO_FOLLOW_2" FOREIGN KEY (
                                                        "FOLLOWER_MEMBER"
        )
        REFERENCES "MEMBER" (
                             "MEMBER_NO"
            );

ALTER TABLE "STORY"
    ADD CONSTRAINT "FK_MEMBER_TO_STORY_1" FOREIGN KEY (
                                                       "MEMBER_NO"
        )
        REFERENCES "MEMBER" (
                             "MEMBER_NO"
            );

ALTER TABLE "MARKER"
    ADD CONSTRAINT "FK_MEMBER_TO_MARKER_1" FOREIGN KEY (
                                                        "MEMBER_NO"
        )
        REFERENCES "MEMBER" (
                             "MEMBER_NO"
            );

ALTER TABLE "MARKER"
    ADD CONSTRAINT "FK_BOARD_TO_MARKER_1" FOREIGN KEY (
                                                       "BOARD_NO"
        )
        REFERENCES "BOARD" (
                            "BOARD_NO"
            );

ALTER TABLE "STORY_LIKE"
    ADD CONSTRAINT "FK_MEMBER_TO_STORY_LIKE_1" FOREIGN KEY (
                                                            "MEMBER_NO"
        )
        REFERENCES "MEMBER" (
                             "MEMBER_NO"
            );

ALTER TABLE "STORY_LIKE"
    ADD CONSTRAINT "FK_STORY_TO_STORY_LIKE_1" FOREIGN KEY (
                                                           "STORY_NO"
        )
        REFERENCES "STORY" (
                            "STORY_NO"
            );


-- 해시태그 테이블 추가
--==================================================
CREATE TABLE "HASHTAG"
(
    "TAG_NAME" VARCHAR2(60) NOT NULL,
    "BOARD_NO" NUMBER       NOT NULL
);

COMMENT ON COLUMN "HASHTAG"."TAG_NAME" IS '태그명';

COMMENT ON COLUMN "HASHTAG"."BOARD_NO" IS '피드 번호(SEQ_BOARD_NO)';

ALTER TABLE "HASHTAG"
    ADD CONSTRAINT "PK_HASHTAG" PRIMARY KEY (
                                             "TAG_NAME",
                                             "BOARD_NO"
        );

ALTER TABLE "HASHTAG"
    ADD CONSTRAINT "FK_BOARD_TO_HASHTAG_1" FOREIGN KEY (
                                                        "BOARD_NO"
        )
        REFERENCES "BOARD" (
                            "BOARD_NO"
            );


-- 시퀀스 목록
--====================================================================================================

-- 회원 시퀀스
CREATE SEQUENCE SEQ_MEMBER_NO NOCACHE;

-- 피드 시퀀스
CREATE SEQUENCE SEQ_BOARD_NO NOCACHE;

-- 피드 이미지 시퀀스
CREATE SEQUENCE SEQ_IMG_NO NOCACHE;

--  스토리 시퀀스
CREATE SEQUENCE SEQ_STORY_NO NOCACHE;

-- 댓글 시퀀스
CREATE SEQUENCE SEQ_COMMENT_NO NOCACHE;

-- 채팅방 시퀀스
CREATE SEQUENCE SEQ_CHATROOM_NO NOCACHE;

-- 메시지 시퀀스
CREATE SEQUENCE SEQ_MESSAGE_NO NOCACHE;

-- 알림 시퀀스
CREATE SEQUENCE SEQ_NOTIFICATION_NO NOCACHE;

-- 신고 시퀀스
CREATE SEQUENCE SEQ_REPORT_NO NOCACHE;