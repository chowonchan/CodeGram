package edu.kh.cgram.follow.service;

public interface FollowService {

    Integer getMemberNoByNickname(String nickname);
    boolean followMember(int loggedInMemberNo, int profileMemberNo);
		boolean unfollowMember(int loggedInMemberNo, int profileMemberNo);
		boolean checkFollowStatus(int loggedInMemberNo, int profileMemberNo);






}
