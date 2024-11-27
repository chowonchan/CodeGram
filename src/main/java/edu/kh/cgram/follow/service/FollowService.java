package edu.kh.cgram.follow.service;

public interface FollowService {

    Integer getMemberNoByNickname(String nickname);
    boolean followMember(int loggedInMemberNo, int profileMemberNo);
//		boolean unfollowMember(int memberNo, Integer profileMemberNo);






}
