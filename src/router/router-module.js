import { Router } from './router.js';
import { RouterLink } from './routerLink.js';

const RouterModule = {
    init(initialRoutes) {
        Router.init(initialRoutes);
        customElements.define('router-link', RouterLink);
    }
};

export {
    RouterModule,
    Router,
    RouterLink
};
