/*
* set up different button linsteners
*/
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let volumeBar = document.querySelector('.volume_slider');
volumeBar.setAttribute('style','display:none');
let display_volume_bar = false;

let playList = document.querySelector('#playList');


let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let current_audio = document.createElement('audio');

/*
* Define the tracks that have to be played
* or set database query to load audio wit DB
*/

let audio_list = [
  {
    name: "i love my pakistan",
    artist: "Tauseed zaman",
    image: "https://image.shutterstock.com/image-vector/14th-august-independence-day-pakistan-600w-1995590159.jpg",
    path: "audio/i-love-my-pakistan.mp3"
  },
  {
    name: "Mera Pakistan",
    artist: "Tauseed zaman",
    image: "https://image.shutterstock.com/image-vector/illustration-holiday-14-august-day-600w-1434157925.jpg",
    path: "audio/mera-pakistan.mp3"
  },
  {
    name: "mee pakistan hoo",
    artist: "Tauseed zaman",
    image: "https://image.shutterstock.com/image-vector/illustration-holiday-14-august-day-600w-1434157943.jpg",
    path: "audio/my-pakistan-ho.mp3"
  },
  {
    name: "14'th Auguest Pakistan ",
    artist: "Tauseed zaman",
    image: "https://image.shutterstock.com/image-vector/14th-august-independence-day-pakistan-600w-1995590255.jpg",
    path: "audio/ddone-pakistan.mp3"
  },
  {
    name: "Mery watn ye aqqedaty ja  ",
    artist: "Tauseed zaman",
    image: "https://image.shutterstock.com/image-vector/illustration-background-pakistan-independence-day-600w-1143740321.jpg",
    path: "audio/mery-watn-ye-aqqedaty-jaa.mp3"
  },
  {
    name: "Too salamt watnn",
    artist: "Tauseed zaman",
    image: "https://image.freepik.com/free-vector/celebrating-pakistan-independence-day-with-typography_1142-4392.jpg",
    path: "audio/too-salamt-watn.mp3"
  },
  {
    name: "Sendhi baloch punjabi",
    artist: "Tauseed zaman",
    image: "https://img.freepik.com/free-vector/gradient-pakistan-day-illustration-with-minar-e-pakistan-monument-flag_23-2148850157.jpg?size=338&ext=jpg",
    path: "audio/pakistan-contenants.mp3"
  },
  {
    name: "Humm tery sapahhe hyy",
    artist: "Tauseed zaman",
    image: "https://image.freepik.com/free-vector/gradient-pakistan-day-illustration-with-building-flags_23-2148843412.jpg",
    path: "audio/humm-tery-sapahee-hyy.mp3"
  },
];

/* 
*select different background color 
*/
function random_bg_color() {
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";
  document.body.style.background = bgColor;
}

/*
* load song function
*/
function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  current_audio.src = audio_list[track_index].path;
  current_audio.load();

  track_art.style.backgroundImage = "url(" + audio_list[track_index].image + ")";
  track_name.textContent = audio_list[track_index].name;
  track_artist.textContent = audio_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + audio_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  current_audio.addEventListener("ended", nextTrack);
  random_bg_color();
}

// methud to reset range bar values
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

/*
* play and pause 
*/
function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}


/*
* play methud
*/
function playTrack() {
  current_audio.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  current_audio.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < audio_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = audio_list.length;
  loadTrack(track_index);
  playTrack();
}

/*
* seek to the  fix point of trak 
*/
function seekTo() {
  let seekto = current_audio.duration * (seek_slider.value / 100);
  current_audio.currentTime = seekto;
}

function setVolume() {
  current_audio.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(current_audio.duration)) {
    seekPosition = current_audio.currentTime * (100 / current_audio.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(current_audio.currentTime / 60);
    let currentSeconds = Math.floor(current_audio.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(current_audio.duration / 60);
    let durationSeconds = Math.floor(current_audio.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

function toggleVolumeBar() {
  if(display_volume_bar==false){
    volumeBar.setAttribute('style','display:block');
    display_volume_bar=true;
  }else{
    volumeBar.setAttribute('style','display:none');
    display_volume_bar=false;
  }
}

function load_audio_list() {
  audio_list.forEach((element, key) => {
    playList.innerHTML += `<li onclick=playThisTrik(${key}) title="click to play ${element.name}"><span class="playList-item-title">${element.name}</span></li>`;
  });
}

function playThisTrik(index) {
  loadTrack(index);
  playTrack();
}

load_audio_list();