package edu.kh.cgram.myactivity.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.cgram.myactivity.mapper.MyActivityMapper;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MyActivityServiceImpl implements MyActivityService {
	
	private final MyActivityMapper mapper;

}
