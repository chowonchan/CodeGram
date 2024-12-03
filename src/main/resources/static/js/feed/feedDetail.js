if (document.getElementsByTagName("head").length > 0) {
  document.getElementsByTagName("head")[0].insertAdjacentHTML(
      "beforeend",
      '<link rel="stylesheet" href="/css/feed/feedDetail.css"/>'
  );
  document.getElementsByTagName("head")[0].insertAdjacentHTML(
    "beforeend",
    '<link rel="stylesheet" href="/assets/fontawesome/css/all.min.css"/>'
);
}

const feedModal = document.getElementById("feedModal");
const feedImage = document.getElementById("feedImage");
const commentList = document.getElementById("commentList");
const optionsModal = document.getElementById("optionsModal");
const ellipsisButton = document.querySelector(".fa-ellipsis");
const modalOverlay = document.getElementById("modalOverlay");
const modalOverlay2 = document.getElementById("modalOverlay2");
const likeButton = document.getElementById("likeButton"); // 좋아요 버튼
const editDeleteModal = document.getElementById("editDeleteModal");
const modalOverlay3 = document.getElementById("modalOverlay3");
const likesModalOverlay = document.getElementById("likesModalOverlay");
const likesModal = document.getElementById("likesModal");
const likesList = document.getElementById("likesList");
const likesCountButton = document.getElementById("likesCount");
const closeLikesModalButton = document.getElementById("closeLikesModal");
const reportModalOverlay = document.getElementById("reportModalOverlay");
const reportModal = document.getElementById("reportModal");
const reportReasonList = document.getElementById("reportReasonList");

// 신고 사유 목록
const reportReasons = [
  "마음에 들지 않습니다",
  "자살, 자해 및 섭식 장애",
  "따돌림 또는 원치 않는 연락",
  "폭력, 혐오 또는 학대",
  "제한된 품목을 판매하거나 홍보함",
  "나체 이미지 또는 성적 행위",
  "스캠, 사기 또는 스팸",
  "거짓 정보",
];

// 모달 열기 함수
const openDetail = (boardNo) => {
  fetch(`/board/detail?boardNo=${boardNo}`)
    .then(response => {
      if (!response.ok) throw new Error("게시글 데이터를 불러오는 데 실패했습니다.");
      return response.json();
    })
    .then(data => {
      // 데이터 설정
      document.getElementById("feedModal").dataset.boardNo = data.boardNo;
      document.getElementById("feedImage").src = data.imagePath + data.imageRename;
      document.getElementById("userNickname").innerHTML = data.memberNickname;
      document.getElementById("userNickname").href = `/member/${data.memberNickname}`;
      document.getElementById("feedUserNickname").textContent = data.memberNickname;
      document.getElementById("feedDescription").textContent = data.boardContent;
      document.getElementById("likesCount").textContent = `좋아요 ${data.likeCount}개`;
      document.getElementById("feedTime").textContent = data.createdAt;
      document.getElementById("feedCreatedTime").textContent = data.createdAt;

      // 댓글 설정
      const commentList = document.getElementById("commentList");
      commentList.innerHTML = ""; // 기존 댓글 초기화
      data.comments.forEach(comment => {
        const li = document.createElement("li");
        li.classList.add("comment");
        li.innerHTML = `
          <span class="user-nickname">${comment.memberNickname}</span>
          <span class="comment-text">${comment.commentContent}</span>
        `;
        commentList.appendChild(li);
      });

      // 좋아요 상태 확인 및 설정
      if (data.isLiked) {
        likeButton.classList.remove("fa-regular");
        likeButton.classList.add("fa-solid", "liked");
      } else {
        likeButton.classList.remove("fa-solid", "liked");
        likeButton.classList.add("fa-regular");
      }

      // 모달 표시
      const feedModal = document.getElementById("feedModal");
      feedModal.style.display = "flex";
      modalOverlay.style.display = "block";
    })
    .catch(err => {
      console.error(err);
      alert("게시글 데이터를 불러오지 못했습니다.");
    });
};

