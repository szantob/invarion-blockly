class Checker{
    static fqNameTable;
    static load(){

        return this;
    }

    // Runtime checks
    static checkNameValidity(itemName){
        if (itemName == null || itemName === ""){
            return false;
        }
        return true;
    }
    static checkOrCreateVocaularyEntry(itemName){
        if(!Vocabulary.includes(itemName)){
            if(confirm("Vocabulary entry with name \"" + itemName +"\" not exist. Do you want to create it?") === true){
                Vocabulary.add(itemName,"");
            }else{
                return false;
            }
        }
        return true;
    }
    static checkExistingTaxonomyEntry(itemName){
        Taxonomy.load();
        if(!Taxonomy.includes(itemName)){
            alert("Taxonomy entry with name \"" + itemName +"\" not exist.");
            return false;
        }
        return true;
    }
    static checkNewTaxonomyEntry(itemName){
        if(Taxonomy.includes(itemName)){
            alert("Taxonomy entry with name \"" + itemName +"\" already exist.");
            return false;
        }
        return true;
    }

    // Generator checks
    static generatorChecks(){   //TODO rename
        this.updateFullyQualifiedNameList()
    }

    static updateFullyQualifiedNameList(){
        this.fqNameTable = new abcHashTable();
        Taxonomy.load();
        const taxonomyEntryList = Taxonomy.getTaxonomyNodeList();
        for(let i = 0; i < taxonomyEntryList.length; i++){
            const name = taxonomyEntryList[i].getName();
            const fqName = taxonomyEntryList[i].getFullyQualifiedName();
            if(fqName === null ) return; //TODO

            this.fqNameTable.add(name,{name:name,fqn:fqName});
        }
    }
    static checkForFullyQualifiedName(itemName){
        const fqNameEntry = this.fqNameTable.get(itemName);
        if(fqNameEntry === null){
            return null;
        }
        return fqNameEntry.fqn;
    }
}
class Generator{
    static generateConceptModel(){
        Checker.generatorChecks();

        const vocabulary = this.generateVocabulary();
        const taxonomy = this.generateTaxonomy();
        const datamodel = this.generateDataModel();
        return vocabulary + taxonomy + datamodel;
    }
    static generateVocabulary(){
        const vocabularyString = Vocabulary.print();
        return "vocabulary: {\n" + vocabularyString + "}\n"
    }
    static generateTaxonomy(){
        Taxonomy.load();
        const taxonomyLineArray = [];
        taxonomyLineArray.push("taxonomy:{\n");

        const taxonomyRoots = Taxonomy.getRoots();
        for(let i = 0; i < taxonomyRoots.length; i++){
           taxonomyGeneratorDFS(taxonomyLineArray,taxonomyRoots[i],1);
        }
        taxonomyLineArray.push("}\n");

        let taxonomyString = "";
        for (let i = 0; i < taxonomyLineArray.length; i++){
            taxonomyString = taxonomyString + taxonomyLineArray[i];
        }
        return taxonomyString;
    }
    static generateDataModel(){
        DataModel.load();
        const datamodelLineArray = [];
        datamodelLineArray.push("datamodel:{\n");

        const datamodelRoots = Taxonomy.getRoots();
        for(let i = 0; i < datamodelRoots.length; i++){
            datamodelGeneratorDFS(datamodelLineArray,datamodelRoots[i],1);
        }
        datamodelLineArray.push("}\n");

        let datamodelString = "";
        for (let i = 0; i < datamodelLineArray.length; i++){
            datamodelString = datamodelString + datamodelLineArray[i];
        }
        return datamodelString;
    }
}
function taxonomyGeneratorDFS(lineArray, taxonomyNode, layer){
    const tabs = "\t".repeat(layer);
    lineArray.push(tabs + taxonomyNode.getName() + ": {\n");

    const nodeProperties = taxonomyNode.getProperties();
    for (let i = 0; i < nodeProperties.length; i++){
        propertyGenerator(lineArray, nodeProperties[i], layer+1);
    }
    const nodeChildren = taxonomyNode.getChildren();
    for (let i = 0; i < nodeChildren.length; i++){
        taxonomyGeneratorDFS(lineArray, nodeChildren[i], layer+1);
    }

    lineArray.push(tabs + "}\n")
}
function datamodelGeneratorDFS(lineArray, datamodelNode, layer){
    const tabs = "\t".repeat(layer);
    const name = datamodelNode.getName();
    const fqName = Checker.checkForFullyQualifiedName(name);

    lineArray.push(tabs + datamodelNode.getName() + ": {\n");
    lineArray.push(tabs + "\tISA:" + fqName + "\n");

    const nodeProperties = datamodelNode.getProperties();
    for (let i = 0; i < nodeProperties.length; i++){
        propertyGenerator(lineArray, nodeProperties[i], layer+1);
    }
    const nodeChildren = datamodelNode.getChildren();
    for (let i = 0; i < nodeChildren.length; i++){
        datamodelGeneratorDFS(lineArray, nodeChildren[i], layer+1);
    }

    lineArray.push(tabs + "}\n")
}
function propertyGenerator(lineArray, propertyNode, layer){
    const tabs = "\t".repeat(layer);
    const name = propertyNode.getName();
    const fqName = Checker.checkForFullyQualifiedName(name);
    const type = propertyNode.getType();
    /*const value = propertyNode.getValue();
    const unit = propertyNode.getUnit();
    const range = propertyNode.getRange();
    const enumv = propertyNode.getEnum();*/

    lineArray.push(tabs + name + ":{\n");
    lineArray.push(tabs + "\t ISA:" + fqName + "\n");
    lineArray.push(tabs + "\t type:" + type + "\n");
    lineArray.push(tabs + "}\n");
}

function generatorDFSFactory(myselfRef){
    return function(lineArray, node, layer){
        const tabs = "\t".repeat(layer);
        lineArray.push(tabs + node.getName() + ": {\n");

        const nodeProperties = node.getProperties();
        for (let i = 0; i < nodeProperties.length; i++){
            propertyGenerator(lineArray, nodeProperties[i], layer+1);
        }
        const nodeChildren = node.getChildren();
        for (let i = 0; i < nodeChildren.length; i++){
            myselfRef(lineArray, nodeChildren[i], layer+1);
        }

        lineArray.push(tabs + "}\n")
    }
}