
//set the game to fit in this DIV
//all new states of the game must be within this game 
var main = new Phaser.Game("98%","98%", Phaser.CANVAS, 'gameDiv')

main.state.add('menu', menu);

main.state.add('play', play);

main.state.add('game', game);

main.state.add('credits', credits);

main.state.start('menu');