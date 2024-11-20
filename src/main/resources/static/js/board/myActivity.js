const reactionTab = document.getElementById("reactionTab");
const postTab = document.getElementById("postTab");
const reactionControls = document.getElementById("reactionControls");
const postsContent = document.getElementById("postsContent");
const likeLink = document.getElementById("likeLink");
const postLink = document.getElementById("postLink");
const commentLink = document.getElementById("commentLink");
const commentList = document.getElementById("commentList");
const selectButton = document.querySelector(".selected");
const postSort = document.querySelector(".post-sort");
let deleteButton, cancelButton;

// 모든 탭 링크를 배열로 가져오기
const tabLinks = [likeLink, commentLink, postLink];


document.addEventListener("DOMContentLoaded", () => {
  // 기본 설정: 반응 탭과 좋아요가 활성화됨
  reactionTab.classList.add("active");
  postsContent.style.display = "grid";
  activateTab(likeLink);
  commentList.style.display = "none";
  postLink.style.display = "none";

  // 기본 설정: 좋아요한 게시물 로드
  fetch("/myActivity/interactions/likes")
    .then(response => response.json())
    .then(data => renderLikedPosts(data))
    .catch(error => console.error("Error fetching liked posts:", error));
});

function renderLikedPosts(posts) {
  const postsGrid = document.getElementById("postsContent");
  postsGrid.innerHTML = "";

  if (posts.length === 0) {
    const noPostsMessage = document.createElement("p");
    noPostsMessage.textContent = "회원님이 좋아요를 누른 게시물이 존재하지 않습니다.";
    postsGrid.appendChild(noPostsMessage);
    return;
  }

  posts.forEach(post => {
    const postItem = document.createElement("div");
    postItem.classList.add("post-item");
    postItem.setAttribute("data-board-no", post.boardNo);
    postItem.innerHTML = `
      <a href="/board/${post.boardNo}">
        <img src="${post.imgPath}" alt="Post Image" />
      </a>
    `;
    postsGrid.appendChild(postItem);
  });
}

// 탭 클릭 이벤트 핸들러
function activateTab(activeLink) {
  // 모든 링크에서 active 클래스 제거
  tabLinks.forEach(link => link.classList.remove("active"));
  // 클릭된 링크에 active 클래스 추가
  activeLink.classList.add("active");

  // 활성화된 탭의 ID를 localStorage에 저장
  localStorage.setItem("activeTab", activeLink.id);

  // 탭에 따른 콘텐츠 표시/숨기기
  if (activeLink === likeLink) {
    postsContent.style.display = "grid";
    commentList.style.display = "none";
  } else if (activeLink === commentLink) {
    postsContent.style.display = "none";
    commentList.style.display = "block";
  } else if (activeLink === postLink) {
    postsContent.style.display = "grid";
    commentList.style.display = "none";
  }
}

 // 반응 탭 클릭 이벤트
 reactionTab.addEventListener("click", () => {
  reactionTab.classList.add("active");
  postTab.classList.remove("active");
  postLink.style.display = "none";
  likeLink.style.display = "block";
  activateTab(likeLink);
  commentLink.style.display = "block";
  postsContent.style.display = "grid";
  commentList.style.display = "none";

  // 기본 설정: 좋아요한 게시물 로드
  fetch("/myActivity/interactions/likes")
    .then(response => response.json())
    .then(data => renderLikedPosts(data))
    .catch(error => console.error("Error fetching liked posts:", error));
});

 // 게시물 탭 클릭 이벤트
 postTab.addEventListener("click", () => {
  postTab.classList.add("active");
  reactionTab.classList.remove("active");
  postLink.style.display = "block";
  likeLink.style.display = "none";
  activateTab(postLink);
  commentLink.style.display = "none";
  postsContent.style.display = "grid";
  commentList.style.display = "none";

  // 서버에서 회원의 게시물을 가져오기
  fetch("/myActivity/posts")
    .then(response => response.json())
    .then(data => renderMemberPosts(data))
    .catch(error => console.error("Error fetching member posts:", error));
});

