document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------------- 로그인 기능 ------------------------------- */
  const loginForm = document.getElementById("loginFor");
  const memberIdInput = document.querySelector("input[name='memberId']");
  const memberPwInput = document.querySelector("input[name='memberPw']");
  const loginButton = loginForm.querySelector("button");
  const loginMessageDiv = document.createElement("div");
  loginMessageDiv.id = "loginMessage";
  loginForm.insertBefore(loginMessageDiv, loginForm.lastElementChild);

  // 로그인 버튼 클릭 이벤트
  loginButton.addEventListener("click", (event) => {
    event.preventDefault();

    const memberId = memberIdInput.value.trim();
    const memberPw = memberPwInput.value.trim();

    // 유효성 검사
    if (memberId === "") {
      showMessage("아이디를 입력해 주세요.", "error");
      memberIdInput.focus();
      return;
    }

    if (memberPw === "") {
      showMessage("비밀번호를 입력해 주세요.", "error");
      memberPwInput.focus();
      return;
    }

  // 서버로 로그인 요청
  fetch("/member/login", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ memberId, memberPw }),
  })
    .then((response) => {
      if (response.redirected) {
        showMessage("로그인 성공!", "success");
        setTimeout(() => {
          window.location.href = response.url; // 메인 페이지로 리다이렉트
        }, 1000);
        return;
      } 
      if (response.ok) {
        return response.json();
      }
      throw new Error("로그인 요청 실패");
    })
    .then((data) => {
      if (data && data.message) {
        showMessage(data.message, "error");
        setTimeout(() => {
          window.location.href = "/member/login"; // 로그인 페이지로 리다이렉트
        }, 1000);
      }
    })
    .catch((error) => {
      console.error("오류:", error);
      showMessage("서버와의 통신에 문제가 발생했습니다.", "error");
    });
  });

  // 로그인 메시지 표시 함수
  function showMessage(message, type = "error") {
    loginMessageDiv.innerText = message;
    loginMessageDiv.className = type;
  }

  /* ----------------------------- 모달 표시 기능 ----------------------------- */
  const modal = document.getElementById("findModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const idInput = document.getElementById("idInput");

  // 모달 열기 함수
  window.openModal = function (mode) {
    if (mode === "id") {
      modalTitle.innerText = "ID 찾기";
      modalDescription.innerText = "가입한 이름, 이메일, 생년월일을 입력하세요.";
      idInput.style.display = "none";
      document.getElementById("findButton").innerText = "ID 찾기";
    } else if (mode === "pw") {
      modalTitle.innerText = "PW 찾기";
      modalDescription.innerText = "가입한 이름, 이메일, 생년월일, 그리고 아이디를 입력하세요.";
      idInput.style.display = "block";
      document.getElementById("findButton").innerText = "비밀번호 변경";
    }
    modal.style.display = "flex"; // 모달 표시
  };

  // 모달 닫기 함수
  window.closeModal = function () {
    modal.style.display = "none";

    // 입력 필드 초기화 (존재 여부 확인)
    const nameInput = document.getElementById("nameInput");
    const emailInput = document.getElementById("emailInput");
    const birthYear = document.getElementById("birthYear");
    const birthMonth = document.getElementById("birthMonth");
    const birthDay = document.getElementById("birthDay");
    const idInput = document.getElementById("idInput");

    if (nameInput) nameInput.value = "";
    if (emailInput) emailInput.value = "";
    if (birthYear) birthYear.value = "";
    if (birthMonth) birthMonth.value = "";
    if (birthDay) birthDay.value = "";
    if (idInput) idInput.value = "";
};

  /* ----------------------------- ID/PW 찾기 기능 ----------------------------- */
  document.getElementById("findButton").addEventListener("click", () => {
    const mode = modalTitle.innerText.includes("PW") ? "pw" : "id";
    const name = document.getElementById("nameInput").value.trim();
    const email = document.getElementById("emailInput").value.trim();
    const birthYear = document.getElementById("birthYear").value;
    const birthMonth = document.getElementById("birthMonth").value;
    const birthDay = document.getElementById("birthDay").value;
    const id = document.getElementById("idInput").value.trim();
    const birthDate = `${birthYear}-${birthMonth.padStart(2, "0")}-${birthDay.padStart(2, "0")}`;

    if (!name || !email || !birthYear || !birthMonth || !birthDay || (mode === "pw" && !id)) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("유효한 이메일을 입력해주세요.");
      return;
    }

    if (mode === "id") {
      fetch("/member/findId", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, birthDate }),
      })
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error("아이디 찾기 요청 실패");
        })
        .then((data) => {
          if (data.success) {
            alert("아이디가 이메일로 전송되었습니다.");
            closeModal();
          } else {
            alert(data.message || "일치하는 유저 정보를 찾을 수 없습니다.");
          }
        })
        .catch((error) => {
          console.error("오류:", error);
          alert("서버와 통신하는 중 오류가 발생했습니다.");
        });
    } else if (mode === "pw") {
      fetch("/member/verifyUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, birthDate, id }),
      })
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error("유저 확인 실패");
        })
        .then((data) => {
          if (data.success) {
            openChangePasswordModal(id); // 유효한 memberId 전달
          } else {
            alert(data.message || "일치하는 유저를 찾을 수 없습니다.");
          }
        })
        .catch((error) => {
          console.error("오류:", error);
          alert("서버와의 통신 중 오류가 발생했습니다.");
        });
    }
    
  });
