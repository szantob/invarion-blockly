function getVocabulary(){
    let xmlText ='<category name="Vocabulary">';

    for(let i = 97; i < 123;){
        const letter = ''+String.fromCharCode(i++).toUpperCase()
        xmlText = xmlText.concat(getLetterCategory(letter));
    }
    xmlText = xmlText.concat('</category>');
    return xmlText
}
function getLetterCategory(letter){
    let xmlText ='<category name="'+letter+'">';
    const entries= Vocabulary.getCategoryEntries(letter);
    for(let i = 0; i < entries.length; i++){
        xmlText = xmlText.concat('<category name="'+entries[i].name+'">');
        xmlText = xmlText.concat(getConceptModelBlocksForName(entries[i].name));
        xmlText = xmlText.concat('</category>');
    }

    xmlText = xmlText.concat('</category>');
    return xmlText
}
function getConceptModelBlocksForName(name){
    return ""+
        '<block type="taxonomy_node"><field name="name">' + name + '</field></block>'+
        '<block type="property_node"><field name="name">' + name + '</field></block>';
}
function toolboxUpdate(){
    let xmlText = '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">';
    xmlText = xmlText.concat(getVocabulary());
    xmlText = xmlText.concat('</xml>');
    workspace.updateToolbox(xmlText);
}
