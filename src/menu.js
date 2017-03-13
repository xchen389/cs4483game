var menu = {

	preload: function(){
		this.load.image('menuScreen','./assets/images/mainMenu_screen.png');
		this.load.image('newGameButton','./assets/images/newGame_button.png');
		this.load.image('loadGameButton','./assets/images/loadGame_button.png');
		this.load.image('creditsButton','./assets/images/credits_button.png');
	},

	create: function(){
		this.add.tileSprite(0,0, 1280, 800, 'menuScreen');
		this.add.button(140,240,'newGameButton',this.startGame, this);
		this.add.button(140,350, 'loadGameButton', this.loadGame, this);
		this.add.button(140,460, 'creditsButton', this.loadCredits,this);
	},

		startGame: function(){
			this.state.start('game');
		},

		loadCredits: function(){
			this.state.start('credits');
		}



};