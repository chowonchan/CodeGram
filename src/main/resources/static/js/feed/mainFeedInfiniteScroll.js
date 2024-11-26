/**
 * MainFeed용 InfiniteScroll 클래스
 * 피드 게시물을 무한 스크롤로 로드하는 기능 구현
 */
class MainFeedInfiniteScroll {
  /**
   * @param {number} [threshold=100] - 하단에서 몇 px 전에 로드를 시작할지 설정
   * @param {number} [debounceTime=200] - 스크롤 이벤트 디바운스 시간 (ms)
   */
  constructor(threshold = 100, debounceTime = 200) {
    // DOM 요소
    this.container = document.querySelector('main');
    this.feedContainer = document.querySelector('.feed');

    // 설정값
    this.threshold = threshold;
    this.debounceTime = debounceTime;

    // 상태값
    this.isLoading = false;
    this.hasMore = true;
    this.lastBoardNo = null; // 마지막으로 로드된 게시물 번호
    this.page = 1;

    // 초기화
    this.init();
  }

  /**
   * 무한 스크롤 초기화
   */
  init() {
    // 로딩 인디케이터 생성
    this.createLoadingIndicator();

    // 디바운스된 스크롤 핸들러 설정
    this.debouncedHandleScroll = this.debounce(
      this.handleScroll.bind(this),
      this.debounceTime
    );

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', this.debouncedHandleScroll);

    // 초기 게시물 로드
    this.loadMorePosts();
  }

