document.addEventListener("DOMContentLoaded", () => {
    // 모달 요소
    const profileModal = document.getElementById("profileModal");
    const cancelModal = document.getElementById("cancelModal");
    const uploadPhoto = document.getElementById("uploadPhoto");
    const deletePhoto = document.getElementById("deletePhoto");
    const profileImageArea = document.getElementById("profileImageArea");
    const profileImg = document.getElementById("profileImg");
    const defaultImageUrl = "/images/defaultImg.png";
    // 탭 버튼 및 탭 콘텐츠
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");
  
    // 프로필 편집 버튼
    const profileEditButton = document.querySelector(".profile-edit-button");
  
    // 모달 열기
    profileImageArea.addEventListener("click", () => {
    profileModal.style.display = "flex";
    });
  
  // 사진 업로드 옵션
  uploadPhoto.addEventListener("click", () => {
    imageInput.click();
    profileModal.style.display = "none";
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
  
// "삭제" 버튼 클릭 이벤트를 등록
deletePhoto.addEventListener("click", async () => {
    try {
      // 서버에 이미지 삭제 요청
      const response = await fetch("/myPage/deleteProfileImage", { // "/myPage/deleteProfileImage"로 POST 요청
        method: "POST", // HTTP 메서드는 POST 사용
      });
  
      // 서버로부터의 응답이 성공 상태인지 확인
      if (response.ok) {
        const result = await response.json(); // 서버에서 반환된 JSON 데이터

            if (result.status === "success") {
                profileImg.src = result.imageUrl; // 기본 이미지로 변경
                alert(result.message); // 성공 메시지 표시
            } else {
                alert(result.message || "이미지 삭제 중 오류가 발생했습니다.");
            }
        } else {
            alert("이미지 삭제 요청 중 문제가 발생했습니다.");
        }
    } catch (error) {
        console.error("삭제 중 오류:", error);
        alert("프로필 이미지 삭제 중 문제가 발생했습니다.");
    } finally {
        profileModal.style.display = "none"; // 모달 닫기
        document.body.classList.remove("modal-open"); // 스크롤 허용
    }
});
  

  // 취소 옵션
  cancelModal.addEventListener("click", () => {
    profileModal.style.display = "none";
  });
  
  // 모달 외부 클릭 시 닫기
  window.addEventListener("click", (event) => {
    if (event.target === profileModal) {
      profileModal.style.display = "none";
    }
  });
  
    // 프로필 편집 버튼 클릭 시 페이지 이동
    profileEditButton.addEventListener("click", () => {
      window.location.href = "/myPage/editProfile"; // 프로필 편집 페이지 URL
    });
  
    // 탭 버튼 클릭 시 탭 전환
    tabButtons.forEach(button => {
      button.addEventListener("click", () => {
        // 모든 탭 버튼과 콘텐츠에서 'active' 클래스 제거
        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabContents.forEach(content => content.classList.remove("active"));
  
        // 클릭된 탭 버튼과 관련 콘텐츠에 'active' 클래스 추가
        button.classList.add("active");
        const tab = document.getElementById(button.dataset.tab);
        if (tab) tab.classList.add("active");
      });
    });
  });
  