console.log("hello")
let songIndex = 0;
let audioElement = new Audio("song/1.mp3")
let songlist = Array.from(document.getElementsByClassName("songlist"))
let masterplay = document.getElementById("masterplay")
let gif = document.getElementById("gif")
let pbar = document.getElementById("pbar")
let songimg = document.getElementsByClassName("songimg")
let songinfo = document.getElementsByClassName("songInfo")
let mastersong = document.getElementById('mastersong')
let btn = Array.from( document.getElementsByClassName('btn'))

let songs = [
    { songName: "kash tum ho", filePath: "song/1.mp3", coverPath: "cover/1.jfif" },
    { songName: "a sanam ho", filePath: "song/2.mp3", coverPath: "cover/2.jfif" },
    { songName: "tune pagal h kiya", filePath: "song/3.mp3", coverPath: "cover/3.jfif" },
    { songName: "dilliwali", filePath: "song/4.mp3", coverPath: "cover/4.jfif" },
    { songName: "nananan", filePath: "song/5.mp3", coverPath: "cover/5.jfif" },
    { songName: "kuch hum kahe", filePath: "song/6.mp3", coverPath: "cover/6.jfif" },
    { songName: "kuch tum kaho", filePath: "song/7.mp3", coverPath: "cover/7.jfif" },

]

songlist.forEach((element, i) => {
    element.getElementsByClassName("songimg")[0].src = songs[i].coverPath
    element.getElementsByClassName("songPlay")[0].innerText = songs[i].songName
})


masterplay.addEventListener('click', () => {
    console.log("masterplay")
    
    if (audioElement.paused || audioElement.currentTime <= 0) {
       
       
        Array.from(document.getElementsByClassName('sideplaybtn')).forEach((element) => {
          if (element.currentTime == 0){
              element.classList.add("fa-play")
              element.classList.remove("fa-pause")
          } else {
            //element.classList.remove("fa-play")
            //element.classList.add("fa-pause")
          }
        });
          
     
        audioElement.play();
        gif.style.opacity = 1;
        masterplay.classList.add("fa-pause")
        masterplay.classList.remove("fa-play")
        
    
        
    } else {
        Array.from(document.getElementsByClassName('sideplaybtn')).forEach((element) => {
            if (element.currentTime == 0) {
                element.classList.remove("fa-play")
                element.classList.add("fa-pause")
            } else {
             // element.classList.remove("fa-pause")
              //element.classList.add("fa-play")
            }
          });
        masterplay.classList.remove("fa-pause")
        masterplay.classList.add("fa-play")
        audioElement.pause();
        gif.style.opacity = 0;
    }
})



audioElement.addEventListener("timeupdate", () => {

    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    pbar.value = progress
})

pbar.addEventListener("change", () => {
    audioElement.currentTime = pbar.value * audioElement.duration / 100
})


let makeallplay = () => {
    Array.from(document.getElementsByClassName('sideplaybtn')) .forEach(element => {
        element.classList.add("fa-play")
        element.classList.remove('fa-pause')
        
    })
}


Array.from(document.getElementsByClassName('sideplaybtn')) .forEach(element => {
    // console.log(element)
    element.addEventListener('click', (e) => {  
    if (audioElement.paused || audioElement.currentTime<=0) {
        makeallplay();
        songIndex = parseInt(e.target.id)
        e.target.classList.add("fa-pause")
        e.target.classList.remove("fa-play")
        audioElement.src = `song/${songIndex}.mp3`
        mastersong.innerText = songs[songIndex-1].songName
        audioElement.play()
        audioElement.currentTime = 0;
        masterplay.classList.add("fa-pause")
        masterplay.classList.remove("fa-play")
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        e.target.classList.add("fa-play")
        e.target.classList.remove("fa-pause")
        masterplay.classList.add("fa-play")
        masterplay.classList.remove("fa-pause")
        gif.style.opacity = 0;
    }
       

    })
})

document.getElementById('forward').addEventListener('click', () => {
    if (songIndex >= 6) {
        songIndex = 0
    } else {
        songIndex += 1
    }
    audioElement.src = `song/${songIndex}.mp3`
    mastersong.innerText = songs[songIndex].songName
    audioElement.play()
    audioElement.currentTime = 0;
    masterplay.classList.add("fa-pause")
    masterplay.classList.remove("fa-play")
    gif.style.opacity = 1;

})
document.getElementById('backward').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    } else {
        songIndex -= 1
    }
    audioElement.src = `song/${songIndex}.mp3`
    mastersong.innerText = songs[songIndex].songName
    audioElement.play()
    audioElement.currentTime = 0;
    masterplay.classList.add("fa-pause")
    masterplay.classList.remove("fa-play")
    gif.style.opacity = 1;
    
})

