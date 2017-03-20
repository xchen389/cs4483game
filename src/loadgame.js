
var nameKeys;
var saveFileButtons = [];
var saveFileTexts = [];

aotb_game.loadGame = function(){
	
  var pgame = this;

	this.preload = function(){
	  }

	this.create = function(){
		pgame.add.tileSprite(0,0, 1280, 800, 'loadGameBackground');
		pgame.add.button(50,690, 'backButton', goBack, pgame);
		pgame.add.button(960,690, 'deleteAllButton', deleteAllPressed, pgame);
		
		//music settings
		if(!introMusic.isPlaying){
			introMusic.loop = true;
			introMusic.volume = playerData.musicVolume;
			introMusic.play();
		  }
		
		generateSaveButtons();

	}

	function generateSaveButtons(){

		//collect all the names currently in localStorage
		nameKeys = returnAllData();

		//return null if nothing is in localStorage, nothing will be generated
		if (nameKeys == null)
			return;

		//create sprites that can be clicked on, with text according to name centered on them
		for(var i = 0; i < nameKeys.length; i++){

			saveFileButtons[i] = pgame.add.sprite(490, 330+i*50, 'blankButton');
			saveFileButtons[i].height = 50;

			saveFileButtons[i].inputEnabled = true;
			buttonName = nameKeys[i];

			saveFileButtons[i].events.onInputDown.add(
				function(){
					load(buttonName);
			});
			
			//create text that has the name of saveFile
			saveFileTexts[i] = pgame.add.text(0,0, nameKeys[i]);
			saveFileTexts[i].anchor.set(0.5);

			//center text on the sprite
			saveFileTexts[i].x = Math.floor(saveFileButtons[i].x + saveFileButtons[i].width/2);
			saveFileTexts[i].y = Math.floor(saveFileButtons[i].y + saveFileButtons[i].height/2);
		}

	}

	function goBack(){
		pgame.state.start('menu');
	}


	//TO-DO display feedback and verification
	function deleteAllPressed(){
		//delete all localStorage Data
		deleteAll();
		//delete front end buttons
		for(var i = 0; i < saveFileButtons.length; i++){
			saveFileButtons[i].destroy();
			saveFileTexts[i].destroy();
		}
  	}

  	function load(name){
		loadData(name);
		introMusic.stop();
		pgame.state.start('shop');
	}

};



