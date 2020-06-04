function BlocklyDOM(workspaceXml) {
	this.xml = workspaceXml;
	this.toXml = function(){
		return this.xml;
	};
	
	// Block getters, setters, adders
	this.getBlocks = function(){
		const blockXmlList = this.xml.getElementsByTagName("block");
		const blockDOMList = [];
		for(let i = 0; i < blockXmlList.length; i++)
			blockDOMList.push(new BlockDOM(blockXmlList[i]));
		return blockDOMList;
	};
	this.getBlocksByType = function(type){
		const allBlocks = this.getBlocks();
		const goodBlocks = [];
		for(let i = 0; i < allBlocks.length; i++){
			let block = allBlocks[i];
			if(block.getType()===type){
				goodBlocks.push(block);
			}
		}	
		return goodBlocks;
	};
	this.getBlockById = function(id){
		const allBlocks = this.getBlocks(this.xml);
		for(let i = 0; i < allBlocks.length; i++){
			let block = allBlocks[i];
			if(block.getId()===id) return block;
		}	
		return null;
	};
	this.get = function(index){
		return this.getBlocks()[index];
	};
	this.set = function(index, block){
		const oldXml = this.get(index).toXml();
		const newXml = block.toXml();
		this.xml.replaceChild(newXml,oldXml);
	};
	this.add = function(block){
		this.xml.appendChild(block.toXml());
	}

}
function BlockDOM(blockXml) {
	this.xml = blockXml;
	this.toXml = function(){
		return this.xml;
	};
	this.initialize = function(){
		// language=XML
		const xml_text = '<block type="null" id="null"/>';
		this.xml =  Blockly.Xml.textToDom(xml_text);
	};
	
	// Attribute getters
	this.getType = function(){
		return this.xml.getAttribute("type").toString();
	};
	this.getId = function(){
		return this.xml.getAttribute("id").toString();
	};
	this.getX = function(){
		return parseInt(this.xml.getAttribute("x"));
	};
	this.getY = function(){
		return parseInt(this.xml.getAttribute("y"));
	};
	this.isCollapsed = function(){
		return (this.xml.getAttribute("collapsed") === "true");
	};
	this.isDisabled = function(){
		return (this.xml.getAttribute("disabled") === "true");
	};
	// Attribute setters
	this.setType = function(value){
		this.xml.setAttribute("type",value.toString());
	};
	this.setId = function(value){
		this.xml.setAttribute("id",value.toString());
	};
	this.setX = function(value){
		this.xml.setAttribute("x",value.toString());
	};
	this.setY = function(value){
		this.xml.setAttribute("y",value.toString());
	};
	this.setPos = function(x,y){
		this.setX(x);
		this.setY(y);
	};
	this.setCollapsed = function(value){
		this.xml.setAttribute("collapsed",value.toString());
	};
	this.setDisabled = function(value){
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
	this.getFields = function() {
		const fieldXmlList = this.xml.getElementsByTagName("field");
		const fieldDOMList = [];
		for(let i = 0; i < fieldXmlList.length; i++)
			fieldDOMList.push(new FieldDOM(fieldXmlList[i]));
		return fieldDOMList;
	};
	this.getFieldsByName = function(name){
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
	this.removeFields = function(){
		const fields = this.getFields();
		for(let i = 0; i < fields.length; i++){
			this.xml.removeChild(fields[i].toXml());
		}
	};
	this.removeFieldsByName = function(name){
		const fields = this.getFieldsByName(name);
		for(let i = 0; i < fields.length; i++){
			this.xml.removeChild(fields[i].toXml());
		}
	};
	this.addField = function(field){
		this.xml.appendChild(field.toXml());
	};
	// Statement functions
	this.getStatements = function(){
		const statementXmlList = this.xml.getElementsByTagName("statement");
		const statementDOMList = [];
		for(let i = 0; i < statementXmlList.length; i++)
			statementDOMList.push(new StatementDOM(statementXmlList[i]));
		return statementDOMList;
	};
	this.getStatementsByName = function(name){
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
	this.removeSatements = function(){
		const statements = this.getStatements();
		for(let i = 0; i < statements.length; i++){
			this.xml.removeChild(statements[i].toXml());
		}
	};
	this.removeStatementsByName = function(name){
		const statements = this.getStatementsByName(name);
		for(let i = 0; i < statements.length; i++){
			this.xml.removeChild(statements[i].toXml());
		}
	};
	this.addStatement = function(statement){
		this.xml.appendChild(statement.toXml());
	};
	// Comment functions
	this.getComment = function(){
		const commentXmlList = this.xml.getElementsByTagName("comment");
		if(commentXmlList.length === 0) return null;
		return new CommentDOM(commentXmlList[0]);
	};
	this.removeComment = function(){
		const commentXmlList = this.xml.getElementsByTagName("comment");
		if(commentXmlList.length === 0) return null;
		this.xml.removeChild(commentXmlList[0]);
	};
	this.setComment = function(comment){
		this.removeComment();
		this.xml.appendChild(comment.toXml());
	};
	// Linked list functions
	this.getNext = function(){
		const nextXmlList = this.xml.getElementsByTagName("next");
		if(nextXmlList.length === 0) return null;
		const next = new NextDOM(nextXmlList[0]);
		return next.getBlock();
	};
	this.setNext = function(block){
		const next = new NextDOM();
		next.initialize();
		next.setBlock(block);
		this.xml.appendChild(next.toXml());
	}
}

function FieldDOM(fieldXml){
	this.xml = fieldXml;
	this.toXml = function(){
		return this.xml;
	};
	this.initialize = function(){
		// language=XML
		const xml_text = '<field name=""> </field>';
		this.xml =  Blockly.Xml.textToDom(xml_text);
	};

	// Attribute getters
	this.getName = function(){
		return this.xml.getAttribute("name").toString();
	};
	this.getText = function(){
		return this.xml.childNodes[0].nodeValue;
	};
	// Attribute setters
	this.setName = function(value){
		this.xml.setAttribute("name",value.toString());
	};
	this.setText = function(value){
		this.xml.childNodes[0].nodeValue = value.toString();
	};
}

function ValueDOM(valueXml){
	this.xml = valueXml;
	this.toXml = function(){
		return this.xml;
	}
}

function StatementDOM(statementXml){
	this.xml = statementXml;
	this.toXml = function(){
		return this.xml;
	};
	this.initialize = function(){
		// language=XML
		const xml_text = '<statement name="name"/>';
		this.xml =  Blockly.Xml.textToDom(xml_text);
	};

	// Attribute getter
	this.getName = function(){
		return this.xml.getAttribute("name").toString();
	};
	// Attribute setter
	this.setName = function(value){
		this.xml.setAttribute("name",value.toString());
	};

	// Block functions
	this.getFirstBlock = function(){
		const blockXmlList = this.xml.getElementsByTagName("block");
		if(blockXmlList.length === 0) return null;
		return new BlockDOM(blockXmlList[0]);
	};
	this.get = function(index){
		let pointerBlock = this.getFirstBlock();
		for(let i=0;i<index;i++){
			let nextBlock = pointerBlock.getNext();
			if(nextBlock == null) return null;
			pointerBlock = nextBlock;
		}
		return pointerBlock;
	};
	this.getLastBlock = function(){
		let pointerBlock = this.getFirstBlock();
		if(pointerBlock === null) return null;
		let nextBlock;
		while((nextBlock = pointerBlock.getNext()) != null){
			pointerBlock = nextBlock;
		}
		return pointerBlock;
	};
	this.getBlockList = function(){
		const blockList = [];
		let pointerBlock = this.getFirstBlock();
		if(pointerBlock === null) return null;
		while(pointerBlock != null){
			blockList.push(pointerBlock);
			pointerBlock = pointerBlock.getNext();
		}
		return blockList;
	};
	this.set = function(index, block){ //TODO
		const oldXml = this.get(index).toXml();
		const newXml = block.toXml();
		this.xml.replaceChild(newXml,oldXml);
	};
	this.push = function(block){
		const lastBlock = this.getLastBlock();
		if(lastBlock == null) this.xml.appendChild(block.toXml());
		else lastBlock.setNext(block);
	}
}
function CommentDOM(commentXml){
	this.xml = commentXml;
	this.toXml = function(){
		return this.xml;
	};
	this.initialize = function(){
		// language=XML
		const xml_text = '<comment pinned="false" h="80" w="160"> </comment>';
		this.xml =  Blockly.Xml.textToDom(xml_text);
	};

	// Attribute getters
	this.getText = function(){
		return this.xml.childNodes[0].nodeValue;
	};
	this.isPinned = function(){
		return (this.xml.getAttribute("pinned") === "true");
	};
	this.getH = function(){
		return parseInt(this.xml.getAttribute("h"));
	};
	this.getW = function(){
		return parseInt(this.xml.getAttribute("w"));
	};
	// Attribute setters
	this.setText = function(value){
		this.xml.childNodes[0].nodeValue = value.toString();
	};
	this.setPinned = function(value){
		this.xml.setAttribute("pinned",value.toString());
	};
	this.setH = function(value){
		this.xml.setAttribute("h",value.toString());
	};
	this.setW = function(value){
		this.xml.setAttribute("w",value.toString());
	}
}
function NextDOM(nextXml){
	this.xml = nextXml;
	this.toXml = function(){
		return this.xml;
	};
	this.initialize = function(){
		// language=XML
		const xml_text = '<next/>';
		this.xml =  Blockly.Xml.textToDom(xml_text);
	};
	this.getBlock = function(){
		const blockXmlList = this.xml.getElementsByTagName("block");
		if(blockXmlList.length === 0) return null;
		return new BlockDOM(blockXmlList[0]);
	};
	this.removeBlock = function(){
		const blockXmlList = this.xml.getElementsByTagName("block");
		if(blockXmlList.length === 0) return null;
		this.xml.removeChild(blockXmlList[0]);
	};
	this.setBlock = function(block){
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
