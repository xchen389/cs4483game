var credits = {

	preload: function(){
		this.load.image('creditsScreen','./assets/images/backgrounds/credits_screen.png');
		this.load.image('backButton','./assets/images/buttons/back_button.png');
		this.load.audio('introMusic', './assets/sounds/introMusic.ogg');
	},

	create: function(){
		this.add.tileSprite(0,0, 1280, 800, 'creditsScreen');
		this.add.button(170,480, 'backButton', this.loadCredits,this);

		if(!introMusic.isPlaying){
			introMusic.loop = true;
			introMusic.volume = 0.5;
			introMusic.play();
		}
	},

	loadCredits: function(){
		this.state.start('menu');
	},

	shutdown: function(){
	}
};