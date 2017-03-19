//Global Variables that persist around the program
//that will be saved and loaded 

//useful things
var w = 1280;
var h = 800;


/* 
Player Specific Data

Depending on what you need, feel free to add more fields to this object
it will not affect saveData and loadData"
*/

var playerData = { 
	"name":"default", 
	"musicvolume":0.2, 
	"fxVolume": 0.2,
	"currentDay": 1,
	"totalScore": 0,
	"currCredits": 0.
};

function saveData(){
	//Convert playerData to a JSON String 
	var savedJSON = JSON.stringify(playerData);
	//get the name of playerData object to access it later in localStorage
	var keyName = playerData.name;
	//save it in local storage, and set key to the keyName
	localStorage.setItem(keyName, savedJSON);
}

function loadData(name){
	//retrieve JSON given name at key
	var loadedJSON = localStorage.getItem(name)
	//parse the JSON and put the object in loadedData
	var loadedData = JSON.parse(loadedJSON);
	//set the playerData global var to this loadedData
	playerData = loadedData;
}

//options
var playerName = "";
var musicVolume = 0.2;
var fxVolume = 0.2;

//Information about game
var currentDay;
var camelsLeft;
var totalScore;
var currCredits;

///Weapon flags