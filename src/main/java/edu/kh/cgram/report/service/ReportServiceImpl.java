package edu.kh.cgram.report.service;

import org.springframework.stereotype.Service;

import edu.kh.cgram.common.dto.Report;
import edu.kh.cgram.report.mapper.ReportMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
	
	private final ReportMapper mapper;
	
	@Override
	public boolean createReport(Report report) {
		
		int result = mapper.insertReport(report);
		
		return result >0;
	}
	
	

}
