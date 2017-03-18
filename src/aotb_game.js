aotb_game.game = function()
{
  //constructor
  var game = function(options)
  {
    this.options = options;

    // phaser game instance
    var _pgame;
    this.pgame = function()
    {
      return _pgame;
    };

    // for other states to load assets
    this.loadAsset = function(key, filename, type)
    {
      if (typeof type === "undefined") {
        type = aotb_game.AssetType.IMAGE;
      }

      var aType = (type == aotb_game.AssetType.IMAGE) ? "images" : "sounds";
      var addr = 'assets/' + aType + '/' + filename;

      if (type === aotb_game.AssetType.IMAGE) {
          _pgame.load.image(key, addr);
      }
      else if (type === aotb_game.AssetType.AUDIO)
      {
        _pgame.load.audio(key, addr);
      }
    };

    this.addAsset = function(x, y, key)
    {
      return _pgame.add.sprite(x, y, key);
    }
    this.init = function()
    {
      //Make sure Phaser is included
      if (typeof Phaser === 'undefined') {
          console.log('Phaser not installed');
          return;
      }

      _pgame = new Phaser.Game(1280, 800, Phaser.CANVAS, options.id, null, false, true);
      _pgame.state.add('level1', new aotb_game.lv1);
      _pgame.state.add('menu', new aotb_game.menu);
      _pgame.state.add('credits', new aotb_game.credits);
      _pgame.state.add('gameover', new aotb_game.gameover);
      _pgame.state.add('shop', new aotb_game.shop);
      _pgame.state.add('loadGame', new aotb_game.loadGame);
      _pgame.state.add('name', new aotb_game.nameScreen);

      _pgame.state.start('menu');
    };
  };

  return game;
}();