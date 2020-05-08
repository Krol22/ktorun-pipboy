// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/router/router.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = void 0;
var Router = {
  /*
      * content can be static html or component
  */
  init: function init() {
    var _this = this;

    this.routes = {};
    this.element = document.getElementsByTagName('router')[0];
    this.history = [];

    window.onpopstate = function (e) {
      console.log(e);

      _this.goTo(e.state.url);
    };
  },
  addPath: function addPath(path, content) {
    if (this.routes[path]) {
      throw new Error('Content in this path already exists!');
    }

    this.routes[path] = content;
  },
  goTo: function goTo(path) {
    var _this2 = this;

    var route = findRoute(path);

    if (!this.routes[route.path]) {
      throw new Error('Path not recognized!');
    }

    this.currentLocation = route;
    window.history.pushState({
      url: path
    }, path);

    if (this.routes[route.path].resolve) {
      this.currentLocation.resolve = {};
      this.routes[route.path].resolve(this.currentLocation).then(function () {
        _this2.element.innerHTML = _this2.routes[route.path].text;
      });
    } else {
      this.element.innerHTML = this.routes[route.path].text;
    }
  }
};
exports.Router = Router;

function findRoute(path) {
  var pathElements = path.split("/");
  var parameters = {};
  var match = Object.keys(Router.routes).find(function (routerPath) {
    var routerPathElements = routerPath.split("/");

    if (pathElements.length !== routerPathElements.length) {
      return false;
    }

    for (var i = 0; i < pathElements.length; i++) {
      if (routerPathElements[i].substring(0, 1) === '{' && routerPathElements[i].substring(routerPathElements[i].length - 1, routerPathElements[i].length) === '}') {
        var paramName = routerPathElements[i].substring(1, routerPathElements[i].length - 1);
        parameters[paramName] = pathElements[i];
        continue;
      }

      if (routerPathElements[i] !== pathElements[i]) {
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
},{}],"src/router/routerLink.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouterLink = void 0;

var _router = require("./router.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var RouterLink =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(RouterLink, _HTMLElement);

  var _super = _createSuper(RouterLink);

  function RouterLink() {
    _classCallCheck(this, RouterLink);

    return _super.call(this);
  }

  _createClass(RouterLink, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      this.addEventListener('click', function (e) {
        e.preventDefault();

        _router.Router.goTo(_this.getAttribute('[link]'));
      });
    }
  }]);

  return RouterLink;
}(
/*#__PURE__*/
_wrapNativeSuper(HTMLElement));

exports.RouterLink = RouterLink;
},{"./router.js":"src/router/router.js"}],"src/router/router-module.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Router", {
  enumerable: true,
  get: function () {
    return _router.Router;
  }
});
Object.defineProperty(exports, "RouterLink", {
  enumerable: true,
  get: function () {
    return _routerLink.RouterLink;
  }
});
exports.RouterModule = void 0;

var _router = require("./router.js");

var _routerLink = require("./routerLink.js");

