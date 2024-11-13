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
  "memberId"        : false,
  "memberPw"        : false,
  "memberPwConfirm" : false,
  "memberNickname"  : false,
  "memberBirth"     : false,
  "admin"           : false
};

/* -------- 이메일 유효성 검사 -------- */

// 1) 이메일 유효성 검사에 필요한 요소 얻어오기
const memberEmail = document.querySelector("#memberEmail");
const emailMessage = document.querySelector("#emailMessage");

// 2) 이메일 메시지를 미리 작성
const emailMessageObj = {}; // 빈 객체
emailMessageObj.normal = "메일을 받을 수 있는 이메일을 입력해주세요.";
emailMessageObj.invaild = "알맞은 이메일 형식으로 작성해 주세요.";
emailMessageObj.duplication = "이미 사용중인 이메일 입니다.";
emailMessageObj.check = "사용 가능한 이메일 입니다.";

// 3) 이메일이 입력될 때 마다 유효성 검사를 수행
memberEmail.addEventListener("input", e => {

    // 입력된 값 얻어오기
    const inputEmail = memberEmail.value.trim();
  
    // 4) 입력된 이메일이 없을 경우
    if(inputEmail.length === 0){

        // 이메일 메시지를 normal 상태 메시지로 변경
        emailMessage.innerText = emailMessageObj.normal;

        // #emailMessage에 색상 관련 클래스를 모두 제거
        emailMessage.classList.remove("confirm", "error");

        // checkObj에서 memberEmail을 false로 변경
        checkObj.memberEmail =  false;

        memberEmail.value = ""; // 잘못 입력된 값(띄어쓰기) 제거

        return;
    }

    // 5) 이메일 형식이 맞는지 검사(정규 표현식을 이용한 검사)

    // 이메일 형식 정규 표현식 객체
    const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // 입력 값이 이메일 형식이 아닌 경우
  if( regEx.test(inputEmail) === false ){ 
        emailMessage.innerText = emailMessageObj.invaild; // 유효 X 메시지
        emailMessage.classList.add("error"); // 빨간 글씨 추가
        emailMessage.classList.remove("confirm"); // 초록 글씨 제거
        checkObj.memberEmail = false; // 유효하지 않다고 체크
        return;
  }
  /** test
   emailMessage.innerText = "유효!!";
  emailMessage.classList.add("confirm");
  emailMessage.classList.remove("error");
*/

  // 6) 이메일 중복 검사(AJAX)
  fetch("/member/emailCheck?email=" + inputEmail)
  .then(Response=>{
    if(Response.ok){ //HTTP 응답 상태 코드 200번(응답 성공)
        return Response.text(); //응답 결과를 text로 파싱
    }
    throw new Error("이메일 중복검사 에러");
  })
  .then(count => {
    // 매개 변수 count : 첫 번째 then에서 return된 값이 저장된 변수

    if(count == 1){ //중복인 경우
        emailMessage.innerText = emailMessageObj.duplication; // 중복메세지
        emailMessage.classList.add("error");
        emailMessage.classList.remove("confirm");
        checkObj.memberEmail = false;
        return;
    }
    // 중복이 아닌경우
    emailMessage.innerText = emailMessageObj.check; // 중복X 메세지
    emailMessage.classList.add("confirm");
    emailMessage.classList.remove("error");
    checkObj.memberEmail = true; // 유효한 이메일임을 기록
    
  })
  .catch( err => console.error(err) );

});

//-----------------------------------------------------------------------------------

/* ----- 닉네임 유효성 검사 ----- */
// 1) 닉네임 유효성 검사에 사용되응 요소 얻어오기
const memberNickname = document.querySelector("#memberNickname");
const nickMessage = document.querySelector("#nickMessage");

// 2) 닉네임 관련 메시지 작성
const nickMessageObj = {};
nickMessageObj.normal = "한글,영어,숫자로만 3~10글자";
nickMessageObj.invaild = "유효하지 않은 닉네임 형식 입니다";
nickMessageObj.duplication = "이미 사용중인 닉네임 입니다.";
nickMessageObj.check = "사용 가능한 닉네임 입니다.";
  
