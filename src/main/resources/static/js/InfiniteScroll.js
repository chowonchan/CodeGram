/**
 * InfiniteScroll 클래스
 * 어떤 컨테이너에든 무한 스크롤 기능을 추가할 수 있는 재사용 가능한 클래스
 */
class InfiniteScroll {
  /**
   * @param {Object} options                        - 무한 스크롤 설정 옵션
   * @param {string} options.container              - 스크롤될 컨테이너의 CSS 선택자
   * @param {string} options.itemsWrapper           - 아이템들이 추가될 wrapper의 CSS 선택자
   * @param {Function} options.loadMore             - 새로운 아이템을 로드하는 비동기 함수
   * @param {number} [options.threshold=100]        - 하단에서 몇 px 전에 로드를 시작할지 설정
   * @param {string} [options.loadingIndicator='']  - 로딩 인디케이터 HTML (선택사항)
   * @param {number} [options.debounceTime=200]     - 스크롤 이벤트 디바운스 시간 (ms)
   */
  constructor(options) {
    this.container = document.querySelector(options.container);
    this.itemsWrapper = document.querySelector(options.itemsWrapper);
    this.loadMore = options.loadMore;
    this.threshold = options.threshold || 100;
    this.loadingIndicator = options.loadingIndicator || '';
    this.debounceTime = options.debounceTime || 200;

    // 상태 관리
    this.isLoading = false;
    this.hasMore = true;
    this.page = 1;

    // 클래스 초기화
    this.init();
  }

  /**
   * 무한 스크롤 초기화
   * 이벤트 리스너 설정 및 초기 상태 설정
   */
  init() {
    // 디바운스된 스크롤 핸들러 생성
    this.debouncedHandleScroll = this.debounce(
      this.handleScroll.bind(this),
      this.debounceTime
    );

    // 스크롤 이벤트 리스너 추가
    this.container.addEventListener('scroll', this.debouncedHandleScroll);

    // 초기 로딩 인디케이터 추가
    if (this.loadingIndicator) {
      this.createLoadingIndicator();
    }
  }

  /**
   * 스크롤 이벤트 핸들러
   * 스크롤이 하단 근처에 도달하면 새로운 아이템을 로드
   */
  async handleScroll() {
    if (this.isLoading || !this.hasMore) return;

    const containerHeight = this.container.clientHeight;
    const scrollHeight = this.container.scrollHeight;
    const scrollTop = this.container.scrollTop;

    // 스크롤이 하단 임계값에 도달했는지 확인
    if (scrollHeight - (scrollTop + containerHeight) < this.threshold) {
      await this.loadMoreItems();
    }
  }


  /**
   * 새로운 아이템 로드
   * loadMore 콜백을 실행하고 결과를 처리
   */
  async loadMoreItems() {
    try {
      this.isLoading = true;
      this.showLoading();

      // loadMore 함수 실행하여 새로운 데이터 가져오기
      const result = await this.loadMore(this.page);

      // 결과 처리
      if (result) {
        this.hasMore = result.hasMore;
        this.page++;
      }
    } catch (error) {
      console.error('Failed to load more items:', error);
    } finally {
      this.isLoading = false;
      this.hideLoading();
    }
  }

  /**
   * 로딩 인디케이터 생성
   */
  createLoadingIndicator() {
    this.loader = document.createElement('div');
    this.loader.className = 'infinite-scroll-loader';
    this.loader.innerHTML = this.loadingIndicator;
    this.loader.style.display = 'none';
    this.itemsWrapper.appendChild(this.loader);
  }

  /**
   * 로딩 인디케이터 표시
   */
  showLoading() {
    if (this.loader) {
      this.loader.style.display = 'block';
    }
  }

  /**
   * 로딩 인디케이터 숨기기
   */
  hideLoading() {
    if (this.loader) {
      this.loader.style.display = 'none';
    }
  }

  /**
   * 디바운스 함수
   * 연속적인 이벤트 호출을 제어하여 성능 최적화
   * @param {Function} func - 디바운스할 함수
   * @param {number} wait - 대기 시간 (ms)
   * @returns {Function} 디바운스된 함수
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  
  /**
   * 인스턴스 정리
   * 이벤트 리스너 제거 및 리소스 정리
   */
  destroy() {
    this.container.removeEventListener('scroll', this.debouncedHandleScroll);
    if (this.loader) {
      this.loader.remove();
    }
  }
}