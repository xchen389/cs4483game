//music and fx
var music;
var popSound;
var ouchSound;

var counterText; //Camel and Bubble Count Text

var player;
var cursors;
var wasd;

//change these depending on how many bubbles and want
var numBubbles = 0;

var numCamels = 5;
var camelsRemained = numCamels;
var numFullBubbles = 0;

var time = 120;

// sprite groups (only done for when there is more than one sprite in each group)
var bubblesGroup;
var camelsGroup;
var fullBubbleGroup;

//collision groups (Full Bubble = bubble with camel inside)
var playerCollisionGroup;
var bubbleCollisionGroup;
var camelCollisionGroup;
var fullBubbleCollisionGroup;
var customBounds;
var bounds;

//game object definiton
var game = {

    //These are loaded to the cache so we can use them in the game
    preload:function() {
        game.load.image('player', './assets/images/player.png');
        game.load.image('bubble', './assets/images/bubble.png');
        game.load.image('camel', './assets/images/single_camel.gif');
        game.load.image('fullBubble', './assets/images/fullBubble.png');
        game.load.image('pauseButton', './assets/images/buttons/pause_button.png');
        game.load.image('background', './assets/images/backgrounds/gamebackground_screen.png');
        game.load.image('pauseScreen', './assets/images/backgrounds/pause_screen.png');
        game.load.image('mainMenuButton', './assets/images/buttons/mainMenu_button.png');
        game.load.audio('pop', './assets/sounds/bubble_pop.mp3');
        game.load.audio('camel_ouch', './assets/sounds/camel_ouch.mp3');
        game.load.audio('gameMusic', './assets/sounds/gameMusic.mp3');
    },

    // runs a single time when the game instance is created
    create:function() {

	    //background 
        //game.stage.backgroundColor = '#DE9C04';
        game.add.tileSprite(0,0, 1280, 800, 'background');

        //Code for pause Menu
        pauseButton = game.add.button(1170,10, 'pauseButton');
        pauseButton.width = 100;
        pauseButton.height = 35;
        pauseButton.inputEnabled = true;

        //pause menu variables 
        var menu;
        var menuH;
        var menuW;
        var mainMenuButton;
        var musicText;
        var FxText;

        pauseButton.events.onInputUp.add(

            function(){
                //game.paused doesn't work by itself, need to freeze everything
                game.game.paused = true;
                menu = game.add.sprite(160, 100, 'pauseScreen');

                menuH = menu.height;
                menuW = menu.width; 

                mainMenuButton = game.add.button(w/2, h-230, 'mainMenuButton');
                mainMenuButton.anchor.setTo(0.5,0.5);
                mainMenuButton.height = 60;
                mainMenuButton.width = 200;

                choiceLabel = game.add.text(w/2,h-150, 'Click Outside the Menu To Continue', { font:
                    '30px Arial', fill: '#000'});
                choiceLabel.anchor.setTo(0.5,0.5);

                musicText = game.add.text(w/2-420, h/2 + 150, "Music Volume: " + musicVolume*100);
                fxText = game.add.text(w/2-420, h/2 + 180, "FX Volume: " + fxVolume*100);
            }
        );

        // if user presses click check if unpause, unpause
        this.input.onDown.add(unpause, self);

        function unpause(event){

            // Only act if paused
            if(game.game.paused){

                // corners of the pause menu
                var x1 = 160, x2 = 160 + menuW,
                y1 = 100, y2 = 100 + menuH;

                // Check if the click was inside the menu
                if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){

                   //check if it hit the mainMenuButton
                   if(event.x > w/2 - mainMenuButton.width/2 &&
                    event.x < w/2 + mainMenuButton.width/2 &&
                    event.y > (h-230) - mainMenuButton.height/2 &&
                    event.y < (h-230) + mainMenuButton.height/2
                    ){
                        game.game.paused = false;
                        main.state.start('menu');
                   }

                   //check where it hit in the FX/Music Space
                   
                   //music section
                    if(event.y < 369 && event.y > 244){
                        // range is 170-1107
                        //transform it to 0-1, set musicVolume
                        clickx = event.x - 170;
                        musicVolume = (clickx/937).toFixed(2);
                        musicText.setText("Music Volume: " + (musicVolume*100).toFixed(0));
                   }
                   //fx section
                    if(event.y < 507 && event.y > 382){
                        //same as music section
                        clickx = event.x - 170;
                        fxVolume = (clickx/937).toFixed(2);
                        fxText.setText("FX Volume: " + (fxVolume*100).toFixed(0));
                   }   

                }
                else{
                    //remove everything used in the pause menu
                    menu.destroy();
                    mainMenuButton.destroy();
                    choiceLabel.destroy();
                    musicText.destroy();
                    fxText.destroy();

                    //adjust volumes accordingly
                    music.volume = musicVolume;

                    popSound.volume = fxVolume;
                    ouchSound.volume = fxVolume;

                    // Unpause the game
                    game.game.paused = false;
                }
            }
        };

        //FX
        popSound = game.add.audio('pop');
        ouchSound = game.add.audio('camel_ouch');
        popSound.volume = fxVolume;
        ouchSound.volume = fxVolume;

        //music 
        music = this.add.audio('gameMusic');
        music.volume = musicVolume;
        music.loop = true;
        music.play();

        /*
        // for earthquake effect, add margin to the world, so the camera can move
        var margin = 50;
        // and set the world's bounds according to the given margin
        var x = -margin;
        var y = -margin;
        var w = game.world.width + margin * 2;
        var h = game.world.height + margin * 2;
        game.world.setBounds(x, y, w, h);
        // make sure camera at 0
        game.world.camera.position.set(0);
        */

        //Enable P2 Physics
        game.physics.startSystem(Phaser.Physics.P2JS);

        //  Turn on impact events for the world, without this we get no collision callbacks
        game.physics.p2.setImpactEvents(true);
        game.physics.p2.restitution = 0;

        //shrink the bounds by 7px to account for the black border TO DO
        //So far I think it works, but you can remove it it's being dumb
        game.world.setBounds(0,0,1280-7, 800-7);

        //  The bounds of centre camel playground
        // the width and height are wrong from game.world.width after adding quake effect
        bounds = new Phaser.Rectangle(1280/4, 800/4, 1280/2, 800/2);

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

        //camels group
        camelsGroup = game.add.group();
        camelsGroup.enableBody = true;
        camelsGroup.physicsBodyType = Phaser.Physics.P2JS;

        for (var i = 0; i < numCamels; i++){
        	// Camel spawn positions
        	CSx = Math.random() * (850 - 450) + 450;
        	CSy = Math.random() * (550 - 350) + 350;
        	createCamel(CSx, CSy);
        }

        //To move camels
        game.time.events.loop(Phaser.Timer.SECOND * 1.5, moveCamels, this); 

        //To move full bubbles
        game.time.events.loop(Phaser.Timer.SECOND * 0.5, moveBubbles, this); 

        //To move full bubbles
        game.time.events.loop(Phaser.Timer.SECOND * 0.5, moveFullBubbles, this); 

        //To move full bubbles
        game.time.events.loop(Phaser.Timer.SECOND * 4, createBubbles, this); 


        //Timer
        game.time.events.loop(Phaser.Timer.SECOND, timer, this); 

        // Create our player sprite
        player = game.add.sprite(200, 200, 'player');
        player.scale.set(0.1);

        game.physics.p2.enable(player, false);
        player.body.setCircle(24);
        player.body.fixedRotation = true;

        // Set the players collision group
        player.body.setCollisionGroup(playerCollisionGroup);

        // When player colides with bubbles or fullbubbles, the function in second parameter is called. 
        player.body.collides(bubbleCollisionGroup, bumpBubble, this);
        player.body.collides(fullBubbleCollisionGroup, bumpFullBubble, this);

        //  Create a new custom sized bounds, within the world bounds
        customBounds = { left: null, right: null, top: null, bottom: null };

        createPreviewBounds(bounds.x, bounds.y, bounds.width, bounds.height);

        //  Just to display the inner bounds
        var graphics = game.add.graphics(bounds.x, bounds.y);
        graphics.lineStyle(4, 0xff0000, 1);
        graphics.drawRect(0, 0, bounds.width, bounds.height);


        // controls
        cursors = game.input.keyboard.createCursorKeys();
        
        wasd = {
            left:game.input.keyboard.addKey(Phaser.Keyboard.A),
            right:game.input.keyboard.addKey(Phaser.Keyboard.D),
            up:game.input.keyboard.addKey(Phaser.Keyboard.W),
            down:game.input.keyboard.addKey(Phaser.Keyboard.S)
        };

        // remove key capture so they don't flood to browser
        game.input.keyboard.removeKeyCapture(Phaser.Keyboard.A);
        game.input.keyboard.removeKeyCapture(Phaser.Keyboard.D);
        game.input.keyboard.removeKeyCapture(Phaser.Keyboard.W);
        game.input.keyboard.removeKeyCapture(Phaser.Keyboard.S);

        counterText = this.add.text(15,10,"Time: " + time + " Camels: " + numCamels );

    },

    //runs continuously. 
    update:function() {

        player.body.setZeroVelocity();

        if (cursors.left.isDown || wasd.left.isDown)
        {
            player.body.moveLeft(200);
        }
        else if (cursors.right.isDown || wasd.right.isDown)
        {
            player.body.moveRight(200);
        }

        if (cursors.up.isDown || wasd.up.isDown)
        {
            player.body.moveUp(200);
        }
        else if (cursors.down.isDown || wasd.down.isDown)
        {
            player.body.moveDown(200);
        }

        //winning condition - go to shop
        if(time == 0 )
        	game.state.start('shop');

        /* if camels are ever 0, game over - exit game
        if(camelsGroup.countLiving() == 0)
        	//losing condition
        */

        //losing condition
        if(camelsRemained < 2)
        	main.state.start('gameover');
    },

    //called when this state is exited e.g., you switch to another state
    shutdown: function(){
        music.stop();
    }

}

