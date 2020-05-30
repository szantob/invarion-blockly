var DataProvider = (function () {
    var instance;
 
    function createInstance() {
        var dataProvider = new Object();
		
		dataProvider.Vocabulary = new Vocabulary();
		dataProvider.Taxonomy	= new Taxonomy();
		dataProvider.onLoad = function(){
			dataProvider.Vocabulary.onLoad();
			console.log(dataProvider.Vocabulary);
			dataProvider.Taxonomy.onLoad();
		}
		dataProvider.onSave = function(){
			dataProvider.Vocabulary.onSave();
			dataProvider.Taxonomy.onSave();
		}
		dataProvider.onClear = function(){
			dataProvider.Vocabulary.onClear();
			dataProvider.Taxonomy.onClear();
		}
        return dataProvider;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
 

function Vocabulary(){
	this.itemList 	  = [];
	this.length   	  = function(){return this.itemList.length};
	this.getVocabulary= function(){return this.itemList};
	this.get 		  = function(i){return this.itemList[i]};
	this.addItem = function(itemName){
		this.itemList.push(itemName);
		//onVocabularyRefresh();
	};
	
	
	this.onSave = function(){
		var text = JSON.stringify(this.itemList);
		window.localStorage.setItem('vocabularySave', text);
	};
	this.onLoad = function(){
		var text = window.localStorage.getItem('vocabularySave');
		items = JSON.parse(text);
		this.itemList = [];
		for(var i=0; i<items.length; i++) this.itemList.push(items[i]);
	};
	this.onClear = function(){
		this.itemList = [];
	};
	this.onRefresh = function(){};
};
function Taxonomy(){
	this.itemList 	= [];
	this.length 	= function(){return this.itemList.length};
	this.getTaxonomy= function(){return this.itemList};
	this.get 		= function(i){return this.itemList[i]};
	this.addItem 	= function(itemName){this.itemList.push(itemName)};
	
	this.onSave = function(){
		var text = JSON.stringify(this.itemList);
		window.localStorage.setItem('taxonomySave', text);
	};
	this.onLoad = function(){
		var text = window.localStorage.getItem('taxonomySave');
		items = JSON.parse(text);
		this.itemList = [];
		for(var i=0; i<items.length; i++) this.itemList.push(items[i]);
	};
	this.onClear = function(){
		this.itemList = [];
	};
	this.onRefresh = function(){};
}