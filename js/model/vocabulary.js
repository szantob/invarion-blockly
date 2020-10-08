class VocabularyEntry{
    constructor(name,description){
        this.name = name;
        this.desc = description;
    }
}
class VocabularyClass{
    constructor(){
        this.letterCategories = [];
        for(let i = 97; i < 123;){
            const letter = ''+String.fromCharCode(i++).toUpperCase();
            this.letterCategories.push({letter:letter,entries:[]})
        }
    }
    add(name, description){
        const category = name.charCodeAt(0) - 'A'.charCodeAt(0);
        const categoryArray = this.letterCategories[category].entries;
        categoryArray.push(new VocabularyEntry(name,description));
        categoryArray.sort();   //TODO not working
    }
    getCategoryEntries(letter){
        const category = letter.charCodeAt(0) - 'A'.charCodeAt(0);
        return this.letterCategories[category].entries
    }
    load(vocabularyTEXT){
        if(vocabularyTEXT === undefined || vocabularyTEXT === null) return;
        const lineArray = vocabularyTEXT.split("\n");
        for(let i = 0; i < lineArray.length; i++){
            const splittedLine = lineArray[i].split(":");

            const entryName = splittedLine[0].trim();
            const entryDesc = splittedLine[1].trim();

            this.add(entryName,entryDesc);
        }
    }
    print(){
        let printStr = "vocabulary : {\n";
        for(let i = 0; i < this.letterCategories.length; i++){
            const letterCategoryArray = this.letterCategories[i].entries;
            for(let j = 0; j < letterCategoryArray.length; j++){
                const vocabularyEntry = letterCategoryArray[j];
                printStr = printStr.concat("\t" + vocabularyEntry.name + ":" + vocabularyEntry.desc + "\n");
            }
        }
        printStr = printStr.concat("}\n");
        return printStr;
    }
}
const Vocabulary = new VocabularyClass();

