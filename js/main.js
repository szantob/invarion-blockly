function RootNode(type,ctype,x,y,iterator,collapse){
    this.id= type;
    this.childType = ctype;
    this.defX = x;
    this.defY = y;
    this.iterator = iterator;
    this.collapse = collapse;

    this.ws = {};

    this.load = function(){
        this.ws = new BlocklyDOM(Blockly.Xml.workspaceToDom(workspace));
        return this;
    };
    this.commit = function(){
        workspace.clear();
        Blockly.Xml.domToWorkspace(this.ws.toXml(), workspace);
        toolboxUpdate();
    };

    this.getRootBlock = function(){
        let block =  this.ws.getBlockById(this.id);
        if(block === null){
            block  = createBlock(this.id,this.id);
            block .setPos(this.defX,this.defY);
            this.ws.add(block);
        }
        return block;
    };
    this.getRootStatement = function() {
        const rootBlock = this.getRootBlock(this.ws);
        let statement = rootBlock.getStatements()[0];
        if(statement === undefined){
            statement = createStatement("name");
            rootBlock.addStatement(statement);
        }
        return statement;
    };

    this.addBlock = function(name){
        const statement = this.getRootStatement(this.ws);
        const block = createBlock(this.childType,getHashCode(this.childType));
        block.addField(createField("name",name));
        block.setCollapsed(this.collapse);
        statement.push(block);
        return this;
    };
    this.addToChild = function (childId, name, statement, type, collapse){
        if(statement === undefined) statement = "children";
        if(type === undefined) type = this.childType;
        if(collapse === undefined) collapse = this.collapse;

        const rootBlock = this.ws.getBlockById(childId);
        rootBlock.setCollapsed(false);

        let childrenStatement = rootBlock.getStatementsByName(statement)[0];
        if(childrenStatement === undefined){
            childrenStatement = createStatement(statement);
            rootBlock.addStatement(childrenStatement);
        }

        const block = createBlock(type,getHashCode(type));
        block.addField(createField("name",name));
        block.setCollapsed(collapse);
        childrenStatement.push(block);
        return this;
    };

    this.includes = function(name){
        const entryList = this.getEntryList();
        if((entryList!=null) && (entryList.includes(name))) return true;
        return false;
    };

    this.getEntryList = function(){
        const rootBlock = this.ws.getBlockById(this.id);
        if(rootBlock === null) return [];
        const rootStatement = rootBlock.getStatements()[0];
        if(rootStatement === undefined) return [];
        const firstBlock = rootStatement.getBlockList()[0];
        if(firstBlock === undefined) return [];
        const iterator = new this.iterator(firstBlock);
        const nameList = [];
        do{
            const block = iterator.get();
            const nameField = block.getFieldsByName("name")[0];
            nameList.push(nameField.getText());
        }while(iterator.next());
        return nameList;
    }
}

function VocabularyIterator (firstNode){
    this.node = firstNode;

    this.get = function(){
        return this.node;
    };
    this.next = function(){
        const nextNode = this.node.getNext();
        if(nextNode === null) return false;
        this.node = nextNode;
        return true;
    }
}
const Vocabulary = new RootNode("cm_vocabulary","vocabulary_node",20,50,VocabularyIterator,false);

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
function TaxonomyIterator (firstNode){
    this.list = taxonomyDFS(firstNode);
    this.i = 0;

    this.get = function(){
        return this.list[this.i];
    };
    this.next = function(){
        if(this.list[this.i+1] === undefined) return false;
        this.i = this.i+1;
        return true;
    }
}
const Taxonomy = new RootNode("cm_taxonomy","taxonomy_node",320,50,TaxonomyIterator,true);

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
function DatamodelIterator (firstNode){
    this.list = datamodelDFS(firstNode);
    this.i = 0;

    this.get = function(){
        return this.list[this.i];
    };
    this.next = function(){
        if(this.list[this.i+1] === undefined) return false;
        this.i = this.i+1;
        return true;
    }
}
const Datamodel = new RootNode("cm_datamodel","datamodel_node",620,50,DatamodelIterator,true);

function onSave(){
	const wsXml = Blockly.Xml.workspaceToDom(workspace);
    const text = Blockly.Xml.domToText(wsXml);
	window.localStorage.setItem('workspaceSave', text);

	console.log(wsXml); //TODO DEBUG
}
function onLoad(){
	workspace.registerButtonCallback('vocabularyNewEntry', onNewVocabularyEntry);
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
    const wsDOM = new BlocklyDOM(wsXml);

    const nameBlock = createBlock("cm_name","cm_name");
    nameBlock.setPos(20,20);
    wsDOM.add(nameBlock);
    wsXml = wsDOM.toXml();
    Blockly.Xml.domToWorkspace(wsXml, workspace);

    Vocabulary.load();
    Vocabulary.getRootBlock();
    Vocabulary.commit();

    Taxonomy.load();
    Taxonomy.getRootBlock();
    Taxonomy.commit();

    Datamodel.load();
    Datamodel.getRootBlock();
    Datamodel.commit();
}

function onNewVocabularyEntry(){
    Vocabulary.load();
	const itemName = prompt("New vocabulary entry name:", "Thing");
	if (itemName == null || itemName === ""){
		return;
	}
	if(Vocabulary.includes(itemName)){
		alert("Vocabulary entry with name \"" + itemName +"\" already exist.");
		return;
	}

	Vocabulary.addBlock(itemName).commit();
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

    if(!Vocabulary.load().includes(itemName)){
        Vocabulary.addBlock(itemName).commit();
    }
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

    if(!Vocabulary.load().includes(itemName)){
        Vocabulary.addBlock(itemName).commit();
    }
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

    if(!Vocabulary.load().includes(itemName)){
        Vocabulary.addBlock(itemName).commit();
    }
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

    if(!Vocabulary.load().includes(itemName)){
        Vocabulary.addBlock(itemName).commit();
    }
}
function onNewProperty(nodeId){
    const itemName = prompt("New Property name:", "Thing");
    if (itemName == null || itemName === ""){
        return;
    }
    Datamodel.load().addToChild(nodeId, itemName, "properties", "taxonomy_item", false).commit();
    if(!Taxonomy.load().includes(itemName))
        Taxonomy.addBlock(itemName).commit();
    if(!Vocabulary.load().includes(itemName))
        Vocabulary.addBlock(itemName).commit();

}

function onDownload(){
	var xml = Blockly.Xml.workspaceToDom(workspace);
	var xml_text = Blockly.Xml.domToText(xml);
	var blob = new Blob([xml_text], { type: "text/xml;charset=utf-8" });
	saveAs(blob, "workspace.xml");
}


function onGenerate(){
	const msgs = Generator.check();

    for(let i=0;i<msgs.errors.length;i++){
        console.error(msgs.errors[i]);
    }
    for(let i=0;i<msgs.warnings.length;i++){
        console.warn(msgs.warnings[i]);
    }
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