package edu.kh.cgram.myPage.servive;

import org.springframework.stereotype.Service;

import edu.kh.cgram.myPage.mapper.MyPageMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService {

	private final MyPageMapper mapper;
}
