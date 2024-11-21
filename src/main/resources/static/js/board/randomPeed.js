document.addEventListener("DOMContentLoaded", () => {
  fetchRandomPosts();
});

function fetchRandomPosts() {
  fetch("/board/randomPeed/posts")
    .then(response => response.json())
    .then(data => renderRandomPosts(data))
    .catch(error => console.error("Error fetching random posts:", error));
}

function renderRandomPosts(posts) {
  const postsGrid = document.querySelector(".posts-grid");
  postsGrid.innerHTML = ""; // 기존 게시물 초기화

  if (posts.length === 0) {
    const noPostsMessage = document.createElement("p");
    noPostsMessage.textContent = "표시할 게시물이 없습니다.";
    postsGrid.appendChild(noPostsMessage);
    return;
  }

  posts.forEach(post => {
    const postItem = document.createElement("div");
    postItem.classList.add("post-item");
    postItem.setAttribute("data-board-no", post.boardNo);
    postItem.innerHTML = `
      <a href="/board/${post.boardNo}">
        <img class="post-image" src="${post.imgPath}${post.imgRename}" alt="Post Image" />
      </a>
    `;
    postsGrid.appendChild(postItem);
  });
}