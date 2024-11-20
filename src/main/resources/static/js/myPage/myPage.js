document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");
  const profileImageArea = document.getElementById("profileImageArea");
  const imageInput = document.getElementById("imageInput");
  const profileImg = document.getElementById("profileImg");

  tabButtons.forEach(button => {
      button.addEventListener("click", () => {
          // Remove active class from all tabs
          tabButtons.forEach(btn => btn.classList.remove("active"));
          tabContents.forEach(content => content.classList.remove("active"));

          // Add active class to current tab and content
          button.classList.add("active");
          const tab = document.getElementById(button.dataset.tab);
          tab.classList.add("active");
      });
  });

  // 이미지 영역 클릭 시 숨겨진 파일 입력 클릭
  profileImageArea.addEventListener("click", () => {
    imageInput.click();
  });
        // 파일 선택 후 미리보기 업데이트
        imageInput.addEventListener("change", (event) => {
          const file = event.target.files[0];
          if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                  const profileImg = document.getElementById("profileImg");
                  if (profileImg) {
                      profileImg.src = e.target.result; // 이미지 미리보기
                  }
              };
              reader.readAsDataURL(file);
          }
      });  
  });
