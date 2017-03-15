var credits = {

	preload: function(){
		this.load.image('creditsScreen','./assets/images/backgrounds/credits_screen.png');
		this.load.image('backButton','./assets/images/buttons/back_button.png');
	},

	create: function(){
		this.add.tileSprite(0,0, 1280, 800, 'creditsScreen');
		this.add.button(170,480, 'backButton', this.loadCredits,this);
	},

	loadCredits: function(){
		this.state.start('menu');
	}

};