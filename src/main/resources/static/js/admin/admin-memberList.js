const memberList = document.querySelector("#memberList");
const feedList = document.querySelector("#feedList");
const feedReportList = document.querySelector("#feedReportList");
const commentReportList = document.querySelector("#commentReportList");
const paginationBox1 = document.getElementById("memberPaginationBox");
const paginationBox2 = document.getElementById("feedPaginationBox");
const paginationBox3 = document.getElementById("feedReportPaginationBox");
const paginationBox4 = document.getElementById("commentReportPaginationBox");

// DOMContentLoaded 이벤트
document.addEventListener("DOMContentLoaded", () => {
  selectMemberList();
  selectFeedList();
  selectFeedReportList();
  selectCommentReportList();
});

// 사이드바 탭 선택
document.querySelector('.member-list').addEventListener('click', () => {
  document.querySelector('#memberTable').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.feed').addEventListener('click', () => {
  document.querySelector('#feedTable').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.feed-report').addEventListener('click', () => {
  document.querySelector('#feedReportTable').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.comment-report').addEventListener('click', () => {
  document.querySelector('#commentReportTable').scrollIntoView({ behavior: 'smooth' });
});

/* 회원 목록 조회 */
const selectMemberList = (cp = 1) => {
  fetch(`/admin/selectMemberList?cp=${cp}`)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("회원 목록 조회 실패");
    })
    .then(map => {
      const list = map.memberList;
      const pagination = map.pagination;

      memberList.innerHTML = ""; // 기존 리스트 초기화

      list.forEach(member => {
        const tr = document.createElement("tr");

        // 회원 정보 생성
        tr.innerHTML = `
          <td>${member.memberNo}</td>
          <td>${member.memberId}</td>
          <td><a href="/member/${member.memberNickname}">${member.memberNickname}</a></td>
          <td>${member.createdAt}</td>
          <td>${member.boardCount}</td>
          <td>${member.followCount}</td>
          <td>${member.followerCount}</td>
          <td>
            ${member.memberDelBanFl === 1
            ? `<button class="status-btn red">탈퇴</button>`
            : member.memberDelBanFl === 2
              ? `<button class="status-btn blue">복구</button>`
              : `<span class="status-text">정지</span>`
          }
          </td>
        `;

        tr.addEventListener("click", () => {
          location.href = `/member/${member.memberNickname}`; // 회원 상세 페이지로 이동
        });

        // 버튼 이벤트 추가
        const statusButton = tr.querySelector(".status-btn");
        if (statusButton) {
          statusButton.addEventListener("click", e => {
            updateMemberStatus(member.memberNickname);
            e.stopPropagation();
          });
        }

        memberList.appendChild(tr);
      });

      renderMemberPagination(pagination);
    })
    .catch(err => console.error(err));
};

const updateMemberStatus = (memberNickname) => {
  fetch("/admin/updateMemberStatus", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: memberNickname
  })
    .then(response => {
      if (response.ok) return response.text();
      throw new Error("회원 상태 변경 실패");
    }).then(result => {
      if (result == 1) {
        alert("회원 상태가 변경되었습니다.");
        selectMemberList();
        selectFeedList();
        selectFeedReportList();
        selectCommentReportList();
      } else {
        alert("회원 상태 변경에 실패했습니다.");
      }
    })
    .catch(err => console.error(err));
};

const renderMemberPagination = (pagination) => {
  paginationBox1.innerHTML = '';  // 기존 페이지 버튼 초기화

  const createPageButton = (page, text, isActive = false) => {
    const button = document.createElement("a");
    button.href = "#";
    button.classList.add("page-btn");
    button.dataset.page = page;
    button.textContent = text;

    if (isActive) button.classList.add("active");

    button.addEventListener("click", (event) => {
      event.preventDefault();
      const cp = parseInt(event.target.dataset.page);

      // 모든 페이지 버튼에서 active 클래스를 제거
      document.querySelectorAll(".page-btn").forEach(btn => btn.classList.remove("active"));

      // 현재 클릭된 버튼에 active 클래스 추가
      button.classList.add("active");

      selectMemberList(cp);
    });
    return button;
  };
  // <<, < 버튼 추가
  paginationBox1.appendChild(createPageButton(1, "<<"));
  paginationBox1.appendChild(createPageButton(pagination.prevPage, "<"));

  // 동적 페이지 번호 버튼 생성
  for (let i = pagination.startPage; i <= pagination.endPage; i++) {
    const isActive = i === pagination.currentPage;
    paginationBox1.appendChild(createPageButton(i, i, isActive));
  }

  // >, >> 버튼 추가
  paginationBox1.appendChild(createPageButton(pagination.nextPage, ">"));
  paginationBox1.appendChild(createPageButton(pagination.maxPage, ">>"));
};

