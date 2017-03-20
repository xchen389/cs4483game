var introMusic = null;

//game main menu
aotb_game.menu = function(){
	var pgame = this;

	this.preload = function(){
	}

	this.create = function(){
		//creates the background for the main menu along with the buttons
		this.add.tileSprite(0,0, 1280, 800, 'menuBackground');
		var newGameButton = this.add.button(205,270,'newGameButton',newGame, this);
		var loadGameButton = this.add.button(205,370, 'loadGameButton', loadGame, this);
		var CreditButton = this.add.button(205,470, 'creditsButton', loadCredits,this);
		
		//if no music, add music
		if(introMusic == null)
			introMusic = this.add.audio('introMusic');

		//if music is not playing, then play the music
		if(!introMusic.isPlaying){
			introMusic.loop = true;
			introMusic.volume = 0.5;
			introMusic.play();
		}
	}

	//go to make a name screen
	function newGame(){
		pgame.state.start('level1');
	}

	//go to load the game screen
	function loadGame(){
		pgame.state.start('loadGame');
	}

	//go to load the credits screen
	function loadCredits(){
		pgame.state.start('credits');
	}

};