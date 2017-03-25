var input;

aotb_game.nameScreen = function(){
	var pgame = this;

	this.preload = function(){
	};

	this.create = function(){
		this.add.tileSprite(0,0, 1280, 800, 'nameScreen');
		var buttonPressSound = this.add.audio('buttonClickSound');
		var backButton = this.add.button(200,500, 'backButton', goBackToMenu,this);
		var nextButton = this.add.button(800,500, 'nextButton', continueToGame, this);
		backButton.setDownSound(buttonPressSound);
		nextButton.setDownSound(buttonPressSound);

		if(!introMusic.isPlaying){
			introMusic.loop = true;
			introMusic.volume = playerData.musicVolume;
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
		//and show notification to write in text
		if(input.value == ""){
			this.instructions = this.add.text(650, 300, 
    		"Please Enter Your Name!", 
    		{font: '25px monospace', fill: '#000', align: 'center'}
  			);
  			this.instructions.anchor.setTo(0.5, 0.5);
  			this.time.events.add(1000, this.instructions.destroy, this.instructions);
			return;
		}

		//assign global playerData object name to this value
		playerData.name = input.value;

		//only shut down music if you're going to start game, 
		//I did not put this in shutdown function cause 
		//if the user went back via back button, music would restart
		introMusic.stop();
		pgame.state.start('level1');
	}

};