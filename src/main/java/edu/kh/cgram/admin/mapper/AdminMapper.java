package edu.kh.cgram.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import edu.kh.cgram.common.dto.Pagination;
import edu.kh.cgram.member.dto.Member;

@Mapper
public interface AdminMapper {

	int getMemberCount();

	List<Member> selectMemberList(Pagination pagination);

	int updateMemberStatus(@Param("memberNickname") String memberNickname);

}
