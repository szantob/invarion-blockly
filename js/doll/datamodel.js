Blockly.Blocks['datamodel_node'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(this.generateOptions()), "NAME");
    this.appendStatementInput("properties:")
        .setCheck("taxonomy_node")
        .appendField("properites");
    this.appendStatementInput("children")
        .setCheck("dataModel_node")
        .appendField("children:");
    this.setPreviousStatement(true, "dataModelNode");
    this.setNextStatement(true, "dataModelNode");
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
    this.setPreviousStatement(true, "dataModelNode");
    this.setNextStatement(true, "dataModelNode");
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
	  var block = Blockly.Xml.textToDom(
		'<label text="No entry in Vocabulary"></label>'
	  );
	  xmlList.push(block);
  }else{
	  var block = Blockly.Xml.textToDom(
		'<block type="datamodel_node">'+
			'<field name="NAME">' + Vocabulary.get(0) + '</field>' +
		'</block>'
	  );
	  xmlList.push(block);
  }
  for (var i = 0; i < Vocabulary.length(); i++) {
	  var blockText = 
		'<block type="datamodel_reference">'+
		'<field name="NAME">' + Vocabulary.get(i) + '</field>' +
		'</block>';
	  var block = Blockly.Xml.textToDom(blockText);
	  xmlList.push(block);
  }
  return xmlList;
};