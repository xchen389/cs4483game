var credits = {

	preload: function(){
		this.load.image('creditsScreen','./assets/images/credit_screen.png');
		this.load.image('backButton','./assets/images/back_button.png');
	},

	create: function(){
		this.add.sprite(0,0,'creditsScreen');
		this.add.button(140,480, 'backButton', this.loadCredits,this);
	},

	loadCredits: function(){
		this.state.start('menu');
	}

};