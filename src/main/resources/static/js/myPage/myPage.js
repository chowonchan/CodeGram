// document.addEventListener("DOMContentLoaded", async () => {
//   const profileModal = document.getElementById("profileModal");
//   const profileSettingModal = document.getElementById("profileSettingModal");
//   const profileMoreModal = document.getElementById("profileMoreModal");
//   const profileInfoModal = document.getElementById("profileInfoModal");
//   const uploadPhoto = document.getElementById("uploadPhoto");
//   const deletePhoto = document.getElementById("deletePhoto");
//   const profileImageArea = document.getElementById("profileImageArea");
//   const profileImg = document.getElementById("profileImg");
//   const logout = document.getElementById("logout");
//   const profileFollowButton = document.querySelector(".profile-follow-button");
//   const startMessageButton = document.querySelector(".start-message-button");
//   const defaultImageUrl = "/images/defaultImg.png";
  
//   // 프로필 편집 버튼
//   const profileEditButton = document.querySelector(".profile-edit-button");
//   const profileSettingButton = document.querySelector(".profile-setting-button");
//   const profileMoreButton = document.querySelector(".profile-more-button");


//   const profileOptionInfo = document.querySelector(".option info");

//   const myUploadsTab = document.getElementById("myUploads");
//   const savedTab = document.getElementById("saved");
//   const postsContent = document.getElementById("postsContent");
  
//   // 탭 버튼 및 탭 콘텐츠
//   const tabButtons = document.querySelectorAll(".tab-button");
//   const tabContents = document.querySelectorAll(".tab-content");

//   // 모달 열기
//   profileImageArea?.addEventListener("click", () => {
//     profileModal.style.display = "flex";
//   });
  
//   profileSettingButton?.addEventListener("click", () => {
//     profileSettingModal.style.display = "flex";
//   });

//   profileMoreButton?.addEventListener("click", () => {
//     profileMoreModal.style.display = "flex";
//   });
  
//   profileOptionInfo?.addEventListener("click", () => {
//     profileInfoModal.style.display = "flex";
//   });

  
//   // 사진 업로드 옵션
//   uploadPhoto?.addEventListener("click", () => {
//   imageInput.click();
//   profileModal.style.display = "none";
// });

// // 파일 선택 시 바로 서버로 업로드
// imageInput?.addEventListener("change", async (event) => {
//   const file = event.target.files[0];

//   if (file) {
//       const formData = new FormData(profileUploadForm);

//       try {
//           const response = await fetch(profileUploadForm.action, {
//               method: "POST",
//               body: formData,
//           });

//           if (response.ok) {
//               const result = await response.json(); // 서버에서 반환된 JSON 데이터
//               profileImg.src = result.imageUrl; // 새 이미지로 미리보기 업데이트
//               alert("프로필 이미지가 성공적으로 변경되었습니다.");
//           } else {
//               alert("프로필 이미지 변경 중 오류가 발생했습니다.");
//           }
//       } catch (error) {
//           console.error("업로드 중 오류:", error);
//           alert("업로드 중 문제가 발생했습니다.");
//       }
//   }
// });

// // 1. deletePhoto
// // 이 변수는 "프로필 사진 삭제" 버튼 DOM 요소를 참조합니다.
// // HTML에서 특정 버튼을 선택하여 이벤트를 추가하거나 조작할 때 사용합니다.
// deletePhoto?.addEventListener("click", async () => {
// // addEventListener
// // "deletePhoto"라는 버튼에 이벤트를 추가하는 메서드입니다.
// // 첫 번째 매개변수: "click" (클릭 이벤트)
// // 두 번째 매개변수: 클릭 시 실행할 콜백 함수

// // async
// // 비동기 작업(예: 서버 요청)을 처리할 때 사용됩니다.
// // 이 함수 안에서 `await` 키워드를 사용할 수 있게 합니다.

// try {
//     // try
//     // 에러가 발생할 가능성이 있는 코드를 감싸는 블록입니다.
//     // 에러가 발생하면 catch 블록으로 넘어갑니다.

//     // profileImg.src
//     // "profileImg"는 현재 표시되고 있는 프로필 이미지 요소를 참조합니다.
//     // ".src"는 이 이미지의 소스(이미지 파일 경로)를 변경하는 데 사용됩니다.

//     profileImg.src = "/images/defaultImg.png";
//     // "/images/defaultImg.png"
//     // 기본 프로필 이미지의 경로입니다. 사용자가 프로필 사진을 삭제하면 기본 이미지를 보여줍니다.

//     alert("프로필 사진이 기본 이미지로 변경되었습니다.");
//     // alert
//     // 사용자에게 메시지를 보여주는 브라우저의 내장 함수입니다.

