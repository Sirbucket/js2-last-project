import {Button, Typebox, Container, Element} from "./"
import { NoteCard} from "../notecards"
export class ElementMaker {
    constructor() {}
    
    newButton(name, list) {
        const button = new Button(name)
    
        list.push(button)
        return button
    }

    newTypebox(name, list) {
        const typebox = new Typebox(name)
    
        list.push(typebox)
        return typebox
    }

    newContainer(name, dispname, list, list2) {
        const container = new Container(list, name, dispname)

        list2.push(container)
        return container
    }

    newElement(name, displayname, list) {
        const element = new Element(name, displayname)

        list.push(element)
        return element
    }

    newNoteCard(word, list) {
        const notecard = new NoteCard(word)

		list.push(notecard)
        return notecard
    }
}