const feedModal = document.getElementById("feedModal");
const openModalButton = document.getElementById("openModalButton");

// 모달 열기 함수
const openModal = () => {
  feedModal.style.display = "flex";
};

// 모달 닫기 함수
const closeModal = () => {
  feedModal.classList.add("hidden");
};

// 모달 여는 버튼 클릭 이벤트
openModalButton.addEventListener("click", openModal);