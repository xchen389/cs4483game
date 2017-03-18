var input;

aotb_game.nameScreen = function(){
	var pgame = this;

	this.preload = function(){
		this.load.image('nameScreen','./assets/images/backgrounds/name_screen.png');
		this.load.image('backButton','./assets/images/buttons/back_button.png');
		this.load.image('nextButton','./assets/images/buttons/next_button.png');
	};

	this.create = function(){
		this.add.tileSprite(0,0, 1280, 800, 'nameScreen');
		this.add.button(200,500, 'backButton', goBackToMenu,this);
		this.add.button(800,500, 'nextButton', continueToGame, this);

		if(!introMusic.isPlaying){
			introMusic.loop = true;
			introMusic.volume = 0.5;
			introMusic.play();
		}

		pgame.add.plugin(PhaserInput.Plugin);
		input = this.add.inputField(360,335, {
			font: '78px Arial',
			width: 560,
			borderWidth: 5,
			borderColor: '#000',
			max: 14
		});
	}

	function goBackToMenu(){
		pgame.state.start('menu');
	}

	function continueToGame(){
		//If nothing is written in the box, don't let user go to game
		if(input.value == "")
			return;
		//assign global playerName to this value
		playerName = input.value;
		//only shut down music if you're going to start game, 
		//I did not put this in shutdown function cause 
		//if the user went back via back button, music would restart
		introMusic.stop();
		pgame.state.start('level1');
	}

};