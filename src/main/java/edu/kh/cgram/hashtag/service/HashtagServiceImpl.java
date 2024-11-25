package edu.kh.cgram.hashtag.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.cgram.hashtag.dto.HashTag;
import edu.kh.cgram.hashtag.mapper.HashtagMapper;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class HashtagServiceImpl implements HashtagService {
	
	private final HashtagMapper mapper;
	
	@Override
		public List<HashTag> searchHashtags(String query) {
			return mapper.searchHashtags(query);
		}
}
