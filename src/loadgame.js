aotb_game.loadGame = function(){
	var pgame = this;

	this.preload = function(){
		pgame.load.image('loadGameBackground','./assets/images/backgrounds/loadGame_screen.png');
		pgame.load.image('backButton', './assets/images/buttons/back_button.png')
		pgame.load.image('loadButton', './assets/images/buttons/load_button.png')
		pgame.load.audio('introMusic', './assets/sounds/introMusic.ogg');
	}

	this.create = function(){
		pgame.add.tileSprite(0,0, 1280, 800, 'loadGameBackground');
		pgame.add.button(50,690, 'backButton', goBack,pgame);
		pgame.add.button(960,690, 'loadButton', loadTheGame,pgame);

		if(!introMusic.isPlaying){
			introMusic.loop = true;
			introMusic.volume = 0.5;
			introMusic.play();
		}
	}

	function goBack(){
		pgame.state.start('menu');
	}

	function loadTheGame(){
		//get shit from the file, edit gobal vars
		pgame.state.start('shop');
	}
};
