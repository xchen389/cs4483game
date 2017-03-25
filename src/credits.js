aotb_game.credits = function(){
	var pgame = this;

	this.preload = function(){
	}

	this.create = function(){
		pgame.add.tileSprite(0,0, 1280, 800, 'creditsScreen');
		var buttonPressSound = this.add.audio('buttonClickSound');
		var backButton = pgame.add.button(170,480, 'backButton', loadCredits,this);
		backButton.setDownSound(buttonPressSound);

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