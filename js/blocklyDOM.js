var BlocklyDOM = {
	getType : function(block){
		return block.getAttribute("type").toString();
	},
	getId : function(block){
		return block.getAttribute("id").toString();
	},
	getX : function(block){
		return block.getAttribute("x").toString();
	},
	getY : function(block){
		return block.getAttribute("y").toString();
	},
	
	getName : function(node){
		return node.getAttribute("name").toString();
	}
	
	getBlocks : function(xmlDoc){
		return xmlDoc.getElementsByTagName("block")
	},
	getBlocksByType: function(xmlDoc, type){
		var goodBlocks = [];
		var allBlocks = this.getBlocks(xmlDoc);
		for(i = 0; i < allBlocks.length; i++){
			var block = allBlocks[i];
			if(this.getType(block)===type){
				goodBlocks.push(block);
			}
		}	
		return goodBlocks;
	},
	getBlockById: function(xmlDoc, id){
		var allBlocks = this.getBlocks(xmlDoc);
		for(i = 0; i < allBlocks.length; i++){
			var block = allBlocks[i];
			if(this.getId(block)===id) return block;
		}	
		return null;
	},
	
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
	},
}