class RootNode{
    constructor(type,ctype,x,y,iterator,collapse) {
        this.id = type;
        this.childType = ctype;
        this.defX = x;
        this.defY = y;
        this.iterator = iterator;
        this.collapse = collapse;

        this.ws = {};
    }

    load(){
        this.ws = new WorkspaceDOM(Blockly.Xml.workspaceToDom(workspace));
        return this;
    };
    commit(){
        workspace.clear();
        Blockly.Xml.domToWorkspace(this.ws.toXml(), workspace);
        toolboxUpdate();
    };

    getRootBlock(){
        let block =  this.ws.getBlockById(this.id);
        if(block === null){
            block  = createBlock(this.id,this.id);
            block .setPos(this.defX,this.defY);
            this.ws.add(block);
        }
        return block;
    };
    getRootStatement() {
        const rootBlock = this.getRootBlock(this.ws);
        let statement = rootBlock.getStatements()[0];
        if(statement === undefined){
            statement = createStatement("name");
            rootBlock.addStatement(statement);
        }
        return statement;
    };

    addBlock(name){
        const statement = this.getRootStatement(this.ws);
        const block = createBlock(this.childType,getHashCode(this.childType));
        block.addField(createField("name",name));
        block.setCollapsed(this.collapse);
        statement.push(block);
        return this;
    };
    addToChild(childId, name, statement, type, collapse){
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

    includes(name){
        const entryList = this.getEntryList();
        if((entryList!=null) && (entryList.includes(name))) return true;
        return false;
    };

    getEntryList(){
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
const Datamodel = new RootNode("cm_datamodel","datamodel_node",420,50,DatamodelIterator,true);
const Taxonomy = new RootNode("cm_taxonomy","taxonomy_node",20,50,TaxonomyIterator,true);


class AbstractConceptModelNode{
    constructor(xml,parent){
        this.xml = xml;
        this.dom = new BlockDOM(xml,parent);
    }
}
class AbstractParentNode extends AbstractConceptModelNode{
    getChildren(){
        dom.getStatements();
    }
    addChild(){

    }
    removeChild(){

    }
}

class TaxonomyNode extends AbstractParentNode{
    getName(){

    }
    setName(){

    }
    getProperties(){

    }
}
