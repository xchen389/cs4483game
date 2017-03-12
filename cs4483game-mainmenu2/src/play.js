var play = {

    preload: function(){
        main.load.image('play', './assets/images/play.png');
        main.load.image('newButton', './assets/images/newButton.png');
        main.load.image('loadButton', './assets/images/loadButton.png');
        main.load.image('backButton', './assets/images/backButton.png');
    },

    create: function() {
    	this.add.sprite(0,0,'play');
        this.add.button(430, 100,'newButton',this.startGame, this);
        //this.add.button(465, 540,'loadButton',this.startMenu, this);
        this.add.button(460, 390,'backButton',this.startMenu, this);
    },

    update:function(){

    },

    startMenu: function() {
        this.state.start('menu');
    },

    startGame: function() {
        this.state.start('game');
    }

};