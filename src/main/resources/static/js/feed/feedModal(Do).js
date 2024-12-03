// // 옵션 처리 (동작 정의)
// function feedHandleOption(action) {
//   switch (action) {
//     case 'report':
//       /* 신고모달창 나오게 하기 */
//       reportOpenModal();
//       break;
//     case 'unfollow':
//       /* 팔로우 취소 하는 코드 가져오기 */
//       alert('팔로우를 취소했습니다.');
//       break;
//     case 'goToPage':
//       break;
//     case 'accountInfo':
//       memberImOpenModal();
//       break;
//     default:
//       break;
//   }
//   feedCloseModal(); // 모달 닫기
// }



const formTag = document.getElementById('#formTag');
formTag.addEventListener('submit', (event) => {

  const reportModalOverlay = document.querySelector('.report-modal-overlay');
  const reportCloseBtn = document.querySelector('.report-close-btn');
  const reportReasons = document.querySelectorAll('.report-reason');
  const reportModalContent = document.querySelector('.report-modal-content');
  const reportComplete = document.querySelector('.report-complete');
  const reportCloseCompleteBtn = document.querySelector('.report-close-complete-btn');

  const inputType = document.createElement('input');
  inputType.type = 'hidden';
  inputType.value = document.querySelector('#reportReason').value;
  inputType.name = 'reportNo';
  formTag.appendChild(inputType);


})



/* -------------------------------------------------------- */
/* 모달창 처리 */

document.addEventListener('DOMContentLoaded', () => {

  const feedOpenModal = document.getElementById('.feed-modal');
  const feedCloseModal = document.querySelector('.feed-cancel');
  const feedOpenModalWant = document.querySelector('feed-open-modal');

  const memberImCloseBtn = document.querySelector('.member-im-close-btn');
  const memberImModalOverlay = document.querySelector('.member-im-modal-overlay');

  /* Feed 모달창 */
  // 모달 열기
  feedOpenModalWant.addEventListener('click', () => {
    feedOpenModal();
  })

  function feedOpenModal() {


    document.getElementById('feed-modal').classList.remove('hidden');
  }

  // 모달 닫기
  function feedCloseModal() {
    document.getElementById('feed-modal').classList.add('hidden');
  }

  // 옵션 처리 (동작 정의)
  function feedHandleOption(action) {
    switch (action) {
      case 'report':
        /* 신고모달창 나오게 하기 */
        reportOpenModal();
        break;
      case 'unfollow':
        /* 팔로우 취소 하는 코드 가져오기 */
        alert('팔로우를 취소했습니다.');
        break;
      case 'goToPage':
        break;
      case 'accountInfo':
        memberImOpenModal();
        break;
      default:
        break;
    }
    feedCloseModal(); // 모달 닫기
  }

  /* Feed 모달창 end */


  /* -------------------------------------------------------- */


  /* 신고사유 모달창 */

  // 모달 열기
  function reportOpenModal() {
    document.getElementById('report-modal').classList.remove('hidden');
    document.getElementById('feed-modal').classList.add('hidden');
  }

  // 닫기 버튼 클릭 시 모달 숨기기
  function reportCloseModal() {
    document.getElementById('report-modal').classList.add('hidden');
  }

  // 신고 이유 클릭 시 처리
  function handleReportReasonClick(event) {
    const reportReason = event.currentTarget.getAttribute('report-data-reason');

    /* 추가해야됨 신고가 DB에 저장되는 코드 */

    // 신고 이유 섹션 숨기기
    reportModalContent.classList.add('hidden');

    // 신고 완료 섹션 표시
    reportComplete.classList.remove('hidden');

    // 여기에 실제 신고 로직을 추가할 수 있습니다.
    console.log(`신고된 이유: ${reportReason}`);
  }

  // 이벤트 리스너 추가
  reportCloseBtn.addEventListener('click', reportCloseModal);
  reportCloseCompleteBtn.addEventListener('click', reportCloseModal);

  // 각 신고 이유에 클릭 이벤트 추가
  reportReasons.forEach(reason => {
    reason.addEventListener('click', handleReportReasonClick);
    /* DB에 저장하는 코드 작성 */
  });

  /* 신고 사유 모달창 end */


  /* ------------------------------------------------------- */


  /* 이 계정 정보 모달창 */

  // 모달 열기
  function memberImOpenModal() {
    document.getElementById('member-im--modal').classList.remove('hidden');
    document.getElementById('feed-modal').classList.add('hidden');
  }


  // 모달 닫기 함수
  function memberImCloseModal() {
    document.getElementById('member-im-modal').classList.add('hidden');
  }

  // 닫기 버튼에 클릭 이벤트 추가
  memberImCloseBtn.addEventListener('click', memberImCloseModal);

  // 모달 오버레이 클릭 시 모달 닫기
  memberImModalOverlay.addEventListener('click', (event) => {
    if (event.target === memberImOpenModal) {
      closeModal();
    }
  });

  // ESC 키 누르면 모달 닫기
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
});




