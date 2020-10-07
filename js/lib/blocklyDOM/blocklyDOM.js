class abstractDOMObject{
	defaultXml = "";
	constructor(dataXml){
		this.xml = dataXml;
	}
	toXml(){
		return this.xml;
	}
	initialize(){
		this.xml =  Blockly.Xml.textToDom(this.defaultXml);
	}
}
class abstractBlockProperty extends abstractDOMObject{
	constructor(xml, parentBlock){
		super(xml);
		this.parentBlock = parentBlock;
	}
	getParent(){
		return this.parentBlock;
	}
}
class abstractBlock extends abstractDOMObject{
    constructor(xml,parentContainer){
        super(xml);
        this.parentContainer = parentContainer;
    }
    getParent(){
        return this.parentContainer;
    }
    setParent(){
        //TODO
    }
}

class WorkspaceDOM extends abstractDOMObject{
	defaultXml = '<xml xmlns="https://developers.google.com/Blockly/xml"></xml>';

    // Block getters, setters, adders
    getBlocks(){
        const blockXmlList = this.xml.getElementsByTagName("block");
        const blockDOMList = [];
        for(let i = 0; i < blockXmlList.length; i++)
            blockDOMList.push(new BlockDOM(blockXmlList[i],undefined));
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
}

class BlockDOM extends abstractBlock{
	defaultXml = '<block type="null" id="null"/>';

	// Attribute getters
	getType(){
		return this.xml.getAttribute("type").toString();
	};
	getId(){
		return this.xml.getAttribute("id").toString();
	};
	getX(){
		return parseInt(this.xml.getAttribute("x"));
	};
	getY(){
		return parseInt(this.xml.getAttribute("y"));
	};
	isCollapsed(){
		return (this.xml.getAttribute("collapsed") === "true");
	};
	isDisabled(){
		return (this.xml.getAttribute("disabled") === "true");
	};
	// Attribute setters
	setType(value){
		this.xml.setAttribute("type",value.toString());
	};
	setId(value){
		this.xml.setAttribute("id",value.toString());
	};
	setX(value){
		this.xml.setAttribute("x",value.toString());
	};
	setY(value){
		this.xml.setAttribute("y",value.toString());
	};
	setPos(x,y){
		this.setX(x);
		this.setY(y);
	};
	setCollapsed(value){
		this.xml.setAttribute("collapsed",value.toString());
	};
	setDisabled(value){
		this.xml.setAttribute("disabled",value.toString());
	};
	
	/*
	getValues: function(block){
		var childNodes = block.childNodes;
		var valueNodes = [];
		for(i = 0; i < childNodes.length; i++){
			var node = childNodes[i];
			if(node.tagName === "value"){
				valueNodes.push(node);
			}
		}
		return valueNodes;
	},*/
	//Field functions
	getFields() {
		const fieldXmlList = getChildrenByTagName("field",this.xml);
		const fieldDOMList = [];
		for(let i = 0; i < fieldXmlList.length; i++)
			fieldDOMList.push(new FieldDOM(fieldXmlList[i],this));
		return fieldDOMList;
	};
	getFieldsByName(name){
		const allFields = this.getFields();
		const goodFields = [];
		for(let i = 0; i < allFields.length; i++){
			let field = allFields[i];
			if(field.getName() === name){
				goodFields.push(field);
			}
		}
		return goodFields;
	};
	removeFields(){
		const fields = this.getFields();
		for(let i = 0; i < fields.length; i++){
			this.xml.removeChild(fields[i].toXml());
		}
	};
	removeFieldsByName(name){
		const fields = this.getFieldsByName(name);
		for(let i = 0; i < fields.length; i++){
			this.xml.removeChild(fields[i].toXml());
		}
	};
	addField(field){
		this.xml.appendChild(field.toXml());
	};
	// Statement functions
	getStatements(){
		const statementXmlList = getChildrenByTagName("statement",this.xml);
		const statementDOMList = [];
		for(let i = 0; i < statementXmlList.length; i++)
			statementDOMList.push(new StatementDOM(statementXmlList[i],this));
		return statementDOMList;
	};
	getStatementsByName(name){
		const allStatements = this.getStatements();
		const goodStatements = [];
		for(let i = 0; i < allStatements.length; i++){
			let statement = allStatements[i];
			if(statement.getName() === name){
				goodStatements.push(statement);
			}
		}
		return goodStatements;
	};
	removeSatements(){
		const statements = this.getStatements();
		for(let i = 0; i < statements.length; i++){
			this.xml.removeChild(statements[i].toXml());
		}
	};
	removeStatementsByName(name){
		const statements = this.getStatementsByName(name);
		for(let i = 0; i < statements.length; i++){
			this.xml.removeChild(statements[i].toXml());
		}
	};
	addStatement(statement){
		this.xml.appendChild(statement.toXml());
	};
	// Comment functions
	getComment(){
		const commentXmlList = getChildrenByTagName("comment",this.xml);
		if(commentXmlList.length === 0) return null;
		return new CommentDOM(commentXmlList[0],this);
	};
	removeComment(){
		const commentXmlList = getChildrenByTagName("comment",this.xml);
		if(commentXmlList.length === 0) return null;
		this.xml.removeChild(commentXmlList[0]);
	};
	setComment(comment){
		this.removeComment();
		this.xml.appendChild(comment.toXml());
	};
	// Linked list functions
	getNext(){
		const nextXmlList = getChildrenByTagName("next",this.xml);
		if(nextXmlList.length === 0) return null;
		const next = new NextDOM(nextXmlList[0],this);
		return next.getBlock();
	};
	setNext(block){
		const next = new NextDOM(this.xml);
		next.initialize();
		next.setBlock(block);
		this.xml.appendChild(next.toXml());
	}
}

class FieldDOM extends abstractBlockProperty{
	defaultXml = '<field name=""> </field>';