function renderMemberPosts(posts) {
  const postsGrid = document.getElementById("postsContent");
  postsGrid.innerHTML = "";

  if (posts.length === 0) {
    const noPostsMessage = document.createElement("p");
    noPostsMessage.textContent = "회원님이 작성한 게시물이 존재하지 않습니다.";
    postsGrid.appendChild(noPostsMessage);
    return;
  }

  posts.forEach(post => {
    const postItem = document.createElement("div");
    postItem.classList.add("post-item");
    postItem.setAttribute("data-board-no", post.boardNo);
    postItem.innerHTML = `
      <a href="/board/${post.boardNo}">
        <img src="${post.imgPath}" alt="Post Image" />
      </a>
    `;
    postsGrid.appendChild(postItem);
  });
}

 // 좋아요 클릭 이벤트
 likeLink.addEventListener("click", (event) => {
  event.preventDefault();
  activateTab(likeLink);
});

 // 댓글 클릭 이벤트
 commentLink.addEventListener("click", (event) => {
  event.preventDefault();
  activateTab(commentLink);
  commentList.style.display = "block";

  // 서버에서 댓글 데이터를 가져오기
  fetch("/myActivity/comments")
    .then(response => {
      if (response.ok) return response.json();
      else throw new Error("Failed to fetch comments");
    })
    .then(data => renderComments(data))
    .catch(error => console.error("Error fetching comments:", error));
});

// 댓글 데이터를 렌더링하는 함수
function renderComments(comments) {
  commentList.innerHTML = ""; // 기존 댓글을 초기화

  if (comments.length === 0) {
    const noCommentsMessage = document.createElement("p");
    noCommentsMessage.textContent = "회원님이 작성한 댓글이 존재하지 않습니다.";
    commentList.appendChild(noCommentsMessage);
    return;
  }

  comments.forEach(comment => {
    const commentItem = document.createElement("div");
    commentItem.classList.add("comment-item");
    
    // 게시물 정보 (작성자 프로필 이미지, 닉네임, 게시물 내용)
    const postInfo = `
      <li class="post-info">
        <img src="${comment.profileImg}" alt="Profile Image" class="profile-img">
        <span class="member-nickname">${comment.memberNickname}</span>
        <p class="board-content truncate-text">${comment.boardContent}</p>
      </li>
    `;

    // 댓글 정보 (로그인 회원의 프로필 이미지, 닉네임, 댓글 내용)
    const commentInfo = `
      <li class="comment-info">
        <img src="${comment.userProfileImg}" alt="User Profile Image" class="user-profile-img">
        <span class="user-nickname">${comment.userNickname}</span>
        <p class="comment-content truncate-text">${comment.commentContent}</p>
      </li>
    `;

    commentItem.innerHTML = `${postInfo}${commentInfo}`;
    commentList.appendChild(commentItem);
  });
}

function truncateText(element, maxLines) {
  const lineHeight = parseInt(window.getComputedStyle(element).lineHeight, 10);
  const maxHeight = lineHeight * maxLines;

  if (element.scrollHeight > maxHeight) {
    let text = element.textContent;
    while (element.scrollHeight > maxHeight && text.length > 0) {
      text = text.slice(0, -1);
      element.textContent = text + "...";
    }
  }
}

document.querySelectorAll(".truncate-text").forEach(element => {
  truncateText(element, 3); // 세 줄까지만 표시
});

// 게시물 클릭 이벤트
postLink.addEventListener("click", (event) => {
  event.preventDefault();
  activateTab(postLink);
});

// 페이지가 로드될 때 localStorage에서 활성 탭을 불러오기
const activeTabId = localStorage.getItem("activeTab");

if (activeTabId) {
  // 저장된 ID에 따라 해당 탭을 활성화
  const activeLink = document.getElementById(activeTabId);
  activateTab(activeLink);
} else {
  // 기본 활성 탭 설정 (좋아요 탭)
  activateTab(likeLink);
}

