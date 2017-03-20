var music;

//shop function
aotb_game.shop = function(){
  var pgame = this;

	// constants
	var ITEM_BUTTON_HEIGHT = 100;
	var x = 2;

	var bounds;
	var descriptionText;
	var descriptionWindow;

	var itemInfo = [
		{key: 'dog', name: 'Superdog', type: 'companion', price: 10, locked: false, 
			description:"They can not only destroy bubbles with camels inside, but also empty bubbles!"},
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
		this.add.tileSprite(0,0, 1280, 800, 'shopScreen');

		// item shelf rectangle
		var graphics = pgame.add.graphics(bounds.x, bounds.y);
		graphics.lineStyle(4, 0xff0000, 1);
    graphics.drawRect(0, 0, bounds.width, bounds.height);

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

			if (itemInfo[i].locked)
			{
				itemButton.inputEnabled = false;
				itemButton.tint = 0x555555;
			}
			//itemButton.itemText.alignTo(itemButton.itemSprite, Phaser.RIGHT_CENTER, 16);
			itemButtons.push(itemButton);
		}

		//make buttons smaller later 
		var nextButton = this.add.button(670,670, 'nextButton', loadGame,this);
		//nextButton.width = 200;
		//nextButton.height = 100;
		//
		var exitButton = this.add.button(970,670, 'exitButton', loadMenu,this);
		//exitButton.width = 100;
		//exitButton.height = 80;
		
		music = this.add.audio('shopMusic');
		music.volume = musicVolume;
		music.loop = true;
		music.play();
	}

	function loadGame(){
		pgame.state.start('level' + x);
		x++;
	}

	function loadMenu(){
		pgame.state.start('menu');
	}

	function buyItem(itemButton)
	{
		// minus user credit by price
		
		// update playerdata with the bought item

		// destroy button and refresh list
		itemButtons.splice(itemButton.itemId,1);
		itemInfo.splice(itemButton.itemId,1);
		itemButton.destroy(true);

		for (var i = 0; i<itemInfo.length; ++i)
		{
			itemButtons[i].y = bounds.y + i * ITEM_BUTTON_HEIGHT;
		}
	}
	
	function displayDescription(item)
	{
	//	descriptionText = pgame.add.text(0,0,itemInfo[item.itemId].description);
	}

	function removeDescription(item)
	{
		//pgame.add.text(0,0,itemInfo[item.itemId].description);
	}
	//called when this state is switched (state shutdown)
	this.shutdown = function(){
		music.stop();
	}
}