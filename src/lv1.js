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