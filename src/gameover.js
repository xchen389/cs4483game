var gameover = {

	preload: function(){
		this.load.image('gameoverBackground', './assets/images/backgrounds/gameover_screen.png');
	},

	create: function(){
		this.add.tileSprite(0,0, 1280, 800, 'gameoverBackground');
	}


}