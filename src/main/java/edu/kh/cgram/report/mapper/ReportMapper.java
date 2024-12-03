package edu.kh.cgram.report.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReportMapper {
	
    // 신고 생성
    int insertReport(edu.kh.cgram.common.dto.Report report);
}
