var introMusic = null;

var menu = {

	preload: function(){
		this.load.image('menuBackground','./assets/images/backgrounds/mainMenu_screen.png');
		this.load.image('newGameButton','./assets/images/buttons/newGame_button.png');
		this.load.image('loadGameButton','./assets/images/buttons/loadGame_button.png');
		this.load.image('creditsButton','./assets/images/buttons/credits_button.png');
		this.load.audio('hoverSound', './assets/sounds/button_hover.mp3');
		this.load.audio('buttonClickedSound','./assets/sounds/button_clicked.mp3');
		this.load.audio('introMusic', './assets/sounds/introMusic.ogg');
	},

	create: function(){
		this.add.tileSprite(0,0, 1280, 800, 'menuBackground');
		var newGameButton = this.add.button(205,270,'newGameButton',this.newGame, this);
		var loadGameButton = this.add.button(205,370, 'loadGameButton', this.loadGame, this);
		var CreditButton = this.add.button(205,470, 'creditsButton', this.loadCredits,this);
		
		if(introMusic == null){
			introMusic = this.add.audio('introMusic');
		}
		if(!introMusic.isPlaying){
			introMusic.loop = true;
			introMusic.volume = 0.5;
			introMusic.play();
		}
	},

	newGame: function(){
		menu.state.start('name');
	},

	loadGame: function(){
		menu.state.start('loadGame');
	},

	loadCredits: function(){
		menu.state.start('credits');
	},

	//called when this state is exited e.g., you switch to another state
	shutdown: function(){
	}

};