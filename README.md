# CS4483 Game - Attack of the Bubbles

## Game Design Documentation + Drive
	https://drive.google.com/drive/folders/0B0QVWVNDpyXyVFYtQWdxTUxRcGs?usp=sharing

## How to Play The Game
	
	-download and unzip the game
	-Open a terminal in the root of this and
	write in command line for depending on what language you have:
	
		python -m http.server (On Mac: python3 -m http.server)
		ruby -run -e httpd . -p 8000
		php -S localhost:8000

	then, go to your browser and type:

	localhost:8000 

	to view the game

	to close the local web server, just close the process (in Windows, crtl-c in the commmand line)

	You can always play without audio by just opening index.html, but we don't reccommend this. 

Note: you can edit freely the source files, and see the changes when you refresh in browser while the web server is open (you don't need to restart it). Also, when you run the game more than a few times, assets will be stored in the cache. You must clear the cache in your browser to see changes to assets you changed. Or you can always run in incognito! 

## Who Did What
	Abdul Alhumidan
	Ather Qureshi:
		- Menu Systems 
		- UI, Graphics and Look and Feel
		- Collisions/Physics
		- Basic game implementation
		- Pause Menu
		- Saving/Loading Data
	Bowen Jiang
	Sherry Chen: 
		- Bubble AI
		- Companion AI
		- Notification UI
		- Store items UI
		- Shooting mechanism
		- Game restructure

## Credits

	-All not in-house assets used in this project are royalty free and free to use for 
	both commercial and non-comercial projects 
	-Shop Music - Marimba Boy - DL sounds
	- Dog barking sfx: http://www.flashkit.com/soundfx/Creatures/Pets/Dog_Bark-SoundSca-9057/index.php
	- Gun shot sfx: http://www.flashkit.com/soundfx/Cartoon/Shots/Uzi-Drug_Dea-8374/index.php
	
	-Background for MainMenu, Load, Credits, GameOver - sylviacopol0
		https://pixabay.com/en/desert-sunset-camel-sand-695079/
	-armourHouse - Ciker-Free-Vector-Images 
		https://pixabay.com/en/building-map-blacksmith-game-48632/
	-ak47
		https://pixabay.com/en/ak-47-weapons-automatic-firearms-1986226/
	-handgun
		https://pixabay.com/en/gun-weapon-pistol-handgun-army-161223/
	-superdog
		https://pixabay.com/en/dog-drawing-sketch-breed-white-163658/