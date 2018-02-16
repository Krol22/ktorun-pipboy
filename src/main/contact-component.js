export class ContactComponent extends HTMLElement {

    constructor() {
        super();
        this.template = 'CONTACT SECTION';
    }

    connectedCallback() {
        this.innerHTML = this.template;
    }
}
