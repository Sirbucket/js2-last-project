import { ElementMaker } from "./modules"
import { NoteCard } from "./notecards"
import { ProcessInput, Word } from "./processing"
import {items, storeItems, loadItems} from "./storage"

export let NoteCards : NoteCard[] = []
export let Words : Word[] = []
let app = document.querySelector("#app")
let container = []
let maker = new ElementMaker()

function addItemToStorage(item) {
    item.number = items.length //Set index for splice to index + 1.
    items.push(item);
    storeItems();
}

function clearStorage() {
    for (let i = items.length; i > 0; --i) { //Remove all items in the list.
        items.pop();
    }
    storeItems();
}

function load() {
    loadItems();  
    for (const item of items) { //Add each item in the list.
        Words.push(item);
    }
}

function createNewWord(word, definition, category) {
    let wordObj = new Word(word, definition, category)
    return wordObj
}

function makeNotecards(typeboxes, buttons) {
	for (let i = 0; i < container.length; ++i) {
        app?.removeChild(container[i].cloneContent)
    }
    NoteCards = []
	container = []
    for (let i = 0; i < Words.length; ++i) {
        maker.newNoteCard(Words[i], NoteCards).onClick(() => {
            if (NoteCards[i].clicked) {
                NoteCards[i].element.innerHTML = NoteCards[i].oldHTML
                NoteCards[i].clicked = false
            } else {
                NoteCards[i].element.innerHTML = `
                <label>
                    <div class = "notecard">
                        ${Words[i].definition}
                    </div>
                </label>
                `
                NoteCards[i].clicked = true
            }
        })
    }
	maker.newContainer(typeboxes, container)
	maker.newContainer(buttons, container)
	maker.newContainer(NoteCards, container)
	
    for (let i = 0; i < container.length; ++i) {
        app?.appendChild(container[i].cloneContent)
    }
}

function buildApp() {
    let typeboxes = []
    let buttons = []
	let inputProcess = new ProcessInput(Words)
    let word : string
    let definition : string
	let category : string
	
    let wordbox = maker.newTypebox("Term", typeboxes).onInput((value) => {
		word = value

    });
    let defbox = maker.newTypebox("Definition", typeboxes).onInput((value) => {
        definition = value;
    });

	let catbox = maker.newTypebox("Category", typeboxes).onInput((value) => {
		category = value
	})
	
    maker.newButton("Add Notecard", buttons).onClick(() => {
		if ((word || definition || category) == "") return console.log("this is blank")
        let wordObj = createNewWord(word, definition, category);
    	Words.push(wordObj);
		addItemToStorage(wordObj)
		makeNotecards(typeboxes, buttons);
    });
	maker.newButton("Clear Notecards", buttons).onClick(() => {
		clearStorage()
		location.reload()
	})
	
	load()
	maker.newContainer(typeboxes, container)
	maker.newContainer(buttons, container)
	maker.newContainer(NoteCards, container)
	
	for (let i = 0; i < container.length; ++i) {
        app?.appendChild(container[i].cloneContent)
    }
	
    makeNotecards(typeboxes, buttons);
}

buildApp();