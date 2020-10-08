function getVocabulary(toolbox){
    const vocabularyCat = ToolboxCategoryDOM.create("Vocabulary");

    for(let i = 97; i < 123;){
        const letter = ''+String.fromCharCode(i++).toUpperCase();

        getLetterCategory(letter, vocabularyCat);
    }
    toolbox.addCategory(vocabularyCat);
}
function getLetterCategory(letter, vocabularyCategory){
    const letterCategory = ToolboxCategoryDOM.create(letter);

    const entries= Vocabulary.getCategoryEntries(letter);
    for(let i = 0; i < entries.length; i++){
        const vocabularyItemCategory = ToolboxCategoryDOM.create(entries[i].name);
        getConceptModelBlocksForName(entries[i].name,vocabularyItemCategory);
        letterCategory.addCategory(vocabularyItemCategory);
    }
    vocabularyCategory.addCategory(letterCategory);
}
function getConceptModelBlocksForName(name, category){
    const nameField = ToolboxFieldDOM.create("name",name);

    const taxonomyBlock = ToolboxBlockDOM.create("taxonomy_node");
    taxonomyBlock.addField(nameField);
    category.addBlock(taxonomyBlock);

    const propertyBlock = ToolboxBlockDOM.create("property_node");
    propertyBlock.addField(nameField);
    category.addBlock(propertyBlock);
}
function toolboxUpdate(){
    const toolbox = ToolboxDOM.create();
    getVocabulary(toolbox);
    workspace.updateToolbox(toolbox.toXml());
}
