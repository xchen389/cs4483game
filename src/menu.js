var menu = {

	preload: function(){
		this.load.image('menuBackground','./assets/images/backgrounds/mainMenu_screen.png');
		this.load.image('newGameButton','./assets/images/buttons/newGame_button.png');
		this.load.image('loadGameButton','./assets/images/buttons/loadGame_button.png');
		this.load.image('creditsButton','./assets/images/buttons/credits_button.png');
		this.load.audio('hoverSound', './assets/sounds/button_hover.mp3');
		this.load.audio('buttonClickedSound','./assets/sounds/button_clicked.mp3');
		this.load.audio('introAudio', './assets/sounds/introMusic.ogg');
	},

	create: function(){
		this.add.tileSprite(0,0, 1280, 800, 'menuBackground');
		var newGameButton = this.add.button(200,250,'newGameButton',this.startGame, this);
		var loadGameButton = this.add.button(200,370, 'loadGameButton', this.loadGame, this);
		var CreditButton = this.add.button(200,490, 'creditsButton', this.loadCredits,this);
		
		//music
        music = menu.add.audio('introAudio');
        music.loop();
	},

		startGame: function(){
			menu.state.start('game');
		},

		loadGame: function(){
			menu.state.start('loadGame');
		},

		loadCredits: function(){
			menu.state.start('credits');
		}



};