	// Attribute getters
	getName(){
		return this.xml.getAttribute("name").toString();
	};
	getText(){
		return this.xml.childNodes[0].nodeValue;
	};
	// Attribute setters
	setName(value){
		this.xml.setAttribute("name",value.toString());
	};
	setText(value){
		this.xml.childNodes[0].nodeValue = value.toString();
	};
}
class ValueDOM extends abstractBlockProperty{
}
class StatementDOM extends abstractBlockProperty{
	defaultXml = '<statement name="name"/>';

	// Attribute getter
	getName(){
		return this.xml.getAttribute("name").toString();
	};
	// Attribute setter
	setName(value){
		this.xml.setAttribute("name",value.toString());
	};

	// Block functions
	getFirstBlock(){
		const blockXmlList = this.xml.getElementsByTagName("block");
		if(blockXmlList.length === 0) return null;
		return new BlockDOM(blockXmlList[0],this);
	};
	get(index){
		let pointerBlock = this.getFirstBlock();
		for(let i=0;i<index;i++){
			let nextBlock = pointerBlock.getNext();
			if(nextBlock == null) return null;
			pointerBlock = nextBlock;
		}
		return pointerBlock;
	};
	getLastBlock(){
		let pointerBlock = this.getFirstBlock();
		if(pointerBlock === null) return null;
		let nextBlock;
		while((nextBlock = pointerBlock.getNext()) != null){
			pointerBlock = nextBlock;
		}
		return pointerBlock;
	};
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
		const lastBlock = this.getLastBlock();
		if(lastBlock == null) this.xml.appendChild(block.toXml());
		else lastBlock.setNext(block);
	}
}
class CommentDOM extends abstractBlockProperty{
	defaultXml = '<comment pinned="false" h="80" w="160"> </comment>';

	// Attribute getters
	getText(){
		return this.xml.childNodes[0].nodeValue;
	};
	isPinned(){
		return (this.xml.getAttribute("pinned") === "true");
	};
	getH(){
		return parseInt(this.xml.getAttribute("h"));
	};
	getW(){
		return parseInt(this.xml.getAttribute("w"));
	};
	// Attribute setters
	setText(value){
		this.xml.childNodes[0].nodeValue = value.toString();
	};
	setPinned(value){
		this.xml.setAttribute("pinned",value.toString());
	};
	setH(value){
		this.xml.setAttribute("h",value.toString());
	};
	setW(value){
		this.xml.setAttribute("w",value.toString());
	}
}
class NextDOM extends abstractBlockProperty{
	defaultXml = '<next/>';

	getBlock(){
		const blockXmlList = this.xml.getElementsByTagName("block");
		if(blockXmlList.length === 0) return null;
		return new BlockDOM(blockXmlList[0],this);
	};
	removeBlock(){
		const blockXmlList = this.xml.getElementsByTagName("block");
		if(blockXmlList.length === 0) return null;
		this.xml.removeChild(blockXmlList[0]);
	};
	setBlock(block){
		this.removeBlock();
		this.xml.appendChild(block.toXml());
	}
}

function createBlock(type, id){
	const block = new BlockDOM();
	block.initialize();
	block.setType(type);
	block.setId(id);
	return block;
}
function createField(name, text){
	const field = new FieldDOM();
	field.initialize();
	field.setName(name);
	field.setText(text);
	return field;
}
function createStatement(name){
	const statement = new StatementDOM();
	statement.initialize();
	statement.setName(name);
	return statement;
}
function createComment(text,h,w,pinned){
	const comment = new CommentDOM();
	comment.initialize();
	comment.setText(text);
	comment.setH(h);
	comment.setW(w);
	comment.setPinned(pinned);
	return comment;
}

function getHashCode(string){
	s = string.concat(Math.random());
	return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}
function getChildrenByTagName(tagName,xml){
	const goodChildren = [];
	for (let i = 0; i < xml.childNodes.length; i++){
		const child = xml.childNodes[i];
		if(child.tagName === tagName)
			goodChildren.push(child);
	}
	return goodChildren;
}