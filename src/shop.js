var music;

aotb_game.shop = function(){
  var pgame = this;

	// constants
	var ITEM_BUTTON_HEIGHT = 100;

	var bounds;

	var itemInfo = [
		{key: 'dog', name: 'Superdog', type: 'companion', price: 10, locked: false},
		{key: 'gun', name: 'Handgun', type: 'weapon', price: 10, locked: false},
		{key: 'ak47', name: 'AK-47', type: 'weapon', price: 999, locked: true}
	];
	var itemButtons = [];

	this.preload = function(){
		this.load.image('shopScreen','./assets/images/backgrounds/shop_screen.png');
		this.load.image('nextButton','./assets/images/buttons/next_button.png');
		this.load.image('exitButton','./assets/images/buttons/exit_button.png');
		this.load.audio('shopMusic', './assets/sounds/shopMusic.mp3');

		aotb_game.game.loadAsset('dog', 'dog-placeholder.png',1);
		aotb_game.game.loadAsset('gun', 'gun.png',1);
		aotb_game.game.loadAsset('ak47', 'ak-47.png',1);

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
		pgame.state.start('menu');
	}

	function loadMenu(){
		pgame.state.start('menu');
	}

	function buyItem(item)
	{

	}
	//called when this state is switched (state shutdown)
	this.shutdown = function(){
		music.stop();
	}
}