import { Router } from "./new-router.js";
import { RouterLink } from "./router-link.js";

const RouterModule = {
  init(initialRoutes) {
    customElements.define("router-link", RouterLink);

    window.addEventListener("load", () => {
      Router.init(initialRoutes);
    });
  },
};

export { RouterModule, Router, RouterLink };
