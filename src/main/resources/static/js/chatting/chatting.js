let selectChattingNo; // 선택한 채팅방 번호



const sendMessage = document.querySelector(".sendMessage");
const sendMessage2 = document.querySelector(".sendMessage2");

sendMessage.addEventListener("click", () => {
  chattingSearchMember.style.display = "flex";
});

sendMessage2.addEventListener("click", () => {
  chattingSearchMember.style.display = "flex";
});




const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');

// 이미지 미리보기
imageUpload.addEventListener('change', function (event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'block'; // 이미지 미리보기 표시
    };
    reader.readAsDataURL(file);
  } else {
    imagePreview.style.display = 'none'; // 이미지가 없으면 숨기기
  }
});






/* -------------------채팅 보내기 js ------------------- */

// 채팅에 사용될 SockJS 객체를 저장할 변수
let chattingSock;

// 로그인이 되어있을 경우 ********
if (notificationLoginCheck) { // common.html에 선언된 전역 변수

  // 서버로 ws://chattingSock 요청
  // -> 요청으로 처리하는 WebSockHandler와 연결
  //  --> WebSockHandler에 연결된 회원의 정보를 모아두게 된다!!!
  chattingSock = new SockJS("/chattingSock");
}


/* 채팅 메시지를 보내는 함수 */
const sendMessagePartner = async (imagePath) => {
  console.log("imagePath", imagePath);

  if (selectChattingNo === undefined) {
    alert("대화방을 선택해주세요");
    return;
  }

  // 채팅 입력 textarea
  const inputChatting = document.querySelector("#inputChatting");
  const msg = inputChatting.value.trim(); // 입력된 채팅 메시지

  // 로그인이 되어있지 않으면 함수 종료
  if (!notificationLoginCheck) return;

  // 이미지와 텍스트 모두 없는 경우
  if (!imagePath && msg.length === 0) {
    alert("채팅을 입력해 주세요");
    return;
  }

  let chattingObj;

  // 이미지와 텍스트 모두 있는 경우
  if (imagePath && msg.length > 0) {
    chattingObj = {
      "partnerNo": selectPartnerNo,
      "imageUrl": imagePath,
      "messageContent": `<img src="${imagePath}" alt="이미지"><div class="message-text">${msg}</div>`,
      "chatRoomNo": selectChattingNo
    }
  }
  // 이미지만 있는 경우
  else if (imagePath) {
    chattingObj = {
      "partnerNo": selectPartnerNo,
      "imageUrl": imagePath,
      "messageContent": `<img src="${imagePath}" alt="이미지">`,
      "chatRoomNo": selectChattingNo
    }
  }
  // 텍스트만 있는 경우
  else {
    chattingObj = {
      "partnerNo": selectPartnerNo,
      "messageContent": msg,
      "chatRoomNo": selectChattingNo
    }
  }

  // JSON으로 변환하여 웹소켓 핸들러로 전달
  chattingSock.send(JSON.stringify(chattingObj));

  // 이미지가 있는 경우 이미지 업로드 필드 초기화
  if (imagePath) {
    const img = document.querySelector("#imageUpload");
    const dataTransfer = new DataTransfer();
    img.files = dataTransfer.files;
  }

  // type , url , pkNo , content
  // 텍스트또는 이미지가 있는 경우 알림 보내기
  if  ( ( msg.length > 0 || imagePath.length > 0 ) || 
        ( msg.length > 0 && imagePath.length > 0 ) ) {
    const content = 
      `<strong>${loginMemberName}</strong>님이 채팅을 보냈습니다.<br>
      <span class="chat-preview">${msg}</span>`;

    const url = location.pathname + "?chat-no=" + selectChattingNo;
    console.log("// 상대방에게 알림 보내기");
    sendNoti("chatting", url, selectPartnerNo, content);
  }

  inputChatting.value = ""; // 보낸 채팅 내용 삭제
}

