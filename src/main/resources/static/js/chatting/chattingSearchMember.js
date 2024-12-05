document.querySelector('.close-button2').addEventListener('click', () => {
  document.querySelector('.modal-overlaySearch').style.display = 'none';
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