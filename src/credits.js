aotb_game.credits = function(){
	var pgame = this;

	this.preload = function(){
	}

	this.create = function(){
		pgame.add.tileSprite(0,0, 1280, 800, 'creditsScreen');
		pgame.add.button(170,480, 'backButton', loadCredits,this);

		if(!introMusic.isPlaying){
			introMusic.loop = true;
			introMusic.volume = playerData.musicVolume;
			introMusic.play();
		}
	}

	function loadCredits(){
		pgame.state.start('menu');
	}

};