var introMusic = null;

aotb_game.menu = function(){
	var pgame = this;

	this.preload = function(){
	}

	this.create = function(){
		this.add.tileSprite(0,0, 1280, 800, 'menuBackground');
		var newGameButton = this.add.button(205,270,'newGameButton',newGame, this);
		var loadGameButton = this.add.button(205,370, 'loadGameButton', loadGame, this);
		var CreditButton = this.add.button(205,470, 'creditsButton', loadCredits,this);
		
		if(introMusic == null)
			introMusic = this.add.audio('introMusic');

		
		if(!introMusic.isPlaying){
			introMusic.loop = true;
			introMusic.volume = 0.5;
			introMusic.play();
		}
	}

	function newGame(){
		pgame.state.start('name');
	}

	function loadGame(){
		pgame.state.start('loadGame');
	}

	function loadCredits(){
		pgame.state.start('credits');
	}

};