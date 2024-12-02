
class InfiniteScroll {
    constructor(options) {
        this.container = document.querySelector(options.container);
        this.itemsWrapper = document.querySelector(options.itemsWrapper);
        this.loadMore = options.loadMore;
        this.threshold = options.threshold || 100;
        this.loadingIndicator = options.loadingIndicator || '로딩 중...';
        this.debounceTime = options.debounceTime || 200;

        this.isLoading = false;
        this.hasMore = true;
        this.page = 1;

        this.init();
    }

    init() {
        this.debouncedHandleScroll = this.debounce(
            this.handleScroll.bind(this),
            this.debounceTime
        );

        this.container.addEventListener('scroll', this.debouncedHandleScroll);
        this.createLoadingIndicator();

        // 초기 데이터 로드
        this.loadMoreItems();
    }

    async handleScroll() {
        if (this.isLoading || !this.hasMore) return;

        const containerHeight = this.container.clientHeight;
        const scrollHeight = this.container.scrollHeight;
        const scrollTop = this.container.scrollTop;

        if (scrollHeight - (scrollTop + containerHeight) < this.threshold) {
            await this.loadMoreItems();
        }
    }

    async loadMoreItems() {
        try {
            this.isLoading = true;
            this.showLoading();

            const result = await this.loadMore(this.page);

            if (result && result.items.length > 0) {
                result.items.forEach(item => {
                    const itemElement = document.createElement('div');
                    itemElement.className = 'item';
                    itemElement.textContent = item;
                    this.itemsWrapper.appendChild(itemElement);
                });

                this.hasMore = result.hasMore;
                this.page++;
            } else {
                this.hasMore = false;
            }
        } catch (error) {
            console.error('Failed to load more items:', error);
        } finally {
            this.isLoading = false;
            this.hideLoading();
        }
    }

    createLoadingIndicator() {
        this.loader = document.createElement('div');
        this.loader.className = 'infinite-scroll-loader';
        this.loader.innerHTML = this.loadingIndicator;
        this.loader.style.display = 'none';
        this.itemsWrapper.appendChild(this.loader);
    }

    showLoading() {
        if (this.loader) {
            this.loader.style.display = 'block';
        }
    }

    hideLoading() {
        if (this.loader) {
            this.loader.style.display = 'none';
        }
    }

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

    destroy() {
        this.container.removeEventListener('scroll', this.debouncedHandleScroll);
        if (this.loader) {
            this.loader.remove();
        }
    }
}


// 아이템을 로드하는 함수
async function loadMore(page) {
    // 예시: 1초마다 더미 데이터를 로드
    return new Promise(resolve => {
        setTimeout(() => {
            const items = [];
            for (let i = 0; i < 10; i++) {
                items.push(`Item ${page * 10 + i + 1}`);
            }
            resolve({
                hasMore: page < 5, // 페이지가 5 이하일 때만 더 많은 아이템 로드 가능
                items
            });
        }, 1000);
    });
}

// InfiniteScroll 인스턴스 생성
const infiniteScroll = new InfiniteScroll({
    container: '#container',
    itemsWrapper: '#itemsWrapper',
    loadMore: loadMore,
    threshold: 100,
    loadingIndicator: 'Loading...',
    debounceTime: 200
});
