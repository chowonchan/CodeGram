const boardArticles = document.querySelectorAll(".board-article");

boardArticles.forEach(boardArticle => {
  const boardLikeCount = boardArticle.querySelector(".likeCount");
  const heart = boardArticle.querySelector(".fa-heart");
  const bookMark = boardArticle.querySelector(".fa-bookmark");
  heart?.addEventListener("click", e => {
    const boardNo = boardArticle.dataset.boardNo;
    // 1. 로그인 여부 검사
    if (loginCheck === false) {
      alert("로그인 후 이용해 주세요");
      return;
    }

    // 2. 비동기로 좋아요 요청
    fetch("/board/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: boardNo
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("좋아요 실패");
      })
      .then(result => {
        console.log("heart : ", heart);

        // 좋아요 결과가 담긴 result 객체의 check 값에 따라
        // 하트 아이콘을 비우기/채우기 지정
        if (result.check === 'insert') { // 채우기
          heart.classList.add("fa-solid", "liked");
          heart.classList.remove("fa-regular");

          boardLikeCount.textContent = parseInt(boardLikeCount.textContent) + 1;

          const content =
            `<strong>${loginMemberName}</strong>
          님이 좋아요를 누르셨습니다<br>`;

          const url = `/member/${memberNickname}`
          // type, url, pkNo, content
          sendNoti(
            "boardLike",  // type
            url,  // 게시글 상세 조회 페이지 주소
            boardNo,  // 게시글 번호
            content
          );

        } else { // 비우기
          heart.classList.add("fa-regular");
          heart.classList.remove("fa-solid", "liked");

          boardLikeCount.textContent = parseInt(boardLikeCount.textContent) - 1;
        }

      })
      .catch(err => console.error(err));


  })

  bookMark?.addEventListener("click", () => {
    const boardNo = boardArticle.dataset.boardNo;
    // 1. 로그인 여부 검사
    if (loginCheck === false) {
      alert("로그인 후 이용해 주세요");
      return;
    }

    // 2. 비동기로 mark 요청 
    fetch("/board/mark", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: boardNo
    })
      .then(response => response.json())
      .then(result => {
        // mark 결과가 담긴 result 객체의 check 값에 따라
        // mark 아이콘을 비우기/채우기 지정
        if (result.check === "insert") {
          bookMark.classList.add("fa-solid");
          bookMark.classList.remove("fa-regular");
        }
        if (result.check === "delete") {
          bookMark.classList.add("fa-regular");
          bookMark.classList.remove("fa-solid");
        }
      })
      .catch(err => console.error(err));
  })
});

// 더 보기 버튼 클릭 이벤트
document.addEventListener('DOMContentLoaded', function () {
  const CONTENT_MAX_LENGTH = 200;
  const shortContentEl = document.getElementById('shortContent');
  const fullContentEl = document.getElementById('fullContent');
  const moreBtnEl = document.getElementById('moreBtn');

  // const boardNo = boardArticle.dataset.boardNo;

  // 타임리프에서 받아온 content (예시)
  const boardContent = /*[[${content}]]*/ null;

  if (boardContent?.length < CONTENT_MAX_LENGTH) {
    moreBtnEl.style.display = 'none';
  }

  if (boardContent?.length > CONTENT_MAX_LENGTH) {
    shortContentEl.textContent = boardContent.substring(0, CONTENT_MAX_LENGTH);
    fullContentEl.textContent = boardContent;

    moreBtnEl?.addEventListener('click', function () {
      shortContentEl.style.display = 'none';
      fullContentEl.style.display = 'block';
      moreBtnEl.style.display = 'none';
    });
  } else {
    // shortContentEl.textContent = boardContent;
    // moreBtnEl.style.display = 'none';
  }
});



// -------------------------------------------------------------------------
// 무한스크롤

let currentPage = 1; // 현재 페이지, fetch 수행 시 마다 증가

