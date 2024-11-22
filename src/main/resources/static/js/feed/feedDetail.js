class FeedDetail {
  constructor() {
    this.init();
  }

  init() {
    // URL 변경 감지
    window.addEventListener('popstate', this.handlePopState.bind(this));

    // 피드 클릭 이벤트 설정
    this.setupFeedClickEvents();

    // 모달 닫기 이벤트 설정
    this.setupModalCloseEvents();

    // 댓글 입력 이벤트 설정
    this.setupCommentEvents();
  }

  setupFeedClickEvents() {
    const posts = document.querySelectorAll('.board-article');
    posts.forEach(post => {
      post.addEventListener('click', (e) => {
        // 더보기 버튼이나 좋아요 버튼 클릭 시 모달 열지 않음
        if (e.target.closest('.more-options') ||
          e.target.closest('.board-section-1')) {
          return;
        }
        const postId = post.getAttribute('data-post-id');
        this.openModal(postId);
      });
    });
  }

  setupModalCloseEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('.modal-close') ||
        e.target.matches('.modal-overlay')) {
        this.closeModal();
      }
    });

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  setupCommentEvents() {
    const commentInput = document.querySelector('.comment-input');
    const postCommentBtn = document.querySelector('.post-comment-btn');

    if (commentInput && postCommentBtn) {
      commentInput.addEventListener('input', () => {
        postCommentBtn.style.opacity = commentInput.value.trim() ? '1' : '0.3';
      });

      postCommentBtn.addEventListener('click', () => {
        this.postComment(commentInput.value);
      });
    }
  }

  async openModal(postId) {
    try {
      // URL 변경
      const newUrl = `/p/${postId}`;
      window.history.pushState({ postId }, '', newUrl);

      // 게시물 데이터 가져오기
      const response = await fetch(`/api/posts/${postId}`);
      const data = await response.json();

      // 모달 HTML 가져오기
      const modalResponse = await fetch(`/modals/Feed-detail/${postId}`);
      const modalHtml = await modalResponse.text();

      // 모달 표시
      document.body.insertAdjacentHTML('beforeend', modalHtml);
      document.body.classList.add('modal-open');

      // 모달 이벤트 설정
      this.setupModalCloseEvents();
      this.setupCommentEvents();

    } catch (error) {
      console.error('Failed to open modal:', error);
    }
  }

  closeModal() {
    const modalContainer = document.querySelector('.modal-container');
    if (modalContainer) {
      modalContainer.remove();
      document.body.classList.remove('modal-open');

      // URL 복구
      if (window.history.state?.postId) {
        window.history.back();
      }
    }
  }

  handlePopState(event) {
    if (!event.state?.postId) {
      this.closeModal();
    }
  }

  async postComment(content) {
    if (!content.trim()) return;

    const postId = window.location.pathname.split('/')[2];
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content })
      });

      if (response.ok) {
        const comment = await response.json();
        this.appendComment(comment);
        document.querySelector('.comment-input').value = '';
      }
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  }

  appendComment(comment) {
    const commentsList = document.querySelector('.comments-list');
    const commentHTML = `
          <div class="comment">
              <div class="user-profile">
                  <div class="user-profile-img">
                      <img src="${comment.memberImg}" alt="프로필">
                  </div>
                  <div class="content-wrapper">
                      <span class="username">${comment.memberNickname}</span>
                      <span class="content">${comment.content}</span>
                  </div>
              </div>
          </div>
      `;
    commentsList.insertAdjacentHTML('beforeend', commentHTML);
  }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  new FeedDetail();
});