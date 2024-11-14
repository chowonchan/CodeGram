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
  
  // 생년월일 유효성 검사
  function validateBirthDate() {
  const selectedYear = birthYear.value;
  const selectedMonth = birthMonth.value - 1; // 월은 0부터 시작
  const selectedDay = birthDay.value;
  
  const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);
  const minAgeInMillis = 5113 * 24 * 60 * 60 * 1000; // 5113일을 밀리초로 변환
  
  const ageInMillis = today - selectedDate;
  const birthMessage = document.getElementById("birthdayMessage");
  
  if (ageInMillis >= minAgeInMillis) {
  birthMessage.innerText = "유효한 생년월일입니다.";
  birthMessage.classList.add("confirm");
  birthMessage.classList.remove("error");
  checkObj.memberBirth = true; // 유효한 생년월일로 기록
  } else {
  birthMessage.innerText = "생년월일은 현재 날짜 기준으로 5,113일 이상 차이나야 합니다.";
  birthMessage.classList.add("error");
  birthMessage.classList.remove("confirm");
  checkObj.memberBirth
  
  
  = false; // 유효하지 않은 생년월일로 기록
  }
  }
  
  // 생년월일 필드 변경 시 유효성 검사 호출
  birthYear.addEventListener("change", validateBirthDate);
  birthMonth.addEventListener("change", validateBirthDate);
  birthDay.addEventListener("change", validateBirthDate);
  };

