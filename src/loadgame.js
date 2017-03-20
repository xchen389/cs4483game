
//lolad game menu
aotb_game.loadGame = function(){

	var pgame = this;

	this.preload = function(){
	}

	this.create = function(){
		//make the background for the load game menu
		pgame.add.tileSprite(0,0, 1280, 800, 'loadGameBackground');
		pgame.add.button(50,690, 'backButton', loadMenu,pgame);
		pgame.add.button(960,690, 'loadButton', loadTheGame,pgame);

		//if the music is not playing, then play it
		if(!introMusic.isPlaying){
			introMusic.loop = true;
			introMusic.volume = 0.5;
			introMusic.play();
		}
	}

	//load the main menu
	function loadMenu(){
		pgame.state.start('menu');
	}

	//load the game
	function loadTheGame(){
		//load the game from previous state
		pgame.state.start('menu');
	}
};