/* 피드 목록 조회 */
const selectFeedList = (cp = 1) => {
  fetch(`/admin/selectFeedList?cp=${cp}`)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("피드 목록 조회 실패");
    })
    .then(map => {
      const list = map.feedList;
      const pagination = map.pagination;

      feedList.innerHTML = ""; // 기존 리스트 초기화

      list.forEach(feed => {
        const tr = document.createElement("tr");

        // 피드 내용을 자르는 함수
        const truncateText = (text, maxLength) => {
          if (!text) return "";
          return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
        }

        // 글자수 제한
        const truncatedContent = truncateText(feed.boardContent, 30);

        // 피드 정보 생성
        tr.innerHTML = `
          <td>${feed.boardNo}</td>
          <td>${feed.memberNickname}</td>
          <td><a href="/board/${feed.boardNo}" title="${feed.boardContent}">${truncatedContent || "내용 없음"}</a></td>
          <td>${feed.createdAt}</td>
          <td>${feed.readCount}</td>
          <td>
            ${feed.boardDelFl === 'N'
            ? `<button class="status-btn red">삭제</button>`
            : feed.boardDelFl === 'Y'
              ? `<button class="status-btn blue">복구</button>`
              : `<span class="status-text">정지</span>`
          }
          </td>
        `;

        tr.addEventListener("click", () => {
          location.href = `/board/${feed.boardNo}`; // 게시물 상세 페이지로 이동
        });

        // 버튼 이벤트 추가
        const statusButton = tr.querySelector(".status-btn");
        if (statusButton) {
          statusButton.addEventListener("click", e => {
            updateFeedStatus(feed.boardNo);
            e.stopPropagation();
          });
        }

        feedList.appendChild(tr);
      });

      renderFeedPagination(pagination);
    })
    .catch(err => console.error(err));
};

const updateFeedStatus = (boardNo) => {
  fetch("/admin/updateFeedStatus", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: boardNo
  })
    .then(response => {
      if (response.ok) return response.text();
      throw new Error("피드 상태 변경 실패");
    }).then(result => {
      if (result == 1) {
        alert("요청이 처리되었습니다.");
        selectMemberList();
        selectFeedList();
        selectFeedReportList();
        selectCommentReportList();
      } else {
        alert("요청 처리가 실패했습니다.");
      }
    })
    .catch(err => console.error(err));
};

const renderFeedPagination = (pagination) => {
  paginationBox2.innerHTML = '';  // 기존 페이지 버튼 초기화

  const createPageButton = (page, text, isActive = false) => {
    const button = document.createElement("a");
    button.href = "#";
    button.classList.add("page-btn");
    button.dataset.page = page;
    button.textContent = text;

    if (isActive) button.classList.add("active");

    button.addEventListener("click", (event) => {
      event.preventDefault();
      const cp = parseInt(event.target.dataset.page);

      // 모든 페이지 버튼에서 active 클래스를 제거
      document.querySelectorAll(".page-btn").forEach(btn => btn.classList.remove("active"));

      // 현재 클릭된 버튼에 active 클래스 추가
      button.classList.add("active");

      selectFeedList(cp);
    });
    return button;
  };
  // <<, < 버튼 추가
  paginationBox2.appendChild(createPageButton(1, "<<"));
  paginationBox2.appendChild(createPageButton(pagination.prevPage, "<"));

  // 동적 페이지 번호 버튼 생성
  for (let i = pagination.startPage; i <= pagination.endPage; i++) {
    const isActive = i === pagination.currentPage;
    paginationBox2.appendChild(createPageButton(i, i, isActive));
  }

  // >, >> 버튼 추가
  paginationBox2.appendChild(createPageButton(pagination.nextPage, ">"));
  paginationBox2.appendChild(createPageButton(pagination.maxPage, ">>"));
};