// 선택 버튼 클릭 이벤트
selectButton.addEventListener("click", () => {
  // 선택 버튼 숨기기
  selectButton.style.display = "none";

  // 삭제 및 취소 버튼 생성
  deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.textContent = "삭제";
  if(postTab.classList.contains("active")) {
    deleteButton.addEventListener("click", handlePostDelete);
  } else {
    deleteButton.addEventListener("click", handleDelete);
  }

  cancelButton = document.createElement("button");
  cancelButton.classList.add("cancel");
  cancelButton.textContent = "취소";
  cancelButton.addEventListener("click", handleCancel);

  // 버튼 추가
  postSort.appendChild(deleteButton);
  postSort.appendChild(cancelButton);

  // 각 게시물에 체크박스 추가
  const postItems = document.querySelectorAll(".post-item");
  postItems.forEach((item) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.dataset.boardNo = item.dataset.boardNo;
    checkbox.classList.add("post-checkbox");
    item.prepend(checkbox); // 게시물 앞에 체크박스 추가
  });
});

// 취소 버튼 클릭 이벤트
function handleCancel() {
  // 삭제 및 취소 버튼 제거
  deleteButton.remove();
  cancelButton.remove();
  selectButton.style.display = "block";

  // 체크박스 제거
  const checkboxes = document.querySelectorAll(".post-checkbox");
  checkboxes.forEach((checkbox) => {
    checkbox.remove();
  });
}

// 선택한 게시물의 좋아요 삭제
function handleDelete() {
  const selectedPosts = Array.from(document.querySelectorAll(".post-item input[type='checkbox']:checked"))
      .map(checkbox => checkbox.dataset.boardNo); // 게시물 번호 가져오기

  if (selectedPosts.length === 0) {
      alert("좋아요를 취소할 게시물을 선택해주세요.");
      return;
  }
  console.log("선택된 게시물:", selectedPosts);

  // 서버에 삭제 요청 보내기
  fetch("/myActivity/deleteLikes", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(selectedPosts)
  })
  .then(response => response.json())
  .then(result => {
      if (result !== 0) {
          alert("좋아요가 성공적으로 삭제되었습니다.");
          // 삭제된 게시물을 화면에서 제거하는 로직 추가
          selectedPosts.forEach(boardNo => {
              const postItem = document.querySelector(`.post-item[data-board-no='${boardNo}']`);
              if (postItem) postItem.remove();
          });
          handleCancel();
      } else {
          alert("좋아요 삭제에 실패했습니다.");
      }
  })
  .catch(error => {
      console.error("Error:", error);
      alert("서버 요청에 실패했습니다.");
  });
}

// 새로운 게시물 삭제 함수
function handlePostDelete() {
  // 선택된 게시물 번호 가져오기
  const selectedPosts = Array.from(document.querySelectorAll(".post-item input[type='checkbox']:checked"))
      .map(checkbox => checkbox.dataset.boardNo); // 게시물 번호 가져오기

  if (selectedPosts.length === 0) {
      alert("삭제할 게시물을 선택해주세요.");
      return;
  }
  console.log("선택된 게시물:", selectedPosts);

  // 서버에 게시물 삭제 요청 보내기
  fetch("/myActivity/deletePosts", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(selectedPosts)
  })
  .then(response => response.json())
  .then(result => {
      if (result !== 0) {
          alert("게시물이 성공적으로 삭제되었습니다.");
          // 삭제된 게시물을 화면에서 제거하는 로직 추가
          selectedPosts.forEach(boardNo => {
              const postItem = document.querySelector(`.post-item[data-board-no='${boardNo}']`);
              if (postItem) postItem.remove();
          });
          handleCancel();
      } else {
          alert("게시물 삭제에 실패했습니다.");
      }
  })
  .catch(error => {
      console.error("Error:", error);
      alert("서버 요청에 실패했습니다.");
  });
}
