var Taxonomy = {
	itemArray : [],
	getNameListForBlocklyItem : function(){
		var list = []
		for (var i = 0; i < this.itemArray.length; i++) {
			list.push([this.itemArray[i],this.itemArray[i].toUpperCase()]);
		}
		return list;
	},
	getNameListForBlocklyNode : function(){
		var list = []
		for (var i = 0; i < this.itemArray.length; i++) {
			list.push(this.itemArray[i].toUpperCase());
		}
		return list;
	},
	addItem : function(itemName){
		this.itemArray.push(itemName);
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
  generateOptions: function() {
    return Taxonomy.getNameListForBlocklyItem();
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
  generateOptions: function() {
    return Taxonomy.getNameListForBlocklyItem();
  }
};

var taxonomyCallback = function(workspace) {
  var taxonomyList = Taxonomy.getNameListForBlocklyNode();
  var xmlList = [];
  var block = Blockly.Xml.textToDom('<button text="New entry" callbackKey="taxonomyNewEntry"></button>');
  xmlList.push(block);
  if(taxonomyList.length == 0) return xmlList;
  var block = Blockly.Xml.textToDom(
	'<block type="taxonomy_node">'+
		'<field name="NAME">' + taxonomyList[0] + '</field>' +
	'</block>'
  );
  xmlList.push(block);
  if (Blockly.Blocks['taxonomy_item']) {
	for (var i = 0; i < taxonomyList.length; i++) {
	  var blockText = 
		'<block type="taxonomy_item">'+
		'<field name="ITEM">' + taxonomyList[i] + '</field>' +
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