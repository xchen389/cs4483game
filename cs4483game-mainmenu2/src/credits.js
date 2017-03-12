var credits = {

    preload: function(){
        main.load.image('credits', './assets/images/credits.png');
        main.load.image('backButton', './assets/images/backButton.png');
    },

    create: function() {
    	this.add.sprite(0,0,'credits');
        this.add.button(465, 540,'backButton',this.startMenu, this);
    },

    update:function(){

    },

    startMenu: function() {
        this.state.start('menu');
    }
};