/* -------------------------------------------------------- */

/* 이 계정 정보 모달창 */

document.addEventListener('DOMContentLoaded', () => {
  const memberImCloseBtn = document.querySelector('.member-im-close-btn');
  const memberImModalOverlay = document.querySelector('.member-im-modal-overlay');

  // 모달 열기
  function memberImOpenModal() {
    document.getElementById('member-im--modal').classList.remove('hidden');
    document.getElementById('feed-modal').classList.add('hidden');
  }


  // 모달 닫기 함수
  function memberImCloseModal() {
    document.getElementById('member-im-modal').classList.add('hidden');
  }

  // 닫기 버튼에 클릭 이벤트 추가
  memberImCloseBtn.addEventListener('click', memberImCloseModal);

  // 모달 오버레이 클릭 시 모달 닫기
  memberImModalOverlay.addEventListener('click', (event) => {
    if (event.target === memberImOpenModal) {
      closeModal();
    }
  });

  // ESC 키 누르면 모달 닫기
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
});

/* -------------------------------------------------------- */

/* 신고 모달창 처리 및 이유 DB에 보내기 */

document.addEventListener('DOMContentLoaded', () => {
  const reportModalOverlay = document.querySelector('.report-modal-overlay');
  const reportCloseBtn = document.querySelector('.report-close-btn');
  const reportReasons = document.querySelectorAll('.report-reason');
  const reportModalContent = document.querySelector('.report-modal-content');
  const reportComplete = document.querySelector('.report-complete');
  const reportCloseCompleteBtn = document.querySelector('.report-close-complete-btn');

  // 신고 이유 클릭 시 처리
  function handleReportReasonClick(event) {
    const reason = event.currentTarget.getAttribute('data-reason');
    const boardNo = document.querySelector('boardNo').value; // 신고 대상 게시물 번호

    // 신고 데이터 준비
    const reportData = {
      reportCategory: reason,
      contentNo: boardNo
    };

    // 서버로 신고 요청 보내기
    fetch('/report/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData)
    })
      .then(response => response.json())
      .then(result => {
        if (result) {
          // 신고 성공 시
          reportModalContent.classList.add('hidden');
          reportComplete.classList.remove('hidden');
        } else {
          // 신고 실패 시 에러 처리
          alert('신고 처리 중 오류가 발생했습니다.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('신고 처리 중 네트워크 오류가 발생했습니다.');
      });
  }

  // 닫기 버튼 클릭 시 모달 숨기기
  function reportCloseModal() {
    reportModalOverlay.style.display = 'none';
  }

  // 이벤트 리스너 추가
  reportCloseBtn.addEventListener('click', reportCloseModal);
  reportCloseCompleteBtn.addEventListener('click', reportCloseModal);

  // 각 신고 이유에 클릭 이벤트 추가
  reportReasons.forEach(reason => {
    reason.addEventListener('click', handleReportReasonClick);
    reportComplete.classList.remove('hidden');

  });
});