package edu.kh.cgram.report.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.cgram.report.mapper.ReportMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
	
	private final ReportMapper mapper;

	@Override
	@Transactional
	public boolean reportContent(String reson, int memberNo) {
		
		int result = mapper.insertReport(reson, memberNo);
		
		return result > 0;
	}
	
	
	
	

}
