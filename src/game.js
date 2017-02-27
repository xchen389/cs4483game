//music 
var music;
var popSound;
var ouchSound;

var musicButton; //TO-DO
var FXButton; //TO-DO 

var player;
var cursors;

//change these depending on how many bubbles and want
var numBubbles = 15;
var numCamels = 5;

// sprite groups (only done for when there is more than one sprite in each group)
var bubblesGroup;
var camelsGroup;
var fullBubbleGroup;

//collision groups
var playerCollisionGroup;
var bubbleCollisionGroup;
var camelCollisionGroup;
var fullBubbleCollisionGroup;

//array of bubble and camel sprites
var bubbles = [numBubbles];
var camels= [numCamels];


//These are loaded to the cache so we can use them in the game
var Game = {
    preload:function() {
        game.load.image('player', './assets/images/player.png');
        game.load.image('bubble', './assets/images/bubble.png');
        game.load.image('camel', './assets/images/single_camel.gif');
        game.load.image('fullBubble', './assets/images/full_bubble.png');
        game.load.image('musicButton', './assets/images/musicToggle.png');
        game.load.audio('intro', './assets/sounds/introMusic.ogg');
        game.load.audio('pop', './assets/sounds/bubble_pop.mp3');
        game.load.audio('camel_ouch', './assets/sounds/camel_ouch.mp3');
    },

    // runs a single time when the game instance is created
    create:function(){
    	//background 
        game.stage.backgroundColor = '#DE9C04';

        //music
        music = game.add.audio('intro');
        
        //music.play();

        popSound = game.add.audio('pop');
        ouchSound = game.add.audio('camel_ouch');

        //Enable P2 Physics
        game.physics.startSystem(Phaser.Physics.P2JS);

        //  Turn on impact events for the world, without this we get no collision callbacks
        game.physics.p2.setImpactEvents(true);
        game.physics.p2.restitution = 0;

        //  Create our collision groups. One for the player, one for the bubblesGroup, one for the camelsGroup
        playerCollisionGroup = game.physics.p2.createCollisionGroup();
        bubbleCollisionGroup = game.physics.p2.createCollisionGroup();
        camelCollisionGroup = game.physics.p2.createCollisionGroup();
        fullBubbleCollisionGroup = game.physics.p2.createCollisionGroup();

        //  This part is vital if you want the objects with their own collision groups to still collide with the world bounds
        //  (which we do) - what this does is adjust the bounds to use its own collision group.
        game.physics.p2.updateBoundsCollisionGroup();

        // full bubble group
        fullBubbleGroup = game.add.group();
        fullBubbleGroup.enableBody = true;
        fullBubbleGroup.physicsBodyType = Phaser.Physics.P2JS;

        // bubbles group
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
        	camels[i] = camelsGroup.create(game.world.randomX/2,game.world.randomY/2,'camel');
        	camels[i].scale.setTo(0.5);
        	camels[i].body.setRectangle(40);
        	camels[i].body.setCollisionGroup(camelCollisionGroup);
        	camels[i].body.fixedRotation = true;
            camels[i].body.collides(bubbleCollisionGroup, camelBubbleHit, this);
        	}

        // Create our player sprite
        player = game.add.sprite(200, 200, 'player');
        player.scale.set(0.1);

        game.physics.p2.enable(player, false);
        player.body.setCircle(24);
        player.body.fixedRotation = true;

        // Set the players collision group
        player.body.setCollisionGroup(playerCollisionGroup);

        // The player will collide with the bubblesGroup, and when it strikes one the hitPanda callback will fire, causing it to alpha out a bit
        // When bubblesGroup collide with each other, nothing happens to them.
        player.body.collides(bubbleCollisionGroup, bumpBubble, this);

        // controls
        cursors = game.input.keyboard.createCursorKeys();
    },
    //runs continuously. 
    update:function(){

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

}

// body1 is the player (as it's the body that owns the callback)
// body2 is the body it impacted with, its the body of the bubble :
function bumpBubble(playerBody, bubbleBody) {
    bubbleBody.sprite.alive = false;
    bubbleBody.sprite.pendingDestroy = true;
    popSound.play();
}

function musicToggle(){
    music.stop();
}

// body1 is the camel
// body 2 is the bubble
// trigger event to put create camel inside bubble sprite, and pull towards corners
function camelBubbleHit(camelBody, bubbleBody){

    // create full_bubble sprite
    fullBubble = fullBubbleGroup.create(bubbleBody.sprite.position.x, bubbleBody.sprite.position.y, 'fullBubble');
    fullBubble.scale.set(0.5);

    //destroy bubble
	bubbleBody.sprite.alive = false;
    bubbleBody.sprite.pendingDestroy = true;

    //destroy camel
    camelBody.sprite.alive = false;
    camelBody.sprite.pendingDestroy = true;

    ouchSound.play();
    
    // create and enable full_bubble collisions/functions etc

    fullBubble.enableBody = true;;
    fullBubble.body.setCollisionGroup(fullBubbleCollisionGroup);
    player.body.collides(fullBubbleCollisionGroup, bumpFullBubble,this);

}

// body 1 is the player
// body 2 is the full bubble
// method should destroy fullBubble, and put camel back
function bumpFullBubble(playerBody, fullBubbleBody){

    // create new camel to camel group
    new_camel = camelsGroup.create(fullBubbleBody.sprite.position.x, fullBubbleBody.sprite.position.y, 'camel');
    new_camel.scale.setTo(0.5);

    // destroy full-bubble sprite
    fullBubbleBody.sprite.alive = false;
    fullBubbleBody.sprite.pendingDestroy = true;

    // create and enable new_camel collisions and functions etc
    new_camel.body.setRectangle(40);
    new_camel.body.setCollisionGroup(camelCollisionGroup);
    new_camel.body.fixedRotation = true;
    new_camel.body.collides(bubbleCollisionGroup, camelBubbleHit, this);
}


//runs continously
function render() {
    game.debug.text("Bubbles: " + bubblesGroup.countLiving() + " camels: " + camelsGroup.countLiving(), 32, 32);
}




