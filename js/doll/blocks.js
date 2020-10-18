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
Blockly.Blocks['cm_taxonomy'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Taxonomy: ");
    this.appendStatementInput("children")
        .setCheck("taxonomyNode");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  this.customContextMenu = function(options) {
      options.push({text:"Add Block",enabled:true,callback:onNewTaxonomyEntry});
  };
  }
};
Blockly.Blocks['cm_datamodel'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Data Model: ");
    this.appendStatementInput("children")
        .setCheck('datamodelNode');
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
 this.customContextMenu = function(options) {
     options.push({text:"Add Block",enabled:true,callback:onNewDatamodelEntry});
  };
  }
};
Blockly.Blocks['taxonomy_node'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldLabelSerializable("NAME"), "name");
        this.appendStatementInput("children")
            .setCheck(["taxonomyNode", "propertyNode"]);
        this.setPreviousStatement(true, ["taxonomyNode", "propertyNode"]);
        this.setNextStatement(true, ["taxonomyNode", "propertyNode"]);
        this.setColour(120);
        this.setTooltip("");    //TODO
        this.setHelpUrl("");    //TODO
        this.customContextMenu = function(options) {
            const NodeId = this.id;
            options.push({enabled:true,text:"Add Child",    callback:childCallbackFactory(NodeId,'taxonomy_node')});
            options.push({enabled:true,text:"Add Property", callback:propertyCallbackFactory(NodeId)});
        };
    }
};
Blockly.Blocks['datamodel_node'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldLabelSerializable("NAME"), "name");
        this.appendStatementInput("children")
            .setCheck(["datamodelNode", "propertyNode"]);
        this.setInputsInline(false);
        this.setPreviousStatement(true, ["datamodelNode", "propertyNode"]);
        this.setNextStatement(true, ["datamodelNode", "propertyNode"]);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");

        this.customContextMenu = function(options) {
            const NodeId = this.id;
            options.push({enabled:true,text:"Add Child",    callback:childCallbackFactory(NodeId,'datamodel_node')});
            options.push({enabled:true,text:"Add Property", callback:propertyCallbackFactory(NodeId)});
        };
    }
};
Blockly.Blocks['property_reference'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldLabelSerializable("NAME"), "name");
        this.appendDummyInput()
            .appendField("Reference:")
            .appendField(new Blockly.FieldTextInput("Value"), "value");
        this.setPreviousStatement(true, ["datamodelNode", "propertyNode"]);
        this.setNextStatement(true, ["datamodelNode", "propertyNode"]);
        this.setColour(230);
        this.setTooltip("ISA");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['property_string'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldLabelSerializable("NAME"), "name");
        this.appendDummyInput()
            .appendField("String:")
            .appendField(new Blockly.FieldTextInput("Value"), "value");
        this.setPreviousStatement(true, ["datamodelNode", "propertyNode"]);
        this.setNextStatement(true, ["datamodelNode", "propertyNode"]);
        this.setColour(230);
        this.setTooltip("ISA");
        this.setHelpUrl("");
    }
};

function childCallbackFactory(id,type){
    return function () {
        onNewChild(id,type);
    };
}
function propertyCallbackFactory(id){
    return function () {
        onNewProperty(id);
    };
}



/*Blockly.Blocks['property_node'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldLabelSerializable("NAME"), "name");
        this.appendDummyInput()
            .appendField("type:")
            .appendField(new Blockly.FieldDropdown([["String","string"], ["Reference","reference"], ["Integer","integer"], ["Date","date"], ["Float","float"], ["RegularExpression","regex"], ["Record","record"]]), "type");
        this.appendDummyInput()
            .appendField("value:")
            .appendField(new Blockly.FieldTextInput("Value"), "value");
        this.appendDummyInput()
            .appendField("unit:")
            .appendField(new Blockly.FieldTextInput("Unit"), "unit");
        this.appendDummyInput()
            .appendField("range:")
            .appendField(new Blockly.FieldTextInput("Range"), "range");
        this.appendDummyInput()
            .appendField("enum:")
            .appendField(new Blockly.FieldTextInput("Enum"), "enum");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("ISA");
        this.setHelpUrl("");
    }
};*/