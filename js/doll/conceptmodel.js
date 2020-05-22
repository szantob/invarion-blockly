Blockly.Blocks['concept_model'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("concept model name"), "NAME");
    this.appendStatementInput("vocabulary")
        .setCheck("vocabulary_node")
        .appendField("vocabulary:");
    this.appendStatementInput("taxonomy")
        .setCheck("taxonomy_node")
        .appendField("taxonomy:");
    this.appendStatementInput("dataModel")
        .setCheck("dataModelNode")
        .appendField("dataModel:");
    this.setInputsInline(true);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['concept_model_dec_name'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("name: ")
        .appendField(new Blockly.FieldTextInput("default"), "NAME");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['concept_model_dec_vocabulary'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Vocabulary: ");
    this.appendStatementInput("NAME")
        .setCheck('vocabulary_item');
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['concept_model_dec_taxonomy'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Taxonomy: ");
    this.appendStatementInput("NAME")
        .setCheck('taxonomy_item');
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['concept_model_dec_datamodel'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Data Model: ");
    this.appendStatementInput("NAME")
        .setCheck('datamodel_item');
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
var conceptmodelCallback = function(workspace) {
  var xmlList = [];
  xmlList.push(Blockly.Xml.textToDom('<block type="concept_model_dec_name"><field name="NAME">concept model name</field></block>'));
  xmlList.push(Blockly.Xml.textToDom('<block type="concept_model_dec_vocabulary"></block>'));
  xmlList.push(Blockly.Xml.textToDom('<block type="concept_model_dec_taxonomy"></block>'));
  xmlList.push(Blockly.Xml.textToDom('<block type="concept_model_dec_datamodel"></block>'));
  return xmlList;
};