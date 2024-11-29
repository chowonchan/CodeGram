const moreButton = document.querySelector('.more');
const moreMenu = document.querySelector('.more-menu');
const sidebar = document.querySelector('.sidebar');
const logo = document.querySelector('.logo');
const sidePanel = document.getElementById('sidePanel');
const searchPanel = document.getElementById('searchPanel');
const notificationPanel = document.getElementById('notificationPanel');
const searchTab = document.getElementById('searchTab');
const notificationTab = document.getElementById('notificationTab');
const searchInput = document.getElementById('searchInput'); // 검색 입력 필드
const clearButton = document.getElementById('clearButton'); // X 버튼
const recentSearch = document.getElementById('recentSearch');
const searchResults = document.getElementById('searchResults');
const deleteBtn = document.querySelector('.deleteBtn'); // 모두 지우기 버튼
const clearAllModal = document.getElementById('clearAllModal');
const clearAllConfirm = document.querySelector('.clear-all-confirm');
const clearAllCancel = document.querySelector('.clear-all-cancel');

// 사이드바 축소 시 로고 변경
function toggleLogo() {
  logo.style.opacity = '0'; // 로고 숨기기
  setTimeout(() => {
    if (sidebar.classList.contains('narrow')) {
      logo.innerHTML = '<a class="fa-brands fa-instagram" href="#"></a>'; // 새로운 아이콘으로 변경
    } else {
      logo.textContent = 'Codegram'; // 원래 로고 텍스트로 복원
    }
    logo.style.opacity = '1'; // 로고 다시 보이게
  }, 300); // 300ms 후에 변경
}

// 사이드바 및 패널 토글 함수
function toggleSidebar() {
  sidebar.classList.toggle('narrow'); // `narrow` 클래스를 추가하거나 제거
  sidePanel.classList.toggle('hidden'); // `hidden` 클래스를 추가하거나 제거
  toggleLogo(); // 로고 변경 함수 호출
}

// 패널 표시 함수
function showPanel(type) {
  // 동일한 탭을 다시 클릭한 경우 사이드바와 패널 닫기
  if ((type === 'search' && searchPanel.classList.contains('active')) ||
    (type === 'notification' && notificationPanel.classList.contains('active'))) {
    sidebar.classList.remove('narrow'); // `narrow` 클래스 제거
    sidePanel.classList.add('hidden'); // `sidePanel` 숨기기

    searchPanel.classList.remove('active'); // `active` 클래스 제거
    notificationPanel.classList.remove('active'); // `active` 클래스 제거
    toggleLogo(); // 로고 변경 함수 호출
    return; // 함수 종료
  }

  // 사이드 패널이 숨겨져 있는 경우에만 토글
  if (sidePanel.classList.contains('hidden')) {
    toggleSidebar();
  }

  // 패널 내용 변경
  if (type === 'search') {
    searchPanel.classList.add('active');
    notificationPanel.classList.remove('active');
    searchInput.value = ''; // 검색 입력 필드 비우기
    searchResults.style.display = 'none'; // 검색 결과 숨기기
    recentSearch.style.display = 'block'; // 최근 검색 항목 표시
    searchInput.focus(); // 검색 입력 필드에 포커스 설정
  } else if (type === 'notification') {
    notificationPanel.classList.add('active');
    searchPanel.classList.remove('active');
  }

  // 메시지 페이지로 이동한 경우 사이드바에 narrow 클래스 추가
  if (window.location.pathname.includes('/chatting')) {
    sidebar.classList.add('narrow'); // 사이드바에 narrow 클래스 추가
    sidePanel.classList.add('hidden'); // 사이드 패널 숨기기 (필요 시)
  }
}

// 검색 및 알림 탭 클릭 이벤트
searchTab.addEventListener('click', () => {
  showPanel('search');
});

notificationTab.addEventListener('click', () => {
  showPanel('notification');
});


// X 버튼 클릭 이벤트
clearButton.addEventListener('click', () => {
  searchInput.value = ''; // 입력 필드 비우기
  clearButton.style.display = 'none'; // X 버튼 숨기기
  recentSearch.style.display = 'block'; // 최근 검색 항목 표시
  searchResults.style.display = 'none'; // 검색 결과 숨기기
  searchInput.focus(); // 입력 필드에 포커스 유지
});