//Helper Methods

//call this everytime bubble pops
function updateCounterText(){
    //add formatting for text later
    counterText.setText("Time: " + time + " Camels: " + numCamels);
}

function addQuake() {

  // define the camera offset for the quake
  var rumbleOffset = 7;
  
  // we need to move according to the camera's current position
  var properties = { x: game.camera.x - rumbleOffset};

  // we make it a relly fast movement
  var duration = 50;
  // because it will repeat
  var repeat = 2;
  // we use bounce in-out to soften it a little bit
  var ease = Phaser.Easing.Bounce.InOut;
  var autoStart = false;
  // no delay because we will run it only once
  var delay = 0;
  // we want to go back to the original position
  var yoyo = true;
  
  var quake = game.add.tween(game.camera)
  .to(properties, duration, ease, autoStart, delay, 4, yoyo);
  
  // let the earthquake begins
  quake.start();
}

// body1 is the player (as it's the body that owns the callback)
// body2 is the body it impacted with, its the body of the bubble :
function bumpBubble(playerBody, bubbleBody) {
    popSound.play();
    numBubbles--;
    updateCounterText();
    bubbleBody.sprite.alive = false;
    bubbleBody.sprite.pendingDestroy = true;
}

// body1 is the camel
// body 2 is the bubble
// trigger event to put create camel inside bubble sprite, and pull towards corners
function camelBubbleHit(camelBody, bubbleBody){
    // add earthquake effect
    addQuake();
    ouchSound.play();

    // create full_bubble sprite where original bubble was
    createfullBubble(bubbleBody.sprite.position.x, bubbleBody.sprite.position.y);

    //destroy bubble
    bubbleBody.sprite.alive = false;
    bubbleBody.sprite.pendingDestroy = true;
    bubblesGroup.remove(bubbleBody);
    numBubbles--;

    //destroy camel
    camelBody.sprite.alive = false;
    camelBody.sprite.pendingDestroy = true;
    camelsGroup.remove(camelBody);
    numCamels--;
}

