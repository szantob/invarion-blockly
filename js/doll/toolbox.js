function conceptmodelCallback() {
  const xmlList = [];
  xmlList.push(Blockly.Xml.textToDom('<block type="cm_name"><field name="name">concept model name</field></block>'));
  xmlList.push(Blockly.Xml.textToDom('<block type="cm_vocabulary"></block>'));
  xmlList.push(Blockly.Xml.textToDom('<block type="cm_taxonomy"></block>'));
  xmlList.push(Blockly.Xml.textToDom('<block type="cm_datamodel"></block>'));
  return xmlList;
}

function vocabularyCallback() {
  const xmlList = [];
  const buttonBlock = Blockly.Xml.textToDom('<button text="New entry" callbackKey="vocabularyNewEntry"></button>');
  xmlList.push(buttonBlock);

  const vocabularyEntityList = getVocabularyEntryList();
  if(vocabularyEntityList == null) return xmlList;
  for (let i = 0; i < vocabularyEntityList.length; i++) {
      const blockText =
          '<block type="vocabulary_node">'+
            '<field name="name">' + vocabularyEntityList[i] + '</field>' +
          '</block>';
      const block = Blockly.Xml.textToDom(blockText);
      xmlList.push(block);
  }
  return xmlList;
}

function taxonomyCallback() {
  const xmlList = [];
  const buttonBlock = Blockly.Xml.textToDom('<button text="New entry" callbackKey="taxonomyNewEntry"></button>');
  xmlList.push(buttonBlock);

  const taxonomyList = getTaxonomyEntryList();
  if(taxonomyList.length === 0) return xmlList;
  var block = Blockly.Xml.textToDom(
	'<block type="taxonomy_node">'+
		'<field name="name">' + taxonomyList[0] + '</field>' +
	'</block>'
  );
  xmlList.push(block);
  for (var i = 0; i < taxonomyList.length; i++) {
    var blockText = 
	  '<block type="taxonomy_item">'+
		  '<field name="name">' + taxonomyList[i] + '</field>' +
	  '</block>';
    var block = Blockly.Xml.textToDom(blockText);
    xmlList.push(block);
  }
  return xmlList;
}

function datamodelCallback() {
  const xmlList = [];
  const vocabularyEntityList = getVocabularyEntryList();
  if(vocabularyEntityList == null){
	  // language=XML
      xmlList.push(Blockly.Xml.textToDom('<label text="No entry in Vocabulary"></label>'));
  }else{
	  xmlList.push(Blockly.Xml.textToDom('<block type="datamodel_node"></block>'));
	  xmlList.push(Blockly.Xml.textToDom('<block type="datamodel_reference"></block>'));
	  xmlList.push(Blockly.Xml.textToDom('<block type="datamodel_node_ref"></block>'));
  }
  return xmlList;
}