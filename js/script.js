const menuBtn = document.querySelector('.menu__btn')
let menu = document.querySelector('.menu')
menuBtn.addEventListener('click', () => {
    let menuActive = menu.classList.contains('menu--active')
    // console.log(menuActive)
    if(!menuActive) { 
        menu.classList.add('menu--active')
        menuBtn.classList.add('menu__btn--active')
        menuBtn.classList.remove('menu__btn--false')
    } else {
        menu.classList.remove('menu--active')
        menuBtn.classList.add('menu__btn--false')
        menuBtn.classList.remove('menu__btn--active')
    }
})

const video = document.querySelector('.video'),
      playerStart = document.querySelector('.player__start'),
      progressContainer = document.querySelector('.progress__container'),
      progress = document.querySelector('.progress'),
      playerTime = document.querySelector('.time'),
      timeCount = document.querySelector('.time__count'),
    //audio
      audio = document.querySelector('.audio'),
      audioProgressContainer = document.querySelector('.progress__container-audio'),
      audioProgress = document.querySelector('.progress__audio'),
      audioTimeContainer = document.querySelector('.audio__time-container'),
      audioTime = document.querySelector('.audio__time'),
      audioCount = document.querySelector('.audio__time-count'),
      audioStart = document.querySelector('.audio__play'),
      imageTrack = document.querySelector('.tracks__image'),
      progressAudioContainer = document.querySelector('.progress__container-audio')
    //   tracksItemText = document.querySelectorAll('.tracks__item-text')
    
// progressBar
video.ontimeupdate = (e) => {
    const { duration, currentTime } = e.srcElement,
        progressPercent = (currentTime / duration) * 100
    progress.style.width = progressPercent + '%' 
    let minutes = Math.floor(video.currentTime / 60),
        seconds = Math.floor(video.currentTime % 60)
    if(minutes < 10) { minutes = '0' + String(minutes) }
    if(seconds < 10) { seconds = '0' + String(seconds) }
    playerTime.innerHTML = minutes + ":" + seconds
    let timeCountMinutes = Math.floor(video.duration / 60),
        timeCountSeconds = Math.floor(video.duration % 60)
        if(timeCountMinutes < 10) {timeCountMinutes = '0' + String(timeCountMinutes)}
        if(timeCountSeconds < 10) {timeCountSeconds = '0' + ':' + String(timeCountSeconds)}
    timeCount.innerHTML = 
        timeCountMinutes + ":" + timeCountSeconds 
}   

// progressClick
progressContainer.addEventListener('click', function (e) {
    const width = this.clientWidth,
          clickX = e.offsetX,
          duration = video.duration 
    video.currentTime = (clickX / width) * duration
})

// play
function videoPlay() {
    video.classList.add('video--active')
    video.play()
}

function videoPause() {
    video.classList.remove('video--active')
    video.pause()
}

playerStart.addEventListener('click', () => {
    const isPlaying = video.classList.contains('video--active')
    if(isPlaying) {
        videoPause()
    } else {
        videoPlay()
    }
})

audio.ontimeupdate = (e) => {
    const { duration, currentTime } = e.srcElement,
        progressPercent = (currentTime / duration) * 100
        audioProgress.style.width = progressPercent + '%' 
    let minutes = Math.floor(audio.currentTime / 60),
        seconds = Math.floor(audio.currentTime % 60)
    if(minutes < 10) { minutes = '0' + String(minutes) }
    if(seconds < 10) { seconds = '0' + String(seconds) }
    audioTime.innerHTML = minutes + ":" + seconds
    let timeCountMinutes = Math.floor(audio.duration / 60),
        timeCountSeconds = Math.floor(audio.duration % 60)
        if(timeCountMinutes < 10) {timeCountMinutes = '0' + String(timeCountMinutes)}
        if(timeCountSeconds < 10) {timeCountSeconds = '0' + ':' + String(timeCountSeconds)}
        audioCount.innerHTML = 
        timeCountMinutes + ":" + timeCountSeconds 
}   

// progressAudioClick
progressAudioContainer.addEventListener('click', function (e) {
    const width = this.clientWidth,
          clickX = e.offsetX,
          duration = audio.duration 
    audio.currentTime = (clickX / width) * duration
})

function audioStartMusic() {
    imageTrack.classList.add('tracks__image--active')
    audio.play()
}

function audioPauseMusic() {
    imageTrack.classList.remove('tracks__image--active')
    audio.pause()
}

audioStart.addEventListener('click', function(e) {
    let isImageTrack = imageTrack.classList.contains('tracks__image--active')
    if(isImageTrack) { 
        audioPauseMusic()
    } else {
        audioStartMusic()
    }
})

let tracksItemBtn = document.querySelectorAll('.tracks__item-text')
tracksItemBtn.forEach(e => e.addEventListener('click', () => {
    document.querySelectorAll('.tracks__item--active').forEach(e => e.classList.remove('tracks__item--active'))
    e.classList.add('tracks__item--active')
    audio.src = e.dataset.url
    audio.duration = 0
    audioStartMusic()
}))