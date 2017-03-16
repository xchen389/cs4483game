var loadGame = {

	preload: function(){
		this.load.image('loadGameBackground','./assets/images/backgrounds/loadGame_screen.png');
		this.load.image('backButton', './assets/images/buttons/back_button.png')
		this.load.image('loadButton', './assets/images/buttons/load_button.png')
		this.load.audio('introMusic', './assets/sounds/introMusic.ogg');
	},

	create: function(){
		this.add.tileSprite(0,0, 1280, 800, 'loadGameBackground');
		this.add.button(50,690, 'backButton', this.goBack,this);
		this.add.button(960,690, 'loadButton', this.loadTheGame,this);

		if(!introMusic.isPlaying){
			introMusic.loop = true;
			introMusic.volume = 0.5;
			introMusic.play();
		}
	},

	goBack: function(){
		main.state.start('menu');
	},

	loadTheGame: function(){
		//get shit from the file, edit gobal vars
		main.state.start('shop');
	},

	shutdown: function(){
	}


}