// document.addEventListener("DOMContentLoaded", function () {
//   const storyData = [
//     {
//       storyNo: 306,
//       imgPath: "/images/story/",
//       imgRename: "20241203155758_00001.gif",
//       createdAt: "2024-12-03 15:57:58",
//     },
//     {
//       storyNo: 307,
//       imgPath: "/images/story/",
//       imgRename: "20241203155818_00002.gif",
//       createdAt: "2024-12-03 15:58:18",
//     },
//     {
//       storyNo: 308,
//       imgPath: "/images/story/",
//       imgRename: "20241203155910_00003.png",
//       createdAt: "2024-12-03 15:59:10",
//     },
//   ];

//   const storyListElement = document.getElementById("myStoryList");

//   // 스토리 데이터를 기반으로 HTML 생성
//   storyData.forEach((story) => {
//     const listItem = document.createElement("li");
//     listItem.className = "story-item";

//     // 썸네일 이미지
//     const thumbnail = document.createElement("img");
//     thumbnail.src = story.imgPath + story.imgRename;
//     thumbnail.alt = "스토리 썸네일";
//     thumbnail.className = "story-thumbnail";

//     // 생성일
//     const createdAt = document.createElement("p");
//     createdAt.textContent = `생성일: ${story.createdAt}`;
//     createdAt.className = "story-created-at";

//     // 리스트 아이템 구성
//     listItem.appendChild(thumbnail);
//     listItem.appendChild(createdAt);

//     // ul 요소에 추가
//     storyListElement.appendChild(listItem);
//   });
// });

///----------------------------------------------------------------------------------


// document.addEventListener("DOMContentLoaded", function () {
//   const myStoryList = document.getElementById("myStoryList");
//   const loadMoreButton = document.getElementById("loadMore");
//   let currentPage = 1;
//   // 스토리 가져오기

//   function fetchStories(page) {
//     fetch(`/myStory?cp=${page}`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Failed to fetch stories");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       renderStories(data); // 데이터를 렌더링
//       if (data.length === 0 || data.length < 10) {
//         loadMoreButton.style.display = "none"; // 데이터가 더 이상 없으면 버튼 숨기기
//       }
//     })
//     .catch((error) => console.error("Error fetching stories:", error));
// }

//   // 스토리 렌더링
//   function renderStories(stories) {
//     stories.forEach((story) => {
//       const storyImg = document.createElement("img");
//       storyImg.className = "story-img";
//       storyImg.src = `${story.imgPath}${story.imgRename}`;
//       storyImg.alt = "story Image";
//       myStoryList.appendChild(storyImg);
      
//       storyImg.appendChild(storyImg);
//       myStoryList.appendChild(storyDiv);
//     });
//   }

//   // "Load More" 버튼 클릭 이벤트
//   loadMoreButton.addEventListener("click", () => {
//     currentPage++;
//     fetchStories(currentPage);
//   });

//   // 초기 로드
//   fetchStories(currentPage);
// });

///-----------------------------------------------------------------------------------------
// let currentPage = 1;
// const pageSize = 10;
// const storyContainer = document.querySelector('#storyContainer');
// const loadMoreButton = document.querySelector('#loadMoreButton');

// // 스토리 로드 함수
// function loadStories(page) {
//     fetch(`/myPage/myStory?page=${page}&size=${pageSize}`)
//         .then(response => response.json())
//         .then(data => {
//             const { stories, totalCount } = data;

//             // 스토리 렌더링
//             stories.forEach(story => {
//                 const storyElement = document.createElement('div');
//                 storyElement.classList.add('story-item');
//                 storyElement.innerHTML = `
//                     <img src="${story.thumbnailUrl}" alt="Story Thumbnail" />
//                     <p>${story.title}</p>
//                     <span>${story.createdDate}</span>
//                 `;
//                 storyContainer.appendChild(storyElement);
//             });

//             // 페이지네이션 종료 조건
//             if (storyContainer.children.length >= totalCount) {
//                 loadMoreButton.style.display = 'none'; // 더보기 버튼 숨기기
//             }
//         })
//         .catch(error => console.error('Error loading stories:', error));
// }

// // 초기 로드
// loadStories(currentPage);

// // 더보기 버튼 클릭 이벤트
// loadMoreButton.addEventListener('click', () => {
//     currentPage++;
//     loadStories(currentPage);
// });
// DOM 요소 선택
const myStoryList = document.getElementById("myStoryList");
const loadMore = document.getElementById("loadMore");

// 현재 페이지와 페이지 크기 설정
let currentPage = 1;
const pageSize = 10;

// 스토리 로드 함수
function loadStories(page) {
    // 서버로 AJAX 요청
    fetch(`/myPage/myStory?cp=${page}`)
        .then(response => response.json())
        .then(data => {
            const { stories, currentPage, totalCount } = data;

            // 스토리 데이터를 동적으로 추가
            stories.forEach(story => {
                const storyElement = document.createElement("div");
                storyElement.classList.add("story-item");
                storyElement.innerHTML = `
                    <img src="${story.imgPath}" alt="Story Thumbnail" />
                    <h2>${story.title}</h2>
                    <p>${story.content}</p>
                    <span>${story.createdDate}</span>
                `;
                storyContainer.appendChild(storyElement);
            });

            // 모든 스토리를 로드했는지 확인
            if (storyContainer.children.length >= totalCount) {
                loadMoreButton.style.display = "none"; // 더보기 버튼 숨기기
            }
        })
        .catch(error => console.error("Error loading stories:", error));
}

// 초기 로드
loadStories(currentPage);

// 더보기 버튼 클릭 이벤트
loadMoreButton.addEventListener("click", () => {
    currentPage++; // 페이지 번호 증가
    loadStories(currentPage);
});
