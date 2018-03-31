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
            select: new Audio(__WEBPACK_IMPORTED_MODULE_0__assets_sounds_pipboy_ui_pipboy_select_wav___default.a),
            highlight: new Audio(__WEBPACK_IMPORTED_MODULE_1__assets_sounds_pipboy_ui_pipboy_highlight_wav___default.a),
            mode: new Audio(__WEBPACK_IMPORTED_MODULE_2__assets_sounds_pipboy_ui_pipboy_mode_wav___default.a)
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

}
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
}
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
                break;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__main_skills_component_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__main_status_component_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__main_contact_component_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__sound_sound_service_js__ = __webpack_require__(0);












// require('../styles/main.scss');

__WEBPACK_IMPORTED_MODULE_0__router_router_module_js__["b" /* RouterModule */].init();

__WEBPACK_IMPORTED_MODULE_0__router_router_module_js__["a" /* Router */].addPath('/', 
    {
        text: '<status-component></status-component>'
    }
);
__WEBPACK_IMPORTED_MODULE_0__router_router_module_js__["a" /* Router */].addPath('/skills', 
    {
        text: '<skills-component></skills-component>'
    }
);
__WEBPACK_IMPORTED_MODULE_0__router_router_module_js__["a" /* Router */].addPath('/contact', 
    {
        text: '<contact-component></contact-component>'
    }
);

__WEBPACK_IMPORTED_MODULE_0__router_router_module_js__["a" /* Router */].goTo('/');

__WEBPACK_IMPORTED_MODULE_7__sound_sound_service_js__["a" /* SoundService */].init();

