var nameScreen = {

	preload: function(){
		this.load.image('nameScreen','./assets/images/backgrounds/name_screen.png');
		this.load.image('backButton','./assets/images/buttons/back_button.png');
		this.load.image('nextButton','./assets/images/buttons/next_button.png');
	},

	create: function(){
		this.add.tileSprite(0,0, 1280, 800, 'nameScreen');
		this.add.button(170,480, 'backButton', this.goBackToMenu,this);
		this.add.button(800, 480, 'nextButton', this.continueToGame, this);

		if(!introMusic.isPlaying){
			introMusic.loop = true;
			introMusic.volume = 0.5;
			introMusic.play();
		}

		game.game.add.plugin(PhaserInput.Plugin);
		var input = this.add.inputField(360,335, {
			font: '78px Arial',
			width: 560

		});
	},

	goBackToMenu: function(){
		main.state.start('menu');
	},

	continueToGame: function(){
		//save whatever is in textbox to playerName
		main.state.start('game');
	}

}