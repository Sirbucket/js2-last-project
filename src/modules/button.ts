export class Button {
    name = 'div';
    callbacks = [];
	element : HTMLElement
	button : HTMLButtonElement
    constructor(html) {
        this.element = document.createElement(this.name);
        this.element.innerHTML = `
            <label>
                ${html}: <button class = "button" type = "button"></button>
            </label>
        `
        this.button = this.element.querySelector(".button")
        const button = this.button
        button.addEventListener("click", (event) => {
            for (let c of this.callbacks) {
                c(event)
            }
        });
    }

    onClick(cb) {
        this.callbacks.push(cb)
    }
}