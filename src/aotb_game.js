//attack of the bubbles game function

//setup the game with appropriate loading files and variables
aotb_game.game = function(){

  //constructor
  var game = function(options){

    //initialize options
    this.options = options;
    // phasergame (pgame) instance
    var _pgame;
    this.pgame = function(){
      //return the game
      return _pgame;
    };

    // for other states to load assets
    this.loadAsset = function(key, filename, type){

      //if the type is undefined, then type becomes image
      if (typeof type === "undefined") {
        type = aotb_game.AssetType.IMAGE;
      }

      //two types in the game, images and sound
      var aType = (type == aotb_game.AssetType.IMAGE) ? "images" : "sounds";
      var addr = 'assets/' + aType + '/' + filename;

      //if the type is image, then load the image into the game with a key and an addr. 
      if (type === aotb_game.AssetType.IMAGE) {
          _pgame.load.image(key, addr);
      }
      //else if the type is audio, then load the audio into the game with a key and an addr
      else if (type === aotb_game.AssetType.AUDIO){
        _pgame.load.audio(key, addr);
      }
    };
    //define addAsset to be a function that takes in 3 parameters of x, y, and key. 
    this.addAsset = function(x, y, key){
      //return the game with added sprite with values x,y and key. 
      return _pgame.add.sprite(x, y, key);
    }
    //this starts the function
    this.init = function(){
      //Make sure Phaser is included
      if (typeof Phaser === 'undefined') {
          console.log('Phaser not installed');
          return;
      }

      //size of the game
      _pgame = new Phaser.Game(1280, 800, Phaser.CANVAS, options.id);
      //load in the necessary javascript files into the game
      _pgame.state.add('boot', new aotb_game.bootStage);
      _pgame.state.add('preloader', new aotb_game.preloadStage);
      _pgame.state.add('level1', new aotb_game.lv1);
      _pgame.state.add('level2', new aotb_game.lv2);
      _pgame.state.add('level3', new aotb_game.lv3);
      _pgame.state.add('level4', new aotb_game.lv4);
      _pgame.state.add('level5', new aotb_game.lv5);
      _pgame.state.add('level6', new aotb_game.lv6);
      _pgame.state.add('level7', new aotb_game.lv7);
      _pgame.state.add('level8', new aotb_game.lv8);
      _pgame.state.add('level9', new aotb_game.lv9);
      _pgame.state.add('level10', new aotb_game.lv10);
      _pgame.state.add('menu', new aotb_game.menu);
      _pgame.state.add('credits', new aotb_game.credits);
      _pgame.state.add('victory', new aotb_game.victory);
      _pgame.state.add('gameover', new aotb_game.gameover);
      _pgame.state.add('shop', new aotb_game.shop);
      _pgame.state.add('loadGame', new aotb_game.loadGame);
      _pgame.state.add('name', new aotb_game.nameScreen);

      //start the game with the javascript file boot
      _pgame.state.start('boot');
    };
  };

  //starts the game
  return game;

}();

