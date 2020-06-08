function getConceptModelBlocks(){
    const xmlText =
        '<category name="Concept Model Blocks">' +
            '<block type="cm_name"><field name="name">concept model name</field></block>'+
            '<block type="cm_vocabulary"></block>'+
            '<block type="cm_taxonomy"></block>'+
            '<block type="cm_datamodel"></block>'+
        '</category>';
    return xmlText;
}
function getVocabularyBlocks(){
    let xmlText =
        '<category name="Vocabulary">'+
            '<button text="New entry" callbackKey="vocabularyNewEntry"></button>';


    const vocabularyEntityList = Vocabulary.load().getEntryList();
    if(vocabularyEntityList != null){
        for (let i = 0; i < vocabularyEntityList.length; i++) {
            const blockText =
                '<block type="vocabulary_node">'+
                    '<field name="name">' + vocabularyEntityList[i] + '</field>' +
                '</block>';
            xmlText = xmlText.concat(blockText);
        }
    }

    xmlText = xmlText.concat('</category>');
    return xmlText
}
function getTaxonomyBlocks(){
    let xmlText =
        '<category name="Taxonomy">'+
            '<button text="New entry" callbackKey="taxonomyNewEntry"></button>';

    const vocabularyList = Vocabulary.load().getEntryList();
    const datamodelList = Datamodel.load().getEntryList();
    if(vocabularyList !== null){
        for (let i = 0; i < vocabularyList.length; i++) {
            let name = vocabularyList[i];
            if(!datamodelList.includes(name)) {
                const categoryText =
                    '<category name=\"' + name + '\">' +
                    '<block type="taxonomy_node">' +
                    '<field name="name">' + name + '</field>' +
                    '</block>' +
                    '<block type="taxonomy_item">' +
                    '<field name="name">' + name + '</field>' +
                    '</block>' +
                    '</category>';
                xmlText = xmlText.concat(categoryText);
            }
        }
    }
    xmlText = xmlText.concat('</category>');
    return xmlText
}
function getDatamodelBlocks(){
    let xmlText = '<category name="Data Model">';


    const vocabularyList = Vocabulary.load().getEntryList();
    const taxonomyList = Taxonomy.load().getEntryList();
    if(vocabularyList == null){
        // language=XML
        xmlText = xmlText.concat('<label text="No entry in Vocabulary"/>');
    }else{
        for (let i = 0; i < vocabularyList.length; i++) {
            let name = vocabularyList[i];
            if(!taxonomyList.includes(name)) {
                const categoryText =
                    '<category name=\"' + name + '\">' +
                    '<block type="datamodel_node">' +
                    '<field name="name">' + name + '</field>' +
                    '</block>' +
                    '<block type="datamodel_reference">' +
                    '<field name="name">' + name + '</field>' +
                    '</block>' +
                    '<block type="datamodel_node_ref">' +
                    '<field name="name">' + name + '</field>' +
                    '</block>' +
                    '</category>';
                xmlText = xmlText.concat(categoryText);
            }
        }
    }
    xmlText = xmlText.concat('</category>');
    return xmlText
}
function getVariables(){
    return '<category name="Variables">'+
        '<block type="logic_null"></block>'+
        '<block type="math_number"><field name="NUM">0</field></block>'+
        '<block type="math_constant"><field name="CONSTANT">PI</field></block>'+
        '<block type="logic_boolean"><field name="BOOL">TRUE</field></block>'+
        '<block type="text"><field name="TEXT"></field></block>'+
        '</category>';
}
function toolboxUpdate(){
    let xmlText = '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">';

    xmlText = xmlText.concat(getConceptModelBlocks());
    xmlText = xmlText.concat(getVocabularyBlocks());
    xmlText = xmlText.concat(getTaxonomyBlocks());
    xmlText = xmlText.concat(getDatamodelBlocks());
    xmlText = xmlText.concat(getVariables());
    xmlText = xmlText.concat('</xml>');
    workspace.updateToolbox(xmlText);
}
