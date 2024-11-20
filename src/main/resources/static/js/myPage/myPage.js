document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");
  const profileImageArea = document.getElementById("profileImageArea");
  const imageInput = document.getElementById("imageInput");
  const profileImg = document.getElementById("profileImg");
  const profileUploadForm = document.getElementById("profileUploadForm");

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

    // 프로필 이미지 클릭 시 파일 입력 창 열기
    profileImageArea.addEventListener("click", () => {
        imageInput.click();
    });

    // 파일 선택 시 바로 서버로 업로드
    imageInput.addEventListener("change", async (event) => {
        const file = event.target.files[0];

        if (file) {
            const formData = new FormData(profileUploadForm);

            try {
                const response = await fetch(profileUploadForm.action, {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    const result = await response.json(); // 서버에서 반환된 JSON 데이터
                    profileImg.src = result.imageUrl; // 새 이미지로 미리보기 업데이트
                    alert("프로필 이미지가 성공적으로 변경되었습니다.");
                } else {
                    alert("프로필 이미지 변경 중 오류가 발생했습니다.");
                }
            } catch (error) {
                console.error("업로드 중 오류:", error);
                alert("업로드 중 문제가 발생했습니다.");
            }
        }
    });

    const profileEditButton = document.querySelector(".profile-edit-button");

    profileEditButton.addEventListener("click", () => {
        window.location.href = "/myPage/editProfile"; // 프로필 편집 페이지 URL
    });


});