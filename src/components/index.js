import 'regenerator-runtime/runtime';

import { RouterModule } from './router/router-module.js';

import { HeaderComponent } from './layout/header-component.js';
import { NavigationComponent } from './layout/navigation-component.js';
import { FooterComponent } from './layout/footer-component.js';

import { AboutComponent } from './main/about-component.js';
import { StatusComponent } from './main/status-component.js';
import { ContactComponent } from './main/contact-component.js';
import { SettingsComponent } from './main/settings-component.js';
import { UsesComponent } from './main/uses-component.js';
import { ProgressComponent } from './main/progress-component';

import { LoadingComponent } from './loading/loading-component.js';
import { EastereggComponent } from './layout/easteregg-component.js';

import { SoundService } from './sound/sound.service.js';

import registerEasterEgg from './helpers/easter-egg';

require('../styles/main.scss');

RouterModule.init({
    '/': { 
        text: '<status-component></status-component>' 
    },
    '/about-me': { 
        text: '<about-me-component></about-me-component>' 
    },
    '/contact': { 
        text: '<contact-component></contact-component>' 
    },
    '/settings': { 
        text: '<settings-component></settings-component>' 
    },
    '/uses': { 
        text: '<uses-component></uses-component>' 
    },
});

SoundService.init();

registerEasterEgg();

customElements.define('header-component', HeaderComponent);
customElements.define('settings-component', SettingsComponent);
customElements.define('footer-component', FooterComponent);
customElements.define('about-me-component', AboutComponent);
customElements.define('status-component', StatusComponent);
customElements.define('contact-component', ContactComponent);
customElements.define('uses-component', UsesComponent);
customElements.define('loading-component', LoadingComponent);
customElements.define('navigation-component', NavigationComponent);
customElements.define('easteregg-component', EastereggComponent);
customElements.define('progress-component', ProgressComponent);
