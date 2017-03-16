/* This file will just be a bunch of global variables that will be used around the program.

Stuff Like currency, score, items purchased flags etc */

var playerName = ""; 
var score = 0; 
var currency = 0;

//this value will be always equal to the camels left after each level 
//it is ONLY used for save files and score
var camelsLeft = 0;

//flags for weapons the player has unlocked
var hasGun = false; 

//call this function after each game level is finished
function updateScore(sum){
	score = score + sum;
}