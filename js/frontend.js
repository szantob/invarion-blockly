var toolbox = document.getElementById("toolbox");
var workspace = Blockly.inject('blocklyDiv', options);
var options = { 
	toolbox : toolbox, 
	collapse : true, 
	comments : true, 
	disable : true, 
	maxBlocks : Infinity, 
	trashcan : true, 
	horizontalLayout : false, 
	toolboxPosition : 'start', 
	css : true, 
	media : 'https://Blockly-demo.appspot.com/static/media/',
	rtl : false, 
	scrollbars : true, 
	sounds : true, 
	oneBasedIndex : true
};
var initialize = function(){
	workspace.registerToolboxCategoryCallback('TAXONOMY', taxonomyCallback);
	workspace.registerToolboxCategoryCallback('DATAMODEL', datamodelCallback);
	workspace.registerButtonCallback('vocabularyNewEntry', vocabularyNewEntryCallback);
	workspace.registerButtonCallback('taxonomyNewEntry', taxonomyNewEntryCallback);
	var workspaceBlocks = document.getElementById("workspaceBlocks"); 
	Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);
	toolboxUpdate();
}