// 무한 스크롤 피드 구현

document.addEventListener('DOMContentLoaded', () => {
  // 더 많은 피드 항목을 가져오는 기능
  async function fetchMoreFeedItems(page) {
    try {
      // 피드 항목을 가져올 때 이 URL을 실제 백엔드 엔드포인트로 대체합니다
      const response = await fetch(`/api/feed?page=${page}`);
      
      if (!response.ok) {
        throw new Error('오류가 발생했습니다');
      }
      
      const data = await response.json();
      
      // 새 피드 항목 렌더링
      renderFeedItems(data.feedList);
      
      return {
        hasMore: data.hasMore, // 백엔드가 더 많은 항목이 있음을 나타내는 플래그를 반환한다고 가정
        page: page
      };
    } catch (error) {
      console.error('Feed를 가져올 수 없습니다 :', error);
      return { hasMore: false };
    }
  }

  // 새 피드 항목 렌더링 기능
  function renderFeedItems(feedList) {
    const wrapper = document.querySelector('.infinite-scroll-wrapper');
    
    feedList.forEach(board => {
      // 각 보드 항목에 대한 새 기사 요소 만들기
      const articleElement = document.createElement('article');
      articleElement.className = 'board-article';
      
      // 게시판 데이터로 기사 채우기(원래 HTML과 동일한 구조 사용)
      articleElement.innerHTML = `
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button class="slider-button next-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              ${board.imageList.map((img, index) => `
                <div class="image-track">
                  <img src="${img.imgPath}" class="post-image">
                </div>
              `).join('')}
              <div class="slider-dots">
                <span class="dot ${index === 0 ? 'active' : ''}"></span>
              </div>
            </div>
          </div>
          
          <div class="important-box">
            <section class="section-1">
              <div class="box-1">
                <button class="action-button like-button pointer" aria-label="좋아요" data-board-no="${board.boardNo}">
                  <svg aria-label="좋아요" class="like-icon ${board.likeCheck == 1 ? 'fa-solid' : 'fa-regular'}" height="24" width="24" viewBox="0 0 24 24" id="boardLike">
                    <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z" />
                  </svg>
                </button>
                <button class="action-button comment-button pointer" aria-label="댓글">
                  <svg aria-label="댓글 달기" class="comment-icon" height="24" width="24" viewBox="0 0 24 24">
                    <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" />
                  </svg>
                </button>
              </div>
              <div class="box-2">
                <button class="action-button mark-button pointer" aria-label="저장" data-member-no="${board.boardNo}">
                  <svg aria-label="저장" class="mark-icon ${board.markCheck == 1 ? 'fa-solid' : 'fa-regular'}" height="24" width="24" viewBox="0 0 24 24" id="boardMark">
                    <path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z" />
                  </svg>
                </button>
              </div>
            </section>
            <div>좋아요 <span id="likeCount">${board.likeCount}</span>개</div>
            <div class="post-caption" id="contentContainer">
              <p id="shortContent">${board.content}</p>
              <span id="fullContent" class="hidden-content"></span>
              <span id="moreBtn" class="more-btn">더보기</span>
            </div>
            <a href="${board.boardNo}">
              댓글 <span>[${board.commentCount}]</span>개 보기...
            </a>
            <div class="comment-box pointer">
              <span>댓글 달기...</span>
            </div>
          </div>
        </div>
      `;
      
      wrapper.appendChild(articleElement);
    });

    // 필요한 경우 새로 추가된 항목에 대한 이벤트 청취자 다시 연결
    attachEventListeners();
  }

  // 이벤트 청취자를 동적 콘텐츠에 연결하는 기능
  function attachEventListeners() {
    // 예: '더 보기' 버튼에 클릭 청취자 추가
    document.querySelectorAll('#moreBtn').forEach(btn => {
      btn.addEventListener('click', function() {
        const contentContainer = this.closest('#contentContainer');
        const shortContent = contentContainer.querySelector('#shortContent');
        const fullContent = contentContainer.querySelector('#fullContent');
        
        shortContent.style.display = 'none';
        fullContent.classList.remove('hidden-content');
        this.style.display = 'none';
      });
    });

    // 필요에 따라 동적 이벤트 청취자 추가
  }

  // 무한 스크롤 초기화
  const infiniteScroll = new InfiniteScroll({
    container: '.infinite-scroll-container',
    itemsWrapper: '.infinite-scroll-wrapper',
    loadMore: fetchMoreFeedItems,
    threshold: 200, // 필요에 따라 조정
    loadingIndicator: '<div class="loading-spinner">Loading...</div>'
  });
});

// 선택 사항: 좋아요, 댓글 등과 같은 추가 상호 작용을 처리하는 기능입니다.
function handleLikeAction(boardNo) {
  // 동일한 기능 구현
  // 일반적으로 상태를 전환하려면 API 호출이 필요합니다
}

function handleBookmarkAction(boardNo) {
  // 북마크 기능 구현
  // 일반적으로 북마크 상태를 전환하려면 API 호출이 필요합니다
}