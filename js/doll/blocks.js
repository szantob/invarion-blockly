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
        this.setTooltip("Taxonomy node");    //TODO
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
        this.setTooltip("Data Model node");
        this.setHelpUrl("");

        this.customContextMenu = function(options) {
            const NodeId = this.id;
            options.push({enabled:true,text:"Add Child",    callback:childCallbackFactory(NodeId,'datamodel_node')});
            options.push({enabled:true,text:"Add Property", callback:propertyCallbackFactory(NodeId)});
        };
    }
};
Blockly.Blocks['property_node'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldLabelSerializable("NAME"), "name");
        this.appendValueInput("value")
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Property node");
        this.setHelpUrl("");
        this.customContextMenu = function(options) {
            const NodeId = this.id;
            options.push({enabled:true,text:"Set String",           callback:setPropertyValue(NodeId,'value_string')});
            options.push({enabled:true,text:"Set Reference",        callback:setPropertyValue(NodeId,'value_reference')});
            options.push({enabled:true,text:"Set RegularExpression",callback:setPropertyValue(NodeId,'value_regex')});
        };
    }
};
Blockly.Blocks['value_string'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("String"), "value");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("String value");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['value_reference'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("Reference"), "value");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("Reference");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['value_regex'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("RegularExpression"), "value");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("RegularExpression");
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
function setPropertyValue(id,type) {
    return function () {
        onSetProperty(id,type);
    };
}