var Vocabulary = {
	itemArray : [
		{name:"Person",description:"A human being."},
		{name:"PersonalName",description:"The name of a person."}], //TODO Dynamic
	getNameList : function(){
		var list = []
		for (var i = 0; i < this.itemArray.length; i++) {
			list.push([this.itemArray[i].name,this.itemArray[i].name.toUpperCase()]);
		}
		return list;
	},
	getNameList0 : function(){
		var list = []
		for (var i = 0; i < this.itemArray.length; i++) {
			list.push(this.itemArray[i].name.toUpperCase());
		}
		return list;
	}
}

Blockly.Blocks['vocabulary_node'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(this.generateOptions), "NAME");
    this.appendDummyInput()
        .appendField(":")
        .appendField(new Blockly.FieldTextInput("description"), "description");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  generateOptions: function() {
    return Vocabulary.getNameList();
  }
};
Blockly.Blocks['vocabulary_item'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(this.generateOptions), "ITEM");
    this.setOutput(true, null);
    this.setColour(20);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  generateOptions: function() {
    return Vocabulary.getNameList();
  }
};

var vocabularyCallback = function(workspace) {
  var vocabularyList = Vocabulary.getNameList0();
  var xmlList = [];
  var block = Blockly.Xml.textToDom('<button text="New entry" callbackKey="vocabularyNewEntry"></button>');
  xmlList.push(block);
  var block = Blockly.Xml.textToDom(
	'<block type="vocabulary_node">'+
		'<field name="NAME">' + vocabularyList[0] + '</field>' +
	'</block>'
  );
  xmlList.push(block);
  if (Blockly.Blocks['vocabulary_item']) {
	for (var i = 0; i < vocabularyList.length; i++) {
	  var blockText = 
		'<block type="vocabulary_item">'+
		'<field name="ITEM">' + vocabularyList[i] + '</field>' +
		'</block>';
	  var block = Blockly.Xml.textToDom(blockText);
	  xmlList.push(block);
	}
  }
  return xmlList;
};
var vocabularyNewEntryCallback = function(){
	return;
};