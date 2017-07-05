
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

$('body').on('keypress', function(event) {
if (event.keyCode == 32)
 {
    toggleSong();
 }
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
