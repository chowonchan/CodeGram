document.addEventListener("DOMContentLoaded", async() => {

  const defaultImageUrl = "/images/defaultImg.png";
  
  // 모달 및 요소 관련 추가
  const followModals = {
    followListModal: document.getElementById("followListModal"),
    closeFollowListButton: document.getElementById("closeFollowList")
  };

  const followTabs = {
    followTab: document.getElementById("followTab"),
    followerTab: document.getElementById("followerTab"),
    followingListContent: document.getElementById("followingListContent"),
    followerListContent: document.getElementById("followerListContent"),
    followingList: document.getElementById("followingList"),
    followerList: document.getElementById("followerList")
  };
// 로그 추가
console.log("팔로우 탭 요소:", followTabs.followTab);
console.log("팔로워 탭 요소:", followTabs.followerTab);
console.log("팔로우 리스트 컨텐츠:", followTabs.followingListContent);
console.log("팔로워 리스트 컨텐츠:", followTabs.followerListContent);
console.log("팔로우 리스트:", followTabs.followingList);
console.log("팔로워 리스트:", followTabs.followerList);


// 팔로우 목록 버튼 클릭 이벤트 추가
const followListButton = document.getElementById("followList");
followListButton?.addEventListener("click", () => {
  followModals.followListModal.style.display = "flex"; // 모달 열기
  loadFollowList(); // 팔로우 리스트 로드
});

  // 팔로우 리스트 모달 닫기
  document.getElementById("closeFollowList")?.addEventListener("click", () => {
    followModals.followListModal.style.display = "none"; // 모달 닫기
  });

  // 탭 전환
  followTabs.followTab.addEventListener("click", () => {
    followTabs.followTab.classList.add("active");
    followTabs.followerTab.classList.remove("active");
    followTabs.followingListContent.style.display = "block";
    followTabs.followerListContent.style.display = "none";
    loadFollowList();
  });

  followTabs.followerTab.addEventListener("click", () => {
    followTabs.followTab.classList.remove("active");
    followTabs.followerTab.classList.add("active");
    followTabs.followingListContent.style.display = "none";
    followTabs.followerListContent.style.display = "block";
    loadFollowerList();
  });

  // 모달 닫기
  document.getElementById("closeFollowList")?.addEventListener("click", () => {
    followModals.followListModal.style.display = "none";
  });

  // 모달 관련 요소
  const modals = {
    profileModal: document.getElementById("profileModal"),
    profileSettingModal: document.getElementById("profileSettingModal"),
    profileMoreModal: document.getElementById("profileMoreModal"),
    profileInfoModal: document.getElementById("profileInfoModal"),
    profileBlockModal: document.getElementById("profileBlockModal")
  };

  // 버튼 관련 요소
  const buttons = {
    uploadPhoto: document.getElementById("uploadPhoto"),
    deletePhoto: document.getElementById("deletePhoto"),
    profileImageArea: document.getElementById("profileImageArea"),
    profileImg: document.getElementById("profileImg"),
    logout: document.getElementById("logout"),
    profileEditButton: document.querySelector(".profile-edit-button"),
    profileSettingButton: document.querySelector(".profile-setting-button"),
    profileMoreButton: document.querySelector(".profile-more-button"),
    profileFollowButton: document.querySelector(".profile-follow-button"),
    startMessageButton: document.querySelector(".start-message-button"),
    savedStoryButton: document.querySelector(".saved-story-button"),
    blockUser: document.getElementById("blockUser"),
    optionBlock: document.getElementById("modal-option-block")
  };

  const tabs = {
    myUploadsTab: document.getElementById("myUploads"),
    savedTab: document.getElementById("saved"),
    postsContent: document.getElementById("postsContent"),
  };

  // 공통 모달 닫기 기능
  document.querySelectorAll(".cancle").forEach(button => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");
      if (modal) modal.style.display = "none";
    });
  });

  // 모달 외부 클릭 시 닫기 - 통합 이벤트
  window.addEventListener("click", (event) => {
    // 이벤트 대상이 각 모달 중 하나일 경우 해당 모달 닫기
    Object.values(modals).forEach((modal) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });
    // 프로필 차단 모달 내 "취소" 버튼 기능 (id="cancleModal")
    modals.profileBlockModal?.querySelector("#cancleModal")?.addEventListener("click", () => {
      modals.profileBlockModal.style.display = "none"; // 프로필 차단 모달 닫기
    });

  // 모달 열기 기능
  buttons.profileImageArea?.addEventListener("click", () => {
    modals.profileModal.style.display = "flex";
  });

  buttons.profileSettingButton?.addEventListener("click", () => {
    modals.profileSettingModal.style.display = "flex";
  });

  buttons.profileMoreButton?.addEventListener("click", () => {
    modals.profileMoreModal.style.display = "flex";
  });

  document.querySelector(".option.info")?.addEventListener("click", () => {
    modals.profileInfoModal.style.display = "flex";
  });

    // 차단 버튼 클릭 시 프로필 차단 모달 열기
    buttons.blockUser?.addEventListener("click", () => {
      modals.profileBlockModal.style.display = "flex"; // 프로필 차단 모달 열기
    });
  


  // 사진 업로드
  buttons.uploadPhoto?.addEventListener("click", () => {
    document.getElementById("imageInput").click();
    modals.profileModal.style.display = "none";
  });

  // 이미지 업로드 처리
  document.getElementById("imageInput")?.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData(document.getElementById("profileUploadForm"));
      try {
        const response = await fetch(document.getElementById("profileUploadForm").action, {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const result = await response.json();
          buttons.profileImg.src = result.imageUrl;
          alert("프로필 이미지가 성공적으로 변경되었습니다.");
        } else {
          alert("프로필 이미지 변경 중 오류가 발생했습니다.");
        }
      } catch (error) {
        console.error("업로드 중 오류:", error);
        alert("업로드 중 문제가 발생했습니다.");
      }
    }
  });

  // 사진 삭제
  buttons.deletePhoto?.addEventListener("click", async () => {
    buttons.profileImg.src = defaultImageUrl;
    try {
      const response = await fetch("/myPage/profile/delete", { method: "POST" });
      if (response.ok) {
        console.log("프로필 이미지 기본 이미지로 업데이트 완료.");
      } else {
        console.error("서버 요청 오류:", response.statusText);
      }
    } catch (error) {
      console.error("프로필 사진 삭제 요청 중 오류:", error);
    }
    modals.profileModal.style.display = "none";
  });

