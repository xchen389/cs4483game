//music and fx
var music;
var popSound;
var ouchSound;

var counterText; //Camel and Bubble Count Text
var notificationText;



var companion;



// sprite groups (only done for when there is more than one sprite in each group)
var bubblesGroup;
var camelsGroup;
var fullBubbleGroup;
var bullets;

//collision groups (Full Bubble = bubble with camel inside)
var playerCollisionGroup;
var bubbleCollisionGroup;
var camelCollisionGroup;
var fullBubbleCollisionGroup;
var companionCollisionGroup;
var bulletsCollisionGroup;

var customBounds;
var bounds;

//game object definiton
aotb_game.levelbase = function(pgame){
    var player;
    var cursors;
    var wasd;
    var fireButton;
    
    var nextFire = 0;

    //change these depending on how many bubbles and want
    var numBubbles = 0;

    var numCamels = 5;
    var camelsRemained = numCamels;
    var numFullBubbles = 0;

    var time = 120;

    var game = aotb_game.game;
    var self = this;

    // runs a single time when the game instance is created
    this.create=function(bulletEnable = false) {

	    //background 
        //game.stage.backgroundColor = '#DE9C04';
        pgame.add.tileSprite(0,0, 1280, 800, 'background');

        //Code for pause Menu
        pauseButton = pgame.add.button(1170,10, 'pauseButton');
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
                togglePause(true);
                pgame.game.paused = true;
                menu = pgame.add.sprite(160, 100, 'pauseScreen');

                menuH = menu.height;
                menuW = menu.width; 

                mainMenuButton = pgame.add.button(w/2, h-230, 'mainMenuButton');
                mainMenuButton.anchor.setTo(0.5,0.5);
                mainMenuButton.height = 60;
                mainMenuButton.width = 200;

                choiceLabel = pgame.add.text(w/2,h-150, 'Click Outside the Menu To Continue', { font:
                    '30px Arial', fill: '#000'});
                choiceLabel.anchor.setTo(0.5,0.5);

                musicText = pgame.add.text(w/2-420, h/2 + 150, "Music Volume: " + musicVolume*100);
                fxText = pgame.add.text(w/2-420, h/2 + 180, "FX Volume: " + fxVolume*100);
            }
        );

        // if user presses click check if unpause, unpause
        pgame.input.onDown.add(unpause, self);

        function unpause(event){

            // Only act if paused
            if(pgame.game.paused){

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
                        pgame.game.paused = false;
                        togglePause(false);
                        pgame.state.start('menu');
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
                    pgame.game.paused = false;
                    togglePause(false);
                }
            }
        };

        //FX
        popSound = pgame.add.audio('pop');
        ouchSound = pgame.add.audio('camel_ouch');
        popSound.volume = fxVolume;
        ouchSound.volume = fxVolume;

        //music 
        music = pgame.add.audio('gameMusic');
        music.volume = musicVolume;
        music.loop = true;
        music.play();

        /*
        // for earthquake effect, add margin to the world, so the camera can move
        var margin = 50;
        // and set the world's bounds according to the given margin
        var x = -margin;
        var y = -margin;
        var w = pgame.world.width + margin * 2;
        var h = pgame.world.height + margin * 2;
        pgame.world.setBounds(x, y, w, h);
        // make sure camera at 0
        pgame.world.camera.position.set(0);
        */

        //Enable P2 Physics
        //pgame.physics.startSystem(Phaser.Physics.P2JS);

        //  Turn on impact events for the world, without this we get no collision callbacks
        pgame.physics.p2.setImpactEvents(true);
        pgame.physics.p2.restitution = 0;

        //shrink the bounds by 7px to account for the black border TO DO
        //So far I think it works, but you can remove it it's being dumb
        pgame.world.setBounds(0,0,1280-7, 800-7);

        //  The bounds of centre camel playground
        // the width and height are wrong from pgame.world.width after adding quake effect
        bounds = new Phaser.Rectangle(1280/4, 800/4, 1280/2, 800/2);

        //  Create our collision groups. One for the player, one for the bubblesGroup, one for the camelsGroup
        playerCollisionGroup = pgame.physics.p2.createCollisionGroup();
        bubbleCollisionGroup = pgame.physics.p2.createCollisionGroup();
        camelCollisionGroup = pgame.physics.p2.createCollisionGroup();
        fullBubbleCollisionGroup = pgame.physics.p2.createCollisionGroup();
        companionCollisionGroup = pgame.physics.p2.createCollisionGroup();
        bulletsCollisionGroup = pgame.physics.p2.createCollisionGroup();
        

        //  This part is vital if you want the objects with their own collision groups to still collide with the world bounds
        //  (which we do) - what this does is adjust the bounds to use its own collision group.
        pgame.physics.p2.updateBoundsCollisionGroup();

        // full bubble group
        fullBubbleGroup = pgame.add.group();
        fullBubbleGroup.enableBody = true;
        fullBubbleGroup.physicsBodyType = Phaser.Physics.P2JS;

        // bubbles group
        bubblesGroup = pgame.add.group();
        bubblesGroup.enableBody = true;
        bubblesGroup.physicsBodyType = Phaser.Physics.P2JS;

        //camels group
        camelsGroup = pgame.add.group();
        camelsGroup.enableBody = true;
        camelsGroup.physicsBodyType = Phaser.Physics.P2JS;

        for (var i = 0; i < numCamels; i++){
        	// Camel spawn positions
        	CSx = Math.random() * (850 - 450) + 450;
        	CSy = Math.random() * (550 - 350) + 350;
        	createCamel(CSx, CSy);
        }

        //To move camels
        pgame.time.events.loop(Phaser.Timer.SECOND * 1.5, moveCamels, this); 

        //To move full bubbles
       // game.time.events.loop(Phaser.Timer.SECOND * 0.5, moveBubbles, this); 

        //To move full bubbles
        pgame.time.events.loop(Phaser.Timer.SECOND * 0.5, moveFullBubbles, this); 

        //To create bubbles
        pgame.time.events.loop(Phaser.Timer.SECOND * 4, createBubbles, this); 
        //createBubbles();

        //Timer
        pgame.time.events.loop(Phaser.Timer.SECOND, timer, this); 

        // Create our player sprite
        player = pgame.add.sprite(200, 200, 'player');
        player.scale.set(0.1);

        pgame.physics.p2.enable(player, false);
        player.body.setCircle(24);
        player.body.fixedRotation = true;

        // Set the players collision group
        player.body.setCollisionGroup(playerCollisionGroup);

        // When player colides with bubbles or fullbubbles, the function in second parameter is called. 
        player.body.collides(bubbleCollisionGroup, bumpBubble, this);
        player.body.collides(fullBubbleCollisionGroup, self.bumpFullBubble, this);

        // setup companion
        companion = new Companion(pgame, this, 200, 600, speed=120);
        pgame.add.existing(companion);

        //bullet group
        if (bulletEnable)//TODO should perform another check for type of gun
        {
           /* bullets.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
            bullets.bulletKillDistance = 500;
            bullets.bulletSpeed = 600;
            bullets.bullets.enableBody = true;*/
            //  Our bullet group
            bullets = pgame.add.group();
            bullets.enableBody = true;
            bullets.physicsBodyType = Phaser.Physics.P2JS;
            for (var i=0;i<5;i++)
            {
                var bl = new Bullet(pgame,this,0,0,600, 700);
                bullets.add(bl);
            }
            bullets.setAll('anchor.x', 0.5);
            bullets.setAll('anchor.y', 0.5);
            bullets.setAll('outOfBoundsKill', true);
            bullets.setAll('checkWorldBounds', true);
        }

        //  Create a new custom sized bounds, within the world bounds
        customBounds = { left: null, right: null, top: null, bottom: null };

        createPreviewBounds(pgame, bounds.x, bounds.y, bounds.width, bounds.height);

        //  Just to display the inner bounds
        var graphics = pgame.add.graphics(bounds.x, bounds.y);
        graphics.lineStyle(4, 0xff0000, 1);
        graphics.drawRect(0, 0, bounds.width, bounds.height);


        // controls
        cursors = pgame.input.keyboard.createCursorKeys();
        
        wasd = {
            left:pgame.input.keyboard.addKey(Phaser.Keyboard.A),
            right:pgame.input.keyboard.addKey(Phaser.Keyboard.D),
            up:pgame.input.keyboard.addKey(Phaser.Keyboard.W),
            down:pgame.input.keyboard.addKey(Phaser.Keyboard.S)
        };

        if (bulletEnable)
        {
            pgame.input.mouse.capture = true;
            fireButton = pgame.input.activePointer.leftButton;
        }

        // setup pause on space key pressed
        //spaceKey = pgame.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
       // spaceKey.onDown.add(togglePause, this);

        // remove key capture so they don't flood to browser
        pgame.input.keyboard.removeKeyCapture(Phaser.Keyboard.A);
        pgame.input.keyboard.removeKeyCapture(Phaser.Keyboard.D);
        pgame.input.keyboard.removeKeyCapture(Phaser.Keyboard.W);
        pgame.input.keyboard.removeKeyCapture(Phaser.Keyboard.S);

        counterText = pgame.add.text(0,0,"Time: " + time + " Camels: " + numCamels, {font: '40px Arial', fill:'#fff', boundsAlignH: "center"});
        counterText.setTextBounds(0, 10, pgame.world.width, 100);
    };

    //runs continuously. 
    this.defaultUpdate=function() {

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
        if(time == 0 || camelsRemained<2)
        {
            gameOver();
        }
        	

        /* if camels are ever 0, game over - exit game
        if(camelsGroup.countLiving() == 0)
        	//losing condition
        */

        //losing condition
        if(numCamels == 0)
        	pgame.state.start('gameover');

        updateCounterText();
    }

    this.bulletUpdate = function()
    {
        
        //player.rotation = pgame.physics.arcade.angleToPointer(player);
        if (fireButton.isDown && !pgame.game.paused)
        {
            fire();
        }
    }

    var fireRate = 500;

    function fire()
    {

        if (pgame.time.now > nextFire && bullets.countDead() > 0)
        {
            var fromX = player.x;
            var fromY = player.y;

            nextFire = pgame.time.now + fireRate;
            var bullet = bullets.getFirstDead();

            bullet.resetTarget(fromX, fromY,pgame.input.x,pgame.input.y);
        }
    }
    //called when this state is exited e.g., you switch to another state
    this.shutdown= function(){
        // clear all the groups
        camelsGroup.removeAll(destroy=true, silent=true);
        camelsGroup.destroy();

        bubblesGroup.removeAll(true, true);
        bubblesGroup.destroy();

        fullBubbleGroup.removeAll(true, true);
        fullBubbleGroup.destroy();

        music.stop();
        
        if (pgame.game.paused)
        {
            pgame.game.paused = false;
            togglePause(false);
        }
    }

    function moveCamels() {

        for(var i=0 ; i<numCamels ; i++){
            camelsGroup.getAt(i).body.setZeroVelocity();
            // randomise the movement   
            CamelsMover = pgame.rnd.integerInRange(1, 7);    
            // simple if statement to choose if and which way the baddie moves  
            if (CamelsMover == 1) {
                if(camelsGroup.getAt(i).x < 450)        
                camelsGroup.getAt(i).body.velocity.x = 80;
                else        
                    camelsGroup.getAt(i).body.velocity.x = -80;
                
            }   
            else if(CamelsMover == 2) 
            {
                if(camelsGroup.getAt(i).x > 850)        
                camelsGroup.getAt(i).body.velocity.x = -80;
                else
                    camelsGroup.getAt(i).body.velocity.x = 80;
            }   
            else if (CamelsMover == 3) {
                if(camelsGroup.getAt(i).y < 350)
                camelsGroup.getAt(i).body.velocity.y = 80;
                else
                    camelsGroup.getAt(i).body.velocity.y = -80; 
            }   
            else if (CamelsMover == 4) {
                if(camelsGroup.getAt(i).y > 550)        
                camelsGroup.getAt(i).body.velocity.y = -80;
                else
                    camelsGroup.getAt(i).body.velocity.y = 80;
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

            if(fullBubbleGroup.getAt(i).y > 820 || fullBubbleGroup.getAt(i).y < 0 || fullBubbleGroup.getAt(i).x > 1300 || fullBubbleGroup.getAt(i).x < 0){
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
    //call this everytime bubble pops
    function updateCounterText(){
        //add formatting for text later
        counterText.setText("Time: " + time + " Camels: " + numCamels);
    }

    function gameOver()
    {
        self.displayText("You Win!", 2, function(){
            pgame.add.tween(notificationText).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            notificationText.destroy();
            pgame.state.start('shop');
        });
    }
    function camelCaughtNotice()
    {
        self.displayText("A camel has been caught!", 0.5, function(){
            notificationText.destroy();
        });
    }

    this.displayText = function(str, autoNext, callback)
    {
        // remove previous notification text if it exist
        if (notificationText != null && notificationText!== 'undefined' && notificationText.alive)
        {
            notificationText.destroy();
        }

        notificationText = pgame.add.text(pgame.world.centerX, pgame.world.centerY, str, { font: "65px Arial", fill: "#fff", align: "center" });
        notificationText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);    
        notificationText.anchor.setTo(0.5, 0.5);

        if (autoNext>-1)
        {
            pgame.time.events.add(Phaser.Timer.SECOND * autoNext, callback, this);
        }
        else
        {
            pgame.input.onDown.addOnce(callback, this);
        }
    }

    // body 1 is the player
    // body 2 is the full bubble
    // method should destroy fullBubble, and put camel back
    this.bumpFullBubble = function(playerBody, fullBubbleBody){

        //create new camel at where fullBubble was
        new_camel = createCamel(fullBubbleBody.sprite.position.x, fullBubbleBody.sprite.position.y);
        numCamels++;

        // destroy full-bubble sprite
        numFullBubbles--;
        fullBubbleBody.sprite.alive = false;
        fullBubbleBody.sprite.pendingDestroy = true;
        fullBubbleGroup.remove(fullBubbleBody);

        popSound.play();

        //updateCounterText();
    }

    function createCamel(x,y){
        new_camel = camelsGroup.create(x, y, 'camel');
        new_camel.scale.setTo(0.5);
        new_camel.anchor.setTo(0.5);
        new_camel.body.setRectangle(40);
        new_camel.body.setCollisionGroup(camelCollisionGroup);
        new_camel.body.fixedRotation = true;
        new_camel.body.collides(bubbleCollisionGroup, camelBubbleHit, this);
        new_camel.body.collides(bulletsCollisionGroup);
    }

    function createBubbles(){
        randX = pgame.rnd.integerInRange(1, 4);    
        if(randX == 1){
            x = -20;
            randY = pgame.rnd.integerInRange(1, 5);
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
            randY = pgame.rnd.integerInRange(1, 5);
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
            randY = pgame.rnd.integerInRange(1, 5);
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
            randY = pgame.rnd.integerInRange(1, 5);
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

    function togglePause(pause)
    {
        
        if (!pause && pgame.physics.p2.paused)
        {
            console.log("unpause called");
            pgame.physics.p2.resume();
        }
        else if (pause && !pgame.physics.p2.paused)
        {
            console.log("pause called");
            pgame.physics.p2.pause();     
        }      
    }

    // body1 is the player (as it's the body that owns the callback)
    // body2 is the body it impacted with, its the body of the bubble :
    function bumpBubble(playerBody, bubbleBody) {
        popSound.play();
        numBubbles--;
        
        bubbleBody.sprite.alive = false;
        bubbleBody.sprite.pendingDestroy = true;
    }

    // body1 is the camel
    // body 2 is the bubble
    // trigger event to put create camel inside bubble sprite, and pull towards corners
    function camelBubbleHit(camelBody, bubbleBody){
        // add earthquake effect
        camelCaughtNotice();

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

    this.bulletHitBubble = function(bulletBody, bubbleBody)
    {
        console.log("hit!");
        bumpBubble(bulletBody, bubbleBody);
        bulletBody.sprite.kill();
    }
    this.bulletHitFullBubble = function(bulletBody, fullBubbleBody)
    {
        self.bumpFullBubble(bulletBody, fullBubbleBody);
        bulletBody.sprite.kill();
    }
    this.bulletHitCamel = function(bulletBody, camelBody)
    {
        camelShotNotice();

        ouchSound.play();

        camelBody.sprite.kill();
        camelBody.sprite.pendingDestroy = true;
        camelsGroup.remove(camelBody);
        numCamels--;
    }
    
    function camelShotNotice()
    {
        self.displayText("You shot a camel!", 0.8, function(){
            notificationText.destroy();
        });
    }

    function createfullBubble(x,y){
        fullBubble = fullBubbleGroup.create(x,y, 'fullBubble');
        fullBubble.scale.set(0.37);
        fullBubble.enableBody = true;
        fullBubble.body.setCircle(24);
        fullBubble.body.setCollisionGroup(fullBubbleCollisionGroup);
        fullBubble.body.collides([playerCollisionGroup,companionCollisionGroup,bulletsCollisionGroup]);
        numFullBubbles++;
    }

    function createBubble(x,y){
        var targetCamel = findNearestInGroup(x, y, camelsGroup);

        if (targetCamel == null) {return;}
        
        var newBubble = new Bubble(pgame, x, y, targetCamel, 30);
        bubblesGroup.add(newBubble);
    /*
        new_bubble = bubblesGroup.create(x, y, 'bubble');
        new_bubble.scale.set(0.3);
        new_bubble.body.setCircle(24);
        new_bubble.body.setCollisionGroup(bubbleCollisionGroup);
        new_bubble.body.fixedRotation = true;
        new_bubble.body.collides([bubbleCollisionGroup, playerCollisionGroup, camelCollisionGroup]);
        */
        numBubbles++;
    }

    function timer() {
        time--;
    }


}

//Helper Methods




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


function findNearestInGroup(x,y, objGroup)
{
    if (objGroup.total <= 0)
    {
        return null;
    }
    var nearestObj;
    var dist;
    objGroup.forEach(function(childObj, x, y){
        if (typeof nearestObj === 'undefined')
        {
            console.log("child undefined");
            nearestObj = childObj;
            dist = Math.pow(nearestObj.x - x, 2)
                   +Math.pow(nearestObj.y - y, 2);
            
        }
        else
        {
            var newDist = Math.pow(childObj.x - x, 2)
                   +Math.pow(childObj.y - y, 2);
            if (newDist < dist)
            {
                nearestObj = childObj;
                dist = newDist;
            }
        }
    }, this, true, x, y);

    return nearestObj;
}



	

//------------------------------- Bubble class
Bubble = function(game, x, y, target, speed)
{
    // create the bubble sprite at specified coordinates
    Phaser.Sprite.call(this, game, x, y, 'bubble');

    this.scale.set(0.3);
    
    // set the anchor to centre of sprite
    this.anchor.setTo(0.5);

    // enalble P2 physics
    game.physics.enable(this, Phaser.Physics.P2JS);

    this.body.setCircle(24);
    this.body.setCollisionGroup(bubbleCollisionGroup);
    this.body.fixedRotation = true;
    this.body.collides([bubbleCollisionGroup, playerCollisionGroup, camelCollisionGroup, bulletsCollisionGroup]);
    this.target = target;
    this.speed = speed;
    
};
Bubble.prototype = Object.create(Phaser.Sprite.prototype);
Bubble.prototype.constructor = Bubble;
Bubble.prototype.update = function()
{
    if (!this.target.alive)
    {
        console.log("target camel missing! Looking for next target...");
        this.target = findNearestInGroup(this.body.x, this.body.y, camelsGroup);
        if (!isTargetValid(this.target)) { return;}
    }
    
    accelerateToObject(this, this.target, this.speed);
}
//---------------end of Bubble class

//---------------Companion class
Companion = function(pgame, game, x, y, speed)
{
    Phaser.Sprite.call(this, pgame, x, y, 'companion');

    this.scale.setTo(0.4);
    this.anchor.setTo(0.5);
    this.speed = speed;

    pgame.physics.enable(this, Phaser.Physics.P2JS);

    this.body.setRectangle(35);
    this.body.fixedRotation = true;

    this.body.setCollisionGroup(companionCollisionGroup);
    this.body.collides(fullBubbleCollisionGroup, game.bumpFullBubble, this);
    
    this.state = 'idle';
    this.target = null;
};
Companion.prototype = Object.create(Phaser.Sprite.prototype);
Companion.prototype.constructor = Companion;
Companion.prototype.update = function()
{
    if (this.state == 'idle' || !isTargetValid(this.target))
    {
        this.state = 'idle';
        this.findTarget();
    }
    else if (this.state == 'chase')
    {
        accelerateToObject(this, this.target, this.speed);
    }
};
Companion.prototype.findTarget = function()
{
    var bubbleTarget = findNearestInGroup(this.x, this.y, fullBubbleGroup);
    if (!isTargetValid(bubbleTarget))
    {
        return;
    }
    else{
        this.state = 'chase';
        this.target = bubbleTarget;
    }
}
//-------------------------end of Companion class

//------------------Bullet class
Bullet = function(pgame, game,x, y, speed, lifespan)
{
    Phaser.Sprite.call(this, pgame, x, y, 'bullet');

    this.anchor.setTo(0.5);
    this.outOfBoundsKill = true;
    this.checkWorldBounds = true;

    this.lifetime = lifespan;

    this.speed = speed;
    this.pgame = pgame;

    pgame.physics.enable(this, Phaser.Physics.P2JS);

    this.body.setRectangle(35);
    this.body.fixedRotation = true;

    this.body.setCollisionGroup(bulletsCollisionGroup);
    this.body.collides(fullBubbleCollisionGroup, game.bulletHitFullBubble, this);
    this.body.collides(bubbleCollisionGroup, game.bulletHitBubble, this);
    this.body.collides(camelCollisionGroup, game.bulletHitCamel, this);
    this.kill();
}
Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;
Bullet.prototype.update=function()
{
}
Bullet.prototype.resetTarget = function(x,y,tx,ty)
{
    this.revive();
    this.reset(x,y);

    // reset the lifespan after bullet is revived
    this.lifespan = this.lifetime;
    this.setMove(tx,ty);
}
Bullet.prototype.setMove = function(tx,ty)
{
    var dx = tx - this.x;    
    var dy = ty - this.y;   
    var angle = Math.atan2(dy, dx);

    this.rotation = angle;
    this.body.rotation = angle;    

    this.body.velocity.x = this.speed * Math.cos(angle);    
    this.body.velocity.y = this.speed * Math.sin(angle); 
}
//--------------------end of Bullet class

function isTargetValid(obj)
{
    return (obj!=null && typeof obj !== 'undefined' && obj.alive);
}

function accelerateToObject (chaser, chased, speed)
{
    if (typeof speed === 'undefined') { speed = 50;}
    var angle = Math.atan2(chased.y - chaser.y, chased.x - chaser.x);
    chaser.body.force.x = Math.cos(angle) * speed;
    chaser.body.force.y = Math.sin(angle) * speed;
    //console.log(Math.cos(angle) * speed, Math.sin(angle) * speed);
}

function createPreviewBounds(game, x,y,w,h){
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