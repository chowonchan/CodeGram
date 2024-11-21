


// 좋아요 버튼
document.querySelectorAll('.like-button').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
  });
});

// 저장하기 버튼
document.querySelectorAll('.mark-button').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
  });
});

// 로그인 true, 비회원 false
const loginCheck = /*[[${session.loginMember != null}]]*/ false;
// 로그인한 회원 닉네임
const memberNickname = /*[[${session.loginMember?.memberNickname}]]*/ null;
// 상세조회한 게시글 정보
const boardDetail = /*[[${board}]]*/ null;