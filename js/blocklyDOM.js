function BlocklyDOM(workspaceXml) {
	this.xml = workspaceXml;
	
	// Block getters
	this.getBlocks = function(){
		var blockXmlList = this.xml.getElementsByTagName("block");
		var blockDOMList = [];
		for(i = 0; i < blockXmlList.length; i++)
			blockDOMList.push(new BlockDOM(blockXmlList[i]));
		return blockDOMList;
	};
	this.getBlocksByType = function(type){
		var allBlocks = this.getBlocks(this.xml);
		var goodBlocks = [];
		for(i = 0; i < allBlocks.length; i++){
			var block = allBlocks[i];
			if(block.getType()===type){
				goodBlocks.push(block);
			}
		}	
		return goodBlocks;
	};
	this.getBlockById = function(id){
		var allBlocks = this.getBlocks(this.xml);
		for(i = 0; i < allBlocks.length; i++){
			var block = allBlocks[i];
			if(block.getId()===id) return block;
		}	
		return null;
	};
	this.get = function(index){
		return this.getBlocks()[index];
	};
	this.set = function(index, block){
		var oldXml = this.get(index).toXml();
		var newXml = block.toXml();
		this.xml.replaceChild(newXml,oldXml);
	};
	this.add = function(block){
		this.xml.appendChild(block.toXml());
	};
	
	this.toXml = function(){
		return this.xml;
	}
};
function BlockDOM(blockXml) {
	this.xml = blockXml;
	this.initialize = function(){
		xml_text = '<block type="null" id="null" x="0" y="0"></block>'
		this.xml =  Blockly.Xml.textToDom(xml_text);
	}
	
	// Attribute getters
	this.getType = function(){
		return this.xml.getAttribute("type").toString();
	},
	this.getId = function(){
		return this.xml.getAttribute("id").toString();
	},
	this.getX = function(){
		return parseInt(this.xml.getAttribute("x"));
	},
	this.getY = function(){
		return parseInt(this.xml.getAttribute("y"));
	}
	// Attribute setters
	this.setType = function(value){
		if(this.xml == null) this.initialize();
		this.xml.setAttribute("type",value);
	},
	this.setId = function(value){
		if(this.xml == null) this.initialize();
		this.xml.setAttribute("id",value);
	},
	this.setX = function(value){
		if(this.xml == null) this.initialize();
		this.xml.setAttribute("x",value);
	},
	this.setY = function(value){
		if(this.xml == null) this.initialize();
		this.xml.setAttribute("y",value);
	}
	
	//
	/*
	getFields: function(block){
		var childNodes = block.childNodes;
		var fieldNodes = [];
		for(i = 0; i < childNodes.length; i++){
			var node = childNodes[i];
			if(node.tagName === "field"){
				fieldNodes.push(node);
			}
		}
		return fieldNodes;
	},
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
	},
	getStatements: function(block){
		var childNodes = block.childNodes;
		var statementNodes = [];
		for(i = 0; i < childNodes.length; i++){
			var node = childNodes[i];
			if(node.tagName === "statement"){
				statementNodes.push(node);
			}
		}
		return statementNodes;
	},*/
	this.toXml = function(){
		return this.xml;
	}
};
function FieldDOM(fieldXml){
	this.xml = fieldXml;
};
function ValueDOM(valueXml){
	this.xml = valueXml;
};
function StatementDOM(statementXml){
	this.xml = statementXml;
};

function createBlock(type, id, x, y){
	var block = new BlockDOM();
	block.setType(type);
	block.setId(id);
	block.setX(x);
	block.setY(y);
	return block;
}