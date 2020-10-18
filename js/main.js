function onSave(){
	const wsXml = Blockly.Xml.workspaceToDom(workspace);
    const text = Blockly.Xml.domToText(wsXml);
	window.localStorage.setItem('workspaceSave', text);
	console.log(wsXml);
	const vocabularyText = Vocabulary.print();
	window.localStorage.setItem('vocabularySave', vocabularyText);

}
function onLoad(){
    Vocabulary.initialize();
	workspace.registerButtonCallback('taxonomyNewEntry', onNewTaxonomyEntry);

	const xml_text = window.localStorage.getItem('workspaceSave');
	if(xml_text != null){
        const xml = Blockly.Xml.textToDom(xml_text);
        Blockly.Xml.domToWorkspace(xml, workspace);
    }
	const vocabularyText = window.localStorage.getItem('vocabularySave');
    if(vocabularyText != null){
        Vocabulary.load(vocabularyText);
    }

	toolboxUpdate();
	//DOMTEST(xml);   //TODO
}
function onInit(){
    Workspace.initialize().commit(); //TODO
    //Vocabulary.load(TestTEXT);
}

function onNewTaxonomyEntry(){
    Taxonomy.load();
    const itemName = prompt("New taxonomy entry name:", "Thing");

    if(!Checker.checkNameValidity(itemName))            return;
    if(!Checker.checkNewTaxonomyEntry(itemName))        return;
    if(!Checker.checkOrCreateVocaularyEntry(itemName))  return;

    Taxonomy.addRoot(itemName);
    Taxonomy.commit();
}
function onNewDatamodelEntry() {
    DataModel.load();
    const itemName = prompt("New data model entry name:", "Thing");

    if(!Checker.checkNameValidity(itemName))            return;
    if(!Checker.checkExistingTaxonomyEntry(itemName))   return;
    if(!Checker.checkOrCreateVocaularyEntry(itemName))  return;

    DataModel.addRoot(itemName);
    DataModel.commit();

}
function onNewProperty(nodeId){
    const itemName = prompt("New property name:", "Thing"); //TODO
    Workspace.load();

    if(!Checker.checkNameValidity(itemName))            return;
    if(!Checker.checkExistingTaxonomyEntry(itemName))   return;
    if(!Checker.checkOrCreateVocaularyEntry(itemName))  return;

    const newNode = PropertyNode.create(itemName,'String');
    Workspace.getNodeById(nodeId).addChild(newNode);
    Workspace.commit();
}
function onNewChild(nodeId,type){
    Workspace.load();
    const itemName = prompt("New data model entry name:", "Thing");

    if(!Checker.checkNameValidity(itemName))            return;

    let node;
    switch (type) {
        case('taxonomy_node'):
            if(!Checker.checkNewTaxonomyEntry(itemName))        return;
            if(!Checker.checkOrCreateVocaularyEntry(itemName))  return;
            node = TaxonomyNode.create(itemName);
            break;
        case('datamodel_node'):
            if(!Checker.checkExistingTaxonomyEntry(itemName))   return;
            if(!Checker.checkOrCreateVocaularyEntry(itemName))  return;
            node = DataModelNode.create(itemName);
            break;
        default:
            throw "Ezt meg elfelejtetted ;)"
    }

    Workspace.getNodeById(nodeId).addChild(node);
    Workspace.commit();
}

function onDownload(){
    //TODO
}


