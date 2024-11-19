const reactionTab = document.getElementById("reactionTab");
const postTab = document.getElementById("postTab");
const reactionControls = document.getElementById("reactionControls");
const postsContent = document.getElementById("postsContent");
const likeLink = document.getElementById("likeLink");
const postLink = document.getElementById("postLink");
const commentLink = document.getElementById("commentLink");
const commentList = document.getElementById("commentList");

document.addEventListener("DOMContentLoaded", () => {
   // 기본 설정: 반응 탭과 좋아요가 활성화됨
  reactionTab.classList.add("active");
  postsContent.style.display = "grid";
  commentList.style.display = "none";
  postLink.style.display = "none";
});

 // 반응 탭 클릭 이벤트
 reactionTab.addEventListener("click", () => {
  reactionTab.classList.add("active");
  postTab.classList.remove("active");
  reactionControls.style.display = "flex";
  postLink.style.display = "none";
  postsContent.style.display = "grid";
  commentList.style.display = "none";
});

 // 게시물 탭 클릭 이벤트
 postTab.addEventListener("click", () => {
  postTab.classList.add("active");
  reactionTab.classList.remove("active");
  reactionControls.style.display = "none";
  postLink.style.display = "block";
  postsContent.style.display = "grid";
  commentList.style.display = "none";
});

// 좋아요 클릭 이벤트
likeLink.addEventListener("click", (event) => {
  event.preventDefault(); // 기본 동작 방지
  postsContent.style.display = "grid";
  commentList.style.display = "none";
});

// 댓글 클릭 이벤트
commentLink.addEventListener("click", (event) => {
  event.preventDefault(); // 기본 동작 방지
  postsContent.style.display = "none";
  commentList.style.display = "block";
});