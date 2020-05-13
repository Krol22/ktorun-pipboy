export class EastereggComponent extends HTMLElement {
    constructor() {
        super();
        this.template = `
            <div class="easteregg">
                &#8593; &#8593; &#8595; &#8595; &#8592; &#8594; &#8592; &#8594; A B
            </div>
        `;
    }
    
    connectedCallback() {
        this.innerHTML = this.template;
    }
}
