// // 스토리 관련 상수
// const STORY_ITEMS_SELECTOR = '.story-item';
// const STORY_WRAPPER_SELECTOR = '.story-wrapper';

// // 스토리 아이템 초기화
// document.addEventListener('DOMContentLoaded', () => {
//     const storyItems = document.querySelectorAll(STORY_ITEMS_SELECTOR);

//     // 각 스토리 아이템에 클릭 이벤트 추가
//     storyItems.forEach(item => {
//         item.addEventListener('click', handleStoryClick);
//     });
// });

// /**
//  * 스토리 클릭 핸들러
//  * @param {Event} event - 클릭 이벤트
//  */
// function handleStoryClick(event) {
//     const storyItem = event.currentTarget;
//     const storyNo = storyItem.dataset.storyNo;
//     const storyWrapper = storyItem.querySelector(STORY_WRAPPER_SELECTOR);

//     // 이미 본 스토리인지 확인
//     if (!storyWrapper.classList.contains('viewed')) {
//         viewStory(storyNo, storyWrapper);
//     }
// }

/**
 * 스토리 보기 처리
 * @param {string} storyNo - 스토리 ID
 * @param {HTMLElement} storyWrapper - 스토리 래퍼 엘리먼트
 */
function viewStory(storyNo, storyWrapper) {
    // 스토리 열람 상태로 변경
    storyWrapper.classList.add('viewed');

    // 스토리 뷰어 표시 (실제 구현에서는 모달이나 새로운 페이지로 이동)
    // 만들어준 story 조회 페이지로 이동해야함
    alert(`스토리 ${storyNo}를 보고 있습니다!`);
}

// 스토리 데이터 관리 (실제 구현 시 사용)
const storyData = {
    viewedStories: new Set(),

    /**
     * 스토리 열람 상태 저장
     * @param {string} storyNo - 스토리 ID
     */
    markAsViewed(storyNo) {
        this.viewedStories.add(storyNo);
    },

    /**
     * 스토리 열람 여부 확인
     * @param {string} storyNo - 스토리 No
     * @returns {boolean} - 열람 여부
     */
    isViewed(storyNo) {
        return this.viewedStories.has(storyNo);
    }
};



// ------------------------------------------------------------------------

// 스토리 관련 상수
const STORY_ITEMS_SELECTOR = '.story-item';
const STORY_WRAPPER_SELECTOR = '.story-wrapper';
const STORIES_CONTAINER_SELECTOR = '.stories-container';
const SCROLL_AMOUNT = 300; // 스크롤 단위

// 스토리 아이템 초기화
document.addEventListener('DOMContentLoaded', () => {
    const storyItems = document.querySelectorAll(STORY_ITEMS_SELECTOR);

    // 각 스토리 아이템에 클릭 이벤트 추가
    storyItems.forEach(item => {
        item.addEventListener('click', handleStoryClick);
    });
});


/**
 * 스토리 네비게이션 처리
 * @param {string} direction - 'prev' 또는 'next'
 */
function navigateStories(direction) {
    const container = document.querySelector(STORIES_CONTAINER_SELECTOR);
    const scrollAmount = direction === 'prev' ? -SCROLL_AMOUNT : SCROLL_AMOUNT;

    container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

/**
 * 스토리 클릭 핸들러
 * @param {Event} event - 클릭 이벤트
 */
function handleStoryClick(event) {
    const storyItem = event.currentTarget;
    const storyNo = storyItem.dataset.storyNo;

    // 스토리 페이지로 이동
    window.location.href = `/stories/view/${storyNo}`;
}

// 스크롤 위치에 따른 네비게이션 버튼 표시/숨김
function updateNavigationButtons() {
    const container = document.querySelector(STORIES_CONTAINER_SELECTOR);
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');

    if (prevButton && nextButton) {
        prevButton.style.display = container.scrollLeft <= 0 ? 'none' : 'flex';
        nextButton.style.display =
            (container.scrollLeft + container.clientWidth) >= container.scrollWidth
                ? 'none' : 'flex';
    }
}

// 스크롤 이벤트 리스너
document.querySelector(STORIES_CONTAINER_SELECTOR)?.addEventListener('scroll', updateNavigationButtons);