if (chattingSock != undefined) {
  let lastDisplayedTime = null; // 마지막으로 표시된 시간을 저장할 변수
  let lastPartnerTime = null; // 마지막으로 상대방 메시지가 표시된 시간을 저장할 변수

  chattingSock.addEventListener("message", e => {
    console.log(e.data);

    const msg = JSON.parse(e.data);
    console.log(msg);

    // 현재 채팅방을 보고있는 경우에만 메시지 표시
    if (selectChattingNo == msg.chatRoomNo) {
      const ul = document.querySelector(".chat-messages");
      const currentTime = msg.sendTime;

      // 이전 메시지와 시간을 비교하여 표시 여부 결정
      const shouldDisplayTime = lastDisplayedTime !== currentTime;

      // 시간 표시 요소
      const span = document.createElement("span");
      span.classList.add("chatDate");
      if (shouldDisplayTime) {
        span.innerText = currentTime;
        lastDisplayedTime = currentTime;
      } else {
        span.style.display = 'none';
      }

      const li = document.createElement("li");
      const p = document.createElement("p");
      p.classList.add("chat");

      // 메시지 내용 처리 (이미지와 텍스트 모두 포함 가능)
      if (msg.messageContent) {
        const contentDiv = document.createElement("div");
        contentDiv.innerHTML = msg.messageContent;
        
        // 이미지가 있는 경우 클릭 이벤트 추가
        const chatImage = contentDiv.querySelector("img");
        if (chatImage) {
          chatImage.classList.add("chat-image");
          chatImage.addEventListener('click', () => {
            window.open(chatImage.src, '_blank');
          });
        }
        
        p.appendChild(contentDiv);
      }

      // 내가 작성한 메세지인 경우
      if (loginMemberNo == msg.memberNo) {
        li.classList.add("my-chat");

        if (!shouldDisplayTime) {
          li.classList.add("continuous-chat");
        }

        li.append(span, p);

      } else { // 상대가 작성한 메세지인 경우
        li.classList.add("partner-chat");

        const div = document.createElement("div");

        // 이전 시간과 분 단위로 비교하여 프로필 표시 여부 결정
        const [lastHour, lastMinute] = lastPartnerTime ? lastPartnerTime.split(':') : [null, null];
        const [currentHour, currentMinute] = currentTime.split(':');
        const isSameMinute = 
          lastHour === currentHour && lastMinute === currentMinute;

        if (!isSameMinute) {
          lastPartnerTime = currentTime;

          // 프로필 이미지는 시간 단위로 한 번만 표시
          const img = document.createElement("img");
          img.setAttribute("src", selectPartnerProfile);
          img.classList.add("profile-image");

          const b = document.createElement("b");
          b.innerText = selectPartnerName;

          const br = document.createElement("br");
          div.append(b, br);
          li.append(img, div);
        } else {
          li.classList.add("continuous-chat");
        }

        div.append(p, span);
        li.append(div);
      }

      ul.append(li);
      ul.scrollTop = ul.scrollHeight;
    }

    imagePreview.style.display = 'none';
    inputChatting.value = ""; // 보낸 채팅 내용 삭제
    selectRoomList();
  });
}



/* ---------------------- 메시지 보내기 버튼 js ------------------ */
document.querySelector('.close-button').addEventListener('click', () => {

  document.querySelector('.modal-overlay').style.display = 'none';
});


function isKorean(text) {
  // 정규식을 사용하여 한글인지 확인합니다.
  const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  return koreanRegex.test(text);
}

const inputSearch = document.querySelector('.search-input');
const sendButton = document.querySelector('.send-button');
const searchMemberResults = document.querySelector('.search-results');
const noResultsMessage = document.querySelector('.no-results');
const modalOverlay = document.querySelector('#modal-overlay');

