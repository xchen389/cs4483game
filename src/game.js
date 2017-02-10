
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game1', { preload: preload, create: create, update: update, render: render});

function preload () {
	game.load.image("bubble", "./assets/images/bubble.png");
	game.load.image("human", "./assets/images/human.png");
	game.load.image("camel", "./assets/images/single_camel.gif");
}

var player;
var cursors;
var camel;

function create () {

    //stage background color
    game.stage.backgroundColor = '#DE9C04';

    //enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.restitution = 0.8;

    //create collision groups. One for player, one for camel, one for bubbles
    var playerCollisionGroup = game.physics.p2.createCollisionGroup();
    var camelCollisionGroup = game.physics.p2.createCollisionGroup();
    var bubbleCollisionGroup = game.physics.p2.createCollisionGroup();

    game.physics.p2.updateBoundsCollisionGroup();
    		
    var bubbles = game.add.group();
    bubbles.enableBody = true;
    bubbles.physicsBodyType = Phaser.Physics.P2JS;

    for (var i = 0; i < 4; i++){
    	//generate the bubbles
    	var bubble = bubbles.create(game.world.randomX, game.world.randomY, 'bubble');
    	bubble.body.setRectange(40,40);
    	//put bubble in its collision group, and tell it that it colldies with camels and player
    	bubble.body.setCollisionGroup(bubbleCollisionGroup);
    	bubble.body.collides([playerCollisionGroup, camelCollisionGroup, bubbleCollisionGroup]);	
   	}

    //create camel and player
    camel = game.add.sprite(400,300,'camel');
    player = game.add.sprite(500,300,'human');
    player.scale.setTo(0.1,0.1);
    camel.scale.setTo(0.5,0.5);

    game.physics.p2.enable(player);
    player.body.setRectange(40,40);
    player.body.setCollisionGroup(playerCollisionGroup);

    game.physics.p2.enable(camel);
    camel.body.setRectange(40,40);
    camel.body.setCollisionGroup(camelCollisionGroup);

    player.body.collides(bubbleCollisionGroup, popBubble, this);

    //game.camera.follow(player);

    //Arrow Key Movement
    cursors = game.input.keyboard.createCursorKeys();
    }

    function popBubble(player,bubble){
       	bubble.sprite.alpha -= 0.1;
    }

    function update(){

        player.body.setZeroVelocity();

        if (cursors.left.isDown){
        	player.body.moveLeft(300);
        }
        else if (cursors.right.isDown){
        	player.body.moveRight(300);
        }

        if (cursors.up.isDown){
        	player.body.moveUp(300);
        }
        else if (cursors.down.isDown){
        	player.body.moveDown(300);
        }
    }

    function render(){
        game.debug.text('Collide with the bubbles', 32,32);
    }


