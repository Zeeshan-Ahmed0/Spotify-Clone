let songsList = {
    "Alag asman": "Anuv Jain",
    "Antariksh": "Anuv Jain",
    "Gul": "Anuv Jain",
    "Husn": "Anuv Jain",
    "Ba khuda tum hi ho": "Atif Aslam",
    "Baaton ko teri": "Arijit Singh",
    "Humdard": "Arijit Singh",
    "Janam janam": "Arijit Singh",
    "Khairyat": "Arijit Singh",
    "Naina": "Arijit Singh",
    "Pal kesa pal": "Arijit Singh",
    "I'm on my way": "Alan Walker",
    "Ignite": "Alan Walker",
    "Who I am": "Alan Walker",
    "Mashup": "Alan Walker"
}
let artistImages = {
    "Anuv Jain" : "anuv.jpeg",
    "Atif Aslam" : "atif.jpeg",
    "Arijit Singh" : "arjit.jpeg",
    "Alan Walker" : "alan.jpeg"
}

let isPlaying = false;
let shuffle = false;
let currentSongIndex = 0;
let songNames = Object.keys(songsList);
let audio = new Audio('Songs/' + songNames[currentSongIndex] + '.mp3');
let sound = false;
let songTitle = songNames[currentSongIndex]
let artist = songsList[songTitle]
let progressBar = document.querySelector(".progressBar")

function getRandomSongs() {
    let randomIndex = Math.floor(Math.random() * songNames.length)
    while (randomIndex === currentSongIndex){
        randomIndex = Math.floor(Math.random() * songNames.length)
    }
    currentSongIndex = randomIndex
    return ("Songs/" + songNames[currentSongIndex] + ".mp3");
}

function changeSongs(direction){
    audio.pause()
    if (shuffle){
        audio.src = getRandomSongs()
    }
    else{
        if(direction === "next"){
        currentSongIndex = (currentSongIndex + 1) % songNames.length;
        }
    else if(direction=== "previous"){
            currentSongIndex = (currentSongIndex - 1 + songNames.length) % songNames.length;
        }
        audio.src = ('Songs/' + songNames[currentSongIndex] + '.mp3');
    }
    changeSongName();
    changeImage();
    audio.play()
    isPlaying = true 
    const playicon = document.querySelector(".plays").firstElementChild;
    const pauseicon = document.querySelector(".plays").lastElementChild;
    playicon.style.display = "none";
    pauseicon.style.display = "inline";
}

function changeSongName(){
    songTitle = songNames[currentSongIndex]
    document.querySelector(".song-name").textContent = songTitle
    artist = songsList[songTitle]
    document.querySelector(".artist-name").textContent = artist
}

function changeImage(){
    let imageContainer= document.querySelector(".artist-image")
    imageContainer.src=artistImages[artist]
}

function formatTime(seconds){
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`
}

document.querySelector('.plays').addEventListener('click', function () {
    const playicon = document.querySelector(".plays").firstElementChild
    const pauseicon = document.querySelector(".plays").lastElementChild
    if (isPlaying) {
        audio.pause()
        pauseicon.style.display = "none";
        playicon.style.display = "inline";
        isPlaying = false;
    } else {
        changeSongName()
        changeImage()
        audio.play()
        playicon.style.display = "none";
        pauseicon.style.display = "inline";
        isPlaying = true;
    }
});
document.querySelector('.shuffle').addEventListener('click', function () {
    this.classList.toggle('active');
    shuffle = !shuffle;
});
document.querySelector('.next').addEventListener('click', function () {
    changeSongs("next")
});
document.querySelector('.previous').addEventListener('click', function () {
    changeSongs("previous")
});

document.querySelector('.fa-volume-high').addEventListener('click', function () {
    let soundParent = document.querySelector(".volume")
    soundParent.classList.toggle('active');
    const volumeBar = document.querySelector(".volume-slider")
    if (sound){
        volumeBar.style.display = "none";
        sound = false
    }else if(sound===false){
        volumeBar.style.display = "inline";
        sound = true
    }
});

document.querySelector(".volume-slider").addEventListener("input", function(){
    audio.volume = this.value
})

audio.addEventListener("timeupdate", function(){
    let currentTime = audio.currentTime
    let duration = audio.duration
    let currentTimeElement = document.querySelector(".current-time")
    const percentage = (audio.currentTime / duration) * 100;
    progressBar.value = percentage;
    currentTimeElement.innerHTML = formatTime(currentTime)
    if(currentTime === duration){
        changeSongs("next")
    }
})
progressBar.addEventListener('click', (event) => {
    const rect = progressBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const newTime = (offsetX / progressBar.offsetWidth) * audio.duration;
    audio.currentTime = newTime;
});
audio.addEventListener("loadedmetadata", function(){
    let totalTimeElement = document.querySelector(".total-time")
    totalTimeElement.innerHTML = formatTime(audio.duration)
})
document.querySelector(".artist").addEventListener("click", function(){
    for (const key in songsList) {
        if (Object.prototype.hasOwnProperty.call(songsList, key)) {
            const element = songsList[key]

        }
    }
})
document.querySelector(".hamburger i").addEventListener("click", function(){
    document.querySelector(".left").classList.add("side-bar");
})
document.querySelector(".close i").addEventListener("click", function(){
    document.querySelector(".left").classList.remove("side-bar")
})