// --------------------------- 사용자 검색 ---------------------------
inputSearch.addEventListener("input", () => {

  // 입력된 값
  const query = inputSearch.value.trim();

  // 입력된 값이 없을 경우
  if (query.length === 0) {
    searchMemberResults.innerHTML = ""; // 검색 결과 목록 삭제
    return;
  }

  let searchUrl;

  if (isKorean(query)) {
    searchUrl = `/member/search?query=${encodeURIComponent(query)}&type=name`;
  } else {
    searchUrl = `/member/search?query=${encodeURIComponent(query)}&type=nickName`;
  }

  // 입력된 값이 있을 경우
  fetch(searchUrl)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("검색 실패");
    })
    .then(list => {

      console.log(list);

      searchMemberResults.innerHTML = ""; // 이전 검색 결과 비우기

      if (list.length == 0) {
        noResultsMessage.style.display = 'none';
        const li = document.createElement("li");
        li.classList.add("result-row");
        li.innerText = "일치하는 회원이 없습니다";
        searchMemberResults.append(li);
        return;
      }

      for (let member of list) {
        noResultsMessage.style.display = 'none';
        // li요소 생성(한 행을 감싸는 요소)
        const li = document.createElement("li");
        li.classList.add("result-row");
        li.setAttribute("data-id", member.memberNo);

        // 프로필 이미지 요소
        const img = document.createElement("img");
        img.classList.add("result-row-img");

        // 프로필 이미지 여부에 따른 src 속성 선택
        if (member.profileImg == null) img.setAttribute("src", userDefaultImage);
        else img.setAttribute("src", member.profileImg);

        let nickname = member.memberNickname;
        let name = member.memberName;

        const span = document.createElement("span");
        span.innerHTML = `${name}`.replace(query, `<mark>${query}</mark>`);

        // 요소 조립(화면에 추가)
        li.append(img, span);
        searchMemberResults.append(li);

        // 클릭 시 채팅방 입장 함수 호출
        li.addEventListener("click", chattingEnter);

      }


    })
    .catch(err => console.error(err));

});








// ----------------------------------------------------------------------

const chattingEnter = (e) => {

  // data-id 값을 얻어와 저장(참여자 회원 번호)
  const partnerNo = e.currentTarget.dataset.id;
  console.log(partnerNo);

  fetch("/chatting/enter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: partnerNo
  })
    .then(response => {
      if (response.ok) return response.text();
      throw new Error("입장 실패");
    })
    .then(chattingNo => {
      // chattingNo : 입장한 채팅방 번호
      console.log(chattingNo);

      selectRoomList(); // 비동기로 채팅방 목록 조회

      setTimeout(() => {

        // 입장하려던 채팅방이 
        // 이미 채팅방 목록에 존재하는 경우

        // 1) 채팅방 목록 li 태그들 얻어오기
        const itemList = document.querySelectorAll(".chatting-item");

        // 2) li 태그의 "chat-no" 값과
        //    입장하려는 방 번호가 같은 경우
        //    == 입장하려는 방이 채팅방 목록에 존재하는 경우
        for (let item of itemList) {
          if (item.getAttribute("chat-no") == chattingNo) {
            item.focus();
            item.click(); // 클릭 ->  selectChattingFn() 호출됨

            // 검색창 닫기
            // modalOverlay.classList.add("chattingSearchMember");

            // 검색창 내용 비우기
            inputSearch.value = "";
            searchMemberResults.innerHTML = "";
            return;
          }
        }

      }, 300);
      document.querySelector('.modal-overlay').style.display = 'none';

    })
    .catch(err => console.error(err));

}
// ----------------------------------------------------------------------

