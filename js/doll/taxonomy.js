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
		onVocabularyRefresh();
	},
	onSave : function(){
		
	}
}

var taxonomyNewEntryCallback = function(){
	var itemName = prompt("New taxonomy entry name:", "Thing");
  if (itemName == null || itemName == "") {
  } else {
	  Taxonomy.addItem(itemName);
	  toolboxUpdate();
  }
	return;
};