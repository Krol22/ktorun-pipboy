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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router_router_module_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layout_header_component_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layout_header_component_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__layout_header_component_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layout_footer_component_js__ = __webpack_require__(5);
throw new Error("Cannot find module \"./layout/skills-component.js\"");






__WEBPACK_IMPORTED_MODULE_0__router_router_module_js__["a" /* Router */].addPath('/', '<status-component></status-component');
__WEBPACK_IMPORTED_MODULE_0__router_router_module_js__["a" /* Router */].addPath('/skills', '<skills-component></skills-component');
__WEBPACK_IMPORTED_MODULE_0__router_router_module_js__["a" /* Router */].addPath('/work', '<work-component></work-component');
__WEBPACK_IMPORTED_MODULE_0__router_router_module_js__["a" /* Router */].addPath('/contact', '<contact-component></contact-component');

customElements.define('header-component', __WEBPACK_IMPORTED_MODULE_1__layout_header_component_js__["HeaderComponent"]);
customElements.define('footer-component', __WEBPACK_IMPORTED_MODULE_2__layout_footer_component_js__["a" /* FooterComponent */]);
customElements.define('skills-component', __WEBPACK_IMPORTED_MODULE_3__layout_skills_component_js__["SkillsComponent"]);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RouterModule */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__routerLink_js__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__router_js__["a"]; });
/* unused harmony reexport RouterLink */



var RouterModule = {
    init() {
        __WEBPACK_IMPORTED_MODULE_0__router_js__["a" /* Router */].init();
        customElements.define('router-link', __WEBPACK_IMPORTED_MODULE_1__routerLink_js__["a" /* RouterLink */]);
    }
}




/***/ }),
/* 2 */
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

        window.history.pushState({ url: path }, '', path);

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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class RouterLink extends HTMLElement {
    
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
/* harmony export (immutable) */ __webpack_exports__["a"] = RouterLink;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (32:59)\nYou may need an appropriate loader to handle this file type.\n|         this.innerHTML = this.template;\n|         this.elements = {\n|             lvlValue: this.querySelector('.lvl span.value');\n|             xpValue: this.querySelector('.xp span.value');\n|         }");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class FooterComponent extends HTMLElement {

    constructor() {
        super();
        this.template = `
            <ul>
                <router-link><li>Status</li></router-link>
                <router-link class="active"><li>Skills</li></router-link>
                <router-link><li>Work</li></router-link>
                <router-link><li>Contact</li></router-link>
            </ul>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = FooterComponent;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map