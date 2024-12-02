// 모달 열기
function openModal() {
    document.getElementById('modal').classList.remove('hidden');
  }
  
  // 모달 닫기
  function closeModal() {
    document.getElementById('modal').classList.add('hidden');
  }
  
  // 옵션 처리 (동작 정의)
  function handleOption(action) {
    switch (action) {
      case 'report':
        /* 신고모달창 나오게 하기 */
        alert('신고가 접수되었습니다.');
        break;
      case 'unfollow':
        /* 팔로우 취소 하는 코드 가져오기 */
        alert('팔로우를 취소했습니다.');
        break;
      case 'goToPage':
        window.location.href = '/user-profile'; // 회원 페이지로 이동 URL 설정
        break;
      case 'accountInfo':
        alert('계정 정보 페이지로 이동합니다.');
        break;
      default:
        break;
    }
    closeModal(); // 모달 닫기
  }
  