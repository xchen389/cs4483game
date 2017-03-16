var gameover = {

	preload: function(){
		this.load.image('gameoverBackground', './assets/images/backgrounds/gameover_screen.png');
		this.load.image('mainmenuButton', './assets/images/buttons/mainMenu_button.png');
	},

	create: function(){
		this.add.tileSprite(0,0, 1280, 800, 'gameoverBackground');
		this.add.button(170,410, 'mainmenuButton', this.loadMainMenu,this);
	},

	loadMainMenu: function(){
		main.state.start('menu');
	}

}