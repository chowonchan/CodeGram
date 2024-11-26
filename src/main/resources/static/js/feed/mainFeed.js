



















/* 좋아요 클릭 시 */
const boardLike = document.querySelector("#boardLike");
boardLike.addEventListener("click", e => {

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

        // type, url, pkNo, content
        sendNoti(
          "boardLike",  // type
          location.pathname,  // 게시글 상세 조회 페이지 주소
          board.boardNo,  // 게시글 번호
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
boardMark.addEventListener("click", e => {

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



// 더보기 버튼 클릭 이벤트
document.addEventListener('DOMContentLoaded', function() {
  const CONTENT_MAX_LENGTH = 200;
  const shortContentEl = document.getElementById('shortContent');
  const fullContentEl = document.getElementById('fullContent');
  const moreBtnEl = document.getElementById('moreBtn');

  // 타임리프에서 받아온 content (예시)
  const boardContent = /*[[${content}]]*/ null; 

  if (boardContent.length > CONTENT_MAX_LENGTH) {
      shortContentEl.textContent = boardContent.substring(0, CONTENT_MAX_LENGTH);
      fullContentEl.textContent = boardContent;

      moreBtnEl.addEventListener('click', function() {
          shortContentEl.style.display = 'none';
          fullContentEl.style.display = 'block';
          moreBtnEl.style.display = 'none';
      });
  } else {
      shortContentEl.textContent = boardContent;
      moreBtnEl.style.display = 'none';
  }
});

