const modalOverlay = document.getElementById("modalOverlay");

const modalContent = document.getElementById("modalContent");
const modalContentDeep = document.getElementById("modalContentDeep");

const modalTop = document.getElementById("modalContentTop");
const modalTopPrev = document.getElementById("modalContentTopPrev");
const modalTopText = document.getElementById("modalContentTopText");
const modalTopNext = document.getElementById("modalContentTopNext");

const modalLeft = document.getElementById("modalContentLeft");
const modalRight = document.getElementById("modalContentRight");


let filename = "등록 시도한 파일의 이름.확장자"
let flag = 0;


// 모달 X 버튼 클릭
document.getElementById("modalCloseButton").addEventListener("click", () => {
  modalCloseAlert();
});

document.getElementById("modalContentDeepBackground").addEventListener("click", () => {
  modalContentDeep.classList.add('hide');
})

// 모달 반투명 배경 클릭
document.getElementById("modalOverlayBackground").addEventListener("click", () => {
  modalCloseAlert();
});

let modalProgress = 1;
// 0. 에러
// 1. 초기
// 2. 순서변경
// 3. 이미지 편집
// 4. 글 등록

// 이벤트 넣을때는 매우 신중하게!
function modalSmall() {
  modalContent.style.width = "734px";
  modalTop.style.width = "734px";
  modalRight.style.width = "0px";
  modalRight.classList.add("hide");
  document.getElementById("modalContentTopNext").style.width = "50px";
}

function modalLarge() {
  modalContent.style.width = "1074px";
  modalTop.style.width = "1074px";
  document.getElementById("modalContentTopNext").style.width = "80px";
  modalRight.classList.remove("hide");
  modalRight.style.width = "339px";

}

function modalHide() {
  modalOverlay.classList.remove("hide");

  document.getElementById("modalPostNew").classList.add("hide");

  document.getElementById("modalPostErr").classList.add("hide");
  document.getElementById("modalContentLeftInner").classList.add("hide");
  document.getElementById("modalPostNew").classList.add("hide");
  document.getElementById("modalPostErr").classList.add("hide");

  document.getElementById("modalContentLeftInnerErr").classList.add("hidden");
  document.getElementById("modalContentLeftImg").classList.add("hide");

  document.getElementById("modalContentSubmit").classList.add("hide");

  modalTopNext.classList.add("hide");
  modalTopPrev.classList.add("hide");
}

function modalNew() {
  // 모달 초기값 지정
  modalSmall();
  modalHide();
  // top 가로, content 가로, right display: none;
  // 상단 텍스트, 내부 이미지, 내부 텍스트, 버튼 글자
  document.getElementById("modalContentLeftInner").classList.remove("hide");
  document.getElementById("modalPostNew").classList.remove("hide");

  modalTopText.innerText = "새 게시물 만들기";
  document.getElementById("modalContentLeftInnerText").innerText = "사진을 여기에 끌어다 놓으세요."
  document.getElementById("modalContentLeftInnerButton").innerText = "컴퓨터에서 선택"

  document.getElementById("submit").src = "";
  document.getElementById("submitText").innerText = ""

  scrollLock();

  clearProgress();
  modalProgress = 1;
}

function modalError() {
  // 상단 텍스트, 내부 이미지, 내부 텍스트, 버튼 글자
  document.getElementById("modalPostNew").classList.add("hide");
  document.getElementById("modalPostErr").classList.remove("hide");
  document.getElementById("modalContentLeftImg").classList.add("hide");

  modalTopText.innerText = "이미지를 업로드하지 못하였습니다";
  document.getElementById("modalContentLeftInnerText").innerText = "지원되지 않는 파일입니다."
  document.getElementById("modalContentLeftInnerErr").innerText = filename + " 파일을 업로드하지 못하였습니다."
  document.getElementById("modalContentLeftInnerErr").classList.remove("hidden");

  document.getElementById("modalContentLeftInnerButton").innerText = "다른 파일 선택"

  modalProgress = 0;
}

function modalWithImg() {
  // 상단 텍스트 변경 및 버튼 좌, 우 생성
  // 내부 이미지, 내부 텍스트, 버튼 글자 제거
  modalSmall();
  document.getElementById("modalContentLeftInner").classList.add("hide");
  document.getElementById("modalContentLeftImg").classList.remove("hide");

  modalTopNext.classList.remove("hide");
  modalTopPrev.classList.remove("hide");

  modalTopText.innerText = "이미지 순서 변경";
  document.getElementById("modalContentTopNext").innerText = "다음"

  modalProgress = 2;
}

