package edu.kh.cgram.block.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.cgram.block.mapper.BlockMapper;


@Service
public class BlockServiceImpl implements BlockService {
	
	@Autowired 
	private BlockMapper mapper;
	
	@Override
	public int getMemberNoByNickname(String nickname) {
		return mapper.getMemberNoByNickname(nickname);
	}
	
	@Override
	public boolean BlockMember(int loggedInMemberNo, int profileMemberNo) {
    int result = mapper.insertBlock(loggedInMemberNo, profileMemberNo);
		return result > 0;
	}

}
