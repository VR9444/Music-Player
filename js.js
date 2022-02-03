const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const shuffle = document.getElementById('shuffle');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const lista = document.getElementById('lista');
const search = document.getElementById('song_search');
const volume_dugme = document.getElementById('volume');
const progress_volume_container = document.getElementById('progress_volume_container');
const progress_volume = document.getElementById('progress_volume');

getNames();



// Song titles
//const songs = ['hey','summer','ukulele'];
const songs = [];
var search_array=[];

//Keep track of song
let songIndex = 2;
var shuffleActive = false;

//Initially ;pad song details into DOM
loadSong(search_array[songIndex], songIndex);
//Update song details
function loadSong(song,id){
    title.innerText = song;
    audio.src = `./music/${song}.mp3`;
    var result = checkFileExist(`http://localhost/Music_Player/images/${song}.jpg`);
    if(result){
        cover.src = `./images/${song}.jpg`;
    }else{
        cover.src = "./images/default.png";
    }
    
}

function getNames(){
    $.ajax(
        'songNames.php',
        {
            success: function(data) {
                var res = JSON.parse(data);
                res.forEach(element => {
                    songs.push(element);
                    search_array.push(element);
                });
                populateList(songs);
            },
            error: function() {
              alert('There was some error performing the AJAX call!');
            }
         }
      );
}



function populateList(array_pesama){
    var id = 0;
    array_pesama.forEach(element => {
        var base = document.createElement('div');
        base.classList.add("item_liste");
        base.setAttribute('id',`${id}`);
        base.innerHTML+=`<span id=\"${id}\">${element}</span><hr>`;
        lista.append(base);
        id++;
        
    });
    }
    
function searchFunkcijaPart2(search_value){
    search_array=[];
    songs.forEach(element => {
        if(element.toLowerCase().includes(search_value.toLowerCase())){
            search_array.push(element);
        }
    });
    console.log(search_array);
    lista.innerHTML='';
    populateList(search_array);

}

 function searchFunkcija(e){
     if(e.keyCode === 13){
        searchFunkcijaPart2(search.value);
     }
 }
 function checkFileExist(urlToFile) {
     var xhr = new XMLHttpRequest();
     xhr.open('HEAD', urlToFile, false);
     xhr.send();
      
     if (xhr.status == "404") {
         return false;
     } else {
         return true;
     }
 }
function pouseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}
function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}
function updateProgress(e){
    const duration = e.srcElement.duration;
    const currentTime = e.srcElement.currentTime;
    const progressPercent = (currentTime/duration) *100;
    progress.style.width = `${progressPercent}%`;

}
function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX/width) *duration;
}

function updateProgressVolume(progress){
    procent = Math.ceil(progress*100);
    console.log(procent);
    progress_volume.querySelector('.progressed_volume').style.height = procent+"%";

}

function setProgressVolume(e){
    const height = this.clientHeight;
    const clickY = e.offsetY;

    audio.volume = (clickY/height) ;
    updateProgressVolume(clickY/height);
    console.log(clickY/height);
}

function shuffleFunction(){
    if(shuffle.classList.contains('shuffle_active')){
        shuffle.classList.remove('shuffle_active');
        shuffleActive = false;
    }else{
        shuffle.classList.add('shuffle_active');
        shuffleActive = true;
    }
}
function nextSong(){
    if(!shuffleActive){
        songIndex++;
        if(search_array[songIndex]==null){
            songIndex=0;
        }
    }else{
        songIndex = Math.floor(Math.random()*(songs.length-1));

    }
    
    loadSong(search_array[songIndex]);
    playSong();


}
function izaberiPesmu(e){
   const idPesme = e.target.id;
   songIndex= idPesme;
   loadSong(search_array[idPesme],idPesme);
   playSong();
}
//EVENT LISTENERS
playBtn.addEventListener('click',()=>{
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying){
        pouseSong();
    }else{
        playSong();
    }
})

prevBtn.addEventListener('click',()=>{
    songIndex--;
    if(songIndex == -1){
        songIndex = search_array.length-1;
    }
    pouseSong();
    loadSong(search_array[songIndex]);
    playSong();
})
nextBtn.addEventListener('click',nextSong)

audio.addEventListener('timeupdate',updateProgress);
//click on progress bar
progressContainer.addEventListener('click',setProgress);
//song ends
progress_volume.addEventListener('click',setProgressVolume);

audio.addEventListener('ended',nextSong);

shuffle.addEventListener('click',shuffleFunction);

lista.addEventListener('click',izaberiPesmu);

search.addEventListener('keyup', searchFunkcija);


volume_dugme.addEventListener('click',(e)=>{
    if(progress_volume_container.classList.contains('active')){
        progress_volume_container.classList.remove('active');
    }else{
    progress_volume_container.classList.add('active');
    }
})
