import { Router } from './router.js';
import { RouterLink } from './router-link.js';

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
