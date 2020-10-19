class Workspace{
    static wsDOM = {};
    static load(){
        this.wsDOM = new WorkspaceDOM(Blockly.Xml.workspaceToDom(workspace));
        return this;
    }
    static commit(){
        workspace.clear();
        Blockly.Xml.domToWorkspace(this.wsDOM.toXml(), workspace);
        toolboxUpdate();
    }
    static initialize(){
        workspace.clear();
        this.wsDOM = new WorkspaceDOM(Blockly.Xml.workspaceToDom(workspace));
        const taxonomyRoot = TaxonomyContainer.create();
        const datamodelRoot = DataModelContainer.create();
        this.wsDOM.add(taxonomyRoot.dom);
        this.wsDOM.add(datamodelRoot.dom);
        return this;
    }
    static getNodeById(id){
        const block = this.wsDOM.getBlockById(id);
        if(block === null) return null;
        switch (block.getType()) {
            case 'taxonomy_node':{
                return new TaxonomyNode(block);
            }
            case 'datamodel_node':{
                return new DataModelNode(block);
            }
            case 'property_node':{
                return new PropertyNode(block);
            }
            default:
                throw "Ezt meg elfelejtetted ;)"
        }
    }
}

class Taxonomy extends Workspace{
    static getContainers(){
        const taxonomyContainers = [];
        const taxonomyContainersDOM = this.wsDOM.getRootBlocksByType("cm_taxonomy");
        for(let i = 0; i < taxonomyContainersDOM.length; i++){
            taxonomyContainers.push(new TaxonomyContainer(taxonomyContainersDOM[i]));
        }
        return taxonomyContainers;
    }
    static getRoots(){
        const taxonomyRootsDOM = this.wsDOM.getRootBlocksByType("taxonomy_node");
        const taxonomyRoots = [];

        const taxonomyContainers = this.getContainers();
        for(let i = 0; i < taxonomyContainers.length; i++){
            const containerRoots = taxonomyContainers[i].getChildren();
            for(let j = 0; j < containerRoots.length; j++){
                taxonomyRoots.push(containerRoots[j]);
            }
        }

        for(let i = 0; i < taxonomyRootsDOM.length; i++){
            taxonomyRoots.push(new TaxonomyNode(taxonomyRootsDOM[i]));
        }
        return taxonomyRoots;
    }
    static addRoot(name){
        const taxonomyContainers = this.wsDOM.getRootBlocksByType("cm_taxonomy");
        if(taxonomyContainers.length === 0){
            const taxonomyRoot = TaxonomyContainer.create();
            this.wsDOM.add(taxonomyRoot.dom);
            taxonomyContainers.push(taxonomyRoot.dom);
        }
        const parentNode = taxonomyContainers[0];
        let childrenStatement = parentNode.getStatementByName("children");
        if(childrenStatement === null){
            childrenStatement = StatementDOM.create("children");

            parentNode.addStatement(childrenStatement);
        }
        const childrenArray = childrenStatement.toBlockList();
        const taxonomyNode = TaxonomyNode.create(name);
        childrenArray.push(taxonomyNode.dom);
        childrenStatement.fromBlockList(childrenArray);
    }

    static getTaxonomyNodeList(){
        const nodeList = [];
        const taxonomyRoots = this.getRoots();
        for (let i = 0; i < taxonomyRoots.length; i++){
            nodeList.push(taxonomyRoots[i]);
            const children = taxonomyRoots[i].getNodeList();
            for(let j = 0; j < children.length; j++){
                nodeList.push(children[j]);
            }
        }
        return nodeList;
    }
    static getNodeByName(name){
        const nodeList = this.getTaxonomyNodeList();
        for (let i = 0; i < nodeList.length; i++){
            const node = nodeList[i];
            const nodeName = node.getName();
            if(nodeName === name ) return node;
        }
        return null;
    }
    static includes(name){
        return this.getNodeByName(name) !== null;
    }
}

