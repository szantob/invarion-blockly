var onSave = function(){
	var wsXml = Blockly.Xml.workspaceToDom(workspace);
	var text = Blockly.Xml.domToText(wsXml);
	window.localStorage.setItem('workspaceSave', text);
};
var onLoad = function(){
	var xml_text = window.localStorage.getItem('workspaceSave');
	if(xml_text == null) return;
	var xml = Blockly.Xml.textToDom(xml_text);
	Blockly.Xml.domToWorkspace(xml, workspace);
};

var onInit = function(){
	var wsXml = Blockly.Xml.workspaceToDom(workspace);
	workspace.clear();
	var wsDOM = new BlocklyDOM(wsXml);
	
	var nameBlock = createBlock("concept_model_dec_name","concept_model_name", 20,20);
	wsDOM.add(nameBlock);
	var vocabularyBlock = createBlock("concept_model_dec_vocabulary","concept_model_vocabulary", 20,50);
	wsDOM.add(vocabularyBlock);
	var taxonomyBlock = createBlock("concept_model_dec_taxonomy","concept_model_taxonomy", 320,50);
	wsDOM.add(taxonomyBlock);
	var datamodelBlock = createBlock("concept_model_dec_datamodel","concept_model_datamodel", 620,50);
	wsDOM.add(datamodelBlock);
	
	wsXml = wsDOM.toXml();
	workspace.clear();
	Blockly.Xml.domToWorkspace(wsXml, workspace);
};

var onNewVocabularyEntry = function(){
	var itemName = prompt("New vocabulary entry name:", "Thing");
	if (itemName == null || itemName == "") {
	} else {
		Vocabulary.addItem(itemName);
		toolboxUpdate();
	}
	return;		
};

var onDownload = function(){
	var xml = Blockly.Xml.workspaceToDom(workspace);
	var xml_text = Blockly.Xml.domToText(xml);
	var blob = new Blob([xml_text], { type: "text/xml;charset=utf-8" });
	saveAs(blob, "workspace.xml");
}

var taxonomyNewEntryCallback = function(){
	var itemName = prompt("New taxonomy entry name:", "Thing");
  if (itemName == null || itemName == "") {
  } else {
	  Taxonomy.addItem(itemName);
	  toolboxUpdate();
  }
	return;
};