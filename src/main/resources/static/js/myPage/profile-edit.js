document.addEventListener("DOMContentLoaded", () => {
    // DOM 요소 참조
    const changePhotoButton = document.querySelector(".change-photo-button"); // 사진 변경 버튼
    const profileImg = document.querySelector("#profileImg"); // 현재 표시 중인 프로필 이미지
    const imageInput = document.querySelector("#imageInput"); // 숨겨진 파일 입력 창
    const defaultImageUrl = "/images/defaultImg.png"; // 기본 프로필 이미지 경로
    const modal = document.getElementById("profileModal"); // 모달 창 (이전에 정의된 모달)
    const cancelModal = document.getElementById("cancelModal");
    const uploadPhoto = document.getElementById("uploadPhoto");
    const deletePhoto = document.getElementById("deletePhoto");
    const introductionField = document.getElementById("selfIntroduction");
    const charCount = document.getElementById("charCount");
    const saveButton = document.querySelector(".save-button");

    // 공통 로직: 현재 이미지가 기본 이미지인지 확인하고 동작 수행
    const handleProfileClick = () => {
        const currentImageSrc = profileImg.getAttribute("src"); // 현재 이미지의 경로를 가져옴

        if (currentImageSrc === defaultImageUrl) {
            // 1. 기본 프로필 이미지일 경우
            // 숨겨진 파일 입력 창 열기
            imageInput.click(); 
        } else {
            // 2. 기본 이미지가 아닐 경우
            // 모달 창 열기
            if (modal) {
                modal.style.display = "flex"; // 모달을 화면에 표시
            } else {
                // 모달이 정의되지 않은 경우
                alert("모달 창이 정의되지 않았습니다."); // 사용자에게 알림
            }
        }
    };


    // 사진 변경 버튼 클릭 시 이벤트 리스너 연결
    changePhotoButton.addEventListener("click", handleProfileClick);

    // 프로필 이미지 영역 클릭 시 이벤트 리스너 연결
    profileImageArea.addEventListener("click", handleProfileClick);

    // 모달 외부를 클릭하면 모달 닫기
    if (modal) {
        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none"; // 모달 창 닫기
            }
        });
    }

    // 모달 취소 버튼 클릭 시 모달 닫기
    cancelModal.addEventListener("click", () => {
        modal.style.display = "none"; // 모달 창 숨기기
    });

    // 숨겨진 파일 입력 창에서 파일이 선택될 때 실행
    imageInput.addEventListener("change", async (event) => {
        const file = event.target.files[0]; // 사용자가 선택한 파일 가져오기

        if (file) {
            // 파일이 선택된 경우
            const formData = new FormData(); // 파일 데이터를 담을 FormData 객체 생성
            formData.append("profileImg", file); // FormData에 파일 추가

            try {
                // 서버로 파일 업로드 요청
                const response = await fetch("/myPage/profile", {
                    method: "POST", // HTTP POST 메서드 사용
                    body: formData, // 파일 데이터를 요청 본문으로 전송
                });

                if (response.ok) {
                    // 서버 응답이 성공인 경우
                    const result = await response.json(); // 서버에서 반환된 JSON 데이터 파싱
                    profileImg.src = result.imageUrl; // 프로필 이미지 요소의 src 속성을 업데이트
                    alert("프로필 이미지가 성공적으로 변경되었습니다."); // 사용자에게 성공 알림
                } else {
                    // 서버 응답이 실패인 경우
                    alert("프로필 이미지 변경 중 오류가 발생했습니다."); // 사용자에게 오류 알림
                }
            } catch (error) {
                // 요청 중 네트워크 오류 발생
                console.error("업로드 중 오류:", error); // 디버깅을 위한 오류 메시지 출력
                alert("업로드 중 문제가 발생했습니다. 다시 시도해주세요."); // 사용자에게 오류 알림
            }
        }
    });

    // 모달 내부의 옵션 중 '사진 업로드' 클릭 시 파일 입력 창 열기
    document.getElementById("uploadPhoto").addEventListener("click", () => {
        imageInput.click(); // 파일 입력 창 열기
        modal.style.display = "none"; // 모달 닫기
    });

    // 모달 내부의 옵션 중 '취소' 클릭 시 모달 닫기
    cancelModal.addEventListener("click", () => {
        modal.style.display = "none"; // 모달 닫기
    });

    // 모달 내부의 옵션 중 '사진 삭제' 클릭 시
    document.getElementById("deletePhoto").addEventListener("click", async () => {
 // 공통 로직: 현재 이미지가 기본 이미지인지 확인하고 동작 수행
 const handleProfileClick = () => {
    const currentImageSrc = profileImg.getAttribute("src"); // 현재 이미지의 경로를 가져옴

    if (currentImageSrc === defaultImageUrl) {
        // 1. 기본 프로필 이미지일 경우
        // 숨겨진 파일 입력 창 열기
        imageInput.click(); 
    } else {
        // 2. 기본 이미지가 아닐 경우
        // 모달 창 열기
        if (modal) {
            modal.style.display = "flex"; // 모달을 화면에 표시
        } else {
            // 모달이 정의되지 않은 경우
            alert("모달 창이 정의되지 않았습니다."); // 사용자에게 알림
        }
    }
};

// 사진 변경 버튼 클릭 시 이벤트 리스너 연결
changePhotoButton.addEventListener("click", handleProfileClick);

// 프로필 이미지 영역 클릭 시 이벤트 리스너 연결
profileImageArea.addEventListener("click", handleProfileClick);

// 모달 외부를 클릭하면 모달 닫기
if (modal) {
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none"; // 모달 창 닫기
        }
    });
}

