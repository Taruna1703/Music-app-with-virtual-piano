# Music-app-with-virtual-piano
Installation
 
 Assuming audiosynth.js is in your current directory, import package using:
 <script src="audiosynth.js"></script>
 
 Usage
 
 audiosynth implements a singleton class, AudioSynth. By default, the global (window) variable Synth is the instance of the class.
 
 Any attempt to instantiate new AudioSynth object will only create references to the original object.
 i.e u can only initialize it once
 
 To use AudioSynth to generate .WAV files...
 
 Synth.generate(sound, note, octave, duration);
 /*
 	Will generate a base64-encoded dataURI wavefile (.WAV) containing your data.
 
 	sound
 		a numeric index or string referring to a sound profile (by id or name, respectively)
 	
 	note
  		the note you wish to play (A,B,C,D,E,F,G). Supports sharps (i.e. C#) but not flats.
	  	(Use the respective sharp!)
	
 	octave
 		the octave # of the note you wish to play
 		
 	duration
 		the duration (in seconds) of the note
 */
 You can play notes instantly using...
 
 /*
 	Same arguments as Synth.generate,
 	only this creates an HTML Audio element, plays it, and unloads it upon completion.
 */
 Synth.play(sound, note, octave, duration);
 
 You may also create individual instruments (objects that reference .generate and .play, bound to specific sounds).
 
 var piano = Synth.createInstrument('piano');
 piano.play('C', 4, 2); // plays C4 for 2s using the 'piano' sound profile
 this is what i basically used
 u can also generate sounds of
 piano 
 organ 
 acoustic
 edm 
 but in the file i made ive only used piano sounds  
 
 Credits and Acknowledgements
  Special thanks to keithwhor (https://github.com/keithwhor/audiosynth)
 
  
  Further Reading
  
  https://github.com/keithwhor/audiosynth
  .WAV Audio Files
 
 http://en.wikipedia.org/wiki/.WAV_file
 
 Sound Synthesis
 
 http://www.acoustics.salford.ac.uk/acoustics_info/sound_synthesis/
 
 "acoustic" sound profile generated using Karplus-Strong String Synthesis:
 
 http://en.wikipedia.org/wiki/Karplus%E2%80%93Strong_string_synthesis http://music.columbia.edu/cmc/musicandcomputers/chapter4/04_09.php
 
 
 Contact
 For any queries feel free to email me at tarunajindal1998 at gmail dot com.