// 팔로우 상태 확인 및 버튼 초기화
async function initFollowButton(button) {
  console.log("[initFollowButton] 팔로우 버튼 초기화 시작");

  const nickname = extractNicknameFromURL();
  if (!nickname) {
    console.error("[initFollowButton] 닉네임을 URL에서 추출할 수 없습니다.");
    return;
  }

  console.log(`[initFollowButton] 추출된 닉네임: ${nickname}`);

  try {
    const response = await fetch(`/follow/status/${nickname}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const result = await response.json();
      console.log("[initFollowButton] 서버 응답 데이터:", result);

      if (result.success) {
        button.textContent = result.isFollowing ? "팔로우 취소" : "팔로우";
        console.log(`[initFollowButton] 버튼 텍스트 설정: ${button.textContent}`);
      } else {
        console.error("[initFollowButton] 서버 반환 오류:", result.message);
      }
    } else {
      console.error("[initFollowButton] HTTP 오류 발생:", response.status);
      alert("팔로우 상태 확인 중 문제가 발생했습니다. 잠시 후 다시 시도하세요.");
    }
  } catch (error) {
    console.error("[initFollowButton] 네트워크 오류 발생:", error);
    alert("네트워크 오류로 팔로우 상태를 확인할 수 없습니다.");
  } finally {
    console.log("[initFollowButton] 팔로우 버튼 초기화 완료");
  }
}

  if (buttons.profileFollowButton) {
    // 팔로우 상태 초기화
    await initFollowButton(buttons.profileFollowButton);

    // 팔로우 버튼 클릭 이벤트 처리
    buttons.profileFollowButton.addEventListener("click", async () => {
      if (buttons.profileFollowButton.disabled) {
        console.warn("[팔로우 버튼] 이미 요청 처리 중입니다.");
        return;
      }

      buttons.profileFollowButton.disabled = true; // 요청 시작 시 버튼 비활성화
      console.log("[팔로우 버튼] 클릭 이벤트 발생");

      try {
        const nickname = extractNicknameFromURL();
        if (!nickname) {
          console.error("[팔로우 버튼] 닉네임을 URL에서 추출할 수 없습니다.");
          return;
        }

        let response;
        let actionType;

        if (buttons.profileFollowButton.textContent === "팔로우") {
          response = await fetch(`/follow/${nickname}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
          actionType = "FOLLOW";
        } else {
          response = await fetch(`/follow/${nickname}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });
          actionType = "UNFOLLOW";
        }

        if (response.ok) {
          const result = await response.json();
          alert(result.message);

          if (actionType === "FOLLOW") {
            buttons.profileFollowButton.textContent = "팔로우 취소";

            console.log(`[팔로우 버튼] 팔로우 성공: ${result.message}`);

            sendNoti(
              "follow",
              `/member/${loginMemberNickname}`,
              result.followerMemberNo,
              `<strong>${loginMemberNickname}</strong>님이 회원님을 
              <br>
              팔로우하기 시작했습니다.`
            );

          } else {
            buttons.profileFollowButton.textContent = "팔로우";
            console.log(`[팔로우 버튼] 팔로우 취소 성공: ${result.message}`);
          }
        } else {
          console.error("[팔로우 버튼] 요청 실패:", response.statusText);
          alert("요청 처리 중 문제가 발생했습니다.");
        }
      } catch (error) {
        console.error("[팔로우 버튼] 요청 중 오류 발생:", error);
        alert("요청 처리 중 문제가 발생했습니다. 네트워크 상태를 확인하세요.");
      } finally {
        buttons.profileFollowButton.disabled = false; // 요청 완료 후 버튼 활성화
        console.log("[팔로우 버튼] 요청 처리 완료");
      }
    });
  }

// 차단
buttons.optionBlock?.addEventListener("click", async () => {
  const nickname = extractNicknameFromURL();
  try {
    // 닉네임 변수 확인
    if (!nickname || nickname.trim() === "") {
      alert("차단할 닉네임을 확인할 수 없습니다.");
      return;
    }
    console.log(`[차단 버튼] 차단 요청 대상: ${nickname}`);

    // 서버에 차단 요청
    const response = await fetch(`/block/${nickname}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    // 요청 성공 여부 확인
    if (response.ok) {
      const result = await response.json();
      console.log("[차단 버튼] 차단 요청 성공:", result);

      // 성공 메시지 표시 및 UI 업데이트
      alert(result.message || "차단이 완료되었습니다.");
      // 예: 차단 후 모달 닫기
      modals.profileBlockModal.style.display = "none";

      // 차단 대상이 프로필인 경우, 특정 UI 변경 가능
      buttons.profileFollowButton?.remove(); // 팔로우 버튼 제거
    } else {
      console.error("[차단 버튼] 서버 응답 오류:", response.statusText);
      alert("차단 요청 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  } catch (error) {
    console.error("[차단 버튼] 요청 중 오류 발생:", error);
    alert("요청 처리 중 문제가 발생했습니다. 네트워크 상태를 확인해주세요.");
  }
});


  // 로그아웃
  buttons.logout?.addEventListener("click", () => {
    window.location.href = "/member/logout";
  });

  // 프로필 편집
  buttons.profileEditButton?.addEventListener("click", () => {
    window.location.href = "/myPage/editProfile";
  });

  // 스토리 보기
  buttons.savedStoryButton?.addEventListener("click", () => {
    window.location.href = "/myPage/saveStory";
  });

  // 채팅 시작
  if (buttons.startMessageButton) {
    const nickname = extractNicknameFromURL();
    buttons.startMessageButton.addEventListener("click", () => startChatting(nickname));
  }

  // 탭 초기화 및 클릭 이벤트
  initTabs(tabs);


// 닉네임 추출
function extractNicknameFromURL() {
  const currentUrl = window.location.pathname;
  return currentUrl.split("/").pop();
}

// 채팅 시작
async function startChatting(nickname) {
  try {
    const memberNoResponse = await fetch(`/chatting/getMemberNo?nickname=${encodeURIComponent(nickname)}`);
    if (!memberNoResponse.ok) throw new Error("닉네임으로 회원 번호를 조회하지 못했습니다.");

    const memberNo = await memberNoResponse.json();
    const chatResponse = await fetch('/chatting/enter', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(memberNo),
    });

    if (!chatResponse.ok) throw new Error("채팅방 생성 요청 실패!");

    const chattingNo = await chatResponse.json();
    window.location.href = `/chatting?chattingNo=${chattingNo}`;
  } catch (error) {
    console.error("오류 발생:", error);
    alert(error.message);
  }
}

// 차단 목록 모달 열기
document.getElementById("blockList")?.addEventListener("click", async () => {
  try {
    const response = await fetch("/block/blockList");
    if (!response.ok) throw new Error("차단 목록 데이터를 불러오는 데 실패했습니다.");

    const data = await response.json();

    const blockedUsers = data.blockList;
    console.log("서버에서 반환된 데이터:", data); // 서버 데이터 확인
    const userList = document.getElementById("blockedUsers");
    userList.innerHTML = "";

    if (!blockedUsers || blockedUsers.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.textContent = "차단한 회원이 없습니다.";
      emptyMessage.classList.add("empty-message");
      userList.appendChild(emptyMessage);
    } else {
      blockedUsers.forEach(user => {
        console.log("차단된 사용자 데이터:", user); // 각 사용자 데이터 확인
        const userItem = document.createElement("li");
        userItem.className = "user-item";
        userItem.innerHTML = `
          <img src="${user.PROFILE_IMG ||'/images/defaultImg.png'}" class="profile-img">
          <span class="nickname">${user.MEMBER_NICKNAME || '알 수 없음'}</span>
          <button class="unblock-btn" data-user-id="${user.MEMBERNO}">차단 취소</button>
        `;
        console.log("생성된 버튼의 data-user-id 값:", user.MEMBERNO);
        userList.appendChild(userItem);
      });
    }

    // 모달 표시
    const blockListModal = document.getElementById("blockListModal");
    blockListModal.style.display = "flex"; // 모달 보이기
  } catch (err) {
    alert("차단 목록을 불러오는 중 오류가 발생했습니다.");
    console.error(err);
  }
});

// 모달 닫기 버튼
document.getElementById("closeBlockList")?.addEventListener("click", () => {
  const blockListModal = document.getElementById("blockListModal");
  blockListModal.style.display = "none"; // 모달 숨기기
});


// 차단 취소 버튼 이벤트 처리
document.getElementById("blockedUsers").addEventListener("click", async (event) => {
  if (event.target.classList.contains("unblock-btn")) {
    const userId = event.target.dataset.userId; // 버튼에 저장된 사용자 ID
        // userId 값 검증
        if (!userId || userId === "undefined") {
          alert("차단 취소할 사용자 ID를 찾을 수 없습니다.");
          console.error("잘못된 userId:", userId);
          return;
        }
    try {
      // 서버로 DELETE 요청 보내기
      const response = await fetch(`/block/unBlock`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blockedMemberNo: userId }),
      });

      if (!response.ok) throw new Error("차단 해제 요청 실패");

      const result = await response.json();
      if (result.success) {
        // DOM에서 사용자 항목 제거
        event.target.closest(".user-item").remove();
        alert(result.message || "차단이 해제되었습니다.");
      } else {
        alert(result.message || "차단 해제 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("차단 해제 요청 중 오류:", error);
      alert("차단 해제 요청 중 문제가 발생했습니다.");
    }
  }
});

  // 팔로잉 목록 로드
  async function loadFollowList() {
    console.log("[loadFollowList] 팔로우 목록 로드 시작");
    try {
      const response = await fetch("/follow/followList");
      console.log("[loadFollowList] 서버 요청 완료");
      if (!response.ok) throw new Error("팔로우 리스트를 가져오는 데 실패했습니다.");

      const data = await response.json();
      console.log("팔로우 리스트 데이터:", data); // 콘솔에 출력

      followTabs.followingList.innerHTML = "";
      console.log("[loadFollowList] 기존 팔로우 리스트 초기화");
      // console.log("followTabs.followingList:", followTabs.followingList);

      if (data.length === 0) {
        followTabs.followingList.innerHTML = "<p class='empty-message'>팔로우한 사용자가 없습니다.</p>";
      } else {
        data.forEach(user => {
          const userItem = document.createElement("li");
          userItem.className = "user-item";
          userItem.innerHTML = `
            <img src="${user.PROFILEIMG || '/images/default-profile.png'}">
            <span class="nickname">${user.NICKNAME}</span>
            <button class="unfollow-btn" data-user-nick="${user.NICKNAME}">언팔로우</button>
        `;
          followTabs.followingList.appendChild(userItem);
        });
      }
    } catch (error) {
      console.error("팔로우 목록 로드 실패:", error);
    }
  }

  // 팔로워 목록 로드
async function loadFollowerList() {
  console.log("[loadFollowerList] 팔로워 목록 로드 시작");
  try {
    const response = await fetch("/follow/followerList");
    console.log("[loadFollowerList] 서버 요청 완료");
    if (!response.ok) throw new Error("팔로워 리스트를 가져오는 데 실패했습니다.");

    const data = await response.json();
    console.log("팔로워 리스트 데이터:", data);

    followTabs.followerList.innerHTML = "";
    console.log("[loadFollowerList] 기존 팔로워 리스트 초기화");

    if (data.length === 0) {
      followTabs.followerList.innerHTML = "<p class='empty-message'>팔로워가 없습니다.</p>";
    } else {
      for (const user of data) {
        const userItem = document.createElement("li");
        userItem.className = "user-item";

        // 서버로 해당 사용자의 팔로우 상태 확인
        let isFollowing = false;
        try {
          const followStatusResponse = await fetch(`/follow/status/${user.NICKNAME}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          if (followStatusResponse.ok) {
            const followStatusData = await followStatusResponse.json();
            isFollowing = followStatusData.isFollowing;
            console.log(`[loadFollowerList] ${user.NICKNAME} 팔로우 상태: ${isFollowing}`);
          } else {
            console.error(`[loadFollowerList] 팔로우 상태 확인 실패: ${user.NICKNAME}`);
          }
        } catch (error) {
          console.error(`[loadFollowerList] 팔로우 상태 확인 중 오류: ${user.NICKNAME}`, error);
        }

        // 팔로워 항목 생성
        userItem.innerHTML = `
          <img src="${user.PROFILEIMG || '/images/default-profile.png'}">
          <span class="nickname">${user.NICKNAME}</span>
          <button class="follow-back-btn" data-user-nick="${user.NICKNAME}">
            ${isFollowing ? "언팔로우" : "맞팔로우"}
          </button>
        `;

        followTabs.followerList.appendChild(userItem);
      }
    }
  } catch (error) {
    console.error("[loadFollowerList] 팔로워 목록 로드 실패:", error);
  }
}


  // 언팔로우 버튼 이벤트
  followTabs.followingList.addEventListener("click", async (event) => {
    if (event.target.classList.contains("unfollow-btn")) {
      const userNick = event.target.dataset.userNick;

      try {
        const response = await fetch(`/follow/${userNick}`, { method: "DELETE" });

        if (response.ok) {
          event.target.closest(".user-item").remove();
          alert("팔로우를 취소했습니다.");
        } else {
          alert("팔로우 취소 실패.");
        }
      } catch (error) {
        console.error("팔로우 취소 중 오류:", error);
      }
    }
  });

  // 맞팔로우 버튼 이벤트
  followTabs.followerList.addEventListener("click", async (event) => {
    if (event.target.classList.contains("follow-back-btn")) {
      const userNick = event.target.dataset.userNick;
      const action = event.target.textContent.trim();//추가
      try {
        let response;
        if (action === "맞팔로우") {
          console.log(`[${action}] 요청 시작: /follow/${userNick} (POST)`);
          response = await fetch(`/follow/${userNick}`, { method: "POST" });
        } else if (action === "언팔로우") {
          console.log(`[${action}] 요청 시작: /follow/${userNick} (DELETE)`);
          response = await fetch(`/follow/${userNick}`, { method: "DELETE" });
        }

        // 응답 객체 확인
        if (!response) {
          console.error(`[${action}] 응답 객체가 정의되지 않음.`);
          alert("서버 요청에 실패했습니다. 잠시 후 다시 시도해주세요.");
          return;
        }
        // 요청 결과 확인
        if (response.ok) {
          const result = await response.json(); // 응답 데이터를 JSON으로 변환
          console.log(`[${action}] 요청 성공:`, result);
  
          // 버튼 상태 업데이트
          event.target.textContent = action === "맞팔로우" ? "언팔로우" : "맞팔로우";
          console.log(`[${action}] 버튼 상태 업데이트 완료: ${event.target.textContent}`);
        } else {
          console.error(`[${action}] 요청 실패: HTTP 상태 코드 ${response.status}`);
          alert(`${action} 실패. 잠시 후 다시 시도해주세요.`);
        }
      } catch (error) {
        console.error(`[${action}] 요청 중 오류:`, error);
        alert(`네트워크 오류가 발생했습니다. (${error.message})`);
      }
    }



  });


  document.addEventListener("DOMContentLoaded", () => {
    const myUploadsTab = document.getElementById("myUploadsTab");
    const savedTab = document.getElementById("savedTab");
  
    // 초기 활성화 상태 설정
    myUploadsTab.classList.add("active");
  
    // 클릭 이벤트 리스너 추가
    myUploadsTab.addEventListener("click", () => activateTab(myUploadsTab, "uploads"));
    savedTab?.addEventListener("click", () => activateTab(savedTab, "saved"));
  });
  
  function activateTab(activeTab, type) {
    // 모든 탭에서 'active' 클래스 제거
    document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  
    // 클릭된 탭에 'active' 클래스 추가
    activeTab.classList.add("active");
  
    // 서버에서 데이터 로드 (AJAX)
    fetch(type === "uploads" ? `/member/${location.pathname.split("/")[2]}/posts` : "/myPage/saved")
      .then(response => response.json())
      .then(data => {
        // setupPagination(data, type); // 페이지네이션 설정
        renderPosts(data, type); // post 렌더링
      })
      .catch(error => console.error(`Error fetching ${type} posts:`, error));
  }

  // 탭 초기화 cp적용, 페이지네이션 설정은 백엔드에서 9개씩 불러오도록
  function initTabs(tabs) {
    tabs.myUploadsTab?.classList.add("active");
    activateTab(tabs.myUploadsTab, "uploads");
    tabs.myUploadsTab?.addEventListener("click", () => activateTab(tabs.myUploadsTab, "uploads"));
    tabs.savedTab?.addEventListener("click", () => activateTab(tabs.savedTab, "saved"));
  }
  
  // 페이지네이션 설정
  // function setupPagination(posts, type) {
  //   const itemsPerPage = 9; // 가로 3개, 세로 3개씩 표시
  //   const totalPages = Math.ceil(posts.length / itemsPerPage);
  //   let currentPage = 1;

  //   // 페이지네이션 컨테이너 초기화
  //   const paginationContainer = document.getElementById("pagination");
  //   paginationContainer.innerHTML = "";

  //   // 페이지네이션 버튼 생성
  //   for (let i = 1; i <= totalPages; i++) {
  //     const pageButton = document.createElement("button");
  //     pageButton.className = "page-button";
  //     pageButton.textContent = i;
  //     if (i === currentPage) pageButton.classList.add("active");

  //     pageButton.addEventListener("click", () => {
  //       currentPage = i;
  //       document.querySelectorAll(".page-button").forEach(btn => btn.classList.remove("active"));
  //       pageButton.classList.add("active");
  //       renderPosts(posts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), type);
  //     });

  //     paginationContainer.appendChild(pageButton);
  //   }

  //   // 초기 렌더링
  //   renderPosts(posts.slice(0, itemsPerPage), type);
  // }


  // 게시물 렌더링
  function renderPosts(posts, type) {
    const postsContent = document.getElementById("postsContent");
    postsContent.innerHTML = "";
    if (posts.length === 0) {
      const noPostsContainer = document.createElement("div");
      noPostsContainer.className = "no-posts-container"; // 컨테이너 클래스 추가
      const noPostsMessage = document.createElement("p");
      noPostsMessage.className = "no-posts-message"; // 메시지 클래스 추가
      noPostsMessage.textContent = type === "uploads"
        ? "회원님이 작성한 게시물이 존재하지 않습니다."
        : "회원님이 저장한 게시물이 존재하지 않습니다.";
    
      noPostsContainer.appendChild(noPostsMessage);
      postsContent.appendChild(noPostsContainer); // 컨테이너를 추가
      return;
    }
      // 게시물이 있는 경우 클래스 제거
      postsContent.classList.remove("no-posts-container");
      postsContent.classList.remove("no-posts-message");
      
    // posts.forEach(post => {
    //   const postItem = document.createElement("div");
    //   postItem.className = "post-item"; // 클래스 추가
    //   postItem.innerHTML = `
    //     <a href="/board/${post.boardNo}">
    //       <img class="post-image" src="${post.imgPath}${post.imgRename}" alt="Post Image" />
    //     </a>`;
    //   postsContent.appendChild(postItem);
    // });

    posts.forEach(post => {
      const postItem = document.createElement("div");
      postItem.className = "post-item"; // 클래스 추가
    
      // 게시물 항목의 이미지 추가
      const postImage = document.createElement("img");
      postImage.className = "post-image";
      postImage.src = `${post.imgPath}${post.imgRename}`;
      postImage.alt = "Post Image";
    
      // 클릭 이벤트로 상세 모달 열기
      postItem.addEventListener("click", () => {
        console.log(post.boardNo);
        openDetail(post.boardNo)});
    
      // post-item에 이미지 추가
      postItem.appendChild(postImage);
      postsContent.appendChild(postItem);
    });
    


  }

});




// -------------------------------------------------------------------------
// 무한스크롤

let currentPage = 1; // 현재 페이지, fetch 수행 시 마다 증가

document.addEventListener('DOMContentLoaded',  function () {
  // IntersectionObserver : 보고있는 화면에 요소가 나타나는지 감지
  let intersectionObserver = new IntersectionObserver(async function (entries) {
    // intersectionRatio가 0이라는 것은 대상을 볼 수 없다는 것이므로
    // 아무것도 하지 않음
    if (entries[0].intersectionRatio <= 0) return;

    // console.log("새 항목 불러옴");
    await fetchMoreFeedItems();
  });
  // 주시 시작
  intersectionObserver.observe(document.querySelector("#SCmainFooter"));
// =======
// // 게시물 렌더링
// function renderPosts(posts, type) {
//   const postsContent = document.getElementById("postsContent");
//   postsContent.innerHTML = "";
//   if (posts.length === 0) {
//     const noPostsContainer = document.createElement("div");
//     noPostsContainer.className = "no-posts-container"; // 컨테이너 클래스 추가
  
//     const noPostsMessage = document.createElement("p");
//     noPostsMessage.className = "no-posts-message"; // 메시지 클래스 추가
//     noPostsMessage.textContent = type === "uploads"
//       ? "회원님이 작성한 게시물이 존재하지 않습니다."
//       : "회원님이 저장한 게시물이 존재하지 않습니다.";
  
//     noPostsContainer.appendChild(noPostsMessage);
//     postsContent.appendChild(noPostsContainer); // 컨테이너를 추가
//     return;
//   }
//     // 게시물이 있는 경우 클래스 제거
//     postsContent.classList.remove("no-posts");
    
//     posts.forEach(post => {
//       const postItem = document.createElement("div");
//       postItem.className = "post-item"; // 클래스 추가
    
//       // 게시물 항목의 이미지 추가
//       const postImage = document.createElement("img");
//       postImage.className = "post-image";
//       postImage.src = `${post.imgPath}${post.imgRename}`;
//       postImage.alt = "Post Image";
    
//       // 클릭 이벤트로 상세 모달 열기
//       postItem.addEventListener("click", () => openDetail(post.boardNo));
    
//       // post-item에 이미지 추가
//       postItem.appendChild(postImage);
//       postsContent.appendChild(postItem);
//     }); 여기 옛 코드



  async function fetchMoreFeedItems() {
    try {
      const nickname = location.pathname.split("/")[2];

      // 피드 항목을 가져올 때 이 URL을 실제 백엔드 엔드포인트로 대체합니다
      const response = await fetch(`/member/${nickname}/posts?cp=${++currentPage}`);

      if (!response.ok) {
        throw new Error('오류가 발생했습니다');
      }

      const posts = await response.json();

      // 새 피드 항목 렌더링
      // renderFeedItems(posts);

      const type = document.querySelector(".tab.active").innerText === '게시물' ? 'uploads' : 'saved';
      // renderPosts(posts, type);

      const postsContent = document.getElementById("postsContent");
      posts.forEach(post => {
        const postItem = document.createElement("div");
        postItem.className = "post-item"; // 클래스 추가
      
        // 게시물 항목의 이미지 추가
        const postImage = document.createElement("img");
        postImage.className = "post-image";
        postImage.src = `${post.imgPath}${post.imgRename}`;
        postImage.alt = "Post Image";
      
        // 클릭 이벤트로 상세 모달 열기
        postItem.addEventListener("click", () => {
          console.log(post.boardNo);
          openDetail(post.boardNo)});
      
        // post-item에 이미지 추가
        postItem.appendChild(postImage);
        postsContent.appendChild(postItem);
      });
      

      // return posts;
    } catch (error) {
      console.error('Feed를 가져올 수 없습니다 :', error);
      return { hasMore: false };
    }
  }

});