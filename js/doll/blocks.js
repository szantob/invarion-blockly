Blockly.Blocks['cm_name'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("name: ")
        .appendField(new Blockly.FieldTextInput("default"), "name");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['cm_vocabulary'] = {
    init: function() {
    this.appendDummyInput()
        .appendField("Vocabulary: ");
    this.appendStatementInput("name")   //TODO CHANGE
        .setCheck('vocabulary_item');
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    this.customContextMenu = function(options) {
        options.push({text:"Add node",enabled:true,callback:onNewVocabularyEntry});
    };
    }
};
Blockly.Blocks['cm_taxonomy'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Taxonomy: ");
    this.appendStatementInput("name")
        .setCheck('taxonomy_item');
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  this.customContextMenu = function(options) {
      options.push({text:"Add node",enabled:true,callback:onNewTaxonomyEntry});
  };
  }
};
Blockly.Blocks['cm_datamodel'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Data Model: ");
    this.appendStatementInput("name")
        .setCheck('datamodel_item');
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
 this.customContextMenu = function(options) {
      options.push({text:"Add node",enabled:true,callback:onNewDatamodelEntry});
  };
  }
};

Blockly.Blocks['vocabulary_node'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldLabelSerializable(""), "name")
            .appendField(":")
            .appendField(new Blockly.FieldTextInput("description"), "description");
        this.setInputsInline(true);
        this.setPreviousStatement(true, 'vocabulary_item');
        this.setNextStatement(true, 'vocabulary_item');
        this.setColour(20);
        this.setTooltip("");
        this.setHelpUrl("");
        this.customContextMenu = function(options) {
            const NodeName = this.getField('name').value_;
            const option1 = {};
            option1.enabled = true;
            option1.text = "Add to taxonomy";
            option1.callback = this.menu1CallbackFactory(NodeName);
            const option2 = {};
            option2.enabled = true;
            option2.text = "Add to data model";
            option2.callback = this.menu2CallbackFactory(NodeName);

            options.push(option1);
            options.push(option2);
        };
    },
    menu1CallbackFactory: function(name){
        return function () {
            addBlockToTaxonomy(name)
        };
    },
    menu2CallbackFactory: function(name){
        return function () {
            addBlockToDatamodel(name);
        };
    }
};

Blockly.Blocks['taxonomy_node'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable(""), "name");
    this.appendStatementInput("children")
        .setCheck('taxonomy_item');
    this.setPreviousStatement(true, 'taxonomy_item');
    this.setNextStatement(true, 'taxonomy_item');
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
      this.customContextMenu = function(options) {
          const NodeId = this.id;
          const option = {};
          option.enabled = true; //TODO
          option.text = "Add node";
          option.callback = this.menuCallbackFactory(NodeId);
          options.push(option);
      };
  },
    menuCallbackFactory: function(id){
        return function () {
            onNewTaxonomyTreeEntry(id);
        };
    }
};
Blockly.Blocks['taxonomy_item'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable(""), "name");
    this.appendValueInput("name")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'taxonomy_item');
    this.setNextStatement(true, 'taxonomy_item');
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['datamodel_node'] = {
  init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldLabelSerializable(""), "name");
      this.appendStatementInput("children")
          .setCheck('datamodel_item')
          .appendField("children:");
      this.appendStatementInput("properties")
          .setCheck('taxonomy_item')
          .appendField("properties:");
      this.setPreviousStatement(true, "datamodel_item");
      this.setNextStatement(true, "datamodel_item");
      this.setColour(330);
      this.setTooltip("");
      this.setHelpUrl("");

      this.customContextMenu = function(options) {
          const NodeId = this.id;
          const option1 = {};
          option1.enabled = true; //TODO
          option1.text = "Add data model node";
          option1.callback = this.menuCallbackFactory1(NodeId);
          options.push(option1);
          const option2 = {};
          option2.enabled = true; //TODO
          option2.text = "Add property";
          option2.callback = this.menuCallbackFactory2(NodeId);
          options.push(option2);
      };
    },
    menuCallbackFactory1: function(id){
        return function () {
            onNewDatamodelDataTreeEntry(id);
        };
    },
    menuCallbackFactory2: function(id){
        return function () {
            onNewProperty(id);
        };
    }
};
Blockly.Blocks['datamodel_reference'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("* ")
        .appendField(new Blockly.FieldLabelSerializable(""), "name");
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
        .appendField(new Blockly.FieldLabelSerializable(""), "name");
    this.appendStatementInput("properties:")
        .setCheck("taxonomy_item")
        .appendField("properties");
    this.appendStatementInput("children")
        .setCheck("datamodel_item")
        .appendField("children:");
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
