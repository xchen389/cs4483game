aotb_game.gameover = function(){
	var pgame = this;

	this.preload = function(){
	};

	this.create = function(){
		this.add.tileSprite(0,0, 1280, 800, 'gameoverBackground');
		var mainMenuButton = this.add.button(170,510, 'mainmenuButton', loadMainMenu,this);

		var buttonPressSound = this.add.audio('buttonClickSound');
		var buttonHoverSound = this.add.audio('buttonHoverSound');

		mainMenuButton.setDownSound(buttonPressSound);
		mainMenuButton.setOverSound(buttonHoverSound);
	};

	function loadMainMenu(){
		pgame.state.start('menu');
	}

}