document.addEventListener("click", (event) => {
  if (event.target === modalOverlay && optionsModal.style.display !== "flex" && editDeleteModal.style.display !== "flex" && likesModal.style.display !== "flex") {
    feedModal.style.display = "none";
    modalOverlay.style.display = "none";
  }
});

// 옵션 모달 열기 함수
const openOptionsModal = () => {
  optionsModal.style.display = "flex";
  modalOverlay2.style.display = "block";
};

// 옵션 모달 닫기 함수
const closeOptionsModal = () => {
  optionsModal.style.display = "none";
  modalOverlay2.style.display = "none";
};

// fa-ellipsis 버튼 클릭 이벤트
ellipsisButton.addEventListener("click", (event) => {
  event.stopPropagation(); // 이벤트 전파 방지
  const boardNo = feedModal.getAttribute("data-board-no"); // 게시글 번호 가져오기

  fetch(`/board/checkAuthor?boardNo=${boardNo}`)
    .then((response) => {
      if (!response.ok) throw new Error("작성자 확인 실패");
      return response.json();
    })
    .then((isAuthor) => {
      if (isAuthor) {
        // 로그인된 사용자가 작성자라면 수정/삭제 모달 열기
        editDeleteModal.style.display = "flex";
        modalOverlay3.style.display = "block";
      } else {
        // 로그인된 사용자가 작성자가 아니라면 기존 옵션 모달 열기
        openOptionsModal();
      }
    })
    .catch((err) => console.error(err));
});

// 모달 외부 클릭 시 닫기
window.addEventListener("click", (event) => {
  if (event.target === modalOverlay3) {
    editDeleteModal.style.display = "none";
    modalOverlay3.style.display = "none";
  }
});

// 모달 외부 클릭 시 닫기
window.addEventListener("click", (event) => {
  if (event.target === modalOverlay2) {
    closeOptionsModal();
  }
});

// 수정 버튼 클릭 이벤트
document.querySelector(".detail-edit-delete-button.edit").addEventListener("click", () => {
  alert("수정 기능으로 이동합니다.");
  // 수정 페이지 이동 코드 추가
});

