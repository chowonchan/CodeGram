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


function openModal(modalId) {
  document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// 모달 창 외부 클릭 시 닫기
window.onclick = function(event) {
  const modals = document.getElementsByClassName("modal");
  for (let modal of modals) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }
}

// 현재 날짜로 기본값 설정
window.onload = function() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // 월은 0부터 시작하므로 +1
  const currentDate = today.getDate();
  
  // 연도 옵션 생성 (1900년부터 현재 연도까지)
  const birthYear = document.getElementById("birthYear");
  for (let year = currentYear; year >= 1900; year--) {
  const option = document.createElement("option");
  option.value = year;
  option.text = year + "년";
  birthYear.appendChild(option);
  }
  birthYear.value = currentYear;
  
  // 월 옵션 생성 (1월부터 12월까지)
  const birthMonth = document.getElementById("birthMonth");
  for (let month = 1; month <= 12; month++) {
  const option = document.createElement("option");
  option.value = month;
  option.text = month + "월";
  birthMonth.appendChild(option);
  }
  birthMonth.value = currentMonth;
  
  // 일 옵션 생성 (1일부터 31일까지)
  const birthDay = document.getElementById("birthDay");
  for (let day = 1; day <= 31; day++) {
  const option = document.createElement("option");
  option.value = day;
  option.text = day + "일";
  birthDay.appendChild(option);
  }
  birthDay.value = currentDate;
  
  // 월과 연도에 따라 날짜 조정
  birthYear.addEventListener("change", updateDays);
  birthMonth.addEventListener("change", updateDays);
  
  function updateDays() {
  const selectedYear = birthYear.value;
  const selectedMonth = birthMonth.value;
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  
  birthDay.innerHTML = "";
  for (let day = 1; day <= daysInMonth; day++) {
  const option = document.createElement("option");
  option.value = day;
  option.text = day + "일";
  birthDay.appendChild(option);
  }
  
  // 기본 선택값 설정
  if (currentYear == selectedYear && currentMonth == selectedMonth) {
  birthDay.value = currentDate;
  } else {
  birthDay.value = 1;
  }
  }
}