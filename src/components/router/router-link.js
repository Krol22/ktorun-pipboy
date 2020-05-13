import { Router } from './router.js';

export class RouterLink extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        if (this.dataset.link === Router.currentLocation.path) {
            this.classList.add('btn--active');
        }

        this.addEventListener('click', (e) => {
            e.preventDefault();
            Router.goTo(this.dataset.link);
        });
    }
}
