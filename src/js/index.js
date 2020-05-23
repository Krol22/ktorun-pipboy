import "regenerator-runtime/runtime";

import { HeaderComponent } from "./components/header.js";
import { NavigationComponent } from "./components/navigation.js";
import { FooterComponent } from "./components/footer.js";
import { ProgressComponent } from "./components/progress.js";
import { LoadingComponent } from "./components/loading.js";
import { EastereggComponent } from "./components/easteregg.js";
import { RouterModule } from "./components/router/router-module.js";

import { AboutComponent } from "./pages/about.js";
import { StatusComponent } from "./pages/status.js";
import { ContactComponent } from "./pages/contact.js";
import { UsesComponent } from "./pages/uses.js";
import { NotFoundComponent } from "./pages/not-found.js";

import registerEasterEgg from "./utils/registerEasteregg";

import "../styles/main.scss";

RouterModule.init({
  "/": {
    text: "<status-component></status-component>",
  },
  "/about-me": {
    text: "<about-me-component></about-me-component>",
  },
  "/contact": {
    text: "<contact-component></contact-component>",
  },
  "/uses": {
    text: "<uses-component></uses-component>",
  },
  "/404": {
    text: "<not-found-component></not-found-component>",
  },
});

registerEasterEgg();

customElements.define("header-component", HeaderComponent);
customElements.define("footer-component", FooterComponent);
customElements.define("navigation-component", NavigationComponent);

customElements.define("about-me-component", AboutComponent);
customElements.define("status-component", StatusComponent);
customElements.define("contact-component", ContactComponent);
customElements.define("uses-component", UsesComponent);
customElements.define("not-found-component", NotFoundComponent);

customElements.define("loading-component", LoadingComponent);
customElements.define("easteregg-component", EastereggComponent);
customElements.define("progress-component", ProgressComponent);
