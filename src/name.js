var input;

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
		input = this.add.inputField(360,335, {
			font: '78px Arial',
			width: 560,
			borderWidth: 5,
			borderColor: '#000',
			max: 14
		});
	},



	goBackToMenu: function(){
		main.state.start('menu');
	},

	continueToGame: function(){
		//If nothing is written in the box, don't let user go to game
		if(input.value == "")
			return;
		//assign global playerName to this value
		playerName = input.value;
		//only shut down music if you're going to start game, 
		//I did not put this in shutdown function cause 
		//if the user went back via back button, music would restart
		introMusic.stop();
		main.state.start('game');
	}

}