document.addEventListener("DOMContentLoaded", async() => {
  const defaultImageUrl = "/images/defaultImg.png";

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
    blockUser: document.getElementById("blockUser") // "차단" 버튼 추가
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

  // 신고 버튼 클릭 시 profileBlockModal 열기
  buttons.blocktUserButton?.addEventListener("click", () => {
    modals.profileBlockModal.style.display = "flex"; // 차단 모달 열기
    modals.profileMoreModal.style.display = "none"; // 더보기 모달 닫기
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


  // // 팔로우 버튼 처리
  // if (buttons.profileFollowButton) {
  //   buttons.profileFollowButton.addEventListener("click", async () => {
  //     buttons.profileFollowButton.disabled = true; // 요청 시작 시 버튼 비활성화
  //     try {
  //       let response;
  //       let actionType;
  //       const nickname = extractNicknameFromURL();

  //       if (buttons.profileFollowButton.textContent === "팔로우") {
  //         // 팔로우 요청
  //         response = await fetch(`/follow/${nickname}`, {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //         });
  //         actionType = "FOLLOW";
  //       } else {
  //         // 팔로우 취소 요청
  //         response = await fetch(`/follow/${nickname}`, {
  //           method: "DELETE",
  //           headers: { "Content-Type": "application/json" },
  //         });
  //         actionType = "UNFOLLOW";
  //       }

  //       if (response.ok) {
  //         const result = await response.json();
  //         alert(result.message);
  //         if (actionType === "FOLLOW") {
  //           buttons.profileFollowButton.textContent = "팔로우 취소";
  //           sendNoti(
  //             "follow",
  //             `/member/${loginMemberNickname}`,
  //             result.followerMemberNo,
  //             `<strong>${loginMemberNickname}</strong>님이 회원님을 팔로우하기 시작했습니다.`
  //           );
  //         } else {
  //           buttons.profileFollowButton.textContent = "팔로우";
  //         }
  //       } else {
  //         alert("요청 처리 중 오류가 발생했습니다.");
  //       }
  //     } catch (error) {
  //       console.error("요청 처리 중 오류 발생:", error);
  //       alert("요청 처리 중 문제가 발생했습니다.");
  //     } finally {
  //       buttons.profileFollowButton.disabled = false; // 요청 완료 후 버튼 활성화
  //     }
  //   });
  // }

  // 로그아웃
  buttons.logout?.addEventListener("click", () => {
    window.location.href = "/member/logout";
  });

  // 프로필 편집
  buttons.profileEditButton?.addEventListener("click", () => {
    window.location.href = "/myPage/editProfile";
  });

  // 채팅 시작
  if (buttons.startMessageButton) {
    const nickname = extractNicknameFromURL();
    buttons.startMessageButton.addEventListener("click", () => startChatting(nickname));
  }

  // 탭 초기화 및 클릭 이벤트
  initTabs(tabs);
});

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

// 탭 초기화
function initTabs(tabs) {
  tabs.myUploadsTab?.classList.add("active");
  activateTab(tabs.myUploadsTab, "uploads");
  tabs.myUploadsTab?.addEventListener("click", () => activateTab(tabs.myUploadsTab, "uploads"));
  tabs.savedTab?.addEventListener("click", () => activateTab(tabs.savedTab, "saved"));
}

// 탭 활성화
function activateTab(activeTab, type) {
  document.querySelectorAll(".tab-button").forEach(tab => tab.classList.remove("active"));
  activeTab.classList.add("active");
  fetch(type === "uploads" ? "/myPage/posts" : "/member/saved")
    .then(response => response.json())
    .then(data => renderPosts(data, type))
    .catch(error => console.error(`Error fetching ${type} posts:`, error));
}

// 게시물 렌더링
function renderPosts(posts, type) {
  const postsContent = document.getElementById("postsContent");
  postsContent.innerHTML = "";
  if (posts.length === 0) {
    const noPostsMessage = document.createElement("p");
    noPostsMessage.textContent = type === "uploads"
      ? "회원님이 작성한 게시물이 존재하지 않습니다."
      : "회원님이 저장한 게시물이 존재하지 않습니다.";
    postsContent.appendChild(noPostsMessage);
    return;
  }
  posts.forEach(post => {
    const postItem = document.createElement("div");
    postItem.innerHTML = `
      <a href="/board/${post.boardNo}">
        <img src="${post.imgPath}${post.imgRename}" alt="Post Image" />
      </a>`;
    postsContent.appendChild(postItem);
  });
}
