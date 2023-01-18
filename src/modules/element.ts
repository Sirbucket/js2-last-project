export class Element {
    name : string = 'div';
    element : HTMLElement

    constructor(name, displayname) {
        this.element = document.createElement(this.name);
        this.element.innerHTML = `
            <label>
                <div class = ${name}>
                    ${displayname}
                </div>
            </label>
        `
    }
}