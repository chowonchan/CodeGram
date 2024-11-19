document.addEventListener("DOMContentLoaded", () => {
  /* ------------------- DOM 요소 캐싱 ------------------- */
  const modal = document.getElementById("findModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const findButton = document.getElementById("findButton");
  const closeModalButton = document.getElementById("closeModalButton");
  const loginForm = document.getElementById("loginForm");
  const loginMessageDiv = document.getElementById("loginMessage");
  const findIdLink = document.getElementById("findIdLink");
  const findPwLink = document.getElementById("findPwLink");

  findIdLink.addEventListener("click", (event) => {
    event.preventDefault();
    openModal("id");
  });

  findPwLink.addEventListener("click", (event) => {
  event.preventDefault();
  openModal("pw");
  });

  /* ------------------- 공통 함수 ------------------- */
  function sendRequest(url, data) {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message || "요청 실패");
          });
        }
        return response.json();
      })
      .catch((error) => {
        console.error(`Error in request to ${url}:`, error.message);
        throw error;
      });
  }

  function showMessage(message, type) {
    loginMessageDiv.innerText = message;
    loginMessageDiv.style.color = type === "success" ? "green" : "red";
  }

  /* ------------------- 모달 관리 ------------------- */
  function openModal(mode) {
    modalTitle.innerText = mode === "id" ? "ID 찾기" : "PW 찾기";
    modalDescription.innerText =
      mode === "id"
        ? "가입한 이름, 이메일, 생년월일을 입력하세요."
        : "가입한 이름, 이메일, 생년월일, 그리고 아이디를 입력하세요.";
    document.getElementById("idInput").style.display = mode === "pw" ? "block" : "none";
    modal.style.display = "flex";
    initializeBirthDate();

  }

  function closeModal() {
    modal.style.display = "none";
    modal.querySelectorAll("input, select").forEach((input) => (input.value = ""));
  }

  // "X" 버튼 클릭 이벤트
  closeModalButton.addEventListener("click", () => {
    closeModal(); // 모달 닫기 함수 호출
  });

  /* ------------------- 로그인 처리 ------------------- */
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const memberId = loginForm.memberId.value.trim();
    const memberPw = loginForm.memberPw.value.trim();

    if (!memberId || !memberPw) {
      showMessage("아이디와 비밀번호를 모두 입력해 주세요.", "error");
      return;
    }

    sendRequest("/member/login", { memberId, memberPw })
      .then((data) => {
        if (data.success) {
          showMessage("로그인 성공!", "success");
          setTimeout(() => {
            window.location.href = data.url || "/";
          }, 1000);
        } else {
          showMessage(data.message || "로그인 실패", "error");
        }
      })
      .catch(() => showMessage("서버와 통신 중 오류가 발생했습니다.", "error"));
  });

  /* ------------------- ID/PW 찾기 처리 ------------------- */
  findButton.addEventListener("click", () => {
    const name = document.getElementById("nameInput").value.trim();
    const email = document.getElementById("emailInput").value.trim();
    const id = document.getElementById("idInput").value.trim();
    const year = document.getElementById("birthYear").value;
    const month = document.getElementById("birthMonth").value.padStart(2, "0");
    const day = document.getElementById("birthDay").value.padStart(2, "0");

    if (!name || !email || !year || !month || !day || (modalTitle.innerText.includes("PW") && !id)) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const payload = modalTitle.innerText.includes("PW")
      ? { name, email, birthDate: `${year}-${month}-${day}`, id }
      : { name, email, birthDate: `${year}-${month}-${day}` };

        // 버튼 비활성화 및 로딩 상태 표시
        findButton.disabled = true;
        findButton.innerText = "검증 중...";

        console.log("서버로 전송할 데이터:", payload);

    sendRequest(modalTitle.innerText.includes("PW") ? "/member/verifyUser" : "/member/findId", payload)
      .then((data) => {
        if (data.success) {
          alert(data.message);
          closeModal();
          if (modalTitle.innerText.includes("PW")) 
            sendEmailAuthKey(email);
            showEmailVerificationUI(email);
        } else {
          alert(data.message || "요청 처리 중 문제가 발생했습니다.");
        }
      })
      .catch((error) => {
        console.error(error.message);
        alert("일치하는 유저 정보를 찾을 수 없습니다.");
        // 버튼 다시 활성화 및 텍스트 복원
        findButton.disabled = false;
        findButton.innerText = "찾기";
      });

  
  });

  /* ------------------- 이메일 인증 및 비밀번호 변경 ------------------- */
  function showEmailVerificationUI(email) {
    modalTitle.innerText = "이메일 인증";
    modalDescription.innerText = "등록된 이메일로 발송된 인증 코드를 입력하세요.";
    const modalContent = modal.querySelector(".modal-content");
    modalContent.innerHTML = `
      <p>이메일 인증 후 비밀번호를 변경할 수 있습니다.</p>
      <input type="text" id="verificationCodeInput" placeholder="인증 코드 입력" />
      <button id="verifyCodeButton">인증 완료</button>
    `;

    document.getElementById("verifyCodeButton").addEventListener("click", () => {
      const authKey = document.getElementById("verificationCodeInput").value.trim();

      if (!authKey) {
        alert("인증 코드를 입력해주세요.");
        return;
      }

      sendRequest("/email/verifyPwAuthKey", { email, authKey })
        .then((data) => {
          if (data.success) {
            alert("인증 성공! 비밀번호 변경을 진행하세요.");
            showPasswordChangeUI();
          } else {
            alert(data.message || "인증 실패. 다시 시도해주세요.");
          }
        })
        .catch(() => alert("인증 처리 중 문제가 발생했습니다."));
    });
  }

  function showPasswordChangeUI() {
    modalTitle.innerText = "비밀번호 변경";
    modalDescription.innerText = "새 비밀번호를 입력하고 확인해주세요.";
    const modalContent = modal.querySelector(".modal-content");
    modalContent.innerHTML = `
      <input type="password" id="newPassword" placeholder="새 비밀번호 입력" />
      <input type="password" id="confirmPassword" placeholder="비밀번호 확인" />
      <button id="changePasswordButton">비밀번호 변경</button>
    `;

    document.getElementById("changePasswordButton").addEventListener("click", () => {
      const newPassword = document.getElementById("newPassword").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();

      if (!newPassword || newPassword !== confirmPassword) {
        alert("비밀번호가 일치하지 않거나 입력되지 않았습니다.");
        return;
      }

      sendRequest("/member/changePassword", { newPassword })
        .then((data) => {
          if (data.success) {
            alert("비밀번호 변경 완료!");
            closeModal();
          } else {
            alert(data.message || "비밀번호 변경 실패");
          }
        })
        .catch(() => alert("비밀번호 변경 요청 중 문제가 발생했습니다."));
    });
  }

  /* ------------------- 생년월일 초기화 ------------------- */
  function initializeBirthDate() {
    const yearSelect = document.getElementById("birthYear");
    const monthSelect = document.getElementById("birthMonth");
    const daySelect = document.getElementById("birthDay");

    yearSelect.innerHTML = '<option value="">연도 선택</option>';
    monthSelect.innerHTML = '<option value="">월 선택</option>';
    daySelect.innerHTML = '<option value="">일 선택</option>';

    for (let year = new Date().getFullYear(); year >= 1900; year--) {
      yearSelect.add(new Option(`${year}년`, year));
    }

    for (let month = 1; month <= 12; month++) {
      monthSelect.add(new Option(`${month}월`, month.toString().padStart(2, "0")));
    }

    yearSelect.addEventListener("change", updateDays);
    monthSelect.addEventListener("change", updateDays);

    function updateDays() {
      const year = yearSelect.value;
      const month = monthSelect.value;

      daySelect.innerHTML = '<option value="">일 선택</option>';
      const daysInMonth = year && month ? new Date(year, month, 0).getDate() : 31;

      for (let day = 1; day <= daysInMonth; day++) {
        daySelect.add(new Option(`${day}일`, day.toString().padStart(2, "0")));
      }
    }
  }

  initializeBirthDate();
});
