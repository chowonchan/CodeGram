document.addEventListener("DOMContentLoaded", () => {
  const findIdLink = document.getElementById("findIdLink"); //HTML에서 ID가 findIdLink인 요소를 선택
  const findPwLink = document.getElementById("findPwLink"); //HTML에서 ID가 findPwLink인 요소를 선택

  findIdLink.addEventListener("click", (event) => {
    event.preventDefault();
    openModal("id");
  });

  findPwLink.addEventListener("click", (event) => {
  event.preventDefault();
  openModal("pw");
  });
  const loginForm = document.getElementById("loginForm");
  const loginMessageDiv = document.getElementById("loginMessage");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const memberId = loginForm.memberId.value.trim();
    const memberPw = loginForm.memberPw.value.trim();

    // 아이디와 비밀번호 검증
    if (!memberId || !memberPw) {
      showMessage("아이디와 비밀번호를 모두 입력해 주세요.", "error");
      return;
    }

    // console.log("로그인 요청 데이터:", { memberId, memberPw });

    // 서버로 로그인 요청
    sendRequest("/member/login", { memberId, memberPw })
      .then((data) => {
        console.log("서버 응답 데이터:", data);

        // 응답 데이터 처리
        if (data.success) {
          showMessage(data.message || "로그인 성공!", "success");
          setTimeout(() => {
            window.location.href = data.url || "/";
          }, 1000);
        } else {
          showMessage(data.message || "로그인 실패", "error");
        }
      })
      .catch((error) => {
        console.error("로그인 요청 처리 중 오류 발생:", error.message);
        showMessage(
          "서버와 통신하는 중 오류가 발생했습니다. 관리자에게 문의하세요.",
          "error"
        );
      });
  });

  // 메시지 표시 함수
  function showMessage(message, type) {
    loginMessageDiv.innerText = message;
    loginMessageDiv.className = type;
  }

  /* ----------------------------- 모달 관리 ----------------------------- */
  const modal = document.getElementById("findModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const findButton = document.getElementById("findButton");
  const closeModalButton = document.getElementById("closeModalButton");

  window.openModal = (mode) => {
    modalTitle.innerText = mode === "id" ? "ID 찾기" : "PW 찾기";
    modalDescription.innerText =
      mode === "id"
        ? "가입한 이름, 이메일, 생년월일을 입력하세요."
        : "가입한 이름, 이메일, 생년월일, 그리고 아이디를 입력하세요.";
    document.getElementById("idInput").style.display = mode === "pw" ? "block" : "none";
    modal.style.display = "flex";
  };

  window.closeModal = () => {
    modal.style.display = "none";
    modal.querySelectorAll("input, select").forEach((input) => (input.value = ""));
    initializeBirthDate();
  };

  // modal.addEventListener("click", (event) => {
  //   if (event.target === modal) {
  //     closeModal();
  //   }
  // });

  // 모달 닫기 함수
  function closeModal() {
    modal.style.display = "none";
  }
  // ESC 키로 모달 닫기
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.style.display === "flex") {
      closeModal();
    }
  });
  // X 버튼 클릭으로 닫기
  closeModalButton.addEventListener("click", closeModal);

  /* ----------------------------- ID/PW 찾기: 값 검증 및 이메일 발송 ----------------------------- */
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
  
    const birthDate = `${year}-${month}-${day}`;
    const mode = modalTitle.innerText.includes("PW") ? "pw" : "id";
    const payload = mode === "id" 
      ? { name, email, birthDate } 
      : { name, email, birthDate, id };
  
    if (mode === "pw" && id) {
      saveIdToCookie(id);
    }
  
    findButton.disabled = true;
    findButton.innerText = "검증 중...";
    console.log("서버로 전송할 데이터:", payload);
  
    fetch(mode === "id" ? "/member/findId" : "/member/verifyUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        console.log("응답 상태 코드:", response.status);
        if (!response.ok) {
          return response.json().then((err) => {
            console.error("요청 실패:", err);
            throw new Error(err.message || "요청 실패");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("서버 응답 데이터:", data);
        if (data.success) {
          alert(data.message);
          if (mode === "pw") {
            sendEmailAuthKey(email);
            showEmailVerificationUI(email);
          } else {
            closeModal();
          }
        } else {
          alert(data.message || "요청 처리 중 문제가 발생했습니다.");
        }
      })
      .catch((error) => {
        console.error("서버와 통신하는 중 오류 발생:", error);
        alert(error.message || "로그인 처리 중 문제가 발생했습니다.");
      })
      .finally(() => {
        findButton.disabled = false;
        findButton.innerText = "찾기";
      });
  });
  
  
  
  /* ----------------------------- 쿠키 저장 함수 ----------------------------- */
  function saveIdToCookie(id) {
    if (!id) return;
  
    const now = new Date();
    now.setTime(now.getTime() + 10 * 60 * 1000); // 10분 후 만료
    const expires = `expires=${now.toUTCString()}`;
  
    document.cookie = `verifiedId=${id}; ${expires}; path=/`;
  
    console.log(`ID 저장됨: verifiedId=${id} (10분 후 만료)`);
  }
  
  /* ----------------------------- 쿠키 읽기 함수 ----------------------------- */
  function getIdFromCookie() {
    const name = "verifiedId=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
  
    for (let cookie of cookieArray) {
      cookie = cookie.trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null; // 쿠키가 없을 경우 null 반환
  }
  
  /* ----------------------------- 이메일 발송 ----------------------------- */
  
  function sendEmailAuthKey(email) {
    fetch("/email/sendPwAuthKey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert(data.message || "인증번호가 발송되었습니다.");
            } else {
                alert(data.message || "인증번호 발송에 실패했습니다.");
            }
        })
        .catch((error) => {
            console.error("이메일 발송 중 오류 발생:", error.message);
            alert("인증번호 발송 중 문제가 발생했습니다.");
        });
}


  /* ----------------------------- 이메일 인증 ----------------------------- */
  function showEmailVerificationUI(email) {
    // if (!email) {
    //   console.error("이메일 값이 전달되지 않았습니다.");
    //   alert("이메일이 누락되었습니다. 다시 시도해주세요.");
    //   return;
    // }
  
    modalTitle.innerText = "이메일 인증";
    modalDescription.innerText = "등록된 이메일로 발송된 인증 코드를 입력하세요.";
  
    const modalContent = modal.querySelector(".modal-content");
    modalContent.innerHTML = `
      <p>이메일 인증 후 비밀번호를 변경할 수 있습니다.</p>
      <p id="timerDisplay">05:00</p>
      <input type="text" id="verificationCodeInput" placeholder="인증 코드 입력" />
      <button id="verifyCodeButton">인증 완료</button>
    `;
    startVerificationTimer(300); // 5분 타이머 시작

    document.getElementById("verifyCodeButton").addEventListener("click", async () => {
      const authKey = document.getElementById("verificationCodeInput").value.trim();
  
      if (!authKey) {
        alert("인증 코드를 입력해주세요.");
        return;
      }

      const verifyButton = document.getElementById("verifyCodeButton");
      verifyButton.disabled = true;
  
  
    try {
      const response = await fetch("/email/verifyPwAuthKey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, authKey }),
      });

      if (!response.ok) throw new Error("인증 실패");

      const isVerified = await response.json();
      if (isVerified) {
        alert("인증 성공! 비밀번호 변경을 진행하세요.");
        showPasswordChangeUI();
      } else {
        alert("인증 실패. 인증번호를 다시 확인해주세요.");
      }
    } catch (error) {
      console.error("오류 발생:", error.message);
      alert(error.message || "인증 처리 중 문제가 발생했습니다.");
    } finally {
      verifyButton.disabled = false;
    }
  });
  }
  

  /* ----------------------------- 비밀번호 변경 ----------------------------- */

  function showEmailVerificationUI(email) {
    modalTitle.innerText = "이메일 인증";
    modalDescription.innerText = "등록된 이메일로 발송된 인증 코드를 입력하세요.";
  
    const modalContent = modal.querySelector(".modal-content");
    modalContent.innerHTML = `
      <span class="close" id="closeModalButton" onclick="closeModal()">×</span>
      <p>이메일 인증 후 비밀번호를 변경할 수 있습니다.</p>
      <input type="text" id="verificationCodeInput" placeholder="인증 코드 입력" />
      <button id="verifyCodeButton">인증 완료</button>
    `;
  
    document.getElementById("verifyCodeButton").addEventListener("click", () => {
      const authKey = document.getElementById("verificationCodeInput").value.trim();
  
      if (!email || !authKey) {
        alert("이메일과 인증 코드를 입력해주세요.");
        return;
      }
  
      fetch("/email/verifyPwAuthKey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, authKey }), // 이메일과 인증번호를 객체로 묶어 전송
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("인증 실패");
          }
          return response.json();
        })
        .then((data) => {
          if (data) {
            alert("인증 성공! 비밀번호 변경을 진행하세요.");
            showPasswordChangeUI(); // 인증 성공 시 비밀번호 변경 UI로 이동
          } else {
            alert("인증 실패. 다시 시도해주세요.");
          }
        })
        .catch((error) => {
          console.error("오류:", error.message);
          alert("인증번호가 옳지 않습니다. 다시 시도해주세요.");
        });
    });
  }
  
  function showPasswordChangeUI() {
    modalTitle.innerText = "비밀번호 변경";
    modalDescription.innerText = "새 비밀번호를 입력하고 확인해주세요.";
  
    const modalContent = modal.querySelector(".modal-content");
    modalContent.innerHTML = `
      <span class="close" id="closeModalButton" onclick="closeModal()">×</span>
      <input type="password" id="newPassword" placeholder="새 비밀번호 입력" />
      <input type="password" id="confirmPassword" placeholder="비밀번호 확인" />
      <button id="changePasswordButton">비밀번호 변경</button>
    `;

      // 닫기 버튼 클릭 이벤트
    document.getElementById("closeModalButton").addEventListener("click", closeModal);

    // ESC 키로 모달 닫기 이벤트
    document.addEventListener("keydown", closeModalOnEsc);
  
    document.getElementById("changePasswordButton").addEventListener("click", () => {
      const newPassword = document.getElementById("newPassword").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();
      // 비밀번호 정규표현식 검사
      const lengthCheck = newPassword.length >= 6 && newPassword.length <= 20;
      const letterCheck = /[a-zA-Z]/.test(newPassword); // 영어 알파벳 포함
      const numberCheck = /\d/.test(newPassword); // 숫자 포함
      const specialCharCheck = /[\!\@\#\_\*\-]/.test(newPassword); // 특수문자 포함
  
      if (!newPassword || !confirmPassword) {
        alert("모든 필드를 입력해주세요.");
        return;
      }
  
      if (newPassword !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      // 조건이 하나라도 만족하지 못하면
      if ( !(lengthCheck && letterCheck && numberCheck && specialCharCheck) ) {
        pwMessage.innerText = pwMessageObj.invaild;
        pwMessage.classList.remove("confirm");
        pwMessage.classList.add("error");
        checkObj.memberPw = false;
        alert("영어, 숫자, 특수문자 1글자 이상, 6~20자 사이인지 확인해주세요");
        return;
      }
  
      const memberId = getIdFromCookie(); // 쿠키에서 ID 가져오기
      if (!memberId) {
        alert("인증된 사용자 ID를 찾을 수 없습니다.");
        return;
      }
  
      fetch("/member/changePassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId, newPassword }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("비밀번호 변경 요청 실패");
          }
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            alert(data.message);
            closeModal();
          } else {
            alert(data.message || "비밀번호 변경 실패");
          }
        })
        .catch((error) => {
          console.error("오류 발생:", error.message);
          alert("비밀번호 변경 요청 중 문제가 발생했습니다. 다시 시도해주세요.");
        });
    });
  }
  // 비밀번호 강도 검사 함수