var RouterModule = {
  init: function init() {
    _router.Router.init();

    customElements.define('router-link', _routerLink.RouterLink);
  }
};
exports.RouterModule = RouterModule;
},{"./router.js":"src/router/router.js","./routerLink.js":"src/router/routerLink.js"}],"src/layout/header-component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderComponent = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var HeaderComponent =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(HeaderComponent, _HTMLElement);

  var _super = _createSuper(HeaderComponent);

  function HeaderComponent() {
    var _this;

    _classCallCheck(this, HeaderComponent);

    _this = _super.call(this);
    _this.template = "\n            <header class=\"header\">\n                <div class=\"header__title\">STATS</div>\n                <ul class=\"header-list\">\n                    <li class=\"header-list__item header-list__item--lvl u-top-to-bottom\">\n                        <span class=\"header-list__text\">LVL</span>\n                        <span id=\"lvl-value\" class=\"header-list__value\">24</span>\n                    </li>\n                    <li class=\"header-list__item header-list__item--hp u-right-top-to-bottom\">\n                        <span class=\"header-list__text\">HP</span>\n                        <span class=\"header-list__value\">220/220</span>\n                    </li>\n                    <li class=\"header-list__item header-list__item--ap u-right-top-to-bottom\">\n                        <span class=\"header-list__text\">AP</span>\n                        <span class=\"header-list__value\">75/75</span>\n                    </li>\n                    <li class=\"header-list__item header-list__item--xp u-right-top-to-bottom\">\n                        <span class=\"header-list__text\">XP</span>\n                        <span id=\"xp-value\" class=\"header-list__value\">100 days</span>\n                    </li>\n                </ul>\n            </header>\n        ";
    return _this;
  }

  _createClass(HeaderComponent, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.innerHTML = this.template;
      this.elements = {
        lvlValue: this.querySelector('#lvl-value'),
        xpValue: this.querySelector('#xp-value')
      };

      this._calculateDates();
    }
  }, {
    key: "_calculateDates",
    value: function _calculateDates() {
      var oneDay = 24 * 60 * 60 * 1000;
      var startWorkDate = new Date(2016, 7, 1);
      var startLvlDate = new Date(1994, 3, 4);
      var endDate = new Date();
      var workDaysExp = Math.round((endDate.getTime() - startWorkDate.getTime()) / oneDay);
      var lvlYears = endDate.getYear() - startLvlDate.getYear();
      this.elements.xpValue.innerHTML = "".concat(workDaysExp, " days");
      this.elements.lvlValue.innerHTML = "".concat(lvlYears);
    }
  }]);

  return HeaderComponent;
}(
/*#__PURE__*/
_wrapNativeSuper(HTMLElement));

exports.HeaderComponent = HeaderComponent;
},{}],"assets/sounds/pipboy/ui_pipboy_select.wav":[function(require,module,exports) {
module.exports = "/ui_pipboy_select.c81f61f4.wav";
},{}],"assets/sounds/pipboy/ui_pipboy_highlight.wav":[function(require,module,exports) {
module.exports = "/ui_pipboy_highlight.7b562d59.wav";
},{}],"assets/sounds/pipboy/ui_pipboy_mode.wav":[function(require,module,exports) {
module.exports = "/ui_pipboy_mode.20380518.wav";
},{}],"src/sound/sound.service.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundService = void 0;

var _ui_pipboy_select = _interopRequireDefault(require("../../assets/sounds/pipboy/ui_pipboy_select.wav"));

var _ui_pipboy_highlight = _interopRequireDefault(require("../../assets/sounds/pipboy/ui_pipboy_highlight.wav"));

var _ui_pipboy_mode = _interopRequireDefault(require("../../assets/sounds/pipboy/ui_pipboy_mode.wav"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SoundService = {
  init: function init() {
    this.enabled = 'true' === localStorage.getItem('soundEnabled');
    this.sounds = {
      // '.' - added for production support of static files, problem with finding them on production.
      select: new Audio('.' + _ui_pipboy_select.default),
      highlight: new Audio('.' + _ui_pipboy_highlight.default),
      mode: new Audio('.' + _ui_pipboy_mode.default)
    };
  },
  play: function play(soundName) {
    if (this.enabled) {
      this.sounds[soundName].play();
    }
  },
  toggleSound: function toggleSound(value) {
    localStorage.setItem('soundEnabled', value);
    this.enabled = value;
  }
};
exports.SoundService = SoundService;
},{"../../assets/sounds/pipboy/ui_pipboy_select.wav":"assets/sounds/pipboy/ui_pipboy_select.wav","../../assets/sounds/pipboy/ui_pipboy_highlight.wav":"assets/sounds/pipboy/ui_pipboy_highlight.wav","../../assets/sounds/pipboy/ui_pipboy_mode.wav":"assets/sounds/pipboy/ui_pipboy_mode.wav"}],"src/layout/navigation-component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationComponent = void 0;

