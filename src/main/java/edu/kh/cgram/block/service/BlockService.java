package edu.kh.cgram.block.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface BlockService {

	int getMemberNoByNickname(@Param("nickname") String nickname);

	boolean BlockMember(int loggedInMemberNo, int profileMemberNo);

	List<Map<String, Object>> getBlockedList(int loggedInMemberNo);

	boolean unblockMember(int loggedInMemberNo, int blockedMemberNo);
	


}
