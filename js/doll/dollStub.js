Blockly.JavaScript['concept_model'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var statements_vocabulary = Blockly.JavaScript.statementToCode(block, 'vocabulary');
  var statements_taxonomy = Blockly.JavaScript.statementToCode(block, 'taxonomy');
  var statements_datamodel = Blockly.JavaScript.statementToCode(block, 'dataModel');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['vocabulary_node'] = function(block) {
  var text_attributename = block.getFieldValue('attributeName');
  var text_description = block.getFieldValue('description');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['taxonomy_node'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var statements_children = Blockly.JavaScript.statementToCode(block, 'children');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['datamodel_node'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_properties_ = Blockly.JavaScript.statementToCode(block, 'properties:');
  var statements_children = Blockly.JavaScript.statementToCode(block, 'children');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['vocabulary_item'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['property_item'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};