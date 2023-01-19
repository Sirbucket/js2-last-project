import { Word } from "../processing";

export class NoteCard {
    word : string
    definition : string
	category : string
    oldHTML : string
    clicked : boolean = false
    callbacks = []
    element : HTMLElement
    constructor (word) {
        this.word = word.term
        this.definition = word.definition
		this.category = word.category
        this.element = document.createElement("notecard");
		this.oldHTML = `
            <label>
                <div class = "notecard">
                    Word: ${this.word}
					
	 				<span class="def">Definition: ${this.definition}</span>
	 				
	  				Category: ${this.category}
                </div>
            </label>
        `
        this.element.innerHTML = `
            <label>
                <div class = "notecard">
                    ${this.oldHTML}
                </div>
            </label>
        `
        this.oldHTML = this.element.innerHTML
		this.element.addEventListener(
			"click",
			()=>this.element.classList.toggle('active')
		);
    }
}