//     const response = await fetch("/myPage/profile/delete", {
//         // fetch
//         // 서버와 통신하기 위해 사용하는 함수입니다.
//         // 첫 번째 매개변수: 요청을 보낼 URL ("/myPage/profile/delete").
//         // 두 번째 매개변수: 요청 옵션 객체입니다.

//         method: "POST"
//         // method
//         // HTTP 요청 메서드를 지정합니다. 여기서는 POST를 사용하여 서버에 데이터를 전달합니다.
//     });

//     // response
//     // 서버에서 반환된 응답 객체를 저장하는 변수입니다.
//     // 성공 여부, 상태 코드, 응답 본문 등 다양한 정보를 포함합니다.

//     if (response.ok) {
//         // response.ok
//         // 응답 상태가 성공적(200번대)인지 확인하는 속성입니다.
//         console.log("서버에서 프로필 이미지를 기본 이미지로 업데이트 완료.");
//         // console.log
//         // 디버깅 목적으로 메시지를 콘솔에 출력합니다.
//     } else {
//         // else
//         // if 조건이 거짓(false)일 때 실행되는 블록입니다.
//         console.error("서버 요청 오류:", response.statusText);
//         // console.error
//         // 오류 메시지를 콘솔에 출력합니다.
//         // response.statusText
//         // 서버 응답의 상태 메시지(예: "Not Found", "Internal Server Error")를 나타냅니다.
//     }
// } catch (error) {
//     // catch
//     // try 블록에서 에러가 발생한 경우 실행됩니다.
//     // error
//     // 발생한 에러 정보를 저장하는 변수입니다.
//     console.error("프로필 사진 삭제 요청 중 오류:", error);
// }

// profileModal.style.display = "none";
// // profileModal
// // 프로필 사진 변경 모달 창을 참조합니다.
// // style.display
// // HTML 요소의 CSS display 속성을 설정합니다.
// // "none"으로 설정하면 요소가 화면에서 숨겨집니다.
// });

// // 모달 외부 클릭 시 닫기 - 통합 이벤트
// window.addEventListener("click", (event) => {
// if (event.target === profileModal) {
//   profileModal.style.display = "none";
// } if (event.target === profileSettingModal) {
//   profileSettingModal.style.display = "none";
// } else if (event.target === profileMoreModal) {
// } if (event.target === profileSettingModal) {
//   profileInfoModal.style.display = "none";
// } else if (event.target === profileMoreModal) {
//   profileMoreModal.style.display = "none";
// }
// });


// // 모든 cancleModal 버튼에 이벤트 리스너 추가
// const cancelButtons = document.querySelectorAll('.cancle');

// cancelButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     // 해당 버튼이 포함된 모달 요소를 찾음
//     const modal = button.closest('.modal');
//     if (modal) {
//       modal.style.display = 'none'; // 모달 닫기
//     }
//   });
// });


// //    프로필 편집 버튼 클릭 시 페이지 이동
//   profileEditButton?.addEventListener("click", () => {
//     window.location.href = "/myPage/editProfile"; // 프로필 편집 페이지 URL
//   });


//   // 팔로우 버튼 클릭 처리
// if (profileFollowButton) {
//   // 현재 URL에서 닉네임 추출
//   const currentUrl = window.location.pathname;
//   const nickname = currentUrl.split("/").pop(); // URL의 마지막 부분 (닉네임)

//   // 초기 버튼 상태 설정
//   const setInitialFollowState = async () => {
//       try {
//           const response = await fetch(`/follow/${nickname}/status`, {
//               method: "GET",
//               headers: {
//                   "Content-Type": "application/json",
//               },
//           });

//           if (response.ok) {
//               const result = await response.json();
//               // 팔로우 상태에 따라 버튼 텍스트 설정
//               profileFollowButton.textContent = result.isFollowing ? "팔로우 취소" : "팔로우";
//           } else {
//               console.error("팔로우 상태 확인 실패");
//           }
//       } catch (error) {
//           console.error("팔로우 상태 확인 중 오류 발생:", error);
//       }
//   };

//   // 버튼 클릭 이벤트 추가
//   profileFollowButton.addEventListener("click", async () => {
//       profileFollowButton.disabled = true; // 요청 시작 시 버튼 비활성화

//       try {
//           let response;
//           let actionType;

//           // 버튼의 현재 텍스트로 팔로우 상태 판단
//           if (profileFollowButton.textContent === "팔로우") {
//               // 팔로우 요청
//               response = await fetch(`/follow/${nickname}`, {
//                   method: "POST",
//                   headers: {
//                       "Content-Type": "application/json",
//                   },
//               });
//               actionType = "FOLLOW"; // 알림 타입
//           } else {
//               // 팔로우 취소 요청
//               response = await fetch(`/follow/${nickname}`, {
//                   method: "DELETE",
//                   headers: {
//                       "Content-Type": "application/json",
//                   },
//               });
//               actionType = "UNFOLLOW"; // 알림 타입
//           }