// 모달 취소 버튼 클릭 시 모달 닫기
cancelModal.addEventListener("click", () => {
    modal.style.display = "none"; // 모달 창 숨기기
});

// 숨겨진 파일 입력 창에서 파일이 선택될 때 실행
imageInput.addEventListener("change", async (event) => {
    const file = event.target.files[0]; // 사용자가 선택한 파일 가져오기

    if (file) {
        // 파일이 선택된 경우
        const formData = new FormData(); // 파일 데이터를 담을 FormData 객체 생성
        formData.append("profileImg", file); // FormData에 파일 추가

        try {
            // 서버로 파일 업로드 요청
            const response = await fetch("/myPage/profile", {
                method: "POST", // HTTP POST 메서드 사용
                body: formData, // 파일 데이터를 요청 본문으로 전송
            });

            if (response.ok) {
                // 서버 응답이 성공인 경우
                const result = await response.json(); // 서버에서 반환된 JSON 데이터 파싱
                profileImg.src = result.imageUrl; // 프로필 이미지 요소의 src 속성을 업데이트
                alert("프로필 이미지가 성공적으로 변경되었습니다."); // 사용자에게 성공 알림
            } else {
                // 서버 응답이 실패인 경우
                alert("프로필 이미지 변경 중 오류가 발생했습니다."); // 사용자에게 오류 알림
            }
        } catch (error) {
            // 요청 중 네트워크 오류 발생
            console.error("업로드 중 오류:", error); // 디버깅을 위한 오류 메시지 출력
            alert("업로드 중 문제가 발생했습니다. 다시 시도해주세요."); // 사용자에게 오류 알림
        }
    }
});

// 모달 내부의 옵션 중 '사진 업로드' 클릭 시 파일 입력 창 열기
document.getElementById("uploadPhoto").addEventListener("click", () => {
    imageInput.click(); // 파일 입력 창 열기
    modal.style.display = "none"; // 모달 닫기
});

// 모달 내부의 옵션 중 '취소' 클릭 시 모달 닫기
cancelModal.addEventListener("click", () => {
    modal.style.display = "none"; // 모달 닫기
});
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


introductionField.addEventListener("input", () => {
    charCount.textContent = introductionField.value.length;
});

saveButton.addEventListener("click", async () => {
    const introduction = introductionField.value.trim();
    const privateToggle = document.getElementById("privateToggle").checked ? 2 : 1; // 선택 시 2, 비선택 시 1

    if (introduction.length > 1000) {
        alert("소개글은 최대 1000자까지 입력 가능합니다.");
        return;
    }

    try {
        const response = await fetch("/myPage/updateProfile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                selfIntroduction: introduction,
                memberDisclosureScope: privateToggle,
            }),
        });

        const result = await response.json();

        if (result.status === "success") {
            alert("프로필이 성공적으로 저장되었습니다.");
        } else {
            alert("프로필 저장 중 오류가 발생했습니다.");
        }
    } catch (error) {
        console.error("프로필 저장 중 오류:", error);
        alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
});


});