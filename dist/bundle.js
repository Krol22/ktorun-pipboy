/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_sounds_pipboy_ui_pipboy_select_wav__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_sounds_pipboy_ui_pipboy_select_wav___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__assets_sounds_pipboy_ui_pipboy_select_wav__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_sounds_pipboy_ui_pipboy_highlight_wav__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_sounds_pipboy_ui_pipboy_highlight_wav___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__assets_sounds_pipboy_ui_pipboy_highlight_wav__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_sounds_pipboy_ui_pipboy_mode_wav__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_sounds_pipboy_ui_pipboy_mode_wav___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__assets_sounds_pipboy_ui_pipboy_mode_wav__);




const SoundService = {
   
    init() {
        this.enabled = ('true' === localStorage.getItem('soundEnabled'));
        this.sounds =  {
            // '.' - added for production support of static files, problem with finding them on production.
            select: new Audio('.' + __WEBPACK_IMPORTED_MODULE_0__assets_sounds_pipboy_ui_pipboy_select_wav___default.a),
            highlight: new Audio('.' + __WEBPACK_IMPORTED_MODULE_1__assets_sounds_pipboy_ui_pipboy_highlight_wav___default.a),
            mode: new Audio('.' + __WEBPACK_IMPORTED_MODULE_2__assets_sounds_pipboy_ui_pipboy_mode_wav___default.a)
        };
    },

    play(soundName) {
        if(this.enabled) {
            this.sounds[soundName].play();
        }
    },

    toggleSound(value) {
        localStorage.setItem('soundEnabled', value);
        this.enabled = value;
    }

};
/* harmony export (immutable) */ __webpack_exports__["a"] = SoundService;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Router = {
    /*
        * content can be static html or component
    */
    
    init: function() {
        this.routes = {};
        this.element = document.getElementsByTagName('router')[0];
        this.history = [];

        window.onpopstate = e => {
            this.goTo(e.state.url);
        };
    },

    addPath: function(path, content){
        if(this.routes[path]){
            throw new Error('Content in this path already exists!');
        }

        this.routes[path] = content;
    },
    goTo: function(path) {
        let route = findRoute(path);

        if(!this.routes[route.path]) {
            throw new Error('Path not recognized!');
        }

        this.currentLocation = route; 

        window.history.pushState({ url: path }, '', '#' + path);

        if(this.routes[route.path].resolve){
            this.currentLocation.resolve = {};
            this.routes[route.path]
                .resolve(this.currentLocation)
                .then(() => {
                    this.element.innerHTML = this.routes[route.path].text;
                }); 
        } else {
            this.element.innerHTML = this.routes[route.path].text;
        }
    }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = Router;


function findRoute(path) {
    let pathElements = path.split("/");
    let parameters = {};

    let match = Object.keys(Router.routes).find(routerPath => {
        let routerPathElements = routerPath.split("/");

        if(pathElements.length !== routerPathElements.length){
            return false;
        }

        for(let i = 0; i < pathElements.length; i++) {
            if(routerPathElements[i].substring(0,1) === '{' && 
                routerPathElements[i].substring(routerPathElements[i].length - 1, routerPathElements[i].length) === '}') {

                let paramName = routerPathElements[i].substring(1, routerPathElements[i].length - 1);
                parameters[paramName] = pathElements[i];
                continue;
            } 
            
            if(routerPathElements[i] !== pathElements[i]) {
                return false;
            }
        }

        return true;
    });

    return {
        path: match,
        params: parameters
    };
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router_router_module_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layout_header_component_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layout_navigation_component_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__layout_footer_component_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__main_about_component_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__main_status_component_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__main_contact_component_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__main_settings_component_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__loading_loading_component_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__sound_sound_service_js__ = __webpack_require__(0);















__webpack_require__(20);

__WEBPACK_IMPORTED_MODULE_0__router_router_module_js__["b" /* RouterModule */].init();

__WEBPACK_IMPORTED_MODULE_0__router_router_module_js__["a" /* Router */].addPath('/', 
    {
        text: '<status-component></status-component>'
    }
);
__WEBPACK_IMPORTED_MODULE_0__router_router_module_js__["a" /* Router */].addPath('/about-me', 
    {
        text: '<about-me-component></about-me-component>'
    }
);
__WEBPACK_IMPORTED_MODULE_0__router_router_module_js__["a" /* Router */].addPath('/contact', 
    {
        text: '<contact-component></contact-component>'
    }
);
__WEBPACK_IMPORTED_MODULE_0__router_router_module_js__["a" /* Router */].addPath('/settings',
    {
        text: '<settings-component></settings-component>'
    }
);

__WEBPACK_IMPORTED_MODULE_0__router_router_module_js__["a" /* Router */].goTo('/');

__WEBPACK_IMPORTED_MODULE_9__sound_sound_service_js__["a" /* SoundService */].init();

customElements.define('header-component', __WEBPACK_IMPORTED_MODULE_1__layout_header_component_js__["a" /* HeaderComponent */]);
customElements.define('settings-component', __WEBPACK_IMPORTED_MODULE_7__main_settings_component_js__["a" /* SettingsComponent */]);
customElements.define('footer-component', __WEBPACK_IMPORTED_MODULE_3__layout_footer_component_js__["a" /* FooterComponent */]);
customElements.define('about-me-component', __WEBPACK_IMPORTED_MODULE_4__main_about_component_js__["a" /* AboutComponent */]);
customElements.define('status-component', __WEBPACK_IMPORTED_MODULE_5__main_status_component_js__["a" /* StatusComponent */]);
customElements.define('contact-component', __WEBPACK_IMPORTED_MODULE_6__main_contact_component_js__["a" /* ContactComponent */]);
customElements.define('loading-component', __WEBPACK_IMPORTED_MODULE_8__loading_loading_component_js__["a" /* LoadingComponent */]);
customElements.define('navigation-component', __WEBPACK_IMPORTED_MODULE_2__layout_navigation_component_js__["a" /* NavigationComponent */]);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RouterModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__routerLink_js__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__router_js__["a"]; });
/* unused harmony reexport RouterLink */



