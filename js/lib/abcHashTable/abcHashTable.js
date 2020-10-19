class abcHashTable{
    constructor(){
        this.letterCategories = [];
        for(let i = 97; i < 123;){
            const letter = ''+String.fromCharCode(i++).toUpperCase();
            this.letterCategories.push([]);
        }
    }
    add(name, object){
        const category = name.charCodeAt(0) - 'A'.charCodeAt(0);
        const categoryArray = this.letterCategories[category];
        categoryArray.push(object);
        categoryArray.sort();   //TODO not working
    }
    clear(){
        for(let i = 0; i < this.letterCategories.length; i++){
            this.letterCategories[i] = [];
        }
    }
    getCategoryEntries(letter){
        const category = letter.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
        return this.letterCategories[category];
    }
    get(name){
        const letterCategory = name[0];
        const categoryEntries = this.getCategoryEntries(letterCategory);
        for(let i = 0 ; i < categoryEntries.length; i++){
            if(categoryEntries[i].name === name){
                return categoryEntries[i];
            }
        }
        return null;
    }
    includes(name){
        return get(name) !== null;
    }
}