
/* 좋아요 클릭 시 */
const boardLike = document.querySelector("#boardLike");
boardLike?.addEventListener("click", e => {

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
    .then(response => response.json())
    .then(result => {
      // 좋아요 결과가 담긴 result 객체의 check 값에 따라
      // 하트 아이콘을 비우기/채우기 지정
      if (result.check === 1) {
        boardLike.classList.add("fa-solid");
        boardLike.classList.remove("fa-regular");

        const content =
        `<strong>${loginMemberName}</strong>
        님이 좋아요를 누르셨습니다<br>`;

        // const memberNickname = document.querySelector("#userNickname").innerText;

        const url = `/member/${board.memberNickname}`
        // type, url, pkNo, content
        sendNoti(
          "boardLike",  // type
          url,  // 게시글 상세 조회 페이지 주소
          boardNo,  // 게시글 번호
          content
        );

      } else {
        boardLike.classList.add("fa-regular");
        boardLike.classList.remove("fa-solid");
      }
      // 좋아요 하트 카운트 내용을 
      // result.count로 변경
      const likeCount = document.querySelector("#likeCount");
      likeCount.innerText = result.count;
    })
    .catch(err => console.error(err));
});



/* MARK 클릭 시 */
const boardMark = document.querySelector("#boardMark");
boardMark?.addEventListener("click", e => {

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
      if (result.check === 1) {
        boardMark.classList.add("fa-solid");
        boardMark.classList.remove("fa-regular");
      } else {
        boardMark.classList.add("fa-regular");
        boardMark.classList.remove("fa-solid");
      }
    })
    .catch(err => console.error(err));
});



// 더 보기 버튼 클릭 이벤트
document.addEventListener('DOMContentLoaded', function () {
  const CONTENT_MAX_LENGTH = 200;
  const shortContentEl = document.getElementById('shortContent');
  const fullContentEl = document.getElementById('fullContent');
  const moreBtnEl = document.getElementById('moreBtn');

  // 타임리프에서 받아온 content (예시)
  const boardContent = /*[[${content}]]*/ null;

  if(boardContent?.length < CONTENT_MAX_LENGTH) {
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
    </div>
    
  `;

      wrapper.append(articleElement);
    });

    // 필요한 경우 새로 추가된 항목에 대한 이벤트 청취자 다시 연결
    // attachEventListeners();
  }

  // 이벤트 청취자를 동적 콘텐츠에 연결하는 기능
  // function attachEventListeners() {
  //   // 예: '더 보기' 버튼에 클릭 청취자 추가
  //   document.querySelectorAll('#moreBtn').forEach(btn => {
  //     btn.addEventListener('click', function() {
  //       const contentContainer = this.closest('#contentContainer');
  //       const shortContent = contentContainer.querySelector('#shortContent');
  //       const fullContent = contentContainer.querySelector('#fullContent');

  //       shortContent.style.display = 'none';
  //       fullContent.classList.remove('hidden-content');
  //       this.style.display = 'none';
  //     });
  //   });

  //   // 필요에 따라 동적 이벤트 청취자 추가
  // }

});

const mainFollowBtnList = document.querySelectorAll(".main-follow-btn");

mainFollowBtnList.forEach((mainFollowBtn,index) => {
  
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
