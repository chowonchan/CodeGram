const modalFeedWriteOverlay = document.getElementById("modalFeedWriteOverlay");

const modalContent = document.getElementById("modalContent");
const modalContentDeep = document.getElementById("modalContentDeep");

const modalTop = document.getElementById("modalContentTop");
const modalTopPrev = document.getElementById("modalContentTopPrev");
const modalTopText = document.getElementById("modalContentTopText");
const modalTopNext = document.getElementById("modalContentTopNext");

const modalRight = document.getElementById("modalContentRight");

let filename = "등록 시도한 파일의 이름.확장자"
let flag = 0;

// 사진만 있다가 가로로 길어짐

// 모달 X 버튼 클릭
document.getElementById("modalCloseButton").addEventListener("click", () => {
  modalCloseAlert();
});

// 모달 반투명 배경 클릭
document.getElementById("modalFeedWriteOverlayBackground").addEventListener("click", () => {
  console.log("클릭?");
  modalCloseAlert();
});

// 이벤트 넣을때는 매우 신중하게!
function modalSmall() {
  modalContent.style.width = "734px";
  modalTop.style.width = "734px";
  modalRight.style.width = "0px";
}

function modalLarge() {
  modalContent.style.width = "1074px";
  modalTop.style.width = "1074px";
  modalRight.style.width = "339px";
}

function modalHide() {
  modalFeedWriteOverlay.classList.remove("hide");

  document.getElementById("modalContentLeftImg").classList.add("hide");

  document.getElementById("modalContentSubmit").classList.add("hide");
}


function modalNew() {
  // 모달 초기값 지정
  clearProgress();
  modalSmall();
  modalHide();

  modalTopNext.classList.remove("hide");
  modalTopPrev.classList.remove("hide");
  modalTopText.innerText = "정보 수정";
  document.getElementById("submit").src = "";
  document.getElementById("submitText").innerText = ""

  scrollLock();

  setTimeout(()=>{modalLarge();}, 1);
  
}

function modalSubmit() {
  modalSmall();

  modalTopNext.classList.add("hide");
  modalTopPrev.classList.add("hide");

  document.getElementById("modalContentLeftImg").classList.add("hide");
  document.getElementById("modalContentSubmit").classList.remove("hide");

  document.getElementById("submit").src = "/images/loading.gif";
  modalTopText.innerText = "공유 중입니다";
}


// 모달 전체 초기화 함수
function clearProgress() {

  // 저장된 이전 파일 목록 삭제
  for (let x = 0; x < lastValidFiles.length; x++) lastValidFiles[x] = "";

  // 삽입된 이미지 배열 초기화
  for (let y = 0; y < inputImageList.length; y++) inputImageList[y].value = "";

  // 미리보기 삭제
  for (let z = 0; z < previewList.length; z++) previewList[z].src = "";

  document.getElementById("modalContentLeftInnerImg").value = "";

  textArea.innerText = "";
}

document.getElementById("modalContentTopPrev").addEventListener("click", () => {
  modalCloseAlert();
});

document.getElementById("modalContentTopNext").addEventListener("click", () => {
  modalSubmit();
  submitForm();
});

function modalCloseAlert() {
  modalFeedWriteOverlay.classList.add("hide");
  modalFeedWriteOverlay.style.overflow = "hidden";
  document.documentElement.style.overflowY = "auto";
}

// document.getElementById("modalContentDeepConfirm").addEventListener("click", () => {
//   modalContentDeep.classList.add("hide");
//   modalFeedWriteOverlay.classList.add("hide");

//   if(backflag === true) {
//     backflag = false;
//     modalNew();
//   }
// });

// document.getElementById("modalContentDeepCancel").addEventListener("click", () => {
//   modalContentDeep.classList.add("hide");
// });

function scrollLock() {
  // html 문서의 스크롤을 없에고
  document.documentElement.style.overflowY = "hidden";
  
  // 모달창에 스크롤을 주겠다 == 스크롤바가 존재는 하지만 비활성 상태로 존재
  modalFeedWriteOverlay.style.overflowY = "scroll";
  modalFeedWriteOverlay.style.overflowX = "hidden";
}

// ====================================================================================================


// 이미지 삽입 관련 script
function isSupportedFile(file) {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  return allowedTypes.includes(file.type);
}

const maxSize = 1024 * 1024 * 10;  // 10MB를 byte 단위로 작성
// 이미지는 최대 5장까지
const lastValidFiles = [null, null, null, null, null];

// 사진 추가 버튼 클릭
// document.getElementById("modalContentLeftInnerButton").addEventListener("click", () => {
//   document.getElementById("modalContentLeftInnerImg").click();
// });

document.getElementById("modalContentLeftInnerImg").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file && isSupportedFile(file)) {
    // 파일 업로드 성공
    console.log("File uploaded:", file.name);
    console.log("File:", file);
    modalStoryWithImg();
  } else if(file && !isSupportedFile(file)) {
    filename = file.name;
    modalStoryError();
  }
});

const inputImageList = document.getElementsByClassName("modal-content-left-img-view");
const previewList = document.getElementsByClassName("preview");

/**
 * 미리보기 함수
 * @param file  : <input type="file"> 에서 선택된 파일
 * @param order : 이미지 순서
 */