document.addEventListener('DOMContentLoaded', function () {
  // IntersectionObserver : 보고있는 화면에 요소가 나타나는지 감지
  let intersectionObserver = new IntersectionObserver(function (entries) {
    // intersectionRatio가 0이라는 것은 대상을 볼 수 없다는 것이므로
    // 아무것도 하지 않음
    if (entries[0].intersectionRatio <= 0) return;

    // console.log("새 항목 불러옴");
    fetchMoreFeedItems()
  });
  // 주시 시작
  intersectionObserver.observe(document.querySelector("#SCmainFooter"));



  async function fetchMoreFeedItems() {
    try {
      // 피드 항목을 가져올 때 이 URL을 실제 백엔드 엔드포인트로 대체합니다
      const response = await fetch(`/api/feed?cp=${++currentPage}`);

      if (!response.ok) {
        throw new Error('오류가 발생했습니다');
      }

      const data = await response.json();

      // 새 피드 항목 렌더링
      renderFeedItems(data.feedList);

      return data;
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
      articleElement.dataset.boardNo = board.boardNo;

      // 게시판 데이터로 기사 채우기(원래 HTML과 동일한 구조 사용)
      articleElement.innerHTML = `
    <div class="post">
        <div class="post-header post-header-padding">
            <div class="board-profile">
                <div class="user-profile inline-block">
                    <a href="/member/${board.memberNickname}">
                        <div class="user-profile-img pointer radius">
                            ${board.profileImg 
                                ? `<img src="${board.profileImg}">`
                                : `<img src="https://via.placeholder.com/50">`
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                <button class="slider-button next-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>

                <div class="image-track">
                    ${board.imageList.map((img, index) => `
                        <div class="post-image-box">
                            <img src="${img.imgPath}${img.imgRename}" class="post-image">
                        </div>
                    `).join('')}
                </div>
                <div class="slider-dots"></div>
            </div>
        </div>

        <div class="important-box">
            <section class="section-1">
                <div class="box-1">
                    <button class="action-button like-button pointer">
                        <div class="action-button-div">
                            <span class="fa-heart ${board.likeCheck === 1 ? 'fa-solid liked' : 'fa-regular'}"></span>
                        </div>
                    </button>
                    <button class="action-button comment-button pointer">
                        <div class="action-button-div">
                            <div class="fa-regular fa-comment" data-board-no="${board.boardNo}"></div>
                        </div>
                    </button>
                </div>
                <div class="box-2">
                    <div class="action-button mark-button pointer boardMark" data-member-no="${board.boardNo}">
                        <div class="action-button-div">
                            <div class="fa-bookmark ${board.markCheck === 1 ? 'fa-solid' : 'fa-regular'}"></div>
                        </div>
                    </div>
                </div>
            </section>

            <div>좋아요 <span class="likeCount">${board.likeCount}</span>개</div>
            <div class="post-caption contentContainer">
                <span class="feed-imp-Nick">${board.memberNickname}</span>
                
                ${board.boardContent && board.boardContent.length > 200 
                    ? `
                    <span class="fullContent hidden-content">${board.boardContent}</span>
                    <br>
                    <span class="more-btn pointer">더 보기</span>
                    `
                    : `
                    <span class="shortContent">${board.boardContent || ''}</span>
                    `
                }
            </div>
            <a href="${board.boardNo}">
                댓글 <span>[${board.commentCount}]</span>개 보기...
            </a>
        </div>
    </div>
  `
  ;

  wrapper.append(articleElement);

  const heart = articleElement.querySelector(".fa-heart");
  const bookMark = articleElement.querySelector(".fa-bookmark");
  const boardLikeCount = articleElement.querySelector(".likeCount");
  
 // initializeSliders(); // 슬라이더 버튼 초기화 및 실행 함수
document.addEventListener('DOMContentLoaded', function () {
  function initializeSliders() {
    const sliders = document.querySelectorAll('.image-slider');

    sliders.forEach(slider => {
      const track = slider.querySelector('.image-track');
      const images = track.querySelectorAll('.post-image');
      const prevButton = slider.querySelector('.prev-button');
      const nextButton = slider.querySelector('.next-button');
      const dotsContainer = slider.querySelector('.slider-dots');

      let currentIndex = 0;
      let startX = 0;
      let isDragging = false;
      let touchStartTime = 0;
      let removeListeners;

      // 이미지 개수에 맞춰 동적으로 닷츠 생성
      if (images.length > 1) {
        dotsContainer.innerHTML = Array.from(images)
          .map((_, i) => `<span class="dot${i === 0 ? ' active' : ''}"></span>`)
          .join('');
      }

      const dots = slider.querySelectorAll('.dot');

      function updateSlider(animate = true) {
        track.style.transition = animate ? 'transform 0.3s ease-in-out' : 'none';
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // 닷의 활성 상태 업데이트
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex);
        });

        // 버튼의 표시 여부 업데이트
        if (prevButton) prevButton.style.display = currentIndex === 0 ? 'none' : 'flex';
        if (nextButton) nextButton.style.display = currentIndex === images.length - 1 ? 'none' : 'flex';
      }


      function handleDragStart(e) {
        isDragging = true;
        startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
        touchStartTime = Date.now();
        updateSlider(false);
      }

      function handleDragMove(e) {
        if (!isDragging) return;

        const x = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
        const walk = x - startX;
        const minSwipeDistance = 50;
        const maxSwipeTime = 300;

        if (Math.abs(walk) > minSwipeDistance &&
          Date.now() - touchStartTime < maxSwipeTime) {
          isDragging = false;

          if (walk > 0 && currentIndex > 0) {
            currentIndex--;
          } else if (walk < 0 && currentIndex < images.length - 1) {
            currentIndex++;
          }

          updateSlider(true);
        }
      }

      function handleDragEnd() {
        isDragging = false;
        updateSlider(true);
      }

      // 이벤트 리스너 설정
      function setupListeners() {
        if (prevButton) {
          prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentIndex > 0) {
              currentIndex--;
              updateSlider();
            }
          });
        }

        if (nextButton) {
          nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentIndex < images.length - 1) {
              currentIndex++;
              updateSlider();
            }
          });
        }

        dots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
          });
        });

        // 터치/드래그 이벤트
        track.addEventListener('touchstart', handleDragStart);
        track.addEventListener('mousedown', handleDragStart);
        track.addEventListener('touchmove', handleDragMove);
        track.addEventListener('mousemove', handleDragMove);
        track.addEventListener('touchend', handleDragEnd);
        track.addEventListener('mouseup', handleDragEnd);
        track.addEventListener('mouseleave', handleDragEnd);
      }

      // 이벤트 리스너 제거 함수
      removeListeners = () => {
        track.removeEventListener('touchstart', handleDragStart);
        track.removeEventListener('mousedown', handleDragStart);
        track.removeEventListener('touchmove', handleDragMove);
        track.removeEventListener('mousemove', handleDragMove);
        track.removeEventListener('touchend', handleDragEnd);
        track.removeEventListener('mouseup', handleDragEnd);
        track.removeEventListener('mouseleave', handleDragEnd);
      };

      // 이미지가 1개 이하면 슬라이더 컨트롤 숨김
      if (images.length <= 1) {
        if (prevButton) prevButton.style.display = 'none';
        if (nextButton) nextButton.style.display = 'none';
        if (dotsContainer) dotsContainer.style.display = 'none';
        return;
      }

      // 초기 설정
      setupListeners();
      updateSlider();

      // 메모리 누수 방지를 위한 클린업
      slider.cleanup = removeListeners;
    });
  }

  // 슬라이더 초기화 실행
  initializeSliders();
});



  
      const a = articleElement.querySelector(".important-box a");
      a.addEventListener("click", e => {
        e.preventDefault();
        // const boardNo = a.href.split("/").pop();
        openDetail(board.boardNo);
      })
      const mainCommentBtn = articleElement.querySelector(".fa-comment");
      mainCommentBtn.addEventListener("click", e => {
        e.preventDefault();
        openDetail(board.boardNo);
      })



      heart?.addEventListener("click", e => {
        const boardNo = articleElement.dataset.boardNo;
        // 1. 로그인 여부 검사
        if (loginCheck === false) {
          alert("로그인 후 이용해 주세요");
          return;
        }

        // 2. 비동기로 좋아요 요청
        fetch("/board/like", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: boardNo
        })
          .then(response => {
            if (response.ok) return response.json();
            throw new Error("좋아요 실패");
          })
          .then(result => {
            console.log("heart : ", heart);

            // 좋아요 결과가 담긴 result 객체의 check 값에 따라
            // 하트 아이콘을 비우기/채우기 지정
            if (result.check === 'insert') { // 채우기
              heart.classList.add("fa-solid", "liked");
              heart.classList.remove("fa-regular");

              boardLikeCount.textContent = parseInt(boardLikeCount.textContent) + 1;

              const content =
                `<strong>${loginMemberName}</strong>
              님이 좋아요를 누르셨습니다<br>`;

              const url = `/member/${memberNickname}`
              // type, url, pkNo, content
              sendNoti(
                "boardLike",  // type
                url,  // 게시글 상세 조회 페이지 주소
                boardNo,  // 게시글 번호
                content
              );

            } else { // 비우기
              heart.classList.add("fa-regular");
              heart.classList.remove("fa-solid", "liked");

              boardLikeCount.textContent = parseInt(boardLikeCount.textContent) - 1;
            }

          })
          .catch(err => console.error(err));


      })

      bookMark?.addEventListener("click", () => {
        const boardNo = articleElement.dataset.boardNo;
        // 1. 로그인 여부 검사
        if (loginCheck === false) {
          alert("로그인 후 이용해 주세요");
          return;
        }

        // 2. 비동기로 mark 요청 
        fetch("/board/mark", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: boardNo
        })
          .then(response => response.json())
          .then(result => {
            // mark 결과가 담긴 result 객체의 check 값에 따라
            // mark 아이콘을 비우기/채우기 지정
            if (result.check === "insert") {
              bookMark.classList.add("fa-solid");
              bookMark.classList.remove("fa-regular");
            }
            if (result.check === "delete") {
              bookMark.classList.add("fa-regular");
              bookMark.classList.remove("fa-solid");
            }
          })
          .catch(err => console.error(err));
      })

    
    });
  }
});


