var introMusic = null;

aotb_game.menu = function(){
	var pgame = this;

	this.preload = function(){
	}

	this.create = function(){
		this.add.tileSprite(0,0, 1280, 800, 'menuBackground');

		var buttonPressSound = this.add.audio('buttonClickSound');
		var buttonHoverSound = this.add.audio('buttonHoverSound');

		var newGameButton = this.add.button(205,270,'newGameButton',newGame, this);
		var loadGameButton = this.add.button(205,370, 'loadGameButton', loadGame, this);
		var CreditButton = this.add.button(205,470, 'creditsButton', loadCredits,this);

		var howtoPlaybutton = this.add.button(50, 360, 'questionMark', displayTips, this);
		howtoPlaybutton.height  = 100;
		howtoPlaybutton.width = 100;

		//add sounds for over and down actions
		newGameButton.setDownSound(buttonPressSound);
		loadGameButton.setDownSound(buttonPressSound);
		CreditButton.setDownSound(buttonPressSound);

		newGameButton.setOverSound(buttonHoverSound);
		loadGameButton.setOverSound(buttonHoverSound);
		CreditButton.setOverSound(buttonHoverSound);

		//newGameButton.onInputOver = Phaser.signal 
		//newGameButton.tint = Math.random() * 0xffffff;

		if(introMusic == null){
			introMusic = this.add.audio('introMusic');
		}

		if(!introMusic.isPlaying){
			introMusic.loop = true;
			introMusic.volume = playerData.musicVolume;
			introMusic.play();
		}
	}

	//function called when howtoPlayButton is clicked
	function displayTips(){

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