// body 1 is the player
// body 2 is the full bubble
// method should destroy fullBubble, and put camel back
function bumpFullBubble(playerBody, fullBubbleBody){
    popSound.play();
    numBubbles--;
    //create new camel at where fullBubble was
    new_camel = createCamel(fullBubbleBody.sprite.position.x, fullBubbleBody.sprite.position.y);

    // destroy full-bubble sprite
    fullBubbleBody.sprite.alive = false;
    fullBubbleBody.sprite.pendingDestroy = true;
    updateCounterText();
}

function createfullBubble(x,y){
    fullBubble = fullBubbleGroup.create(x,y, 'fullBubble');
    fullBubble.scale.set(0.37);
    fullBubble.enableBody = true;
    fullBubble.body.setCircle(24);
    fullBubble.body.setCollisionGroup(fullBubbleCollisionGroup);
    fullBubble.body.collides([playerCollisionGroup]);
    numFullBubbles++;
}

function createBubble(x,y){
    new_bubble = bubblesGroup.create(x, y, 'bubble');
    new_bubble.scale.set(0.3);
    new_bubble.body.setCircle(24);
    new_bubble.body.setCollisionGroup(bubbleCollisionGroup);
    new_bubble.body.fixedRotation = true;
    new_bubble.body.collides([bubbleCollisionGroup, playerCollisionGroup, camelCollisionGroup]);
    numBubbles++;
}