  /**
   * 스크롤 이벤트 핸들러
   */
  async handleScroll() {
    if (this.isLoading || !this.hasMore) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollHeight - (scrollTop + clientHeight) < this.threshold) {
      await this.loadMorePosts();
    }
  }

  /**
   * 새로운 게시물 로드
   */
  async loadMorePosts() {
    try {
      this.isLoading = true;
      this.showLoading();

      // 서버에서 게시물 데이터를 가져오기
      const response = await fetch(`/api/boards?page=${this.page}&lastBoardNo=${this.lastBoardNo}`);
      const data = await response.json();

      if (data.boards && data.boards.length > 0) {
        // 새 게시물 추가
        data.boards.forEach(board => {
          const boardElement = this.createBoardElement(board);
          this.feedContainer.appendChild(boardElement);
        });

        // 마지막 게시물 번호 업데이트
        this.lastBoardNo = data.boards[data.boards.length - 1].boardNo;
        this.hasMore = data.hasMore; // 더 이상 게시물이 없는지 여부
        this.page++;
      } else {
        this.hasMore = false;  // 게시물이 더 이상 없을 경우
      }
    } catch (error) {
      console.error('게시물을 불러오는데 실패하였습니다:', error);
    } finally {
      this.isLoading = false;
      this.hideLoading();
    }
  }

  /**
   * 게시물 HTML 요소 생성
   * @param {Object} board - 게시물 데이터
   * @returns {HTMLElement} 생성된 게시물 요소
   */
  createBoardElement(board) {
    const article = document.createElement('article');
    article.className = 'board-article';
    article.setAttribute(`board-${board.boardNo}`);

    article.innerHTML = `
      <div class="post">
        <div class="post-header post-header-padding">
          <div class="board-profile">
            <div class="user-profile inline-block">
              <a href="/${board.memberNickname}">
                <div class="user-profile-img pointer radius">
                  <img src="${board.profileImg || 'https://via.placeholder.com/50'}">
                </div>
              </a>
            </div>
          </div>
          <a href="/${board.memberNickname}">
            <div class="board-n-a pointer inline-block">
              <span>${board.memberNickname}</span>
            </div>
            <div>
              <span>${this.formatDate(board.createAt)}</span>
            </div>
          </a>
          <div class="more-options pointer">...</div>
        </div>
        <!-- 이미지 슬라이드 영역 -->
        <div class="post-images-container">
          ${this.createImageSlideHTML(board.imageList)}
        </div>
        <!-- 게시물 정보 영역 -->
        <div class="important-box">
          <!-- 좋아요, 댓글, 북마크 버튼 등 -->
          ${this.createActionButtonsHTML(board)}
          <!-- 좋아요 수, 내용, 댓글 등 -->
          ${this.createPostInfoHTML(board)}
        </div>
      </div>
    `;

    return article;
  }

  /**
   * 이미지 슬라이드 HTML 생성
   */
  createImageSlideHTML(imageList) {
    if (!imageList || imageList.length === 0) return '';

    return `
        <div class="image-slider">
          <button class="slider-button prev-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button class="slider-button next-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div class="image-track">
            ${imageList.map(img => `
              <img src="${img.url}" title="${img.title}" class="post-image">
            `).join('')}
          </div>
          <div class="slider-dots">
            ${imageList.map((_, index) => `
              <span class="dot ${index === 0 ? 'active' : ''}"></span>
            `).join('')}
          </div>
        </div>
    `;
  }

  /**
   * 액션 버튼 HTML 생성
   */
  createActionButtonsHTML(board) {
    return `
      <section class="section-1">
        <div class="box-1">
          <button class="action-button like-button pointer" aria-label="좋아요">
            <svg aria-label="좋아요" 
                  class="like-icon" th:classappend="${board.likeCheck == 1} ? 'fa-solid' : 'fa-regular'" 
                        height="24" 
                        width="24" 
                        viewBox="0 0 24 24"
                        id="boardLike">
              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"/>
            </svg>
          </button>
          <button class="action-button comment-button pointer" aria-label="댓글">
            <svg aria-label="댓글 달기" 
                  class="comment-icon" 
                          height="24" 
                          width="24" 
                          viewBox="0 0 24 24">
              <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"/>
            </svg>
          </button>
        </div>
        <div class="box-2">
          <button class="action-button mark-button pointer" aria-label="저장"
                          th:data-member-no="${board.boardNo}>
            <svg aria-label="저장" 
                      class="mark-icon" th:classappend="${board.markCheck == 1} ? 'fa-solid' : 'fa-regular'" 
                              height="24" 
                              width="24" 
                              viewBox="0 0 24 24"
                              id="boardMark">
              <path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z" />
            </svg>
          </button>
        </div>
      </section>
    `;
  }


  /*         <span th:text="${board.memberNickname}">닉네임</span>
          <span th:text="${boardContent}"></span>
          <span th:if="${boardContent}.length > 200" 
                class="detailBtn pointer">
            더보기...
          </span> */

          
  /**
   * 게시물 정보 HTML 생성
   */
  createPostInfoHTML(board) {
    return `
      <div>좋아요 <span id="likeCount" th:text="${board.likeCount}">0</span>개</div>
      <div class="post-caption" id="contentContainer">
        <!-- 타임리프에서 넘어온 content를 여기에 삽입 -->
        <p id="shortContent"></p>
        <span id="fullContent" class="hidden-content"></span>
        <span id="moreBtn" class="more-btn">더보기</span>
      </div>
      ${board.commentCount > 0 ? `
        <a href="/p/${board.boardNo}">
          댓글 <span>[${board.commentCount}]</span>개 보기...
        </a>
      ` : ''}
      <div class="comment-box pointer">
        <span>댓글 달기...</span>
      </div>
    `;
  }

  /**
   * 날짜 포맷팅
   */
  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    if (minutes > 0) return `${minutes}분 전`;
    return `${seconds}초 전`;
  }

  /**
   * 로딩 인디케이터 생성
   */
  createLoadingIndicator() {
    this.loader = document.createElement('div');
    this.loader.className = 'infinite-scroll-loader';
    this.loader.innerHTML = `
      <div class="loading-spinner">
        <div class="spinner"></div>
        <span>게시물을 불러오는 중...</span>
      </div>
    `;
    this.loader.style.display = 'none';
    this.feedContainer.appendChild(this.loader);

    /* 이곳에 글자 대신 코드그램 로고가 나오게 해도 ok */
  }

  /**
   * 로딩 인디케이터 표시/숨김
   */
  showLoading() {
    if (this.loader) this.loader.style.display = 'block';
  }

  hideLoading() {
    if (this.loader) this.loader.style.display = 'none';
  }

  /**
   * 디바운스 함수
   */
  debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  /**
   * 인스턴스 정리
   */
  destroy() {
    window.removeEventListener('scroll', this.debouncedHandleScroll);
    if (this.loader) {
      this.loader.remove();
    }
  }
}




// 인스턴스 생성
const infiniteScroll = new MainFeedInfiniteScroll({
  container: '.infinite-scroll-container',
  wrapper: '.infinite-scroll-wrapper',
  threshold: 100,
  debounceTime: 200
});

