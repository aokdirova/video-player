// Play & Pause ----------------------------------- //
function showPlayIcon() {
  playBtn.className = "fas fa-play";
  playBtn.setAttribute("title", "Play");
}

function showPauseIcon() {
  playBtn.className = "fas fa-pause";
  playBtn.setAttribute("title", "Pause");
}

function togglePlay() {
  if (videoEl.paused) {
    videoEl.play();
    showPauseIcon();
  } else {
    videoEl.pause();
    showPlayIcon();
  }
}

// Progress Bar ---------------------------------- //

//Calculate display format-------------------------//
function displayTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  minutes = minutes > 9 ? minutes : `0${minutes}`;
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

// Update Progress bar as video plays ------------//

function updateProgress() {
  progressBar.style.width = `${
    (videoEl.currentTime / videoEl.duration) * 100
  }%`;
  timeElapsed.textContent = `${displayTime(videoEl.currentTime)} /`;
  timeDuration.textContent = `${displayTime(videoEl.duration)}`;
}

//Click to seek within the video ---------------//

function setProgress(event) {
  const newTime = event.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  videoEl.currentTime = newTime * videoEl.duration;
}

// Volume Controls --------------------------- //
let lastVolume = 1;

//Volume Bar

function changeVolume(event) {
  let volume = event.offsetX / volumeRange.offsetWidth;
  //Rounding volume

  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }

  volumeBar.style.width = `${volume * 100}%`;
  videoEl.volume = volume;
  //Change icon depending on volume
  if (volume > 0.7) {
    volumeIcon.className = "fas fa-volume-up";
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.className = "fas fa-volume-down";
  } else if (volume === 0) {
    volumeIcon.className = "fas fa-volume-off";
  }

  lastVolume = volume;
}

//Mute/Unmute

function toggleMute() {
  volumeIcon.className = "";
  if (videoEl.volume) {
    lastVolume = videoEl.volume;
    videoEl.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.className = "fas fa-volume-mute";
    volumeIcon.setAttribute("title", "Muted");
  } else {
    videoEl.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    volumeIcon.className = "fas fa-volume-up";
    volumeIcon.setAttribute("title", "Unmuted");
  }
}

// Change Playback Speed -------------------- //

function changeSpeed(event) {
  videoEl.playbackRate = event.target.value;
}

// Fullscreen ------------------------------- //
/* Here not using navigation.userAgent because it is better to check for a feature of the used browser rather than for a browser itself */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen();
  }
  videoEl.classList.add("video-fullscreen");
}

//Close fullscreen //
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
  videoEl.classList.remove("video-fullscreen");
}

let fullscreen = false;

//Toggle Fullscreen Mode ---------------------------//
function toggleFullscreen() {
  !fullscreen ? openFullscreen(player) : closeFullscreen();
  fullscreen = !fullscreen;
}

//Event Listeners ---------------------------//
playBtn.addEventListener("click", togglePlay);

videoEl.addEventListener("click", togglePlay);
videoEl.addEventListener("ended", showPlayIcon);
videoEl.addEventListener("timeupdate", updateProgress);
videoEl.addEventListener("canplay", updateProgress);

progressRange.addEventListener("click", setProgress);

volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);

playerSpeed.addEventListener("click", changeSpeed);

fullscreenBtn.addEventListener("click", toggleFullscreen);
