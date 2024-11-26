const memberList = document.querySelector("#memberList");

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
            ${
              member.memberDelBanFl === 1
                ? `<button class="status-btn red">탈퇴</button>`
                : member.memberDelBanFl === 2
                ? `<button class="status-btn blue">되돌리기</button>`
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
          statusButton.addEventListener("click", () => {
            updateMemberStatus(member.memberNickname);
          });
        }

        memberList.appendChild(tr);
      });

      renderPagination(pagination);
    })
    .catch(err => console.error(err));
};

const updateMemberStatus = (memberNickname) => {
  fetch("/admin/updateMemberStatus", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: memberNickname
  })
    .then(result => {
      if (result === 1) {
        alert("회원 상태가 변경되었습니다.");
        selectMemberList(); // 변경 후 목록 갱신
      } else {
        alert("회원 상태 변경에 실패했습니다.");
      }
    })
    .catch(err => console.error(err));
};

document.addEventListener("DOMContentLoaded", () => {
  selectMemberList();
});

const paginationBox = document.querySelector(".pagination");
const renderPagination = (pagination) => {

  // let paginationBox;

  paginationBox.innerHTML = '';  // 기존 페이지 버튼 초기화

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
  paginationBox.appendChild(createPageButton(1, "<<"));
  paginationBox.appendChild(createPageButton(pagination.prevPage, "<"));

  // 동적 페이지 번호 버튼 생성
  for (let i = pagination.startPage; i <= pagination.endPage; i++) {
    const isActive = i === pagination.currentPage;
    paginationBox.appendChild(createPageButton(i, i, isActive));
  }

  // >, >> 버튼 추가
  paginationBox.appendChild(createPageButton(pagination.nextPage, ">"));
  paginationBox.appendChild(createPageButton(pagination.maxPage, ">>"));
};


// DOMContentLoaded 이벤트
document.addEventListener("DOMContentLoaded", () => {
  selectMemberList();
});

// 검색 
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
    if (op.value === key) { // option의 valeu와 key가 같다면
      op.selected = true; // selected 속성 추가
      return;
    }
  })
})();