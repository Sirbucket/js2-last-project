import { ElementMaker } from "./modules"
import { NoteCard } from "./notecards"
import { ProcessInput, Word } from "./processing"
import {items, storeItems, loadItems} from "./storage"

export let NoteCards : NoteCard[] = []
export let Words : Word[] = []
let app = document.querySelector("#app")
let container = []
let cardtainer = []
let maker = new ElementMaker()

/*
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
*/
async function getData() {
	try {
		var response = await fetch(`https://script.google.com/a/macros/innovationcharter.org/s/AKfycbygtmszms2U2hTbsFkQ5aS0AQmbVqHaGidtGvYblD6QVCyMqmqgPWxYujxBPgVTm6LDhA/exec?action=get`)
		let json = await response.json()
		let gettingthere = JSON.stringify(json)
		let data = await JSON.parse(gettingthere) //Why can't it just default to returning parsed json :(
		return data
	} catch(err) {
		console.log(err)
	}
}

async function setData(word, def, cat) {
	try {
		let thingToAdd = [{term:word,definition:def,category:cat}]
		let stringy = JSON.stringify(thingToAdd)
		var response = await fetch(`https://script.google.com/a/macros/innovationcharter.org/s/AKfycbygtmszms2U2hTbsFkQ5aS0AQmbVqHaGidtGvYblD6QVCyMqmqgPWxYujxBPgVTm6LDhA/exec?action=add&cards=${stringy}`, {redirect: "follow"})
		let json = await response.json()
		return console.log(json)
	} catch(err) {
		console.log(err)
	}
}

function createNewWord(word, definition, category) {
    let wordObj = new Word(word, definition, category)
    return wordObj
}

let search = ""
let search2 = ""

function makeNotecards() {
	for (let i = 0; i < cardtainer.length; ++i) {
        app?.removeChild(cardtainer[i].cloneContent)
    }
    NoteCards = []
	cardtainer = []

    for (let i = 0; i < Words.length; ++i) {
		const regex = new RegExp(`${search}`, "gi")
		const regex2 = new RegExp(`${search2}`, "gi")
		if (!Words[i].term.toLowerCase().match(regex2) || 
			!Words[i].category.toLowerCase().match(regex)) {
			continue
		}
		
        maker.newNoteCard(Words[i], NoteCards)

		if (i > 14) {
			break
		}
    }
	
	maker.newContainer(NoteCards, cardtainer)

    for (let i = 0; i < cardtainer.length; ++i) {
        app?.appendChild(cardtainer[i].cloneContent)
    }
}

async function buildApp() {
	let srcbox = []
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
	let serbox = maker.newTypebox("Search by Name", srcbox).onInput((value) => {
		search2 = value.toLowerCase()
	})
	let searchbox = maker.newTypebox("Search By Category", srcbox).onInput((value) => {
		search = value.toLowerCase()
	})
	
    maker.newButton("Add Notecard", buttons).onClick(() => {
		if ((word || definition || category) == "") return console.log("this is blank")
        let wordObj = createNewWord(word, definition, category);
    	Words.push(wordObj);
		Words.sort()
		setData(wordObj.term, wordObj.definition, wordObj.category)
    });

	let cards = await getData()
	for (let i = 0; i < cards.data.length; ++i) {
		Words.push(cards.data[i])
	}
	Words.sort()
	maker.newContainer(typeboxes, container)
	maker.newContainer(buttons, container)
	maker.newContainer(srcbox, container)
	for (let i = 0; i < container.length; ++i) {
        app?.appendChild(container[i].cloneContent)
    }
	setInterval(makeNotecards, 100)
}

buildApp();
