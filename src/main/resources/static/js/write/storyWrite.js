if (document.getElementsByTagName("head").length > 0) {
  document.getElementsByTagName("head")[0].insertAdjacentHTML(
      "beforeend",
      '<link rel="stylesheet" href="/css/write/feed-write.css"/>'
  );
}

const modalStoryWriteOverlay = document.getElementById("storymodalFeedWriteOverlay");

const modalStoryContent = document.getElementById("storymodalContent");
const modalStoryContentDeep = document.getElementById("storymodalContentDeep");

const modalStoryTop = document.getElementById("storymodalContentTop");
const modalStoryTopPrev = document.getElementById("storymodalContentTopPrev");
const modalStoryTopText = document.getElementById("storymodalContentTopText");
const modalStoryTopNext = document.getElementById("storymodalContentTopNext");

const modalStoryRight = document.getElementById("storymodalContentRight");


let storyFilename = "등록 시도한 파일의 이름.확장자"
let storyFlag = 0;


// 모달 X 버튼 클릭
document.getElementById("storymodalCloseButton").addEventListener("click", () => {
  modalStoryCloseAlert();
});

document.getElementById("storymodalContentDeepBackground").addEventListener("click", () => {
  modalStoryContentDeep.classList.add('hide');
})

// 모달 반투명 배경 클릭
document.getElementById("storymodalFeedWriteOverlayBackground").addEventListener("click", () => {
  modalStoryCloseAlert();
});

let modalStoryProgress = 1;
// 0. 에러
// 1. 초기
// 2. 순서변경
// 3. 이미지 편집
// 4. 글 등록

// 이벤트 넣을때는 매우 신중하게!
function modalStorySmall() {
  modalStoryContent.style.width = "734px";
  modalStoryTop.style.width = "734px";
  modalStoryRight.style.width = "0px";
  modalStoryRight.style.borderLeft = "0px";
  // modalRight.classList.add("hide");
  document.getElementById("storymodalContentTopNext").style.width = "50px";
}

function modalStoryHide() {
  modalStoryWriteOverlay.classList.remove("hide");

  document.getElementById("storymodalPostNew").classList.add("hide");
  document.getElementById("storymodalPostErr").classList.add("hide");
  document.getElementById("storymodalContentLeftInner").classList.add("hide");

  document.getElementById("storymodalContentLeftInnerErr").classList.add("feed-write-hidden");
  document.getElementById("storymodalContentLeftImg").classList.add("hide");

  document.getElementById("storymodalContentSubmit").classList.add("hide");

  modalStoryTopNext.classList.add("hide");
  modalStoryTopPrev.classList.add("hide");
}

function storyNew() {
  // 모달 초기값 지정
  modalStorySmall();
  modalStoryHide();
  // top 가로, content 가로, right display: none;
  // 상단 텍스트, 내부 이미지, 내부 텍스트, 버튼 글자
  document.getElementById("storymodalContentLeftInner").classList.remove("hide");
  document.getElementById("storymodalPostNew").classList.remove("hide");

  modalStoryTopText.innerText = "스토리 작성";
  document.getElementById("storymodalContentLeftInnerText").innerText = "사진을 여기에 끌어다 놓으세요."
  document.getElementById("storymodalContentLeftInnerButton").innerText = "컴퓨터에서 선택"

  document.getElementById("storysubmit").src = "";
  document.getElementById("storysubmitText").innerText = ""

  scrollStoryLock();

  clearStoryProgress();
  modalStoryProgress = 1;
}

function modalStoryError() {
  // 상단 텍스트, 내부 이미지, 내부 텍스트, 버튼 글자
  document.getElementById("storymodalPostNew").classList.add("hide");
  document.getElementById("storymodalPostErr").classList.remove("hide");
  document.getElementById("storymodalContentLeftImg").classList.add("hide");

  modalStoryTopText.innerText = "이미지를 업로드하지 못하였습니다";
  document.getElementById("storymodalContentLeftInnerText").innerText = "지원되지 않는 파일입니다."
  document.getElementById("storymodalContentLeftInnerErr").innerText = storyFilename + " 파일을 업로드하지 못하였습니다."
  document.getElementById("storymodalContentLeftInnerErr").classList.remove("feed-write-hidden");

  document.getElementById("storymodalContentLeftInnerButton").innerText = "다른 파일 선택"

  modalStoryProgress = 0;
}

