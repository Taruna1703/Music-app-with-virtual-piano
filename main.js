
var currentSongNumber = 1;
var willLoop = 0;
var willShuffle = 0;
var pianoclicked=0;
var taruna=-0;


function toggleSong() {
var song = document.querySelector('audio');
   if(song.paused == true) {
  console.log('Playing');
  $('.play-icon').removeClass('fa-play').addClass('fa-pause');
  song.play();
  }
   else {
  console.log('Pausing');
  $('.play-icon').removeClass('fa-pause').addClass('fa-play');
  song.pause();
   }
 }
 /*
selected play-icon when clicked on it
we ask is song is paused if it's true
then we remove class play n add class pause to play-icon
and play song
if it's not true
then we remove class pause n add class play to play-icon
and pause song
*/
function fancyTimeFormat(time)
{
// Hours, minutes and seconds
var hrs = ~~(time / 3600);
var mins = ~~((time % 3600) / 60);
var secs = time % 60;

// Output like "1:01" or "4:03:59" or "123:03:59"
var ret = "";

if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
}

ret += "" + mins + ":" + (secs < 10 ? "0" : "");
ret += "" + secs;
return ret;
}
function updateCurrentTime() {
var song = document.querySelector('audio');
var currentTime = Math.floor(song.currentTime);
currentTime = fancyTimeFormat(currentTime);
var duration = Math.floor(song.duration);
duration = fancyTimeFormat(duration)
$('.time-elapsed').text(currentTime);
$('.song-duration').text(duration);
}
/*

in a variable we selected the song
in variable currentTime we removed the decimals of song currentTime
we pass currentTime through fancyTimeFormat fxn the again put
the value back in currentTime variable
same happens with duration

*/

function changeCurrentSongDetails(songObj) {
    $('.current-song-image').attr('src','img/' + songObj.image)
    $('.current-song-name').text(songObj.name)
    $('.current-song-album').text(songObj.album)
}

function addSongNameClickEvent(songObj,position) {
var id = '#song' + position;
$(id).click(function() {
var audio = document.querySelector('audio');
var currentSong = audio.src;
var songName = songObj.fileName;
if(currentSong.search(songName) != -1)
{
toggleSong();
}
else {
audio.src = songName;
toggleSong();
changeCurrentSongDetails(songObj);
}
});
}
/*

select id song1 on click execute the fxn
in variable audio we selected the audio
in variable currentSong we put the src of the audio
if in current song file name[0] is present it will give the distance in string
it will not b -1 so toggleSong will b executed
otherwise currentSong will b assinged new song

*/



var songs = [{
        'name': 'Badri Ki Dulhania (Title Track)',
        'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
        'album': 'Badrinath ki Dulhania',
        'duration': '2:56',
       'fileName': 'song1.mp3',
       'image': 'song1.jpg'
    },
    {
        'name': 'Humma Song',
        'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
        'album': 'Ok Jaanu',
        'duration': '3:15',
        'fileName': 'song2.mp3',
        'image': 'song2.jpg'
    },
    {
        'name': 'Nashe Si Chadh Gayi',
        'artist': 'Arijit Singh',
        'album': 'Befikre',
        'duration': '2:34',
        'fileName': 'song3.mp3',
        'image': 'song3.jpg'
    },
    {
        'name': 'The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '2:29',
        'fileName': 'song4.mp3',
        'image': 'song4.jpg'
    }]



window.onload = function() {

       changeCurrentSongDetails(songs[0]);
    for(var i =0; i < songs.length;i++) {
        var obj = songs[i];
        var name = '#song' + (i+1);
        var song = $(name);
        song.find('.song-name').text(obj.name);
        song.find('.song-artist').text(obj.artist);
        song.find('.song-album').text(obj.album);
        song.find('.song-length').text(obj.duration);
        addSongNameClickEvent(obj,i+1)
    }
updateCurrentTime();
setInterval(function() {
updateCurrentTime();
},1000);

$('#songs').DataTable({
        paging: false
    });
}
$('.welcome-screen button').on('click', function() {
    var name = $('#name-input').val();
    if (name.length > 2) {
        var message = "Welcome, " + name;
        $('.main .user-name').text(message);
        /* Humne jQuery ko kaha ki koi tag jiski class
        'main' hai uske andar ek <h1> tag dhoondo
        Phir uske text ke andar jo bhi message
         variable ki value hai, vo daaldo */
        $('.welcome-screen').addClass('hidden');
        $('.main').removeClass('hidden');
    } else {
        $('#name-input').addClass('error');
    }
});

/*we selected welcome screen button
uspe click karne p variable name mein jo
value store hui hai vo next screen mein
welcome msg mein use ho kar display ho jaye g
through .text
and on click welcome screen class mein hidden class add
ho jaye g n main mein s hidden remove ho jaye g*/


$('.play-icon').on('click', function() {
  toggleSong();
});

