export class Word {
   	term : string
    definition : string
	category : string
    constructor(term, definition, category) {
        this.term = word
        this.definition = definition
		this.category = category
    }
}

export class ProcessInput {
    words: Word[] = []
    constructor (words) {
        this.words = words 
    }
    filterInput(string : string) {
        let fString = string.toLowerCase().trimStart().trimEnd()
        if (fString == "") return console.log("This is blank");
        for (let i = 0; i < this.words.length; ++i) {
            if (fString == this.words[i].term || this.words[i].definition) return console.log("This word already exists");
        }
        return string
    }
}