//           if (response.ok) {
//               const result = await response.json();
//               alert(result.message); // 서버 응답 메시지 표시

//               if (actionType === "FOLLOW") {
//                   // 팔로우 성공 처리
//                   profileFollowButton.textContent = "팔로우 취소";

//                   // 알림 전송 요청
//                   const notificationResponse = await fetch("/sse/follow", {
//                       method: "POST",
//                       headers: {
//                           "Content-Type": "application/json",
//                       },
//                       body: JSON.stringify({
//                           senderMemberNo: result.followerMemberNo, // 팔로우 요청한 사람
//                           receiverMemberNo: result.followingMemberNo, // 팔로우 대상
//                           type: "FOLLOW", // 알림 타입
//                           message: `${nickname}님을 팔로우했습니다.`, // 알림 메시지
//                       }),
//                   });

//                   if (notificationResponse.ok) {
//                       const notificationResult = await notificationResponse.json();
//                       console.log("알림 전송 성공:", notificationResult);
//                   } else {
//                       console.error("알림 전송 실패");
//                   }
//               } else {
//                   // 팔로우 취소 성공 처리
//                   profileFollowButton.textContent = "팔로우";
//               }
//           } else {
//               alert("요청 처리 중 오류가 발생했습니다.");
//           }
//       } catch (error) {
//           console.error("요청 중 오류 발생:", error);
//           alert("요청 처리 중 문제가 발생했습니다.");
//       } finally {
//           profileFollowButton.disabled = false; // 요청 완료 후 버튼 활성화
//       }
//   });

//   // 초기 버튼 상태 설정 실행
//   setInitialFollowState();
// }

// // 메세지 버튼 클릭 처리
// if (startMessageButton) {
//   // 현재 URL에서 닉네임 추출
//   const currentUrl = window.location.pathname;
//   const nickname = currentUrl.split("/").pop(); // URL의 마지막 부분 (닉네임)


//   // 클릭 이벤트 리스너 추가
// startMessageButton.addEventListener('click', async () => {
//   try {
//     // 닉네임으로 memberNo 조회
//     const memberNoResponse = await fetch(`/chatting/getMemberNo?nickname=${encodeURIComponent(nickname)}`);
//     if (!memberNoResponse.ok) {
//       throw new Error('닉네임으로 회원 번호를 조회하지 못했습니다.');
//     }
//     const memberNo = await memberNoResponse.json();

//     if (!memberNo || typeof memberNo !== 'number') {
//       throw new Error('잘못된 회원 번호를 조회했습니다.');
//     }
//         // memberNo를 partnerNo로 설정하여 채팅방 생성 요청
//     const requestData = { partnerNo: memberNo };
//     // 단일 정수 값을 body로 전송
//     const chatResponse = await fetch('/chatting/enter', {
//       method: 'POST', // HTTP 메서드
//       headers: {
//         'Content-Type': 'application/json', // 요청 데이터 타입
//       },
//       body: JSON.stringify(memberNo), // JSON 대신 단일 정수 값을 문자열로 변환
//     });

//     if (!chatResponse.ok) {
//       throw new Error('채팅방 생성 요청 실패!');
//     }

//     const chattingNo = await chatResponse.json();

//     if (!chattingNo || typeof chattingNo !== 'number') {
//       throw new Error('잘못된 채팅방 번호를 반환받았습니다.');
//     }

//     // 성공적으로 채팅방 번호(chattingNo)를 받음
//     console.log('채팅방 번호:', chattingNo);

//     // 채팅방으로 이동
//     window.location.href = `/chatting?chattingNo=${chattingNo}`;


//   } catch (error) {
//     // 오류 처리
//     console.error('오류 발생:', error);
//     alert(error.message);
//   }

// });


// }


//   logout.addEventListener("click", () => {
//     window.location.href = "/member/logout";
//   });

//   // 기본 탭 활성화
// document.addEventListener("DOMContentLoaded", () => {
// // 기본 설정: "게시물" 탭 활성화
// myUploadsTab.classList.add("active");
// savedTab.classList.remove("active");

// // 기본 설정: 업로드한 게시물 로드
// fetch("/mtPage/posts")
//   .then(response => response.json())
//   .then(data => renderPosts(data, "uploads")) // uploads: 업로드한 게시물
//   .catch(error => console.error("Error fetching uploaded posts:", error));
// });

