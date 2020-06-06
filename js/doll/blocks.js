/*Blockly.Blocks['concept_model'] = {
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
};*/
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
    this.customContextMenu = function(options) {
        options.push({text:"New Entry",enabled:true,callback:onNewVocabularyEntry});
    };
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
  this.customContextMenu = function(options) {
      options.push({text:"New Entry",enabled:true,callback:onNewTaxonomyEntry});
  };
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
        function onMenu1Pressed(nodeName) {
            console.log(nodeName);
            addBlockToDatamodel(nodeName)
        }
        this.customContextMenu = function(options) {
            const NodeName = this.getField('NAME').value_;
            const option = {};
            option.enabled = true;
            option.text = "Create data model node";
            option.callback = this.menu1CallbackFactory(NodeName);

            options.push(option);
        };
    },
    menu1CallbackFactory: function(name){
        return function () {
            addBlockToDatamodel(name);
        };
    }
};

Blockly.Blocks['taxonomy_node'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable(""), "NAME");
    this.appendStatementInput("children")
        .setCheck('taxonomy_item');
    this.setPreviousStatement(true, 'taxonomy_item');
    this.setNextStatement(true, 'taxonomy_item');
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['taxonomy_item'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable(""), "NAME");
    this.appendValueInput("NAME")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'taxonomy_item');
    this.setNextStatement(true, 'taxonomy_item');
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
function test(){

}

Blockly.Blocks['datamodel_node'] = {
  init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldLabelSerializable(""), "NAME");
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
  }
};
Blockly.Blocks['datamodel_reference'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("* ")
        .appendField(new Blockly.FieldLabelSerializable(""), "NAME");
    this.setPreviousStatement(true, "datamodel_item");
    this.setNextStatement(true, "datamodel_item");
    this.setColour(330);
	this.setTooltip("");
	this.setHelpUrl("");
	}
};
Blockly.Blocks['datamodel_node_ref'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable(""), "NAME");
    this.appendStatementInput("properties:")
        .setCheck("taxonomy_item")
        .appendField("properites");
    this.appendStatementInput("children")
        .setCheck("datamodel_item")
        .appendField("children:");
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
