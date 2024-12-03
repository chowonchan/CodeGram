document.addEventListener("DOMContentLoaded", function () {
  const storyData = [
    {
      storyNo: 306,
      imgPath: "/images/story/",
      imgRename: "20241203155758_00001.gif",
      createdAt: "2024-12-03 15:57:58",
    },
    {
      storyNo: 307,
      imgPath: "/images/story/",
      imgRename: "20241203155818_00002.gif",
      createdAt: "2024-12-03 15:58:18",
    },
    {
      storyNo: 308,
      imgPath: "/images/story/",
      imgRename: "20241203155910_00003.png",
      createdAt: "2024-12-03 15:59:10",
    },
  ];

  const storyListElement = document.getElementById("myStoryList");

  // 스토리 데이터를 기반으로 HTML 생성
  storyData.forEach((story) => {
    const listItem = document.createElement("li");
    listItem.className = "story-item";

    // 썸네일 이미지
    const thumbnail = document.createElement("img");
    thumbnail.src = story.imgPath + story.imgRename;
    thumbnail.alt = "스토리 썸네일";
    thumbnail.className = "story-thumbnail";

    // 생성일
    const createdAt = document.createElement("p");
    createdAt.textContent = `생성일: ${story.createdAt}`;
    createdAt.className = "story-created-at";

    // 리스트 아이템 구성
    listItem.appendChild(thumbnail);
    listItem.appendChild(createdAt);

    // ul 요소에 추가
    storyListElement.appendChild(listItem);
  });
});
