package edu.kh.cgram.report.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


@Mapper
public interface ReportMapper {

	int insertReport(@Param("reson") String reson,
									 @Param("memberNo") int memberNo);
	
}
