var music;

var shop = {

	preload: function(){
		this.load.image('shopScreen','./assets/images/backgrounds/shop_screen.png');
		this.load.image('nextButton','./assets/images/buttons/next_button.png');
		this.load.image('exitButton','./assets/images/buttons/exit_button.png');
		this.load.audio('shopMusic', './assets/sounds/shopMusic.mp3');
	},

	create: function(){
		this.add.tileSprite(0,0, 1280, 800, 'shopScreen');
		//make buttons smaller later 
		var nextButton = this.add.button(670,670, 'nextButton', this.loadGame,this);
		//nextButton.width = 200;
		//nextButton.height = 100;
		//
		var exitButton = this.add.button(970,670, 'exitButton', this.loadMenu,this);
		//exitButton.width = 100;
		//exitButton.height = 80;
		
		music = this.add.audio('shopMusic');
		music.volume = playerData.musicVolume;
		music.loop = true;
		music.play();
	},

	loadGame: function(){
		saveData();
		main.state.start('game');
	},

	loadMenu: function(){
		saveData();
		main.state.start('menu');
	},

	//called when this state is switched (state shutdown)
	shutdown: function(){
		music.stop();
	}
}