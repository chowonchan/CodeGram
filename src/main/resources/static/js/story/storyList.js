// memberStoryList

document.addEventListener("DOMContentLoaded", ()=>{

    const innerList = document.querySelectorAll('.inner.in');

    innerList.forEach((inner, idx) => {
        const createdAt = inner.querySelector('.created-at');
        const imgContainer = inner.querySelector('.img-container');
        const img = imgContainer.querySelector('img');

        const rightBtn = inner.querySelector('.story-right');
        const leftBtn = inner.querySelector('.story-left');

        // 누르면 이동
        imgContainer.addEventListener('click', () => {
            const innerAll = document.querySelectorAll(".inner.in");

            innerAll.forEach((inner, idx) => {
                inner.style.width = '206px';
                inner.style.height = '366px';
                inner.style.opacity = '0.4'

                inner.querySelector(".story-header").style.display = 'none';
                inner.querySelector(".story-footer").style.display = 'none';
                inner.querySelector(".story-right").style.display = 'none';
                inner.querySelector(".story-left").style.display = 'none';
            })


            inner.style.width = '514px';
            inner.style.height = '914px';
            inner.style.opacity = '1'

            inner.querySelector(".story-header").style.display = 'block';
            inner.querySelector(".story-footer").style.display = 'block';
            inner.querySelector(".story-right").style.display = 'flex';
            inner.querySelector(".story-left").style.display = 'flex';

            moveToCenter(inner)
        });

        // 오른쪽 버튼 클릭 시
        rightBtn.addEventListener('click', () => {
            let storyIndex = img.dataset.storyIndex;

            const storyList = memberStoryList[idx].storyList;

            // 현재 회원 다른 스토리가 존재 할 때
            if(storyIndex < storyList.length - 1){
                storyIndex++;
                const story = storyList[storyIndex];

                img.src = story.imgPath + story.imgRename;
                img.dataset.storyNo = story.storyNo;
                img.dataset.storyIndex = storyIndex;
                createdAt.textContent = story.createdAt;

                moveToCenter(img)

            } else {
                // 현재 회원이 다른 스토리가 없을 경우

                if(memberStoryList.length - 1 > idx){ // 오른쪽에 다른 회원 스토리가 있음
                    hiddenStory(inner);
                    showStory(inner.nextElementSibling);

                    console.log(inner.nextElementSibling);
                    moveToCenter(inner.nextElementSibling)

                }
            }



        });

        // 왼쪽 버튼 클릭 시
        leftBtn.addEventListener('click', () => {
            let storyIndex = img.dataset.storyIndex;

            const storyList = memberStoryList[idx].storyList;

            if(storyIndex > 0){
                storyIndex--;
                const story = storyList[storyIndex];

                img.src = story.imgPath + story.imgRename;
                img.dataset.storyNo = story.storyNo;
                img.dataset.storyIndex = storyIndex;
                createdAt.textContent = story.createdAt;

                moveToCenter(img)

            }else {
                // 현재 회원이 다른 스토리가 없을 경우

                if(idx > 0){ // 왼쪽에 다른 회원 스토리가 있음
                    hiddenStory(inner);
                    showStory(inner.previousElementSibling);

                    moveToCenter(inner.previousElementSibling)
                }
            }



        });

    });

})


// 처음 들어왔을 떄 동작
document.addEventListener("DOMContentLoaded", ()=>{
    const params = new URLSearchParams(location.search);
    const memberNickname = params.get("memberNickname");

    const nicknames = document.querySelectorAll(".story-header div:first-of-type");

    nicknames.forEach(item => {
        if(memberNickname === item.innerText){
            showStory(item);
            moveToCenter(item)
        }
    })
});



// 보는 스토리
const showStory = (item) => {
    const inner = item.closest(".inner.in");
    inner.style.width = '514px';
    inner.style.height = '914px';
    inner.style.opacity = '1'

    inner.querySelector(".story-header").style.display = 'block';
    inner.querySelector(".story-footer").style.display = 'block';
    inner.querySelector(".story-right").style.display = 'flex';
    inner.querySelector(".story-left").style.display = 'flex';
}

// 안보는 스토리
const hiddenStory = (item) => {
    const inner = item.closest(".inner.in");
    inner.style.width = '206px';
    inner.style.height = '366px';
    inner.style.opacity = '0.4'

    inner.querySelector(".story-header").style.display = 'none';
    inner.querySelector(".story-footer").style.display = 'none';
    inner.querySelector(".story-right").style.display = 'none';
    inner.querySelector(".story-left").style.display = 'none';
}

function moveToCenter(element) {
    element.scrollIntoView({
        behavior: 'smooth',  // 부드러운 스크롤
        block: 'center',     // 세로 중앙에 맞춤
        inline: 'center'     // 가로 중앙에 맞춤
    });
    setTimeout( () => {
        element.scrollIntoView({
            behavior: 'auto',
            block: 'center',     // 세로 중앙에 맞춤
            inline: 'center'     // 가로 중앙에 맞춤
        });
        console.log("얍")
    },200)
}

