package edu.kh.cgram.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Pagination {
  private int currentPage;
  private int listCount;
  private int limit;
  private int pageSize;
  private int totalCount;

  private int maxPage;
  private int startPage;
  private int endPage;
  private int prevPage;
  private int nextPage;
  // 전체 게시글 수, 현재 페이지 번호, 한 페이지에 보일 게시글 수, 보여질 페이지 번호개수
  public Pagination(int listCount, int currentPage, int limit, int pageSize) {
      this.listCount = listCount;
      this.currentPage = currentPage;
      this.limit = limit;
      this.pageSize = pageSize;

      this.maxPage = (int) Math.ceil((double) listCount / limit);
      this.startPage = (currentPage - 1) / pageSize * pageSize + 1;
      this.endPage = Math.min(startPage + pageSize - 1, maxPage);
      this.prevPage = (currentPage > 1) ? currentPage - 1 : 1;
      this.nextPage = (currentPage < maxPage) ? currentPage + 1 : maxPage;
  }
  
  public int getOffset() {
    return (currentPage - 1) * limit;
  }
}
