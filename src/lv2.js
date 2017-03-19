aotb_game.lv2 = function()
{
  var pgame = this;
  var levelbase;

  this.preload = function()
  {
    levelbase = new aotb_game.levelbase(pgame);
  };

  this.create = function()
  {
    levelbase.create(true);
  };

  this.update = function()
  {
    levelbase.defaultUpdate();
    levelbase.bulletUpdate();
  };

  this.shutdown = function()
  {
    levelbase.shutdown();
  }
};