// body 1 is the player
// body 2 is the full bubble
// method should destroy fullBubble, and put camel back
function bumpFullBubble(playerBody, fullBubbleBody){

    //create new camel at where fullBubble was
    new_camel = createCamel(fullBubbleBody.sprite.position.x, fullBubbleBody.sprite.position.y);
    numCamels++;

    // destroy full-bubble sprite
    numFullBubbles--;
    fullBubbleBody.sprite.alive = false;
    fullBubbleBody.sprite.pendingDestroy = true;
    fullBubbleGroup.remove(fullBubbleBody);

    popSound.play();
}

function createCamel(x,y){
    new_camel = camelsGroup.create(x, y, 'camel');
    new_camel.scale.setTo(0.5);
    new_camel.body.setRectangle(40);
    new_camel.body.setCollisionGroup(camelCollisionGroup);
    new_camel.body.fixedRotation = true;
    new_camel.body.collides(bubbleCollisionGroup, camelBubbleHit, this);

}

function createBubbles(){
	randX = game.rnd.integerInRange(1, 4);    
	if(randX == 1){
		x = -20;
		randY = game.rnd.integerInRange(1, 5);
		if(randY == 1){
			y = 0;
		}
		else if(randY == 2){
			y = 100;
		}
		else if(randY == 3){
			y = 200;
		}
		else if(randY == 4){
			y = 300;
		}
		else {
			y = 400;
		}
	}
	else if(randX == 2){
		x = 1300;
		randY = game.rnd.integerInRange(1, 5);
		if(randY == 1){
			y = 0;
		}
		else if(randY == 2){
			y = 100;
		}
		else if(randY == 3){
			y = 200;
		}
		else if(randY == 4){
			y = 300;
		}
		else{
			y = 400;
		}
	}
	else if(randX == 3){
		y = -20;
		randY = game.rnd.integerInRange(1, 5);
		if(randY == 1){
			x = 0;
		}
		else if(randY == 2){
			x = 200;
		}
		else if(randY == 3){
			x = 400;
		}
		else if(randY == 4){
			x = 800;
		}
		else if(randY == 5){
			x = 1000;
		}
	}

	else {
		y = 820;
		randY = game.rnd.integerInRange(1, 5);
		if(randY == 1){
			x = 0;
		}
		else if(randY == 2){
			x = 200;
		}
		else if(randY == 3){
			x = 400;
		}
		else if(randY == 4){
			x = 800;
		}
		else if(randY == 5){
			x = 1000;
		}
	}
	
    createBubble(x, y);	
}


