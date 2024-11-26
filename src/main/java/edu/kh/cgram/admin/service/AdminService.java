package edu.kh.cgram.admin.service;

import java.util.Map;

import edu.kh.cgram.common.dto.Pagination;

public interface AdminService {

	int getMemberCount();
	
	Map<String, Object> selectMemberList(Pagination pagination);

	int updateMemberStatus(String memberNickname);

}
