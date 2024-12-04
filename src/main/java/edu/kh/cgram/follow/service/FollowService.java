package edu.kh.cgram.follow.service;

import java.util.List;
import java.util.Map;

public interface FollowService {

    Integer getMemberNoByNickname(String nickname);
    boolean followMember(int loggedInMemberNo, int profileMemberNo);
		boolean unfollowMember(int loggedInMemberNo, int profileMemberNo);
		boolean checkFollowStatus(int loggedInMemberNo, int profileMemberNo);
    List<Map<String, Object>> getFollowingList(int memberNo);
    List<Map<String, Object>> getFollowerList(int memberNo);






}
