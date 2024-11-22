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

// 1. deletePhoto
// 이 변수는 "프로필 사진 삭제" 버튼 DOM 요소를 참조합니다.
// HTML에서 특정 버튼을 선택하여 이벤트를 추가하거나 조작할 때 사용합니다.
deletePhoto.addEventListener("click", async () => {
  // addEventListener
  // "deletePhoto"라는 버튼에 이벤트를 추가하는 메서드입니다.
  // 첫 번째 매개변수: "click" (클릭 이벤트)
  // 두 번째 매개변수: 클릭 시 실행할 콜백 함수

  // async
  // 비동기 작업(예: 서버 요청)을 처리할 때 사용됩니다.
  // 이 함수 안에서 `await` 키워드를 사용할 수 있게 합니다.

  try {
      // try
      // 에러가 발생할 가능성이 있는 코드를 감싸는 블록입니다.
      // 에러가 발생하면 catch 블록으로 넘어갑니다.

      // profileImg.src
      // "profileImg"는 현재 표시되고 있는 프로필 이미지 요소를 참조합니다.
      // ".src"는 이 이미지의 소스(이미지 파일 경로)를 변경하는 데 사용됩니다.

      profileImg.src = "/images/defaultImg.png";
      // "/images/defaultImg.png"
      // 기본 프로필 이미지의 경로입니다. 사용자가 프로필 사진을 삭제하면 기본 이미지를 보여줍니다.

      alert("프로필 사진이 기본 이미지로 변경되었습니다.");
      // alert
      // 사용자에게 메시지를 보여주는 브라우저의 내장 함수입니다.

      const response = await fetch("/myPage/profile/delete", {
          // fetch
          // 서버와 통신하기 위해 사용하는 함수입니다.
          // 첫 번째 매개변수: 요청을 보낼 URL ("/myPage/profile/delete").
          // 두 번째 매개변수: 요청 옵션 객체입니다.

          method: "POST"
          // method
          // HTTP 요청 메서드를 지정합니다. 여기서는 POST를 사용하여 서버에 데이터를 전달합니다.
      });

      // response
      // 서버에서 반환된 응답 객체를 저장하는 변수입니다.
      // 성공 여부, 상태 코드, 응답 본문 등 다양한 정보를 포함합니다.

      if (response.ok) {
          // response.ok
          // 응답 상태가 성공적(200번대)인지 확인하는 속성입니다.
          console.log("서버에서 프로필 이미지를 기본 이미지로 업데이트 완료.");
          // console.log
          // 디버깅 목적으로 메시지를 콘솔에 출력합니다.
      } else {
          // else
          // if 조건이 거짓(false)일 때 실행되는 블록입니다.
          console.error("서버 요청 오류:", response.statusText);
          // console.error
          // 오류 메시지를 콘솔에 출력합니다.
          // response.statusText
          // 서버 응답의 상태 메시지(예: "Not Found", "Internal Server Error")를 나타냅니다.
      }
  } catch (error) {
      // catch
      // try 블록에서 에러가 발생한 경우 실행됩니다.
      // error
      // 발생한 에러 정보를 저장하는 변수입니다.
      console.error("프로필 사진 삭제 요청 중 오류:", error);
  }

  profileModal.style.display = "none";
  // profileModal
  // 프로필 사진 변경 모달 창을 참조합니다.
  // style.display
  // HTML 요소의 CSS display 속성을 설정합니다.
  // "none"으로 설정하면 요소가 화면에서 숨겨집니다.
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
  