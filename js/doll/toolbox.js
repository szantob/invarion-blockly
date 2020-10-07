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
    //TODO entries

    xmlText = xmlText.concat('</category>');
    return xmlText
}
function toolboxUpdate(){
    let xmlText = '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">';
    xmlText = xmlText.concat(getVocabulary());
    xmlText = xmlText.concat('</xml>');
    workspace.updateToolbox(xmlText);
}
