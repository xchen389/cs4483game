//Global Variables that persist around the program
//that will be saved and loaded 

//useful things
var w = 1280;
var h = 800;

/* 
Player Specific Data

Depending on what you need, feel free to add more fields to this object
The only field you can not change is name, as that is the key value
we use to find save data in localStorage

*/

//initialized Object for playerData
//when user loads data this will change
var playerData = { 
	//DO NOT CHANGE!
	"name":"default", 

	//options
	"musicVolume":0.2, 
	"fxVolume": 0.2,

	//gameState Info
	"currentDay": 1,
	"totalScore": 0,
	"currCredits": 0.
};

function saveData(){
	//Convert playerData to a JSON String 
	var savedJSON = JSON.stringify(playerData);
	//save it in local storage, and set key to the keyName
	localStorage.setItem(playerData.name, savedJSON);
}

function loadData(name){
	//retrieve JSON given name at key
	var loadedJSON = localStorage.getItem(name)
	//set the playerData to equal to the File
	playerData = JSON.parse(loadedJSON);
}

function deleteData(name){
	localStorage.removeItem(name);
}

function deleteAll(){
	localStorage.clear();
}

// to be used in loadScreen to view all saved Data
function returnAllData(){

	// create an array that will hold all the savedData Names
	var names = [];

	// iterate through all files in localStorage and get their JSONs and names
	// push the names to the array names
	for (var i = 0; i < localStorage.length; i++){
		var tempJSON = localStorage.getItem(localStorage.key(i));
		tempObj = JSON.parse(tempJSON);
		names.push(tempObj.name);
	}

	//return names
	return names;
}