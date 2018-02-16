export class WorkComponent extends HTMLElement {

    constructor() {
        super();
        this.template = `
            WORK SECTION
        `
    }

    connectedCallback() {
        this.innerHTML = this.template;
    }

}