function modalWrite() {
  modalLarge();

  modalTopText.innerText = "게시글 등록";
  document.getElementById("modalContentTopNext").innerText = "공유하기";

  modalProgress = 4;
}

function modalSubmit() {
  modalSmall();

  modalTopNext.classList.add("hide");
  modalTopPrev.classList.add("hide");

  document.getElementById("modalContentLeftImg").classList.add("hide");
  document.getElementById("modalContentSubmit").classList.remove("hide");

  document.getElementById("submit").src = "/images/loading.gif";
  modalTopText.innerText = "공유 중입니다";
  modalProgress = 0;
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


  document.getElementById("emojiTextArea").value = "";
  // 가로 세로 hide hidden, 버튼, 텍스트 등 싹 초기화
}

let backflag = false;
document.getElementById("modalContentTopPrev").addEventListener("click", () => {
  console.log("뒤로가기 버튼 클릭 : ", modalProgress);
  switch(modalProgress) {
    case 2 : backflag = true; modalCloseAlert();  break;
          // case 3 : modalWithImg(); break;
          // case 4 : modalImgEdit(); break;
    case 4 : modalWithImg(); break;
    default : console.log("뒤로가기 버튼 클릭"); break;
  }
});

document.getElementById("modalContentTopNext").addEventListener("click", () => {
  switch(modalProgress) {
    case 2 : modalWrite(); break;
          // case 2 : modalImgEdit(); break;
          // case 3 : modalWrite(); break;
//========================================================================
    case 4 : modalSubmit(); submitForm(); break;

    default : console.log("다음 버튼 클릭"); break;
  }
});

function modalCloseAlert() {
  if(modalProgress > 1) {
    modalContentDeep.classList.remove("hide");
    return;
  }
  modalOverlay.classList.add("hide");
  document.documentElement.style.overflowY = "auto";
}

document.getElementById("modalContentDeepConfirm").addEventListener("click", () => {
  modalContentDeep.classList.add("hide");
  modalOverlay.classList.add("hide");

  if(backflag === true) {
    backflag = false;
    modalNew();
  }
});

document.getElementById("modalContentDeepCancel").addEventListener("click", () => {
  modalContentDeep.classList.add("hide");
});

function scrollLock() {
  // html 문서의 스크롤을 없에고
  document.documentElement.style.overflowY = "hidden";
  
  // 모달창에 스크롤을 주겠다 == 스크롤바가 존재는 하지만 비활성 상태로 존재
  modalOverlay.style.overflowY = "scroll";
  modalOverlay.style.overflowX = "hidden";
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
document.getElementById("modalContentLeftInnerButton").addEventListener("click", () => {
  document.getElementById("modalContentLeftInnerImg").click();
});

document.getElementById("modalContentLeftInnerImg").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file && isSupportedFile(file)) {
    // 파일 업로드 성공
    console.log("File uploaded:", file.name);
    console.log("File:", file);
    modalWithImg();
  } else if(file && !isSupportedFile(file)) {
    filename = file.name;
    modalError();
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
    if(byteLength(document.getElementById("emojiTextArea").value) + byteLength(selection.emoji) <= MAX_BYTES)
      textArea.value += selection.emoji;

    byteCount.textContent = byteLength(textArea.value);
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
  byteCount.textContent = byteLength(textArea.value);
});

textArea.addEventListener('input', () => {
  if (byteLength(textArea.value) > MAX_BYTES) {

    // 바이트 초과 시 초과 부분 제거
    while (byteLength(textArea.value) > MAX_BYTES) {
      textArea.value = textArea.value.slice(0, -1);
    }
  }

  // 현재 바이트 수 업데이트
  byteCount.textContent = byteLength(textArea.value);
});


// 검색 결과 업데이트 함수
function updateSearchResults(results, isHashtag = false) {
  searchResults.innerHTML = ''; // 이전 결과 지우기
  if (results.length === 0) {
    searchResults.innerHTML = '<div style="padding-right: 20px; text-align: center;"><p>검색 결과가 없습니다.</p></div>';
    return;
  }

  // 검색 결과 렌더링
  results.forEach(result => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('result-item');
    if(isHashtag) {
      // 해시태그 결과 랜더링
      resultItem.innerHTML = `
        <a href="/hashtag/${encodeURIComponent(result.tagName)}" class="hashtag-info">
          <div class="hashtag-name">${result.tagName}</div>
          <div class="hashtag-count">게시물 수: ${result.postCount}</div>
        </a>
      `;
    } else {
      resultItem.innerHTML = `
          <a href="/member/${result.memberNickname}" class="member-info">
            <div class="profile-img">
              <img src="${result.profileImg}">
            </div>
            <div class="member-text">
              <div class="member-nickname">${result.memberNickname}</div>
              <div class="member-name">${result.memberName}</div>
            </div>
          </a>
      `;
    }
    searchResults.appendChild(resultItem);
  });

}


  if (query.startsWith('#')) {
    // 해시태그 검색인 경우
    searchUrl = `/hashtag/search?query=${encodeURIComponent(query)}`;
  } else if (isKorean(query)) {
    searchUrl = `/member/search?query=${encodeURIComponent(query)}&type=name`;
  } else {
    searchUrl = `/member/search?query=${encodeURIComponent(query)}&type=nickName`;
  }

  // 비동기 요청(Fetch API 사용)
  fetch(searchUrl)
      .then(response => response.json())
      .then(data => {
        updateSearchResults(data, query.startsWith('#')); // 해시태그 여부 전달
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
      });



