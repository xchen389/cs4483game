aotb_game.gameover = function(){
	var pgame = this;

	this.preload = function(){
		this.load.image('gameoverBackground', './assets/images/backgrounds/gameover_screen.png');
		this.load.image('mainmenuButton', './assets/images/buttons/mainMenu_button.png');
	};

	this.create = function(){
		this.add.tileSprite(0,0, 1280, 800, 'gameoverBackground');
		this.add.button(170,410, 'mainmenuButton', loadMainMenu,this);
	};

	function loadMainMenu(){
		pgame.state.start('menu');
	}

}