class DataModel extends Workspace{
    static getContainers(){
        const datamodelContainers = [];
        const datamodelContainersDOM = this.wsDOM.getRootBlocksByType("cm_datamodel");
        for(let i = 0; i < datamodelContainersDOM.length; i++){
            datamodelContainers.push(new DataModelContainer(datamodelContainersDOM[i]));
        }
        return datamodelContainers;
    }
    static getRoots(){
        const datamodelRootsDOM = this.wsDOM.getRootBlocksByType("datamodel_node");
        const datamodelRoots = [];

        const datamodelContainers = this.getContainers();
        for(let i = 0; i < datamodelContainers.length; i++){
            const containerRoots = datamodelContainers[i].getChildren();
            for(let j = 0; j < containerRoots.length; j++){
                datamodelRoots.push(containerRoots[j]);
            }
        }

        for(let i = 0; i < datamodelRootsDOM.length; i++){
            datamodelRoots.push(new DataModelNode(datamodelRootsDOM[i]));
        }
        return datamodelRoots;
    }
    static addRoot(name){
        const datamodelContainers = this.wsDOM.getRootBlocksByType("cm_datamodel");
        if(datamodelContainers.length === 0){
            const datamodelRoot = DataModelContainer.create();
            this.wsDOM.add(datamodelRoot.dom);
            datamodelContainers.push(datamodelRoot.dom);
        }
        const parentNode = datamodelContainers[0];
        let childrenStatement = parentNode.getStatementByName("children");
        if(childrenStatement === null){
            childrenStatement = StatementDOM.create("children");

            parentNode.addStatement(childrenStatement);
        }
        const childrenArray = childrenStatement.toBlockList();
        const datamodelNode = DataModelNode.create(name);
        childrenArray.push(datamodelNode.dom);
        childrenStatement.fromBlockList(childrenArray);
    }

    static getDatamodelNodeList(){
        const nodeList = [];
        const datamodelRoots = this.getRoots();
        for (let i = 0; i < datamodelRoots.length; i++){
            nodeList.push(datamodelRoots[i]);
            const children = datamodelRoots[i].getNodeList();
            for(let j = 0; j < children.length; j++){
                nodeList.push(children[j]);
            }
        }
        return nodeList;
    }
    static getNodeByName(name){
        const nodeList = this.getDatamodelNodeList();
        for (let i = 0; i < nodeList.length; i++){
            const node = nodeList[i];
            const nodeName = node.getName();
            if(nodeName === name ) return node;
        }
        return null;
    }
    static includes(name){
        return this.getNodeByName(name) !== null;
    }
}

class AbstractNode{
    constructor(DOMObject){
        this.dom = DOMObject;
    }
    getName(){}
    getId(){
        return this.dom.getFieldText('id');
    }
    getParent(){
        const parentDOM = this.dom.getParentBlock();
        if(parentDOM === null) return null;
        switch (parentDOM.getType()) {
            case("cm_taxonomy"):    return new TaxonomyContainer(parentDOM);
            case("taxonomy_node"):  return new TaxonomyNode(parentDOM);
            //TODO folyt
        }
    }
    getFullyQualifiedName(){
        const name = this.getName();
        const parent = this.getParent();
        if(parent === null) return name;
        return parent.getFullyQualifiedName() + "." + name;
    }
}
class DataModelContainer extends AbstractNode{
    getChildren = getChildByTypeFactory(this,"datamodel_node",DataModelNode);
    addChild    = addChildFactory(this);
    removeChild = removeChildFactory(this);

    getFullyQualifiedName(){
        return "DataModel";
    }

    static create(){
        const block = BlockDOM.create("cm_datamodel");
        block.setPos(420,50);
        return new DataModelContainer(block);
    }
}
class DataModelNode extends AbstractNode{
    getName = getFieldTextFactory(this,"name");

    getChildren = getChildByTypeFactory(this,"datamodel_node",DataModelNode);
    addChild    = addChildFactory(this);
    removeChild = removeChildFactory(this);

    getProperties   = getChildByTypeFactory(this,"property_node",PropertyNode);
    addProperty     = addChildFactory(this);
    removeProperty  = removeChildFactory(this);

    getNodeList(){
        const nodeList = [];
        const children = this.getChildren();
        for(let i = 0; i < children.length; i++){
            nodeList.push(children[i]);
            const grandchildren = children[i].getNodeList();
            for(let j = 0; j < grandchildren.length; j++){
                nodeList.push(grandchildren[j]);
            }
        }
        return nodeList;
    }

    static create(name){
        const block = BlockDOM.create("datamodel_node");
        block.setFieldText("name",name);
        return new DataModelNode(block);
    }
}
class TaxonomyContainer extends AbstractNode{
    getChildren = getChildByTypeFactory(this,"taxonomy_node",TaxonomyNode);
    addChild    = addChildFactory(this);
    removeChild = removeChildFactory(this);

    getFullyQualifiedName(){
        return "Taxonomy";
    }

