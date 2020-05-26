var conceptmodelCallback = function(workspace) {
  var xmlList = [];
  xmlList.push(Blockly.Xml.textToDom('<block type="concept_model_dec_name"><field name="NAME">concept model name</field></block>'));
  xmlList.push(Blockly.Xml.textToDom('<block type="concept_model_dec_vocabulary"></block>'));
  xmlList.push(Blockly.Xml.textToDom('<block type="concept_model_dec_taxonomy"></block>'));
  xmlList.push(Blockly.Xml.textToDom('<block type="concept_model_dec_datamodel"></block>'));
  return xmlList;
};

var vocabularyCallback = function(workspace) {
  var xmlList = [];
  var block = Blockly.Xml.textToDom('<button text="New entry" callbackKey="vocabularyNewEntry"></button>');
  xmlList.push(block);
  if(Vocabulary.length() == 0) return xmlList;
  for (var i = 0; i < Vocabulary.length(); i++) {
	var blockText = 
	  '<block type="vocabulary_node">'+
		'<field name="NAME">' + Vocabulary.get(i) + '</field>' +
	  '</block>';
	var block = Blockly.Xml.textToDom(blockText);
	xmlList.push(block);
  }
  return xmlList;
};

var taxonomyCallback = function(workspace) {
  var xmlList = [];
  var block = Blockly.Xml.textToDom('<button text="New entry" callbackKey="taxonomyNewEntry"></button>');
  xmlList.push(block);
  if(Taxonomy.length() == 0) return xmlList;
  var block = Blockly.Xml.textToDom(
	'<block type="taxonomy_node">'+
		'<field name="NAME">' + Taxonomy.get(0) + '</field>' +
	'</block>'
  );
  xmlList.push(block);
  for (var i = 0; i < Taxonomy.length(); i++) {
    var blockText = 
	  '<block type="taxonomy_item">'+
		  '<field name="NAME">' + Taxonomy.get(i) + '</field>' +
	  '</block>';
    var block = Blockly.Xml.textToDom(blockText);
    xmlList.push(block);
  }
  return xmlList;
};

var datamodelCallback = function(workspace) {
  var xmlList = [];
  if(Vocabulary.length() == 0){
	  xmlList.push(Blockly.Xml.textToDom('<label text="No entry in Vocabulary"></label>'));
  }else{
	  xmlList.push(Blockly.Xml.textToDom('<block type="datamodel_node"></block>'));
	  xmlList.push(Blockly.Xml.textToDom('<block type="datamodel_reference"></block>'));
	  xmlList.push(Blockly.Xml.textToDom('<block type="datamodel_node_ref"></block>'));
  }
  return xmlList;
};