// 3) 닉네임 입력 시 마다 유효성 검사
memberNickname.addEventListener("input", () => {

    // 입력받은 닉네임 (저장)
    const inputNickname = memberNickname.value.trim();

    // 4) 입력된 닉네임이 없을 경우 
    if(inputNickname.length === 0){
        // 닉네임 메시지를 normal 상태 메시지로 변경
        nickMessage.innerText = nickMessageObj.normal;
        // #nickMessage에서 색상 관련 클래스를 모두 제거
        nickMessage.classList.remove("confirm", "error")
        // checkObj에서 memberNickname을 false로 변경
        checkObj.memberNickname=false;
        // 잘못 입력된 값(띄어쓰기) 제거
        memberNickname.value = "";
        return;

    }

    // 5) 닉네임 유효성 검사(정규 표현식)
    const regEx = /^[a-zA-Z0-9가-힣]{3,10}$/; // 한글,영어,숫자로만 3~10글자

    if( regEx.test(inputNickname) === false ){ 
        nickMessage.innerText = nickMessageObj.invaild; // 유효 X 메시지
        nickMessage.classList.add("error"); // 빨간 글씨 추가
        nickMessage.classList.remove("confirm"); // 초록 글씨 제거
        checkObj.memberNickname = false; // 유효하지 않다고 체크
        return;
  }

    // 6) 닉네임 중복 검사
    fetch("/member/nicknameCheck?nickname=" + inputNickname)
    .then(response =>{
        if(response.ok){ // HTTP 응답 상태 코드 200번(응답 성공)
            return response.text(); // 응답 결과를 text로 파싱
        }
        throw new Error("닉네임 중복 검사 에러");
      
    })
    .then(
        count => {
            // 매개 변수 count : 첫 번째 then에서 return된 값이 저장된 변수
        
            if(count == 1){ // 중복인 경우
              nickMessage.innerText = nickMessageObj.duplication; // 중복 메시지
              nickMessage.classList.add("error");
              nickMessage.classList.remove("confirm");
              checkObj.memberNickname = false;
              return;
            } 
        
            // 중복이 아닌 경우
            nickMessage.innerText = nickMessageObj.check; // 중복X 메시지
            nickMessage.classList.add("confirm");
            nickMessage.classList.remove("error");
            checkObj.memberNickname = true; // 유효한 님네임임을 기록
    })
    .catch(err => console.error(err));
  
  });

  // -----------------------------------------------------------------------
  /* 아이디 중복 검사 */
  // 1) 아이디 중복 검사에 사용되응 요소 얻어오기
  const memberId = document.querySelector("#memberId");
  const IdMessage = document.querySelector("#IdMessage");

  // 2) 아이디 관련 메시지 작성
  const IdMessageObj = {
  default : "사용할 아이디를 입력해 주세요.",
  error   : "이미 사용중인 아이디 입니다.",
  success : "사용 가능한 아이디 입니다."
  };
  // 디바운싱을 적용하여 중복 검사
  let debounceTimeout;
  memberId.addEventListener("input", () => {
    clearTimeout(debounceTimeout);
    const inputId = memberId.value.trim();
    if (inputId.length === 0) {
      IdMessage.innerText = IdMessageObj.default;
      IdMessage.classList.remove("confirm", "error");
      checkObj.memberId = false;
      return;
  }
      // 디바운싱: 입력이 끝난 후 500ms 동안 입력이 없을 때 중복 검사 수행
      debounceTimeout = setTimeout(() => {
        checkDuplicateId(inputId);
    }, 500);
});

    // 아이디 중복 검사
    function checkDuplicateId(inputId) {
    fetch(`/member/idnameCheck?id=${inputId}`)
    .then(response => {
        if (response.ok) return response.text();
        throw new Error("아이디 중복 검사 에러");
    })
    .then(count => {
        if (count == 1) {
            IdMessage.innerText = IdMessageObj.error;
            IdMessage.classList.add("error");
            IdMessage.classList.remove("confirm");
            checkObj.memberId = false;
        } else {
            IdMessage.innerText = IdMessageObj.success;
            IdMessage.classList.add("confirm");
            IdMessage.classList.remove("error");
            checkObj.memberId = true;
        }
    })
    .catch(err => {
        console.error(err);
        IdMessage.innerText = "서버와 통신하는 중 오류가 발생했습니다.";
        IdMessage.classList.add("error");
        IdMessage.classList.remove("confirm");
    });
}
  
    // -----------------------------------------------------------------------
  /* 비밀번호 유효성 검사 */
  

const memberPw = document.querySelector("#memberPw");
const memberPwConfirm = document.querySelector("#memberPwConfirm");
const pwMessage = document.querySelector("#pwMessage");

const pwMessageObj = {};
pwMessageObj.normal = "영어,숫자,특수문자 1글자 이상, 6~20자 사이.";
pwMessageObj.invaild = "유효하지 않은 비밀번호 형식입니다.";
pwMessageObj.vaild = "유효한 비밀번호 형식입니다.";
pwMessageObj.error = "비밀번호가 일치하지 않습니다.";
pwMessageObj.check = "비밀번호가 일치 합니다.";


memberPw.addEventListener("input", () => {
  
  const inputPw = memberPw.value.trim();

  if(inputPw.length === 0){ // 비밀번호 미입력
    pwMessage.innerText = pwMessageObj.normal;
    pwMessage.classList.remove("confirm", "error");
    checkObj.memberPw = false;
    memberPw.value = "";
    return;
  }

  // 비밀번호 정규표현식 검사
  const lengthCheck = inputPw.length >= 6 && inputPw.length <= 20;
  const letterCheck = /[a-zA-Z]/.test(inputPw); // 영어 알파벳 포함
  const numberCheck = /\d/.test(inputPw); // 숫자 포함
  const specialCharCheck = /[\!\@\#\_\-]/.test(inputPw); // 특수문자 포함

  // 조건이 하나라도 만족하지 못하면
  if ( !(lengthCheck && letterCheck && numberCheck && specialCharCheck) ) {
    pwMessage.innerText = pwMessageObj.invaild;
    pwMessage.classList.remove("confirm");
    pwMessage.classList.add("error");
    checkObj.memberPw = false;
    return;
  }

  pwMessage.innerText = pwMessageObj.vaild;
  pwMessage.classList.remove("error");
  pwMessage.classList.add("confirm");
  checkObj.memberPw = true;

  
  // 비밀번호 확인이 작성된 상태에서
  // 비밀번호가 입력된 경우
  if(memberPwConfirm.vlaue.trim().length>0){
    checkPw(); // 같른지 비교하는 함수 호출
  }

});