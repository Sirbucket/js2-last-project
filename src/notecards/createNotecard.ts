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
                    ${this.word} ||| Category: ${this.category}
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
        this.element.addEventListener("click", () => {
            for (let i = 0; i < this.callbacks.length; ++i) {
                let cb = this.callbacks[i]
                cb()
            }
        })

    }

    onClick(cb) {
        this.callbacks.push(cb)
    }
}