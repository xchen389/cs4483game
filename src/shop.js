var shop = {

	preload: function(){
		this.load.image('shopScreen','./assets/images/shop_screen.png');
		this.load.image('nextButton','./assets/images/next_button.png');
		this.load.image('exitButton','./assets/images/exit_button.png');
	},

	create: function(){
		this.add.tileSprite(0,0, 1280, 800, 'shopScreen');
		//make buttons smaller later 
		this.add.button(580,650, 'nextButton', this.loadGame,this);
		this.add.button(920,650, 'exitButton', this.loadMenu,this);
	},

	loadGame: function(){
		this.state.start('game');
	},

	loadMenu: function(){
		this.state.start('menu');
	}
}