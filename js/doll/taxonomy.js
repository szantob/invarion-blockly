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
		
	},
	onLoad : function(){
		
	},
	onRefresh : function(){
		
	}
}