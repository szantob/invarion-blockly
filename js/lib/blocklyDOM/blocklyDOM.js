/**
 * Abstract DOM Object for Blockly DOM objects
 *
 * This stores the XML text of the object, and can initialize it with an
 * overrideable "defaultXml" text.
* */
class abstractDOMObject{
	defaultXml = "";
	constructor(dataXml){
		this.xml = dataXml;
	}
	initialize(){
		this.xml =  Blockly.Xml.textToDom(this.defaultXml);
	}
	getParent(){
		const parentXML = this.xml.parentNode;
		switch (parentXML.tagName) {
			case("block"):		return new BlockDOM(parentXML);
			case("value"):		return new ValueDOM(parentXML);
			case("statement"):	return new StatementDOM(parentXML);
			case("next"):		return new NextDOM(parentXML);
		}
		return null;
	}
	getTagName(){
		return this.xml.tagName;
	}

	toXml(){
		return this.xml;
	}
	getChildrenByTagName(tagName){
		const goodChildren = [];
		for (let i = 0; i < this.xml.childNodes.length; i++){
			const child = this.xml.childNodes[i];
			if(child.tagName === tagName)
				goodChildren.push(child);
		}
		return goodChildren;
	}
}

class WorkspaceDOM 	extends abstractDOMObject{
	static defaultXml = '<xml xmlns="https://developers.google.com/Blockly/xml"></xml>';

	getParent(){
		return null;
	}

    // Block getters, setters, adders
    getBlocks(){
        const blockXmlList = this.xml.getElementsByTagName("block");
        const blockDOMList = [];
        for(let i = 0; i < blockXmlList.length; i++)
            blockDOMList.push(new BlockDOM(blockXmlList[i]));
        return blockDOMList;
    }
    getBlocksByType(type){
        const allBlocks = this.getBlocks();
        const goodBlocks = [];
        for(let i = 0; i < allBlocks.length; i++){
            let block = allBlocks[i];
            if(block.getType()===type){
                goodBlocks.push(block);
            }
        }
        return goodBlocks;
    }
    getBlockById(id){
        const allBlocks = this.getBlocks(this.xml);
        for(let i = 0; i < allBlocks.length; i++){
            let block = allBlocks[i];
            if(block.getId()===id) return block;
        }
        return null;
    }
    get(index){
        return this.getBlocks()[index];
    }
    set(index, block){
        const oldXml = this.get(index).toXml();
        const newXml = block.toXml();
        this.xml.replaceChild(newXml,oldXml);
    }
    add(block){
        this.xml.appendChild(block.toXml());
    }

    getRootBlocks(){
		const blockXmlList = this.getChildrenByTagName("block");
		const blockDOMList = [];
		for(let i = 0; i < blockXmlList.length; i++)
			blockDOMList.push(new BlockDOM(blockXmlList[i]));
		return blockDOMList;
	}
	getRootBlocksByType(type){
		const allBlocks = this.getRootBlocks();
		const goodBlocks = [];
		for(let i = 0; i < allBlocks.length; i++){
			let block = allBlocks[i];
			if(block.getType()===type){
				goodBlocks.push(block);
			}
		}
		return goodBlocks;
	}

	static create(){
    	return new WorkspaceDOM(this.defaultXml);
	}
}
class BlockDOM 		extends abstractDOMObject{
	defaultXml = '<block type="null" id="null"/>';

	getParentBlock(){
		const parentConatiner = this.getParent();
		if(parentConatiner === null) return null;
		switch (parentConatiner.getTagName()) {
			case("next"): 		return parentConatiner.getParent().getParentBlock();
			case("value"):		return parentConatiner.getParent();
			case("statement"):	return parentConatiner.getParent();
		}
		return null;
	}

