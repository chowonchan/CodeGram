/* // 팔로우 insert / delete 는 세훈씨가 다 하면 가져오기로 ㅇㅇ 

const recommendList = document.querySelector(".recommend-list");

const selectRecommendList = () => {
  fetch("/feed/recommendList?memberNo=" + memberNo, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.length > 0) {
        data.forEach((item) => {
          const li = document.createElement("li");
          li.classList.add("recommend-item");
          li.setAttribute("data-id", item.memberNo);
          li.setAttribute("data-nickname", item.memberNickname);
          li.innerHTML = `
            <img src="${item.profileImg}" class="profile-img">
            <span class="member-nickname" th:text="${item.memberNickname}">상대 닉네임</span>
          `;
          recommendList.appendChild(li);
        });
      }
    });
};

const data = {};
data.memberNo = memberNo;
data. */