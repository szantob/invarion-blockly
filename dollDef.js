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
