import { Router, RouterModule } from './router/router-module.js';

import { HeaderComponent } from './layout/header-component.js';
import { FooterComponent } from './layout/footer-component.js';
import { SkillsComponent } from './main/skills-component.js';
import { StatusComponent } from './main/status-component.js';
import { ContactComponent } from './main/contact-component.js';
import { WorkComponent } from './main/work-component.js';
import { ColorChangeComponent } from './main/color-change-component.js';

import { SoundService } from './sound/sound.service.js';

require('../styles/style.scss');
require('../styles/skills.scss');
require('../styles/contact.scss');
require('../styles/footer.scss');
require('../styles/header.scss');

RouterModule.init();

Router.addPath('/skills', 
    {
        text: '<status-component></status-component>'
    }
);
Router.addPath('/status', 
    {
        text: '<skills-component></skills-component>'
    }
);
Router.addPath('/work', 
    {
        text: '<work-component></work-component>'
    }
);
Router.addPath('/', 
    {
        text: '<contact-component></contact-component>'
    }
);

Router.goTo('/');

SoundService.init();

customElements.define('header-component', HeaderComponent);
customElements.define('footer-component', FooterComponent);
customElements.define('skills-component', SkillsComponent);
customElements.define('status-component', StatusComponent);
customElements.define('contact-component', ContactComponent);
customElements.define('work-component', WorkComponent);
customElements.define('color-change-component', ColorChangeComponent);
