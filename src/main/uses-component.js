export class UsesComponent extends HTMLElement {
    constructor() {
        super();
        this.template = `
            <section class="uses">
                <h2 class="heading-secondary u-margin-top">Uses</h2>
            </section>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;
    }
}
