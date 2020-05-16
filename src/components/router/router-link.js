import { Router } from './router.js';

export class RouterLink extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['data-active'];
    }

    connectedCallback() {
        this.addEventListener('click', (e) => {
            e.preventDefault();
            Router.goTo(this.dataset.link);
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const value = newValue === 'true';
        if (name === 'data-active') {
            this.classList.toggle('active', value);
        }
    }
}
