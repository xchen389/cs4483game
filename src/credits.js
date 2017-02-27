var Credits = {

    preload: function(){
        game.load.image('credits', './assets/images/credits.png');
        game.load.image('backButton', './assets/images/backButton.png');
    },

    create: function() {
    	this.add.sprite(0,0,'credits');
        this.add.button(450, 500,'backButton',this.startMenu, this);
    },

    update:function(){

    },

    startMenu: function() {
        this.state.start('Menu');
    }
};