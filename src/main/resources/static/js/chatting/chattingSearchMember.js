const members = [
  { memberId: 1, memberName: 'member01', memberNickName: '홍길동', profileImg: '/api/placeholder/36/36' },
  { memberId: 2, memberName: 'member02', memberNickName: '김철수', profileImg: '/api/placeholder/36/36' },
  { memberId: 3, memberName: 'member03', memberNickName: '박지영', profileImg: '/api/placeholder/36/36' },
  { memberId: 4, memberName: 'member04', memberNickName: '최예림', profileImg: '/api/placeholder/36/36' },
];

document.querySelector('.close-button').addEventListener('click', () => {
  document.querySelector('.modal-overlay').style.display = 'none';
});

const searchInput = document.querySelector('.search-input');
const sendButton = document.querySelector('.send-button');
const searchResults = document.querySelector('.search-results');
const noResultsMessage = document.querySelector('.no-results');

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim().toLowerCase();
  if (query) {
      const filteredMembers = members.filter(member => 
          member.memberName.toLowerCase().includes(query) || 
          member.memberNickName.toLowerCase().includes(query)
      );

      if (filteredMembers.length > 0) {
          searchResults.innerHTML = filteredMembers.map(member => `
              <div class="profile-item" data-memberId="${member.memberId}">
                  <img src="${member.profileImg}" alt="${member.memberNickName}">
                  <div>
                      <div class="memberNickName">${member.memberNickName}</div>
                      <div class="memberName">@${member.memberName}</div>
                  </div>
              </div>
          `).join('');
          noResultsMessage.style.display = 'none';
      } else {
          noResultsMessage.style.display = 'block';
          searchResults.innerHTML = '';
      }
  } else {
      searchResults.innerHTML = '';
      noResultsMessage.style.display = 'block';
  }

  sendButton.disabled = !query;
  sendButton.style.opacity = query ? '1' : '0.3';
});

searchResults.addEventListener('click', (e) => {
  const selectedmember = e.target.closest('.profile-item');
  if (selectedmember) {
      sendButton.disabled = false;
      sendButton.style.opacity = '1';
  }
});