var RouterModule = {
    init() {
        __WEBPACK_IMPORTED_MODULE_0__router_js__["a" /* Router */].init();
        customElements.define('router-link', __WEBPACK_IMPORTED_MODULE_1__routerLink_js__["a" /* RouterLink */]);
    }
};




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router_js__ = __webpack_require__(1);


class RouterLink extends HTMLElement {
    
    constructor() {
        super();
    }

    connectedCallback() {
        this.addEventListener('click', (e) => {
            e.preventDefault();
            __WEBPACK_IMPORTED_MODULE_0__router_js__["a" /* Router */].goTo(this.getAttribute('[link]'));
        });
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = RouterLink;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class HeaderComponent extends HTMLElement {

    constructor() {
        super();

        this.template = `
            <header class="header">
                <div class="header__title">STATS</div>
                <ul class="header-list">
                    <li class="header-list__item header-list__item--lvl u-top-to-bottom">
                        <span class="header-list__text">LVL</span>
                        <span id="lvl-value" class="header-list__value">24</span>
                    </li>
                    <li class="header-list__item header-list__item--hp u-right-top-to-bottom">
                        <span class="header-list__text">HP</span>
                        <span class="header-list__value">220/220</span>
                    </li>
                    <li class="header-list__item header-list__item--ap u-right-top-to-bottom">
                        <span class="header-list__text">AP</span>
                        <span class="header-list__value">75/75</span>
                    </li>
                    <li class="header-list__item header-list__item--xp u-right-top-to-bottom">
                        <span class="header-list__text">XP</span>
                        <span id="xp-value" class="header-list__value">100 days</span>
                    </li>
                </ul>
            </header>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;
        this.elements = {
            lvlValue: this.querySelector('#lvl-value'),
            xpValue: this.querySelector('#xp-value'),
        };

        this._calculateDates();
    }

    _calculateDates() {
        var oneDay = 24 * 60 * 60 * 1000;
        var startWorkDate = new Date(2016, 7, 1);
        var startLvlDate = new Date(1994, 3, 4);
        var endDate = new Date();

        var workDaysExp = Math.round((endDate.getTime() - startWorkDate.getTime()) / oneDay);
        var lvlYears = endDate.getYear() - startLvlDate.getYear();

        this.elements.xpValue.innerHTML = `${ workDaysExp } days`;
        this.elements.lvlValue.innerHTML = `${ lvlYears }`;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HeaderComponent;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sound_sound_service__ = __webpack_require__(0);


class NavigationComponent extends HTMLElement {

    constructor() {
        super();
        this.template = `
            <div id="open-btn" class="nav__open-btn">&equiv;</div>
            <nav id="menu" class="nav">
                <h2>Settings</h2>
                <div id="close-btn" class="nav__exit">&times;</div>
                <div class="nav__group">
                    <input class="nav__checkbox-input" type="checkbox" id="sound-checkbox"/> 
                    <label class="nav__label" for="sound-checkbox">
                        Sound
                        <div class="nav__checkbox"></div>
                    </label>
                </div>    
                <div id="select-color-container" class="nav__group">
                    <label class="nav__label u-margin-bottom" for="color_select">Color</label>
                    <select id="color-select" class="nav__select">
                        <option value="white" class="btn">White</option>
                        <option value="green" class="btn">Green</option>
                        <option value="tan" class="btn">Tan</option>
                        <option value="blue" class="btn">Blue</option>
                    </select>
                </div>

            </nav>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template; 

        this.select = this.querySelector('#color-select');
        this.menu = this.querySelector('#menu');
        this.soundCheckbox = this.querySelector('#sound-checkbox');
        this.openMenuButton = this.querySelector('#open-btn');
        this.closeMenuButton = this.querySelector('#close-btn');

        this.soundCheckbox.checked = (localStorage.getItem('soundEnabled') === 'true');

        this.openMenuButton.addEventListener('click', () => {
            this.menu.classList.add('nav--open');
        });

        this.closeMenuButton.addEventListener('click', () => {
            this.menu.classList.remove('nav--open');
        });

        this.soundCheckbox.addEventListener('change', (e) => {
            __WEBPACK_IMPORTED_MODULE_0__sound_sound_service__["a" /* SoundService */].toggleSound(e.target.checked);
        });

        this.setupColorFilters();
    }

    // setups color filters for browsers (disabled for mozilla because of poor performance)
    setupColorFilters() {
        const isMoz = !!(navigator.userAgent.includes('Firefox') > 0);
        
        if (!isMoz) {
            this.currentColor = localStorage.getItem('pipboy-color');
            this.currentColor = this.currentColor || 'white';
            this.crtFilter = document.querySelector('.crt-color-filter');
            this.crtFilter.classList.add(`crt-color-filter--${this.currentColor}`);           

            this.select.addEventListener('change', (e) => {
                this.crtFilter.classList.remove(`crt-color-filter--${this.currentColor}`);
                this.currentColor = e.target.value;
                localStorage.setItem('pipboy-color', this.currentColor);
                this.crtFilter.classList.add(`crt-color-filter--${this.currentColor}`);           
            });

            this.select.value = localStorage.getItem('pipboy-color');
        } else {
            this.selectColorContainer = this.querySelector('#select-color-container');
            this.selectColorContainer.style.display = 'none';
        }

    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = NavigationComponent;



/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a04a523554910b462902c8dfa1d174be.wav";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2da75954cd3eb1970c63ef09f003e149.wav";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c716f576ce3374818b47940945eb7fff.wav";

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sound_sound_service_js__ = __webpack_require__(0);


class FooterComponent extends HTMLElement {

    constructor() {
        super();
        this.template = `
            <footer class="pipboy-footer">
                <div class="pipboy-footer__list u-bottom-to-top">
                    <router-link id="status-btn" class="pipboy-footer__item btn btn--active" [link]="/">Status</router-link>
                    <router-link id="about-me-btn" class="pipboy-footer__item btn" [link]="/about-me">A.B.O.U.T.M.E</router-link>
                    <router-link id="contact-btn" class="pipboy-footer__item btn" [link]="/contact">Contact</router-link>
                </div>
            </footer>
        `;
    }
    // <router-link id="settings-btn" class="pipboy-footer__item btn" [link]="/settings">Settings</router-link>

    connectedCallback() {
        this.innerHTML = this.template;

        this.buttons = [
            this.querySelector('#status-btn'),
            this.querySelector('#about-me-btn'),
            this.querySelector('#contact-btn'),
        ];

        this.buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.buttons.forEach(btn => btn.classList.remove('btn--active'));
                button.classList.add('btn--active');

                __WEBPACK_IMPORTED_MODULE_0__sound_sound_service_js__["a" /* SoundService */].play('select');
            });
        });
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = FooterComponent;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AboutComponent extends HTMLElement {
    constructor() {
        super();
        this.template = `
            <section class="about">
                <h2 class="heading-secondary u-margin-top"> About me </h2>
                <p class="paragraph">
                    Hello my name is Karol and I'm software developer currently working for <a href="https://brainhub.eu/" target="_blank">Brainhub</a>.
                    Usually I spend my time on coding work projects with React on frontend and Node.js on backend. 
                </p>
                <p class="paragraph">
                    Go to contact page if you want to find more information about me around Internet! 
                </p>
            </section>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AboutComponent;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_images_stats_main_100_png__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_images_stats_main_100_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__assets_images_stats_main_100_png__);


class StatusComponent extends HTMLElement {

    constructor() {
        super();
        this.level = 24;

        this.template = `
            <section class="status">
                <img class="status__image" src=".${__WEBPACK_IMPORTED_MODULE_0__assets_images_stats_main_100_png___default.a}" />
                <div class="status__text">
                    <h2 class="heading-secondary u-margin-bottom-30">
                        Karol Toruń
                    </h2>
                    <h3 class="heading-tertiary">
                        Level <span id="level">${this.level}</span> JS developer at 
                        <a class="link" target="_blank" href="https://brainhub.eu"> Brainhub.eu </a>
                    </h3>
                </div>
            </section>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;

        var endDate = new Date();
        var startDate = new Date(1994, 3, 4);

        var lvlYears = endDate.getYear() - startDate.getYear();

        this.querySelector('#level').innerHTML = `${lvlYears}`;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StatusComponent;



/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "80d0fff5deff8d8f90a2c7998bb4c993.png";

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sound_sound_service_js__ = __webpack_require__(0);


class ContactComponent extends HTMLElement {

    constructor() {
        super();
        this.template = `
            <section class="contact">
                <h2 class="heading-secondary u-margin-top"> Contact Me </h2>
                <p class="contact__text"> Please feel free to contact me if you have any questions at: <em class="u-itallic-text">karol.torun94@gmail.com</em>. You can also find me on: 
                    <a class="link" href="https://github.com/Krol22" target="blank"><em>Github</em></a>,
                    <a class="link" href="https://www.linkedin.com/in/karol-toru%C5%84-123503121/" target="blank"><em>LinkedIn</em></a> or 
                    <a class="link" href="https://codepen.io/Krol22/" target="blank"><em>Codepen</em></a>.
                </p>
                <div id="send-mail-button" class="btn btn--active">Send mail</div>
            </section>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;

        this.sendMailButton = this.querySelector('#send-mail-button');
        this.sendMailButton.addEventListener('click', () => {
            __WEBPACK_IMPORTED_MODULE_0__sound_sound_service_js__["a" /* SoundService */].play('select');
            location.href = 'mailto:karol.torun94@gmail.com';
        });

        this.sendMailButton.addEventListener('mouseover', () => {
            __WEBPACK_IMPORTED_MODULE_0__sound_sound_service_js__["a" /* SoundService */].play('highlight');
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ContactComponent;



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sound_sound_service__ = __webpack_require__(0);


class SettingsComponent extends HTMLElement {

    constructor() {
        super();

        this.currentColor = localStorage.getItem('pipboy-color');

        this.template = `
            <div id="menu" class="settings">
                <h2 class="heading-secondary u-margin-top"> Settings </h2>
                <div class="settings__group">
                    <input class="settings__checkbox-input" type="checkbox" id="sound-checkbox"/> 
                    <label class="settings__label" for="sound-checkbox">
                        <span class="settings__label--text"> Sound </span>
                        <div class="settings__label--input">
                            <div class="settings__checkbox"></div>
                        </div>
                    </label>
                </div>    
                <div class="settings__group">
                    <label class="settings__label u-margin-bottom" for="color_select">
                        <span class="settings__label--text"> Color </span>
                        <div class="settings__label--input">
                            <select id="color-select" class="settings__select">
                                <option value="white" class="btn">White</option>
                                <option value="green" class="btn">Green</option>
                                <option value="tan" class="btn">Tan</option>
                                <option value="blue" class="btn">Blue</option>
                            </select>
                        </div>
                    </label>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;

        this.crtFilter = document.querySelector('.crt-color-filter');
        this.select = this.querySelector('#color-select');
        this.menu = this.querySelector('#menu');
        this.soundCheckbox = this.querySelector('#sound-checkbox');
        this.openMenuButton = this.querySelector('#open-btn');
        this.closeMenuButton = this.querySelector('#close-btn');

        this.soundCheckbox.checked = (localStorage.getItem('soundEnabled') === 'true');
        this.select.value = localStorage.getItem('pipboy-color');

        this.select.addEventListener('change', (e) => {
            this.crtFilter.classList.remove(`crt-color-filter--${this.currentColor}`);
            this.currentColor = e.target.value;
            localStorage.setItem('pipboy-color', this.currentColor);
            this.crtFilter.classList.add(`crt-color-filter--${this.currentColor}`);           
        });

        this.soundCheckbox.addEventListener('change', (e) => {
            __WEBPACK_IMPORTED_MODULE_0__sound_sound_service__["a" /* SoundService */].toggleSound(e.target.checked);
        });
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = SettingsComponent;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_delay_helper__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_images_loading_gif__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_images_loading_gif___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__assets_images_loading_gif__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(19);




class LoadingComponent extends HTMLElement {
    constructor() {
        super();
        this.template = `
            <div class="loading-component">
                <div class="loading-container__first">
                    <div class="loading-header">PIP-OS(R) V7.1.0.8</div>
                    <div id="loading-text"></div>
                </div>
                <div class="loading-container__second">
                    <img src=".${__WEBPACK_IMPORTED_MODULE_1__assets_images_loading_gif___default.a}" />
                </div>
            </div>
        `;
        this.loadingText = `
            COPYRIGHT 2075 ROBCO(R) </br>
            LOADER V1.1 </br>
            EXEC VERSION 41.10 </br>
            64k RAM SYSTEM </br>
            38911 BYTES FREE </br>
            NO HOLOTAPE FOUND </br>
            LOAD ROM(1): DEITRIX 303
        `.trim();
    }

    connectedCallback() {
        this.innerHTML = this.template;

        document.documentElement.style.setProperty('--loading-speed', __WEBPACK_IMPORTED_MODULE_2__constants__["a" /* LOADING_SPEED */]);

        this.pipboy = document.querySelectorAll('.pipboy')[0];
        this.loadingComponent = document.querySelectorAll('.loading-component')[0];
        this.loadingTextContainer = document.querySelectorAll('#loading-text')[0];
        this.firstAnimationContainer = document.querySelectorAll('.loading-container__first')[0];
        this.secondAnimationContainer = document.querySelectorAll('.loading-container__second')[0];


        // if (true) {
        //     this.loadingComponent.remove();
        //     delay(1000);
        //     this.pipboy.classList.add('pipboy--visible');
        // }
        this.firstAnimation();
    }

    async firstAnimation() {
        let loadingCounter = 0;
        let blinkCounter = 0;

        await Object(__WEBPACK_IMPORTED_MODULE_0__helpers_delay_helper__["a" /* delay */])(1500 * __WEBPACK_IMPORTED_MODULE_2__constants__["a" /* LOADING_SPEED */]);

        const interval = setInterval(async () => {
            loadingCounter++;
            blinkCounter++;
            if (this.loadingText.substring(loadingCounter, loadingCounter + 5) === '</br>') {
                this.loadingTextContainer.innerHTML += '</br>';
                loadingCounter+=5;
            }

            this.loadingTextContainer.innerHTML = this.loadingText.substring(0, loadingCounter);

            if (Math.floor(blinkCounter / 10) % 2 === 0)
                this.loadingTextContainer.innerHTML += '<div class="caret">&#9608;</div>';

            if (loadingCounter > this.loadingText.length) {
                clearInterval(interval);
                await Object(__WEBPACK_IMPORTED_MODULE_0__helpers_delay_helper__["a" /* delay */])(700 * __WEBPACK_IMPORTED_MODULE_2__constants__["a" /* LOADING_SPEED */]);
                this.firstAnimationContainer.classList.add('loading-container__first--loaded');
                this.secondAnimation();
            }
        }, 30 * __WEBPACK_IMPORTED_MODULE_2__constants__["a" /* LOADING_SPEED */]);
    }

    async secondAnimation() {
        await Object(__WEBPACK_IMPORTED_MODULE_0__helpers_delay_helper__["a" /* delay */])(3500 * __WEBPACK_IMPORTED_MODULE_2__constants__["a" /* LOADING_SPEED */]);

        this.secondAnimationContainer.classList.add('loading-container__second--loaded');

        await Object(__WEBPACK_IMPORTED_MODULE_0__helpers_delay_helper__["a" /* delay */])(3500 * __WEBPACK_IMPORTED_MODULE_2__constants__["a" /* LOADING_SPEED */]);

        this.loadingComponent.style.display = 'none';
        this.secondAnimationContainer.remove();
        this.pipboy.classList.add('pipboy--visible');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LoadingComponent;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = delay;
function delay(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "7c39eb561f21fe11517303b8e2d397f5.gif";

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const LOADING_SPEED = .7;
/* harmony export (immutable) */ __webpack_exports__["a"] = LOADING_SPEED;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map