function modalStoryWithImg() {
  // 상단 텍스트 변경 및 버튼 좌, 우 생성
  // 내부 이미지, 내부 텍스트, 버튼 글자 제거
  modalStorySmall();
  document.getElementById("storymodalContentLeftInner").classList.add("hide");
  document.getElementById("storymodalContentLeftImg").classList.remove("hide");

  modalStoryTopNext.classList.remove("hide");
  modalStoryTopPrev.classList.remove("hide");

  modalStoryTopText.innerText = "스토리 등록";
  document.getElementById("storymodalContentTopNext").style.width = "80px";
  document.getElementById("storymodalContentTopNext").innerText = "공유하기";

  modalStoryProgress = 4;
}

function modalStorySubmit() {
  modalStorySmall();

  modalStoryTopNext.classList.add("hide");
  modalStoryTopPrev.classList.add("hide");

  document.getElementById("storymodalContentLeftImg").classList.add("hide");
  document.getElementById("storymodalContentSubmit").classList.remove("hide");

  document.getElementById("storysubmit").src = "/images/loading.gif";
  modalStoryTopText.innerText = "공유 중입니다";
  modalStoryProgress = 0;
}


// 모달 전체 초기화 함수
function clearStoryProgress() {

  // 저장된 이전 파일 목록 삭제
  for (let x = 0; x < lastValidStoryFiles.length; x++) lastValidStoryFiles[x] = "";

  // 삽입된 이미지 배열 초기화
  for (let y = 0; y < storyInputImageList.length; y++) storyInputImageList[y].value = "";

  // 미리보기 삭제
  for (let z = 0; z < storyPreviewList.length; z++) storyPreviewList[z].src = "";

  document.getElementById("storymodalContentLeftInnerImg").value = "";

  textArea.innerText = "";
  // 가로 세로 hide hidden, 버튼, 텍스트 등 싹 초기화
}

let backflagStory = false;

modalStoryTopPrev.addEventListener("click", () => {
  console.log("뒤로가기 버튼 클릭 : ", modalStoryProgress);
  switch (modalStoryProgress) {
    case 2 :


    case 4 :
      backflagStory = true;
      modalStoryCloseAlert();
      break;
    default :
      console.log("뒤로가기 버튼 클릭");
      break;
  }
});

document.getElementById("storymodalContentTopNext").addEventListener("click", () => {
  switch (modalStoryProgress) {
    case 2 :
      modalWrite();
      break;
      // case 2 : modalImgEdit(); break;
      // case 3 : modalWrite(); break;
//========================================================================
    case 4 :
      modalStorySubmit();
      submitStory();
      break;

    default :
      console.log("다음 버튼 클릭");
      break;
  }
});

function modalStoryCloseAlert() {
  if (modalStoryProgress > 1) {
    modalStoryContentDeep.classList.remove("hide");
    return;
  }
  modalStoryWriteOverlay.classList.add("hide");
  document.documentElement.style.overflowY = "auto";
}

document.getElementById("storymodalContentDeepConfirm").addEventListener("click", () => {
  modalStoryContentDeep.classList.add("hide");
  modalStoryWriteOverlay.classList.add("hide");

  if (backflagStory === true) {
    backflagStory = false;
    storyNew();
  }
});

document.getElementById("storymodalContentDeepCancel").addEventListener("click", () => {
  modalStoryContentDeep.classList.add("hide");
});

function scrollStoryLock() {
  // html 문서의 스크롤을 없에고
  document.documentElement.style.overflowY = "hidden";

  // 모달창에 스크롤을 주겠다 == 스크롤바가 존재는 하지만 비활성 상태로 존재
  modalStoryWriteOverlay.style.overflowY = "scroll";
  modalStoryWriteOverlay.style.overflowX = "hidden";
}

// ====================================================================================================


// 이미지 삽입 관련 script
function isSupportedStoryFile(file) {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  return allowedTypes.includes(file.type);
}

const maxSizeStory = 1024 * 1024 * 20;  // 10MB를 byte 단위로 작성
// 이미지는 최대 5장까지
const lastValidStoryFiles = [null, null, null, null, null];

// 사진 추가 버튼 클릭
document.getElementById("storymodalContentLeftInnerButton").addEventListener("click", () => {
  document.getElementById("storymodalContentLeftInnerImg").click();
});

document.getElementById("storymodalContentLeftInnerImg").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file && isSupportedStoryFile(file)) {
    // 파일 업로드 성공
    console.log("File uploaded:", file.name);
    console.log("File:", file);
    modalStoryWithImg();
  } else if (file && !isSupportedStoryFile(file)) {
    storyFilename = file.name;
    modalStoryError();
  }
});

const storyInputImageList = document.getElementsByClassName("modal-story-content-left-img-view");
const storyPreviewList = document.getElementsByClassName("story-preview");

/**
 * 미리보기 함수
 * @param file  : <input type="file"/> 에서 선택된 파일
 * @param order : 이미지 순서
 */
