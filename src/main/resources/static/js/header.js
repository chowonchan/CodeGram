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
    if(sidePanel.classList.contains('hidden')) {
        toggleSidebar();
    }
    // 패널 내용 변경
    if (type === 'search') {
        searchPanel.classList.add('active');
        notificationPanel.classList.remove('active');
        searchInput.focus(); // 검색 입력 필드에 포커스 설정
    } else if (type === 'notification') {
        notificationPanel.classList.add('active');
        searchPanel.classList.remove('active');
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

      if (isKorean(query)) {
          searchUrl = `/member/search?query=${encodeURIComponent(query)}&type=name`;
      } else {
          searchUrl = `/member/search?query=${encodeURIComponent(query)}&type=nickName`;
      }

      // 비동기 요청(Fetch API 사용)
      fetch(searchUrl)
          .then(response => response.json())
          .then(data => {
              updateSearchResults(data); // 검색 결과 업데이트
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
function updateSearchResults(results) {
  searchResults.innerHTML = ''; // 이전 결과 지우기
  if (results.length === 0) {
      searchResults.innerHTML = '<p>검색 결과가 없습니다.</p>';
      return;
  }

  // 검색 결과 렌더링
  results.forEach(result => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('result-item');
    resultItem.innerHTML = `
          <div class="member-name">${result.memberName}</div>
          <div class="member-nickname">${result.memberNickname}</div>
          <div class="profile-img">
            <img src="${result.profileImg}">
          </div>`;
    searchResults.appendChild(resultItem);
  });
}