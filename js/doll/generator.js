function GeneratorC(){


    this.check = function(){
        const warnings = [];
        const errors = [];

        const ws = new BlocklyDOM(Blockly.Xml.workspaceToDom(workspace));

        const nameBlocks = ws.getBlocksByType("cm_name");
        const vocabularyBlocks = ws.getBlocksByType("cm_vocabulary");
        const taxonomyBlocks = ws.getBlocksByType("cm_taxonomy");
        const datamodelBlocks = ws.getBlocksByType("cm_datamodel");

        if(nameBlocks.length === 0) errors.push("Concept model name missing");
        if(vocabularyBlocks.length === 0) errors.push("Vocabulary missing");
        if(taxonomyBlocks.length === 0) errors.push("Taxonomy missing");
        if(datamodelBlocks.length === 0) errors.push("Data model missing");

        if(nameBlocks.length > 1) warnings.push("Multiple concept model name declaration");
        if(vocabularyBlocks.length > 1) warnings.push("Multiple vocabulary declaration");
        if(taxonomyBlocks.length > 1) warnings.push("Multiple taxonomy declaration");
        if(datamodelBlocks.length > 1) warnings.push("Multiple data model declaration");

        return {warnings:warnings,errors:errors};
    }
    this.generate = function () {
        const ws = new BlocklyDOM(Blockly.Xml.workspaceToDom(workspace));
    }
}

const Generator = new GeneratorC();