const mainFollowBtnList = document.querySelectorAll(".main-follow-btn");
const recommendNicknames1 = document.querySelectorAll(".recommend-user-img");
const recommendNicknames2 = document.querySelectorAll(".recommend-user-info");


mainFollowBtnList.forEach((mainFollowBtn, index) => {

  // 추천 팔로우 회원 프로필 페이지 이동
  recommendNicknames1[index].addEventListener("click", () => {
    const recommendNickname = document.querySelectorAll(".recommend-user-nickname")[index].innerText
    window.location.href = `/member/${recommendNickname}`
  })
  recommendNicknames2[index].addEventListener("click", () => {
    const recommendNickname = document.querySelectorAll(".recommend-user-nickname")[index].innerText
    window.location.href = `/member/${recommendNickname}`
  })


  mainFollowBtn.addEventListener("click", async () => {
    if (mainFollowBtn.disabled) {
      console.warn("[팔로우 버튼] 이미 요청 처리 중입니다.");
      return;
    }

    mainFollowBtn.disabled = true; // 요청 시작 시 버튼 비활성화
    console.log("[팔로우 버튼] 클릭 이벤트 발생");

    const nickname = document.querySelectorAll(".recommend-user-nickname")[index].innerText
    console.log(nickname);

    try {

      if (!nickname) {
        console.error("[팔로우 버튼] 닉네임을 URL에서 추출할 수 없습니다.");
        return;
      }

      let response;
      let actionType;

      if (mainFollowBtn.textContent === "팔로우") {
        response = await fetch(`/follow/${nickname}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        actionType = "FOLLOW";
      } else {
        response = await fetch(`/follow/${nickname}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        actionType = "UNFOLLOW";
      }

      if (response.ok) {
        const result = await response.json();
        alert(result.message);

        if (actionType === "FOLLOW") {
          mainFollowBtn.textContent = "팔로잉";
          mainFollowBtn.classList.add("main-following");

          console.log(`[팔로우 버튼] 팔로우 성공: ${result.message}`);

          sendNoti(
            "follow",
            `/member/${loginMemberNickname}`,
            result.followerMemberNo,
            `<strong>${loginMemberNickname}</strong>님이 회원님을 
            <br>
            팔로우하기 시작했습니다.`
          );

        } else {
          mainFollowBtn.textContent = "팔로우";
          mainFollowBtn.classList.remove("main-following");
          console.log(`[팔로우 버튼] 팔로우 취소 성공: ${result.message}`);
        }
      } else {
        console.error("[팔로우 버튼] 요청 실패:", response.statusText);
        alert("요청 처리 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("[팔로우 버튼] 요청 중 오류 발생:", error);
      alert("요청 처리 중 문제가 발생했습니다. 네트워크 상태를 확인하세요.");
    } finally {
      mainFollowBtn.disabled = false; // 요청 완료 후 버튼 활성화
      console.log("[팔로우 버튼] 요청 처리 완료");
    }
  });
})


document.addEventListener("DOMContentLoaded", () => {
  const mainCommentBtn = document.querySelectorAll(".fa-comment");
  const openopen = document.querySelectorAll(".important-box a");
  openopen.forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      const boardNo = a.href.split("/").pop();
      openDetail(boardNo);
    })
  });
  mainCommentBtn.forEach(mainCommentBtn => {
    mainCommentBtn.addEventListener("click", e => {
      e.preventDefault();
      const boardNo = mainCommentBtn.dataset.boardNo;
      openDetail(boardNo);
    })
  });
});