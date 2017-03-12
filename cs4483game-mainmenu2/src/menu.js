var menu = {

    preload: function() {
        main.load.image('menu', './assets/images/menu.png');
        main.load.image('playButton', './assets/images/playButton.png');
        main.load.image('creditsButton', './assets/images/creditsButton.png');
    },

    create: function() {
    	this.add.sprite(0,0,'menu');
        this.add.button(475, 175,'playButton',this.startPlay, this);
        this.add.button(475, 390,'creditsButton',this.startCredits, this);
    },

	startCredits: function() {
    	this.state.start('credits');
    },

    startPlay: function() {
        this.state.start('play');
    }

};