    static create(){
        const block = BlockDOM.create("cm_taxonomy");
        block.setPos(20,50);
        return new TaxonomyContainer(block);
    }
}
class TaxonomyNode extends AbstractNode{
    getName = getFieldTextFactory(this,"name");

    getChildren = getChildByTypeFactory(this,"taxonomy_node",TaxonomyNode);
    addChild    = addChildFactory(this);
    removeChild = removeChildFactory(this);

    getProperties   = getChildByTypeFactory(this,"property_node",PropertyNode);
    addProperty     = addChildFactory(this);
    removeProperty  = removeChildFactory(this);

    getNodeList(){
        const nodeList = [];
        const children = this.getChildren();
        for(let i = 0; i < children.length; i++){
            nodeList.push(children[i]);
            const grandchildren = children[i].getNodeList();
            for(let j = 0; j < grandchildren.length; j++){
                nodeList.push(grandchildren[j]);
            }
        }
        return nodeList;
    }

    static create(name){
        const block = BlockDOM.create("taxonomy_node");
        block.setFieldText("name",name);
        return new TaxonomyNode(block);
    }
}
class PropertyNode extends AbstractNode{
    getName = getFieldTextFactory(this,"name");

    getContent(){
        const valueBlock = this.dom.getValueBlock("value");
        if(valueBlock === null) return null;
        const type = valueBlock.getType().split("_")[1];
        switch (type) {
            case("string"):{
                const value = valueBlock.getFieldText("value");
                return {type:"String",value:value};
            }
            case("reference"):{
                const value = valueBlock.getFieldText("value");
                return {type:"Reference",value:value};
            }
            case("regex"):{
                const value = valueBlock.getFieldText("value");
                return {type:"RegularExpression",value:value};
            }
            default:
                throw "Ezt meg elfelejtetted ;)"
        }
    }
    setContent(type){
        const block = BlockDOM.create(type);
        this.dom.setValueBlock("value",block);
    }

    static create(name){
        const block = BlockDOM.create("property_node");
        block.setFieldText("name",name);
        const node = new PropertyNode(block);
        return node;
    }
}



function getFieldTextFactory(parent,fieldName){
    return function () {
        const nameField = parent.dom.getFieldByName(fieldName);
        return nameField.getText();
    }
}

function getChildByTypeFactory(parent, type, objectClass){
    return function(){
        let childrenStatement = parent.dom.getStatementByName("children");
        if(childrenStatement === null){
            return [];
        }
        const children = [];
        const childrenDOM = childrenStatement.toBlockList();
        for(let i = 0; i < childrenDOM.length; i++){
            const ctype = childrenDOM[i].getType();
            if(type === ctype){
                children.push(new objectClass(childrenDOM[i],this));
            }
        }
        return children;
    }
}
function getPropertiesFactory(parent){
    return function () {
        let childrenStatement = parent.dom.getStatementByName("children");
        if(childrenStatement === null){
            return [];
        }
        const children = [];
        const childrenDOM = childrenStatement.toBlockList();
        for(let i = 0; i < childrenDOM.length; i++){
            const propertyTypes = ['string','reference'];
            const ctype = childrenDOM[i].getType().split("_");
            if((ctype.length === 2)&&(ctype[0] === "property")){
                if(propertyTypes.includes(ctype[1])){
                    console.log(ctype);
                    const node = new PropertyNode(childrenDOM[i]);
                    node.setType(ctype[1]);
                    children.push(node);
                }
            }
        }
        return children;
    }
}
function addChildFactory(parent){ //TODO TYPE CHECK?
    return function(node){
        let childrenStatement = parent.dom.getStatementByName("children");
        if(childrenStatement === null){
            childrenStatement = StatementDOM.create("children");
            parent.dom.addStatement(childrenStatement);
        }
        const childrenArray = childrenStatement.toBlockList();
        childrenArray.push(node.dom);
        childrenStatement.fromBlockList(childrenArray);
    }
}
function removeChildFactory(parent){ //TODO TYPE CHECK?
    return function(node){
        let childrenStatement = parent.dom.getStatementByName("children");
        if(childrenStatement === null){
            childrenStatement = StatementDOM.create("children");
            parent.dom.addStatement(childrenStatement);
        }
        const childrenArray = childrenStatement.toBlockList();
        const newArray = [];
        console.log(node.dom.toXml());
        for(let i = 0; i < childrenArray.length; i++){
            console.log(childrenArray[i].toXml());
            if(childrenArray[i] !== node.dom){
                newArray.push(childrenArray[i]);
            }
        }
        childrenStatement.fromBlockList(newArray);
    }
}