var _sound = require("../sound/sound.service");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var NavigationComponent =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(NavigationComponent, _HTMLElement);

  var _super = _createSuper(NavigationComponent);

  function NavigationComponent() {
    var _this;

    _classCallCheck(this, NavigationComponent);

    _this = _super.call(this);
    _this.template = "\n            <div id=\"open-btn\" class=\"nav__open-btn\">&equiv;</div>\n            <nav id=\"menu\" class=\"nav\">\n                <h2>Settings</h2>\n                <div id=\"close-btn\" class=\"nav__exit\">&times;</div>\n                <div class=\"nav__group\">\n                    <input class=\"nav__checkbox-input\" type=\"checkbox\" id=\"sound-checkbox\"/> \n                    <label class=\"nav__label\" for=\"sound-checkbox\">\n                        Sound\n                        <div class=\"nav__checkbox\"></div>\n                    </label>\n                </div>    \n                <div id=\"select-color-container\" class=\"nav__group\">\n                    <label class=\"nav__label u-margin-bottom\" for=\"color_select\">Color</label>\n                    <select id=\"color-select\" class=\"nav__select\">\n                        <option value=\"white\" class=\"btn\">White</option>\n                        <option value=\"green\" class=\"btn\">Green</option>\n                        <option value=\"tan\" class=\"btn\">Tan</option>\n                        <option value=\"blue\" class=\"btn\">Blue</option>\n                    </select>\n                </div>\n\n            </nav>\n        ";
    return _this;
  }

  _createClass(NavigationComponent, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      this.innerHTML = this.template;
      this.select = this.querySelector('#color-select');
      this.menu = this.querySelector('#menu');
      this.soundCheckbox = this.querySelector('#sound-checkbox');
      this.openMenuButton = this.querySelector('#open-btn');
      this.closeMenuButton = this.querySelector('#close-btn');
      this.soundCheckbox.checked = localStorage.getItem('soundEnabled') === 'true';
      this.openMenuButton.addEventListener('click', function () {
        _this2.menu.classList.add('nav--open');
      });
      this.closeMenuButton.addEventListener('click', function () {
        _this2.menu.classList.remove('nav--open');
      });
      this.soundCheckbox.addEventListener('change', function (e) {
        _sound.SoundService.toggleSound(e.target.checked);
      });
      this.setupColorFilters();
    } // setups color filters for browsers (disabled for mozilla because of poor performance)

  }, {
    key: "setupColorFilters",
    value: function setupColorFilters() {
      var _this3 = this;

      var isMoz = !!(navigator.userAgent.includes('Firefox') > 0);

      if (!isMoz) {
        this.currentColor = localStorage.getItem('pipboy-color');
        this.currentColor = this.currentColor || 'white';
        this.crtFilter = document.querySelector('.crt-color-filter');
        this.crtFilter.classList.add("crt-color-filter--".concat(this.currentColor));
        this.select.addEventListener('change', function (e) {
          _this3.crtFilter.classList.remove("crt-color-filter--".concat(_this3.currentColor));

          _this3.currentColor = e.target.value;
          localStorage.setItem('pipboy-color', _this3.currentColor);

          _this3.crtFilter.classList.add("crt-color-filter--".concat(_this3.currentColor));
        });
        this.select.value = localStorage.getItem('pipboy-color');
      } else {
        this.selectColorContainer = this.querySelector('#select-color-container');
        this.selectColorContainer.style.display = 'none';
      }
    }
  }]);

  return NavigationComponent;
}(
/*#__PURE__*/
_wrapNativeSuper(HTMLElement));

exports.NavigationComponent = NavigationComponent;
},{"../sound/sound.service":"src/sound/sound.service.js"}],"src/layout/footer-component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FooterComponent = void 0;