	/** Attribute getters and setters
	 *
	 *  Attributes:
	 *  type (String): The name of the blocks type (required)
	 *  id (String): The id of the block (required)
	 *  x (String): The x position of the block on workspace
	 *  y (String): The y position of the block on workspace
	 *  collapsed (boolean): True if the block is shown collapsed
	 *  disabled (boolean): True if the block is shown disabled
	 * */
	getType				= getStringAttributeFunctionFactory(this,"type");
	getId				= getStringAttributeFunctionFactory(this,"id");
	getX				= getIntegerAttributeFunctionFactory(this,"x");
	getY				= getIntegerAttributeFunctionFactory(this,"y");
	isCollapsed			= getBooleanAttributeFunctionFactory(this,"collapsed");
	isDisabled			= getBooleanAttributeFunctionFactory(this,"disabled");

	setType				= setAttributeFunctionFactory(this,"type");
	setId				= setAttributeFunctionFactory(this,"id");
	setX				= setAttributeFunctionFactory(this,"x");
	setY				= setAttributeFunctionFactory(this,"x");
	setCollapsed		= setAttributeFunctionFactory(this,"collapsed");
	setDisabled			= setAttributeFunctionFactory(this,"disabled");

	// Extra attribute functions
	/** Position setter
	 *  Sets the block (x,y) position in one function
	 * */
	setPos(x,y){
		this.setX(x);
		this.setY(y);
	};

	/** Field functions
	 *
	 * */
	getFields 		= getNodeFunctionFactory(this,"field",FieldDOM);
	getFieldByName	= getNodeByNameFunctionFactory(this,this.getFields);
	addField		= addNodeFunctionFactory(this);
	removeField 	= removeNodeFunctionFactory(this);

	//  Tree model functions
	/** Value functions
	 *
	 * */
	getValues 		= getNodeFunctionFactory(this,"value",ValueDOM);
	getValueByName 	= getNodeByNameFunctionFactory(this,this.getValues);
	addValue		= addNodeFunctionFactory(this);
	removeValue 	= removeNodeFunctionFactory(this);

	/** Statement functions
	 *
	 * */
	getStatements 		= getNodeFunctionFactory(this,"statement",StatementDOM);
	getStatementByName 	= getNodeByNameFunctionFactory(this,this.getStatements);
	addStatement		= addNodeFunctionFactory(this);
	removeStatement 	= removeNodeFunctionFactory(this);

	/** Comment functions
	 *
	 * */
	getComment 		= getOneNodeFunctionFactory(this,"comment",CommentDOM);
	removeComment 	= removeOneNodeFunctionFactory(this,"comment");
	setComment		= setOneNodeFunctionFactory(this,this.removeComment);

	/** Next functions
	 *
	 * */
	getNext 	= getOneNodeFunctionFactory(this,"next",NextDOM);
	removeNext 	= removeOneNodeFunctionFactory(this,"next");
	setNext 	= setOneNodeFunctionFactory(this,this.removeNext);

	/**	Helper functions
	 * */
	getFieldText(fieldName){
		const field = this.getFieldByName(fieldName);
		if(field === null) return null;
		return field.getText();
	}
	setFieldText(fieldName,text){
		const field = this.getFieldByName(fieldName);
		if(field !== null){
			field.setText(text);
		}else{
			const newField = FieldDOM.create(fieldName,text);
			this.addField(newField);
		}
	}

	getValueBlock(valueName){
		const values = this.getValues(valueName);
		if(values.length !== 1) return null;
		return values[0].getBlock();
	}
	setValueBlock(valueName,block){
		const value = ValueDOM.create(valueName);
		value.setBlock(block);
		this.addValue(value);
	}/*
	removeValueBlock(block){
		this.removeValue();
	}*/

	getNextBlock(){
		const next = this.getNext();
		if(next === null) return null;
		return next.getBlock();
	}
	setNextBlock(block){
		const next = NextDOM.create();
		next.setBlock(block);
		this.setNext(next);
	}
	removeNextBlock(){
		this.removeNext();
	}

	/**	Static create method
	 * */
	static create(type){
		const block = new BlockDOM("");
		block.initialize();
		block.setType(type);
		block.setId(getHashCode(this.toString()));
		return block;
	}
}
class FieldDOM 		extends abstractDOMObject{
	defaultXml = '<field name=""> </field>';

	/** Attribute getters and setters
	 *  Attributes:
	 *  name (String):
	 *  text (String):
	 * */
	getText	= getTextFunctionFactory(this);
	getName	= getStringAttributeFunctionFactory(this,"name");

