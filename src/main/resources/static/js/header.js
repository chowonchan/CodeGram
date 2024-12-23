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
  // 메시지 페이지에서는 narrow를 강제로 유지
  if (window.location.pathname.includes('/chatting')) {
    sidebar.classList.add('narrow');
    return; // sidePanel은 숨기지 않음, 자유롭게 토글되도록 유지
  }

  // 메시지 페이지가 아닌 경우에만 일반적인 토글 동작
  sidebar.classList.toggle('narrow');
  sidePanel.classList.toggle('hidden');
  toggleLogo();
}

// 패널 표시 함수
function showPanel(type) {
  // 메시지 페이지에서는 narrow 유지하고 sidePanel을 자유롭게 토글
  if (window.location.pathname.includes('/chatting')) {
    sidebar.classList.add('narrow');
    // sidePanel의 숨김/표시는 자유롭게 처리
  } else {
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
  }
}

// 검색 및 알림 탭 클릭 이벤트
searchTab?.addEventListener('click', () => {
  showPanel('search');
});

notificationTab?.addEventListener('click', () => {
  showPanel('notification');
});


// X 버튼 클릭 이벤트
clearButton?.addEventListener('click', () => {
  searchInput.value = ''; // 입력 필드 비우기
  clearButton.style.display = 'none'; // X 버튼 숨기기
  recentSearch.style.display = 'block'; // 최근 검색 항목 표시
  searchResults.style.display = 'none'; // 검색 결과 숨기기
  searchInput.focus(); // 입력 필드에 포커스 유지
});

// 더보기 버튼 클릭 이벤트
moreButton?.addEventListener('click', (event) => {
  event.stopPropagation(); // 이벤트 전파 중지
  moreMenu.style.display = moreMenu.style.display === 'flex' ? 'none' : 'flex';
  moreButton.classList.toggle('active');
});




// -------------------밑에 코드 수정전 코드------------------
// document.addEventListener('click', (event) => {
//   if (!moreButton?.contains(event.target) && !moreMenu?.contains(event.target)) {
//     moreMenu?.style.display = 'none';
//     moreButton.classList.remove('active');
//   }
//   if (!sidebar.contains(event.target) && !sidePanel.contains(event.target)) {
//     if (sidebar.classList.contains('narrow')) {
//       toggleSidebar();
//       searchPanel.classList.remove('active'); // `active` 클래스 제거
//       notificationPanel.classList.remove('active'); // `active` 클래스 제거
//     }
//   }
// });
// -------------------밑에 코드 수정전 코드------------------