$('body').on('keypress',function(event) {
    var target = event.target;
    if (event.keyCode == 32 && target.tagName !='INPUT')
    {
        toggleSong();
    }
});
function randomExcluded(min, max, excluded) {
    var n = Math.floor(Math.random() * (max-min) + min);
    if (n >= excluded) n++;
    return n;
}
function timeJump() {
    var song = document.querySelector('audio')
    song.currentTime = song.duration - 5;
}
$('.fa-repeat').on('click',function() {
    $('.fa-repeat').toggleClass('disabled')
    willLoop = 1 - willLoop;
});
$('.fa-random').on('click',function() {
    $('.fa-random').toggleClass('disabled')
    willShuffle = 1 - willShuffle;
});

// for (var i = 0; i < fileNames.length ; i++) {
// addSongNameClickEvent(fileNames[i],i+1)
// }
/*

var i=0 then check is i< fileNames.length if yes then execute
addSongNameClickEvent(0,1)
then go to i++ which means new i=1 and process is repeated until condition i<4
is true

*/
$('audio').on('ended',function() {
    var audio = document.querySelector('audio');
    if (willShuffle == 1) {
        var nextSongNumber = randomExcluded(1,4,currentSongNumber); // Calling our function from Stackoverflow
        var nextSongObj = songs[nextSongNumber-1];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = nextSongNumber;
    }
    else if(currentSongNumber < 4) {
        var nextSongObj = songs[currentSongNumber];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = currentSongNumber + 1;
    }
    else if(willLoop == 1) {
        var nextSongObj = songs[0];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber =  1;
    }
    else {
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        audio.currentTime = 0;
    }
});


 $(document).ready(function(){
     var piano = Synth.createInstrument('piano');
  $('.fa-braille').on('click',function() {

    $('.content').toggleClass('hidden');
    $('.piano').toggleClass('hidden');
      taruna = 1 - taruna;
  });


$("#key_1").on('click',function(){
   piano.play('C',3,2);
});
$('body').on('keypress',function(event){
  if (event.keyCode == 81 || event.keyCode == 113 && taruna==1)
     { piano.play('C',3,2);
      console.log('I play C');
  }

 });

$("#key_2").on('click',function(){
   piano.play('D',3,2);
});

$('body').on('keypress',function(event){
 if (event.keyCode == 87 || event.keyCode == 119 && taruna==1)
    { piano.play('D',3,2);
      console.log('I play D');
 }
 console.log(event.keyCode);
});

$("#key_3").on('click',function(){
   piano.play('E',3,2);
});
$('body').on('keypress',function(event){
 if ((event.keyCode == 69 || event.keyCode == 101) && taruna==1)
    { piano.play('E',3,2);
 }
});

$("#key_4").on('click',function(){
   piano.play('F',3,2);
});
$('body').on('keypress',function(event){
 if ((event.keyCode == 82 || event.keyCode ==114) && taruna==1)
    { piano.play('F',3,2);
 }
});

$("#key_5").on('click',function(){
   piano.play('G',3,2);
});
$('body').on('keypress',function(event){
 if ((event.keyCode == 84 || event.keyCode ==116) && taruna==1)
    { piano.play('G',3,2);
 }
});

$("#key_6").on('click',function(){
  piano.play('A',3,2);
});
$('body').on('keypress',function(event){
 if ((event.keyCode == 89 || event.keyCode ==121) && taruna==1)
    { piano.play('A',3,2);
 }
});

$("#key_7").on('click',function(){
 piano.play('B',3,2);
});
$('body').on('keypress',function(event){
 if ((event.keyCode == 85 || event.keyCode ==117) && taruna==1)
    { piano.play('B',3,2);
 }
});

$("#key_8").on('click',function(){
 piano.play('C',4,2);
});
$('body').on('keypress',function(event){
 if ((event.keyCode == 73 || event.keyCode ==105) && taruna==1)
    { piano.play('C',4,2);
 }
});

$("#key_9").on('click',function(){
 piano.play('D',4,2);
});
$('body').on('keypress',function(event){
 if ((event.keyCode == 79 || event.keyCode ==111) && taruna==1)
    { piano.play('D',4,2);
 }
});

$("#key_10").on('click',function(){
 piano.play('E',4,2);
});
$('body').on('keypress',function(event){
 if ((event.keyCode == 80 || event.keyCode ==112) && taruna==1)
    { piano.play('E',4,2);
 }
});

$("#key_11").on('click',function(){
 piano.play('F',4,2);
});
$('body').on('keypress',function(event){
 if ((event.keyCode == 91 || event.keyCode ==123) && taruna==1)
    { piano.play('F',4,2);
 }
});

$("#key_12").on('click',function(){
 piano.play('G',4,2);
});
$('body').on('keypress',function(event){
 if ((event.keyCode == 93 || event.keyCode == 125) && taruna==1)
    { piano.play('G',4,2);
 }
});

$("#key_13").on('click',function(){
 piano.play('A',4,2);
});
$('body').on('keypress',function(event){
 if ((event.keyCode == 90 || event.keyCode ==122) && taruna==1)
    { piano.play('A',4,2);
 }
});

$("#key_14").on('click',function(){
 piano.play('B',4,2);
});
$('body').on('keypress',function(event){
 if ((event.keyCode == 88 || event.keyCode ==120) && taruna==1)
    { piano.play('B',4,2);
 }
});

$("#key_15").on('click',function(){
 piano.play('C',5,2);
});
$('body').on('keypress',function(event){
 if ((event.keyCode == 67 || event.keyCode ==99)&& taruna==1)
    { piano.play('C',5,2);
 }
});

$("#key_16").on('click',function(){
 piano.play('D',5,2);
});
$('body').on('keypress',function(event){
 if ((event.keyCode == 86 || event.keyCode ==118) && taruna==1)
    { piano.play('D',5,2);
 }
});

$("#key_17").on('click',function(){
 piano.play('E',5,2);
});
$('body').on('keypress',function(event){
 if ((event.keyCode == 66 || event.keyCode ==98) && taruna==1)
    { piano.play('E',5,2);
 }
});

$("#key_18").on('click',function(){
 piano.play('F',5,2);
});
$('body').on('keypress',function(event){
 if ((event.keyCode == 78 || event.keyCode ==110)&& taruna==1)
    { piano.play('F',5,2);
 }
});

$("#key_19").on('click',function(){
 piano.play('G',5,2);
});
$('body').on('keypress',function(event){
 if ((event.keyCode == 77 || event.keyCode ==109) && taruna==1)
    { piano.play('G',5,2);
 }
});

$("#key_20").on('click',function(){
 piano.play('A',5,2);
});
$('body').on('keypress',function(event){
 if (event.keyCode == 44 && taruna==1)
    { piano.play('A',5,2);
 }
});

$("#key_21").on('click',function(){
 piano.play('B',5,2);
});
$('body').on('keypress',function(event){
 if (event.keyCode == 46 && taruna==1)
    { piano.play('B',5,2);
 }
});

$("#key-1").on('click',function(){
 piano.play('C#',3,2);
});
$('body').on('keypress',function(event){
 if (event.keyCode == 50 && taruna==1)
    { piano.play('C#',3,2);
 }
});

$("#key-2").on('click',function(){
 piano.play('D#',3,2);
});
$('body').on('keypress',function(event){
 if (event.keyCode == 51 && taruna==1)
    { piano.play('D#',3,2);
 }
});

$("#key-3").on('click',function(){
 piano.play('F#',3,2);
});
$('body').on('keypress',function(event){
 if (event.keyCode == 53 && taruna==1)
    { piano.play('F#',3,2);
 }
});

$("#key-4").on('click',function(){
 piano.play('G#',3,2);
});
$('body').on('keypress',function(event){
 if (event.keyCode == 54 && taruna==1)
    { piano.play('G#',3,2);
 }
});

$("#key-5").on('click',function(){
 piano.play('A#',3,2);
});
$('body').on('keypress',function(event){
 if (event.keyCode == 55 && taruna==1)
    { piano.play('A#',3,2);
 }
});

$("#key-6").on('click',function(){
 piano.play('C#',4,2);
});
$('body').on('keypress',function(event){
 if (event.keyCode == 57 && taruna==1)
    { piano.play('C#',4,2);
 }
});

$("#key-7").on('click',function(){
 piano.play('D#',4,2);
});
$('body').on('keypress',function(event){
 if (event.keyCode == 48 && taruna==1)
    { piano.play('D#',4,2);
 }
});
$("#key-8").on('click',function(){

 piano.play('F#',4,2);
});
$('body').on('keypress',function(event){
 if (event.keyCode == 61 && taruna==1)
    { piano.play('F#',4,2);
 }
});

$("#key-9").on('click',function(){
 piano.play('G#',4,2);
});
$('body').on('keypress',function(event){
 if ((event.keyCode == 65 || event.keyCode == 97) && taruna==1)
    { piano.play('G#',4,2);
 }
});

$("#key-10").on('click',function(){
 piano.play('A#',4,2);
});
$('body').on('keypress',function(event){
 if ((event.keyCode == 83 || event.keyCode ==115) && taruna==1)
    { piano.play('A#',4,2);
 }
});

$("#key-11").on('click',function(){
 piano.play('C#',5,2);
});
$('body').on('keypress',function(event){
 if ((event.keyCode == 70 || event.keyCode ==102) && taruna==1)
    { piano.play('C#',5,2);
 }
});

$("#key-12").on('click',function(){
 piano.play('D#',5,2);
});
$('body').on('keypress',function(event){
 if ((event.keyCode == 71 || event.keyCode ==103) && taruna==1)
    { piano.play('D#',5,2);
 }
});

$("#key-13").on('click',function(){
 piano.play('F#',5,2);
});
$('body').on('keypress',function(event){
 if ((event.keyCode == 74 || event.keyCode ==106) && taruna==1)
    { piano.play('F#',5,2);
 }
});

$("#key-14").on('click',function(){
 piano.play('G#',5,2);
});
$('body').on('keypress',function(event){
 if ((event.keyCode == 75 ||event.keyCode ==107) && taruna==1)
    { piano.play('G#',5,2);
 }
});

$("#key-15").on('click',function(){
 piano.play('A#',5,2);
});
$('body').on('keypress',function(event){
 if ((event.keyCode == 76 || event.keyCode ==108) && taruna==1)
    { piano.play('A#',5,2);
 }
});


});
