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
	}
}
Blockly.Blocks['taxonomy_node'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(this.generateOptions), "NAME");
    this.appendStatementInput("children")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  generateOptions: function(){
	var items = [];
	for (var i = 0; i < Taxonomy.length(); i++) {
		var item = Taxonomy.get(i);
		items.push([item, item.toUpperCase()]);
	}
	return items;
  }
};
Blockly.Blocks['taxonomy_item'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(this.generateOptions), "name");
    this.appendValueInput("NAME")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  generateOptions: function(){
	var items = [];
	for (var i = 0; i < Taxonomy.length(); i++) {
		var item = Taxonomy.get(i);
		items.push([item, item.toUpperCase()]);
	}
	return items;
  }
};

var taxonomyCallback = function(workspace) {
  var xmlList = [];
  var block = Blockly.Xml.textToDom('<button text="New entry" callbackKey="taxonomyNewEntry"></button>');
  xmlList.push(block);
  if(Taxonomy.length() == 0) return xmlList;
  var block = Blockly.Xml.textToDom(
	'<block type="taxonomy_node">'+
		'<field name="NAME">' + Taxonomy.get(0) + '</field>' +
	'</block>'
  );
  xmlList.push(block);
  if (Blockly.Blocks['taxonomy_item']) {
	for (var i = 0; i < Taxonomy.length(); i++) {
	  var blockText = 
		'<block type="taxonomy_item">'+
		'<field name="ITEM">' + Taxonomy.get(i) + '</field>' +
		'</block>';
	  var block = Blockly.Xml.textToDom(blockText);
	  xmlList.push(block);
	}
  }
  return xmlList;
};
var taxonomyNewEntryCallback = function(){
	var itemName = prompt("New taxonomy entry name:", "Thing");
  if (itemName == null || itemName == "") {
  } else {
	  Taxonomy.addItem(itemName);
	  toolboxUpdate();
  }
	return;
};