aotb_game.shop = function(){
  var pgame = this;

	var cashRegisterSound;
  var shopMusic;

	// constants
	var ITEM_BUTTON_HEIGHT = 100;

	var bounds;
	var descriptionText;
	var descriptionWindow;

	var descriptionStyle = { font: '20pt Arial', 
								fill: 'black', 
								align: 'left', 
								wordWrap: true, 
								wordWrapWidth: 450,
								backgroundColor: '#ffedce' };

	var itemInfo = [
		{key: 'dog', name: 'Superdog', type: 'companion', price: 10, locked: false, 
			description:"They can destroy both bubbles with camels inside AND empty bubbles!"},
		{key: 'gun', name: 'Handgun', type: 'weapon', price: 10, locked: false,
			description: "You can shoot 5 shots maximum at a time. Be careful, you can accidentally shoot your camels with a handgun!"},
		{key: 'ak47', name: 'AK-47', type: 'weapon', price: 999, locked: true,
			description: "Powerful :) Not only you can have 10 shots at a time, but also no need to worry about hitting your camels!"}
	];
	var itemButtons = [];

	this.preload = function(){
		// setup the item shelf
		bounds = new Phaser.Rectangle(90,220, 510, 460);
		this.load.spritesheet('itemButton', './assets/images/buttons/itemButton.GIF', bounds.width,ITEM_BUTTON_HEIGHT);
	}

	this.create = function(){
		this.add.tileSprite(0,0, w, h, 'shopScreen');

		// item shelf rectangle
		var graphics = pgame.add.graphics(bounds.x, bounds.y);
		graphics.lineStyle(4, 0xff0000, 1);
   	graphics.drawRect(0, 0, bounds.width, bounds.height);

		descriptionText = pgame.add.text(650,350,"", descriptionStyle);

		// setup goods
		for(var i = 0; i < itemInfo.length; ++i)
		{
			var itemButton = pgame.add.button(bounds.x, bounds.y + ITEM_BUTTON_HEIGHT* i, 'itemButton', buyItem, this, 1, 0, 1);
			itemButton.itemId = i;

			itemButton.onInputOver.add(displayDescription, this);
			itemButton.onInputOut.add(removeDescription, this);

			var itemSprite = pgame.add.image(0,0,itemInfo[i].key);
			var itemText = pgame.add.text(bounds.width/2, ITEM_BUTTON_HEIGHT/2-10, itemInfo[i].name + ": $" + itemInfo[i].price);
			
			itemButton.addChild(itemSprite);
			itemButton.addChild(itemText);

			// make button gray if is locked
			if (itemInfo[i].locked)
			{
				itemButton.tint = 0x555555;
			}

			itemButtons.push(itemButton);
		}

		var nextButton = this.add.button(670,670, 'nextButton', loadGame,this);

		var exitButton = this.add.button(970,670, 'exitButton', loadMenu,this);
		
		shopMusic = this.add.audio('shopMusic');
		shopMusic.volume = playerData.musicVolume;
		shopMusic.loop = true;
		shopMusic.play();

    cashRegisterSound = this.add.audio('cashRegister');
    cashRegisterSound.volume = playerData.fxVolume;
	}

	function loadGame(){
    	saveData();
		pgame.state.start('level2');
	}

	function loadMenu(){
		saveData();
		pgame.state.start('menu');
	}


	function buyItem(itemButton){
		// if the item is locked, don't proceed
		if (itemInfo[itemButton.itemId].locked)
      return;

		cashRegisterSound.play();
		// check if credits is enough
    // then minus user credit by price
		
		// update playerdata with the bought item

		// destroy button and refresh list
		itemButtons.splice(itemButton.itemId,1);
		itemInfo.splice(itemButton.itemId,1);
		itemButton.destroy(true);

		for (var i = 0; i<itemInfo.length; ++i){
			itemButtons[i].y = bounds.y + i * ITEM_BUTTON_HEIGHT;
      itemButtons[i].itemId = i;
		}
	}
	

	function displayDescription(item){
		descriptionText.setText(itemInfo[item.itemId].description);
		descriptionText.y = bounds.y + item.itemId * ITEM_BUTTON_HEIGHT;
	}

	function removeDescription(item){
		descriptionText.setText("");
	}
	//called when this state is switched (state shutdown)

	this.shutdown = function(){
		shopMusic.stop();
	}
	
}