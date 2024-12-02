document.addEventListener('DOMContentLoaded', function () {
  function initializeSliders() {
    const sliders = document.querySelectorAll('.image-slider');

    sliders.forEach(slider => {
      const track = slider.querySelector('.image-track');
      const images = track.querySelectorAll('.post-image');
      const prevButton = slider.querySelector('.prev-button');
      const nextButton = slider.querySelector('.next-button');
      const dotsContainer = slider.querySelector('.slider-dots');

      let currentIndex = 0;

      // 이미지 개수에 맞춰 동적으로 닷츠 생성
      function createDots() {
        if (images.length > 1) {
          dotsContainer.innerHTML = Array.from(images)
            .map((_, i) => `<span class="dot${i === 0 ? ' active' : ''}"></span>`)
            .join('');
        }
      }

      const updateSlider = (animate = true) => {
        track.style.transition = animate ? 'transform 0.3s ease-in-out' : 'none';
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // 닷의 활성 상태 업데이트
        const dots = slider.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex);
        });

        // 버튼의 표시 여부 업데이트
        if (prevButton) prevButton.style.display = currentIndex === 0 ? 'none' : 'flex';
        if (nextButton) nextButton.style.display = currentIndex === images.length - 1 ? 'none' : 'flex';
      };

      // 드래그 및 터치 기능 추가
      let startX = 0;
      let isDragging = false;
      let touchStartTime = 0;

      const handleDragStart = (e) => {
        isDragging = true;
        startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
        touchStartTime = Date.now();
        updateSlider(false);
      };

      const handleDragMove = (e) => {
        if (!isDragging) return;

        const x = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
        const walk = x - startX;
        const minSwipeDistance = 50;
        const maxSwipeTime = 300;

        if (Math.abs(walk) > minSwipeDistance &&
          Date.now() - touchStartTime < maxSwipeTime) {
          isDragging = false;

          if (walk > 0 && currentIndex > 0) {
            currentIndex--;
          } else if (walk < 0 && currentIndex < images.length - 1) {
            currentIndex++;
          }

          updateSlider(true);
        }
      };

      const handleDragEnd = () => {
        isDragging = false;
        updateSlider(true);
      };

      // 이벤트 리스너 설정
      const setupListeners = () => {
        // 이전/다음 버튼 이벤트
        if (prevButton) {
          prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
              currentIndex--;
              updateSlider();
            }
          });
        }

        if (nextButton) {
          nextButton.addEventListener('click', () => {
            if (currentIndex < images.length - 1) {
              currentIndex++;
              updateSlider();
            }
          });
        }

        // 도트 클릭 이벤트
        const dots = slider.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
          });
        });

        // 터치/드래그 이벤트
        track.addEventListener('touchstart', handleDragStart);
        track.addEventListener('mousedown', handleDragStart);
        track.addEventListener('touchmove', handleDragMove);
        track.addEventListener('mousemove', handleDragMove);
        track.addEventListener('touchend', handleDragEnd);
        track.addEventListener('mouseup', handleDragEnd);
        track.addEventListener('mouseleave', handleDragEnd);
      };

      // 이미지가 1개 이하면 슬라이더 컨트롤 숨김
      if (images.length <= 1) {
        if (prevButton) prevButton.style.display = 'none';
        if (nextButton) nextButton.style.display = 'none';
        if (dotsContainer) dotsContainer.style.display = 'none';
        return;
      }

      // 초기 설정
      createDots();
      setupListeners();
      updateSlider();
    });
  }

  // 슬라이더 초기화 실행
  initializeSliders();
});