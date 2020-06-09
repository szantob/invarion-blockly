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
    };
    this.generate = function () {

        //console.log(new Concept());

        const codeLines = dollGenerator(new Concept());
        for(let i = 0;i < codeLines.length; i++)
            console.log(codeLines[i]);

    };
    function Concept(){
        function VocabularyItem(vocabularyBlock){
            const name = vocabularyBlock.getFieldsByName("name")[0].getText();
            const desc = vocabularyBlock.getFieldsByName("description")[0].getText();

            this.toString = function(){
                return name + " : \"" + desc + "\"";
            }
        }
        function TaxonomyItem(taxonomyBlock) {
            const name = taxonomyBlock.getFieldsByName("name")[0].getText();
            const childrenList = [];

            const blockStatement = taxonomyBlock.getStatements()[0];
            if(blockStatement !== undefined){
                const childNodes = blockStatement.getBlockList();
                for (let i = 0; i < childNodes.length; i++){
                    childrenList.push(new TaxonomyItem(childNodes[i]));
                }
            }

            this.toString = function(){
                return name + " : {";
            };
            this.getChildren = function(){
                return childrenList;
            };
        }

        const ws = new BlocklyDOM(Blockly.Xml.workspaceToDom(workspace));

        this.name = ws.getBlocksByType("cm_name")[0].getFieldsByName("name")[0].getText();
        this.vocabulary = [];
        this.taxonomy = [];
        this.datamodel = [];

        try {
            const vocabularyBlocks = ws.getBlocksByType("cm_vocabulary")[0].getStatementsByName("name")[0].getBlockList();
            for (let i = 0; i < vocabularyBlocks.length; i++) {
                this.vocabulary.push(new VocabularyItem(vocabularyBlocks[i]));
            }
        }catch(e){
            console.warn("Empty vocabulary?");
        }
        try {
            const taxonomyBlocks = ws.getBlocksByType("cm_taxonomy")[0].getStatementsByName("name")[0].getBlockList();
            console.log(taxonomyBlocks.length);
            for (let i = 0; i < taxonomyBlocks.length; i++){
                this.taxonomy.push(new TaxonomyItem(taxonomyBlocks[i]));
            }
        }catch(e){
            console.warn("Empty taxonomy?");
        }

    }
    function dollGenerator(model) {
        const cmLines = [];
        cmLines.push("concept : {");
        cmLines.push("    name : "+ model.name +",");

        // Generate vocabulary
        const vocabularyLines = [];
        vocabularyLines.push("    vocabulary : {");
        for (let i = 0; i < model.vocabulary.length; i++){
            let lineString ="        "+model.vocabulary[i].toString();
            if(i !==  model.vocabulary.length - 1)
                lineString = lineString.concat(",");
            vocabularyLines.push(lineString);
        }
        vocabularyLines.push("    },");

        // Generate taxonomy
        let taxonomyLines = [];
        taxonomyLines.push("    taxonomy : {");
        function taxonomyLinesDFS (taxonomy,tabNumber){
            let tab = "";
            for(let i=0;i<tabNumber;i++) tab = tab.concat("   ");
            const tabs = tab;

            let lines = [];

            const children = taxonomy.getChildren();
            if(children.length === 0)
                lines.push(tabs + taxonomy.toString() + "},");
            else{
                lines.push(tabs + taxonomy.toString());
                for (let i = 0; i < children.length; i++){
                    const childLines = taxonomyLinesDFS(children[i],tabNumber+1);
                    lines = lines.concat(childLines);
                }
                lines.push(tabs+"},");
            }
            return lines;
        }
        for (let i = 0; i < model.taxonomy.length; i++){
            taxonomyLines = taxonomyLines.concat(taxonomyLinesDFS(model.taxonomy[i],2));
            console.log(model.taxonomy[i].getChildren()[0].toString());
        }


        return cmLines.concat(vocabularyLines,taxonomyLines);
    }
}

const Generator = new GeneratorC();