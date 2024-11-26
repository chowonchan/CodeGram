package edu.kh.cgram.admin.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.cgram.admin.mapper.AdminMapper;
import edu.kh.cgram.common.dto.Pagination;
import edu.kh.cgram.member.dto.Member;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
	
	private final AdminMapper mapper;

  @Override
  public int getMemberCount() {
  	return mapper.getMemberCount();
  }

  @Override
  public Map<String, Object> selectMemberList(Pagination pagination) {
    List<Member> memberList = mapper.selectMemberList(pagination);
    Map<String, Object> resultMap = new HashMap<>();
    resultMap.put("memberList", memberList);
    return resultMap;
  }
   
  @Override
  public int updateMemberStatus(String memberNickname) {
  	return mapper.updateMemberStatus(memberNickname);
  }

}