// 삭제 버튼 클릭 이벤트
document.querySelector(".detail-edit-delete-button.delete").addEventListener("click", () => {
  const boardNo = feedModal.dataset.boardNo; // 게시글 번호 가져오기
  if (confirm("정말 삭제하시겠습니까?")) {
    fetch(`/board/delete?boardNo=${boardNo}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ boardNo })
    })
      .then((response) => {
        if (!response.ok) throw new Error("게시글 삭제 실패");
        alert("게시글이 삭제되었습니다.");
        window.location.reload(); // 페이지 새로고침
      })
      .catch((err) => console.error(err));
  }
});

const likeFunction = (boardNo) => {
  const isLiked = likeButton.classList.contains('liked');

  if (isLiked) {
    // 좋아요 취소 요청
    fetch("/board/unlike", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ boardNo })
    })
    .then(response => {
      if (response.ok) {
        likeButton.classList.remove("fa-solid", "liked");
        likeButton.classList.add("fa-regular");
        openDetail(boardNo); // 좋아요 상태 갱신
      } else {
        throw new Error("좋아요 취소 실패");
      }
    })
    .catch(err => console.error(err));
  } else {
    // 좋아요 요청
    fetch('/board/boardLike', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ boardNo: boardNo }) // JSON으로 요청 바디 전송
    })
      .then(response => {
        if (response.ok) return response.json();
        else throw new Error("좋아요 처리 실패");
      })
      .then(result => {
        if (result === 1) {
          likeButton.classList.remove("fa-regular");
          likeButton.classList.add("fa-solid", "liked");



          const content =
          `<strong>${loginMemberName}</strong>
          님이 좋아요를 누르셨습니다<br>`;

          const memberNickname = document.querySelector("#userNickname").innerText;
  
          const url = `/member/${memberNickname}` + `/board/${boardNo}`;

          // type, url, pkNo, content
          sendNoti(
            "boardLike",  // type
            url,  // 게시글 상세 조회 페이지 주소
            boardNo,  // 게시글 번호
            content
          );






          openDetail(boardNo); // 좋아요 상태 갱신
        } else {
          alert('이미 좋아요를 눌렀거나 오류가 발생했습니다.');
        }
      })
      .catch(err => console.error(err));
  }
};

// 좋아요 버튼 클릭 이벤트
likeButton.addEventListener('click', () => {
  console.log('좋아요 버튼 클릭');
  const boardNo = feedModal.dataset.boardNo;
  likeFunction(boardNo);
});

// 좋아요 모달 열기
const openLikesModal = (boardNo) => {
  fetch(`/board/likes/${boardNo}`)
    .then(response => {
      if (!response.ok) throw new Error("좋아요 목록을 불러오는 데 실패했습니다.");
      return response.json();
    })
    .then(data => {
      // 좋아요 목록 렌더링
      likesList.innerHTML = ""; // 기존 목록 초기화
      data.forEach(user => {
        const li = document.createElement("li");
        li.innerHTML = `
          <img src="${user.profileImg}" alt="프로필 이미지">
          <a href="/member/${user.memberNickname}" style="text-decoration: none; color: inherit;">
            <div class="nickname">${user.memberNickname}</div>
            <div class="name" style="font-size: 12px; color: gray;">${user.memberName}</div>
          </a>
        `;
        likesList.appendChild(li);
      });

      // 모달 표시
      likesModal.style.display = "block";
      likesModalOverlay.style.display = "block";
    })
    .catch(err => console.error(err));
};

// 좋아요 모달 닫기
const closeLikesModal = () => {
  likesModalOverlay.style.display = "none";
};

// 좋아요 카운트 클릭 이벤트
likesCountButton.addEventListener("click", () => {
  const boardNo = feedModal.dataset.boardNo;
  openLikesModal(boardNo);
});

// 모달 닫기 버튼 클릭 이벤트
closeLikesModalButton.addEventListener("click", closeLikesModal);

// 모달 외부 클릭 시 닫기
likesModalOverlay.addEventListener("click", (event) => {
  if (event.target === likesModalOverlay) closeLikesModal();
});

// 신고 모달 열기
const openReportModal = () => {
  reportReasonList.innerHTML = ""; // 기존 목록 초기화

  reportReasons.forEach((reason, index) => {
    const li = document.createElement("li");
    li.textContent = reason;
    li.dataset.reason = reason;
    li.addEventListener("click", () => {
      submitReport(li.dataset.reason);
    });
    reportReasonList.appendChild(li);
  });

  reportModal.style.display = "block";
  reportModalOverlay.style.display = "block";
};

// 신고 모달 닫기
const closeReportModal = () => {
  reportModal.style.display = "none";
  reportModalOverlay.style.display = "none";
};

// 신고 제출
const submitReport = (reason) => {
  const boardNo = feedModal.dataset.boardNo;
  const reportReason = reason;
  fetch("/board/report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ boardNo, reportReason })
  })
    .then((response) => {
      if (!response.ok) throw new Error("신고 제출 실패");
      alert("신고 완료");
      closeReportModal();
    })
    .catch(err => {
      console.error(err);
      alert("신고 처리 중 문제가 발생했습니다.");
    });
};

reportModalOverlay.addEventListener("click", (event) => {
  if (event.target === reportModalOverlay) closeReportModal();
});

// 신고 버튼과 연결
document.querySelector(".detail-options-button.report").addEventListener("click", () => {
  closeOptionsModal(); // 옵션 모달 닫기
  openReportModal(); // 신고 모달 열기
});

// 신고 모달 닫기 버튼 클릭 이벤트
document.getElementById("closeReportModal").addEventListener("click", closeReportModal);