var Menu = {

    preload: function() {
        game.load.image('menu', './assets/images/menu.png');
        game.load.image('playButton', './assets/images/playButton.png');
        game.load.image('creditsButton', './assets/images/creditsButton.png');
    },

    create: function() {
    	this.add.sprite(0,0,'menu');
        this.add.button(220, 160,'playButton',this.startGame, this);
        this.add.button(220, 340,'creditsButton',this.startCredits, this);
    },

	startCredits: function() {
    	this.state.start('Credits');
    },

    startGame: function() {
        this.state.start('Game');
    }

};