// 더보기 버튼 클릭 이벤트
moreButton.addEventListener('click', (event) => {
  event.stopPropagation(); // 이벤트 전파 중지
  moreMenu.style.display = moreMenu.style.display === 'flex' ? 'none' : 'flex';
  moreButton.classList.toggle('active');
});

// 문서 전체 클릭 이벤트 (더보기 메뉴 닫기)
document.addEventListener('click', (event) => {
  if (!moreButton.contains(event.target) && !moreMenu.contains(event.target)) {
    moreMenu.style.display = 'none';
    moreButton.classList.remove('active');
  }
  if (!sidebar.contains(event.target) && !sidePanel.contains(event.target)) {
    if (sidebar.classList.contains('narrow')) {
      toggleSidebar();
      searchPanel.classList.remove('active'); // `active` 클래스 제거
      notificationPanel.classList.remove('active'); // `active` 클래스 제거
    }
  }
});

function isKorean(text) {
  // 정규식을 사용하여 한글인지 확인합니다.
  const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  return koreanRegex.test(text);
}

// 검색 입력 필드 이벤트 리스너
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();
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

// "모두 지우기" 버튼 표시/숨기기 함수
function toggleDeleteBtn() {
  const hasSearchItems = recentSearch.querySelectorAll('a').length > 0;
  deleteBtn.style.display = hasSearchItems ? 'inline' : 'none'; // a 태그가 있으면 표시, 없으면 숨김
}

// 검색 결과 클릭 이벤트 리스너 (한 번만 등록)
if (!searchResults.hasListener) { // 이벤트 리스너가 이미 등록되었는지 확인
  searchResults.addEventListener('click', (event) => {
    if (event.target.tagName === 'A' || event.target.closest('a')) {
      event.preventDefault(); // 기본 링크 이동 방지

      const clickedLink = event.target.closest('a');
      const href = clickedLink.getAttribute('href');
      const memberNickname = clickedLink.querySelector('.member-nickname').textContent;
      const memberName = clickedLink.querySelector('.member-name').textContent;
      const profileImgSrc = clickedLink.querySelector('.profile-img img').src;

      // 중복 여부 확인
      const existingItems = Array.from(recentSearch.querySelectorAll('a'));
      const isDuplicate = existingItems.some(item => item.href === href);

      if (!isDuplicate) { // 중복이 아닐 때만 추가
        const newSearchItem = document.createElement('a');
        newSearchItem.href = href;
        newSearchItem.classList.add('member-info');
        newSearchItem.innerHTML = `
                  <div class="profile-img">
                      <img src="${profileImgSrc}">
                  </div>
                  <div class="member-text">
                      <div class="member-nickname">${memberNickname}</div>
                      <div class="member-name">${memberName}</div>
                  </div>
                  <button class="remove-button">&times;</button> <!-- X 버튼 추가 -->
                  `;

        // X 버튼 이벤트 리스너
        newSearchItem.querySelector('.remove-button').addEventListener('click', (e) => {
          e.preventDefault(); // 이벤트 전파 중지
          e.stopPropagation(); // 이벤트 전파 중지
          newSearchItem.remove(); // a 태그 삭제
          if (recentSearch.querySelectorAll('a').length === 0) {
            toggleDeleteBtn(); // 버튼 상태 업데이트
          }
        })

        recentSearch.appendChild(newSearchItem); // 최근 검색 항목에 추가
        toggleDeleteBtn(); // 버튼 상태 업데이트
      }

      // 링크 이동
      window.location.href = href;
    }
  });

  searchResults.hasListener = true; // 이벤트 리스너가 등록되었을을 표시
}

// 모두 지우기 버튼 클릭 이벤트
deleteBtn.addEventListener('click', () => {
  clearAllModal.classList.remove('hidden');
  clearAllModal.style.display = 'flex'; // 모달 창 표시
});

