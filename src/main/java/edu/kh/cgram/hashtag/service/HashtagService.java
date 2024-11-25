package edu.kh.cgram.hashtag.service;

import java.util.List;

import edu.kh.cgram.hashtag.dto.HashTag;

public interface HashtagService {

	List<HashTag> searchHashtags(String query);

}