/* 필수 입력 항목의 유효성검사 여부를 체크하기 위한 객체(체크리스트) */
const checkObj = {
  "memberName"      : false,
  "memberEmail"     : false,
  "authKey"         : false,
  "memberId"        : false,
  "memberPw"        : false,
  "memberPwConfirm" : false,
  "memberNickname"  : false,
  "memberBirth"     : false
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
    const inputId = memberId.value.trim();
    clearTimeout(debounceTimeout);
    if (inputId.length === 0) {
      IdMessage.innerText = IdMessageObj.default;
      IdMessage.classList.remove("confirm", "error");
      checkObj.memberId = false;
      return;
  }
      // 디바운싱: 입력이 끝난 후 500ms 동안 입력이 없을 때 중복 검사 수행
      debounceTimeout = setTimeout(() => {
        checkDuplicateId(inputId);
    }, 300);
        // 아이디 중복 검사
        function checkDuplicateId(inputId) {
          fetch(`/member/idCheck?id=${inputId}`)
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
});

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
  const specialCharCheck = /[\!\@\#\_\*\-]/.test(inputPw); // 특수문자 포함

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

/* ----- 비밀번호, 비밀번호 확인 같은지 검사하는 함수 ----- */
function checkPw(){

  // 같은 경우
  if(memberPw.value === memberPwConfirm.value){
    pwMessage.innerText = pwMessageObj.check;
    pwMessage.classList.add("confirm");
    pwMessage.classList.remove("error");
    checkObj.memberPwConfirm = true;
    return;
  }

  // 다른 경우
  pwMessage.innerText = pwMessageObj.error;
  pwMessage.classList.add("error");
  pwMessage.classList.remove("confirm");
  checkObj.memberPwConfirm = false;
}


/* ----- 비밀번호 확인이 입력 되었을 때  ----- */
memberPwConfirm.addEventListener("input", () => {

  // 비밀번호 input에 작성된 값이 유효한 형식일때만 비교
  if(checkObj.memberPw===true){
      checkPw();
      return;
  }

  // 비밀번호 input에 작성된 값이 유효하지 않은 경우
  checkObj.memberPwConfirm=false;
});

//-------------------------------------------------------------

/* ----이메일인증----- */

//[1] 인증 번호를 작성된 이메일로 발송하기

//인증번호 받기 버튼
const sendAuthKeyBtn = document.querySelector("#sendAuthKeyBtn");

//인증 관련 메세지 출력 span
const authKeyMessage = document.querySelector("#authKeyMessage");

const initTime = "05:00"; // 인증 초기 시간 지정
const initMin = 4; //초기값 5분에 1초 감소된 후 분
const initSec = 59;//초기값 5분에 1초 감소된 후 초

// 실제 줄어둔 시간(분/초)를 저장할 변수
let min = initMin;
let sec = initSec;

let authTimer; // 타이머 역할의 setInterval을 저장할 변수
               // -> 타이머를 멈추는 clearInterval 수행을 위해 필요

// 인증번호 버튼을 클릭시
sendAuthKeyBtn.addEventListener("click",()=>{

  checkObj.authKey = false; // 인증 안된 상태로 기록
  authKeyMessage.innerText = ""; // 인증 관련 메시지 삭제

  if(authTimer != undefined){
    clearInterval(authTimer); // 이전 인증 타이머 없애기
  }

  // 1) 작성된 이메일이 유효하지 않은 경우
  if(checkObj.memberEmail===false){
    alert("유효한 이메일 작성 후 클릭하세요");
    return;
  }

  // 2) 비동기로 서버에서 작성된 이메일로 인증코드 발송(AJAX)
  fetch("/email/sendAuthKey",{
    method  : "POST",
    headers : {"Content-Type" : "application/json"},
    body    : memberEmail.value
    // POST 방식으로 
    // /email/sendAuthKey 요청을 처리하는 컨트롤러에
    // 입력된 이메일을 body에 담아서 제출
  })
  .then(response=>{
    if(response.ok)return response.text();
    throw new Error("이메일 발송 실패");
  })
  .then(result=>{
        // 백엔드 작성 후 나머지 코드 작성 예정
        console.log(result);
  })
  .catch(err=>console.error(err));

  /* 메일이 비동기로 보내지는 동안 아래 JS코드 수행 */

  // 3) 이메일 발송 메세지 출력 + 5분 타이머 출력

  alert("인증번호가 발송되었습니다.");

  authKeyMessage.innerText = initTime; // 05:00 문자열 출력
  authKeyMessage.classList.remove("confirm", "error"); // 검정 글씨

  // 1초가 지날 때 마다 함수 내부 내용이 실행되는 setInterval 작성
  authTimer = setInterval(() => {
    authKeyMessage.innerText = `${addZero(min)}:${addZero(sec)}`;

     // 0분 0초인 경우
     if(min === 0 && sec === 0){
      checkObj.authKey = false; // 인증 못했다고 기록
      clearInterval(authTimer); // 1초마다 동작하는 setInterval 멈춤
      authKeyMessage.classList.add("error"); // 빨간 글씨
      authKeyMessage.classList.remove("confirm");
      return;
    }


    if (sec === 0) { // 출력된 초가 0인 경우(1분 지남) 
      sec = 60;
      min--;// 분 감소
    }
    sec--; // 1초가 지날 때 마다 sec값 1씩 감소

  },1000);


});

/* 전달 받은 숫자가 10 미만(한 자리 수) 인 경우 
 앞에 0을 붙여서 반환하는 함수 */
 function addZero(num){
    if (num<10) return "0"+ num;
    else        return num;
 }

 //-------------------------------------------------------------

/* 인증 번호를 입력하고 인증하기 버튼을 클릭한 경우 */
const authKey = document.querySelector("#authKey");
const checkAuthKeyBtn = document.querySelector("#checkAuthKeyBtn");

checkAuthKeyBtn.addEventListener("click",()=>{

  // + (추가조건) xkdlajrk 00:00인 경우 버튼 클릭 막기
  if(min === 0 && sec=== 0){
    alert("인증 번호 입력 제한 시간을 초과하였습니다");
    return;
  }

  // 1) 인증 번호 6자리가 입력이 되었는지 확인
  if(authKey.value.trim().length < 6){
    alert("인증 번호가 잘못 입력 되었습니다");
    return;
  }

  // 2) 입력된 이메일과 인증 번호를 비동기로 서버에 전달하여
  //    Redis에 저장된 이메일, 인증번호와 일치하는지 확인

  /* AJAX로 여러 데이터를 서버로 전달하고 싶을 땐
    JSON 형태로 값을 전달해야 한다! */

  // 서버로 제출 할 데이터를 저장한 객체 생성
  const obj = {
    "email" : memberEmail.value, // 입력한 이메일
    "authKey" : authKey.value    // 입력한 인증 번호
  }

  // JSON.stringify(객체) : 객체 -> JSON 변환(문자열화)

  fetch("/email/checkAuthKey", {
    method  : "POST",
    headers : {"Content-Type" : "application/json"},
    body    :  JSON.stringify(obj)
  })
  .then(response=>{
    if (response.ok) {
      return response.text();
    }throw new Error("인증 에러");
  })
  .then(result=>{
    console.log("인증결과 : ", result);

    // 3) 일치하지 않는 경우
    if (result==false) {
      alert("인증번호가 일치하지 않습니다.");
      checkObj.authKey=false;
      return;
    }

    // 4) 일치하는 경우
    // - 타이머 멈춤
    clearInterval(authTimer);

    // + "인증 되었습니다" 화면에 초록색으로 출력
    authKeyMessage.innerText = "인증 되었습니다";
    authKeyMessage.classList.add("confirm");
    authKeyMessage.classList.remove("error");

    checkObj.authKey = true; // 인증 완료 표시
  })
  .catch(err => console.error(err));

});

//---------------------------------------------------------------
// 이름 유효성 검사
const memberName = document.querySelector("#memberName");
const nameMessage = document.querySelector("#nameMessage");

memberName.addEventListener("input", () => {
    const inputName = memberName.value.trim();
    
    if (inputName.length === 0) { // 이름이 입력되지 않았을 경우
        nameMessage.innerText = "이름을 입력해주세요.";
        nameMessage.classList.add("error");
        nameMessage.classList.remove("confirm");
        checkObj.memberName = false; // 유효하지 않음으로 설정
    } else {
        nameMessage.innerText = "입력이 확인되었습니다.";
        nameMessage.classList.add("confirm");
        nameMessage.classList.remove("error");
        checkObj.memberName = true; // 유효함으로 설정
    }
});


//--------------------------------------------------------------

/* 회원가입 form 제출시 전체 유효성 검사 여부 확인 */
const signUpForm = document.querySelector("#signUpForm");

signUpForm.addEventListener("submit", e=> {

  // e.preventDefault(); // 기본 이벤트(form 제출) 막기

  // for(let key in 객체)
  // -> 반복마다 객체의 키 깂을 하나씩 꺼내서 key 변수에 저장
  
  // 유효성 검사 체크리스트 객체에서 하나씩 꺼내서
  // false인 경우가 있는지 검사
  for(let key in checkObj){ 

    if(checkObj[key]===false){ //유효하지 않은 경우
      let str; // 출력할 메세지 저장

      switch(key){
        case "memberName"      : str = "이름이 입력되지 않았습니다"; break;
        case "memberEmail"     : str = "이메일이 유효하지 않습니다"; break;
        case "memberNickname"  : str = "닉네임이 유효하지 않습니다"; break;
        case "memberId"        : str = "아이디가 유효하지 않습니다"; break;
        case "memberPw"        : str = "비밀번호가 유효하지 않습니다"; break;
        case "memberPwConfirm" : str = "비밀번호 확인이 일치하지 않습니다"; break;
        case "authKey"         : str = "이메일이 인증되지 않았습니다"; break;
        case "memberBirth"     : str = "14살이 넘고나서 와라 애송이"; break;
      }

      alert(str); // 경고 출력

       // 유효하지 않은 요소로 focus 이동
      document.getElementById(key).focus();

      e.preventDefault(); // 제출 막기

      return;

    }
  
  }
})