// "Clear all" 버튼 클릭 시 모든 검색 내역 삭제 및 모달 닫기
clearAllConfirm.addEventListener('click', () => {
  recentSearch.querySelectorAll('a').forEach(item => item.remove()); // 모든 a 태그 삭제
  toggleDeleteBtn(); // 버튼 상태 업데이트
  clearAllModal.classList.add('hidden');
  clearAllModal.style.display = 'none'; // 모달 창 숨김
});

// "나중에 하기" 버튼 클릭 시 모달 닫기
clearAllCancel.addEventListener('click', () => {
  clearAllModal.classList.add('hidden');
  clearAllModal.style.display = 'none'; // 모달 창 숨김
});




/* -----------------알림 목록 창-------------------- */

// const SseConnect = () => {

//   if (notificationLoginCheck === false) return;

//   console.log("SseConnect() 호출");

//   // 서버의 "/sse/connect" 주소로 연결 요청
//   const eventSource = new EventSource("/sse/connect");

//   console.log(eventSource);
//   // -------------------------------------------------------

//   /* 메시지가 왔을 경우 */
//   eventSource.addEventListener("message", e => {
//     console.log(e.data);



//     const obj = JSON.parse(e.data);
//     console.log(obj);
//     // 알림을 받는 사람 번호, 읽지 않은 알림 개수


//     /* 만약 알림 목록이 열려 있을 경우 */
//     const notificationList
//       = document.querySelector(".notification-list");

//     if (notificationList.classList.contains("notification-show")) {
//       selectNotiList(); // 알림 목록 비동기 조회
//     }
//   });

//   /* 서버 연결이 종료된 경우( 타임 아웃 초과 ) */
//   eventSource.addEventListener("error", () => {
//     console.log("SSE 재연결 시도")
//     eventSource.close(); // 기존 연결 닫기

//     // 5초 후 재연결 시도
//     setTimeout(() => SseConnect(), 5000);
//   })
// }


// const sendNoti = (type, url, pkNo, content) => {
//   if (notificationLoginCheck === false) return;

//   const notification = {
//     "notificationType": type,
//     "notificationUrl": url,
//     "pkNo": pkNo,
//     "notificationContent": content
//   }
//   fetch("/sse/send", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(notification)
//   })
//     .then(response => {
//       if (!response.ok) { // 비동기 통신 실패
//         throw new Error("전송 실패");
//       }
//       console.log("전송 성공");
//     })
//     .catch(err => console.error(err));

// }




// const selectNotiList = () => {
//   if (notificationLoginCheck === false) return;

//   fetch("/sse/notification")
//     .then(response => {
//       if (response.ok) return response.json();
//       throw new Error("알림 목록 조회 실패");
//     })
//     .then(list => {
//       console.log(list);

//       const notiList = document.querySelector(".notification-list");
//       notiList.innerHTML = '';

//       for (let data of list) {
//         const notiItem = document.createElement("li");
//         notiItem.className = 'notification-item';


//         // 알림을 읽지 않은 경우 'not-read' 추가
//         if (data.notificationCheck == 'N') notiItem.classList.add("not-read");

//         const notiText = document.createElement("div");
//         notiText.className = 'notification-text';

//         notiText.addEventListener("click", e => {
//           // 만약 읽지 않은 알람인 경우
//           if (data.notificationCheck == 'N') {
//             fetch("/sse/notification", {
//               method: "PUT",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify(data.notificationNo)
//             })
//               .then(response => {
//                 if (!response.ok) { // 비동기 통신 실패
//                   throw new Error("전송 실패");
//                 }
//                 console.log("전송 성공");
//               })
//               .catch(err => console.error(err));
//           }

//           window.location.href = data.notificationUrl;
//         })

//         // 알림 보낸 회원 프로필 이미지
//         const senderProfile = document.createElement("img");
//         if (data.sendMemberProfileImg == null) senderProfile.src = notificationDefaultImage; // 기본 이미지
//         else senderProfile.src = data.sendMemberProfileImg; // 프로필 이미지
        
//         // 알림 내용 영역
//         const contentContainer = document.createElement("div");
//         contentContainer.className = 'notification-content-container';
        
