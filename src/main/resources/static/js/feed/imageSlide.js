
document.addEventListener('DOMContentLoaded', function() {
  const sliders = document.querySelectorAll('.image-slider');
  
  sliders.forEach(slider => {
    const track = slider.querySelector('.image-track');
    const images = track.querySelectorAll('.post-image');
    const prevButton = slider.querySelector('.prev-button');
    const nextButton = slider.querySelector('.next-button');
    const dots = slider.querySelectorAll('.dot');
    
    if (images.length <= 1) {
      slider.classList.add('single-image');
      return;
    }

    let currentIndex = 0;

    // 이미지 업데이트 함수
    function updateSlider() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // 닷츠 업데이트
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
      
      // 버튼 상태 업데이트
      prevButton.style.display = currentIndex === 0 ? 'none' : 'flex';
      nextButton.style.display = currentIndex === images.length - 1 ? 'none' : 'flex';
    }

    // 이벤트 리스너
    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });

    nextButton.addEventListener('click', () => {
      if (currentIndex < images.length - 1) {
        currentIndex++;
        updateSlider();
      }
    });

    // 닷츠 클릭 이벤트
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
      });
    });

    // 초기 상태 설정
    updateSlider();
  });
});


//  이미지 슬라이드 부분 따로 떼어논 모습
//  더미 이미지가 있기에 수정해서 본 js부분에 붙이면 될듯 