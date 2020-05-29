var Vocabulary = {
	itemList : [],
	length : function(){
		return this.itemList.length}
	,
	getVocabulary : function(){
		return this.itemList;
	},
	get : function(i){
		return this.itemList[i];
	},
	addItem : function(itemName){
		this.itemList.push(itemName);
		//onVocabularyRefresh();
	},
	
	
	onSave : function(){
		console.log("Vocabulary.onSave");
		var text = JSON.stringify(this.itemList);
		window.localStorage.setItem('vocabularySave', text);
		console.log(text);
	},
	onLoad : function(){
		console.log("Vocabulary.onLoad");
		var text = window.localStorage.getItem('vocabularySave');
		console.log(text);
		itemList = JSON.parse(text);
		console.log(itemList);
	},
	onRefresh : function(){
		
	}
};
var Taxonomy = {
	itemList : [],
	length : function(){
		return this.itemList.length}
	,
	getTaxonomy : function(){
		return this.itemList;
	},
	get : function(i){
		return this.itemList[i];
	},
	addItem : function(itemName){
		this.itemList.push(itemName);
		//onVocabularyRefresh();
	},
	
	onSave : function(){
		console.log("Taxonomy.onSave");
		var text = JSON.stringify(this.itemList);
		window.localStorage.setItem('taxonomySave', text);
	},
	onLoad : function(){
		console.log("Taxonomy.onLoad");
		var text = window.localStorage.getItem('taxonomySave');
		itemList = JSON.parse(text);
	},
	onRefresh : function(){
		
	}
}