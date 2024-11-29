package edu.kh.cgram.block.service;

import org.apache.ibatis.annotations.Param;

public interface BlockService {

	int getMemberNoByNickname(@Param("nickname") String nickname);

	boolean BlockMember(int loggedInMemberNo, int profileMemberNo);

}