const updatePreview = (file, order) => {  // 이미지 순서까지 얻어와야

  // 선택된 파일이 지정된 크기를 초과한 경우선택 막기
  const maxSize = 1024 * 1024 * 10;

  if(file.size > maxSize) {   // 파일 크기 초과 시
    alert("10MB 이하의 이미지만 선택해 주세요");

    if(lastValidFiles[order] === null) {
      inputImageList[order].value = ""; // 선택 파일 삭제
      return;
    }

    // 이전 선택된 파일이 있을 때
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(lastValidFiles[order]);
    inputImageList[order].files = dataTransfer.files;

    return;
  }


  lastValidFiles[order] = file;

  // JS 에서 제공하는 파일을 읽어오는 객체
  const reader = new FileReader();

  // 파일을 읽어 오는데
  // DataURL 형식으로 읽어옴
  // DataURL : 파일 전체 데이터가 브라우저가 해석할 수 있는 긴 주소형태 문자열로 반환
  reader.readAsDataURL(file);

  reader.addEventListener("load", e => {
    previewList[order].src = e.target.result;
    // e.target.result == 파일이 변환된 주소 형태 문자열
  });
}

for(let i = 0; i < inputImageList.length; i++) {

  // input 태그에 이미지 선택 시 미리보기 함수 호출
  inputImageList[i].addEventListener("change", e => {
//================================================================================================================
// 여기를 수정해서 createElement 를 생성한다!
// 그런데 이미 있는 파일은 어떻게?
//================================================================================================================
    const file = e.target.files[i];


    console.log(file)

    if(file === undefined) {    // 선택 취소 시
      // 이전에 선택한 파일이 없는 경우
      if(lastValidFiles[i] === null) return;

      // ** 이전에 선택한 파일이 "있을" 경우 **
      const dataTransfer = new DataTransfer();

      // DataTransfer 가 가지고 있는 files 필드에
      // lastValidFiles[i] 추가
      dataTransfer.items.add(lastValidFiles[i]);

      // input의 files 변수에 lastValidFile이 추가된 files 대입
      inputImageList[i].files = dataTransfer.files;

      // 이전 선택된 파일로 미리보기 되돌리기
      updatePreview(lastValidFiles[i], i);

      return;
    }

    updatePreview(file, i);
  });
}

//========================================================================
// 글쓰기 부분
const { createPopup } = window.picmoPopup;
const MAX_BYTES = 2000; // 최대 바이트 제한
const textArea = document.getElementById('emojiTextArea');
const byteCount = document.getElementById('byteCount');

document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.querySelector('#trigger');

  const picker = createPopup({}, {
    referenceElement: trigger,
    triggerElement: trigger,
    position: 'right-end'
  });

  trigger.addEventListener('click', () => {
    picker.toggle();
  });

  picker.addEventListener('emoji:select', (selection) => {
    console.log(byteLength(selection.emoji));
    if(byteLength(textAreaContent) + byteLength(selection.emoji) <= MAX_BYTES)
      textArea.innerText += selection.emoji;

    byteCount.textContent = byteLength(textArea.innerText);
    textArea.focus();
  });
});


// UTF-8 바이트 계산 함수
function byteLength(str) {
  let bytes = 0;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code <= 0x7F) {
      bytes += 1; // ASCII
    } else if (code <= 0x7FF) {
      bytes += 2; // 2바이트
    } else if (code <= 0xFFFF) {
      bytes += 3; // 3바이트
    } else {
      bytes += 4; // 4바이트 (Surrogate pair)
    }
  }
  return bytes;
}

textArea.addEventListener('input', () => {
  // UTF-8로 계산된 바이트 수
  byteCount.textContent = byteLength(textArea.innerText);
});

textArea.addEventListener('input', () => {
  if (byteLength(textArea.innerText) > MAX_BYTES) {

    // 바이트 초과 시 초과 부분 제거
    while (byteLength(textArea.innerText) > MAX_BYTES) {
      textArea.innerText = textArea.innerText.slice(0, -1);
    }
  }

  // 현재 바이트 수 업데이트
  byteCount.textContent = byteLength(textArea.innerText);
});

//=======================================================

async function submitForm() {

  const formData = new FormData();
  const textAreaContent = document.getElementById("emojiTextArea").innerHTML;
  const files = document.getElementById("modalContentLeftInnerImg").files;

  formData.append("boardContent", textAreaContent);

  for (let i = 0; i < files.length; i++) {
    formData.append("images", files[i]);
  }

  try {
    const response = await fetch(location.pathname + "/updateFeed", {
      method: "POST",
      body: formData,
      headers: {
        // 필요 없어졌음
      }
    });

    if (response.ok) {
      const result = await response.text();
      if(result > 0) {

        setTimeout(() => {
          document.getElementById("submit").src = "/images/check.gif";
          modalTopText.innerText = "게시물이 수정되었습니다";
          document.getElementById("submitText").innerText = "게시물이 수정되었습니다"

          setTimeout(() => {
            modalNew();
            modalFeedWriteOverlay.classList.add("hide")
          }, 1000)
        }, 2000);

      }
      // 모달 닫기, 화면 초기화 등 추가 작업
      else alert("게시물 수정에 실패했습니다.");
    }
  } catch (error) {
    console.error("폼 제출 오류:", error);
    alert("서버와의 통신에 실패했습니다.");
  }
}

//==============================
//==============================
//==============================

// const deleteBtn = 삭제버튼

const boardNo = location.pathname.split("/")[2];

deleteBtn?.addEventListener("click", () => {

  // if 삭제하시겠습니까? 추가?

  const url = "/board/delete";
  const form = document.createElement("form");
  form.action = url;
  form.method = "POST";

  // input 태그 생성
  const input = document.createElement("input");
  input.type = "hidden";
  input.name = "boardNo";
  input.value = boardNo;

  form.append(input);

  document.querySelector("body").append(form);

  form.submit();
});

