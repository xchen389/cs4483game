//Global Variables that persist around the program
//that will be saved and loaded 

//options
var playerName;
var musicVolume = 0.5;
var fxVolume = 0.5;

//Information about game
var currentDay;
var camelsLeft;
var totalScore;
var currCredits;

///Weapon flags


var options = {

	preload: function(){
		this.load.image('optionsScreen','./assets/images/backgrounds/options_screen.png');
		this.load.image('returnButton','./assets/images/buttons/return_button.png');
	},

	create: function(){
		this.add.tileSprite(0,0, 1280, 800, 'optionsScreen');
		//make buttons smaller later 
		var returnButton = this.add.button(w/2-330,h/2+150, 'returnButton', this.resumeGame,this);		//nextButton.width = 200;
		returnButton.anchor.set(0.5,0.5);
	},

	resumeGame: function(){
		main.state.start('menu');
	},
}