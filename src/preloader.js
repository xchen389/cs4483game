//continuation of the booting screen

aotb_game.preloadStage = function(){

  var game = aotb_game.game;
  var loadPercent = 0;
  var percentText;
  var preloadBar;

  this.preload = function(){

    //add loading bar
    preloadBar = this.add.graphics(this.world.centerX - 60, this.world.centerY+100);
    preloadBar.lineStyle(10, 0x0, 1);
    preloadBar.moveTo(0, 0);
    preloadBar.lineTo(126, 0);

    preloadBar.scale.x = 0;

    // Add the progress bar text for progress indication
    this.add.text(this.world.centerX - 60, this.world.centerY+70, 'LOADING...', {font: '18pt Arial', fill: "#000000", stroke: "#ffffff"});
    percentText = this.add.text(this.world.centerX + 83, this.world.centerY + 90, loadPercent + '%', {font:'14pt Arial'});

    //------------ load all the assets
    //for main menu
    game.loadAsset('menuBackground','backgrounds/mainMenu_screen.png', aotb_game.AssetType.IMAGE);
		game.loadAsset('newGameButton','buttons/newGame_button.png', aotb_game.AssetType.IMAGE);
		game.loadAsset('loadGameButton','buttons/loadGame_button.png', aotb_game.AssetType.IMAGE);
		game.loadAsset('creditsButton','buttons/credits_button.png', aotb_game.AssetType.IMAGE);
		game.loadAsset('hoverSound', 'button_hover.mp3');
		game.loadAsset('buttonClickedSound','button_clicked.mp3');
		game.loadAsset('introMusic', 'introMusic.ogg');

    // for loadgame
    game.loadAsset('loadGameBackground','backgrounds/loadGame_screen.png', aotb_game.AssetType.IMAGE);
		game.loadAsset('backButton', 'buttons/back_button.png', aotb_game.AssetType.IMAGE);
		game.loadAsset('loadButton', 'buttons/load_button.png', aotb_game.AssetType.IMAGE);
		game.loadAsset('introMusic', 'introMusic.ogg');

    // for gameover
    game.loadAsset('gameoverBackground', 'backgrounds/gameover_screen.png', aotb_game.AssetType.IMAGE);
		game.loadAsset('mainmenuButton', 'buttons/mainMenu_button.png', aotb_game.AssetType.IMAGE);

    // for credits
    game.loadAsset('creditsScreen','backgrounds/credits_screen.png', aotb_game.AssetType.IMAGE);
		game.loadAsset('introMusic', 'introMusic.ogg');

    //for victory
    game.loadAsset('victory', 'backgrounds/victory.png', aotb_game.AssetType.IMAGE);

    // for level
    game.loadAsset('player', 'player.png', aotb_game.AssetType.IMAGE);
    game.loadAsset('bubble', 'bubble.png', aotb_game.AssetType.IMAGE);
    game.loadAsset('camel', 'single_camel.gif', aotb_game.AssetType.IMAGE);
    game.loadAsset('companion', 'dog-placeholder.png', aotb_game.AssetType.IMAGE);
    game.loadAsset('fullBubble', 'fullBubble.png', aotb_game.AssetType.IMAGE);
    game.loadAsset('pauseButton', 'buttons/pause_button.png', aotb_game.AssetType.IMAGE);
    game.loadAsset('background', 'backgrounds/gamebackground_screen.png', aotb_game.AssetType.IMAGE);
    game.loadAsset('pauseScreen', 'backgrounds/pause_screen.png', aotb_game.AssetType.IMAGE);
    game.loadAsset('mainMenuButton', 'buttons/mainMenu_button.png', aotb_game.AssetType.IMAGE);
    game.loadAsset('pop', 'bubble_pop.mp3', aotb_game.AssetType.AUDIO);
    game.loadAsset('camel_ouch', 'camel_ouch.mp3', aotb_game.AssetType.AUDIO);
    game.loadAsset('gameMusic', 'gameMusic.mp3', aotb_game.AssetType.AUDIO);
    game.loadAsset('bullet', 'bullet.GIF', aotb_game.AssetType.IMAGE);
    game.loadAsset('blue', 'blue.png', aotb_game.AssetType.IMAGE);
    game.loadAsset('yellow', 'yellow.png', aotb_game.AssetType.IMAGE);
    game.loadAsset('green', 'green.png', aotb_game.AssetType.IMAGE);
    game.loadAsset('purple', 'purple.png', aotb_game.AssetType.IMAGE);
    game.loadAsset('brown', 'brown.png', aotb_game.AssetType.IMAGE);

    //for shop
    game.loadAsset('shopScreen','backgrounds/shop_screen.png', aotb_game.AssetType.IMAGE);
		game.loadAsset('nextButton','buttons/next_button.png', aotb_game.AssetType.IMAGE);
		game.loadAsset('exitButton','buttons/exit_button.png', aotb_game.AssetType.IMAGE);
		game.loadAsset('shopMusic', 'shopMusic.mp3', aotb_game.AssetType.AUDIO);
		game.loadAsset('dog', 'dog-placeholder.png', aotb_game.AssetType.IMAGE);
		game.loadAsset('gun', 'gun.png', aotb_game.AssetType.IMAGE);
		game.loadAsset('ak47', 'ak-47.png', aotb_game.AssetType.IMAGE);

    // for name screen
    game.loadAsset('nameScreen','backgrounds/name_screen.png', aotb_game.AssetType.IMAGE);
  }

//starts the main menu 
  this.create = function(){

    this.time.events.add(Phaser.Timer.SECOND/2, function(){
      this.state.start('menu');
    }, this);
  }

  //adds the bar and % of when the game will start
  this.loadUpdate = function(){

    loadPercent = this.load.progress;
    percentText.setText(loadPercent + '%');
    preloadBar.scale.x = loadPercent * 0.01;
  }
}