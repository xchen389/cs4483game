var introMusic = null;

aotb_game.menu = function(){
	var pgame = this;

	this.init = function()
	{
		//setup scale
		this.scale.windowConstraints.bottom = "visual";
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		// put the canvas at centre
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
	}

	this.preload = function(){
		this.load.image('menuBackground','./assets/images/backgrounds/mainMenu_screen.png');
		this.load.image('newGameButton','./assets/images/buttons/newGame_button.png');
		this.load.image('loadGameButton','./assets/images/buttons/loadGame_button.png');
		this.load.image('creditsButton','./assets/images/buttons/credits_button.png');
		this.load.audio('hoverSound', './assets/sounds/button_hover.mp3');
		this.load.audio('buttonClickedSound','./assets/sounds/button_clicked.mp3');
		this.load.audio('introMusic', './assets/sounds/introMusic.ogg');
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