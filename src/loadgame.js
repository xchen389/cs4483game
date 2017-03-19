var nameKeys;

var loadGame = {

	preload: function(){
		this.load.image('loadGameBackground','./assets/images/backgrounds/loadGame_screen.png');
		this.load.image('backButton', './assets/images/buttons/back_button.png');
		this.load.image('loadButton', './assets/images/buttons/load_button.png');
		this.load.image('deleteButton', './assets/images/buttons/delete_button.png');
		this.load.image('deleteAllButton', './assets/images/buttons/deleteAll_button.png');
		this.load.audio('introMusic', './assets/sounds/introMusic.ogg');
	},

	create: function(){
		this.add.tileSprite(0,0, 1280, 800, 'loadGameBackground');
		this.add.button(50,690, 'backButton', this.goBack,this);
		this.add.button(960,690, 'loadButton', this.loadTheGame,this);
		this.add.button(228, 690, 'deleteAllButton', this.deleteAllfunction());
		this.add.button(455, 690, 'deleteButton', this.deleteFunction());

		
		//music settings
		if(!introMusic.isPlaying){
			introMusic.loop = true;
			introMusic.volume = playerData.musicVolume;
			introMusic.play();
		}

		//Get array of names in local Storage
		nameKeys = returnAllData();

		//create sprites with data file as name, and can be clicked on
		for(int i = 0; i < nameKeys.length, i++){
			game.add.sprite(400, i*50)
		}


		//list the names in the screen and let the user select a name
		//and then load that saveFile corresponding to that name
	},

	goBack: function(){
		main.state.start('menu');
	},

	loadTheGame: function(){
		main.state.start('shop');
	},

	shutdown: function(){
	}

	//TO-DO Show user feedback and verification
	deleteAllfunction: function(){
		deleteAll();
	}

	//take the name the user currently has selected, 
	// and use that as key to delete function
	deleteFunction: function(){
		// TO DO
	}


}