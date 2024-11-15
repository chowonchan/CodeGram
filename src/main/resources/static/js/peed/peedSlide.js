// 이미지 슬라이더 기능
document.addEventListener('DOMContentLoaded', function() {
  const sliders = document.querySelectorAll('.image-slider');
  
  sliders.forEach(slider => {
    const track = slider.querySelector('.image-track');
    const images = track.querySelectorAll('.post-image');
    const prevButton = slider.querySelector('.prev-button');
    const nextButton = slider.querySelector('.next-button');
    const dots = slider.querySelectorAll('.dot');
    let currentIndex = 0;

    // 이미지가 1개 이하면 슬라이더 기능 비활성화
    if (images.length <= 1) return;

    // 슬라이더 위치 업데이트 함수
    function updateSlider() {
      // 이미지 트랙 이동
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // 닷츠 업데이트
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
      
      // 버튼 상태 업데이트
      prevButton.style.display = currentIndex === 0 ? 'none' : 'flex';
      nextButton.style.display = currentIndex === images.length - 1 ? 'none' : 'flex';
    }

    // 이전 버튼 클릭 이벤트
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateSlider();
        }
      });
    }

    // 다음 버튼 클릭 이벤트
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        if (currentIndex < images.length - 1) {
          currentIndex++;
          updateSlider();
        }
      });
    }

    // 닷츠 클릭 이벤트
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
      });
    });

    /** 터치/스와이프 기능 추가 */

    // let touchStartX = 0;
    // let touchEndX = 0;

    // track.addEventListener('touchstart', e => {
    //   touchStartX = e.touches[0].clientX;
    // }, false);

    // track.addEventListener('touchmove', e => {
    //   e.preventDefault(); // 스크롤 방지
    // }, false);

    // track.addEventListener('touchend', e => {
    //   touchEndX = e.changedTouches[0].clientX;
    //   handleSwipe();
    // }, false);

    // function handleSwipe() {
    //   const swipeThreshold = 50; // 스와이프 감지 임계값
    //   const swipeDistance = touchEndX - touchStartX;

    //   if (Math.abs(swipeDistance) > swipeThreshold) {
    //     if (swipeDistance > 0 && currentIndex > 0) {
    //       // 오른쪽으로 스와이프 - 이전 이미지
    //       currentIndex--;
    //       updateSlider();
    //     } else if (swipeDistance < 0 && currentIndex < images.length - 1) {
    //       // 왼쪽으로 스와이프 - 다음 이미지
    //       currentIndex++;
    //       updateSlider();
    //     }
    //   }
    // }

    /**  키보드 방향키 지원 */
    // slider.setAttribute('tabindex', '0'); // 키보드 포커스 가능하도록 설정
    // slider.addEventListener('keydown', e => {
    //   if (e.key === 'ArrowLeft' && currentIndex > 0) {
    //     currentIndex--;
    //     updateSlider();
    //   } else if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
    //     currentIndex++;
    //     updateSlider();
    //   }
    // });

    
    // 초기 상태 설정
    updateSlider();
  });
}); // 이미지 슬라이더 기능 end