function onGenerate(){
    console.log(Generator.generateConceptModel());
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

const VocabularyTestTEXT=     //TODO Dynamic
    "  Accept:\"\"                  \n" +
    "    Administrator:\"\"           \n" +
    "    Analyst:\"\"                 \n" +
    "    Andorra:\"\"                 \n" +
    "    Argentina:\"\"               \n" +
    "    Age:\"\"  \n" +
    "    Albania:\"\"                 \n" +
    "    Algeria:\"\"                 \n" +
    "    Artist:\"\"                  \n" +
    "    Australia:\"\"               \n" +
    "    Cancel:\"\"                  \n" +
    "    CarbonCopyAddress:\"\"       \n" +
    "    China:\"\"                   \n" +
    "    Austria:\"\"                 \n" +
    "    Bahamas:\"\"                 \n" +
    "    Bahrain:\"\"                 \n" +
    "    Barbados:\"\"                \n" +
    "    Belarus:\"\"                 \n" +
    "    Belgium:\"\"                 \n" +
    "    BirthDate:\"\"               \n" +
    "    BirthName:\"\"               \n" +
    "    Bolivia:\"\"                 \n" +
    "    Bookbinder:\"\"              \n" +
    "    BosniaAndHerzegovina:\"\"    \n" +
    "    Botswana:\"\"                \n" +
    "    Brazil:\"\"                  \n" +
    "    Bulgaria:\"\"                \n" +
    "    Burma:\"\"                   \n" +
    "    Canada:\"\"                  \n" +
    "    City:\"\" \n" +
    "    Close:\"\"                   \n" +
    "    ConfirmPassword:\"\"         \n" +
    "    CopyToAddress:\"\"           \n" +
    "    Country:\"\"                 \n" +
    "    Cuba:\"\" \n" +
    "    Cyprus:\"\"                  \n" +
    "    CzechRepublic:\"\"           \n" +
    "    DataStoreName:\"\"           \n" +
    "    DataStoreType:\"\"           \n" +
    "    DataStoreURL:\"\"            \n" +
    "    Delete:\"\"                  \n" +
    "    Denmark:\"\"                 \n" +
    "    Dr:\"\"   \n" +
    "    Edit:\"\" \n" +
    "    EditProperty:\"\"            \n" +
    "    Education:\"\"               \n" +
    "    Egypt:\"\"                   \n" +
    "    EmailAddress:\"\"            \n" +
    "    Engineer:\"\"                \n" +
    "    Estonia:\"\"                 \n" +
    "    Female:\"\"                  \n" +
    "    Find:\"\" \n" +
    "    Finland:\"\"                 \n" +
    "    FirstName:\"\"               \n" +
    "    Flat:\"\" \n" +
    "    Floor:\"\"                   \n" +
    "    Form:\"\" \n" +
    "    France:\"\"                  \n" +
    "    FromAddress:\"\"             \n" +
    "    Gender:\"\"                  \n" +
    "    Germany:\"\"                 \n" +
    "    GrammarSchool:\"\"           \n" +
    "    Greece:\"\"                  \n" +
    "    Help:\"\" \n" +
    "    HiddenField:\"\"             \n" +
    "    HongKong:\"\"                \n" +
    "    HouseNumber:\"\"             \n" +
    "    Hungary:\"\"                 \n" +
    "    ITProfessional:\"\"          \n" +
    "    Iceland:\"\"                 \n" +
    "    Id:\"\"   \n" +
    "    India:\"\"                   \n" +
    "    Indonesia:\"\"               \n" +
    "    Iran:\"\" \n" +
    "    Iraq:\"\" \n" +
    "    Ireland:\"\"                 \n" +
    "    Israel:\"\"                  \n" +
    "    Italy:\"\"                   \n" +
    "    Japan:\"\"                   \n" +
    "    Job:\"\"  \n" +
    "    Jordan:\"\"                  \n" +
    "    KoreaSouth:\"\"              \n" +
    "    Kuwait:\"\"                  \n" +
    "    LastName:\"\"                \n" +
    "    Latvia:\"\"                  \n" +
    "    Lawyer:\"\"                  \n" +
    "    Liechtenstein:\"\"           \n" +
    "    Lithuania:\"\"               \n" +
    "    Luxembourg:\"\"              \n" +
    "    Macedonia:\"\"               \n" +
    "    Male:\"\" \n" +
    "    Malta:\"\"                   \n" +
    "    Mason:\"\"                   \n" +
    "    MiddleName:\"\"              \n" +
    "    Miss:\"\" \n" +
    "    Modify:\"\"                  \n" +
    "    Moldova:\"\"                 \n" +
    "    Monaco:\"\"                  \n" +
    "    Montenegro:\"\"              \n" +
    "    MothersName:\"\"             \n" +
    "    Move:\"\" \n" +
    "    Mr:\"\"   \n" +
    "    Mrs:\"\"  \n" +
    "    Ms:\"\"   \n" +
    "    Navigate:\"\"                \n" +
    "    NavigateDown:\"\"            \n" +
    "    NavigateNext:\"\"            \n" +
    "    NavigatePrevious:\"\"        \n" +
    "    NavigateUp:\"\"              \n" +
    "    Netherlands:\"\"             \n" +
    "    New:\"\"  \n" +
    "    Norway:\"\"                  \n" +
    "    OK:\"\"   \n" +
    "    Open:\"\" \n" +
    "    Password:\"\"                \n" +
    "    PersonalMessage:\"\"         \n" +
    "    PersonalTitle:\"\"           \n" +
    "    PhoneNumber:\"\"             \n" +
    "    Physician:\"\"               \n" +
    "    Poland:\"\"                  \n" +
    "    PopupList:\"\"               \n" +
    "    President:\"\"               \n" +
    "    ProductManager:\"\"          \n" +
    "    Prof:\"\" \n" +
    "    Profession:\"\"              \n" +
    "    ProjectManager:\"\"          \n" +
    "    Register:\"\"                \n" +
    "    Rename:\"\"                  \n" +
    "    Romania:\"\"                 \n" +
    "    Russia:\"\"                  \n" +
    "    SalesAccountManager:\"\"     \n" +
    "    SanMarino:\"\"               \n" +
    "    Save:\"\" \n" +
    "    SaveAs:\"\"                  \n" +
    "    Scientist:\"\"               \n" +
    "    SecondarySchool:\"\"         \n" +
    "    Serbia:\"\"                  \n" +
    "    SessionIdentifier:\"\"       \n" +
    "    Sir:\"\"  \n" +
    "    Slovakia:\"\"                \n" +
    "    Slovenia:\"\"                \n" +
    "    SocialSecurityNumber:\"\"    \n" +
    "    Spain:\"\"                   \n" +
    "    Street:\"\"                  \n" +
    "    Sweden:\"\"                  \n" +
    "    Switzerland:\"\"             \n" +
    "    SystemAdministrator:\"\"     \n" +
    "    TaxNumber:\"\"               \n" +
    "    Teacher:\"\"                 \n" +
    "    TextField:\"\"               \n" +
    "    ToAddress:\"\"               \n" +
    "    Turkey:\"\"                  \n" +
    "    Ukraine:\"\"                 \n" +
    "    UnitedKingdom:\"\"           \n" +
    "    UnitedStatesOfAmerica:\"\"   \n" +
    "    University:\"\"              \n" +
    "    Unregister:\"\"              \n" +
    "    Update:\"\"                  \n" +
    "    UserName:\"\"                \n" +
    "    Weight:\"\"                  \n" +
    "    ZipCode:\"\"        ";