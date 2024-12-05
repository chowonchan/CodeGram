// story.js
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






  // const story
  // 스토리 아이템 클릭 이벤트 처리
  const storyItems = document.querySelectorAll('.story-item');

  storyItems.forEach((storyItem) => {
    storyItem.addEventListener('click', async (event) => {
      // 이미 로딩 중이거나 클릭된 아이템인 경우 중복 방지
      if (storyItem.classList.contains('loading') || storyItem.classList.contains('viewed')) {
        return;
      }
  
      // 로딩 상태 표시
      storyItem.classList.add('loading');
  
      const memberNickname = storyItem.dataset.storyId;
  
      try {
        // 첫 번째 fetch
        const firstResponse = await fetch(`/story/${memberNickname}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        // 응답 상태 확인
        if (!firstResponse.ok) {
          throw new Error(`첫 번째 요청 실패: ${firstResponse.status}`);
        }
  
        const firstData = await firstResponse.json();
  
        if (firstData.success) {
          // 뷰 상태 표시
          storyItem.querySelector('.story-wrapper').classList.add('viewed');
  
          // 두 번째 fetch
          const secondResponse = await fetch(`/api/another-endpoint/${memberNickname}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }
          });
  
          // 응답 상태 확인
          if (!secondResponse.ok) {
            throw new Error(`두 번째 요청 실패: ${secondResponse.status}`);
          }
  
          const secondData = await secondResponse.json();
          
          if (secondData.success) {
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
          }
  
          // 두 번째 fetch 결과 처리
          console.log(secondData);
        }
      } catch (error) {
        // 사용자에게 에러 피드백
        const errorToast = document.createElement('div');
        errorToast.classList.add('error-toast');
        errorToast.textContent = '오류가 발생했습니다. 다시 시도해 주세요.';
        document.body.appendChild(errorToast);
  
        // 토스트 메시지 자동 제거
        setTimeout(() => {
          errorToast.remove();
        }, 3000);
  
        // 실패 시 상태 롤백
        storyItem.classList.remove('loading');
        storyItem.querySelector('.story-wrapper')?.classList.remove('viewed');
  
        // 개발자를 위한 상세 에러 로깅
        console.error('요청 처리 중 오류:', error);
      } finally {
        // 로딩 상태 제거
        storyItem.classList.remove('loading');
      }
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



// -------------------------------------------------------------------------------------

// storyItems.forEach(storyItem => {
//   storyItem.addEventListener('click', function () {
//     const memberNickname = storyItem.dataset.storyId;

//     // 스토리 모달 URL 생성 및 이동
//     const storyUrl = `${location.href.split("/")[2]}/story/${memberNickname}`;

//     // AJAX를 통한 스토리 조회 상태 업데이트
//     // fetch(`/api/story/view/${memberNickname}`, {
//     fetch(`/api/story/view/${memberNickname}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
      
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         if (data.success) {
//           // 스토리 읽음 표시 업데이트
//           this.querySelector('.story-wrapper').classList.add('viewed');

//           // 애니메이션과 함께 스토리 정렬
//           requestAnimationFrame(() => {
//             // CSS 트랜지션을 위한 클래스 추가
//             storiesContainer.classList.add('sorting');

//             // 스토리 정렬 실행
//             sortStories();

//             // 트랜지션 완료 후 클래스 제거
//             setTimeout(() => {
//               storiesContainer.classList.remove('sorting');
//             }, 300); // CSS 트랜지션 시간과 동일하게 설정
//           });

//           // 모달 열기
//           window.location.href = storyUrl;
//         }
//       });
//   });
// });



// -------------------------------------------------------------------------------------

// storyItems.forEach(async (storyItem) => {
//   storyItem.addEventListener('click', async () => {
//   const memberNickname = storyItem.dataset.storyId;

//   try {
//     // 첫 번째 fetch
//     const firstResponse = await fetch(`/story/${memberNickname}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });
//     const firstData = await firstResponse.json();

//     if (firstData.success) {
//       storyItem.querySelector('.story-wrapper').classList.add('viewed');

//       // 두 번째 fetch
//       const secondResponse = await fetch(`/api/another-endpoint/${memberNickname}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       })
//       .then(response => response.json())
//       .then(data => {
//         if (data.success) {
//           // 스토리 읽음 표시 업데이트
//           storyItem.querySelector('.story-wrapper').classList.add('viewed');

//           // 애니메이션과 함께 스토리 정렬
//           requestAnimationFrame(() => {
//             // CSS 트랜지션을 위한 클래스 추가
//             storiesContainer.classList.add('sorting');

//             // 스토리 정렬 실행
//             sortStories();

//             // 트랜지션 완료 후 클래스 제거
//             setTimeout(() => {
//               storiesContainer.classList.remove('sorting');
//             }, 300); // CSS 트랜지션 시간과 동일하게 설정
//           });

//           // 모달 열기 (js로 가면 지워도됨)
//           // window.location.href = `/story/${memberNickname}`;
//         }
//       });

//       const secondData = await secondResponse.json();
      
//       // 두 번째 fetch 결과 처리
//       console.log(secondData);
//     }
//   } catch (error) {
//     console.error('Fetch error:', error);
//   }
// })
// });


// -------------------------------------------------------------------------------------

// storyItems.forEach((storyItem) => {
//   storyItem.addEventListener('click', async () => {
//     const memberNickname = storyItem.dataset.storyId;

//     try {
//       // 첫 번째 fetch
//       const firstResponse = await fetch(`/story/${memberNickname}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });
//       const firstData = await firstResponse.json();

//       if (firstData.success) {
//         storyItem.querySelector('.story-wrapper').classList.add('viewed');

//         // 두 번째 fetch
//         const secondResponse = await fetch(`/api/another-endpoint/${memberNickname}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           }
//         });
//         const secondData = await secondResponse.json();
        
//         if (secondData.success) {
//           // 애니메이션과 함께 스토리 정렬
//           requestAnimationFrame(() => {
//             // CSS 트랜지션을 위한 클래스 추가
//             storiesContainer.classList.add('sorting');

//             // 스토리 정렬 실행
//             sortStories();

//             // 트랜지션 완료 후 클래스 제거
//             setTimeout(() => {
//               storiesContainer.classList.remove('sorting');
//             }, 300); // CSS 트랜지션 시간과 동일하게 설정
//           });

//           // 모달 열기 (필요하다면)
//           // window.location.href = `/story/${memberNickname}`;
//         }

//         // 두 번째 fetch 결과 처리
//         console.log(secondData);
//       }
//     } catch (error) {
//       console.error('Fetch error:', error);
//     }
//   });
// });



// -------------------------------------------------------------------------------------

// storyItems.forEach((storyItem) => {
//   storyItem.addEventListener('click', async (event) => {
//     // 이미 로딩 중이거나 클릭된 아이템인 경우 중복 방지
//     if (storyItem.classList.contains('loading') || storyItem.classList.contains('viewed')) {
//       return;
//     }

//     // 로딩 상태 표시
//     storyItem.classList.add('loading');

//     const memberNickname = storyItem.dataset.storyId;

//     try {
//       // 첫 번째 fetch
//       const firstResponse = await fetch(`/story/${memberNickname}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });

//       // 응답 상태 확인
//       if (!firstResponse.ok) {
//         throw new Error(`첫 번째 요청 실패: ${firstResponse.status}`);
//       }

//       const firstData = await firstResponse.json();

//       if (firstData.success) {
//         // 뷰 상태 표시
//         storyItem.querySelector('.story-wrapper').classList.add('viewed');

//         // 두 번째 fetch
//         const secondResponse = await fetch(`/api/another-endpoint/${memberNickname}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           }
//         });

//         // 응답 상태 확인
//         if (!secondResponse.ok) {
//           throw new Error(`두 번째 요청 실패: ${secondResponse.status}`);
//         }

//         const secondData = await secondResponse.json();
        
//         if (secondData.success) {
//           // 애니메이션과 함께 스토리 정렬
//           requestAnimationFrame(() => {
//             // CSS 트랜지션을 위한 클래스 추가
//             storiesContainer.classList.add('sorting');

//             // 스토리 정렬 실행
//             sortStories();

//             // 트랜지션 완료 후 클래스 제거
//             setTimeout(() => {
//               storiesContainer.classList.remove('sorting');
//             }, 300); // CSS 트랜지션 시간과 동일하게 설정
//           });
//         }

//         // 두 번째 fetch 결과 처리
//         console.log(secondData);
//       }
//     } catch (error) {
//       // 사용자에게 에러 피드백
//       const errorToast = document.createElement('div');
//       errorToast.classList.add('error-toast');
//       errorToast.textContent = '작업 중 오류가 발생했습니다. 다시 시도해주세요.';
//       document.body.appendChild(errorToast);

//       // 토스트 메시지 자동 제거
//       setTimeout(() => {
//         errorToast.remove();
//       }, 3000);

//       // 실패 시 상태 롤백
//       storyItem.classList.remove('loading');
//       storyItem.querySelector('.story-wrapper')?.classList.remove('viewed');

//       // 개발자를 위한 상세 에러 로깅
//       console.error('요청 처리 중 오류:', error);
//     } finally {
//       // 로딩 상태 제거
//       storyItem.classList.remove('loading');
//     }
//   });
// });