/* 피드 신고 목록 조회 */
const selectFeedReportList = (query) => {
  const queryParam = encodeURIComponent(query);
  const cp = 1;
  let url = `/admin/selectFeedReportList?cp=${cp}`;

  if (query) url += `&category=${queryParam}`;

  fetch(url)
    .then(response => {

      if (response.ok) {
        console.log("피드 신고 목록 조회 성공");
        return response.json();
      }
      throw new Error("피드 신고 목록 조회 실패");
    })
    .then(map => {
      const list = map.feedReportList;
      const pagination = map.pagination;

      feedReportList.innerHTML = ""; // 기존 리스트 초기화

      if (list.length === 0) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td colspan="6" class="no-data">접수된 피드 신고가 없습니다.</td>
        `;
        feedReportList.appendChild(tr);
        return;
      }

      list.forEach(feedReport => {
        const tr = document.createElement("tr");

        // 피드 내용을 자르는 함수
        const truncateText = (text, maxLength) => {
          if (text === "") text = "내용 없음";
          return text != null &&text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
        }

        // 글자수 제한
        // const truncatedContent = truncateText(feedReport.boardContent, 20);

        // 피드 정보 생성
        tr.innerHTML = `
          <td>${feedReport.reportNo}</td>
          <td>${feedReport.memberNickname}</td>
          <td><a href="/board/${feedReport.contentNo}" title="${feedReport.boardContent}">${feedReport.boardContent || "내용 없음"}</a></td>
          <td>${feedReport.reportCategory}</td>
          <td>${feedReport.createdAt}</td>
          <td>
            ${feedReport.boardDelFl === 'N'
            ? `<button class="status-btn red">처리</button>`
            : `<div class="status-text">처리 완료</div>`
          }
            ${feedReport.boardDelFl === 'N'
            ? `<button class="status-btn blue">삭제</button>`
            : ``
          }
          </td>
        `;

        tr.addEventListener("click", () => {
          location.href = `/board/${feedReport.contentNo}`; // 게시물 상세 페이지로 이동
        });

        // 버튼 이벤트 추가
        const statusButton = tr.querySelector(".status-btn.red");
        const statusButton1 = tr.querySelector(".status-btn.blue");
        if (statusButton) {
          statusButton.addEventListener("click", e => {

            const clickCounts = {};
            // 닉네임별 클릭 횟수 증가
            if (!clickCounts[feedReport.memberNickname]) {
              clickCounts[feedReport.memberNickname] = 0;
            }
            clickCounts[feedReport.memberNickname] += 1;

            // 알림 내용
            const count = clickCounts[feedReport.memberNickname];
            const content = `부적절한 피드로 인해 경고 ${count}회 알림을 <br> 보냅니다.`;
            console.log("// 상대방에게 알림 보내기");

            // 알림 전송
            sendNoti(
              "warning",
              location.pathname,
              feedReport.reportNo,
              content
            );



            updateFeedStatus(feedReport.contentNo);
            e.stopPropagation();
          });
        }

        if (statusButton1) {
          statusButton1.addEventListener("click", e => {
            deleteReport(feedReport.reportNo);
            e.stopPropagation();
          });
        }

        feedReportList.appendChild(tr);
      });

      renderFeedReportPagination(pagination);
    })
    .catch(err => console.error(err));
};

// 신고 삭제 함수
const deleteReport = (reportNo) => {
  fetch("/admin/deleteReport", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: reportNo
  })
    .then(response => {
      if (response.ok) return response.text();
      throw new Error("신고 삭제 실패");
    }).then(result => {
      if (result == 1) {
        alert("신고가 삭제처리되었습니다.");
        selectFeedReportList();
        selectCommentReportList();
      } else {
        alert("신고 삭제가 실패했습니다.");
      }
    })
    .catch(err => console.error(err));
};

const renderFeedReportPagination = (pagination) => {
  paginationBox3.innerHTML = '';  // 기존 페이지 버튼 초기화

  const createPageButton = (page, text, isActive = false) => {
    const button = document.createElement("a");
    button.href = "#";
    button.classList.add("page-btn");
    button.dataset.page = page;
    button.textContent = text;

    if (isActive) button.classList.add("active");

    button.addEventListener("click", (event) => {
      event.preventDefault();
      const cp = parseInt(event.target.dataset.page);

      // 모든 페이지 버튼에서 active 클래스를 제거
      document.querySelectorAll(".page-btn").forEach(btn => btn.classList.remove("active"));

      // 현재 클릭된 버튼에 active 클래스 추가
      button.classList.add("active");

      selectFeedReportList(cp);
    });
    return button;
  };
  // <<, < 버튼 추가
  paginationBox3.appendChild(createPageButton(1, "<<"));
  paginationBox3.appendChild(createPageButton(pagination.prevPage, "<"));

  // 동적 페이지 번호 버튼 생성
  for (let i = pagination.startPage; i <= pagination.endPage; i++) {
    const isActive = i === pagination.currentPage;
    paginationBox3.appendChild(createPageButton(i, i, isActive));
  }

  // >, >> 버튼 추가
  paginationBox3.appendChild(createPageButton(pagination.nextPage, ">"));
  paginationBox3.appendChild(createPageButton(pagination.maxPage, ">>"));
};

/* 댓글 신고 목록 조회 */
const selectCommentReportList = (query) => {
  const queryParam = encodeURIComponent(query);
  const cp = 1;
  let url = `/admin/selectCommentReportList?cp=${cp}`;
  if (query) url += `&category=${queryParam}`;
  fetch(url)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("댓글 신고 목록 조회 실패");
    })
    .then(map => {
      const list = map.commentReportList;
      const pagination = map.pagination;

      commentReportList.innerHTML = ""; // 기존 리스트 초기화

      if (list.length === 0) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td colspan="6" class="no-data">접수된 댓글 신고가 없습니다.</td>
        `;
        commentReportList.appendChild(tr);
        return;
      }

      list.forEach(commentReport => {
        const tr = document.createElement("tr");

        const truncateText = (text, maxLength) => {
          if (text === "") text = "내용 없음";
          return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
        }

        // 글자수 제한
        const truncatedContent = truncateText(commentReport.commentContent, 20);

        // 피드 정보 생성
        tr.innerHTML = `
          <td>${commentReport.reportNo}</td>
          <td>${commentReport.memberNickname}</td>
          <td><a href="/board/${commentReport.contentNo}" title="${commentReport.commentContent}">${truncatedContent}</a></td>
          <td>${commentReport.reportCategory}</td>
          <td>${commentReport.createdAt}</td>
          <td>
            ${commentReport.commentDelFl === 'N'
            ? `<button class="status-btn red">처리</button>`
            : `<div class="status-text">처리 완료</div>`
          }
            ${commentReport.commentDelFl === 'N'
            ? `<button class="status-btn blue">삭제</button>`
            : ``
          }
          </td>
        `;
        tr.addEventListener("click", () => {
          location.href = `/board/${commentReport.contentNo}`; // 게시물 상세 페이지로 이동
        });

        // 버튼 이벤트 추가
        const statusButton = tr.querySelector(".status-btn.red");
        const statusButton1 = tr.querySelector(".status-btn.blue");
        if (statusButton) {
          statusButton.addEventListener("click", e => {


            // 닉네임별 클릭 횟수 증가
            if (!clickCounts[commentReport.memberNickname]) {
              clickCounts[commentReport.memberNickname] = 0;
            }
            clickCounts[commentReport.memberNickname] += 1;

            // 알림 내용
            const count = clickCounts[commentReport.memberNickname];
            const content = `부적절한 댓글로 인해 경고 ${count}회 알림을 보냅니다.`;
            console.log("// 상대방에게 알림 보내기");

            // 알림 전송
            sendNoti(
              "warning",
              location.pathname,
              feedReport.reportNo,
              content
            );

            // 상태 업데이트
            updateCommentStatus(commentReport.contentNo);
            e.stopPropagation();


          });
        }

        if (statusButton1) {
          statusButton1.addEventListener("click", e => {
            deleteReport(commentReport.reportNo);
            e.stopPropagation();
          });
        }

        commentReportList.appendChild(tr);
      });

      renderCommentReportPagination(pagination);
    })
    .catch(err => console.error(err));
};