	setText = setTextFunctionFactory(this);
	setName = setStringAttributeFunctionFactory(this,"name");

	/**	Static create method
	 * */
	static create(name, text){
		const field = new FieldDOM();
		field.initialize();
		field.setName(name);
		field.setText(text);
		return field;
	}
}
class CommentDOM 	extends abstractDOMObject{
	defaultXml = '<comment pinned="false" h="80" w="160"> </comment>';

	/** Attribute getters and setters
	 * */
	getText		= getTextFunctionFactory(this);
	isPinned	=getBooleanAttributeFunctionFactory(this,"pinned");
	getH		= getIntegerAttributeFunctionFactory(this,"h");
	getW		= getIntegerAttributeFunctionFactory(this,"w");

	setText		= setTextFunctionFactory(this);
	setPinned	= setAttributeFunctionFactory(this,"pinned");
	setH		= setAttributeFunctionFactory(this, "h");
	setW		= setAttributeFunctionFactory(this, "w");

	static create(text,h,w,pinned){
		const comment = new CommentDOM();
		comment.initialize();
		comment.setText(text);
		comment.setH(h);
		comment.setW(w);
		comment.setPinned(pinned);
		return comment;
	}
}
class ValueDOM 		extends abstractDOMObject{
	defaultXml = '<value name=" "> </value>';

	getName	= getStringAttributeFunctionFactory(this,"name");
	setName = setStringAttributeFunctionFactory(this,"name");

	getBlock 	= getOneNodeFunctionFactory(this,"block", BlockDOM);
	removeBlock = removeOneNodeFunctionFactory(this,"block");
	setBlock 	= setOneNodeFunctionFactory(this,this.removeBlock);

	static create(name) {
		const value = new ValueDOM();
		value.initialize();
		value.setName(name);
		return value;
	}
}
class StatementDOM 	extends abstractDOMObject{
	defaultXml = '<statement name="name"/>';

	getName	= getStringAttributeFunctionFactory(this,"name");
	setName = setStringAttributeFunctionFactory(this,"name");
	// Block functions

	getBlock 	= getOneNodeFunctionFactory(this,"block", BlockDOM);
	removeBlock = removeOneNodeFunctionFactory(this,"block");
	setBlock 	= setOneNodeFunctionFactory(this,this.removeBlock);

	toBlockList(){
		const blockList = [];

		let pointerBlock = this.getBlock();
		if(pointerBlock === null){
			return [];
		}
		while(pointerBlock != null){
			blockList.push(pointerBlock);
			pointerBlock = pointerBlock.getNextBlock();
		}
		return blockList;
	}
	fromBlockList(blockList){
		if(blockList.length === 0) return;
		this.setBlock(blockList[0]);
		let pointerBlock = this.getBlock();
		for(let i = 1; i < blockList.length; i++){
			pointerBlock.setNextBlock(blockList[i])
			pointerBlock = blockList[i];
		}
	}


	getBlockList(){
		const blockList = [];
		let pointerBlock = this.getFirstBlock();
		if(pointerBlock === null) return null;
		while(pointerBlock != null){
			blockList.push(pointerBlock);
			pointerBlock = pointerBlock.getNext();
		}
		return blockList;
	};
	set(index, block){ //TODO
		const oldXml = this.get(index).toXml();
		const newXml = block.toXml();
		this.xml.replaceChild(newXml,oldXml);
	};
	push(block){
		const lastBlock = this.getBlock();
		if(lastBlock == null) this.xml.appendChild(block.toXml());
		else lastBlock.setNext(block);
	}

	static create(name) {
		const statement = new StatementDOM();
		statement.initialize();
		statement.setName(name);
		return statement;
	}
}
class NextDOM 		extends abstractDOMObject{
	defaultXml = '<next/>';

	getBlock = getOneNodeFunctionFactory(this,"block",BlockDOM);
	removeBlock = removeOneNodeFunctionFactory(this,"block");
	setBlock = setOneNodeFunctionFactory(this,this.removeBlock);