// activateTab(myUploadsTab, "uploads");
// // 탭 클릭 이벤트
// myUploadsTab.addEventListener("click", () => {
// activateTab(myUploadsTab, "uploads");
// });

// savedTab?.addEventListener("click", () => {
// activateTab(savedTab, "saved");
// });

// // 탭 활성화 함수
// function activateTab(activeTab, type) {
// // 모든 탭에서 active 클래스 제거
// if(savedTab)
// [myUploadsTab, savedTab].forEach(tab => tab.classList.remove("active"));

// // 선택된 탭에 active 클래스 추가
// activeTab.classList.add("active");

// // 콘텐츠 로드
// const url = type === "uploads" ? "/myPage/posts" : "/member/saved";
// fetch(url)
//   .then(response => response.json())
//   .then(data => renderPosts(data, type))
//   .catch(error => console.error(`Error fetching ${type} posts:`, error));
// }

// // 게시물 렌더링 함수
// function renderPosts(posts, type) {
// postsContent.innerHTML = ""; // 기존 콘텐츠 초기화

// if (posts.length === 0) {
//   // 게시물이 없을 때 메시지 표시
//   const noPostsMessage = document.createElement("p");
//   noPostsMessage.classList.add("no-posts-message");
//   noPostsMessage.textContent =
//     type === "uploads"
//       ? "회원님이 작성한 게시물이 존재하지 않습니다."
//       : "회원님이 저장한 게시물이 존재하지 않습니다.";
//   postsContent.appendChild(noPostsMessage);
//   return;
// }

// // 게시물 렌더링
// posts.forEach(post => {
//   const postItem = document.createElement("div");
//   postItem.classList.add("post-item");
//   postItem.setAttribute("data-board-no", post.boardNo);
//   postItem.innerHTML = `
//     <a href="/board/${post.boardNo}">
//       <img class="post-image" src="${post.imgPath}${post.imgRename}" alt="Post Image" />
//     </a>
//   `;
//   postsContent.appendChild(postItem);
// });
// }

// });

document.addEventListener("DOMContentLoaded", () => {
  const defaultImageUrl = "/images/defaultImg.png";

  // 모달 관련 요소
  const modals = {
    profileModal: document.getElementById("profileModal"),
    profileSettingModal: document.getElementById("profileSettingModal"),
    profileMoreModal: document.getElementById("profileMoreModal"),
    profileInfoModal: document.getElementById("profileInfoModal"),
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

profileFollowButton.addEventListener("click", async () => {
  profileFollowButton.disabled = true; // 요청 시작 시 버튼 비활성화

  try {
    let response;
    let actionType;

    if (profileFollowButton.textContent === "팔로우") {
      // 팔로우 요청
      response = await fetch(`/follow/${nickname}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      actionType = "FOLLOW";
    } else {
      // 팔로우 취소 요청
      response = await fetch(`/follow/${nickname}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      actionType = "UNFOLLOW";
    }

    if (response.ok) {
      const result = await response.json();
      alert(result.message); // 서버 응답 메시지 표시
      console.log(result);
      if (actionType === "FOLLOW") {
        profileFollowButton.textContent = "팔로우 취소";

        // fetch(`/myPage/selectNickname?followerMemberNo=${selectPartnerNo}`)
        //   .then(resp => resp.text())
        //   .then(partnerNickname => {
        //     window.location.href = `/member/${partnerNickname}`;

        //   })

        // 알림 전송
        sendNoti(
          "follow",
          `/member/${loginMemberNickname}`,
          result.followerMemberNo,
          `<strong>${loginMemberNickname}</strong>님이 
            회원님을 팔로우 하기 시작했습니다.`
        );
      } else {
        profileFollowButton.textContent = "팔로우";
      }
    } else {
      alert("요청 처리 중 오류가 발생했습니다.");
    }
  } catch (error) {
    console.error("요청 처리 중 오류 발생:", error);
    alert("요청 처리 중 문제가 발생했습니다.");
  } finally {
    profileFollowButton.disabled = false; // 요청 완료 후 버튼 활성화
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

}

// 팔로우/언팔로우 처리
async function handleFollowButton(nickname) {
  const button = document.querySelector(".profile-follow-button");
  button.disabled = true;
  const actionType = button.textContent === "팔로우" ? "POST" : "DELETE";
  try {
    const response = await fetch(`/follow/${nickname}`, { method: actionType });
    if (response.ok) {
      const result = await response.json();
      alert(result.message);
      button.textContent = actionType === "POST" ? "팔로우 취소" : "팔로우";
    } else {
      alert("요청 처리 중 오류가 발생했습니다.");
    }
  } catch (error) {
    console.error("요청 중 오류 발생:", error);
  } finally {
    button.disabled = false;
  }
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

