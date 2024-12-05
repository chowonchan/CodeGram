// mainFeed.js
document.addEventListener('DOMContentLoaded', () => {
  const storiesContainer = document.querySelector('.stories-container');
  let currentPosition = 0;

  // 스토리 정렬 함수
  function sortStories() {
    const storyItems = Array.from(document.querySelectorAll('.story-item'));

    // 읽지 않은 스토리와 읽은 스토리 분리
    const unviewedStories = storyItems.filter(story =>
      !story.querySelector('.story-wrapper').classList.contains('viewed')
    );
    const viewedStories = storyItems.filter(story =>
      story.querySelector('.story-wrapper').classList.contains('viewed')
    );

    // 컨테이너를 비우고 정렬된 순서로 다시 추가
    storiesContainer.innerHTML = '';
    unviewedStories.forEach(story => storiesContainer.appendChild(story));
    viewedStories.forEach(story => storiesContainer.appendChild(story));

    // 스크롤 위치 초기화
    currentPosition = 0;
    storiesContainer.scrollTo({
      left: 0,
      behavior: 'smooth'
    });
  }

  // 스토리 아이템 클릭 이벤트 처리
  const storyItem = document.getElementsByClassName("story-item")

  for (let i = 0; i < storyItem.length; i++) {
    storyItem[i].addEventListener("click", () => {
      window.location = ("/story/storyList?memberNickname=" + storyItem[i].dataset.storyId)
    })
  }







  // 스토리 아이템 클릭 이벤트 처리
  const storyItems = document.querySelectorAll('.story-item');

  storyItems.forEach(item => {
    item.addEventListener('click', function () {
      const memberNickname = this.dataset.memberNickname;

      // 스토리 모달 URL 생성 및 이동
      const storyUrl = `${location.href.split("/")[2]}/story/${memberNickname}`;

      // AJAX를 통한 스토리 조회 상태 업데이트
      fetch(`/api/story/view/${memberNickname}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // 스토리 읽음 표시 업데이트
            this.querySelector('.story-wrapper').classList.add('viewed');

            // 애니메이션과 함께 스토리 정렬
            requestAnimationFrame(() => {
              // CSS 트랜지션을 위한 클래스 추가
              storiesContainer.classList.add('sorting');

              // 스토리 정렬 실행
              sortStories();

              // 트랜지션 완료 후 클래스 제거
              setTimeout(() => {
                storiesContainer.classList.remove('sorting');
              }, 300); // CSS 트랜지션 시간과 동일하게 설정
            });

            // 모달 열기
            window.location.href = storyUrl;
          }
        });
    });
  });



  // 네비게이션 버튼 기능
  function navigateStories(direction) {
    const storyWidth = 80; // 스토리 아이템 너비 + 마진
    const visibleStories = 6;
    const maxScroll = storiesContainer.scrollWidth - (storyWidth * visibleStories);

    if (direction === 'next') {
      currentPosition = Math.min(currentPosition + storyWidth, maxScroll);
    } else {
      currentPosition = Math.max(currentPosition - storyWidth, 0);
    }

    storiesContainer.scrollTo({
      left: currentPosition,
      behavior: 'smooth'
    });
  }

  // 네비게이션 버튼 이벤트 리스너
  document.querySelector('.nav-button.prev')?.addEventListener('click', () => navigateStories('prev'));
  document.querySelector('.nav-button.next')?.addEventListener('click', () => navigateStories('next'));
});



