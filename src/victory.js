//victory function
aotb_game.victory = function(){
	
	var pgame = this;

	this.preload = function(){
	};

	this.create = function(){
		this.add.tileSprite(0,0, 1280, 800, 'victory');
		this.add.button(170,410, 'mainmenuButton', loadMainMenu,this);
	};

	function loadMainMenu(){
		pgame.state.start('menu');
	}

}