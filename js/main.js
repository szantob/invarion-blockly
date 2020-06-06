function onSave(){
	var wsXml = Blockly.Xml.workspaceToDom(workspace);
	var text = Blockly.Xml.domToText(wsXml);
	window.localStorage.setItem('workspaceSave', text);

	console.log(wsXml);
}
function onLoad(){
	workspace.registerButtonCallback('vocabularyNewEntry', onNewVocabularyEntry);
	workspace.registerButtonCallback('taxonomyNewEntry', onNewTaxonomyEntry);
	
	toolboxUpdate();
	
	var xml_text = window.localStorage.getItem('workspaceSave');
	if(xml_text == null) return;
	var xml = Blockly.Xml.textToDom(xml_text);
	Blockly.Xml.domToWorkspace(xml, workspace);

	toolboxUpdate();

	DOMTEST(xml);//TODO
}
function onInit(){
	workspace.clear();
	var wsXml = Blockly.Xml.workspaceToDom(workspace);
	var wsDOM = new BlocklyDOM(wsXml);
	
	var nameBlock = createBlock("cm_name","cm_name");
	nameBlock.setPos(20,20);
	wsDOM.add(nameBlock);
	var vocabularyBlock = createBlock("cm_vocabulary","cm_vocabulary");
	vocabularyBlock.setPos(20,50);
	wsDOM.add(vocabularyBlock);
	var taxonomyBlock = createBlock("cm_taxonomy","cm_taxonomy");
	taxonomyBlock.setPos(320,50);
	wsDOM.add(taxonomyBlock);
	var datamodelBlock = createBlock("cm_datamodel","cm_datamodel");
	datamodelBlock.setPos(620,50);
	wsDOM.add(datamodelBlock);
	
	wsXml = wsDOM.toXml();
	workspace.clear();
	Blockly.Xml.domToWorkspace(wsXml, workspace);

	toolboxUpdate();
}

function onNewVocabularyEntry(){
	const itemName = prompt("New vocabulary entry name:", "Thing");
	if (itemName == null || itemName === ""){
		alert("Name");
		return; //TODO
	}
	const entryList = getVocabularyEntryList();
	if((entryList!=null) && (entryList.includes(itemName))){
		alert("Vocabulary entry with name \"" + itemName +"\" already exist.");
		return;
	}
	addBlockToVocabulary(itemName);
}
function getVocabularyEntryList() {
	const wsXml = Blockly.Xml.workspaceToDom(workspace);
	const wsDOM = new BlocklyDOM(wsXml);
	let vocabularyBlock = wsDOM.getBlockById("cm_vocabulary");
	if(vocabularyBlock === null){
		vocabularyBlock = createBlock("cm_vocabulary","cm_vocabulary");
		vocabularyBlock.setPos(20,50);
		wsDOM.add(vocabularyBlock);
	}
	let vocabularyStatement = vocabularyBlock.getStatements()[0];
	if(vocabularyStatement === undefined) return null;
	const vocabularyBlockList = vocabularyStatement.getBlockList();
	const vocabularyEntryList = [];
	for (let i=0; i<vocabularyBlockList.length; i++){
		const block =vocabularyBlockList[i];
		const nameField = block.getFieldsByName("name")[0];
		vocabularyEntryList.push(nameField.getText());
	}
	return vocabularyEntryList;
}
function addBlockToVocabulary(name){
	const wsXml = Blockly.Xml.workspaceToDom(workspace);
	const wsDOM = new BlocklyDOM(wsXml);
	let vocabularyBlock = wsDOM.getBlockById("cm_vocabulary");
	if(vocabularyBlock === null){
		vocabularyBlock = createBlock("cm_vocabulary","cm_vocabulary");
		vocabularyBlock.setPos(20,50);
		wsDOM.add(vocabularyBlock);
	}
	let vocabularyStatement = vocabularyBlock.getStatements()[0];
	if(vocabularyStatement === undefined){
		vocabularyStatement = createStatement("name");
		vocabularyBlock.addStatement(vocabularyStatement);
	}

	const newVocabularyBlock = createBlock("vocabulary_node",getHashCode("vocabulary_node"));
	newVocabularyBlock.addField(createField("name",name));
	vocabularyStatement.push(newVocabularyBlock);

	workspace.clear();
	Blockly.Xml.domToWorkspace(wsDOM.toXml(), workspace);
	toolboxUpdate();
}

