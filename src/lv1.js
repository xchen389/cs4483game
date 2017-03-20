aotb_game.lv1 = function()
{
  var pgame = this;
  var levelbase;

  this.preload = function()
  {
    levelbase = new aotb_game.levelbase(pgame);
  };

  this.create = function()
  {
    levelbase.create();

    levelbase.displayText("First Night", 1, function(){
        pgame.add.tween(notificationText).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        notificationText.destroy();
    });
  };

  this.update = function()
  {
    levelbase.defaultUpdate();
  };

  this.shutdown = function()
  {
    levelbase.shutdown();
  }
};