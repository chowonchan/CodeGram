document.addEventListener("DOMContentLoaded", () => {
  // HTML 요소 가져오기
  const loginForm = document.getElementById("loginFor");
  const memberIdInput = document.querySelector("input[name='memberId']");
  const memberPwInput = document.querySelector("input[name='memberPw']");
  const loginButton = loginForm.querySelector("button");
  const signupFindArea = document.querySelector(".signup-find-area");
  const loginMessageDiv = document.createElement("div");
  loginMessageDiv.id = "loginMessage";
  loginForm.insertBefore(loginMessageDiv, signupFindArea);

  // 유효성 검사 및 메시지 표시 함수
  function showMessage(message, type = "error") {
    loginMessageDiv.innerText = message;
    loginMessageDiv.className = type; // "error" 또는 "success"
  }

  // 로그인 버튼 클릭 시 유효성 검사 및 로그인 요청
  loginButton.addEventListener("click", (event) => {
    event.preventDefault();

    const memberId = memberIdInput.value.trim();
    const memberPw = memberPwInput.value.trim();

    // 기본 유효성 검사
    if (memberId === "") {
      showMessage("아이디를 입력해 주세요.");
      memberIdInput.focus();
      return;
    }

    if (memberPw === "") {
      showMessage("비밀번호를 입력해 주세요.");
      memberPwInput.focus();
      return;
    }

    // 서버로 로그인 요청 보내기
    fetch("/member/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ memberId, memberPw }),
    })
      .then((response) => {
        console.log("응답 상태 코드:", response.status);
        if (response.redirected) {
          window.location.href = response.url; // 성공 시 리다이렉트
        } else if (response.ok) {
          return response.json(); // JSON 응답을 파싱
        }
        throw new Error("로그인 요청 실패");
      })
      .then((data) => {
        if (data && data.message) {
          showMessage(data.message, "error"); // 서버에서 받은 실패 메시지 표시
        }
      })
      .catch((error) => {
        console.error("오류:", error);
        showMessage("서버와의 통신에 문제가 발생했습니다.", "error");
      });
  });
});