//=======================================================
// 제출

async function submitForm() {

  const formData = new FormData();
  const textAreaContent = document.getElementById("emojiTextArea").value;
  const files = document.getElementById("modalContentLeftInnerImg").files;

  formData.append("boardContent", textAreaContent);

  for (let i = 0; i < files.length; i++) {
    formData.append("images", files[i]);
  }

  try {
    const response = await fetch("/board/submitFeed", {
      method: "POST",
      body: formData,
      headers: {
      }
    });

    if (response.ok) {
      const result = await response.text();
      if(result > 0) {

        setTimeout(() => {
          document.getElementById("submit").src = "/images/check.gif";
          modalTopText.innerText = "게시물이 공유되었습니다";
          document.getElementById("submitText").innerText = "게시물이 공유되었습니다"
        }, 3000);

      }
      // 모달 닫기, 화면 초기화 등 추가 작업
      else alert("게시물 등록에 실패했습니다.");
    }
  } catch (error) {
    console.error("폼 제출 오류:", error);
    alert("서버와의 통신에 실패했습니다.");
  }
}

// ====================================================================================================




//  + 공유하기 눌렀을 때 나올 모달창 두개만 만들어서 header에 넣으면 진진짜 끝끝


// 검색 입력 필드 이벤트 리스너
textArea.addEventListener('input', () => {
  const query = textArea.value.trim();
  if (query) {
    clearButton.style.display = 'block'; // 입력값이 있을 때 X 버튼 표시
    recentSearch.style.display = 'none'; // 최근 검색 항목 숨기기
    searchResults.style.display = 'block'; // 검색 결과 표시

    let searchUrl;

    if (query.startsWith('#')) {
      // 해시태그 검색인 경우
      searchUrl = `/hashtag/search?query=${encodeURIComponent(query)}`;
    } else if (isKorean(query)) {
      searchUrl = `/member/search?query=${encodeURIComponent(query)}&type=name`;
    } else {
      searchUrl = `/member/search?query=${encodeURIComponent(query)}&type=nickName`;
    }

    // 비동기 요청(Fetch API 사용)
    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
          updateSearchResults(data, query.startsWith('#')); // 해시태그 여부 전달
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        });
  } else {
    clearButton.style.display = 'none'; // 입력값이 없을 때 X 버튼 숨김
    recentSearch.style.display = 'block'; // 최근 검색 항목 표시
    searchResults.innerHTML = ''; // 검색 결과 초기화
    searchResults.style.display = 'none'; // 검색 결과 숨기기
  }
});

// 검색 결과 업데이트 함수
function updateSearchResults(results, isHashtag = false) {
  searchResults.innerHTML = ''; // 이전 결과 지우기
  if (results.length === 0) {
    searchResults.innerHTML = '<div style="padding-right: 20px; text-align: center;"><p>검색 결과가 없습니다.</p></div>';
    return;
  }

  // 검색 결과 렌더링
  results.forEach(result => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('result-item');
    if(isHashtag) {
      // 해시태그 결과 랜더링
      resultItem.innerHTML = `
        <a href="/hashtag/${encodeURIComponent(result.tagName)}" class="hashtag-info">
          <div class="hashtag-name">${result.tagName}</div>
          <div class="hashtag-count">게시물 수: ${result.postCount}</div>
        </a>
      `;
    } else {
      resultItem.innerHTML = `
          <a href="/member/${result.memberNickname}" class="member-info">
            <div class="profile-img">
              <img src="${result.profileImg}">
            </div>
            <div class="member-text">
              <div class="member-nickname">${result.memberNickname}</div>
              <div class="member-name">${result.memberName}</div>
            </div>
          </a>
      `;
    }
    searchResults.appendChild(resultItem);
  });
}

// 모달창 이벤트 전부 분리
