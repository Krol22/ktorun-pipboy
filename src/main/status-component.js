export class StatusComponent extends HTMLElement {

    constructor() {
        super();
        this.template = 'STATUS SECTION';
    }

    connectedCallback() {
        this.innerHTML = this.template;
    }
}