customElements.define('header-component', __WEBPACK_IMPORTED_MODULE_1__layout_header_component_js__["a" /* HeaderComponent */]);
customElements.define('navigation-component', __WEBPACK_IMPORTED_MODULE_2__layout_navigation_component_js__["a" /* NavigationComponent */]);
customElements.define('footer-component', __WEBPACK_IMPORTED_MODULE_3__layout_footer_component_js__["a" /* FooterComponent */]);
customElements.define('skills-component', __WEBPACK_IMPORTED_MODULE_4__main_skills_component_js__["a" /* SkillsComponent */]);
customElements.define('status-component', __WEBPACK_IMPORTED_MODULE_5__main_status_component_js__["a" /* StatusComponent */]);
customElements.define('contact-component', __WEBPACK_IMPORTED_MODULE_6__main_contact_component_js__["a" /* ContactComponent */]);


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
    };

    _calculateDates() {
        var oneDay = 24 * 60 * 60 * 1000;
        var startWorkDate = new Date(2016, 7, 1);
        var startLvlDate = new Date(1994, 3, 4);
        var endDate = new Date();

        var workDaysExp = Math.round((endDate.getTime() - startWorkDate.getTime()) / oneDay);
        var lvlYears = endDate.getYear() - startLvlDate.getYear();

        this.elements.xpValue.innerHTML = `${ workDaysExp } days`;
        this.elements.lvlValue.innerHTML = `${ lvlYears }`;
    };

    disconnectedCallback() {

    };

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
                <div class="nav__group">
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

        this.crtFilter = document.querySelector('.crt-color-filter');
        this.select = this.querySelector('#color-select');
        this.menu = this.querySelector('#menu');
        this.soundCheckbox = this.querySelector('#sound-checkbox');
        this.openMenuButton = this.querySelector('#open-btn');
        this.closeMenuButton = this.querySelector('#close-btn');

        this.currentColor = localStorage.getItem('pipboy-color');
        this.currentColor = this.currentColor || 'white';
        this.crtFilter.classList.add(`crt-color-filter--${this.currentColor}`);           

        this.soundCheckbox.checked = (localStorage.getItem('soundEnabled') === 'true');

        this.select.addEventListener('change', e => {
            this.crtFilter.classList.remove(`crt-color-filter--${this.currentColor}`);
            this.currentColor = e.target.value;
            localStorage.setItem('pipboy-color', this.currentColor);
            this.crtFilter.classList.add(`crt-color-filter--${this.currentColor}`);           
        });

        this.openMenuButton.addEventListener('click', e => {
            this.menu.classList.add('nav--open');
        });

        this.closeMenuButton.addEventListener('click', e => {
            this.menu.classList.remove('nav--open');
        });

        this.soundCheckbox.addEventListener('change', e => {
            __WEBPACK_IMPORTED_MODULE_0__sound_sound_service__["a" /* SoundService */].toggleSound(e.target.checked);
        });
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
                    <router-link id="skills-btn" class="pipboy-footer__item btn" [link]="/skills">S.K.I.L.L.S</router-link>
                    <router-link id="contact-btn" class="pipboy-footer__item btn" [link]="/contact">Contact</router-link>
                </div>
            </footer>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;

        this.buttons = [
            this.querySelector('#status-btn'),
            this.querySelector('#skills-btn'),
            this.querySelector('#contact-btn')
        ];

        this.buttons.forEach(button => {
            button.addEventListener('click', e => {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sound_sound_service_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_images_js_png__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_images_js_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__assets_images_js_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_images_angular_png__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_images_angular_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__assets_images_angular_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_images_angularjs_png__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_images_angularjs_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__assets_images_angularjs_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_images_kendo_png__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_images_kendo_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__assets_images_kendo_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_images_html_png__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_images_html_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__assets_images_html_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_images_css_png__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_images_css_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__assets_images_css_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__assets_images_tools_png__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__assets_images_tools_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__assets_images_tools_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__assets_images_tests_png__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__assets_images_tests_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__assets_images_tests_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__assets_images_webComponents_png__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__assets_images_webComponents_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__assets_images_webComponents_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__assets_images_vim_png__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__assets_images_vim_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__assets_images_vim_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__assets_images_sql_png__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__assets_images_sql_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__assets_images_sql_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__assets_images_other_png__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__assets_images_other_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__assets_images_other_png__);














const skills = [
    { 
        name: 'JS', 
        img: __WEBPACK_IMPORTED_MODULE_1__assets_images_js_png___default.a,
        text: 'Main and favorite language that I use in work and daily projects.'
    },
    { 
        name: 'AngularJS', 
        img: __WEBPACK_IMPORTED_MODULE_3__assets_images_angularjs_png___default.a,
        text: 'First framework (ver. 1.6) I was learning during my initial project at work. You can check some of components I\'ve created on my Github page.',
    },
    { 
        name: 'Angular', 
        img: __WEBPACK_IMPORTED_MODULE_2__assets_images_angular_png___default.a,
        text: 'In small team we have created an inner order management system for bakery. More about it in my LinkedIn account.'
    },
    { 
        name: 'Kendo UI', 
        img: __WEBPACK_IMPORTED_MODULE_4__assets_images_kendo_png___default.a,
        text: 'Library used with JQuery in main project in my current work. I have used most of UI Components from library (exept Charts components).'
    },
    { 
        name: 'HTML 5', 
        img: __WEBPACK_IMPORTED_MODULE_5__assets_images_html_png___default.a,
        text: 'I know about semantic new elements, new form attribute types, canvas, audio. Also I was working with Geolocation, Localstorage and Cache API of HTML5.'
    },
    { 
        name: 'CSS 3', 
        img: __WEBPACK_IMPORTED_MODULE_6__assets_images_css_png___default.a,
        text: 'Best things I know about CSS are transitions, animations and RWD with grid and flexbox. Now I\'m learning about preprocessors and BEM.'
    },
    { 
        name: 'Build tools', 
        img: __WEBPACK_IMPORTED_MODULE_7__assets_images_tools_png___default.a,
        text: 'When I was starting my adventure with JS projects I worked with grunt and gulp. Now I basically use webpack for everything.'
    },
    { 
        name: 'Tests', 
        img: __WEBPACK_IMPORTED_MODULE_8__assets_images_tests_png___default.a,
        text: 'Karma runner + Jasmine and PhantomJS. In work project I use Jasmine with Chutzpah test runner (not the best but it works).'
    },
    { 
        name: 'Web Components', 
        img: __WEBPACK_IMPORTED_MODULE_9__assets_images_webComponents_png___default.a,
        text: 'This page is written with use only of custom elements. Love this technology, and I want to use it more in other projects.'
    },
    { 
        name: 'VIM', 
        img: __WEBPACK_IMPORTED_MODULE_10__assets_images_vim_png___default.a,
        text: 'BEST, EDITOR, EVER (specially in VSCode with Vim extension)'
        },
    { 
        name: 'SQL', 
        img: __WEBPACK_IMPORTED_MODULE_11__assets_images_sql_png___default.a,
        text: 'Most of databases I have used were SQL db.'
    },
    { 
        name: 'Other', 
        img: __WEBPACK_IMPORTED_MODULE_12__assets_images_other_png___default.a,
        text: `Other skills not mentioned earlier: Agile, Git, Jira, Trello, VSTS, basic Java and C# ( I worked in project with API written in those languages )` 
    }
];

class SkillsComponent extends HTMLElement {

    constructor() {
        super();

        this.template = `
            <section class="skills">
                <div class="skills__list u-scroll-container">
                    <ul id="list">
                        ${skills.map(skill => `<li class="skills__list-item" data-name="${skill.name}">${skill.name}</li>`).join('')}
                    </ul>
                </div>
                <div class="skills__details" class="item">
                </div>
            </section>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;

        this.elements = {
            list: this.querySelector('#list'),
            selectedItem: this.querySelector('.skills__details')
        };

        this.elements.list.addEventListener('click', e => {
            var selectedItem = e.path[0];  

            if(selectedItem.nodeName !== 'LI') {
                return false; 
            }
            this._setActiveItem(selectedItem);
            this._renderSelectedItem(selectedItem);

            __WEBPACK_IMPORTED_MODULE_0__sound_sound_service_js__["a" /* SoundService */].play('highlight');
        });

        var defaultSelectedItem = this.elements.list.children[0];

        this._setActiveItem(defaultSelectedItem);
        this._renderSelectedItem(defaultSelectedItem);
    }

    _renderSelectedItem(selectedItem) {
        var selectedSkill = skills.find(skill => {
            return skill.name === selectedItem.attributes['data-name'].value;
        });

        this.elements.selectedItem.innerHTML = `
            <figure class="skills__icon">
                <img class="skills__icon-image" src="${selectedSkill.img}" />
            </figure>

            <figcaption class="skills__text u-right-top-to-bottom">
                ${selectedSkill.text}
            </figcaption>
        `;
    }

    _setActiveItem(selectedItem) {
        var currentActiveElement = this.elements.list.querySelector('.skills__list-item--active');
        if(currentActiveElement) {
            currentActiveElement.classList.remove('skills__list-item--active');
        }

        selectedItem.classList.add('skills__list-item--active');
    }

    disconnectedCallback() {

    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = SkillsComponent;



/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b8f681a125bbfa6b0c2dd2e78ce9fd35.png";

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1a34025b3182a0be92bc107ff6d9300f.png";

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2e04c2e75af2180e49f19d9cb2d65815.png";

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "35188d4699cb0b39eb562e75bddde5ca.png";

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "be7f89086703b844ac29a26a195032fa.png";

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "218bb6dbdbc9af480b1d572b6ff3d68f.png";

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2502d74e1ff730872f79cb4d6c39f718.png";

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "d96606bfeeb46e0aeb0feb41f5dd9c0b.png";

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "549619cc08fee8fb8a3d5c1e0b114a2e.png";

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "aa59128c49fe99d1cca1861b963a51b0.png";

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a3f382e788012b88c2535c717f5b0a63.png";

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "606963752c4684fc16de436354ff7169.png";

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_images_stats_main_100_png__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_images_stats_main_100_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__assets_images_stats_main_100_png__);


class StatusComponent extends HTMLElement {

    constructor() {
        super();
        this.level = 24;

        this.template = `
            <section class="status">
                <img class="status__image" src=${__WEBPACK_IMPORTED_MODULE_0__assets_images_stats_main_100_png___default.a} />
                <div class="status__text">
                    <h2 class="heading-secondary u-margin-bottom">
                        Karol Toruń
                    </h2>
                    <h3 class="heading-tertiary">
                        Level <span id="level">${this.level}</span> Frontend developer
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "80d0fff5deff8d8f90a2c7998bb4c993.png";

/***/ }),
/* 26 */
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



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map