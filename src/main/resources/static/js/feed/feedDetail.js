const feedModal = document.getElementById("feedModal");
const openModalButton = document.getElementById("openModalButton");
const feedImage = document.getElementById("feedImage");
const commentList = document.getElementById("commentList");

// 모달 열기 함수
const openDetail = (boardNo) => {
  fetch(`/board/detail?boardNo=${boardNo}`)
    .then(response => {
      if (!response.ok) throw new Error("게시글 데이터를 불러오는 데 실패했습니다.");
      return response.json();
    })
    .then(data => {
      // 데이터 설정
      document.getElementById("feedImage").src = data.imagePath;
      document.getElementById("userNickname").textContent = data.memberNickname;
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

      // 모달 표시
      const feedModal = document.getElementById("feedModal");
      feedModal.style.display = "flex";
    })
    .catch(err => {
      console.error(err);
      alert("게시글 데이터를 불러오지 못했습니다.");
    });
};

// 모달 닫기
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    document.getElementById("feedModal").style.display = "none";
  }
});

// ESC 키로 모달 닫기
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.getElementById("feedModal").style.display = "none";
  }
});

// 모달 여는 버튼 클릭 이벤트
openModalButton.addEventListener("click", () => {
  const boardNo = openModalButton.getAttribute("data-board-no"); // 게시글 번호 가져오기
  openDetail(boardNo);
});