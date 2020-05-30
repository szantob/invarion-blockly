var dataProvider =DataProvider.getInstance();

function onSave(){
	var wsXml = Blockly.Xml.workspaceToDom(workspace);
	var text = Blockly.Xml.domToText(wsXml);
	window.localStorage.setItem('workspaceSave', text);
	dataProvider.onSave();
};
function onLoad(){
	dataProvider.onLoad();
	console.log(dataProvider);
	
	workspace.registerToolboxCategoryCallback('VOCABULARY', vocabularyCallback);
	workspace.registerToolboxCategoryCallback('TAXONOMY', taxonomyCallback);
	workspace.registerToolboxCategoryCallback('DATAMODEL', datamodelCallback);
	workspace.registerToolboxCategoryCallback('CONCEPTMODEL', conceptmodelCallback);
	workspace.registerButtonCallback('vocabularyNewEntry', onNewVocabularyEntry);
	workspace.registerButtonCallback('taxonomyNewEntry', taxonomyNewEntryCallback);
	
	toolboxUpdate();
	
	var xml_text = window.localStorage.getItem('workspaceSave');
	if(xml_text == null) return;
	var xml = Blockly.Xml.textToDom(xml_text);
	Blockly.Xml.domToWorkspace(xml, workspace);
};


function onInit(){
	workspace.clear();
	dataProvider.onClear();
	var wsXml = Blockly.Xml.workspaceToDom(workspace);
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
		dataProvider.Vocabulary.addItem(itemName);
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
	  dataProvider.Taxonomy.addItem(itemName);
	  toolboxUpdate();
  }
	return;
};


function toolboxUpdate(){
	workspace.updateToolbox(workspace_xml);
}