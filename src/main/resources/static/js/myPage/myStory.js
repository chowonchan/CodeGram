// DOM 요소 선택
// const myStoryList = document.getElementById("myStoryList");
// const loadMore = document.getElementById("loadMore");

// // 현재 페이지와 페이지 크기 설정
// let currentPage = 1;
// const pageSize = 10;

// // 스토리 로드 함수
// function loadStories(page) {
//     // 서버로 AJAX 요청
//     fetch(`/myPage/myStory?cp=${page}`)
//         .then(response => response.json())
//         .then(data => {
//             console.log("응답 데이터:", data);
//             const { stories, currentPage, totalCount } = data;

//             // 데이터 확인 로그
//             console.log("스토리 목록:", stories);
//             console.log("총 스토리 개수:", totalCount);
//             console.log("현재 페이지:", currentPage);

//             // 스토리 데이터를 동적으로 추가
//             stories.forEach(story => {
//                 const storyElement = document.createElement("div");
//                 storyElement.classList.add("story-item");
//                 storyElement.innerHTML = `
//                     <img src="${story.imgPath}" alt="Story Thumbnail" />
//                     <h2>${story.title}</h2>
//                     <p>${story.content}</p>
//                     <span>${story.createdDate}</span>
//                 `;
//                 storyContainer.appendChild(storyElement);
//             });

//             // 모든 스토리를 로드했는지 확인
//             if (storyContainer.children.length >= totalCount) {
//                 loadMoreButton.style.display = "none"; // 더보기 버튼 숨기기
//             }
//         })
//         .catch(error => console.error("Error loading stories:", error));
// }

// // 초기 로드
// loadStories(currentPage);

// // 더보기 버튼 클릭 이벤트
// loadMoreButton.addEventListener("click", () => {
//     currentPage++; // 페이지 번호 증가
//     loadStories(currentPage);
// });
// DOM 요소 가져오기
const storyList = document.getElementById("myStoryList");
const loadMoreButton = document.getElementById("loadMore");
const backButton = document.getElementById("myStoryBackButton");
const backButtonText = document.getElementById("myStoryBackButtonText");

// 현재 페이지 및 페이지 크기
let currentPage = 1;
const pageSize = 10;

// 스토리 불러오기 함수
function loadStories(page) {
    fetch(`/myPage/myStory/data?cp=${page}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const { stories, totalCount } = data;

              // 스토리가 없는 경우 처리
              if (stories.length === 0) {
                // 이미 "스토리가 없습니다" 메시지가 표시된 경우 추가하지 않음
                if (!document.querySelector(".no-story-message")) {
                    const noStoryMessage = document.createElement("p");
                    noStoryMessage.classList.add("no-story-message");
                    noStoryMessage.textContent = "보관된 스토리가 없습니다.";
                    storyList.appendChild(noStoryMessage);
                }
                loadMoreButton.style.display = "none"; // "더보기" 버튼 숨기기
                return;
            }

            // 스토리 목록 추가
            stories.forEach(story => {
                const listItem = document.createElement("li");
                listItem.classList.add("story-item");
                listItem.innerHTML = `
                    <div class="story-thumbnail">
                        <img src="${story.imgPath}" alt="Thumbnail">
                    </div>
                    <span>${story.createdAt}</span>

                `;
                storyList.appendChild(listItem);
            });

            // "더보기" 버튼 숨기기
            if (storyList.children.length >= totalCount) {
                loadMoreButton.style.display = "none";
            }
        })
        .catch(error => {
            console.error("Error loading stories:", error);
            alert("스토리를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.");
        });
}

// 초기 데이터 로드
loadStories(currentPage);

// "더보기" 버튼 클릭 이벤트
loadMoreButton.addEventListener("click", () => {
  currentPage++;
  loadStories(currentPage);
});

backButton.addEventListener("click", () => {
  window.history.back();
});

backButtonText.addEventListener("click", () => {
  window.location.reload();
});
