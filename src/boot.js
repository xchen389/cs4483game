aotb_game.bootStage = function()
{
  var game = aotb_game.game;
  var pgame = this;

  this.init = function()
  {
    //setup scale
		this.scale.windowConstraints.bottom = "visual";
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		// put the canvas at centre
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

    this.stage.backgroundColor = '#ffffff';

    //Enable P2 Physics
    pgame.physics.startSystem(Phaser.Physics.P2JS);
  }

  this.preload = function()
  {
    if (aotb_game.initialized)
    {
      // load assets for loading screen
    }
  }

  this.create = function()
  {
    this.state.start('preloader');
  }
}