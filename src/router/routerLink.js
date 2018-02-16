import { Router } from './router.js';

export class RouterLink extends HTMLElement {
    
    constructor() {
        super();
    }

    connectedCallback() {
        this.addEventListener('click', (e) => {
            e.preventDefault();
            Router.goTo(this.getAttribute('[link]'));
        });
    }

}
