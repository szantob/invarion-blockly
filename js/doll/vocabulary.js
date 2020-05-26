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
		onVocabularyRefresh();
	},
	
	
	onSave : function(){
		
	}
}


var onVocabularyRefresh = function(){
	
}