var _soundService = require("../sound/sound.service.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var FooterComponent =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(FooterComponent, _HTMLElement);

  var _super = _createSuper(FooterComponent);

  function FooterComponent() {
    var _this;

    _classCallCheck(this, FooterComponent);

    _this = _super.call(this);
    _this.template = "\n            <footer class=\"pipboy-footer\">\n                <div class=\"pipboy-footer__list u-bottom-to-top\">\n                    <router-link id=\"status-btn\" class=\"pipboy-footer__item btn btn--active\" [link]=\"/\">Status</router-link>\n                    <router-link id=\"about-me-btn\" class=\"pipboy-footer__item btn\" [link]=\"/about-me\">A.B.O.U.T.M.E</router-link>\n                    <router-link id=\"contact-btn\" class=\"pipboy-footer__item btn\" [link]=\"/contact\">Contact</router-link>\n                </div>\n            </footer>\n        ";
    return _this;
  } // <router-link id="settings-btn" class="pipboy-footer__item btn" [link]="/settings">Settings</router-link>


  _createClass(FooterComponent, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      this.innerHTML = this.template;
      this.buttons = [this.querySelector('#status-btn'), this.querySelector('#about-me-btn'), this.querySelector('#contact-btn')];
      this.buttons.forEach(function (button) {
        button.addEventListener('click', function () {
          _this2.buttons.forEach(function (btn) {
            return btn.classList.remove('btn--active');
          });

          button.classList.add('btn--active');

          _soundService.SoundService.play('select');
        });
      });
    }
  }]);

  return FooterComponent;
}(
/*#__PURE__*/
_wrapNativeSuper(HTMLElement));

exports.FooterComponent = FooterComponent;
},{"../sound/sound.service.js":"src/sound/sound.service.js"}],"src/main/about-component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AboutComponent = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var AboutComponent =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(AboutComponent, _HTMLElement);

  var _super = _createSuper(AboutComponent);

  function AboutComponent() {
    var _this;

    _classCallCheck(this, AboutComponent);

    _this = _super.call(this);
    _this.template = "\n            <section class=\"about\">\n                <h2 class=\"heading-secondary u-margin-top\"> About me </h2>\n                <p class=\"paragraph\">\n                    Hello my name is Karol and I'm software developer currently working for <a href=\"https://brainhub.eu/\" target=\"_blank\">Brainhub</a>.\n                    Usually I spend my time on coding work projects with React on frontend and Node.js on backend. \n                </p>\n                <p class=\"paragraph\">\n                    Go to contact page if you want to find more information about me around Internet! \n                </p>\n            </section>\n        ";
    return _this;
  }

  _createClass(AboutComponent, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.innerHTML = this.template;
    }
  }]);

  return AboutComponent;
}(
/*#__PURE__*/
_wrapNativeSuper(HTMLElement));

exports.AboutComponent = AboutComponent;
},{}],"assets/images/stats_main_100.png":[function(require,module,exports) {
module.exports = "/stats_main_100.da723a02.png";
},{}],"src/main/status-component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatusComponent = void 0;

var _stats_main_ = _interopRequireDefault(require("../../assets/images/stats_main_100.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var StatusComponent =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(StatusComponent, _HTMLElement);

  var _super = _createSuper(StatusComponent);

  function StatusComponent() {
    var _this;

    _classCallCheck(this, StatusComponent);

    _this = _super.call(this);
    _this.level = 24;
    _this.template = "\n            <section class=\"status\">\n                <img class=\"status__image\" src=\".".concat(_stats_main_.default, "\" />\n                <div class=\"status__text\">\n                    <h2 class=\"heading-secondary u-margin-bottom-30\">\n                        Karol Toru\u0144\n                    </h2>\n                    <h3 class=\"heading-tertiary\">\n                        Level <span id=\"level\">").concat(_this.level, "</span> JS developer at \n                        <a class=\"link\" target=\"_blank\" href=\"https://brainhub.eu\"> Brainhub.eu </a>\n                    </h3>\n                </div>\n            </section>\n        ");
    return _this;
  }

  _createClass(StatusComponent, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.innerHTML = this.template;
      var endDate = new Date();
      var startDate = new Date(1994, 3, 4);
      var lvlYears = endDate.getYear() - startDate.getYear();
      this.querySelector('#level').innerHTML = "".concat(lvlYears);
    }
  }]);

  return StatusComponent;
}(
/*#__PURE__*/
_wrapNativeSuper(HTMLElement));

