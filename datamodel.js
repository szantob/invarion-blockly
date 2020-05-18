Blockly.Blocks['datamodel_node'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(this.generateOptions), "NAME");
    this.appendStatementInput("properties:")
        .setCheck("taxonomy_node")
        .appendField("properites");
    this.appendStatementInput("children")
        .setCheck("dataModel_node")
        .appendField("children:");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
  },
  generateOptions: function() {
    return Vocabulary.getNameListForBlocklyItem();
  }
};

var datamodelCallback = function(workspace) {
  var datamodelList = Vocabulary.getNameListForBlocklyNode();
  var xmlList = [];
  if(datamodelList.length == 0){
	  var block = Blockly.Xml.textToDom(
		'<label text="No entry in Vocabulary"></label>'
	  );
	  xmlList.push(block);
  }else{
	  var block = Blockly.Xml.textToDom(
		'<block type="datamodel_node">'+
			'<field name="NAME">' + datamodelList[0] + '</field>' +
		'</block>'
	  );
	  xmlList.push(block);
  }
  /*if (Blockly.Blocks['datamodel_item']) {
	for (var i = 0; i < datamodelList.length; i++) {
	  var blockText = 
		'<block type="datamodel_item">'+
		'<field name="ITEM">' + datamodelList[i] + '</field>' +
		'</block>';
	  var block = Blockly.Xml.textToDom(blockText);
	  xmlList.push(block);
	}
  }*/
  return xmlList;
};