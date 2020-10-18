function getVocabulary(toolbox){
    const vocabularyCategory = ToolboxCategoryDOM.create("Vocabulary");

    for(let i = 97; i < 123;){
        const letter = ''+String.fromCharCode(i++).toUpperCase();
        const letterCategory = ToolboxCategoryDOM.create(letter);
        const entries= Vocabulary.getCategoryEntries(letter);
        for(let i = 0; i < entries.length; i++){
            const vocabularyItemCategory = ToolboxCategoryDOM.create(entries[i].name);
            getConceptModelBlocksForName(entries[i].name,vocabularyItemCategory);
            letterCategory.addCategory(vocabularyItemCategory);
        }
        vocabularyCategory.addCategory(letterCategory);
    }
    toolbox.addCategory(vocabularyCategory);
}
function getConceptModelBlocksForName(name, category){
    const taxonomyBlock = ToolboxBlockDOM.create("taxonomy_node");
    const nameFieldT = ToolboxFieldDOM.create("name",name);
    taxonomyBlock.addField(nameFieldT);
    category.addBlock(taxonomyBlock);

    const propertyBlock = ToolboxBlockDOM.create("property_node");
    const nameFieldP = ToolboxFieldDOM.create("name",name);
    propertyBlock.addField(nameFieldP);
    category.addBlock(propertyBlock);

    const datamodelBlock = ToolboxBlockDOM.create("datamodel_node");
    const nameFieldD = ToolboxFieldDOM.create("name",name);
    datamodelBlock.addField(nameFieldD);
    category.addBlock(datamodelBlock);
}

function toolboxUpdate(){
    const toolbox = ToolboxDOM.create();
    getVocabulary(toolbox);
    workspace.updateToolbox(toolbox.toXml());
}