// 문서 전체 클릭 이벤트 (더보기 메뉴 닫기)
document.addEventListener('click', (event) => {
  // moreButton이나 moreMenu 외부를 클릭하면 메뉴를 닫고 active 클래스를 제거
  if (moreButton && !moreButton?.contains(event.target) && !moreMenu?.contains(event.target)) {
    if (moreMenu) {
      moreMenu.style.display = 'none';
    }
    if (moreButton) {
      moreButton.classList.remove('active');
    }
  }

  // sidebar나 sidePanel 외부를 클릭하면 사이드바를 토글하고 active 클래스를 제거
  if (sidebar && sidePanel && !sidebar.contains(event.target) && !sidePanel.contains(event.target)) {
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
searchInput?.addEventListener('input', () => {
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
    if (isHashtag) {
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

// -------------------밑에 코드 수정전 코드------------------
// if (!searchResults?.hasListener) { // 이벤트 리스너가 이미 등록되었는지 확인
//   searchResults?.addEventListener('click', (event) => {
//     if (event.target.tagName === 'A' || event.target.closest('a')) {
//       event.preventDefault(); // 기본 링크 이동 방지

//       const clickedLink = event.target.closest('a');
//       const href = clickedLink.getAttribute('href');
//       const memberNickname = clickedLink.querySelector('.member-nickname').textContent;
//       const memberName = clickedLink.querySelector('.member-name').textContent;
//       const profileImgSrc = clickedLink.querySelector('.profile-img img').src;

//       // 중복 여부 확인
//       const existingItems = Array.from(recentSearch.querySelectorAll('a'));
//       const isDuplicate = existingItems.some(item => item.href === href);

//       if (!isDuplicate) { // 중복이 아닐 때만 추가
//         const newSearchItem = document.createElement('a');
//         newSearchItem.href = href;
//         newSearchItem.classList.add('member-info');
//         newSearchItem.innerHTML = `
//                   <div class="profile-img">
//                       <img src="${profileImgSrc}">
//                   </div>
//                   <div class="member-text">
//                       <div class="member-nickname">${memberNickname}</div>
//                       <div class="member-name">${memberName}</div>
//                   </div>
//                   <button class="remove-button">&times;</button> <!-- X 버튼 추가 -->
//                   `;

//         // X 버튼 이벤트 리스너
//         newSearchItem.querySelector('.remove-button').addEventListener('click', (e) => {
//           e.preventDefault(); // 이벤트 전파 중지
//           e.stopPropagation(); // 이벤트 전파 중지
//           newSearchItem.remove(); // a 태그 삭제
//           if (recentSearch.querySelectorAll('a').length === 0) {
//             toggleDeleteBtn(); // 버튼 상태 업데이트
//           }
//         })

//         recentSearch.appendChild(newSearchItem); // 최근 검색 항목에 추가
//         toggleDeleteBtn(); // 버튼 상태 업데이트
//       }

//       // 링크 이동
//       window.location.href = href;
//     }
//   });

//   searchResults?.hasListener = true; // 이벤트 리스너가 등록되었을을 표시
// }
// -------------------밑에 코드 수정전 코드------------------



// 검색 결과 클릭 이벤트 리스너 (한 번만 등록)
let searchResultsHasListener = false; // 전역 변수로 리스너 상태 추적

if (!searchResultsHasListener) {
  searchResults?.addEventListener('click', (event) => {
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

  searchResultsHasListener = true; // 전역 변수로 리스너 상태 변경
}



// 모두 지우기 버튼 클릭 이벤트
deleteBtn?.addEventListener('click', () => {
  clearAllModal.classList.remove('hidden');
  clearAllModal.style.display = 'flex'; // 모달 창 표시
});

// "Clear all" 버튼 클릭 시 모든 검색 내역 삭제 및 모달 닫기
clearAllConfirm?.addEventListener('click', () => {
  recentSearch.querySelectorAll('a').forEach(item => item.remove()); // 모든 a 태그 삭제
  toggleDeleteBtn(); // 버튼 상태 업데이트
  clearAllModal.classList.add('hidden');
  clearAllModal.style.display = 'none'; // 모달 창 숨김
});

// "나중에 하기" 버튼 클릭 시 모달 닫기
clearAllCancel?.addEventListener('click', () => {
  clearAllModal.classList.add('hidden');
  clearAllModal.style.display = 'none'; // 모달 창 숨김
});




/* -----------------알림 목록 창-------------------- */


/**
 * SSE(SERVER SENT EVENTS) 

 * @author Jieun Park
 * @since 2022. 11. 15.
 */
const SseConnect = () => {

  if (notificationLoginCheck === false) return;

  console.log("SseConnect() 호출");

  // 서버의 "/sse/connect" 주소로 연결 요청
  const eventSource = new EventSource("/sse/connect");

  console.log(eventSource);
  // -------------------------------------------------------

  /* 메시지가 왔을 경우 */
  eventSource.addEventListener("message", e => {
    console.log(e.data);



    const obj = JSON.parse(e.data);
    console.log(obj);
    // 알림을 받는 사람 번호, 읽지 않은 알림 개수


    /* 만약 알림 목록이 열려 있을 경우 */
    const notificationList
      = document.querySelector(".notification-list");

    if (notificationList.classList.contains("notification-show")) {
      selectNotiList(); // 알림 목록 비동기 조회
    }

    notReadCheck();
  });


  /* 서버 연결이 종료된 경우( 타임 아웃 초과 ) */
  eventSource.addEventListener("error", () => {
    console.log("SSE 재연결 시도")
    eventSource.close(); // 기존 연결 닫기

    // 5초 후 재연결 시도
    setTimeout(() => SseConnect(), 5000);
  })
}


const sendNoti = (type, url, pkNo, content) => {
  if (notificationLoginCheck === false) return;

  const notification = {
    "notificationType": type,
    "notificationUrl": url,
    "pkNo": pkNo,
    "notificationContent": content
  }
  fetch("/sse/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notification)
  })
    .then(response => {
      if (!response.ok) { // 비동기 통신 실패
        throw new Error("전송 실패");
      }
      console.log("전송 성공");
      
    }) 
    .catch(err => console.error(err));

}


function getNotificationType(content) {
  if (content.includes('팔로우')) return 'FOLLOW';
  return 'ETC';
}

const selectNotiList = () => {
  if (notificationLoginCheck === false) return;

  fetch("/sse/notification")
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("알림 목록 조회 실패");
    })
    .then(list => {
      console.log(list);

      const notiList = document.querySelector(".notification-list");
      notiList.innerHTML = '';

      for (let data of list) {

        data.notificationType = getNotificationType(data.notificationContent);

        const notiItem = document.createElement("li");
        notiItem.className = 'notification-item';


        // 알림을 읽지 않은 경우 'not-read' 추가
        if (data.notificationCheck == 'N') notiItem.classList.add("not-read");

        const notiText = document.createElement("div");
        notiText.className = 'notification-text';

        notiText.addEventListener("click", e => {
          // e.stopPropagation(); // 이벤트 전파 중지
          // 만약 읽지 않은 알람인 경우


          if (data.notificationCheck == 'N') {
            fetch("/sse/notification", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data.notificationNo)
            })
              .then(response => {
                if (!response.ok) { // 비동기 통신 실패
                  throw new Error("전송 실패");
                }
                console.log("전송 성공");
              })
              .catch(err => console.error(err));
          }
          // console.log(e.target);
          if (!e.target.classList.contains('notification-follow-btn'))
            window.location.href = data.notificationUrl;
        })

        // 알림 보낸 회원 프로필 이미지
        const senderProfile = document.createElement("img");
        if (data.sendMemberProfileImg == null) senderProfile.src = notificationDefaultImage; // 기본 이미지
        else senderProfile.src = data.sendMemberProfileImg; // 프로필 이미지

        // 알림 내용 영역
        const contentContainer = document.createElement("div");
        contentContainer.className = 'notification-content-container';

        // 알림 내용
        const notiContent = document.createElement("p");
        notiContent.className = 'notification-content';
        notiContent.innerHTML = data.notificationContent; // 태그가 해석될 수 있도록 innerHTML

        // 알림 보내진 시간
        const notiDate = document.createElement("p");
        notiDate.className = 'notification-date';
        notiDate.innerText = data.notificationDate;

        // 조립
        notiList.append(notiItem);
        notiItem.append(notiText);
        notiText.append(senderProfile, contentContainer);
        contentContainer.append(notiContent, notiDate); // 알림 내용과 시간을 먼저 추가

        // 알림 번호
        // const notificationNo = notificationNo;

        // 상대 닉네임
        const targetNickname = data.notificationUrl.split("/")[2];

        // 팔로우 알림인 경우 버튼을 별도 div로 추가
        if (data.notificationType === 'follow'
          || data.notificationType === 'FOLLOW') {

          const followDiv = document.createElement("div");
          followDiv.className = 'notification-follow-container';

          const followAlarmBtn = document.createElement("span");
          followAlarmBtn.className = 'notification-follow-btn';

          (async () => {
            try {
              // 초기 상태 API 요청
              const response = await fetch(`/follow/status/${targetNickname}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              });

              const data = await response.json();

              if (!data.success) {
                console.error("팔로우 상태를 확인할 수 없습니다:", data.message);
                return;
              }

              let isFollowing = data.isFollowing === true || data.isFollowing === "1";

              // 버튼 상태 업데이트 함수
              const updateButton = (isFollowing) => {
                if (followAlarmBtn) {
                  followAlarmBtn.innerText = isFollowing ? "팔로잉" : "팔로우";
                  followAlarmBtn.classList.toggle("follow", !isFollowing);
                  followAlarmBtn.classList.toggle("notFollow", isFollowing);
                  followAlarmBtn.disabled = isFollowing;
                }

                const buttonElement = document.querySelector(".profile-follow-button");
                if (buttonElement) {
                  buttonElement.innerText = isFollowing ? "팔로우 취소" : "팔로우";
                } else {
                  console.error("프로필 팔로우 버튼을 찾을 수 없습니다.");
                }
              };

              // 버튼 초기화
              updateButton(isFollowing);



              // 버튼 클릭 이벤트
              followAlarmBtn.addEventListener("click", async () => {
                if (isFollowing) {
                  // 팔로우 취소 로직
                  const modal = document.getElementById("followCancelModal");
                  const followCancel = document.querySelector(".followCancelModal-cancelText");
                  const followClose = document.querySelector(".followCancelModal-closeText");

                  modal.classList.remove("cancel-hidden");

                  // 팔로우 취소 확인
                  followCancel.addEventListener("click", async () => {
                    try {
                      const response = await fetch(`/follow/${targetNickname}`, {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                      });

                      if (response.ok) {
                        isFollowing = false; // 상태 변경
                        updateButton(isFollowing); // 버튼 업데이트
                        alert("팔로우 취소 되었습니다."); // 확인 메시지
                      }
                    } catch (error) {
                      console.error("팔로우 취소 중 오류 발생:", error);
                    } finally {
                      modal.classList.add("cancel-hidden");
                    }
                  });

                  // 모달 닫기
                  followClose.addEventListener("click", () => {
                    modal.classList.add("cancel-hidden");
                  });
                } else {
                  // 팔로우 요청 로직
                  try {
                    const response = await fetch(`/follow/${targetNickname}`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                    });

                    if (response.ok) {
                      isFollowing = true; // 상태 변경

                      const data = await response.json();

                      const targetMemberNo = data.targetMemberNo;

                      sendNoti(
                        "follow",
                        `/member/${loginMemberNickname}`,
                        targetMemberNo,
                        `<strong>${loginMemberNickname}</strong>님이 회원님을 
                        <br>
                        팔로우하기 시작했습니다.`
                      );

                      updateButton(isFollowing); // 버튼 업데이트
                      alert("팔로우 되었습니다."); // 확인 메시지
                    }
                  } catch (error) {
                    console.error("팔로우 요청 중 오류 발생:", error);
                  }
                }
              });

              // followDiv 및 contentContainer에 버튼 추가
              followDiv.appendChild(followAlarmBtn);
              contentContainer.appendChild(followDiv);

            } catch (error) {
              console.error("팔로우 상태를 가져오는 중 오류 발생:", error);
            }
          })();
        }




        // 삭제 버튼
        const notiDelete = document.createElement("span");
        notiDelete.className = 'notification-delete';
        notiDelete.innerHTML = '&times;';

        notiDelete.addEventListener("click", e => {
          fetch("/sse/notification", {
            method: "DELETE", // DELETE
            headers: { "Content-Type": "application/json" },
            body: data.notificationNo
          })
            .then(response => {
              if (response.ok) { // 비동기 통신 실패
                // 클릭된 x버튼이 포함된 알림 삭제
                notiDelete.parentElement.remove();
                notReadCheck();
                return;
              }
              console.log("응답이 좋지 않습니다");
            })
            .catch(err => console.error(err));
        })

        // 조립

        notiItem.append(notiDelete);
        

      }
    })
    .catch(err => console.error(err));
}




const notReadCheck = () => {
  // 로그인 여부 확인
  if (!notificationLoginCheck) return;

  fetch("/sse/notification/notReadCheck")
    .then(response => {
      if (!response.ok) throw new Error("알림 확인 실패");
      return response.text(); // 서버에서 JSON 값 반환
    })
    .then(data => {
      // 서버에서 반환되는 값이 "true" 또는 "false" 문자열임을 가정
      const hasUnread = (data === "true"); // 서버에서 'true'/'false' 문자열 반환 확인

      const notificationCountArea = document.querySelector(".notification-count-area");

      if (!notificationCountArea) {
        console.error("notification-count-area 요소를 찾을 수 없습니다.");
        return;
      }



      console.log(hasUnread); // true 또는 false 출력

      // 읽지 않은 알림이 있을 때
      if (hasUnread) {
        notificationCountArea.style.display = "flex"; // 빨간 점 표시
      } else {
        // 읽지 않은 알림이 없을 때
        notificationCountArea.style.display = "none"; // 빨간 점 숨김
      }
    })
    .catch(err => {
      console.error("알림 확인 중 오류 발생:", err);
    });
};


document.addEventListener("DOMContentLoaded", () => {
  SseConnect(); // SSE 연결

  // 알림 버튼 클릭 후 출력
  const notificationTab
    = document.querySelector("#notificationTab");

  notificationTab?.addEventListener("click", () => {

    // 알림 목록
    const notificationList
      = document.querySelector(".notification-list");

    // 알림 목록이 보이고 있을 경우
    if (notificationList.classList.contains("notification-show")) {

      // 안보이게 하기
      notificationList.classList.remove("notification-show");
    }

    else { // 안보이는 경우
      selectNotiList(); // 비동기로 목록 조회 후

      // 화면에 목록 보이게 하기
      notificationList.classList.add("notification-show");
    }
  });



  const params = new URLSearchParams(location.search);
  const cn = params.get("cn");

  if (cn != null) {
    const targetId = "c" + cn;


    const target = document.getElementById(targetId);


    const scrollPosition = target.offsetTop;

    // 창을 스크롤
    window.scrollTo({
      top: scrollPosition - 75,
      behavior: "smooth"
    });

  }


});

document.addEventListener("DOMContentLoaded", () => {
  notReadCheck(); // 알림 확인
});




/* -----------------알림 목록 창-------------------- */





/* -----------------설정 모달 창-------------------- */

// document.addEventListener("DOMContentLoaded", function () {
//   // DOM 요소 선택
//   const openProfileSetting = document.getElementById("openProfileSetting"); // 설정 버튼
//   const profileSettingModal2 = document.getElementById("profileSettingModal2"); // 모달
//   const cancelModal = document.getElementById("cancleModal"); // 취소 버튼
//   console.log(document.getElementById("openProfileSetting"));
//   console.log(document.getElementById("profileSettingModal2"));
//   console.log(document.getElementById("cancleModal"));
//   // "설정" 클릭 시 모달 열기
//   openProfileSetting.addEventListener("click", function (event) {
//     event.preventDefault(); // 기본 동작 방지
//     profileSettingModal2.classList.remove("hidden"); // 모달 표시
//     profileSettingModal2.classList.add("active");
//   });

//   // "취소" 클릭 시 모달 닫기
//   cancelModal.addEventListener("click", function () {
//     profileSettingModal2.classList.add("hidden"); // 모달 숨기기
//     profileSettingModal2.classList.remove("active");
//   });

//   // 모달 외부 클릭 시 닫기
//   window.addEventListener("click", function (event) {
//     if (event.target === profileSettingModal2) {
//       profileSettingModal2.classList.add("hidden"); // 모달 숨기기
//       profileSettingModal2.classList.remove("active");
//     }
//   });
// });

// // 차단 목록 모달 열기
// document.getElementById("blockList")?.addEventListener("click", async () => {
//   try {
//     const response = await fetch("/block/blockList");
//     if (!response.ok) throw new Error("차단 목록 데이터를 불러오는 데 실패했습니다.");

//     const data = await response.json();

//     const blockedUsers = data.blockList;
//     console.log("서버에서 반환된 데이터:", data); // 서버 데이터 확인
//     const userList = document.getElementById("blockedUsers");
//     userList.innerHTML = "";

//     if (!blockedUsers || blockedUsers.length === 0) {
//       const emptyMessage = document.createElement("p");
//       emptyMessage.textContent = "차단한 회원이 없습니다.";
//       emptyMessage.classList.add("empty-message");
//       userList.appendChild(emptyMessage);
//     } else {
//       blockedUsers.forEach(user => {
//         console.log("차단된 사용자 데이터:", user); // 각 사용자 데이터 확인
//         const userItem = document.createElement("li");
//         userItem.className = "user-item";
//         userItem.innerHTML = `
//           <img src="${user.PROFILE_IMG ||'/images/defaultImg.png'}" class="profile-img">
//           <span class="nickname">${user.MEMBER_NICKNAME || '알 수 없음'}</span>
//           <button class="unblock-btn" data-user-id="${user.MEMBERNO}">차단 취소</button>
//         `;
//         console.log("생성된 버튼의 data-user-id 값:", user.MEMBERNO);
//         userList.appendChild(userItem);
//       });
//     }

//     // 모달 표시
//     const blockListModal = document.getElementById("blockListModal");
//     blockListModal.style.display = "flex"; // 모달 보이기
//   } catch (err) {
//     alert("차단 목록을 불러오는 중 오류가 발생했습니다.");
//     console.error(err);
//   }
// });

// // 모달 닫기 버튼
// document.getElementById("closeBlockList")?.addEventListener("click", () => {
//   const blockListModal = document.getElementById("blockListModal");
//   blockListModal.style.display = "none"; // 모달 숨기기
// });


// // 차단 취소 버튼 이벤트 처리
// document.getElementById("blockedUsers").addEventListener("click", async (event) => {
//   if (event.target.classList.contains("unblock-btn")) {
//     const userId = event.target.dataset.userId; // 버튼에 저장된 사용자 ID
//         // userId 값 검증
//         if (!userId || userId === "undefined") {
//           alert("차단 취소할 사용자 ID를 찾을 수 없습니다.");
//           console.error("잘못된 userId:", userId);
//           return;
//         }
//     try {
//       // 서버로 DELETE 요청 보내기
//       const response = await fetch(`/block/unBlock`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ blockedMemberNo: userId }),
//       });

//       if (!response.ok) throw new Error("차단 해제 요청 실패");

//       const result = await response.json();
//       if (result.success) {
//         // DOM에서 사용자 항목 제거
//         event.target.closest(".user-item").remove();
//         alert(result.message || "차단이 해제되었습니다.");
//       } else {
//         alert(result.message || "차단 해제 중 문제가 발생했습니다.");
//       }
//     } catch (error) {
//       console.error("차단 해제 요청 중 오류:", error);
//       alert("차단 해제 요청 중 문제가 발생했습니다.");
//     }
//   }
// });

//   // 팔로잉 목록 로드
//   async function loadFollowList() {
//     console.log("[loadFollowList] 팔로우 목록 로드 시작");
//     try {
//       const response = await fetch("/follow/followList");
//       console.log("[loadFollowList] 서버 요청 완료");
//       if (!response.ok) throw new Error("팔로우 리스트를 가져오는 데 실패했습니다.");

//       const data = await response.json();
//       console.log("팔로우 리스트 데이터:", data); // 콘솔에 출력

//       followTabs.followingList.innerHTML = "";
//       console.log("[loadFollowList] 기존 팔로우 리스트 초기화");
//       // console.log("followTabs.followingList:", followTabs.followingList);

//       if (data.length === 0) {
//         followTabs.followingList.innerHTML = "<p class='empty-message'>팔로우한 사용자가 없습니다.</p>";
//       } else {
//         data.forEach(user => {
//           const userItem = document.createElement("li");
//           userItem.className = "user-item";
//           userItem.innerHTML = `
//             <img src="${user.PROFILEIMG || '/images/default-profile.png'}">
//             <span class="nickname">${user.NICKNAME}</span>
//             <button class="unfollow-btn" data-user-nick="${user.NICKNAME}">언팔로우</button>
//         `;
//           followTabs.followingList.appendChild(userItem);
//         });
//       }
//     } catch (error) {
//       console.error("팔로우 목록 로드 실패:", error);
//     }
//   }

//   // 팔로워 목록 로드
// async function loadFollowerList() {
//   console.log("[loadFollowerList] 팔로워 목록 로드 시작");
//   try {
//     const response = await fetch("/follow/followerList");
//     console.log("[loadFollowerList] 서버 요청 완료");
//     if (!response.ok) throw new Error("팔로워 리스트를 가져오는 데 실패했습니다.");

//     const data = await response.json();
//     console.log("팔로워 리스트 데이터:", data);

//     followTabs.followerList.innerHTML = "";
//     console.log("[loadFollowerList] 기존 팔로워 리스트 초기화");

//     if (data.length === 0) {
//       followTabs.followerList.innerHTML = "<p class='empty-message'>팔로워가 없습니다.</p>";
//     } else {
//       for (const user of data) {
//         const userItem = document.createElement("li");
//         userItem.className = "user-item";

//         // 서버로 해당 사용자의 팔로우 상태 확인
//         let isFollowing = false;
//         try {
//           const followStatusResponse = await fetch(`/follow/status/${user.NICKNAME}`, {
//             method: "GET",
//             headers: { "Content-Type": "application/json" },
//           });
//           if (followStatusResponse.ok) {
//             const followStatusData = await followStatusResponse.json();
//             isFollowing = followStatusData.isFollowing;
//             console.log(`[loadFollowerList] ${user.NICKNAME} 팔로우 상태: ${isFollowing}`);
//           } else {
//             console.error(`[loadFollowerList] 팔로우 상태 확인 실패: ${user.NICKNAME}`);
//           }
//         } catch (error) {
//           console.error(`[loadFollowerList] 팔로우 상태 확인 중 오류: ${user.NICKNAME}`, error);
//         }

//         // 팔로워 항목 생성
//         userItem.innerHTML = `
//           <img src="${user.PROFILEIMG || '/images/default-profile.png'}">
//           <span class="nickname">${user.NICKNAME}</span>
//           <button class="follow-back-btn" data-user-nick="${user.NICKNAME}">
//             ${isFollowing ? "언팔로우" : "맞팔로우"}
//           </button>
//         `;

//         followTabs.followerList.appendChild(userItem);
//       }
//     }
//   } catch (error) {
//     console.error("[loadFollowerList] 팔로워 목록 로드 실패:", error);
//   }
// }


//   // 언팔로우 버튼 이벤트
//   followTabs.followingList.addEventListener("click", async (event) => {
//     if (event.target.classList.contains("unfollow-btn")) {
//       const userNick = event.target.dataset.userNick;

//       try {
//         const response = await fetch(`/follow/${userNick}`, { method: "DELETE" });

//         if (response.ok) {
//           event.target.closest(".user-item").remove();
//           alert("팔로우를 취소했습니다.");
//         } else {
//           alert("팔로우 취소 실패.");
//         }
//       } catch (error) {
//         console.error("팔로우 취소 중 오류:", error);
//       }
//     }
//   });

//   // 맞팔로우 버튼 이벤트
//   followTabs.followerList.addEventListener("click", async (event) => {
//     if (event.target.classList.contains("follow-back-btn")) {
//       const userNick = event.target.dataset.userNick;
//       const action = event.target.textContent.trim();//추가
//       try {
//         let response;
//         if (action === "맞팔로우") {
//           console.log(`[${action}] 요청 시작: /follow/${userNick} (POST)`);
//           response = await fetch(`/follow/${userNick}`, { method: "POST" });
//         } else if (action === "언팔로우") {
//           console.log(`[${action}] 요청 시작: /follow/${userNick} (DELETE)`);
//           response = await fetch(`/follow/${userNick}`, { method: "DELETE" });
//         }

//         // 응답 객체 확인
//         if (!response) {
//           console.error(`[${action}] 응답 객체가 정의되지 않음.`);
//           alert("서버 요청에 실패했습니다. 잠시 후 다시 시도해주세요.");
//           return;
//         }
//         // 요청 결과 확인
//         if (response.ok) {
//           const result = await response.json(); // 응답 데이터를 JSON으로 변환
//           console.log(`[${action}] 요청 성공:`, result);

//           // 버튼 상태 업데이트
//           event.target.textContent = action === "맞팔로우" ? "언팔로우" : "맞팔로우";
//           console.log(`[${action}] 버튼 상태 업데이트 완료: ${event.target.textContent}`);
//         } else {
//           console.error(`[${action}] 요청 실패: HTTP 상태 코드 ${response.status}`);
//           alert(`${action} 실패. 잠시 후 다시 시도해주세요.`);
//         }
//       } catch (error) {
//         console.error(`[${action}] 요청 중 오류:`, error);
//         alert(`네트워크 오류가 발생했습니다. (${error.message})`);
//       }
//     }

//   // 로그아웃
//   buttons.logout?.addEventListener("click", () => {
//     window.location.href = "/member/logout";
//   });

//   });

// document.addEventListener("DOMContentLoaded", () => {
//   const randomValue = (Math.random() + 0.1).toFixed(2);
//   setTimeout( () => {
//     document.getElementById("preLoad").remove();
//   },randomValue)
//
// });

window.onload = () => {
  document.getElementById("preLoad").remove();
};