const updateStoryPreview = (file, order) => {  // 이미지 순서까지 얻어와야

  // 선택된 파일이 지정된 크기를 초과한 경우선택 막기
  const maxSize = 1024 * 1024 * 20;

  if (file.size > maxSize) {   // 파일 크기 초과 시
    alert("20MB 이하의 이미지만 선택해 주세요");

    if (lastValidStoryFiles[order] === null) {
      storyInputImageList[order].value = ""; // 선택 파일 삭제
      return;
    }

    // 이전 선택된 파일이 있을 때
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(lastValidStoryFiles[order]);
    storyInputImageList[order].files = dataTransfer.files;

    return;
  }


  lastValidStoryFiles[order] = file;

  // JS 에서 제공하는 파일을 읽어오는 객체
  const reader = new FileReader();

  // 파일을 읽어 오는데
  // DataURL 형식으로 읽어옴
  // DataURL : 파일 전체 데이터가 브라우저가 해석할 수 있는 긴 주소형태 문자열로 반환
  reader.readAsDataURL(file);

  reader.addEventListener("load", e => {
    storyPreviewList[order].src = e.target.result;
    // e.target.result == 파일이 변환된 주소 형태 문자열
  });
}

for (let i = 0; i < storyInputImageList.length; i++) {

  // input 태그에 이미지 선택 시 미리보기 함수 호출
  storyInputImageList[i].addEventListener("change", e => {
//================================================================================================================
// 여기를 수정해서 createElement 를 생성한다!
// 그런데 이미 있는 파일은 어떻게?
//================================================================================================================
    const file = e.target.files[i];


    console.log(file)

    if (file === undefined) {    // 선택 취소 시
      // 이전에 선택한 파일이 없는 경우
      if (lastValidStoryFiles[i] === null) return;

      // ** 이전에 선택한 파일이 "있을" 경우 **
      const dataTransfer = new DataTransfer();

      // DataTransfer 가 가지고 있는 files 필드에
      // lastValidFiles[i] 추가
      dataTransfer.items.add(lastValidStoryFiles[i]);

      // input의 files 변수에 lastValidFile이 추가된 files 대입
      storyInputImageList[i].files = dataTransfer.files;

      // 이전 선택된 파일로 미리보기 되돌리기
      updateStoryPreview(lastValidStoryFiles[i], i);

      return;
    }

    updateStoryPreview(file, i);
  });
}

//========================================================================
// // 글쓰기 부분
// const {createPopup} = window.picmoPopup;
// const MAX_BYTES = 2000; // 최대 바이트 제한
// const textArea = document.getElementById('emojiTextArea');
// const byteCount = document.getElementById('byteCount');
//
// document.addEventListener('DOMContentLoaded', () => {
//   const trigger = document.querySelector('#storytrigger');
//
//   const picker = createPopup({}, {
//     referenceElement: trigger,
//     triggerElement  : trigger,
//     position        : 'right-end',
//     zIndex : 1
//   });
//
//   trigger.addEventListener('click', () => {
//     picker.toggle();
//   });
//
//   picker.addEventListener('emoji:select', (selection) => {
//     console.log(byteLength(selection.emoji));
//     if (byteLength(textArea.innerText) + byteLength(selection.emoji) <= MAX_BYTES)
//       textArea.innerText += selection.emoji;
//
//     byteCount.textContent = byteLength(textArea.innerText);
//     textArea.focus();
//   });
// });


// UTF-8 바이트 계산 함수
// function byteLength(str) {
//   let bytes = 0;
//   for (let i = 0; i < str.length; i++) {
//     const code = str.charCodeAt(i);
//     if (code <= 0x7F) {
//       bytes += 1; // ASCII
//     } else if (code <= 0x7FF) {
//       bytes += 2; // 2바이트
//     } else if (code <= 0xFFFF) {
//       bytes += 3; // 3바이트
//     } else {
//       bytes += 4; // 4바이트 (Surrogate pair)
//     }
//   }
//   return bytes;
// }

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


// // 검색 결과 업데이트 함수
// function updateSearchResults(results, isHashtag = false) {
//   searchResults.innerHTML = ''; // 이전 결과 지우기
//   if (results.length === 0) {
//     searchResults.innerHTML = '<div style="padding-right: 20px; text-align: center;"><p>검색 결과가 없습니다.</p></div>';
//     return;
//   }
//
//   // 검색 결과 렌더링
//   results.forEach(result => {
//     const resultItem = document.createElement('div');
//     resultItem.classList.add('result-item');
//     if (isHashtag) {
//       // 해시태그 결과 랜더링
//       resultItem.innerHTML = `
//         <a href="/hashtag/${encodeURIComponent(result.tagName)}" class="hashtag-info">
//           <div class="hashtag-name">${result.tagName}</div>
//           <div class="hashtag-count">게시물 수: ${result.postCount}</div>
//         </a>
//       `;
//     } else {
//       resultItem.innerHTML = `
//           <a href="/member/${result.memberNickname}" class="member-info">
//             <div class="profile-img">
//               <img src="${result.profileImg}">
//             </div>
//             <div class="member-text">
//               <div class="member-nickname">${result.memberNickname}</div>
//               <div class="member-name">${result.memberName}</div>
//             </div>
//           </a>
//       `;
//     }
//     searchResults.appendChild(resultItem);
//   });
//
// }


