package edu.kh.cgram.block.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.cgram.block.mapper.BlockMapper;


@Service
public class BlockServiceImpl implements BlockService {
	
	@Autowired 
	private BlockMapper mapper;

}
