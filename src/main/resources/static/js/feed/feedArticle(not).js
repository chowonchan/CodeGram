function createArticleHTML(board) {
  return `
    <div class="post">
      <div class="post-header post-header-padding">
        <div class="board-profile">
          <div class="user-profile inline-block">
            <a href="${board.memberNickname}">
              <div class="user-profile-img pointer radius">
                ${board.profileImg 
                  ? `<img src="${board.profileImg}">`
                  : `<img src="https://via.placeholder.com/50">`
                }
              </div>
            </a>
          </div>
        </div>
        <a href="${board.memberNickname}">
          <div class="board-n-a pointer inline-block">
            <span>${board.memberNickname}</span>
          </div>
          <div>
            <span>${board.createdAt}</span>
          </div>
        </a>
        <div class="post-options">
          <button class="more-options options-button" onclick="openModal()">...</button>
        </div>
      </div>
      
      <div class="post-images-container">
        <div class="image-slider">
          <button class="slider-button prev-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button class="slider-button next-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
          <div class="image-track">
            ${board.imageList.map((img, index) => `
              <img src="${img.imgPath}${img.imgRename}" class="post-image">
            `).join('')}
          </div>
          <div class="slider-dots">
          </div>
        </div>
      </div>
    </div>
    
    <div class="important-box">
      <section class="section-1">
        <div class="box-1">
          <button class="action-button like-button pointer" data-board-no="${board.boardNo}">
            <svg class="like-icon boardLike ${board.likeCheck === 1 ? 'fa-solid' : 'fa-regular'}" 
                 height="24" width="24" viewBox="0 0 24 24">
              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z" />
            </svg>
          </button>
          <button class="action-button comment-button pointer">
            <svg class="comment-icon" height="24" width="24" viewBox="0 0 24 24">
              <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none"
                stroke="currentColor" stroke-linejoin="round" stroke-width="2" />
            </svg>
          </button>
        </div>
        <div class="box-2">
          <button class="action-button mark-button pointer boardMark" 
                  data-member-no="${board.boardNo}">
            <svg class="mark-icon ${board.markCheck === 1 ? 'fa-solid' : 'fa-regular'}" 
                 height="24" width="24" viewBox="0 0 24 24">
              <path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z" />
            </svg>
          </button>
        </div>
      </section>
      <div>좋아요 <span class="likeCount">${board.likeCount}</span>개</div>
      <div class="post-caption contentContainer">
        <p class="shortContent"></p>
        <span class="fullContent hidden-content">${board.boardContent}</span>
        <span class="more-btn">더보기</span>
      </div>
      <a href="${board.boardNo}">
        댓글 <span>[${board.commentCount}]</span>개 보기...
      </a>
      <div class="comment-box pointer">
        <span>댓글 달기...</span>
      </div>
    </div>
  `;
}

// Usage example:
// const articleElement = document.querySelector('.board-article');
// articleElement.innerHTML = createArticleHTML(boardData);