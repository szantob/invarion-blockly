function onSave(){
	const wsXml = Blockly.Xml.workspaceToDom(workspace);
    const text = Blockly.Xml.domToText(wsXml);
	window.localStorage.setItem('workspaceSave', text);

	console.log(wsXml); //TODO DEBUG
}
function onLoad(){
	workspace.registerButtonCallback('taxonomyNewEntry', onNewTaxonomyEntry);

	const xml_text = window.localStorage.getItem('workspaceSave');
	if(xml_text != null){
        const xml = Blockly.Xml.textToDom(xml_text);
        Blockly.Xml.domToWorkspace(xml, workspace);
    }

	toolboxUpdate();
	//DOMTEST(xml);   //TODO
}
function onInit(){
    workspace.clear();
    let wsXml = Blockly.Xml.workspaceToDom(workspace);
    const wsDOM = new WorkspaceDOM(wsXml);

    const nameBlock = createBlock("cm_name","cm_name");
    nameBlock.setPos(20,20);
    wsDOM.add(nameBlock);
    wsXml = wsDOM.toXml();
    Blockly.Xml.domToWorkspace(wsXml, workspace);

    Taxonomy.load();
    Taxonomy.getRootBlock();
    Taxonomy.commit();

    Datamodel.load();
    Datamodel.getRootBlock();
    Datamodel.commit();
}

function onNewTaxonomyEntry(){
    Taxonomy.load();
    const itemName = prompt("New taxonomy entry name:", "Thing");
    if (itemName == null || itemName === ""){
        return;
    }
    if(Taxonomy.includes(itemName)){
        alert("Taxonomy entry with name \"" + itemName +"\" already exist.");
        return;
    }

    Taxonomy.addBlock(itemName).commit();

}
function onNewDatamodelEntry() {
    Datamodel.load();
    const itemName = prompt("New data model entry name:", "Thing");
    if (itemName == null || itemName === ""){
        return;
    }
    if(Datamodel.includes(itemName)){
        alert("Datamodel entry with name \"" + itemName +"\" already exist.");
        return;
    }
    Datamodel.addBlock(itemName).commit();

}
function onNewTaxonomyTreeEntry(parentId){
    const itemName = prompt("New taxonomy entry name:", "Thing");
    if (itemName == null || itemName === ""){
        return;
    }
    if(Taxonomy.includes(itemName)){
        alert("Taxonomy entry with name \"" + itemName +"\" already exist.");
        return;
    }
    Taxonomy.load().addToChild(parentId, itemName).commit();
}
function onNewDatamodelDataTreeEntry(parentId){
    const itemName = prompt("New data model entry name:", "Thing");
    if (itemName == null || itemName === ""){
        return;
    }
    if(Datamodel.includes(itemName)){
        alert("Datamodel entry with name \"" + itemName +"\" already exist.");
        return;
    }
    Datamodel.load().addToChild(parentId, itemName).commit();

}
function onNewProperty(nodeId){
    const itemName = prompt("New Property name:", "Thing");
    if (itemName == null || itemName === ""){
        return;
    }
    Datamodel.load().addToChild(nodeId, itemName, "properties", "taxonomy_item", false).commit();
    if(!Taxonomy.load().includes(itemName))
        Taxonomy.addBlock(itemName).commit();
}

function onDownload(){
    //TODO
}


function onGenerate(){
	const msgs = Generator.check();

    for(let i=0;i<msgs.errors.length;i++){
        console.error(msgs.errors[i]);
    }
    for(let i=0;i<msgs.warnings.length;i++){
        console.warn(msgs.warnings[i]);
    }

    Generator.generate();
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