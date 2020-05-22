Blockly.Blocks['datamodel_node'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(this.generateOptions()), "NAME");
    this.appendStatementInput("properties")
        .setCheck('taxonomy_item')
        .appendField("properites:");
    this.appendStatementInput("children")
        .setCheck('datamodel_item')
        .appendField("children:");
    this.setPreviousStatement(true, "datamodel_item");
    this.setNextStatement(true, "datamodel_item");
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  generateOptions: function(){
	var items = [];
	for (var i = 0; i < Vocabulary.length(); i++) {
		var item = Vocabulary.get(i);
		items.push([item, item.toUpperCase()]);
	}
	return items;
  }
};
Blockly.Blocks['datamodel_reference'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("* ")
        .appendField(new Blockly.FieldDropdown(this.generateOptions()), "NAME");
    this.setPreviousStatement(true, "datamodel_item");
    this.setNextStatement(true, "datamodel_item");
    this.setColour(330);
	this.setTooltip("");
	this.setHelpUrl("");
	},
  generateOptions: function(){
	var items = [];
	for (var i = 0; i < Vocabulary.length(); i++) {
		var item = Vocabulary.get(i);
		items.push([item, item.toUpperCase()]);
	}
	return items;
  }
};
Blockly.Blocks['datamodel_node_ref'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(this.generateOptions()), "NAME");
    this.appendStatementInput("properties:")
        .setCheck("taxonomy_item")
        .appendField("properites");
    this.appendStatementInput("children")
        .setCheck("datamodel_item")
        .appendField("children:");
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  generateOptions: function(){
	var items = [];
	for (var i = 0; i < Vocabulary.length(); i++) {
		var item = Vocabulary.get(i);
		items.push([item, item.toUpperCase()]);
	}
	return items;
  }
};
var datamodelCallback = function(workspace) {
  var xmlList = [];
  if(Vocabulary.length() == 0){
	  xmlList.push(Blockly.Xml.textToDom('<label text="No entry in Vocabulary"></label>'));
  }else{
	  xmlList.push(Blockly.Xml.textToDom('<block type="datamodel_node"></block>'));
	  xmlList.push(Blockly.Xml.textToDom('<block type="datamodel_reference"></block>'));
	  xmlList.push(Blockly.Xml.textToDom('<block type="datamodel_node_ref"></block>'));
  }
  return xmlList;
};