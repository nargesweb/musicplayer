// select all required element 

const wrapper = document.querySelector(".wrapper"),
    musicImage = wrapper.querySelector(".image-erea img"),
    musicName = wrapper.querySelector(".song-details .name"),
    mainAudio = wrapper.querySelector("#main-audio"),
    musicArtist = wrapper.querySelector(".song-details .artist"),
    playPauseBtn = wrapper.querySelector(".play-pause"),
    prevBtn = wrapper.querySelector("#prev"),
    nextBtn = wrapper.querySelector("#next"),
    progressBar = wrapper.querySelector(".progress-bar"),
    progressErea = wrapper.querySelector(".progress-area"),
    musicList = wrapper.querySelector(".music-list"),
    showMoreBtn = wrapper.querySelector("#more-music"),
    closeMusicsBtn = musicList.querySelector("#close"),
    header = wrapper.querySelector(".top-menu"),
    more = wrapper.querySelector("#more"),
    searchBox = wrapper.querySelector("#search-box")
    ;


let musicIndex = 2;


window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playingNow()
});

// load music function 
function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImage.src = `image/${allMusic[indexNumb - 1].image}`;
    mainAudio.src = `music/${allMusic[indexNumb - 1].src}.mp3`;

}

// play music function 
function playMusic() {
    wrapper.classList.add("paused");
    mainAudio.play();
    playPauseBtn.querySelector("i").innerText = "pause";
    wrapper.querySelector(".image-erea").style.animation = "slow 1s infinite ease"
}

// pause music function 
function pauseMusic() {
    wrapper.classList.remove("paused");
    mainAudio.pause();
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    wrapper.querySelector(".image-erea").style.animation = "none";
}

// next music function
function nextMusic() {
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();


}

// previous music function
function prevMusic() {
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

// play or music btn event 
playPauseBtn.addEventListener("click", () => {
    const isMusicPaused = wrapper.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
});

// next music event 
nextBtn.addEventListener("click", () => {
    nextMusic(); //call this function 
})

// previous music event 
prevBtn.addEventListener("click", () => {
    prevMusic(); //call this function
})

mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let prograssWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${prograssWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current"),
        musicDuration = wrapper.querySelector(".duration");
    mainAudio.addEventListener('loadeddata', () => {

        // update duration 
        let audioDuration = mainAudio.duration,
            totalMin = Math.floor(audioDuration / 60),
            totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin} : ${totalSec}`;


    })
    // update current Time 
    let audioCurrentTime = mainAudio.currentTime,
        currentMin = Math.floor(audioCurrentTime / 60),
        currentSec = Math.floor(audioCurrentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin} : ${currentSec}`;

});

progressErea.addEventListener("click", (e) => {
    let progressWithVal = progressErea.clientWidth,
        clickedOffsetX = e.offsetX,
        songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffsetX / progressWithVal) * songDuration;
    playMusic();

})

const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText;
    switch (getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.style.color = "#0e59bc"
            break;

        case "repeat_one":
            repeatBtn.innerText = "repeat";
            repeatBtn.style.color = "#848b96";
            break;
    }
})


mainAudio.addEventListener("ended", () => {
    let getText = repeatBtn.innerText;

    switch (getText) {
        case "repeat":
            nextMusic();
            break;

        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
    }



})

// show music list event 
showMoreBtn.addEventListener("click", () => {
    musicList.style.opacity = 1;
    musicList.style.left = 0;
    musicList.style.pointerEvents = "auto";
})
// hide music list event  
closeMusicsBtn.addEventListener("click", () => {
    musicList.style.opacity = 0;
    musicList.style.left = "-50px";
    musicList.style.pointerEvents = "none";
})

const ulTag = document.querySelector("ul");

for(let i=0 ;i < allMusic.length ; i++){
    let liTag =`<li li-index = "${i + 1}">
                    <div class="row">
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].artist}</p>
                    </div>
                    <audio class="${allMusic[i].src}" src="music/${allMusic[i].src}.mp3"></audio>
                    
                </li>
    `;
    ulTag.insertAdjacentHTML("beforeend" , liTag );

}

const allLiTag = ulTag.querySelectorAll("li");

function playingNow(){
    for(let j=0 ; j < allLiTag.length ; j++){

        if(allLiTag[j].classList.contains("playing")){
            allLiTag[j].classList.remove("playing")
        }

        if(allLiTag[j].getAttribute("li-index") == musicIndex){
            allLiTag[j].classList.add("playing");
            
        }
        allLiTag[j].setAttribute("onclick","clicked(this)");
    }
    
}
// play music when click li 
function clicked(element){
    let getLiIndex = element.getAttribute("li-index");
    musicIndex  = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}