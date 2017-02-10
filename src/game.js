
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('player', './assets/images/player.png');
    game.load.image('bubble', './assets/images/bubble.png');
    game.load.image('camel', './assets/images/single_camel.gif');
    game.load.audio('intro', './assets/sounds/introMusic.ogg');
}

//music (so we adjust valume in functions later)
var music;

var player;
var cursors;
var numBubbles = 10;
var numCamels = 5;

//bubble physics group
var bubblesGroup;
var camelsGroup;

//bubble collision groups
var playerCollisionGroup;
var bubbleCollisionGroup;
var camelCollisionGroup;

//array of bubble and camel sprites
var bubbles = [numBubbles];
var camels= [numCamels];

function create() {
	//background 
    game.stage.backgroundColor = '#DE9C04';

    //music
    music = game.add.audio('intro');
    music.play();

    //Enable P2 Physics
    game.physics.startSystem(Phaser.Physics.P2JS);

    //  Turn on impact events for the world, without this we get no collision callbacks
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.restitution = 0;

    //  Create our collision groups. One for the player, one for the bubblesGroup, one for the camelsGroup
    var playerCollisionGroup = game.physics.p2.createCollisionGroup();
    var bubbleCollisionGroup = game.physics.p2.createCollisionGroup();
    var camelCollisionGroup = game.physics.p2.createCollisionGroup();

    //  This part is vital if you want the objects with their own collision groups to still collide with the world bounds
    //  (which we do) - what this does is adjust the bounds to use its own collision group.
    game.physics.p2.updateBoundsCollisionGroup();

    //bubbles group
    bubblesGroup = game.add.group();
    bubblesGroup.enableBody = true;
    bubblesGroup.physicsBodyType = Phaser.Physics.P2JS;

    for (var i = 0; i < numBubbles; i++){
        bubbles[i] = bubblesGroup.create(game.world.randomX, game.world.randomY, 'bubble');
        bubbles[i].scale.set(0.3);
        bubbles[i].body.setCircle(24);
        bubbles[i].body.setCollisionGroup(bubbleCollisionGroup);
        bubbles[i].body.fixedRotation = true;
        bubbles[i].body.collides([bubbleCollisionGroup, playerCollisionGroup, camelCollisionGroup]);
   		}

    //camels group
    camelsGroup = game.add.group();
    camelsGroup.enableBody = true;
    camelsGroup.physicsBodyType = Phaser.Physics.P2JS;

    for (var i = 0; i < numCamels; i++){
    	camels[i] = camelsGroup.create(game.world.RandomX,game.world.RandomX,'camel');
    	camels[i].scale.setTo(0.5);
    	camels[i].body.setRectangle(40);
    	camels[i].body.setCollisionGroup(camelCollisionGroup);
    	camels[i].body.fixedRotation = true;
    	camels[i].body.collides([camelCollisionGroup, bubbleCollisionGroup, playerCollisionGroup]);
    	}

    //  Create our player sprite
    player = game.add.sprite(200, 200, 'player');
    player.scale.set(0.1);

    game.physics.p2.enable(player, false);
    player.body.setCircle(24);
    player.body.fixedRotation = true;

    //  Set the players collision group
    player.body.setCollisionGroup(playerCollisionGroup);

    //  The player will collide with the bubblesGroup, and when it strikes one the hitPanda callback will fire, causing it to alpha out a bit
    //  When bubblesGroup collide with each other, nothing happens to them.
    player.body.collides(bubbleCollisionGroup, bumpBubble, this);

    cursors = game.input.keyboard.createCursorKeys();
}

//  body1 is the player (as it's the body that owns the callback)
//  body2 is the body it impacted with, its the body of the bubble :
function bumpBubble(playerBody, bubbleBody) {
    bubbleBody.sprite.alive = false;
    bubbleBody.sprite.pendingDestroy = true;
}

function camelBubbleHit(camelBody, bubbleBody){
	camelBody.sprite.alive = false;
	camelBody.sprite.pendingDestory = true;
}


function update() {

	//check whether camel has collided with a bubble every frame
	for (var i = 0; i < numCamels; i++){
			//console.log(i);
			//camels[i].body.collides(bubbleCollisionGroup, camelBubbleHit, this);
			//camels[i].body.createGroupCallback(bubbleCollisionGroup, camelBubbleHit, this);
		}

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
    game.debug.text("Bubbles: " + bubblesGroup.countLiving() + " camels: " + camelsGroup.countLiving(), 32, 32);
}