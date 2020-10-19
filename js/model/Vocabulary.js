class VocabularyEntry{
    constructor(name,description){
        this.name = name;
        this.desc = description;
    }
}
class Vocabulary{
    static letterCategories = [];
    static initialize(){
        for(let i = 97; i < 123;){
            const letter = ''+String.fromCharCode(i++).toUpperCase();
            this.letterCategories.push({letter:letter,entries:[]})
        }
    }
    static add(name, description){
        const category = name.charCodeAt(0) - 'A'.charCodeAt(0);
        const categoryArray = this.letterCategories[category].entries;
        categoryArray.push(new VocabularyEntry(name,description));
        categoryArray.sort();   //TODO not working
    }
    static getCategoryEntries(letter){
        const category = letter.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
        return this.letterCategories[category].entries
    }
    static clear(){
        for(let i = 0; i < this.letterCategories.length; i++){
            this.letterCategories[i].entries = [];
        }
    }
    static load(vocabularyTEXT){
        if(vocabularyTEXT === undefined || vocabularyTEXT === null) return;
        this.clear();
        const lineArray = vocabularyTEXT.split("\n");
        for(let i = 0; i < lineArray.length; i++){
            const splittedLine = lineArray[i].split(":");
            if(splittedLine.length === 2){
                const entryName = splittedLine[0].trim();
                const entryDesc = splittedLine[1].trim();

                this.add(entryName,entryDesc);
            }
        }
    }
    static includes(name){
        const letterCategory = name[0];
        const categoryEntries = this.getCategoryEntries(letterCategory);
        for(let i = 0 ; i < categoryEntries.length; i++){
            if(categoryEntries[i].name === name) return true;
        }
        return false;
    }
    static print(){
        let printStr="";
        for(let i = 0; i < this.letterCategories.length; i++){
            const letterCategoryArray = this.letterCategories[i].entries;
            for(let j = 0; j < letterCategoryArray.length; j++){
                const vocabularyEntry = letterCategoryArray[j];
                printStr = printStr.concat("\t" + vocabularyEntry.name + ":" + vocabularyEntry.desc + "\n");
            }
        }
        return printStr;
    }

}