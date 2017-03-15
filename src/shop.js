var shop = {

	preload: function(){
		this.load.image('shopScreen','./assets/images/backgrounds/shop_screen.png');
		this.load.image('nextButton','./assets/images/buttons/next_button.png');
		this.load.image('exitButton','./assets/images/buttons/exit_button.png');
	},

	create: function(){
		this.add.tileSprite(0,0, 1280, 800, 'shopScreen');
		//make buttons smaller later 
		var nextButton = this.add.button(670,670, 'nextButton', this.loadGame,this);
		//nextButton.width = 200;
		//nextButton.height = 100;

		var exitButton = this.add.button(970,670, 'exitButton', this.loadMenu,this);
		//exitButton.width = 100;
		//exitButton.height = 80;
	},

	loadGame: function(){
		main.state.start('game');
	},

	loadMenu: function(){
		main.state.start('menu');
	}
}