// 비동기로 채팅방 목록 조회
const selectRoomList = () => {
  fetch("/chatting/chatRoomList")
    .then(resp => resp.json())
    .then(chatRoomList => {
      console.log(chatRoomList);

      // 채팅방 목록 출력 영역 선택
      const ul = document.querySelector(".chatting-list");

      const DMLogo = document.querySelector(".DMLogo-container");

      // DMLogo.style.display = "none";

      // 채팅방 목록 지우기
      ul.innerHTML = "";

      // 조회한 채팅방 목록을 화면에 추가
      for (let chatRoom of chatRoomList) {
        const li = document.createElement("li");
        li.classList.add("chatting-item");
        li.setAttribute("chat-no", chatRoom.chatRoomNo);
        li.setAttribute("partner-no", chatRoom.partnerNo);

        if (chatRoom.chatRoomNo == selectChattingNo) {
          li.classList.add("select");
        }

        // item-header 부분
        const itemHeader = document.createElement("div");
        itemHeader.classList.add("item-header");

        const listProfile = document.createElement("img");
        listProfile.classList.add("list-profile");

        if (chatRoom.partnerProfile == undefined) {
          listProfile.setAttribute("src", userDefaultImage);
        } else {
          listProfile.setAttribute("src", chatRoom.partnerProfile);
        }

        itemHeader.append(listProfile);

        // item-body 부분
        const itemBody = document.createElement("div");
        itemBody.classList.add("item-body");

        const p = document.createElement("p");

        const partnerName = document.createElement("span");
        partnerName.classList.add("partner-name");
        partnerName.innerText = chatRoom.partnerName;

        const recentSendTime = document.createElement("span");
        recentSendTime.classList.add("recent-send-time");
        recentSendTime.innerText = chatRoom.sendTime;

        p.append(partnerName, recentSendTime);

        const div = document.createElement("div");

        const recentMessage = document.createElement("p");
        recentMessage.classList.add("recent-message");



        if (chatRoom.lastMessage !== undefined && chatRoom.lastMessage !== null) {
          // 이미지 메시지가 있는지 확인
          if (chatRoom.lastMessage.startsWith("<img")) {
            // 이미지가 전송되었을 경우
            recentMessage.innerHTML = "이미지가 전송되었습니다."; // 대체 텍스트
          } else {
            // 텍스트 메시지인 경우
            recentMessage.innerHTML = chatRoom.lastMessage; // 일반 메시지
          }
        } else {
          recentMessage.textContent = ""; // 메시지가 없을 경우 빈 문자열
        }



        div.append(recentMessage);

        itemBody.append(p, div);

        // 현재 채팅방을 보고있지 않고 읽지 않은 개수가 0개 이상인 경우
        if (chatRoom.notReadCount > 0 && chatRoom.chatRoomNo != selectChattingNo) {
          const notReadCount = document.createElement("p");
          notReadCount.classList.add("not-read-count");
          notReadCount.innerText = chatRoom.notReadCount;
          div.append(notReadCount);
        } else if (
          selectChattingNo !== undefined &&
          chatRoom.chatRoomNo == selectChattingNo
        ) {
          // 현재 채팅방을 보고있는 경우
          // 비동기로 해당 채팅방 글을 읽음으로 표시
          fetch("/chatting/updateReadFlag", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: selectChattingNo,
          })
            .then((resp) => resp.text())
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
        }

        li.append(itemHeader, itemBody);
        ul.append(li);
      }

      chatRoomListAddEvent();
    })
    .catch((err) => console.log(err));
};


// ----------------------------------------------------

// 채팅방 목록에 이벤트를 추가하는 함수 
let lastClickedItem = null; // 마지막으로 클릭된 채팅방을 추적하는 변수