function onNewTaxonomyEntry(){
	const itemName = prompt("New taxonomy entry name:", "Thing");
	if (itemName == null || itemName === ""){
		alert("Name");
		return; //TODO
	}
	const entryList = getTaxonomyEntryList();
	if((entryList!=null) && (entryList.includes(itemName))){
		alert("Taxonomy entry with name \"" + itemName +"\" already exist.");
		return;
	}
	addBlockToTaxonomy(itemName);
}
function getTaxonomyEntryList() {//TODO
	const wsXml = Blockly.Xml.workspaceToDom(workspace);
	const wsDOM = new BlocklyDOM(wsXml);
	let taxonomyBlock = wsDOM.getBlockById("cm_taxonomy");
	if(taxonomyBlock === null){ //TODO if null then NaN
		taxonomyBlock = createBlock("cm_taxonomy","cm_taxonomy");
		taxonomyBlock.setPos(320,50);
		wsDOM.add(taxonomyBlock);
	}
	let taxonomyStatement = taxonomyBlock.getStatements()[0];
	if(taxonomyStatement === undefined) return [];
	const firstBlock = taxonomyStatement.getBlockList()[0];
	if(firstBlock === undefined) return [];
	const taxonomyBlockList = taxonomyDFS(firstBlock);
	const taxonomyEntryList = [];
	for (let i=0; i<taxonomyBlockList.length; i++){
		const block =taxonomyBlockList[i];
		const nameField = block.getFieldsByName("name")[0];
		taxonomyEntryList.push(nameField.getText());
	}
	return taxonomyEntryList;
}
function taxonomyDFS(taxonomyBlock){
	let taxonomyBlockList =[];
	taxonomyBlockList.push(taxonomyBlock);
	const blockStatement = taxonomyBlock.getStatements()[0];
	if(blockStatement !== undefined){
		const childNode = blockStatement.getBlockList()[0];
		if(childNode !== undefined){
			taxonomyBlockList = taxonomyBlockList.concat(taxonomyDFS(childNode));
		}
	}
	const nextBlock = taxonomyBlock.getNext();
	if(nextBlock !== null){
		taxonomyBlockList = taxonomyBlockList.concat(taxonomyDFS(nextBlock));
	}
	return taxonomyBlockList;
}
function addBlockToTaxonomy(name){//TODO
	const wsXml = Blockly.Xml.workspaceToDom(workspace);
	const wsDOM = new BlocklyDOM(wsXml);
	let taxonomyBlock = wsDOM.getBlockById("cm_taxonomy");
	if(taxonomyBlock === null){
		taxonomyBlock = createBlock("cm_taxonomy","cm_taxonomy");
		taxonomyBlock.setPos(320,50);
		wsDOM.add(taxonomyBlock);
	}
	let taxonomyStatement = taxonomyBlock.getStatements()[0];
	if(taxonomyStatement === undefined){
		taxonomyStatement = createStatement("name");
		taxonomyBlock.addStatement(taxonomyStatement);
	}

	const newTaxonomyBlock = createBlock("taxonomy_node",getHashCode("taxonomy_node"));
	newTaxonomyBlock.addField(createField("name",name));
	taxonomyStatement.push(newTaxonomyBlock);

	workspace.clear();
	Blockly.Xml.domToWorkspace(wsDOM.toXml(), workspace);

	const vocabularyList = getVocabularyEntryList();
	if(vocabularyList==null||!vocabularyList.includes(name)){
		addBlockToVocabulary(name);
	}

	toolboxUpdate();
}
function onNewDatamodelEntry() {
	const itemName = prompt("New data model entry name:", "Thing");
	if (itemName == null || itemName === ""){
		alert("Name");
		return; //TODO
	}
	const entryList = getDatamodelEntryList();
	if((entryList!=null) && (entryList.includes(itemName))){
		alert("Taxonomy entry with name \"" + itemName +"\" already exist.");
		return;
	}
	addBlockToDatamodel(itemName);
}
function addBlockToDatamodel(name){//TODO
	const wsXml = Blockly.Xml.workspaceToDom(workspace);
	const wsDOM = new BlocklyDOM(wsXml);
	let datamodelNode = wsDOM.getBlockById("cm_datamodel");
	if(datamodelNode === null){
		datamodelNode = createBlock("cm_datamodel","cm_datamodel");
		datamodelNode.setPos(620,50);
		wsDOM.add(datamodelNode);
	}
	let datamodelSatement = datamodelNode.getStatements()[0];
	if(datamodelSatement === undefined){
		datamodelSatement = createStatement("name");
		datamodelNode.addStatement(datamodelSatement);
	}

	const newDatamodelBlock = createBlock("datamodel_node",getHashCode("datamodel_node"));
	newDatamodelBlock.addField(createField("name",name));
	datamodelSatement.push(newDatamodelBlock);

	workspace.clear();
	Blockly.Xml.domToWorkspace(wsDOM.toXml(), workspace);

	const vocabularyList = getVocabularyEntryList();
	if(vocabularyList==null||!vocabularyList.includes(name)){
		addBlockToVocabulary(name);
	}

	toolboxUpdate();
}
function getDatamodelEntryList() {//TODO
	const wsXml = Blockly.Xml.workspaceToDom(workspace);
	const wsDOM = new BlocklyDOM(wsXml);
	let datamodelBlock = wsDOM.getBlockById("cm_datamodel");
	if(datamodelBlock === null){ //TODO if null then NaN
		datamodelBlock = createBlock("cm_datamodel","cm_datamodel");
		datamodelBlock.setPos(620,50);
		wsDOM.add(datamodelBlock);
	}
	let datamodelStatement = datamodelBlock.getStatements()[0];
	if(datamodelStatement === undefined) return [];
	const firstBlock = datamodelStatement.getBlockList()[0];
	if(firstBlock === undefined) return [];
	const datamodelBlockList = datamodelDFS(firstBlock);
	const taxonomyEntryList = [];
	for (let i=0; i<datamodelBlockList.length; i++){
		const block =datamodelBlockList[i];
		const nameField = block.getFieldsByName("name")[0];
		taxonomyEntryList.push(nameField.getText());
	}
	return taxonomyEntryList;
}
function datamodelDFS(datamodelBlock){
	let datamodelBlockList =[];
	datamodelBlockList.push(datamodelBlock);
	const blockStatement = datamodelBlock.getStatements()[1];
	if(blockStatement !== undefined){
		const childNode = blockStatement.getBlockList()[0];
		if(childNode !== undefined){
			datamodelBlockList = datamodelBlockList.concat(taxonomyDFS(childNode));
		}
	}
	const nextBlock = datamodelBlock.getNext();
	if(nextBlock !== null){
		datamodelBlockList = datamodelBlockList.concat(taxonomyDFS(nextBlock));
	}
	return datamodelBlockList;
}

