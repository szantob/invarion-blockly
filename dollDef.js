var Vocabulary = {
	itemArray : [
		{name:"Person",description:"A human being."},
		{name:"PersonalName",description:"The name of a person."}], //TODO Dynamic
	getNameList : function(){
		var list = []
		for (var i = 0; i < this.itemArray.length; i++) {
			list.push([this.itemArray[i].name,this.itemArray[i].name.toUpperCase()]);
		}
		return list;
	},
	getNameList0 : function(){
		var list = []
		for (var i = 0; i < this.itemArray.length; i++) {
			list.push(this.itemArray[i].name.toUpperCase());
		}
		return list;
	}
}
Blockly.Blocks['concept_model'] = {
  init: function() {
  this.jsonInit({
	  "type": "concept_model",
	  "message0": "%1 %2 vocabulary: %3 taxonomy: %4 dataModel: %5",
	  "args0": [
		{
		  "type": "field_input",
		  "name": "NAME",
		  "text": "concept model name"
		},
		{
		  "type": "input_dummy"
		},
		{
		  "type": "input_statement",
		  "name": "vocabulary",
		  "check": "vocabulary_node"
		},
		{
		  "type": "input_statement",
		  "name": "taxonomy",
		  "check": "taxonomy_node"
		},
		{
		  "type": "input_statement",
		  "name": "dataModel",
		  "check": "dataModel_node"
		}
	  ],
	  "inputsInline": true,
	  "colour": 230,
	  "tooltip": "",
	  "helpUrl": ""
    });
  }
};
Blockly.Blocks['taxonomy_node'] = {
  init: function() {
  this.jsonInit({
	  "type": "taxonomy_node",
	  "message0": "%1 %2 %3",
	  "args0": [
		{
		  "type": "field_input",
		  "name": "NAME",
		  "text": "name"
		},
		{
		  "type": "input_dummy"
		},
		{
		  "type": "input_statement",
		  "name": "children"
		}
	  ],
	  "previousStatement": null,
	  "nextStatement": null,
	  "colour": 120,
	  "tooltip": "",
	  "helpUrl": ""
    });
  }
};
Blockly.Blocks['datamodel_node'] = {
  init: function() {
  this.jsonInit({
	  "type": "datamodel_node",
	  "message0": "name: %1 %2 properites %3 children: %4",
	  "args0": [
		{
		  "type": "input_value",
		  "name": "name",
		  "check": "vocabulary_node"
		},
		{
		  "type": "input_dummy"
		},
		{
		  "type": "input_statement",
		  "name": "properties:",
		  "check": "taxonomy_node"
		},
		{
		  "type": "input_statement",
		  "name": "children",
		  "check": "dataModel_node"
		}
	  ],
	  "previousStatement": null,
	  "nextStatement": null,
	  "colour": 330,
	  "tooltip": "",
	  "helpUrl": ""
    });
  }
};
Blockly.Blocks['property_item'] = {
  init: function() {
  this.jsonInit({
	  "type": "property_item",
	  "message0": "%1 %2 %3",
	  "args0": [
		{
		  "type": "field_label_serializable",
		  "name": "name",
		  "text": "name"
		},
		{
		  "type": "input_dummy"
		},
		{
		  "type": "input_value",
		  "name": "NAME"
		}
	  ],
	  "inputsInline": true,
	  "previousStatement": null,
	  "nextStatement": null,
	  "colour": 120,
	  "tooltip": "",
	  "helpUrl": ""
    });
  }
};