exports.StatusComponent = StatusComponent;
},{"../../assets/images/stats_main_100.png":"assets/images/stats_main_100.png"}],"src/main/contact-component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactComponent = void 0;

var _soundService = require("../sound/sound.service.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ContactComponent =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(ContactComponent, _HTMLElement);

  var _super = _createSuper(ContactComponent);

  function ContactComponent() {
    var _this;

    _classCallCheck(this, ContactComponent);

    _this = _super.call(this);
    _this.template = "\n            <section class=\"contact\">\n                <h2 class=\"heading-secondary u-margin-top\"> Contact Me </h2>\n                <p class=\"contact__text\"> Please feel free to contact me if you have any questions at: <em class=\"u-itallic-text\">karol.torun94@gmail.com</em>. You can also find me on: \n                    <a class=\"link\" href=\"https://github.com/Krol22\" target=\"blank\"><em>Github</em></a>,\n                    <a class=\"link\" href=\"https://www.linkedin.com/in/karol-toru%C5%84-123503121/\" target=\"blank\"><em>LinkedIn</em></a> or \n                    <a class=\"link\" href=\"https://codepen.io/Krol22/\" target=\"blank\"><em>Codepen</em></a>.\n                </p>\n                <div id=\"send-mail-button\" class=\"btn btn--active\">Send mail</div>\n            </section>\n        ";
    return _this;
  }

  _createClass(ContactComponent, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.innerHTML = this.template;
      this.sendMailButton = this.querySelector('#send-mail-button');
      this.sendMailButton.addEventListener('click', function () {
        _soundService.SoundService.play('select');

        location.href = 'mailto:karol.torun94@gmail.com';
      });
      this.sendMailButton.addEventListener('mouseover', function () {
        _soundService.SoundService.play('highlight');
      });
    }
  }]);

  return ContactComponent;
}(
/*#__PURE__*/
_wrapNativeSuper(HTMLElement));

exports.ContactComponent = ContactComponent;
},{"../sound/sound.service.js":"src/sound/sound.service.js"}],"src/main/settings-component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsComponent = void 0;

var _sound = require("../sound/sound.service");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SettingsComponent =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(SettingsComponent, _HTMLElement);

  var _super = _createSuper(SettingsComponent);

  function SettingsComponent() {
    var _this;

    _classCallCheck(this, SettingsComponent);

    _this = _super.call(this);
    _this.currentColor = localStorage.getItem('pipboy-color');
    _this.template = "\n            <div id=\"menu\" class=\"settings\">\n                <h2 class=\"heading-secondary u-margin-top\"> Settings </h2>\n                <div class=\"settings__group\">\n                    <input class=\"settings__checkbox-input\" type=\"checkbox\" id=\"sound-checkbox\"/> \n                    <label class=\"settings__label\" for=\"sound-checkbox\">\n                        <span class=\"settings__label--text\"> Sound </span>\n                        <div class=\"settings__label--input\">\n                            <div class=\"settings__checkbox\"></div>\n                        </div>\n                    </label>\n                </div>    \n                <div class=\"settings__group\">\n                    <label class=\"settings__label u-margin-bottom\" for=\"color_select\">\n                        <span class=\"settings__label--text\"> Color </span>\n                        <div class=\"settings__label--input\">\n                            <select id=\"color-select\" class=\"settings__select\">\n                                <option value=\"white\" class=\"btn\">White</option>\n                                <option value=\"green\" class=\"btn\">Green</option>\n                                <option value=\"tan\" class=\"btn\">Tan</option>\n                                <option value=\"blue\" class=\"btn\">Blue</option>\n                            </select>\n                        </div>\n                    </label>\n                </div>\n            </div>\n        ";
    return _this;
  }

  _createClass(SettingsComponent, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      this.innerHTML = this.template;
      this.crtFilter = document.querySelector('.crt-color-filter');
      this.select = this.querySelector('#color-select');
      this.menu = this.querySelector('#menu');
      this.soundCheckbox = this.querySelector('#sound-checkbox');
      this.openMenuButton = this.querySelector('#open-btn');
      this.closeMenuButton = this.querySelector('#close-btn');
      this.soundCheckbox.checked = localStorage.getItem('soundEnabled') === 'true';
      this.select.value = localStorage.getItem('pipboy-color');
      this.select.addEventListener('change', function (e) {
        _this2.crtFilter.classList.remove("crt-color-filter--".concat(_this2.currentColor));

        _this2.currentColor = e.target.value;
        localStorage.setItem('pipboy-color', _this2.currentColor);

        _this2.crtFilter.classList.add("crt-color-filter--".concat(_this2.currentColor));
      });
      this.soundCheckbox.addEventListener('change', function (e) {
        _sound.SoundService.toggleSound(e.target.checked);
      });
    }
  }]);

  return SettingsComponent;
}(
/*#__PURE__*/
_wrapNativeSuper(HTMLElement));

