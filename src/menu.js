var menu = {

	preload: function(){
		this.load.image('menuScreen','./assets/images/mainMenu_screen.png');
		this.load.image('newGameButton','./assets/images/newGame_button.png');
		this.load.image('loadGameButton','./assets/images/loadGame_button.png');
		this.load.image('creditsButton','./assets/images/credits_button.png');
		this.load.audio('hoverSound', './assets/sounds/button_hover.mp3');
		this.load.audio('buttonClickedSound','./assets/sounds/button_clicked.mp3');
	},

	create: function(){
		this.add.tileSprite(0,0, 1280, 800, 'menuScreen');
		var newGameButton = this.add.button(140,240,'newGameButton',this.startGame, this);
		var loadGameButton = this.add.button(140,350, 'loadGameButton', this.loadGame, this);
		var CreditButton = this.add.button(140,460, 'creditsButton', this.loadCredits,this);
	},

		startGame: function(){
			this.state.start('game');
		},

		loadCredits: function(){
			this.state.start('credits');
		}



};