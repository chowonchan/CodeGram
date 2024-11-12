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
  };

/* 필수 입력 항목의 유효성검사 여부를 체크하기 위한 객체(체크리스트) */
const checkObj = {
  "memberName"      : false,
  "memberEmail"     : false,
  "authKey"         : false,
  "memberPw"        : false,
  "memberPwConfirm" : false,
  "memberNickname"  : false,
  "memberBirth"     : false
};