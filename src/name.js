var input;

//make a name menu
aotb_game.nameScreen = function(){

	var pgame = this;

	this.preload = function(){
	};

	this.create = function(){
		//make the background and button for the menu
		this.add.tileSprite(0,0, 1280, 800, 'nameScreen');
		this.add.button(200,500, 'backButton', loadMenu,this);
		this.add.button(800,500, 'nextButton', continueToGame, this);

		//if the music is not playing, play it
		if(!introMusic.isPlaying){
			introMusic.loop = true;
			introMusic.volume = 0.5;
			introMusic.play();
		}

		pgame.add.plugin(PhaserInput.Plugin);
		//create the input box for the player to type their name in
		input = this.add.inputField(360,335, {
			font: '78px Arial',
			width: 560,
			borderWidth: 5,
			borderColor: '#000',
			max: 14
		});
	}
	//load the main menu
	function loadMenu(){
		pgame.state.start('menu');
	}
	//start the game
	function continueToGame(){
		//If nothing is written in the box, don't let user go to game
		if(input.value == "")
			return;
		//assign global playerName to this value
		playerName = input.value;
		//only shut down music if you're going to start game, 
		//I did not put this in shutdown function cause 
		//if the user went back via back button, music would restart
		introMusic.stop();
		//start the game at level 1
		pgame.state.start('level1');
	}

};