setTimeout(() => {
    var preload = document.querySelector(".preload");
    var name = document.querySelector(".preload h2");
    var loader = document.querySelector(".loader");
    name.style.transform = "translateX(-500px)";
    loader.style.transform = "translateX(500px)";
    name.style.opacity = "0";
    loader.style.opacity = "0";
    preload.style.opacity = "0";
    setTimeout(function () {
        preload.style.display = "none";
    },
        3000)
}, 5000)

const songInfo = [
    {
        name: "Adhmara",
        background: "https://insane.imfast.io/adhmara.jpg",
        url: "https://insane.imfast.io/adhmara.mp3"
    },
    {
        name: "Akelapan",
        background: "https://insane.imfast.io/akelapan.jpg",
        url: "https://insane.imfast.io/akelaapan.mp3"
    },
    {
        name: "Chinta",
        background: "https://insane.imfast.io/karma.jpeg",
        url: "https://insane.imfast.io/chinta.mp3"
    },
    {
        name: "Dakhal",
        background: "https://insane.imfast.io/dakhal.jpg",
        url: "https://insane.imfast.io/dakhal.mp3"
    },
    {
        name: "Gahra",
        background: "https://insane.imfast.io/karma.jpeg",
        url: "https://insane.imfast.io/gahra.mp3"
    },
    {
        name: "Gasoline",
        background: "https://insane.imfast.io/gasoline.jpg",
        url: "https://insane.imfast.io/gasoline.mp3"
    },
    {
        name: "Kitni Baar",
        background: "https://insane.imfast.io/kitnibaar.jpg",
        url: "https://insane.imfast.io/kitnibaar.mp3"
    },
    {
        name: "Koi Na Tera",
        background: "https://insane.imfast.io/karma.jpeg",
        url: "https://insane.imfast.io/koinatera.mp3"
    },
    {
        name: "Raasta",
        background: "https://insane.imfast.io/karma.jpeg",
        url: "https://insane.imfast.io/raasta.mp3"
    },
    {
        name: "Suffered",
        background: "https://insane.imfast.io/karma.jpeg",
        url: "https://insane.imfast.io/suffered.mp3"
    },
    {
        name: "Tamas",
        background: "https://insane.imfast.io/tamas.jpeg",
        url: "https://insane.imfast.io/tamas.mp3"
    },
    {
        name: "Tyag",
        background: "https://insane.imfast.io/karma.jpeg",
        url: "https://insane.imfast.io/tyag.mp3"
    }
]

const nextButton = document.querySelector(".next-song");
const prevButton = document.querySelector(".prev-song");
const song = document.querySelector("audio");
const record = document.querySelector(".record");
const title = document.querySelector(".song-title");
const playButton = document.querySelector(".play");
const bar = document.querySelector(".seek");
const progressBar = document.getElementById("length");
const progressDiv = document.getElementById("progress");
const currentTimeIndicator = document.querySelector(".music-time__current");
const leftTimeIndicator = document.querySelector(".music-time__last");

let currentIndex = 0;

nextButton.addEventListener("click", () => {
    if (currentIndex == 11) {
        currentIndex = 0;
        song.src = songInfo[currentIndex].url;
        song.play();
        title.innerText = songInfo[currentIndex].name;
        record.style.backgroundImage = `url(${songInfo[currentIndex].background})`;
        download.setAttribute("href", songInfo[currentIndex].url)
    }
    else if (currentIndex < 11) {
        song.src = songInfo[currentIndex + 1].url;
        song.play();
        title.innerText = songInfo[currentIndex + 1].name;
        record.style.backgroundImage = `url(${songInfo[currentIndex + 1].background})`;
        download.setAttribute("href", songInfo[currentIndex + 1].url)
        currentIndex++;
    }
    playButton.classList.remove("play")
    playButton.classList.add("pause");
    playButton.innerHTML = "<i class='fas fa-pause'></i>";
    record.style.animation = "spin 1.5s infinite forwards";
})

prevButton.addEventListener("click", () => {
    if (currentIndex == 0) {
        currentIndex = 11;
        song.src = songInfo[currentIndex].url;
        song.play();
        title.innerText = songInfo[currentIndex].name;
        record.style.backgroundImage = `url(${songInfo[currentIndex].background})`;
        download.setAttribute("href", songInfo[currentIndex].url)
    }
    else if (currentIndex > 0) {
        song.src = songInfo[currentIndex - 1].url;
        song.play();
        title.innerText = songInfo[currentIndex - 1].name;
        record.style.backgroundImage = `url(${songInfo[currentIndex - 1].background})`;
        download.setAttribute("href", songInfo[currentIndex - 1].url)
        currentIndex--;
    }
    playButton.classList.remove("play")
    playButton.classList.add("pause");
    playButton.innerHTML = "<i class='fas fa-pause'></i>";
    record.style.animation = "spin 1.5s infinite forwards";
})

playButton.addEventListener("click", () => {
    if (playButton.className == "play") {
        song.play();
        playButton.classList.remove("play")
        playButton.classList.add("pause");
        playButton.innerHTML = "<i class='fas fa-pause'></i>";
        record.style.animation = "spin 1.5s infinite forwards";
    }
    else if (playButton.className == "pause") {
        song.pause();
        playButton.classList.remove("pause");
        playButton.classList.add("play");
        playButton.innerHTML = "<i class='fas fa-play'></i>";
        record.style.animationPlayState = "paused";
    }
})

song.addEventListener("waiting", () => {
    record.style.animationPlayState = "paused";
    setTimeout(() => { record.style.animation = "spin 1.5s infinite forwards"; }, 2000)
})

// trying to fix playback issue


// playback issue of animation
song.addEventListener("ended", () => {
    record.style.animation = "none";
    playButton.innerHTML = "<i class='fas fa-play'></i>";
    playButton.classList.remove("pause")
    playButton.classList.add("play");
})

function changeBar() {
    const percentage = (song.currentTime / song.duration).toFixed(3);
    progressBar.style.transition = "";
    // console.log(song.currentTime);

    //set current time
    const minute = Math.floor(song.currentTime / 60);
    const second = Math.floor(song.currentTime % 60);
    const leftTime = song.duration - song.currentTime;
    currentTimeIndicator.innerHTML =
        ("0" + minute).substr(-2) + ":" + ("0" + second).substr(-2);

    //set left time
    const leftMinute = Math.floor(leftTime / 60);
    const leftSecond = Math.floor(leftTime % 60);

    leftTimeIndicator.innerHTML =
        ("0" + leftMinute).substr(-2) + ":" + ("0" + leftSecond).substr(-2);

    //set time bar
    progressBar.style.width = percentage * 100 + "%";
}

function showTime() {
    timer = setInterval(() => changeBar(), 500);
}

function progress(e) {
    //get current position and minus progress bar's x position to get current position in progress bar
    const pos =
        (e.pageX - progressDiv.getClientRects()[0].x) /
        progressDiv.getClientRects()[0].width;
    song.currentTime = pos * song.duration;
    changeBar();
}

progressDiv.addEventListener("click", e => {
    progress(e);
});
showTime();