const updateCommentStatus = (commentNo) => {
  fetch("/admin/updateCommentStatus", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: commentNo
  })
    .then(response => {
      if (response.ok) return response.text();
      throw new Error("댓글 상태 변경 실패");
    }).then(result => {
      if (result == 1) {
        alert("요청이 처리되었습니다.");
        selectCommentReportList();
      } else {
        alert("요청 처리가 실패했습니다.");
      }
    })
    .catch(err => console.error(err));
};

const renderCommentReportPagination = (pagination) => {
  paginationBox4.innerHTML = '';  // 기존 페이지 버튼 초기화

  const createPageButton = (page, text, isActive = false) => {
    const button = document.createElement("a");
    button.href = "#";
    button.classList.add("page-btn");
    button.dataset.page = page;
    button.textContent = text;

    if (isActive) button.classList.add("active");

    button.addEventListener("click", (event) => {
      event.preventDefault();
      const cp = parseInt(event.target.dataset.page);

      // 모든 페이지 버튼에서 active 클래스를 제거
      document.querySelectorAll(".page-btn").forEach(btn => btn.classList.remove("active"));

      // 현재 클릭된 버튼에 active 클래스 추가
      button.classList.add("active");

      selectCommentReportList(cp);
    });
    return button;
  };
  // <<, < 버튼 추가
  paginationBox4.appendChild(createPageButton(1, "<<"));
  paginationBox4.appendChild(createPageButton(pagination.prevPage, "<"));

  // 동적 페이지 번호 버튼 생성
  for (let i = pagination.startPage; i <= pagination.endPage; i++) {
    const isActive = i === pagination.currentPage;
    paginationBox4.appendChild(createPageButton(i, i, isActive));
  }

  // >, >> 버튼 추가
  paginationBox4.appendChild(createPageButton(pagination.nextPage, ">"));
  paginationBox4.appendChild(createPageButton(pagination.maxPage, ">>"));
};

