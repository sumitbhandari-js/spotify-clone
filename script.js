document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("loginBtn");
  const loginModal = document.getElementById("loginModal");
  const closeModal = document.getElementById("closeModal");

  if (loginBtn && loginModal && closeModal) {
    loginBtn.addEventListener("click", function (e) {
      e.preventDefault();
      loginModal.classList.remove("hidden");
    });

    closeModal.addEventListener("click", function () {
      loginModal.classList.add("hidden");
    });

    window.addEventListener("click", function (e) {
      if (e.target === loginModal) {
        loginModal.classList.add("hidden");
      }
    });
  } else {
    console.error("One or more elements not found in the DOM.");
  }
});

let songIndex = 0;
let audioElement = new Audio("/songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let playIcon = document.getElementById("playIcon");
let songItems = Array.from(document.getElementsByClassName("songItems"));

let songs = [
  {
    songName: "Human",
    artist: "Rag'n Bone Man",
    filepath: "/songs/human.mp3",
    coverPath: "/cover/1.jpeg",
  },
  {
    songName: "Believer",
    artist: "Imagine Dragons",
    filepath: "/songs/believer.mp3",
    coverPath: "/cover/2.jpeg",
  },
  {
    songName: "With You",
    artist: "Dean Lewis",
    filepath: "/songs/withyou.mp3",
    coverPath: "/cover/3.jpeg",
  },
  {
    songName: "Jhol",
    artist: "Maanu",
    filepath: "/songs/Jhol.mp3",
    coverPath: "/cover/4.jpeg",
  },
  {
    songName: "Save Your Tears",
    artist: "The Weeknd ",
    filepath: "/songs/savethetears.mp3",
    coverPath: "/cover/5.jpeg",
  },
  {
    songName: "How do i say goodbye",
    artist: "Dean Lewis",
    filepath: "/songs/howdoisay.mp3",
    coverPath: "/cover/6.jpeg",
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  element.getElementsByClassName("artist")[0].innerText = songs[i].artist;
});

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
  }
});

audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
  });
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
  element.addEventListener("click", (e) => {
    makeAllPlays();

    songIndex = parseInt(e.target.id);
    e.target.classList.remove("fa-circle-play");
    e.target.classList.add("fa-circle-pause");
    audioElement.src = `songs/${songIndex + 0}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    masterSongArtist.innerText = songs[songIndex].artist;
    coverImage.src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
  });
});

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 5) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex + 0}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  masterSongArtist.innerText = songs[songIndex].artist;
  coverImage.src = songs[songIndex].coverPath;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex + 0}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  masterSongArtist.innerText = songs[songIndex].artist;
  coverImage.src = songs[songIndex].coverPath;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});