// 비밀번호 변경 모달 열기
function openChangePasswordModal(memberId) {
  const modal = document.getElementById("findModal"); // 기존 모달을 재활용
  modal.classList.add("change-password-modal"); // 비밀번호 변경 모달 스타일 추가

  // 동적 HTML 생성
  const modalContent = `
    <div class="modal-content">
      <span class="close" onclick="closeModal()">×</span>
      <h3>비밀번호 변경</h3>
      <p>새 비밀번호를 입력하고 확인해주세요.</p>
      <input type="password" id="newPassword" placeholder="새 비밀번호 입력" />
      <input type="password" id="confirmPassword" placeholder="비밀번호 확인" />
      <button id="changePasswordButton">비밀번호 변경</button>
    </div>
  `;

  modal.innerHTML = modalContent;
  modal.style.display = "flex";

  // 비밀번호 변경 버튼 클릭 이벤트에 memberId 전달
  document
    .getElementById("changePasswordButton")
    .addEventListener("click", () => changePassword(memberId));
}

// 비밀번호 변경 요청
function changePassword(memberId) {
  const newPassword = document.getElementById("newPassword").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (!newPassword || !confirmPassword) {
    alert("모든 필드를 입력해주세요.");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  fetch("/member/changePassword", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ memberId, newPassword }),
  })
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error("비밀번호 변경 실패");
    })
    .then((data) => {
      if (data.success) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        closeModal();
      } else {
        alert(data.message || "비밀번호 변경 중 문제가 발생했습니다.");
      }
    })
    .catch((error) => {
      console.error("오류:", error);
      alert("서버와의 통신 중 오류가 발생했습니다.");
    });
}

  /* ----------------------------- 생년월일 초기화 ----------------------------- */
  function initializeBirthDate() {
    const today = new Date();
    const currentYear = today.getFullYear();

    const birthYear = document.getElementById("birthYear");
    const birthMonth = document.getElementById("birthMonth");
    const birthDay = document.getElementById("birthDay");

    // 기본 옵션 추가
    birthYear.innerHTML = '<option value="" disabled selected>연도 선택</option>';
    birthMonth.innerHTML = '<option value="" disabled selected>월 선택</option>';
    birthDay.innerHTML = '<option value="" disabled selected>일 선택</option>';

    // 연도 추가
    for (let year = currentYear; year >= 1900; year--) {
      birthYear.innerHTML += `<option value="${year}">${year}년</option>`;
    }

    // 월 추가
    for (let month = 1; month <= 12; month++) {
      birthMonth.innerHTML += `<option value="${month.toString().padStart(2, "0")}">${month}월</option>`;
    }

    // 연도 및 월 변경 시 일수 업데이트
    birthYear.addEventListener("change", updateDays);
    birthMonth.addEventListener("change", updateDays);

    function updateDays() {
      const year = birthYear.value;
      const month = birthMonth.value;

      birthDay.innerHTML = '<option value="" disabled selected>일 선택</option>';
      if (year && month) {
        const daysInMonth = new Date(year, month, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
          birthDay.innerHTML += `<option value="${day.toString().padStart(2, "0")}">${day}일</option>`;
        }
      }
    }
  }

  initializeBirthDate(); // 생년월일 초기화 호출
});