//=======================================================
// 제출
async function submitStory() {

  const formData = new FormData();
  // const textAreaContent = document.getElementById("storyemojiTextArea").innerText;
  const files = document.getElementById("storymodalContentLeftInnerImg").files;


  formData.append("image", files[0]);


  try {
    const response = await fetch("/story/submit", {
      method : "POST",
      body   : formData,
      headers: {}
    });

    let timeout = Math.floor(Math.random() * 200) + 500;

    if (response.ok) {
      const result = await response.text();
      if (result > 0) {
        setTimeout(() => {
          document.getElementById("storysubmit").src = "/images/check.gif";
          modalStoryTopText.innerText = "스토리가 공유되었습니다";
          document.getElementById("storysubmitText").innerText = "스토리가 공유되었습니다"
        }, timeout);
      }
      // 모달 닫기, 화면 초기화 등 추가 작업
      else alert("스토리 등록에 실패했습니다.");
    }
  } catch (error) {
    console.error("폼 제출 오류:", error);
    alert("서버와의 통신에 실패했습니다.");
  }
}


// 검색 입력 필드 이벤트 리스너
// textArea.addEventListener('input', () => {
//   const query = textArea.innerText.trim();
//   if (query) {
//     clearButton.style.display = 'block'; // 입력값이 있을 때 X 버튼 표시
//     recentSearch.style.display = 'none'; // 최근 검색 항목 숨기기
//     searchResults.style.display = 'block'; // 검색 결과 표시
//
//     let searchUrl;
//
//     if (query.startsWith('#')) {
//       // 해시태그 검색인 경우
//       searchUrl = `/hashtag/search?query=${encodeURIComponent(query)}`;
//     } else if (isKorean(query)) {
//       searchUrl = `/member/search?query=${encodeURIComponent(query)}&type=name`;
//     } else {
//       searchUrl = `/member/search?query=${encodeURIComponent(query)}&type=nickName`;
//     }
//
//     // 비동기 요청(Fetch API 사용)
//     fetch(searchUrl)
//         .then(response => response.json())
//         .then(data => {
//           updateSearchResults(data, query.startsWith('#')); // 해시태그 여부 전달
//         })
//         .catch(error => {
//           console.error('Error fetching search results:', error);
//         });
//   } else {
//     clearButton.style.display = 'none'; // 입력값이 없을 때 X 버튼 숨김
//     recentSearch.style.display = 'block'; // 최근 검색 항목 표시
//     searchResults.innerHTML = ''; // 검색 결과 초기화
//     searchResults.style.display = 'none'; // 검색 결과 숨기기
//   }
// });

// 검색 결과 업데이트 함수
// function updateSearchResults(results, isHashtag = false) {
//   searchResults.innerHTML = ''; // 이전 결과 지우기
//   if (results.length === 0) {
//     searchResults.innerHTML = '<div style="padding-right: 20px; text-align: center;"><p>검색 결과가 없습니다.</p></div>';
//     return;
//   }
//
//   // 검색 결과 렌더링
//   results.forEach(result => {
//     const resultItem = document.createElement('div');
//     resultItem.classList.add('result-item');
//     if (isHashtag) {
//       // 해시태그 결과 랜더링
//       resultItem.innerHTML = `
//         <a href="/hashtag/${encodeURIComponent(result.tagName)}" class="hashtag-info">
//           <div class="hashtag-name">${result.tagName}</div>
//           <div class="hashtag-count">게시물 수: ${result.postCount}</div>
//         </a>
//       `;
//     } else {
//       resultItem.innerHTML = `
//           <a href="/member/${result.memberNickname}" class="member-info">
//             <div class="profile-img">
//               <img src="${result.profileImg}">
//             </div>
//             <div class="member-text">
//               <div class="member-nickname">${result.memberNickname}</div>
//               <div class="member-name">${result.memberName}</div>
//             </div>
//           </a>
//       `;
//     }
//     searchResults.appendChild(resultItem);
//   });
// }

// 모달창 이벤트 전부 분리