const chatRoomListAddEvent = () => {
  const chattingItemList = document.getElementsByClassName("chatting-item");

  for (let item of chattingItemList) {
    // 클릭 이벤트 핸들러를 미리 분리
    const clickHandler = (e) => {
      // 이전에 클릭한 채팅방의 정보가 있으면 처리
      if (lastClickedItem) {
        // 이전 채팅방의 클릭 이벤트를 복원
        lastClickedItem.addEventListener("click", lastClickedItem.clickHandler);

        // 이전 채팅방의 chat-header 제거
        const prevProfileUl = document.querySelector(".chat-header");
        if (prevProfileUl) {
          prevProfileUl.innerHTML = ''; // 프로필을 지웁니다.
        }
      }

      // 전역변수에 채팅방 번호, 상대 번호, 상태 프로필, 상대 이름 저장
      selectChattingNo = item.getAttribute("chat-no");
      selectPartnerNo = item.getAttribute("partner-no");

      selectPartnerProfile = item.children[0].children[0].getAttribute("src") || userDefaultImage;
      selectPartnerName = item.children[1].children[0].children[0].innerText;

      if (item.children[1].children[1].children[1] != undefined) {
        item.children[1].children[1].children[1].remove();
      }

      const logoContainer = document.querySelector(".DMLogo-container");
      const chatMessages = document.querySelector("#chatMessages");
      if (logoContainer) {
        logoContainer.remove(); // 해당 div를 DOM에서 제거
        // chatMessages.add();
      }

      // 모든 채팅방에서 select 클래스를 제거
      for (let it of chattingItemList) it.classList.remove("select");

      // 현재 클릭한 채팅방에 select 클래스 추가
      item.classList.add("select");



      // ----------------채팅방 상대 프로필 --------------------
      const profileUl = document.querySelector(".chat-header");

      // 프로필 이미지를 감싸는 span 생성
      const span2 = document.createElement("span");

      // 프로필 이미지 생성
      const img = document.createElement("img");
      img.setAttribute("src", selectPartnerProfile);

      // 이름을 감싸는 span 생성
      const span3 = document.createElement("span");
      span3.innerText = selectPartnerName;

      // 요소들 조립
      span2.append(img);
      profileUl.append(span2, span3);

      profileUl.style.borderBottom = "1px solid #ccc";
      span3.style.marginLeft = "10px";
      span3.style.fontWeight = "bold";

      // ----------------채팅방 상대 프로필 --------------------



      // 클릭 후 해당 item의 클릭 이벤트를 제거
      item.removeEventListener("click", clickHandler);

      // 이전에 클릭한 채팅방 업데이트
      lastClickedItem = item;
      lastClickedItem.clickHandler = clickHandler;

      // 비동기로 메세지 목록을 조회하는 함수 호출
      selectChattingFn();



      span2.addEventListener("click", (e) => {
        e.stopPropagation(); // 부모 클릭 이벤트로 전파되지 않도록 방지

        // 프로필 페이지로 이동 (예: profile.html?userId=partnerNo)
        window.location.href = `profile.html?userId=${selectPartnerNo}`;
      });

      span3.addEventListener("click", (e) => {
        e.stopPropagation(); // 부모 클릭 이벤트로 전파되지 않도록 방지

        // 프로필 페이지로 이동 (예: profile.html?userId=partnerNo)
        window.location.href = `profile.html?userId=${selectPartnerNo}`;
      });
    };


    // 각 채팅 아이템에 클릭 이벤트 핸들러 등록
    item.addEventListener("click", clickHandler);
  }
};




// ----------------------------------------------------

