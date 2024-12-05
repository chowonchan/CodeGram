articleElement.innerHTML = `
<div class="post">
    <div class="post-header post-header-padding">
      <div class="board-profile">
        <div class="user-profile inline-block">
          <a href="/member/${board.memberNickname}">
            <div class="user-profile-img pointer radius">
              ${board.profileImg ?
          `<img src="${board.profileImg}">` :
          `<img src="/images/defaultImg.png">`
        }
            </div>
          </a>
        </div>
      </div>
      <a href="/member/${board.memberNickname}">
        <div class="board-n-a pointer inline-block">
          <span>${board.memberNickname}</span>
        </div>
        <div>
          <span>${board.createdAt}</span>
        </div>
      </a>
      <div class="post-options">
        <span class="more-options options-button feed-open-modal pointer">
          <input type="hidden" class="boardNo" value="${board.boardNo}">
          ...
        </span>
      </div>
    </div>
    <div class="post-images-container">
      <div class="image-slider">
        <button class="slider-button prev-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button class="slider-button next-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
        <div class="image-track">
          ${board.imageList.map(img => `
            <img src="${img.imgPath}${img.imgRename}" class="post-image">
          `).join('')}
        </div>
        <div class="slider-dots"></div>
      </div>
    </div>
    <div class="important-box">
      <section class="section-1">
        <div class="box-1">
          <button class="action-button like-button pointer ">
            <div class="action-button-div">
              <span class="fa-heart ${board.likeCheck === 1 ? 'fa-solid liked' : 'fa-regular'}"></span>
            </div>
          </button>
          <button class="action-button comment-button pointer">
            <div class="action-button-div">
              <div class="fa-regular fa-comment"></div>
            </div>
          </button>
        </div>
        <div class="box-2">
          <div class="action-button mark-button pointer boardMark" data-member-no="${board.boardNo}">
            <div class="action-button-div">
              <i class="fa-bookmark ${board.markCheck === 1 ? 'fa-solid' : 'fa-regular'}"></i>
            </div>

          </div>
        </div>
      </section>
      <div>좋아요 <span class="likeCount">${board.likeCount}</span>개</div>
      <div class="post-caption contentContainer">
        <span class="feed-imp-Nick">${board.memberNickname}</span>
        ${board.boardContent && board.boardContent.length > 200 ? `
          <span class="fullContent hidden-content">${board.boardContent}</span>
          <br>
          <span class="more-btn pointer">더 보기</span>
        ` : `
          <span class="shortContent">${board.boardContent || ''}</span>
        `}
      </div>
      <a href="/board/${board.boardNo}">
        댓글 <span>[${board.commentCount}]</span>개 보기...
      </a>
    </div>
  </div>
  `;