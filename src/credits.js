//credits menu
aotb_game.credits = function(){

	//play game is currently this javascript file
	var pgame = this;

	this.preload = function(){

	}

	//creates a credit screen with a back button
	this.create = function(){
		pgame.add.tileSprite(0,0, 1280, 800, 'creditsScreen');
		pgame.add.button(170,480, 'backButton', loadMenu,this);

		//dealing with music effects
		if(!introMusic.isPlaying){
			introMusic.loop = true;
			introMusic.volume = 0.5;
			introMusic.play();
		}
	}

	//go back to the main menu
	function loadMenu(){
		pgame.state.start('menu');
	}

};