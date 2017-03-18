var aotb_game = {
    AssetType : {
        AUDIO: 0,
        IMAGE: 1
    },

    //Game Instance
    game: {},

    //True only when game is started
    initialized : false,

    start: function (opt) {
        this.game = new aotb_game.game(opt);
        this.game.init();

        this.initialized = true;
    }
};