//loading stage of the game 

//boot stage of the game
aotb_game.bootStage = function(){

  //var game = aotb_game.game;
  var game = this;

  this.init = function(){

    //setup scale
		this.scale.windowConstraints.bottom = "visual";
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		// set the canvas at centre
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

    //set background colour of loading screen
    this.stage.backgroundColor = '#222222';

    //Enable P2 Physics
    game.physics.startSystem(Phaser.Physics.P2JS);
  }

  this.preload = function(){
    if (aotb_game.initialized)
    {
      // load assets for loading screen
    }
  }

  //starts the preloader file
  this.create = function(){
    this.state.start('preloader');
  }
}