	static create() {
		const next = new NextDOM();
		next.initialize();
		return next;
	}
}


class ToolboxDOM 			extends abstractDOMObject{
    defaultXml = '<xml xmlns="https://developers.google.com/Blockly/xml" id="toolbox" style="display: none"></xml>';

    getCategories(){
        const categories = this.getChildrenByTagName("field",this.xml);
        const categoryDOMList = [];
        for(let i = 0; i < categories.length; i++){
            const field = new FieldDOM(categories[i]);
            categoryDOMList.push(field);
        }
        return categoryDOMList;
    }
    addCategory(category){
        this.xml.appendChild(category.toXml());
    }
    removeCategory(category){
        this.xml.removeChild(category.toXml());
    }

    static create(){
        const toolbox = new ToolboxDOM("");
        toolbox.initialize();
        return toolbox;
    }
}
class ToolboxCategoryDOM 	extends abstractDOMObject{
	defaultXml = '<category name="" toolboxitemid="" colour="" categorystyle="" css-container="" hidden="" custom=""></category>';

	// Attribute getters, setters
	getName(){
		return this.xml.getAttribute("name");
	}
	getToolboxitemid(){

	}
	getColor(){

	}
	setName(value){
		this.xml.setAttribute("name",value.toString());
	}
	setToolboxitemid(){

	}
	setColor(){

	}

	getCategories(){
        const categories = this.getChildrenByTagName("category",this.xml);
        const categoryDOMList = [];
        for(let i = 0; i < categories.length; i++){
            const field = new FieldDOM(categories[i]);
            categoryDOMList.push(field);
        }
        return categoryDOMList;
	}
	addCategory(category){
        this.xml.appendChild(category.toXml());
	}
	removeCategory(category){
        this.xml.removeChild(category.toXml());
	}

	getBlocks(block){
        const blocks = this.getChildrenByTagName("block",this.xml);
        const blockDOMList = [];
        for(let i = 0; i < blocks.length; i++){
            const field = new FieldDOM(blocks[i]);
            blockDOMList.push(field);
        }
        return blockDOMList;
	}
	addBlock(block){
        this.xml.appendChild(block.toXml());
	}
	removeBlock(block){
        this.xml.removeChild(block.toXml());
	}
	static create(name){
	    const category = new ToolboxCategoryDOM("");
	    category.initialize();
	    category.setName(name);
	    return category;
    }
}
class ToolboxBlockDOM 		extends abstractDOMObject{
    defaultXml = '<block type="" disabled=""></block>';

    // Attribute getters, setters
    getType(){
        return this.xml.getAttribute("type");
    }
    setType(value){
        this.xml.setAttribute("type",value.toString());
    }

    getFields(){
        const fields = this.getChildrenByTagName("field",this.xml);
        const fieldDOMList = [];
        for(let i = 0; i < fields.length; i++){
            const field = new FieldDOM(fields[i]);
            fieldDOMList.push(field);
        }
        return fieldDOMList;
    }
    addField(field){
        this.xml.appendChild(field.toXml());
    }
    removeField(field){
        this.xml.removeChild(field.toXml());
    }

    static create(type){
        const block = new ToolboxBlockDOM("");
        block.initialize();
        block.setType(type);
        return block;
    }
}
class ToolboxStatementDOM 	extends abstractDOMObject{
	//TODO unimplemented class
}
class ToolboxValueDOM 		extends abstractDOMObject{
	//TODO unimplemented class
}
class ToolboxShadowDOM 		extends ToolboxBlockDOM{
	defaultXml = '<shadow type="" disabled=""></shadow>';
	//TODO unimplemented class
}
class ToolboxFieldDOM 		extends abstractDOMObject{
	defaultXml = '<field name="" id="" variabletype=""> </field>';

	// Attribute getters, setters
	getName(){
		return this.xml.getAttribute("name");
	}
	setName(value){
		this.xml.setAttribute("name",value.toString());
	}

	getContent(){
		return this.xml.childNodes[0].nodeValue;
	}
	setContent(value){
		this.xml.childNodes[0].nodeValue = value.toString();
	}

