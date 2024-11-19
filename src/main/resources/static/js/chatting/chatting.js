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



// 이미지 선택 시 미리보기
imageUpload.addEventListener('change', function(event) {
  const file = event.target.files[0];
  
  if (file) {
    // FileReader로 이미지를 미리 보기
    const reader = new FileReader();
    reader.onload = function(e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'block'; // 이미지 미리보기 표시
    };
    reader.readAsDataURL(file); // 이미지 읽기
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
const sendMessagePartner = () => {

  if (selectChattingNo === undefined) {
    alert("대화방을 선택해주세요");
    return;
  }

  // 채팅 입력 textarea
  const inputChatting = document.querySelector("#inputChatting");
  const msg = inputChatting.value.trim(); // 입력된 채팅 메시지

  // 로그인이 되어있지 않으면 함수 종료 ****************
  if (!notificationLoginCheck) return;

  if (msg.length === 0) { // 채팅 미입력
    alert("채팅을 입력해 주세요");
    return;
  }

  // 웹소켓 핸들러로 전달할 채팅 관련 데이터를 담은 객체 생성
  const chattingObj = {
    "partnerNo": selectPartnerNo,
    "messageContent": msg,
    "chatRoomNo": selectChattingNo
  }

  // JSON으로 변환하여 웹소켓 핸들러로 전달
  chattingSock.send(JSON.stringify(chattingObj));

  //  
  // type, url, pkNo, content
  // const content =
  //   `<strong>${loginMemberName}</strong>님이 채팅을 보냈습니다.<br>`
  //   + `<span class="chat-preview">${msg}</span>`;

  // const url = location.pathname + "?chat-no=" + selectChattingNo;
  // sendNotification("chatting", url, selectPartnerNo, content);


  inputChatting.value = ""; // 보낸 채팅 내용 삭제
}


if (chattingSock != undefined) {

  chattingSock.addEventListener("message", e => {
    console.log(e.data);

    // 메소드를 통해 전달받은 JSON을 JS Object로 변환해서 msg 변수에 저장.
    const msg = JSON.parse(e.data);
    console.log(msg);


    // 현재 채팅방을 보고있는 경우
    if (selectChattingNo == msg.chatRoomNo) {

      const ul = document.querySelector(".chat-messages");

      const span = document.createElement("span");
      span.classList.add("chatDate");
      span.innerText = msg.sendTime;


      // 메세지 만들어서 출력하기
      //<li>,  <li class="my-chat">
      const li = document.createElement("li");

      // 보낸 시간

      // 메세지 내용
      const p = document.createElement("p");
      p.classList.add("chat");
      p.innerHTML = msg.messageContent; // br태그 해석을 위해 innerHTML

      // 내가 작성한 메세지인 경우
      if (loginMemberNo == msg.memberNo) {
        li.classList.add("my-chat");

        li.append(span, p);

      } else { // 상대가 작성한 메세지인 경우
        li.classList.add("partner-chat");

        // 상대 프로필
        const img = document.createElement("img");
        img.setAttribute("src", selectPartnerProfile);

        const div = document.createElement("div");

        // 상대 이름
        const b = document.createElement("b");
        b.innerText = selectPartnerName; // 전역변수

        const br = document.createElement("br");

        div.append(b, br, p, span);
        li.append(img, div);

      }

      ul.append(li)
      ul.scrollTop = ul.scrollHeight; // 스크롤 제일 밑으로
    }

    selectRoomList();

  })
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

const searchInput = document.querySelector('.search-input');
const sendButton = document.querySelector('.send-button');
const searchResults = document.querySelector('.search-results');
const noResultsMessage = document.querySelector('.no-results');
const modalOverlay = document.querySelector('#modal-overlay');

// --------------------------- 사용자 검색 ---------------------------
searchInput.addEventListener("input", () => {

  // 입력된 값
  const query = searchInput.value.trim();

  // 입력된 값이 없을 경우
  if (query.length === 0) {
    searchResults.innerHTML = ""; // 검색 결과 목록 삭제
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

      searchResults.innerHTML = ""; // 이전 검색 결과 비우기

      if (list.length == 0) {
        noResultsMessage.style.display = 'none';
        const li = document.createElement("li");
        li.classList.add("result-row");
        li.innerText = "일치하는 회원이 없습니다";
        searchResults.append(li);
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
        searchResults.append(li);

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

      // 200ms 후에 실행
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
            searchInput.value = "";
            searchResults.innerHTML = "";
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

        if (chatRoom.partnerProfile == undefined)
          listProfile.setAttribute("src", userDefaultImage);
        else
          listProfile.setAttribute("src", chatRoom.partnerProfile);

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

        if (chatRoom.lastMessage != undefined) {
          recentMessage.innerHTML = chatRoom.lastMessage;
        }

        div.append(recentMessage);

        itemBody.append(p, div);

        // 현재 채팅방을 보고있는게 아니고 읽지 않은 개수가 0개 이상인 경우 -> 읽지 않은 메세지 개수 출력
        if (chatRoom.notReadCount > 0 && chatRoom.chatRoomNo != selectChattingNo) {
          const notReadCount = document.createElement("p");
          notReadCount.classList.add("not-read-count");
          notReadCount.innerText = chatRoom.notReadCount;
          div.append(notReadCount);

        } else if (selectChattingNo !== undefined
          && chatRoom.chatRoomNo == selectChattingNo) {

          // 현재 채팅방을 보고있는 경우
          // 비동기로 해당 채팅방 글을 읽음으로 표시
          fetch("/chatting/updateReadFlag", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: selectChattingNo
          })
            .then(resp => resp.text())
            .then(result => console.log(result))
            .catch(err => console.log(err));

        }


        li.append(itemHeader, itemBody);
        ul.append(li);
      }

      chatRoomListAddEvent();
    })
    .catch(err => console.log(err));
}


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

      // 메세지 만들어서 출력하기
      for (let msg of messageList) {
        //<li>,  <li class="my-chat">
        const li = document.createElement("li");

        // 보낸 시간
        const span = document.createElement("span");
        span.classList.add("chatDate");
        span.innerText = msg.sendTime;

        // 메세지 내용
        const p = document.createElement("p");
        p.classList.add("chat");
        p.innerHTML = msg.messageContent; // br태그 해석을 위해 innerHTML

        // 내가 작성한 메세지인 경우
        if (loginMemberNo == msg.memberNo) {
          li.classList.add("my-chat");

          li.append(span, p);

        } else { // 상대가 작성한 메세지인 경우
          li.classList.add("partner-chat");

          // 상대 프로필
          const img = document.createElement("img");
          img.setAttribute("src", selectPartnerProfile);

          const div = document.createElement("div");

          // 상대 이름
          const b = document.createElement("b");
          b.innerText = selectPartnerName; // 전역변수

          const br = document.createElement("br");

          div.append(b, br, p, span);
          li.append(img, div);

        }

        ul.append(li);
        ul.scrollTop = ul.scrollHeight; // 스크롤 제일 밑으로
      }

    })
    .catch(err => console.log(err));
}





// ----------------------------------------------------------------------
const sidebar = document.querySelector(".sidebar");
// 문서 로딩이 완료된 후
document.addEventListener("DOMContentLoaded", () => {

  // 채팅방 목록에 클릭 이벤트 추가하는 함수 호출
  chatRoomListAddEvent();

  // sidebar.classList.add("narrow");


  // 보내기 버튼 클릭 시 메시지 보내기
  // document.querySelector("#sendButton").addEventListener("click", sendMessagePartner);

  // 채팅 입력 후 엔터 입력 시 메시지 보내기
  document.querySelector("#inputChatting").addEventListener("keyup", e => {

    // 입력한 키가 Enter인 경우
    if (e.key == "Enter") {
      if (!e.shiftKey) {

        sendMessagePartner();
      }
    }
  });


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