function moveCamels() {

	for(var i=0 ; i<numCamels ; i++){
		camelsGroup.getAt(i).body.setZeroVelocity();
        // randomise the movement   
        CamelsMover = game.rnd.integerInRange(1, 7);    
        // simple if statement to choose if and which way the baddie moves  
        if (CamelsMover == 1) {
            if(camelsGroup.getAt(i).x < 450)        
            camelsGroup.getAt(i).body.velocity.x = 50;
            else        
                camelsGroup.getAt(i).body.velocity.x = -50;
            
        }   
        else if(CamelsMover == 2) 
        {
            if(camelsGroup.getAt(i).x > 850)        
            camelsGroup.getAt(i).body.velocity.x = -50;
            else
                camelsGroup.getAt(i).body.velocity.x = 50;
        }   
        else if (CamelsMover == 3) {
            if(camelsGroup.getAt(i).y < 350)
            camelsGroup.getAt(i).body.velocity.y = 50;
            else
                camelsGroup.getAt(i).body.velocity.y = -50; 
        }   
        else if (CamelsMover == 4) {
            if(camelsGroup.getAt(i).y > 500)        
            camelsGroup.getAt(i).body.velocity.y = -50;
            else
                camelsGroup.getAt(i).body.velocity.y = 50;
        }   
        else {      
            camelsGroup.getAt(i).body.velocity.x = 0;       
            
        }
	}
}	


function moveFullBubbles() {
	for(var i=0 ; i<numFullBubbles ; i++){
		xPos = Math.abs(fullBubbleGroup.getAt(i).x - 1300);
		xMin = Math.abs(fullBubbleGroup.getAt(i).x - 0);

		yPos = Math.abs(fullBubbleGroup.getAt(i).y - 820);
		yMin = Math.abs(fullBubbleGroup.getAt(i).y - 0);

		if(xPos<xMin && xPos<yMin && xPos<yPos)
			fullBubbleGroup.getAt(i).body.velocity.x = 90;
		else if(xMin<yMin && xMin<yPos && xMin<xPos)
			fullBubbleGroup.getAt(i).body.velocity.x = -90;
		else if(yPos<yMin && yPos<xPos && yPos<xMin)
			fullBubbleGroup.getAt(i).body.velocity.y = 90;
		else
			fullBubbleGroup.getAt(i).body.velocity.y = -90;

		if(fullBubbleGroup.getAt(i).y > 750 || fullBubbleGroup.getAt(i).y < 50 || fullBubbleGroup.getAt(i).x > 1000 || fullBubbleGroup.getAt(i).x < 50){
			numFullBubbles--;
			camelsRemained--;
			fullBubbleGroup.remove(fullBubbleGroup.getAt(i));
		}
	}
}	

function moveBubbles() {

	for(var i=0 ; i<numBubbles ; i++){
		if(bubblesGroup.getAt(i).x>700){
			bubblesGroup.getAt(i).body.velocity.x = -70;
		}
		if(bubblesGroup.getAt(i).y>400){
			bubblesGroup.getAt(i).body.velocity.y = -70;
		}
		if(bubblesGroup.getAt(i).x<700)
			bubblesGroup.getAt(i).body.velocity.x = 70;
		if(bubblesGroup.getAt(i).y<400)
			bubblesGroup.getAt(i).body.velocity.y = 70;
	}
}	

function timer() {
	time--;
}

function createPreviewBounds(x,y,w,h){
    var sim = game.physics.p2;
    var mask = sim.boundsCollisionGroup.mask;

    customBounds.left = new p2.Body({ mass: 0, position: [ sim.pxmi(x), sim.pxmi(y) ], angle: 1.5707963267948966 });
    customBounds.left.addShape(new p2.Plane());
    // customBounds.left.shapes[0].collisionGroup = mask;

    customBounds.right = new p2.Body({ mass: 0, position: [ sim.pxmi(x + w), sim.pxmi(y) ], angle: -1.5707963267948966 });
    customBounds.right.addShape(new p2.Plane());
    // customBounds.right.shapes[0].collisionGroup = mask;

    customBounds.top = new p2.Body({ mass: 0, position: [ sim.pxmi(x), sim.pxmi(y) ], angle: -3.141592653589793 });
    customBounds.top.addShape(new p2.Plane());
    // customBounds.top.shapes[0].collisionGroup = mask;

    customBounds.bottom = new p2.Body({ mass: 0, position: [ sim.pxmi(x), sim.pxmi(y + h) ] });
    customBounds.bottom.addShape(new p2.Plane());
    // customBounds.bottom.shapes[0].collisionGroup = mask;

    sim.world.addBody(customBounds.left);
    sim.world.addBody(customBounds.right);
    sim.world.addBody(customBounds.top);
    sim.world.addBody(customBounds.bottom);
}