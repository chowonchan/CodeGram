package edu.kh.cgram.follow.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.cgram.follow.mapper.FollowMapper;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FollowServiceImpl implements FollowService{
	
	@Autowired
  private FollowMapper mapper;

  @Override
  public Integer getMemberNoByNickname(String nickname) {
      return mapper.getMemberNoByNickname(nickname);
  }

  @Override
  public boolean followMember(int loggedInMemberNo, int profileMemberNo) {
      log.debug("팔로우 요청: loggedInMemberNo={}, profileMemberNo={}", loggedInMemberNo, profileMemberNo);
      int result = mapper.insertFollow(loggedInMemberNo, profileMemberNo);
      log.debug("INSERT 결과: {}", result);
      return result > 0; // 1 이상의 값이면 true, 그렇지 않으면 false
  }
  
  @Override
  public boolean unfollowMember(int loggedInMemberNo, int profileMemberNo) {
    int result = mapper.deleteFollow(loggedInMemberNo, profileMemberNo);
    return result > 0;
  }

@Override
public boolean checkFollowStatus(int loggedInMemberNo, int profileMemberNo) {
	int result = mapper.checkFollowStatus(loggedInMemberNo, profileMemberNo);
	return result > 0;
}

@Override
public List<Map<String, Object>> getFollowingList(int memberNo) {
    return mapper.getFollowingList(memberNo);
}

@Override
public List<Map<String, Object>> getFollowerList(int memberNo) {
    return mapper.getFollowerList(memberNo);
}

}
