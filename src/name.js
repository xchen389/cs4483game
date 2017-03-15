var name = {

	preload: function(){
		this.load.image('nameScreen','./assets/images/backgrounds/name_screen.png');
		this.load.image('backButton','./assets/images/buttons/back_button.png');
		this.load.image('continueButton','./assets/images/buttons/continue_button.png');
	},

	create: function(){
		this.add.tileSprite(0,0, 1280, 800, 'nameScreen');
		this.add.button(170,480, 'backButton', this.loadCredits,this);
		this.add.button(800, 480, 'continueButton', this.continueToGame, this);
		//playerName = 

		if(!introMusic.isPlaying){
			introMusic.loop = true;
			introMusic.volume = 0.5;
			introMusic.play();
		}
	},

	goBackToMenu: function(){
		main.state.start('menu');
	},

	continueToGame: function(){
		main.state.start('game');
	}

}