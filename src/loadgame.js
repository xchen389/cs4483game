var nameKeys;
var saveFileButtons = [];
var saveFileTexts = [];

var loadGame = {

	preload: function(){
		this.load.image('loadGameBackground','./assets/images/backgrounds/loadGame_screen.png');
		this.load.image('backButton', './assets/images/buttons/back_button.png');;
		this.load.image('deleteAllButton', './assets/images/buttons/deleteAll_button.png');
		this.load.image('blankButton', './assets/images/buttons/blank_button.png');
		this.load.audio('introMusic', './assets/sounds/introMusic.ogg');
	},

	create: function(){
		this.add.tileSprite(0,0, 1280, 800, 'loadGameBackground');
		this.add.button(50,690, 'backButton', this.goBack,this);
		this.add.button(960, 690,'deleteAllButton', this.deleteAll, this);

		
		//music settings
		if(!introMusic.isPlaying){
			introMusic.loop = true;
			introMusic.volume = playerData.musicVolume;
			introMusic.play();
		}

		
		this.generateSaveButtons();

	},

	generateSaveButtons: function(){
		//collect all the names currently in localStorage
		nameKeys = returnAllData();

		//return null if nothing is in localStorage, nothing will be generated
		if (nameKeys == null)
			return;

		//create sprites that can be clicked on, with text according to name centered on them
		for(var i = 0; i < nameKeys.length; i++){

			saveFileButtons[i] = this.add.sprite(490, 330+i*50, 'blankButton');
			saveFileButtons[i].height = 50;

			saveFileButtons[i].inputEnabled = true;
			buttonName = nameKeys[i];
			saveFileButtons[i].events.onInputDown.add(
				function(){
					load(buttonName);
				});
			
			//create text that has the name of saveFile
			saveFileTexts[i] = this.add.text(0,0, nameKeys[i]);
			saveFileTexts[i].anchor.set(0.5);

			//center text on the sprite
			saveFileTexts[i].x = Math.floor(saveFileButtons[i].x + saveFileButtons[i].width/2);
			saveFileTexts[i].y = Math.floor(saveFileButtons[i].y + saveFileButtons[i].height/2);
		}

	},

	goBack: function(){
		main.state.start('menu');
	},

	shutdown: function(){
	},

	//TO-DO display feedback and verification
	deleteAll: function(){

		//delete all localStorage Data
		deleteAll();

		//delete front end buttons
		for(var i = 0; i < saveFileButtons.length; i++){
			saveFileButtons[i].destroy();
			saveFileTexts[i].destroy();
		}
		
	}

}

function load(name){
	loadData(name);
	introMusic.stop();
	main.state.start('shop');
}