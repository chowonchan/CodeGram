document.addEventListener("DOMContentLoaded", () => {
  const introductionField = document.getElementById("selfIntroduction");
  const charCount = document.getElementById("charCount");
  const saveButton = document.querySelector(".save-button");

  // 소개글 글자 수 업데이트
  introductionField.addEventListener("input", () => {
      charCount.textContent = introductionField.value.length;
  });

  // 저장 버튼 클릭 이벤트
  saveButton.addEventListener("click", async () => {
      const introduction = introductionField.value.trim();
      const recommendToggle = document.getElementById("recommendToggle").checked;
      const privateToggle = document.getElementById("privateToggle").checked;

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
                  recommendToggle: recommendToggle,
                  privateToggle: privateToggle,
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
