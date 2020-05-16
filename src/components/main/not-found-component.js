export class NotFoundComponent extends HTMLElement {
    constructor() {
        super();
        this.template = `
            <section class="not-found">
                Page not found
            </section>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;
    }
}
