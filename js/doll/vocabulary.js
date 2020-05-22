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
}
Blockly.Blocks['vocabulary_node'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable(""), "NAME")
        .appendField(":")
        .appendField(new Blockly.FieldTextInput("description"), "description");
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'vocabulary_item');
    this.setNextStatement(true, 'vocabulary_item');
    this.setColour(20);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

var vocabularyCallback = function(workspace) {
  var xmlList = [];
  var block = Blockly.Xml.textToDom('<button text="New entry" callbackKey="vocabularyNewEntry"></button>');
  xmlList.push(block);
  if(Vocabulary.length() == 0) return xmlList;
  for (var i = 0; i < Vocabulary.length(); i++) {
	var blockText = 
	  '<block type="vocabulary_node">'+
		'<field name="NAME">' + Vocabulary.get(i) + '</field>' +
	  '</block>';
	var block = Blockly.Xml.textToDom(blockText);
	xmlList.push(block);
  }
  return xmlList;
};
/*var vocabularyNewEntryCallback = function(){
	var itemName = prompt("New vocabulary entry name:", "Thing");
  if (itemName == null || itemName == "") {
  } else {
	  Vocabulary.addItem(itemName);
	  toolboxUpdate();
  }
	return;
};*/

var onVocabularyRefresh = function(){
	
}