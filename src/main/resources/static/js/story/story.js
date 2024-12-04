// ====================================================================================================

// 스토리 삭제
const storyDeleteBtn = document.getElementById("storyDeleteBtn");

storyDeleteBtn.addEventListener("click", () => {

    if (confirm("정말 삭제 하시겠습니까?") === false) {
        return;
    }

    // 주소 맨 뒷부분을 가져오는 함수
    const storyUrlSplit = location.pathname.split("/");
    const storyNo = storyUrlSplit[storyUrlSplit.length - 1];
    const memberNickname = storyUrlSplit[storyUrlSplit.length - 2];

    fetch('/story', {
        method : 'PUT',
        headers: {'Content-Type': 'application/json'},  // 잘못 작성되면 415 미디어타입 오류
        body   : storyNo
    })
        .then(response => {
            if (response.ok) return response.text();
            throw new Error("Story 삭제 실패");
            alert("서버 통신 오류");
        })
        .then(result => {
            if (result > 0) {
                alert("Story가 삭제되었습니다");
                location.href = "/member/" + memberNickname;
            } else {
                alert("스토리 삭제 실패");
            }
        })
        .catch(err => console.error(err));
});

// ====================================================================================================
// 이 계정 정보


// ====================================================================================================


// ====================================================================================================


// ====================================================================================================


// ====================================================================================================


// ====================================================================================================
