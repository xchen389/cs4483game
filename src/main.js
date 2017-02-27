var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example');

game.state.add('Menu', Menu);

game.state.add('Game', Game);

game.state.add('Credits',Credits);

game.state.start('Menu');