function isStrongPassword(password) {
  // 비밀번호 정규표현식 검사
  const minLength = inputPw.length >= 6 && inputPw.length <= 20;
  const letterCheck = /[a-zA-Z]/.test(inputPw); // 영어 알파벳 포함
  const hasNumber = /\d/.test(inputPw); // 숫자 포함
  const hasSpecialChar = /[\!\@\#\_\*\-]/.test(inputPw); // 특수문자 포함
  return password.length >= minLength && letterCheck && hasNumber && hasSpecialChar;
}
  // 모달 닫기 함수
function closeModal() {
  modal.style.display = "none";
  // ESC 키 이벤트 제거
  document.removeEventListener("keydown", closeModalOnEsc);
}

// ESC 키로 모달 닫기 이벤트
function closeModalOnEsc(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}
  

  /* ---------------------------- 생년월일 초기화 ---------------------------- */
  const yearSelect = document.getElementById("birthYear");
  const monthSelect = document.getElementById("birthMonth");
  const daySelect = document.getElementById("birthDay");

  function initializeBirthDate() {
    yearSelect.innerHTML = '<option value="">연도 선택</option>';
    monthSelect.innerHTML = '<option value="">월 선택</option>';
    daySelect.innerHTML = '<option value="">일 선택</option>';

    for (let year = new Date().getFullYear(); year >= 1900; year--) {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = `${year}년`;
      yearSelect.appendChild(option);
    }

    for (let month = 1; month <= 12; month++) {
      const option = document.createElement("option");
      option.value = month.toString().padStart(2, "0");
      option.textContent = `${month}월`;
      monthSelect.appendChild(option);
    }

    for (let day = 1; day <= 31; day++) {
      const option = document.createElement("option");
      option.value = day.toString().padStart(2, "0");
      option.textContent = `${day}일`;
      daySelect.appendChild(option);
    }

    yearSelect.addEventListener("change", updateDays);
    monthSelect.addEventListener("change", updateDays);
  }

  function updateDays() {
    const year = yearSelect.value;
    const month = monthSelect.value;

    daySelect.innerHTML = '<option value="">일 선택</option>';

    let daysInMonth = 31;

    if (year && month) {
      daysInMonth = new Date(year, month, 0).getDate();
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const option = document.createElement("option");
      option.value = day.toString().padStart(2, "0");
      option.textContent = `${day}일`;
      daySelect.appendChild(option);
    }
  }

  initializeBirthDate();
});

/* ---------------------------- 공통 함수 ---------------------------- */
function sendRequest(url, data) {
  console.log("요청 URL:", url);
  console.log("요청 데이터:", data);

  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, 
    // 요청방법에 대한 정의 
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          console.error("요청 실패:", err);
          throw new Error(err.message || "요청 실패");
        });
      }
      return response.json();// JSON형태의 응답 데이터를 JS 객체로 변경
    })
    .catch((error) => {
      console.error("서버와 통신 중 오류:", error.message);
      throw error; // 호출자에게 오류 전달
    });
}