function onDownload(){
	var xml = Blockly.Xml.workspaceToDom(workspace);
	var xml_text = Blockly.Xml.domToText(xml);
	var blob = new Blob([xml_text], { type: "text/xml;charset=utf-8" });
	saveAs(blob, "workspace.xml");
}

function DOMTEST(wsXml){
	/*addBlockToVocabulary("Person");
	addBlockToVocabulary("PersonalName");
	/*console.log("hello");
	console.log(wsXml);
	var wsDOM = new BlocklyDOM(wsXml);
	var nameBlock = wsDOM.getBlockById("concept_model_name");
	var vocabularyBlock = wsDOM.getBlockById("concept_model_vocabulary");
	var taxonomyBlock = wsDOM.getBlockById("concept_model_taxonomy");
	var datamodelBlock = wsDOM.getBlockById("concept_model_datamodel");
	
	console.log(taxonomyBlock.isDisabled());
	taxonomyBlock.setDisabled(true);
	console.log(taxonomyBlock.isDisabled());
	
	console.log(nameBlock.isCollapsed());
	nameBlock.setCollapsed(true);
	console.log(nameBlock.isCollapsed());

	datamodelBlock.setComment(createComment("asd",80,160,false));
	
	var vocabularyStatement = createStatement("name");
	var vocabularyTestBlock = createBlock("vocabulary_node","vocabulary_node123");
	vocabularyTestBlock.addField(createField("name","Person"));
	//vocabularyTestBlock.addField(createField("description","A Human being"));
	vocabularyStatement.push(vocabularyTestBlock);
	vocabularyBlock.addStatement(vocabularyStatement);
	Blockly.Xml.domToWorkspace(wsDOM.toXml(), workspace);*/
}