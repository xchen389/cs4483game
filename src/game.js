
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('player', './assets/images/player.png');
    game.load.image('bubble', './assets/images/bubble.png');
    game.load.image('camel', './assets/images/single_camel.gif');
}

var player;
var cursors;

function create() {

    game.stage.backgroundColor = '#DE9C04';

    //  Enable P2
    game.physics.startSystem(Phaser.Physics.P2JS);

    //  Turn on impact events for the world, without this we get no collision callbacks
    game.physics.p2.setImpactEvents(true);

    game.physics.p2.restitution = 0.8;

    //  Create our collision groups. One for the player, one for the bubbles
    var playerCollisionGroup = game.physics.p2.createCollisionGroup();
    var bubbleCollisionGroup = game.physics.p2.createCollisionGroup();

    //  This part is vital if you want the objects with their own collision groups to still collide with the world bounds
    //  (which we do) - what this does is adjust the bounds to use its own collision group.
    game.physics.p2.updateBoundsCollisionGroup();

    var bubbles = game.add.group();
    bubbles.enableBody = true;
    bubbles.physicsBodyType = Phaser.Physics.P2JS;

    for (var i = 0; i < 4; i++)
    {
        var bubble = bubbles.create(game.world.randomX, game.world.randomY, 'bubble');
        bubble.scale.set(0.3);
        bubble.body.setCircle(24);

        //  Tell the panda to use the pandaCollisionGroup 
        bubble.body.setCollisionGroup(bubbleCollisionGroup);

        //  bubbles will collide against themselves and the player
        //  If you don't set this they'll not collide with anything.
        //  The first parameter is either an array or a single collision group.
        bubble.body.collides([bubbleCollisionGroup, playerCollisionGroup]);
    }

    //  Create our player sprite
    player = game.add.sprite(200, 200, 'player');
    player.scale.set(0.1);

    camel = game.add.sprite(400,300,'camel');
    camel.scale.setTo(0.5);


    game.physics.p2.enable(player, false);
    player.body.setCircle(24);
    player.body.fixedRotation = true;

    //  Set the players collision group
    player.body.setCollisionGroup(playerCollisionGroup);

    //  The player will collide with the bubbles, and when it strikes one the hitPanda callback will fire, causing it to alpha out a bit
    //  When bubbles collide with each other, nothing happens to them.
    player.body.collides(bubbleCollisionGroup, hitBubble, this);

    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();

}

function hitBubble(body1, body2) {

    //  body1 is the space player (as it's the body that owns the callback)
    //  body2 is the body it impacted with, in this case our panda
    //  As body2 is a Phaser.Physics.P2.Body object, you access its own (the sprite) via the sprite property:
    body2.sprite.alpha -= 0.1;

}

function update() {

    player.body.setZeroVelocity();

    if (cursors.left.isDown)
    {
        player.body.moveLeft(200);
    }
    else if (cursors.right.isDown)
    {
        player.body.moveRight(200);
    }

    if (cursors.up.isDown)
    {
        player.body.moveUp(200);
    }
    else if (cursors.down.isDown)
    {
        player.body.moveDown(200);
    }

}

function render() {

    game.debug.text('Collide with the bubbles!', 32, 32);

}
