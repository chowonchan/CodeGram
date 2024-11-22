


// 좋아요 버튼
document.querySelectorAll('.like-button').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
  });
});

// 저장하기 버튼
document.querySelectorAll('.save-button').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
  });
});