// 드롭다운 클릭 이벤트 (Feed Report)
document.querySelector(".dropbtn").addEventListener("click", () => {
  document.getElementById("feedReportDropdown").style.display = "block";
})
document.querySelector(".dropbtn2").addEventListener("click", () => {
  document.getElementById("commentReportDropdown").style.display = "block";
})
document.querySelectorAll("#feedReportDropdown a").forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const selectedValue = item.getAttribute("data-value");
    document.querySelector("#feedReportTable .dropbtn").textContent = selectedValue;
    if (selectedValue == "전체") {
      selectFeedReportList("");
      document.getElementById("feedReportDropdown").style.display = "none";
      return;
    }
    // 선택한 정렬 기준으로 목록을 갱신
    selectFeedReportList(selectedValue);
    document.getElementById("feedReportDropdown").style.display = "none";
  });
});

// 드롭다운 클릭 이벤트 (Comment Report)
document.querySelectorAll("#commentReportDropdown a").forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const selectedValue = item.getAttribute("data-value");
    document.querySelector("#commentReportTable .dropbtn2").textContent = selectedValue;
    if (selectedValue == "전체") {
      selectCommentReportList("");
      document.getElementById("commentReportDropdown").style.display = "none";
      return;
    }
    // 선택한 정렬 기준으로 목록을 갱신
    selectCommentReportList(selectedValue);
    document.getElementById("commentReportDropdown").style.display = "none";
  });
});

/* 검색창 */
(() => {

  // 쿼리스트링 모두 얻어와 관리하는 객체
  const params = new URLSearchParams(location.search);

  const key = params.get("key");
  const query = params.get("query");

  if (key === null) return; //검색이 아니면 함수 종료

  document.querySelector("#searchQuery").value = query;

  const options = document.querySelectorAll("#searchKey > option");
  options.forEach(op => {
    // op : <option> 태그
    if (op.value === key) { // option의 value와 key가 같다면
      op.selected = true; // selected 속성 추가
      return;
    }
  })
})();