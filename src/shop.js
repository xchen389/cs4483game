var shop = {

	preload: function(){
		this.load.image('shopScreen','./assets/images/shop_screen.png');
		this.load.image('nextButton','./assets/images/next_button.png');
	},

	create: function(){
		this.add.tileSprite(0,0, 1280, 800, 'shopScreen');
		this.add.button(750,650, 'nextButton', this.loadGame,this);
	},

	loadGame: function(){
		this.state.start('game');
	}
}