// 비동기로 메세지 목록을 조회하는 함수
const selectChattingFn = () => {

  fetch(`/chatting/selectMessage?chattingNo=${selectChattingNo}`)
    .then(resp => resp.json())
    .then(messageList => {
      console.log(messageList);

      // <ul class="chat-messages">
      const ul = document.querySelector(".chat-messages");
      ul.innerHTML = ""; // 이전 내용 지우기

      let lastDisplayedTime = null; // 마지막으로 표시된 시간을 저장할 변수
      let lastSender = null; // 마지막 메시지 발신자 저장 변수

      // 메세지 만들어서 출력하기
      for (let msg of messageList) {
        const currentTime = msg.sendTime;

        // 이전 메시지와 시간을 비교하여 표시 여부 결정
        const shouldDisplayTime = lastDisplayedTime !== currentTime;
        const isSameSender = lastSender === msg.memberNo;

        // 시간 표시 요소
        const span = document.createElement("span");
        span.classList.add("chatDate");
        if (shouldDisplayTime) {
          span.innerText = currentTime;
          lastDisplayedTime = currentTime;
        } else {
          span.style.display = 'none'; // 같은 시간대의 메시지는 시간 숨김
        }

        const li = document.createElement("li");
        const p = document.createElement("p");
        p.classList.add("chat");
        p.innerHTML = msg.messageContent;

        // 내가 작성한 메세지인 경우
        if (loginMemberNo == msg.memberNo) {
          li.classList.add("my-chat");

          // 이전 메시지와 같은 시간대이고 같은 발신자인 경우
          if (!shouldDisplayTime && isSameSender) {
            li.classList.add("continuous-chat");
          }

          li.append(span, p);

        } else { // 상대가 작성한 메세지인 경우
          li.classList.add("partner-chat");

          const img = document.createElement("img");
          img.setAttribute("src", selectPartnerProfile);

          // 연속된 메시지인 경우 프로필 이미지 숨김
          if (!shouldDisplayTime && isSameSender) {
            img.style.visibility = 'hidden';
          }

          const div = document.createElement("div");

          // 상대 이름은 첫 메시지나 시간이 다른 경우에만 표시
          if (shouldDisplayTime || !isSameSender) {
            const b = document.createElement("b");
            b.innerText = selectPartnerName;
            const br = document.createElement("br");
            div.append(b, br);
          } else {
            li.classList.add("continuous-chat");
          }

          div.append(p, span);
          li.append(img, div);
        }

        ul.append(li);
        lastSender = msg.memberNo;
      }

      ul.scrollTop = ul.scrollHeight; // 스크롤 제일 밑으로


    })
    .catch(err => console.log(err));
}





// ----------------------------------------------------------------------
const chatSidebar = document.querySelector(".sidebar");
// 문서 로딩이 완료된 후
document.addEventListener("DOMContentLoaded", () => {

  // 채팅방 목록에 클릭 이벤트 추가하는 함수 호출
  chatRoomListAddEvent();

  if (chatSidebar) {
    chatSidebar.classList.add("narrow");
  } else {
    console.error("chatSidebar 요소를 찾을 수 없습니다.");
  }

  // 채팅 입력 후 엔터 입력 시 메시지 보내기
  document.querySelector("#inputChatting").addEventListener("keyup", async e => {

    // 입력한 키가 Enter인 경우
    if (e.key == "Enter") {
      if (!e.shiftKey) {


        const img = document.querySelector("#imageUpload").files[0];

        // 메시지 입력 X, 이미지 전송 X === 진짜 아무것도 없을 때
        if (e.target.value.trim() === '' && img === undefined) return;


        let imagePath = null;
        if (img) {

          imagePath = await asyncImageUpload(img);
        }
        // 상대방에게 메시지 채팅 시 이미지도
        await sendMessagePartner(imagePath);
      }
    }
  });


  // *********************
  const asyncImageUpload = async (img) => {
    console.log('비동기로 이미지 서버 저장 함수 호출');
    console.log(img);

    // 이미지 파일을 FormData에 담아 서버로 전송하기
    const formData = new FormData();
    formData.append('image', img); // 'image'는 서버에서 받는 파일 필드명

    try {
      // 서버에 이미지 업로드 요청 보내기 (예: POST 요청)
      const response = await fetch('/chatting/uploadImage', {
        method: 'POST',
        body: formData
      });

      // 서버가 응답을 정상적으로 보냈는지 확인
      if (response.ok) {
        const data = await response.json();
        console.log('서버에서 받은 데이터:', data);

        // 서버에서 받은 이미지 URL 반환
        return data.imageUrl; // 예: 서버가 반환한 경로
      } else {
        throw new Error('이미지 업로드 실패');
      }
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생:', error);
      return null; // 오류 발생 시 null 반환
    }
  };


  /* 채팅 알림을 클릭해서 채팅 페이지로 이동한 경우 */
  const params = new URLSearchParams(location.search);
  const chatNo = params.get("chat-no");

  if (chatNo !== null) {
    const itemList = document.querySelectorAll(".chatting-item");
    itemList.forEach(item => {
      if (item.getAttribute("chat-no") === chatNo) {
        item.click();
        return;
      }
    })
  }
})