	static create(name, content){
		const field = new ToolboxFieldDOM("");
		field.initialize();
		field.setName(name);
		field.setContent(content);
		return field;
	}
}
class ToolboxSeparatorDOM 	extends abstractDOMObject{
	defaultXml = '<sep css-container=""></sep>';
	//TODO unimplemented class
}
class ToolboxLabelDOM 		extends abstractDOMObject{
	defaultXml = '<label text="" web-class=""></label>';
	//TODO unimplemented class
}
class ToolboxButtonDOM 		extends abstractDOMObject{
	defaultXml = '<button text="" callbackKey=""></button>';
	//TODO unimplemented class
}

function getHashCode(string){	//TODO betterHash?
    s = string.concat(Math.random());
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}

function getStringAttributeFunctionFactory(parent,attributeName){
	return function () {
		return parent.xml.getAttribute(attributeName).toString();
	}
}
function setStringAttributeFunctionFactory(parent,attributeName){
	return function (value) {
		parent.xml.setAttribute(attributeName,value.toString());
	}
}
function getIntegerAttributeFunctionFactory(parent,attributeName){
	return function () {
		return parseInt(parent.xml.getAttribute(attributeName));
	}
}
function setIntegerAttributeFunctionFactory(parent,attributeName){
	return function (value) {
		parent.xml.setAttribute(attributeName,value.toString());
	}
}
function getBooleanAttributeFunctionFactory(parent,attributeName){
	return function () {
		return parent.xml.getAttribute(attributeName) === "true";
	}
}
function setBooleanAttributeFunctionFactory(parent,attributeName){
	return function (value) {
		parent.xml.setAttribute(attributeName,value.toString());
	}
}
function setAttributeFunctionFactory(parent,attributeName){
	return function (value) {
		parent.xml.setAttribute(attributeName,value.toString());
	}
}
function getTextFunctionFactory(parent){
	return function () {
		return parent.xml.childNodes[0].nodeValue;
	}
}
function setTextFunctionFactory(parent,attributeName){
	return function (value) {
		parent.xml.childNodes[0].nodeValue = value.toString();
	}
}

function getNodeFunctionFactory(parent,type,DOMClass){
	return function () {
		const XMLList = parent.getChildrenByTagName(type,parent.xml);
		const DOMList = [];
		for(let i = 0; i < XMLList.length; i++){
			const DOMObject = new DOMClass(XMLList[i],parent);
			DOMList.push(DOMObject);
		}
		return DOMList;
	};
}
function getNodeByNameFunctionFactory(parent,getFunction){
	return function(name){
		const allNodes = getFunction();
		const goodNodes = [];
		for(let i = 0; i < allNodes.length; i++){
			let node = allNodes[i];
			if(node.getName() === name){
				goodNodes.push(node);
			}
		}
		if(goodNodes.length === 1){
			return goodNodes[0];
		}else if(goodNodes.length === 0){
			return null;
		}else{
			throw "ERROR" //TODO
		}
	};
}
function addNodeFunctionFactory(parent){
	return function(node){
		parent.xml.appendChild(node.toXml());
	};
}
function removeNodeFunctionFactory(parent){
	return function(node) {
		parent.xml.removeChild(node.toXml())
	}
}
function getOneNodeFunctionFactory(parent,type,DOMClass){
	return function () {
		const XMLList = parent.getChildrenByTagName(type,parent.xml);
		if(XMLList.length === 1){
			return new DOMClass(XMLList[0],this);
		}else if(XMLList.length === 0){
			return null;
		}else{
			throw "ERROR"; //TODO
		}
	}
}
function removeOneNodeFunctionFactory(parent,type){
	return function () {
		const XMLList = parent.getChildrenByTagName(type,parent.xml);
		if(XMLList.length === 1){
			parent.xml.removeChild(XMLList[0]);
		}else if(XMLList.length === 0){
			return null;
		}else{
			throw "ERROR"; //TODO
		}
	}
}
function setOneNodeFunctionFactory(parent,removeFunction){
	return function (node) {
		removeFunction();
		parent.xml.appendChild(node.toXml());
	}
}