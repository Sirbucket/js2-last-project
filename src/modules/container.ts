export class Container {
    constructor(list, name, dispname) {
        let itemTemplate = document.createElement(name);
		itemTemplate.innerHTML = `
			<ol class = ${dispname}>
				<label class = ${dispname}}></label>
			</ol>
        `
        const length = list.length;
        for (let i = 0; i < length; ++i) {
            this.oldHTML = itemTemplate.innerHTML;
            itemTemplate.appendChild(list[i].element);
        }
		this.content = itemTemplate
    }
}