exports.SettingsComponent = SettingsComponent;
},{"../sound/sound.service":"src/sound/sound.service.js"}],"src/helpers/delay.helper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delay = delay;

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, time);
  });
}
},{}],"assets/images/loading.gif":[function(require,module,exports) {
module.exports = "/loading.665dc484.gif";
},{}],"src/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOADING_SPEED = void 0;
var LOADING_SPEED = .7;
exports.LOADING_SPEED = LOADING_SPEED;
},{}],"src/loading/loading-component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingComponent = void 0;

var _delay = require("../helpers/delay.helper");

var _loading = _interopRequireDefault(require("../../assets/images/loading.gif"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var LoadingComponent =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(LoadingComponent, _HTMLElement);

  var _super = _createSuper(LoadingComponent);

  function LoadingComponent() {
    var _this;

    _classCallCheck(this, LoadingComponent);

    _this = _super.call(this);
    _this.template = "\n            <div class=\"loading-component\">\n                <div class=\"loading-container__first\">\n                    <div class=\"loading-header\">PIP-OS(R) V7.1.0.8</div>\n                    <div id=\"loading-text\"></div>\n                </div>\n                <div class=\"loading-container__second\">\n                    <img src=\".".concat(_loading.default, "\" />\n                </div>\n            </div>\n        ");
    _this.loadingText = "\n            COPYRIGHT 2075 ROBCO(R) </br>\n            LOADER V1.1 </br>\n            EXEC VERSION 41.10 </br>\n            64k RAM SYSTEM </br>\n            38911 BYTES FREE </br>\n            NO HOLOTAPE FOUND </br>\n            LOAD ROM(1): DEITRIX 303\n        ".trim();
    return _this;
  }

  _createClass(LoadingComponent, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.innerHTML = this.template;
      document.documentElement.style.setProperty('--loading-speed', _constants.LOADING_SPEED);
      this.pipboy = document.querySelectorAll('.pipboy')[0];
      this.loadingComponent = document.querySelectorAll('.loading-component')[0];
      this.loadingTextContainer = document.querySelectorAll('#loading-text')[0];
      this.firstAnimationContainer = document.querySelectorAll('.loading-container__first')[0];
      this.secondAnimationContainer = document.querySelectorAll('.loading-container__second')[0]; // if (true) {
      //     this.loadingComponent.remove();
      //     delay(1000);
      //     this.pipboy.classList.add('pipboy--visible');
      // }

      this.firstAnimation();
    }
  }, {
    key: "firstAnimation",
    value: function () {
      var _firstAnimation = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        var loadingCounter, blinkCounter, interval;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                loadingCounter = 0;
                blinkCounter = 0;
                _context2.next = 4;
                return (0, _delay.delay)(1500 * _constants.LOADING_SPEED);

              case 4:
                interval = setInterval(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          loadingCounter++;
                          blinkCounter++;

                          if (_this2.loadingText.substring(loadingCounter, loadingCounter + 5) === '</br>') {
                            _this2.loadingTextContainer.innerHTML += '</br>';
                            loadingCounter += 5;
                          }

                          _this2.loadingTextContainer.innerHTML = _this2.loadingText.substring(0, loadingCounter);
                          if (Math.floor(blinkCounter / 10) % 2 === 0) _this2.loadingTextContainer.innerHTML += '<div class="caret">&#9608;</div>';

                          if (!(loadingCounter > _this2.loadingText.length)) {
                            _context.next = 11;
                            break;
                          }

                          clearInterval(interval);
                          _context.next = 9;
                          return (0, _delay.delay)(700 * _constants.LOADING_SPEED);

                        case 9:
                          _this2.firstAnimationContainer.classList.add('loading-container__first--loaded');

                          _this2.secondAnimation();

                        case 11:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                })), 30 * _constants.LOADING_SPEED);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function firstAnimation() {
        return _firstAnimation.apply(this, arguments);
      }

      return firstAnimation;
    }()
  }, {
    key: "secondAnimation",
    value: function () {
      var _secondAnimation = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _delay.delay)(3500 * _constants.LOADING_SPEED);

              case 2:
                this.secondAnimationContainer.classList.add('loading-container__second--loaded');
                _context3.next = 5;
                return (0, _delay.delay)(3500 * _constants.LOADING_SPEED);

              case 5:
                this.loadingComponent.style.display = 'none';
                this.secondAnimationContainer.remove();
                this.pipboy.classList.add('pipboy--visible');

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function secondAnimation() {
        return _secondAnimation.apply(this, arguments);
      }

      return secondAnimation;
    }()
  }]);

  return LoadingComponent;
}(
/*#__PURE__*/
_wrapNativeSuper(HTMLElement));

