var introMusic = null;

aotb_game.menu = function(){
	var pgame = this;

	this.preload = function(){
	}

	this.create = function(){
		this.add.tileSprite(0,0, 1280, 800, 'menuBackground');
		var buttonPressSound = this.add.audio('buttonClickSound');
		var newGameButton = this.add.button(205,270,'newGameButton',newGame, this);
		var loadGameButton = this.add.button(205,370, 'loadGameButton', loadGame, this);
		var CreditButton = this.add.button(205,470, 'creditsButton', loadCredits,this);
		newGameButton.setDownSound(buttonPressSound);
		loadGameButton.setDownSound(buttonPressSound);
		CreditButton.setDownSound(buttonPressSound);
		newGameButton.onInputOver.add(highlight, this);
		newGameButton.tint = Math.random() * 0xffffff;

		if(introMusic == null){
			introMusic = this.add.audio('introMusic');
		}

		if(!introMusic.isPlaying){
			introMusic.loop = true;
			introMusic.volume = playerData.musicVolume;
			introMusic.play();
		}
	}

	function highlight(){

	}

	function newGame(){
		pgame.state.start('name');
	}

	function loadCredits(){
		pgame.state.start('credits');
	}
	

	function loadGame(){
		pgame.state.start('loadGame');
	}

	function loadCredits(){
		pgame.state.start('credits');
	}

};