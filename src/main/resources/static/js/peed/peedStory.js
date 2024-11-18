// 스토리 관련 상수
const STORY_ITEMS_SELECTOR = '.story-item';
const STORY_WRAPPER_SELECTOR = '.story-wrapper';

// 스토리 아이템 초기화
document.addEventListener('DOMContentLoaded', () => {
    const storyItems = document.querySelectorAll(STORY_ITEMS_SELECTOR);
    
    // 각 스토리 아이템에 클릭 이벤트 추가
    storyItems.forEach(item => {
        item.addEventListener('click', handleStoryClick);
    });
});

/**
 * 스토리 클릭 핸들러
 * @param {Event} event - 클릭 이벤트
 */
function handleStoryClick(event) {
    const storyItem = event.currentTarget;
    const storyId = storyItem.dataset.storyId;
    const storyWrapper = storyItem.querySelector(STORY_WRAPPER_SELECTOR);
    
    // 이미 본 스토리인지 확인
    if (!storyWrapper.classList.contains('viewed')) {
        viewStory(storyId, storyWrapper);
    }
}

/**
 * 스토리 보기 처리
 * @param {string} storyId - 스토리 ID
 * @param {HTMLElement} storyWrapper - 스토리 래퍼 엘리먼트
 */
function viewStory(storyId, storyWrapper) {
    // 스토리 열람 상태로 변경
    storyWrapper.classList.add('viewed');
    
    // 스토리 뷰어 표시 (실제 구현에서는 모달이나 새로운 페이지로 이동)
    // 만들어준 story 조회 페이지로 이동해야함
    alert(`스토리 ${storyId}를 보고 있습니다!`);
}

// 스토리 데이터 관리 (실제 구현 시 사용)
const storyData = {
    viewedStories: new Set(),
    
    /**
     * 스토리 열람 상태 저장
     * @param {string} storyId - 스토리 ID
     */
    markAsViewed(storyId) {
        this.viewedStories.add(storyId);
    },
    
    /**
     * 스토리 열람 여부 확인
     * @param {string} storyId - 스토리 ID
     * @returns {boolean} - 열람 여부
     */
    isViewed(storyId) {
        return this.viewedStories.has(storyId);
    }
};