exports.LoadingComponent = LoadingComponent;
},{"../helpers/delay.helper":"src/helpers/delay.helper.js","../../assets/images/loading.gif":"assets/images/loading.gif","../constants":"src/constants.js"}],"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _routerModule = require("./router/router-module.js");

var _headerComponent = require("./layout/header-component.js");

var _navigationComponent = require("./layout/navigation-component.js");

var _footerComponent = require("./layout/footer-component.js");

var _aboutComponent = require("./main/about-component.js");

var _statusComponent = require("./main/status-component.js");

var _contactComponent = require("./main/contact-component.js");

var _settingsComponent = require("./main/settings-component.js");

var _loadingComponent = require("./loading/loading-component.js");

var _soundService = require("./sound/sound.service.js");

require('../styles/main.scss');

_routerModule.RouterModule.init();

_routerModule.Router.addPath('/', {
  text: '<status-component></status-component>'
});

_routerModule.Router.addPath('/about-me', {
  text: '<about-me-component></about-me-component>'
});

_routerModule.Router.addPath('/contact', {
  text: '<contact-component></contact-component>'
});

_routerModule.Router.addPath('/settings', {
  text: '<settings-component></settings-component>'
});

_routerModule.Router.goTo('/');

_soundService.SoundService.init();

customElements.define('header-component', _headerComponent.HeaderComponent);
customElements.define('settings-component', _settingsComponent.SettingsComponent);
customElements.define('footer-component', _footerComponent.FooterComponent);
customElements.define('about-me-component', _aboutComponent.AboutComponent);
customElements.define('status-component', _statusComponent.StatusComponent);
customElements.define('contact-component', _contactComponent.ContactComponent);
customElements.define('loading-component', _loadingComponent.LoadingComponent);
customElements.define('navigation-component', _navigationComponent.NavigationComponent);
},{"./router/router-module.js":"src/router/router-module.js","./layout/header-component.js":"src/layout/header-component.js","./layout/navigation-component.js":"src/layout/navigation-component.js","./layout/footer-component.js":"src/layout/footer-component.js","./main/about-component.js":"src/main/about-component.js","./main/status-component.js":"src/main/status-component.js","./main/contact-component.js":"src/main/contact-component.js","./main/settings-component.js":"src/main/settings-component.js","./loading/loading-component.js":"src/loading/loading-component.js","./sound/sound.service.js":"src/sound/sound.service.js","../styles/main.scss":"styles/main.scss"}],"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64493" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map