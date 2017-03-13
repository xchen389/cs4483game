
//set the game to fit in this DIV
//all new states of the game must be within this game 
var main = new Phaser.Game(1280, 800, Phaser.CANVAS, 'gameDiv')

//load all the states before you get to menu
main.state.add('game', game);
main.state.add('menu', menu);
main.state.add('credits', credits);
main.state.add('shop', shop);

main.state.start('menu');