const TestTEXT=     //TODO Dynamic
"  Accept:\"\"                  \n" +
    "    Administrator:\"\"           \n" +
    "    Analyst:\"\"                 \n" +
    "    Andorra:\"\"                 \n" +
    "    Argentina:\"\"               \n" +
    "    Age:\"\"  \n" +
    "    Albania:\"\"                 \n" +
    "    Algeria:\"\"                 \n" +
    "    Artist:\"\"                  \n" +
    "    Australia:\"\"               \n" +
    "    Cancel:\"\"                  \n" +
    "    CarbonCopyAddress:\"\"       \n" +
    "    China:\"\"                   \n" +
    "    Austria:\"\"                 \n" +
    "    Bahamas:\"\"                 \n" +
    "    Bahrain:\"\"                 \n" +
    "    Barbados:\"\"                \n" +
    "    Belarus:\"\"                 \n" +
    "    Belgium:\"\"                 \n" +
    "    BirthDate:\"\"               \n" +
    "    BirthName:\"\"               \n" +
    "    Bolivia:\"\"                 \n" +
    "    Bookbinder:\"\"              \n" +
    "    BosniaAndHerzegovina:\"\"    \n" +
    "    Botswana:\"\"                \n" +
    "    Brazil:\"\"                  \n" +
    "    Bulgaria:\"\"                \n" +
    "    Burma:\"\"                   \n" +
    "    Canada:\"\"                  \n" +
    "    City:\"\" \n" +
    "    Close:\"\"                   \n" +
    "    ConfirmPassword:\"\"         \n" +
    "    CopyToAddress:\"\"           \n" +
    "    Country:\"\"                 \n" +
    "    Cuba:\"\" \n" +
    "    Cyprus:\"\"                  \n" +
    "    CzechRepublic:\"\"           \n" +
    "    DataStoreName:\"\"           \n" +
    "    DataStoreType:\"\"           \n" +
    "    DataStoreURL:\"\"            \n" +
    "    Delete:\"\"                  \n" +
    "    Denmark:\"\"                 \n" +
    "    Dr:\"\"   \n" +
    "    Edit:\"\" \n" +
    "    EditProperty:\"\"            \n" +
    "    Education:\"\"               \n" +
    "    Egypt:\"\"                   \n" +
    "    EmailAddress:\"\"            \n" +
    "    Engineer:\"\"                \n" +
    "    Estonia:\"\"                 \n" +
    "    Female:\"\"                  \n" +
    "    Find:\"\" \n" +
    "    Finland:\"\"                 \n" +
    "    FirstName:\"\"               \n" +
    "    Flat:\"\" \n" +
    "    Floor:\"\"                   \n" +
    "    Form:\"\" \n" +
    "    France:\"\"                  \n" +
    "    FromAddress:\"\"             \n" +
    "    Gender:\"\"                  \n" +
    "    Germany:\"\"                 \n" +
    "    GrammarSchool:\"\"           \n" +
    "    Greece:\"\"                  \n" +
    "    Help:\"\" \n" +
    "    HiddenField:\"\"             \n" +
    "    HongKong:\"\"                \n" +
    "    HouseNumber:\"\"             \n" +
    "    Hungary:\"\"                 \n" +
    "    ITProfessional:\"\"          \n" +
    "    Iceland:\"\"                 \n" +
    "    Id:\"\"   \n" +
    "    India:\"\"                   \n" +
    "    Indonesia:\"\"               \n" +
    "    Iran:\"\" \n" +
    "    Iraq:\"\" \n" +
    "    Ireland:\"\"                 \n" +
    "    Israel:\"\"                  \n" +
    "    Italy:\"\"                   \n" +
    "    Japan:\"\"                   \n" +
    "    Job:\"\"  \n" +
    "    Jordan:\"\"                  \n" +
    "    KoreaSouth:\"\"              \n" +
    "    Kuwait:\"\"                  \n" +
    "    LastName:\"\"                \n" +
    "    Latvia:\"\"                  \n" +
    "    Lawyer:\"\"                  \n" +
    "    Liechtenstein:\"\"           \n" +
    "    Lithuania:\"\"               \n" +
    "    Luxembourg:\"\"              \n" +
    "    Macedonia:\"\"               \n" +
    "    Male:\"\" \n" +
    "    Malta:\"\"                   \n" +
    "    Mason:\"\"                   \n" +
    "    MiddleName:\"\"              \n" +
    "    Miss:\"\" \n" +
    "    Modify:\"\"                  \n" +
    "    Moldova:\"\"                 \n" +
    "    Monaco:\"\"                  \n" +
    "    Montenegro:\"\"              \n" +
    "    MothersName:\"\"             \n" +
    "    Move:\"\" \n" +
    "    Mr:\"\"   \n" +
    "    Mrs:\"\"  \n" +
    "    Ms:\"\"   \n" +
    "    Navigate:\"\"                \n" +
    "    NavigateDown:\"\"            \n" +
    "    NavigateNext:\"\"            \n" +
    "    NavigatePrevious:\"\"        \n" +
    "    NavigateUp:\"\"              \n" +
    "    Netherlands:\"\"             \n" +
    "    New:\"\"  \n" +
    "    Norway:\"\"                  \n" +
    "    OK:\"\"   \n" +
    "    Open:\"\" \n" +
    "    Password:\"\"                \n" +
    "    PersonalMessage:\"\"         \n" +
    "    PersonalTitle:\"\"           \n" +
    "    PhoneNumber:\"\"             \n" +
    "    Physician:\"\"               \n" +
    "    Poland:\"\"                  \n" +
    "    PopupList:\"\"               \n" +
    "    President:\"\"               \n" +
    "    ProductManager:\"\"          \n" +
    "    Prof:\"\" \n" +
    "    Profession:\"\"              \n" +
    "    ProjectManager:\"\"          \n" +
    "    Register:\"\"                \n" +
    "    Rename:\"\"                  \n" +
    "    Romania:\"\"                 \n" +
    "    Russia:\"\"                  \n" +
    "    SalesAccountManager:\"\"     \n" +
    "    SanMarino:\"\"               \n" +
    "    Save:\"\" \n" +
    "    SaveAs:\"\"                  \n" +
    "    Scientist:\"\"               \n" +
    "    SecondarySchool:\"\"         \n" +
    "    Serbia:\"\"                  \n" +
    "    SessionIdentifier:\"\"       \n" +
    "    Sir:\"\"  \n" +
    "    Slovakia:\"\"                \n" +
    "    Slovenia:\"\"                \n" +
    "    SocialSecurityNumber:\"\"    \n" +
    "    Spain:\"\"                   \n" +
    "    Street:\"\"                  \n" +
    "    Sweden:\"\"                  \n" +
    "    Switzerland:\"\"             \n" +
    "    SystemAdministrator:\"\"     \n" +
    "    TaxNumber:\"\"               \n" +
    "    Teacher:\"\"                 \n" +
    "    TextField:\"\"               \n" +
    "    ToAddress:\"\"               \n" +
    "    Turkey:\"\"                  \n" +
    "    Ukraine:\"\"                 \n" +
    "    UnitedKingdom:\"\"           \n" +
    "    UnitedStatesOfAmerica:\"\"   \n" +
    "    University:\"\"              \n" +
    "    Unregister:\"\"              \n" +
    "    Update:\"\"                  \n" +
    "    UserName:\"\"                \n" +
    "    Weight:\"\"                  \n" +
    "    ZipCode:\"\"        ";
Vocabulary.load(TestTEXT);