//         // 알림 내용
//         const notiContent = document.createElement("p");
//         notiContent.className = 'notification-content';
//         notiContent.innerHTML = data.notificationContent; // 태그가 해석될 수 있도록 innerHTML
        
//         // 알림 보내진 시간
//         const notiDate = document.createElement("p");
//         notiDate.className = 'notification-date';
//         notiDate.innerText = data.notificationDate;
        
//         // 팔로우 알림인 경우 버튼 생성
//         if (data.notificationType === 'follow') {
//           const followDiv = document.createElement("div");
//           followDiv.className = 'notification-follow-container';
        
//           const followAlarmBtn = document.createElement("button");
//           followAlarmBtn.className = 'notification-follow-btn';
        
//           // 내가 이미 팔로우한 경우
//           if (data.isFollowing) {
//             followAlarmBtn.innerText = '팔로잉'; // 팔로잉 버튼 텍스트
//             followAlarmBtn.disabled = true; // 팔로잉 버튼은 비활성화
//             followAlarmBtn.classList.add('following'); // 이미 팔로잉 중인 스타일 적용 (선택 사항)
//           } 
//           // 팔로우하지 않은 경우
//           else {
//             followAlarmBtn.innerText = '팔로우'; // 팔로우 버튼 텍스트
//             followAlarmBtn.addEventListener('click', () => {
//               // 팔로우 요청 로직 (API 호출 등)
//               console.log(`${data.senderId}를 팔로우합니다.`);
//               followAlarmBtn.innerText = '팔로잉'; // 클릭 후 팔로잉 상태로 변경
//               followAlarmBtn.disabled = true; // 버튼 비활성화
//             });
//           }
        
//           followDiv.appendChild(followAlarmBtn); // 버튼을 div에 추가
//           contentContainer.appendChild(followDiv); // 알림 컨텐츠에 팔로우 div를 추가
//         }



//         // 삭제 버튼
//         const notiDelete = document.createElement("span");
//         notiDelete.className = 'notification-delete';
//         notiDelete.innerHTML = '&times;';

//         notiDelete.addEventListener("click", e => {
//           fetch("/sse/notification", {
//             method: "DELETE", // DELETE
//             headers: { "Content-Type": "application/json" },
//             body: data.notificationNo
//           })
//             .then(response => {
//               if (response.ok) { // 비동기 통신 실패
//                 // 클릭된 x버튼이 포함된 알림 삭제
//                 notiDelete.parentElement.remove();

//                 return;
//               }
//               console.log("응답이 좋지 않습니다");
//             })
//             .catch(err => console.error(err));
//         })

//         // 조립
//         notiList.append(notiItem);
//         notiItem.append(notiText, notiDelete);
//         notiText.append(senderProfile, contentContainer);
//         contentContainer.append(notiDate, notiContent);
//       }
//     })
//     .catch(err => console.error(err));
// }


// document.addEventListener("DOMContentLoaded", () => {
//   SseConnect(); // SSE 연결

//   // 알림 버튼 클릭 후 출력
//   const notificationTab
//     = document.querySelector("#notificationTab");

//     notificationTab?.addEventListener("click", () => {

//     // 알림 목록
//     const notificationList
//       = document.querySelector(".notification-list");

//     // 알림 목록이 보이고 있을 경우
//     if (notificationList.classList.contains("notification-show")) {

//       // 안보이게 하기
//       notificationList.classList.remove("notification-show");
//     }

//     else { // 안보이는 경우
//       selectNotiList(); // 비동기로 목록 조회 후

//       // 화면에 목록 보이게 하기
//       notificationList.classList.add("notification-show");
//     }
//   });



//   const params = new URLSearchParams(location.search);
//   const cn = params.get("cn");

//   if (cn != null) {
//     const targetId = "c" + cn; 


//     const target = document.getElementById(targetId);


//     const scrollPosition = target.offsetTop;

//     // 창을 스크롤
//     window.scrollTo({
//       top: scrollPosition - 75,
//       behavior: "smooth"
//     });

//   }

// });


/* -----------------알림 목록 창-------------------- */