/*!
  * CoreUI v3.0.0-alpha.9 (https://coreui.io)
  * Copyright 2019 Łukasz Holeczek
  * Licensed under MIT (https://coreui.io)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('popper.js'), require('perfect-scrollbar')) :
  typeof define === 'function' && define.amd ? define(['popper.js', 'perfect-scrollbar'], factory) :
  (global = global || self, global.coreui = factory(global.Popper, global.PerfectScrollbar));
}(this, function (Popper, PerfectScrollbar) { 'use strict';

  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;
  PerfectScrollbar = PerfectScrollbar && PerfectScrollbar.hasOwnProperty('default') ? PerfectScrollbar['default'] : PerfectScrollbar;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000;
  var TRANSITION_END = 'transitionend';
  var _window = window,
      jQuery = _window.jQuery; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  var toType = function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  };
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var getUID = function getUID(prefix) {
    do {
      // eslint-disable-next-line no-bitwise
      prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
    } while (document.getElementById(prefix));

    return prefix;
  };

  var getSelectorFromElement = function getSelectorFromElement(element) {
    var selector = element.getAttribute('data-target');

    if (!selector || selector === '#') {
      var hrefAttr = element.getAttribute('href');
      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
    }

    try {
      return document.querySelector(selector) ? selector : null;
    } catch (error) {
      return null;
    }
  };

  var getTransitionDurationFromElement = function getTransitionDurationFromElement(element) {
    if (!element) {
      return 0;
    } // Get transition-duration of the element


    var _window$getComputedSt = window.getComputedStyle(element),
        transitionDuration = _window$getComputedSt.transitionDuration,
        transitionDelay = _window$getComputedSt.transitionDelay;

    var floatTransitionDuration = parseFloat(transitionDuration);
    var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    } // If multiple durations are defined, take the first


    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };

  var triggerTransitionEnd = function triggerTransitionEnd(element) {
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent(TRANSITION_END, true, true);
    element.dispatchEvent(evt);
  };

  var isElement = function isElement(obj) {
    return (obj[0] || obj).nodeType;
  };

  var emulateTransitionEnd = function emulateTransitionEnd(element, duration) {
    var called = false;
    var durationPadding = 5;
    var emulatedDuration = duration + durationPadding;

    function listener() {
      called = true;
      element.removeEventListener(TRANSITION_END, listener);
    }

    element.addEventListener(TRANSITION_END, listener);
    setTimeout(function () {
      if (!called) {
        triggerTransitionEnd(element);
      }
    }, emulatedDuration);
  };

  var typeCheckConfig = function typeCheckConfig(componentName, config, configTypes) {
    Object.keys(configTypes).forEach(function (property) {
      var expectedTypes = configTypes[property];
      var value = config[property];
      var valueType = value && isElement(value) ? 'element' : toType(value);

      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
      }
    });
  };

  var makeArray = function makeArray(nodeList) {
    if (!nodeList) {
      return [];
    }

    return [].slice.call(nodeList);
  };

  var isVisible = function isVisible(element) {
    if (!element) {
      return false;
    }

    if (element.style && element.parentNode && element.parentNode.style) {
      return element.style.display !== 'none' && element.parentNode.style.display !== 'none' && element.style.visibility !== 'hidden';
    }

    return false;
  };

  var findShadowRoot = function findShadowRoot(element) {
    if (!document.documentElement.attachShadow) {
      return null;
    } // Can find the shadow root otherwise it'll return the document


    if (typeof element.getRootNode === 'function') {
      var root = element.getRootNode();
      return root instanceof ShadowRoot ? root : null;
    }

    if (element instanceof ShadowRoot) {
      return element;
    } // when we don't find a shadow root


    if (!element.parentNode) {
      return null;
    }

    return findShadowRoot(element.parentNode);
  }; // eslint-disable-next-line no-empty-function


  var noop = function noop() {
    return function () {};
  };

  var reflow = function reflow(element) {
    return element.offsetHeight;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var mapData = function () {
    var storeData = {};
    var id = 1;
    return {
      set: function set(element, key, data) {
        if (typeof element.key === 'undefined') {
          element.key = {
            key: key,
            id: id
          };
          id++;
        }

        storeData[element.key.id] = data;
      },
      get: function get(element, key) {
        if (!element || typeof element.key === 'undefined') {
          return null;
        }

        var keyProperties = element.key;

        if (keyProperties.key === key) {
          return storeData[keyProperties.id];
        }

        return null;
      },
      delete: function _delete(element, key) {
        if (typeof element.key === 'undefined') {
          return;
        }

        var keyProperties = element.key;

        if (keyProperties.key === key) {
          delete storeData[keyProperties.id];
          delete element.key;
        }
      }
    };
  }();

  var Data = {
    setData: function setData(instance, key, data) {
      mapData.set(instance, key, data);
    },
    getData: function getData(instance, key) {
      return mapData.get(instance, key);
    },
    removeData: function removeData(instance, key) {
      mapData.delete(instance, key);
    }
  };

  /* istanbul ignore file */
  var _Element$prototype = Element.prototype,
      matches = _Element$prototype.matches,
      closest = _Element$prototype.closest;
  var find = Element.prototype.querySelectorAll;
  var findOne = Element.prototype.querySelector;

  var createCustomEvent = function createCustomEvent(eventName, params) {
    var cEvent = new CustomEvent(eventName, params);
    return cEvent;
  };

  if (typeof window.CustomEvent !== 'function') {
    createCustomEvent = function createCustomEvent(eventName, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: null
      };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(eventName, params.bubbles, params.cancelable, params.detail);
      return evt;
    };
  }

  var workingDefaultPrevented = function () {
    var e = document.createEvent('CustomEvent');
    e.initEvent('Bootstrap', true, true);
    e.preventDefault();
    return e.defaultPrevented;
  }();

  if (!workingDefaultPrevented) {
    var origPreventDefault = Event.prototype.preventDefault;

    Event.prototype.preventDefault = function () {
      if (!this.cancelable) {
        return;
      }

      origPreventDefault.call(this);
      Object.defineProperty(this, 'defaultPrevented', {
        get: function get() {
          return true;
        },
        configurable: true
      });
    };
  } // MSEdge resets defaultPrevented flag upon dispatchEvent call if at least one listener is attached


  var defaultPreventedPreservedOnDispatch = function () {
    var e = createCustomEvent('Bootstrap', {
      cancelable: true
    });
    var element = document.createElement('div');
    element.addEventListener('Bootstrap', function () {
      return null;
    });
    e.preventDefault();
    element.dispatchEvent(e);
    return e.defaultPrevented;
  }();

  if (!matches) {
    matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

  if (!closest) {
    closest = function closest(selector) {
      var element = this;

      do {
        if (matches.call(element, selector)) {
          return element;
        }

        element = element.parentElement || element.parentNode;
      } while (element !== null && element.nodeType === 1);

      return null;
    };
  }

  var scopeSelectorRegex = /:scope\b/;

  var supportScopeQuery = function () {
    var element = document.createElement('div');

    try {
      element.querySelectorAll(':scope *');
    } catch (error) {
      return false;
    }

    return true;
  }();

  if (!supportScopeQuery) {
    find = function find(selector) {
      if (!scopeSelectorRegex.test(selector)) {
        return this.querySelectorAll(selector);
      }

      var hasId = Boolean(this.id);

      if (!hasId) {
        this.id = getUID('scope');
      }

      var nodeList = null;

      try {
        selector = selector.replace(scopeSelectorRegex, "#" + this.id);
        nodeList = this.querySelectorAll(selector);
      } finally {
        if (!hasId) {
          this.removeAttribute('id');
        }
      }

      return nodeList;
    };

    findOne = function findOne(selector) {
      if (!scopeSelectorRegex.test(selector)) {
        return this.querySelector(selector);
      }

      var matches = find.call(this, selector);

      if (typeof matches[0] !== 'undefined') {
        return matches[0];
      }

      return null;
    };
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  var stripNameRegex = /\..*/;
  var keyEventRegex = /^key/;
  var stripUidRegex = /::\d+$/;
  var eventRegistry = {}; // Events storage

  var uidEvent = 1;
  var customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };
  var nativeEvents = ['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll'];
  /**
   * ------------------------------------------------------------------------
   * Private methods
   * ------------------------------------------------------------------------
   */

  function getUidEvent(element, uid) {
    return uid && uid + "::" + uidEvent++ || element.uidEvent || uidEvent++;
  }

  function getEvent(element) {
    var uid = getUidEvent(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }

  function fixEvent(event, element) {
    // Add which for key events
    if (event.which === null && keyEventRegex.test(event.type)) {
      event.which = event.charCode === null ? event.keyCode : event.charCode;
    }

    event.delegateTarget = element;
  }

  function bootstrapHandler(element, fn) {
    return function handler(event) {
      fixEvent(event, element);

      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }

      return fn.apply(element, [event]);
    };
  }

  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      var domElements = element.querySelectorAll(selector);

      for (var target = event.target; target && target !== this; target = target.parentNode) {
        for (var i = domElements.length; i--;) {
          if (domElements[i] === target) {
            fixEvent(event, target);

            if (handler.oneOff) {
              EventHandler.off(element, event.type, fn);
            }

            return fn.apply(target, [event]);
          }
        }
      } // To please ESLint


      return null;
    };
  }

  function findHandler(events, handler, delegationSelector) {
    if (delegationSelector === void 0) {
      delegationSelector = null;
    }

    var uidEventList = Object.keys(events);

    for (var i = 0, len = uidEventList.length; i < len; i++) {
      var event = events[uidEventList[i]];

      if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
        return event;
      }
    }

    return null;
  }

  function normalizeParams(originalTypeEvent, handler, delegationFn) {
    var delegation = typeof handler === 'string';
    var originalHandler = delegation ? delegationFn : handler; // allow to get the native events from namespaced events ('click.bs.button' --> 'click')

    var typeEvent = originalTypeEvent.replace(stripNameRegex, '');
    var custom = customEvents[typeEvent];

    if (custom) {
      typeEvent = custom;
    }

    var isNative = nativeEvents.indexOf(typeEvent) > -1;

    if (!isNative) {
      typeEvent = originalTypeEvent;
    }

    return [delegation, originalHandler, typeEvent];
  }

  function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }

    if (!handler) {
      handler = delegationFn;
      delegationFn = null;
    }

    var _normalizeParams = normalizeParams(originalTypeEvent, handler, delegationFn),
        delegation = _normalizeParams[0],
        originalHandler = _normalizeParams[1],
        typeEvent = _normalizeParams[2];

    var events = getEvent(element);
    var handlers = events[typeEvent] || (events[typeEvent] = {});
    var previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

    if (previousFn) {
      previousFn.oneOff = previousFn.oneOff && oneOff;
      return;
    }

    var uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
    var fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
    fn.delegationSelector = delegation ? handler : null;
    fn.originalHandler = originalHandler;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, delegation);
  }

  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    var fn = findHandler(events[typeEvent], handler, delegationSelector);

    if (!fn) {
      return;
    }

    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }

  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    var storeElementEvent = events[typeEvent] || {};
    Object.keys(storeElementEvent).forEach(function (handlerKey) {
      if (handlerKey.indexOf(namespace) > -1) {
        var event = storeElementEvent[handlerKey];
        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
      }
    });
  }

  var EventHandler = {
    on: function on(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, false);
    },
    one: function one(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, true);
    },
    off: function off(element, originalTypeEvent, handler, delegationFn) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return;
      }

      var _normalizeParams2 = normalizeParams(originalTypeEvent, handler, delegationFn),
          delegation = _normalizeParams2[0],
          originalHandler = _normalizeParams2[1],
          typeEvent = _normalizeParams2[2];

      var inNamespace = typeEvent !== originalTypeEvent;
      var events = getEvent(element);
      var isNamespace = originalTypeEvent.charAt(0) === '.';

      if (typeof originalHandler !== 'undefined') {
        // Simplest case: handler is passed, remove that listener ONLY.
        if (!events || !events[typeEvent]) {
          return;
        }

        removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
        return;
      }

      if (isNamespace) {
        Object.keys(events).forEach(function (elementEvent) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.substr(1));
        });
      }

      var storeElementEvent = events[typeEvent] || {};
      Object.keys(storeElementEvent).forEach(function (keyHandlers) {
        var handlerKey = keyHandlers.replace(stripUidRegex, '');

        if (!inNamespace || originalTypeEvent.indexOf(handlerKey) > -1) {
          var event = storeElementEvent[keyHandlers];
          removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
        }
      });
    },
    trigger: function trigger(element, event, args) {
      if (typeof event !== 'string' || !element) {
        return null;
      }

      var typeEvent = event.replace(stripNameRegex, '');
      var inNamespace = event !== typeEvent;
      var isNative = nativeEvents.indexOf(typeEvent) > -1;
      var jQueryEvent;
      var bubbles = true;
      var nativeDispatch = true;
      var defaultPrevented = false;
      var evt = null;

      if (inNamespace && typeof jQuery !== 'undefined') {
        jQueryEvent = jQuery.Event(event, args);
        jQuery(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }

      if (isNative) {
        evt = document.createEvent('HTMLEvents');
        evt.initEvent(typeEvent, bubbles, true);
      } else {
        evt = createCustomEvent(event, {
          bubbles: bubbles,
          cancelable: true
        });
      } // merge custom informations in our event


      if (typeof args !== 'undefined') {
        Object.keys(args).forEach(function (key) {
          Object.defineProperty(evt, key, {
            get: function get() {
              return args[key];
            }
          });
        });
      }

      if (defaultPrevented) {
        evt.preventDefault();

        if (!defaultPreventedPreservedOnDispatch) {
          Object.defineProperty(evt, 'defaultPrevented', {
            get: function get() {
              return true;
            }
          });
        }
      }

      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }

      if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
        jQueryEvent.preventDefault();
      }

      return evt;
    }
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'asyncLoad';
  var VERSION = '3.0.0-alpha.9';
  var DATA_KEY = 'coreui.asyncLoad';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var PREFIX = window.CoreUIDefaults ? window.CoreUIDefaults.prefix ? window.CoreUIDefaults.prefix : 'c-' : 'c-';
  var ClassName = {
    ACTIVE: PREFIX + "active",
    NAV_DROPDOWN_TOGGLE: PREFIX + "nav-dropdown-toggle",
    NAV_PILLS: PREFIX + "nav-pills",
    NAV_TABS: PREFIX + "nav-tabs",
    OPEN: 'open',
    VIEW_SCRIPT: 'view-script'
  };
  var Event$1 = {
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
    // TODO: clean-up
    // LOAD_DATA_API: `load${EVENT_KEY}${DATA_API_KEY}`,
    XHR_STATUS: 'xhr'
  };
  var Selector = {
    // TODO: clean-up
    // HEAD: 'head',
    NAV_DROPDOWN: "." + PREFIX + "nav ." + PREFIX + "nav-dropdown",
    NAV_LINK: "." + PREFIX + "dropdown-nav-link, ." + PREFIX + "nav ." + PREFIX + "nav-link",
    NAV_ITEM: "." + PREFIX + "nav ." + PREFIX + "nav-item",
    // TODO: clean-up
    // SIDEBAT_NAV: `.${PREFIX}sidebar-nav, .${PREFIX}sidebar-nav`,
    VIEW_SCRIPT: '.view-script'
  };
  var Default = {
    defaultPage: 'main.html',
    errorPage: '404.html',
    subpagesDirectory: 'views/'
  };

  var AsyncLoad =
  /*#__PURE__*/
  function () {
    function AsyncLoad(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      var url = location.hash.replace(/^#/, ''); // eslint-disable-next-line no-negated-condition

      if (url !== '') {
        this._setUpUrl(url);
      } else {
        this._setUpUrl(this._config.defaultPage);
      }

      this._addEventListeners();
    } // Getters


    var _proto = AsyncLoad.prototype;

    // Private
    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default, config);
      return config;
    };

    _proto._loadPage = function _loadPage(url) {
      var _this = this;

      var element = this._element;
      var config = this._config;

      var loadScripts = function loadScripts(src, element) {
        if (element === void 0) {
          element = 0;
        }

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src[element];
        script.className = ClassName.VIEW_SCRIPT; // eslint-disable-next-line no-multi-assign, unicorn/prefer-add-event-listener

        script.onload = script.onreadystatechange = function () {
          if (!_this.readyState || _this.readyState === 'complete') {
            if (src.length > element + 1) {
              loadScripts(src, element + 1);
            }
          }
        };

        var body = document.getElementsByTagName('body')[0];
        body.appendChild(script);
      };

      var removeScripts = function removeScripts() {
        var oldScripts = document.querySelectorAll(Selector.VIEW_SCRIPT);

        if (oldScripts.length) {
          oldScripts.forEach(function (oldScript) {
            oldScript.remove();
          });
        }
      };

      var xhr = new XMLHttpRequest();
      xhr.open('GET', config.subpagesDirectory + url);
      var event = new CustomEvent(Event$1.XHR_STATUS, {
        detail: {
          url: url,
          status: xhr.status
        }
      });
      element.dispatchEvent(event); // eslint-disable-next-line unicorn/prefer-add-event-listener

      xhr.onload = function (result) {
        if (xhr.status === 200) {
          event = new CustomEvent(Event$1.XHR_STATUS, {
            detail: {
              url: url,
              status: xhr.status
            }
          });
          element.dispatchEvent(event);
          var wrapper = document.createElement('div');
          wrapper.innerHTML = result.target.response; // eslint-disable-next-line unicorn/prefer-spread

          var scripts = Array.from(wrapper.querySelectorAll('script')).map(function (script) {
            return script.attributes.getNamedItem('src').nodeValue;
          });
          wrapper.querySelectorAll('script').forEach(function (script) {
            return script.remove(script);
          });
          window.scrollTo(0, 0);
          element.innerHTML = '';
          element.appendChild(wrapper);
          removeScripts();

          if (scripts.length) {
            loadScripts(scripts);
          }

          window.location.hash = url;
        } else {
          window.location.href = config.errorPage;
        }
      };

      xhr.send();
    };

    _proto._setUpUrl = function _setUpUrl(url) {
      url = url.replace(/^\//, '').split('?')[0]; // eslint-disable-next-line unicorn/prefer-spread

      Array.from(document.querySelectorAll(Selector.NAV_LINK)).forEach(function (element) {
        element.classList.remove(ClassName.ACTIVE);
      }); // eslint-disable-next-line unicorn/prefer-spread

      Array.from(document.querySelectorAll(Selector.NAV_LINK)).forEach(function (element) {
        element.classList.remove(ClassName.ACTIVE);
      }); // eslint-disable-next-line unicorn/prefer-spread

      Array.from(document.querySelectorAll(Selector.NAV_DROPDOWN)).forEach(function (element) {
        element.classList.remove(ClassName.OPEN);
      }); // eslint-disable-next-line unicorn/prefer-spread

      Array.from(document.querySelectorAll(Selector.NAV_DROPDOWN)).forEach(function (element) {
        // eslint-disable-next-line unicorn/prefer-spread
        if (Array.from(element.querySelectorAll("a[href*=\"" + url + "\"]")).length > 0) {
          element.classList.add(ClassName.OPEN);
        }
      }); // eslint-disable-next-line unicorn/prefer-spread

      Array.from(document.querySelectorAll(Selector.NAV_ITEM + " a[href*=\"" + url + "\"]")).forEach(function (element) {
        element.classList.add(ClassName.ACTIVE);
      });

      this._loadPage(url);
    };

    _proto._loadBlank = function _loadBlank(url) {
      window.open(url);
    };

    _proto._loadTop = function _loadTop(url) {
      window.location = url;
    };

    _proto._update = function _update(link) {
      if (link.href !== '#') {
        if (typeof link.dataset.toggle === 'undefined' || link.dataset.toggle === 'null') {
          if (link.target === '_top') {
            this._loadTop(link.href);
          } else if (link.target === '_blank') {
            this._loadBlank(link.href);
          } else {
            this._setUpUrl(link.getAttribute('href'));
          }
        }
      }
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      EventHandler.on(document, Event$1.CLICK_DATA_API, Selector.NAV_LINK, function (event) {
        event.preventDefault();
        var link = event.target;

        if (!link.classList.contains(ClassName.NAV_LINK)) {
          link = link.closest(Selector.NAV_LINK);
        }

        if (!link.classList.contains(ClassName.NAV_DROPDOWN_TOGGLE) && link.getAttribute('href') !== '#') {
          _this2._update(link);
        }
      });
    } // Static
    ;

    AsyncLoad._asyncLoadInterface = function _asyncLoadInterface(element, config) {
      var data = Data.getData(element, DATA_KEY);

      var _config = typeof config === 'object' && config;

      if (!data) {
        data = new AsyncLoad(element, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"" + config + "\"");
        }

        data[config]();
      }
    };

    AsyncLoad._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        AsyncLoad._asyncLoadInterface(this, config);
      });
    };

    _createClass(AsyncLoad, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return AsyncLoad;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .asyncLoad to jQuery only if jQuery is present
   */


  if (typeof jQuery !== 'undefined') {
    var JQUERY_NO_CONFLICT = jQuery.fn[NAME];
    jQuery.fn[NAME] = AsyncLoad._jQueryInterface;
    jQuery.fn[NAME].Constructor = AsyncLoad;

    jQuery.fn[NAME].noConflict = function () {
      jQuery.fn[NAME] = JQUERY_NO_CONFLICT;
      return AsyncLoad._jQueryInterface;
    };
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): dom/selectorEngine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NODE_TEXT = 3;
  var SelectorEngine = {
    matches: function matches$1(element, selector) {
      return matches.call(element, selector);
    },
    find: function find$1(selector, element) {
      if (element === void 0) {
        element = document.documentElement;
      }

      if (typeof selector !== 'string') {
        return null;
      }

      return find.call(element, selector);
    },
    findOne: function findOne$1(selector, element) {
      if (element === void 0) {
        element = document.documentElement;
      }

      if (typeof selector !== 'string') {
        return null;
      }

      return findOne.call(element, selector);
    },
    children: function children(element, selector) {
      var _this = this;

      if (typeof selector !== 'string') {
        return null;
      }

      var children = makeArray(element.children);
      return children.filter(function (child) {
        return _this.matches(child, selector);
      });
    },
    parents: function parents(element, selector) {
      if (typeof selector !== 'string') {
        return null;
      }

      var parents = [];
      var ancestor = element.parentNode;

      while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
        if (this.matches(ancestor, selector)) {
          parents.push(ancestor);
        }

        ancestor = ancestor.parentNode;
      }

      return parents;
    },
    closest: function closest$1(element, selector) {
      if (typeof selector !== 'string') {
        return null;
      }

      return closest.call(element, selector);
    },
    prev: function prev(element, selector) {
      if (typeof selector !== 'string') {
        return null;
      }

      var siblings = [];
      var previous = element.previousSibling;

      while (previous && previous.nodeType === Node.ELEMENT_NODE && previous.nodeType !== NODE_TEXT) {
        if (this.matches(previous, selector)) {
          siblings.push(previous);
        }

        previous = previous.previousSibling;
      }

      return siblings;
    }
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$1 = 'alert';
  var VERSION$1 = '3.0.0-alpha.9';
  var DATA_KEY$1 = 'coreui.alert';
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var DATA_API_KEY$1 = '.data-api';
  var PREFIX$1 = window.CoreUIDefaults ? window.CoreUIDefaults.prefix ? window.CoreUIDefaults.prefix : 'c-' : 'c-';
  var Selector$1 = {
    DISMISS: '[data-dismiss="alert"]'
  };
  var Event$2 = {
    CLOSE: "close" + EVENT_KEY$1,
    CLOSED: "closed" + EVENT_KEY$1,
    CLICK_DATA_API: "click" + EVENT_KEY$1 + DATA_API_KEY$1
  };
  var ClassName$1 = {
    ALERT: PREFIX$1 + "alert",
    FADE: PREFIX$1 + "fade",
    SHOW: PREFIX$1 + "show"
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Alert =
  /*#__PURE__*/
  function () {
    function Alert(element) {
      this._element = element;

      if (this._element) {
        Data.setData(element, DATA_KEY$1, this);
      }
    } // Getters


    var _proto = Alert.prototype;

    // Public
    _proto.close = function close(element) {
      var rootElement = this._element;

      if (element) {
        rootElement = this._getRootElement(element);
      }

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent === null || customEvent.defaultPrevented) {
        return;
      }

      this._removeElement(rootElement);
    };

    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$1);
      this._element = null;
    } // Private
    ;

    _proto._getRootElement = function _getRootElement(element) {
      var selector = getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = SelectorEngine.findOne(selector);
      }

      if (!parent) {
        parent = SelectorEngine.closest(element, "." + ClassName$1.ALERT);
      }

      return parent;
    };

    _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
      return EventHandler.trigger(element, Event$2.CLOSE);
    };

    _proto._removeElement = function _removeElement(element) {
      var _this = this;

      element.classList.remove(ClassName$1.SHOW);

      if (!element.classList.contains(ClassName$1.FADE)) {
        this._destroyElement(element);

        return;
      }

      var transitionDuration = getTransitionDurationFromElement(element);
      EventHandler.one(element, TRANSITION_END, function (event) {
        return _this._destroyElement(element, event);
      });
      emulateTransitionEnd(element, transitionDuration);
    };

    _proto._destroyElement = function _destroyElement(element) {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }

      EventHandler.trigger(element, Event$2.CLOSED);
    } // Static
    ;

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$1);

        if (!data) {
          data = new Alert(this);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    Alert._getInstance = function _getInstance(element) {
      return Data.getData(element, DATA_KEY$1);
    };

    _createClass(Alert, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$1;
      }
    }]);

    return Alert;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, Event$2.CLICK_DATA_API, Selector$1.DISMISS, Alert._handleDismiss(new Alert()));
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .alert to jQuery only if jQuery is present
   */

  if (typeof jQuery !== 'undefined') {
    var JQUERY_NO_CONFLICT$1 = jQuery.fn[NAME$1];
    jQuery.fn[NAME$1] = Alert._jQueryInterface;
    jQuery.fn[NAME$1].Constructor = Alert;

    jQuery.fn[NAME$1].noConflict = function () {
      jQuery.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
      return Alert._jQueryInterface;
    };
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$2 = 'button';
  var VERSION$2 = '3.0.0-alpha.9';
  var DATA_KEY$2 = 'coreui.button';
  var EVENT_KEY$2 = "." + DATA_KEY$2;
  var DATA_API_KEY$2 = '.data-api';
  var PREFIX$2 = window.CoreUIDefaults ? window.CoreUIDefaults.prefix ? window.CoreUIDefaults.prefix : 'c-' : 'c-';
  var ClassName$2 = {
    ACTIVE: PREFIX$2 + "active",
    BUTTON: PREFIX$2 + "btn",
    FOCUS: 'focus'
  };
  var Selector$2 = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input:not([type="hidden"])',
    ACTIVE: "." + PREFIX$2 + "active",
    BUTTON: "." + PREFIX$2 + "btn"
  };
  var Event$3 = {
    CLICK_DATA_API: "click" + EVENT_KEY$2 + DATA_API_KEY$2,
    FOCUS_DATA_API: "focus" + EVENT_KEY$2 + DATA_API_KEY$2,
    BLUR_DATA_API: "blur" + EVENT_KEY$2 + DATA_API_KEY$2
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Button =
  /*#__PURE__*/
  function () {
    function Button(element) {
      this._element = element;
      Data.setData(element, DATA_KEY$2, this);
    } // Getters


    var _proto = Button.prototype;

    // Public
    _proto.toggle = function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = SelectorEngine.closest(this._element, Selector$2.DATA_TOGGLE);

      if (rootElement) {
        var input = SelectorEngine.findOne(Selector$2.INPUT, this._element);

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && this._element.classList.contains(ClassName$2.ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = SelectorEngine.findOne(Selector$2.ACTIVE, rootElement);

              if (activeElement) {
                activeElement.classList.remove(ClassName$2.ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
              return;
            }

            input.checked = !this._element.classList.contains(ClassName$2.ACTIVE);
            EventHandler.trigger(input, 'change');
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (addAriaPressed) {
        this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName$2.ACTIVE));
      }

      if (triggerChangeEvent) {
        this._element.classList.toggle(ClassName$2.ACTIVE);
      }
    };

    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$2);
      this._element = null;
    } // Static
    ;

    Button._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$2);

        if (!data) {
          data = new Button(this);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    Button._getInstance = function _getInstance(element) {
      return Data.getData(element, DATA_KEY$2);
    };

    _createClass(Button, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$2;
      }
    }]);

    return Button;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, Event$3.CLICK_DATA_API, Selector$2.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();
    var button = event.target;

    if (!button.classList.contains(ClassName$2.BUTTON)) {
      button = SelectorEngine.closest(button, Selector$2.BUTTON);
    }

    var data = Data.getData(button, DATA_KEY$2);

    if (!data) {
      data = new Button(button);
      Data.setData(button, DATA_KEY$2, data);
    }

    data.toggle();
  });
  EventHandler.on(document, Event$3.FOCUS_DATA_API, Selector$2.DATA_TOGGLE_CARROT, function (event) {
    var button = SelectorEngine.closest(event.target, Selector$2.BUTTON);

    if (button) {
      button.classList.add(ClassName$2.FOCUS);
    }
  });
  EventHandler.on(document, Event$3.BLUR_DATA_API, Selector$2.DATA_TOGGLE_CARROT, function (event) {
    var button = SelectorEngine.closest(event.target, Selector$2.BUTTON);

    if (button) {
      button.classList.remove(ClassName$2.FOCUS);
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .button to jQuery only if jQuery is present
   */

  if (typeof jQuery !== 'undefined') {
    var JQUERY_NO_CONFLICT$2 = jQuery.fn[NAME$2];
    jQuery.fn[NAME$2] = Button._jQueryInterface;
    jQuery.fn[NAME$2].Constructor = Button;

    jQuery.fn[NAME$2].noConflict = function () {
      jQuery.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
      return Button._jQueryInterface;
    };
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  function normalizeData(val) {
    if (val === 'true') {
      return true;
    }

    if (val === 'false') {
      return false;
    }

    if (val === Number(val).toString()) {
      return Number(val);
    }

    if (val === '' || val === 'null') {
      return null;
    }

    return val;
  }

  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, function (chr) {
      return chr.toLowerCase();
    });
  }

  var Manipulator = {
    setDataAttribute: function setDataAttribute(element, key, value) {
      element.setAttribute("data-" + normalizeDataKey(key), value);
    },
    removeDataAttribute: function removeDataAttribute(element, key) {
      element.removeAttribute("data-" + normalizeDataKey(key));
    },
    getDataAttributes: function getDataAttributes(element) {
      if (!element) {
        return {};
      }

      var attributes = _objectSpread({}, element.dataset);

      Object.keys(attributes).forEach(function (key) {
        attributes[key] = normalizeData(attributes[key]);
      });
      return attributes;
    },
    getDataAttribute: function getDataAttribute(element, key) {
      return normalizeData(element.getAttribute("data-" + normalizeDataKey(key)));
    },
    offset: function offset(element) {
      var rect = element.getBoundingClientRect();
      return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
      };
    },
    position: function position(element) {
      return {
        top: element.offsetTop,
        left: element.offsetLeft
      };
    },
    toggleClass: function toggleClass(element, className) {
      if (!element) {
        return;
      }

      if (element.classList.contains(className)) {
        element.classList.remove(className);
      } else {
        element.classList.add(className);
      }
    }
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$3 = 'carousel';
  var VERSION$3 = '3.0.0-alpha.9';
  var DATA_KEY$3 = 'coreui.carousel';
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var DATA_API_KEY$3 = '.data-api';
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var PREFIX$3 = window.CoreUIDefaults ? window.CoreUIDefaults.prefix ? window.CoreUIDefaults.prefix : 'c-' : 'c-';
  var Default$1 = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };
  var Event$4 = {
    SLIDE: "slide" + EVENT_KEY$3,
    SLID: "slid" + EVENT_KEY$3,
    KEYDOWN: "keydown" + EVENT_KEY$3,
    MOUSEENTER: "mouseenter" + EVENT_KEY$3,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$3,
    TOUCHSTART: "touchstart" + EVENT_KEY$3,
    TOUCHMOVE: "touchmove" + EVENT_KEY$3,
    TOUCHEND: "touchend" + EVENT_KEY$3,
    POINTERDOWN: "pointerdown" + EVENT_KEY$3,
    POINTERUP: "pointerup" + EVENT_KEY$3,
    DRAG_START: "dragstart" + EVENT_KEY$3,
    LOAD_DATA_API: "load" + EVENT_KEY$3 + DATA_API_KEY$3,
    CLICK_DATA_API: "click" + EVENT_KEY$3 + DATA_API_KEY$3
  };
  var ClassName$3 = {
    CAROUSEL: PREFIX$3 + "carousel",
    ACTIVE: PREFIX$3 + "active",
    SLIDE: 'slide',
    RIGHT: PREFIX$3 + "carousel-item-right",
    LEFT: PREFIX$3 + "carousel-item-left",
    NEXT: PREFIX$3 + "carousel-item-next",
    PREV: PREFIX$3 + "carousel-item-prev",
    ITEM: PREFIX$3 + "carousel-item",
    POINTER_EVENT: PREFIX$3 + "pointer-event"
  };
  var Selector$3 = {
    ACTIVE: "." + PREFIX$3 + "active",
    ACTIVE_ITEM: "." + PREFIX$3 + "active." + PREFIX$3 + "carousel-item",
    ITEM: "." + PREFIX$3 + "carousel-item",
    ITEM_IMG: "." + PREFIX$3 + "carousel-item img",
    NEXT_PREV: "." + PREFIX$3 + "carousel-item-next, ." + PREFIX$3 + "carousel-item-prev",
    INDICATORS: "." + PREFIX$3 + "carousel-indicators",
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
  };
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Carousel =
  /*#__PURE__*/
  function () {
    function Carousel(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._element = element;
      this._indicatorsElement = SelectorEngine.findOne(Selector$3.INDICATORS, this._element);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

      this._addEventListeners();

      Data.setData(element, DATA_KEY$3, this);
    } // Getters


    var _proto = Carousel.prototype;

    // Public
    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(Direction.NEXT);
      }
    };

    _proto.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && isVisible(this._element)) {
        this.next();
      }
    };

    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(Direction.PREV);
      }
    };

    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (SelectorEngine.findOne(Selector$3.NEXT_PREV, this._element)) {
        triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config && this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    _proto.to = function to(index) {
      var _this = this;

      this._activeElement = SelectorEngine.findOne(Selector$3.ACTIVE_ITEM, this._element);

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        EventHandler.one(this._element, Event$4.SLID, function () {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

      this._slide(direction, this._items[index]);
    };

    _proto.dispose = function dispose() {
      EventHandler.off(this._element, EVENT_KEY$3);
      Data.removeData(this._element, DATA_KEY$3);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$1, config);
      typeCheckConfig(NAME$3, config, DefaultType);
      return config;
    };

    _proto._handleSwipe = function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }

      var direction = absDeltax / this.touchDeltaX;
      this.touchDeltaX = 0; // swipe left

      if (direction > 0) {
        this.prev();
      } // swipe right


      if (direction < 0) {
        this.next();
      }
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        EventHandler.on(this._element, Event$4.KEYDOWN, function (event) {
          return _this2._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        EventHandler.on(this._element, Event$4.MOUSEENTER, function (event) {
          return _this2.pause(event);
        });
        EventHandler.on(this._element, Event$4.MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        });
      }

      if (this._config.touch) {
        this._addTouchEventListeners();
      }
    };

    _proto._addTouchEventListeners = function _addTouchEventListeners() {
      var _this3 = this;

      if (!this._touchSupported) {
        return;
      }

      var start = function start(event) {
        if (_this3._pointerEvent && PointerType[event.pointerType.toUpperCase()]) {
          _this3.touchStartX = event.clientX;
        } else if (!_this3._pointerEvent) {
          _this3.touchStartX = event.touches[0].clientX;
        }
      };

      var move = function move(event) {
        // ensure swiping with one touch and not pinching
        if (event.touches && event.touches.length > 1) {
          _this3.touchDeltaX = 0;
        } else {
          _this3.touchDeltaX = event.touches[0].clientX - _this3.touchStartX;
        }
      };

      var end = function end(event) {
        if (_this3._pointerEvent && PointerType[event.pointerType.toUpperCase()]) {
          _this3.touchDeltaX = event.clientX - _this3.touchStartX;
        }

        _this3._handleSwipe();

        if (_this3._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          _this3.pause();

          if (_this3.touchTimeout) {
            clearTimeout(_this3.touchTimeout);
          }

          _this3.touchTimeout = setTimeout(function (event) {
            return _this3.cycle(event);
          }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
        }
      };

      makeArray(SelectorEngine.find(Selector$3.ITEM_IMG, this._element)).forEach(function (itemImg) {
        EventHandler.on(itemImg, Event$4.DRAG_START, function (e) {
          return e.preventDefault();
        });
      });

      if (this._pointerEvent) {
        EventHandler.on(this._element, Event$4.POINTERDOWN, function (event) {
          return start(event);
        });
        EventHandler.on(this._element, Event$4.POINTERUP, function (event) {
          return end(event);
        });

        this._element.classList.add(ClassName$3.POINTER_EVENT);
      } else {
        EventHandler.on(this._element, Event$4.TOUCHSTART, function (event) {
          return start(event);
        });
        EventHandler.on(this._element, Event$4.TOUCHMOVE, function (event) {
          return move(event);
        });
        EventHandler.on(this._element, Event$4.TOUCHEND, function (event) {
          return end(event);
        });
      }
    };

    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;

        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;

        default:
      }
    };

    _proto._getItemIndex = function _getItemIndex(element) {
      this._items = element && element.parentNode ? makeArray(SelectorEngine.find(Selector$3.ITEM, element.parentNode)) : [];
      return this._items.indexOf(element);
    };

    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === Direction.NEXT;
      var isPrevDirection = direction === Direction.PREV;

      var activeIndex = this._getItemIndex(activeElement);

      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === Direction.PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex(SelectorEngine.findOne(Selector$3.ACTIVE_ITEM, this._element));

      return EventHandler.trigger(this._element, Event$4.SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
    };

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        var indicators = SelectorEngine.find(Selector$3.ACTIVE, this._indicatorsElement);

        for (var i = 0; i < indicators.length; i++) {
          indicators[i].classList.remove(ClassName$3.ACTIVE);
        }

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          nextIndicator.classList.add(ClassName$3.ACTIVE);
        }
      }
    };

    _proto._slide = function _slide(direction, element) {
      var _this4 = this;

      var activeElement = SelectorEngine.findOne(Selector$3.ACTIVE_ITEM, this._element);

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName$3.LEFT;
        orderClassName = ClassName$3.NEXT;
        eventDirectionName = Direction.LEFT;
      } else {
        directionalClassName = ClassName$3.RIGHT;
        orderClassName = ClassName$3.PREV;
        eventDirectionName = Direction.RIGHT;
      }

      if (nextElement && nextElement.classList.contains(ClassName$3.ACTIVE)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.defaultPrevented) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      if (this._element.classList.contains(ClassName$3.SLIDE)) {
        nextElement.classList.add(orderClassName);
        reflow(nextElement);
        activeElement.classList.add(directionalClassName);
        nextElement.classList.add(directionalClassName);
        var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

        if (nextElementInterval) {
          this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
          this._config.interval = nextElementInterval;
        } else {
          this._config.interval = this._config.defaultInterval || this._config.interval;
        }

        var transitionDuration = getTransitionDurationFromElement(activeElement);
        EventHandler.one(activeElement, TRANSITION_END, function () {
          nextElement.classList.remove(directionalClassName);
          nextElement.classList.remove(orderClassName);
          nextElement.classList.add(ClassName$3.ACTIVE);
          activeElement.classList.remove(ClassName$3.ACTIVE);
          activeElement.classList.remove(orderClassName);
          activeElement.classList.remove(directionalClassName);
          _this4._isSliding = false;
          setTimeout(function () {
            EventHandler.trigger(_this4._element, Event$4.SLID, {
              relatedTarget: nextElement,
              direction: eventDirectionName,
              from: activeElementIndex,
              to: nextElementIndex
            });
          }, 0);
        });
        emulateTransitionEnd(activeElement, transitionDuration);
      } else {
        activeElement.classList.remove(ClassName$3.ACTIVE);
        nextElement.classList.add(ClassName$3.ACTIVE);
        this._isSliding = false;
        EventHandler.trigger(this._element, Event$4.SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });
      }

      if (isCycling) {
        this.cycle();
      }
    } // Static
    ;

    Carousel._carouselInterface = function _carouselInterface(element, config) {
      var data = Data.getData(element, DATA_KEY$3);

      var _config = _objectSpread({}, Default$1, Manipulator.getDataAttributes(element));

      if (typeof config === 'object') {
        _config = _objectSpread({}, _config, config);
      }

      var action = typeof config === 'string' ? config : _config.slide;

      if (!data) {
        data = new Carousel(element, _config);
      }

      if (typeof config === 'number') {
        data.to(config);
      } else if (typeof action === 'string') {
        if (typeof data[action] === 'undefined') {
          throw new TypeError("No method named \"" + action + "\"");
        }

        data[action]();
      } else if (_config.interval && _config.ride) {
        data.pause();
        data.cycle();
      }
    };

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        Carousel._carouselInterface(this, config);
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = SelectorEngine.findOne(selector);

      if (!target || !target.classList.contains(ClassName$3.CAROUSEL)) {
        return;
      }

      var config = _objectSpread({}, Manipulator.getDataAttributes(target), Manipulator.getDataAttributes(this));

      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._carouselInterface(target, config);

      if (slideIndex) {
        Data.getData(target, DATA_KEY$3).to(slideIndex);
      }

      event.preventDefault();
    };

    Carousel._getInstance = function _getInstance(element) {
      return Data.getData(element, DATA_KEY$3);
    };

    _createClass(Carousel, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$3;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$1;
      }
    }]);

    return Carousel;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, Event$4.CLICK_DATA_API, Selector$3.DATA_SLIDE, Carousel._dataApiClickHandler);
  EventHandler.on(window, Event$4.LOAD_DATA_API, function () {
    var carousels = makeArray(SelectorEngine.find(Selector$3.DATA_RIDE));

    for (var i = 0, len = carousels.length; i < len; i++) {
      Carousel._carouselInterface(carousels[i], Data.getData(carousels[i], DATA_KEY$3));
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .carousel to jQuery only if jQuery is present
   */

  if (typeof jQuery !== 'undefined') {
    var JQUERY_NO_CONFLICT$3 = jQuery.fn[NAME$3];
    jQuery.fn[NAME$3] = Carousel._jQueryInterface;
    jQuery.fn[NAME$3].Constructor = Carousel;

    jQuery.fn[NAME$3].noConflict = function () {
      jQuery.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
      return Carousel._jQueryInterface;
    };
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$4 = 'class-toggler';
  var VERSION$4 = '3.0.0-alpha.9';
  var DATA_KEY$4 = 'coreui.class-toggler';
  var EVENT_KEY$4 = "." + DATA_KEY$4;
  var DATA_API_KEY$4 = '.data-api';
  var PREFIX$4 = window.CoreUIDefaults ? window.CoreUIDefaults.prefix ? window.CoreUIDefaults.prefix : 'c-' : 'c-';
  var Default$2 = {
    breakpoints: '-sm,-md,-lg,-xl',
    postfix: '-show',
    responsive: false,
    target: 'body'
  };
  var ClassName$4 = {
    CLASS_TOGGLER: PREFIX$4 + "class-toggler"
  };
  var Event$5 = {
    CLASS_TOGGLE: 'classtoggle',
    CLICK_DATA_API: "click" + EVENT_KEY$4 + DATA_API_KEY$4
  };
  var Selector$4 = {
    CLASS_TOGGLER: "." + PREFIX$4 + "class-toggler"
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var ClassToggler =
  /*#__PURE__*/
  function () {
    function ClassToggler(element) {
      this._element = element;
    } // Getters


    var _proto = ClassToggler.prototype;

    // Public
    _proto.toggle = function toggle() {
      var _this = this;

      this._getElementDataAttributes(this._element).forEach(function (dataAttributes) {
        var element;
        var target = dataAttributes.target,
            toggle = dataAttributes.toggle;

        if (target === '_parent' || target === 'parent') {
          element = _this._element.parentNode;
        } else {
          element = document.querySelector(target);
        }

        toggle.forEach(function (object) {
          var className = object.className,
              responsive = object.responsive,
              postfix = object.postfix;
          var breakpoints = typeof object.breakpoints === 'undefined' || object.breakpoints === null ? null : _this._arrayFromString(object.breakpoints); // eslint-disable-next-line no-negated-condition

          if (!responsive) {
            element.classList.toggle(className);
            var event = new CustomEvent(Event$5.CLASS_TOGGLE, {
              detail: {
                target: target,
                className: className
              }
            });
            element.dispatchEvent(event);
          } else {
            var currentBreakpoint;
            breakpoints.forEach(function (breakpoint) {
              if (className.includes(breakpoint)) {
                currentBreakpoint = breakpoint;
              }
            });
            var responsiveClassNames = [];

            if (typeof currentBreakpoint === 'undefined') {
              responsiveClassNames.push(className);
            } else {
              responsiveClassNames.push(className.replace("" + currentBreakpoint + postfix, postfix));
              breakpoints.splice(0, breakpoints.indexOf(currentBreakpoint) + 1).forEach(function (breakpoint) {
                responsiveClassNames.push(className.replace("" + currentBreakpoint + postfix, "" + breakpoint + postfix));
              });
            }

            var addResponsiveClasses = false;
            responsiveClassNames.forEach(function (responsiveClassName) {
              if (element.classList.contains(responsiveClassName)) {
                addResponsiveClasses = true;
              }
            });

            if (addResponsiveClasses) {
              responsiveClassNames.forEach(function (responsiveClassName) {
                element.classList.remove(responsiveClassName);
                var event = new CustomEvent(Event$5.CLASS_TOGGLE, {
                  detail: {
                    target: target,
                    className: responsiveClassName
                  }
                });
                element.dispatchEvent(event);
              });
            } else {
              element.classList.add(className);

              var _event = new CustomEvent(Event$5.CLASS_TOGGLE, {
                detail: {
                  target: target,
                  className: className
                }
              });

              element.dispatchEvent(_event);
            }
          }
        });
      });
    } // Private
    ;

    _proto._arrayFromString = function _arrayFromString(string) {
      return string.replace(/ /g, '').split(',');
    };

    _proto._isArray = function _isArray(array) {
      try {
        JSON.parse(array.replace(/'/g, '"'));
        return true;
      } catch (_unused) {
        return false;
      }
    };

    _proto._convertToArray = function _convertToArray(array) {
      return JSON.parse(array.replace(/'/g, '"'));
    };

    _proto._getDataAttributes = function _getDataAttributes(data, attribute) {
      var dataAttribute = data[attribute];
      return this._isArray(dataAttribute) ? this._convertToArray(dataAttribute) : dataAttribute;
    };

    _proto._getToggleDetails = function _getToggleDetails(classNames, responsive, breakpoints, postfix) {
      var ToggleDetails = function ToggleDetails(className, responsive, breakpoints, postfix) {
        if (responsive === void 0) {
          responsive = Default$2.responsive;
        }

        this.className = className;
        this.responsive = responsive;
        this.breakpoints = breakpoints;
        this.postfix = postfix;
      };

      var toggle = [];

      if (Array.isArray(classNames)) {
        classNames.forEach(function (className, index) {
          responsive = Array.isArray(responsive) ? responsive[index] : responsive;
          breakpoints = responsive ? Array.isArray(breakpoints) ? breakpoints[index] : breakpoints : null;
          postfix = responsive ? Array.isArray(postfix) ? postfix[index] : postfix : null;
          toggle.push(new ToggleDetails(className, responsive, breakpoints, postfix));
        });
      } else {
        breakpoints = responsive ? breakpoints : null;
        postfix = responsive ? postfix : null;
        toggle.push(new ToggleDetails(classNames, responsive, breakpoints, postfix));
      }

      return toggle;
    };

    _proto._ifArray = function _ifArray(array, index) {
      return Array.isArray(array) ? array[index] : array;
    };

    _proto._getElementDataAttributes = function _getElementDataAttributes(element) {
      var _this2 = this;

      var data = element.dataset;
      var targets = typeof data.target === 'undefined' ? Default$2.target : this._getDataAttributes(data, 'target');
      var classNames = typeof data.class === 'undefined' ? 'undefined' : this._getDataAttributes(data, 'class');
      var responsive = typeof data.responsive === 'undefined' ? Default$2.responsive : this._getDataAttributes(data, 'responsive');
      var breakpoints = typeof data.breakpoints === 'undefined' ? Default$2.breakpoints : this._getDataAttributes(data, 'breakpoints');
      var postfix = typeof data.postfix === 'undefined' ? Default$2.postfix : this._getDataAttributes(data, 'postfix');
      var toggle = [];

      var TargetDetails = function TargetDetails(target, toggle) {
        this.target = target;
        this.toggle = toggle;
      };

      if (Array.isArray(targets)) {
        targets.forEach(function (target, index) {
          toggle.push(new TargetDetails(target, _this2._getToggleDetails(_this2._ifArray(classNames, index), _this2._ifArray(responsive, index), _this2._ifArray(breakpoints, index), _this2._ifArray(postfix, index))));
        });
      } else {
        toggle.push(new TargetDetails(targets, this._getToggleDetails(classNames, responsive, breakpoints, postfix)));
      }

      return toggle;
    } // Static
    ;

    ClassToggler._classTogglerInterface = function _classTogglerInterface(element, config) {
      var data = Data.getData(element, DATA_KEY$4);

      var _config = typeof config === 'object' && config;

      if (!data) {
        data = new ClassToggler(element, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"" + config + "\"");
        }

        data[config]();
      }
    };

    ClassToggler._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        ClassToggler._classTogglerInterface(this, config);
      });
    };

    _createClass(ClassToggler, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$4;
      }
    }]);

    return ClassToggler;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, Event$5.CLICK_DATA_API, Selector$4.CLASS_TOGGLER, function (event) {
    event.preventDefault();
    var toggler = event.target;

    if (!toggler.classList.contains(ClassName$4.CLASS_TOGGLER)) {
      toggler = toggler.closest(Selector$4.CLASS_TOGGLER);
    }

    ClassToggler._classTogglerInterface(toggler, 'toggle');
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .${PREFIX}class-toggler to jQuery only if jQuery is present
   */

  if (typeof jQuery !== 'undefined') {
    var JQUERY_NO_CONFLICT$4 = jQuery.fn[NAME$4];
    jQuery.fn[NAME$4] = ClassToggler._jQueryInterface;
    jQuery.fn[NAME$4].Constructor = ClassToggler;

    jQuery.fn[NAME$4].noConflict = function () {
      jQuery.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
      return ClassToggler._jQueryInterface;
    };
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$5 = 'collapse';
  var VERSION$5 = '3.0.0-alpha.9';
  var DATA_KEY$5 = 'coreui.collapse';
  var EVENT_KEY$5 = "." + DATA_KEY$5;
  var DATA_API_KEY$5 = '.data-api';
  var PREFIX$5 = window.CoreUIDefaults ? window.CoreUIDefaults.prefix ? window.CoreUIDefaults.prefix : 'c-' : 'c-';
  var Default$3 = {
    toggle: true,
    parent: ''
  };
  var DefaultType$1 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var Event$6 = {
    SHOW: "show" + EVENT_KEY$5,
    SHOWN: "shown" + EVENT_KEY$5,
    HIDE: "hide" + EVENT_KEY$5,
    HIDDEN: "hidden" + EVENT_KEY$5,
    CLICK_DATA_API: "click" + EVENT_KEY$5 + DATA_API_KEY$5
  };
  var ClassName$5 = {
    SHOW: PREFIX$5 + "show",
    COLLAPSE: PREFIX$5 + "collapse",
    COLLAPSING: PREFIX$5 + "collapsing",
    COLLAPSED: PREFIX$5 + "collapsed"
  };
  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };
  var Selector$5 = {
    ACTIVES: "." + PREFIX$5 + "show, ." + PREFIX$5 + "collapsing",
    DATA_TOGGLE: "[data-toggle=\"" + PREFIX$5 + "collapse\"]"
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Collapse =
  /*#__PURE__*/
  function () {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = makeArray(SelectorEngine.find("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
      var toggleList = makeArray(SelectorEngine.find(Selector$5.DATA_TOGGLE));

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = getSelectorFromElement(elem);
        var filterElement = makeArray(SelectorEngine.find(selector)).filter(function (foundElem) {
          return foundElem === element;
        });

        if (selector !== null && filterElement.length) {
          this._selector = selector;

          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }

      Data.setData(element, DATA_KEY$5, this);
    } // Getters


    var _proto = Collapse.prototype;

    // Public
    _proto.toggle = function toggle() {
      if (this._element.classList.contains(ClassName$5.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || this._element.classList.contains(ClassName$5.SHOW)) {
        return;
      }

      var actives;
      var activesData;

      if (this._parent) {
        actives = makeArray(SelectorEngine.find(Selector$5.ACTIVES, this._parent)).filter(function (elem) {
          if (typeof _this._config.parent === 'string') {
            return elem.getAttribute('data-parent') === _this._config.parent;
          }

          return elem.classList.contains(ClassName$5.COLLAPSE);
        });

        if (actives.length === 0) {
          actives = null;
        }
      }

      var container = SelectorEngine.findOne(this._selector);

      if (actives) {
        var tempActiveData = actives.filter(function (elem) {
          return container !== elem;
        });
        activesData = tempActiveData[0] ? Data.getData(tempActiveData[0], DATA_KEY$5) : null;

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = EventHandler.trigger(this._element, Event$6.SHOW);

      if (startEvent.defaultPrevented) {
        return;
      }

      if (actives) {
        actives.forEach(function (elemActive) {
          if (container !== elemActive) {
            Collapse._collapseInterface(elemActive, 'hide');
          }

          if (!activesData) {
            Data.setData(elemActive, DATA_KEY$5, null);
          }
        });
      }

      var dimension = this._getDimension();

      this._element.classList.remove(ClassName$5.COLLAPSE);

      this._element.classList.add(ClassName$5.COLLAPSING);

      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        this._triggerArray.forEach(function (element) {
          element.classList.remove(ClassName$5.COLLAPSED);
          element.setAttribute('aria-expanded', true);
        });
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this._element.classList.remove(ClassName$5.COLLAPSING);

        _this._element.classList.add(ClassName$5.COLLAPSE);

        _this._element.classList.add(ClassName$5.SHOW);

        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        EventHandler.trigger(_this._element, Event$6.SHOWN);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = getTransitionDurationFromElement(this._element);
      EventHandler.one(this._element, TRANSITION_END, complete);
      emulateTransitionEnd(this._element, transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !this._element.classList.contains(ClassName$5.SHOW)) {
        return;
      }

      var startEvent = EventHandler.trigger(this._element, Event$6.HIDE);

      if (startEvent.defaultPrevented) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      reflow(this._element);

      this._element.classList.add(ClassName$5.COLLAPSING);

      this._element.classList.remove(ClassName$5.COLLAPSE);

      this._element.classList.remove(ClassName$5.SHOW);

      var triggerArrayLength = this._triggerArray.length;

      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var selector = getSelectorFromElement(trigger);

          if (selector !== null) {
            var elem = SelectorEngine.findOne(selector);

            if (!elem.classList.contains(ClassName$5.SHOW)) {
              trigger.classList.add(ClassName$5.COLLAPSED);
              trigger.setAttribute('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);

        _this2._element.classList.remove(ClassName$5.COLLAPSING);

        _this2._element.classList.add(ClassName$5.COLLAPSE);

        EventHandler.trigger(_this2._element, Event$6.HIDDEN);
      };

      this._element.style[dimension] = '';
      var transitionDuration = getTransitionDurationFromElement(this._element);
      EventHandler.one(this._element, TRANSITION_END, complete);
      emulateTransitionEnd(this._element, transitionDuration);
    };

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$5);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$3, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      typeCheckConfig(NAME$5, config, DefaultType$1);
      return config;
    };

    _proto._getDimension = function _getDimension() {
      var hasWidth = this._element.classList.contains(Dimension.WIDTH);

      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    _proto._getParent = function _getParent() {
      var _this3 = this;

      var parent = this._config.parent;

      if (isElement(parent)) {
        // it's a jQuery object
        if (typeof parent.jquery !== 'undefined' || typeof parent[0] !== 'undefined') {
          parent = parent[0];
        }
      } else {
        parent = SelectorEngine.findOne(parent);
      }

      var selector = "[data-toggle=\"collapse\"][data-parent=\"" + parent + "\"]";
      makeArray(SelectorEngine.find(selector, parent)).forEach(function (element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });
      return parent;
    };

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      if (element) {
        var isOpen = element.classList.contains(ClassName$5.SHOW);

        if (triggerArray.length) {
          triggerArray.forEach(function (elem) {
            if (isOpen) {
              elem.classList.remove(ClassName$5.COLLAPSED);
            } else {
              elem.classList.add(ClassName$5.COLLAPSED);
            }

            elem.setAttribute('aria-expanded', isOpen);
          });
        }
      }
    } // Static
    ;

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = getSelectorFromElement(element);
      return selector ? SelectorEngine.findOne(selector) : null;
    };

    Collapse._collapseInterface = function _collapseInterface(element, config) {
      var data = Data.getData(element, DATA_KEY$5);

      var _config = _objectSpread({}, Default$3, Manipulator.getDataAttributes(element), typeof config === 'object' && config ? config : {});

      if (!data && _config.toggle && /show|hide/.test(config)) {
        _config.toggle = false;
      }

      if (!data) {
        data = new Collapse(element, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"" + config + "\"");
        }

        data[config]();
      }
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        Collapse._collapseInterface(this, config);
      });
    };

    Collapse._getInstance = function _getInstance(element) {
      return Data.getData(element, DATA_KEY$5);
    };

    _createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$5;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$3;
      }
    }]);

    return Collapse;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, Event$6.CLICK_DATA_API, Selector$5.DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.target.tagName === 'A') {
      event.preventDefault();
    }

    var triggerData = Manipulator.getDataAttributes(this);
    var selector = getSelectorFromElement(this);
    var selectorElements = makeArray(SelectorEngine.find(selector));
    selectorElements.forEach(function (element) {
      var data = Data.getData(element, DATA_KEY$5);
      var config;

      if (data) {
        // update parent attribute
        if (data._parent === null && typeof triggerData.parent === 'string') {
          data._config.parent = triggerData.parent;
          data._parent = data._getParent();
        }

        config = 'toggle';
      } else {
        config = triggerData;
      }

      Collapse._collapseInterface(element, config);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .collapse to jQuery only if jQuery is present
   */

  if (typeof jQuery !== 'undefined') {
    var JQUERY_NO_CONFLICT$5 = jQuery.fn[NAME$5];
    jQuery.fn[NAME$5] = Collapse._jQueryInterface;
    jQuery.fn[NAME$5].Constructor = Collapse;

    jQuery.fn[NAME$5].noConflict = function () {
      jQuery.fn[NAME$5] = JQUERY_NO_CONFLICT$5;
      return Collapse._jQueryInterface;
    };
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$6 = 'dropdown';
  var VERSION$6 = '3.0.0-alpha.9';
  var DATA_KEY$6 = 'coreui.dropdown';
  var EVENT_KEY$6 = "." + DATA_KEY$6;
  var DATA_API_KEY$6 = '.data-api';
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
  var PREFIX$6 = window.CoreUIDefaults ? window.CoreUIDefaults.prefix ? window.CoreUIDefaults.prefix : 'c-' : 'c-';
  var Event$7 = {
    HIDE: "hide" + EVENT_KEY$6,
    HIDDEN: "hidden" + EVENT_KEY$6,
    SHOW: "show" + EVENT_KEY$6,
    SHOWN: "shown" + EVENT_KEY$6,
    CLICK: "click" + EVENT_KEY$6,
    CLICK_DATA_API: "click" + EVENT_KEY$6 + DATA_API_KEY$6,
    KEYDOWN_DATA_API: "keydown" + EVENT_KEY$6 + DATA_API_KEY$6,
    KEYUP_DATA_API: "keyup" + EVENT_KEY$6 + DATA_API_KEY$6
  };
  var ClassName$6 = {
    DISABLED: 'disabled',
    SHOW: PREFIX$6 + "show",
    DROPUP: PREFIX$6 + "dropup",
    DROPRIGHT: PREFIX$6 + "dropright",
    DROPLEFT: PREFIX$6 + "dropleft",
    MENURIGHT: PREFIX$6 + "dropdown-menu-right",
    POSITION_STATIC: 'position-static'
  };
  var Selector$6 = {
    DATA_TOGGLE: "[data-toggle=\"" + PREFIX$6 + "dropdown\"]",
    FORM_CHILD: "." + PREFIX$6 + "dropdown form",
    MENU: "." + PREFIX$6 + "dropdown-menu",
    NAVBAR_NAV: "." + PREFIX$6 + "navbar-nav",
    VISIBLE_ITEMS: "." + PREFIX$6 + "dropdown-menu ." + PREFIX$6 + "dropdown-item:not(.disabled):not(:disabled)"
  };
  var AttachmentMap = {
    TOP: 'top-start',
    TOPEND: 'top-end',
    BOTTOM: 'bottom-start',
    BOTTOMEND: 'bottom-end',
    RIGHT: 'right-start',
    RIGHTEND: 'right-end',
    LEFT: 'left-start',
    LEFTEND: 'left-end'
  };
  var Default$4 = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic'
  };
  var DefaultType$2 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Dropdown =
  /*#__PURE__*/
  function () {
    function Dropdown(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();

      Data.setData(element, DATA_KEY$6, this);
    } // Getters


    var _proto = Dropdown.prototype;

    // Public
    _proto.toggle = function toggle() {
      if (this._element.disabled || this._element.classList.contains(ClassName$6.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this._element);

      var isActive = this._menu.classList.contains(ClassName$6.SHOW);

      Dropdown._clearMenus();

      if (isActive) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = EventHandler.trigger(parent, Event$7.SHOW, relatedTarget);

      if (showEvent.defaultPrevented) {
        return;
      } // Disable totally Popper.js for Dropdown in Navbar


      if (!this._inNavbar) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org)');
        }

        var referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (isElement(this._config.reference)) {
          referenceElement = this._config.reference; // Check if it's jQuery element

          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0];
          }
        } // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251


        if (this._config.boundary !== 'scrollParent') {
          parent.classList.add(ClassName$6.POSITION_STATIC);
        }

        this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && !makeArray(SelectorEngine.closest(parent, Selector$6.NAVBAR_NAV)).length) {
        makeArray(document.body.children).forEach(function (elem) {
          return EventHandler.on(elem, 'mouseover', null, noop());
        });
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      Manipulator.toggleClass(this._menu, ClassName$6.SHOW);
      Manipulator.toggleClass(parent, ClassName$6.SHOW);
      EventHandler.trigger(parent, Event$7.SHOWN, relatedTarget);
    };

    _proto.show = function show() {
      if (this._element.disabled || this._element.classList.contains(ClassName$6.DISABLED) || this._menu.classList.contains(ClassName$6.SHOW)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this._element);

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = EventHandler.trigger(parent, Event$7.SHOW, relatedTarget);

      if (showEvent.defaultPrevented) {
        return;
      }

      Manipulator.toggleClass(this._menu, ClassName$6.SHOW);
      Manipulator.toggleClass(parent, ClassName$6.SHOW);
      EventHandler.trigger(parent, Event$7.SHOWN, relatedTarget);
    };

    _proto.hide = function hide() {
      if (this._element.disabled || this._element.classList.contains(ClassName$6.DISABLED) || !this._menu.classList.contains(ClassName$6.SHOW)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this._element);

      var relatedTarget = {
        relatedTarget: this._element
      };
      var hideEvent = EventHandler.trigger(parent, Event$7.HIDE, relatedTarget);

      if (hideEvent.defaultPrevented) {
        return;
      }

      Manipulator.toggleClass(this._menu, ClassName$6.SHOW);
      Manipulator.toggleClass(parent, ClassName$6.SHOW);
      EventHandler.trigger(parent, Event$7.HIDDEN, relatedTarget);
    };

    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$6);
      EventHandler.off(this._element, EVENT_KEY$6);
      this._element = null;
      this._menu = null;

      if (this._popper !== null) {
        this._popper.destroy();

        this._popper = null;
      }
    };

    _proto.update = function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Private
    ;

    _proto._addEventListeners = function _addEventListeners() {
      var _this = this;

      EventHandler.on(this._element, Event$7.CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();

        _this.toggle();
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, this.constructor.Default, Manipulator.getDataAttributes(this._element), config);
      typeCheckConfig(NAME$6, config, this.constructor.DefaultType);
      return config;
    };

    _proto._getMenuElement = function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);

        if (parent) {
          this._menu = SelectorEngine.findOne(Selector$6.MENU, parent);
        }
      }

      return this._menu;
    };

    _proto._getPlacement = function _getPlacement() {
      var parentDropdown = this._element.parentNode;
      var placement = AttachmentMap.BOTTOM; // Handle dropup

      if (parentDropdown.classList.contains(ClassName$6.DROPUP)) {
        placement = AttachmentMap.TOP;

        if (this._menu.classList.contains(ClassName$6.MENURIGHT)) {
          placement = AttachmentMap.TOPEND;
        }
      } else if (parentDropdown.classList.contains(ClassName$6.DROPRIGHT)) {
        placement = AttachmentMap.RIGHT;
      } else if (parentDropdown.classList.contains(ClassName$6.DROPLEFT)) {
        placement = AttachmentMap.LEFT;
      } else if (this._menu.classList.contains(ClassName$6.MENURIGHT)) {
        placement = AttachmentMap.BOTTOMEND;
      }

      return placement;
    };

    _proto._detectNavbar = function _detectNavbar() {
      return Boolean(SelectorEngine.closest(this._element, '.navbar'));
    };

    _proto._getOffset = function _getOffset() {
      var _this2 = this;

      var offset = {};

      if (typeof this._config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets, _this2._element) || {});
          return data;
        };
      } else {
        offset.offset = this._config.offset;
      }

      return offset;
    };

    _proto._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        } // Disable Popper.js if we have a static display

      };

      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }

      return popperConfig;
    } // Static
    ;

    Dropdown._dropdownInterface = function _dropdownInterface(element, config) {
      var data = Data.getData(element, DATA_KEY$6);

      var _config = typeof config === 'object' ? config : null;

      if (!data) {
        data = new Dropdown(element, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"" + config + "\"");
        }

        data[config]();
      }
    };

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        Dropdown._dropdownInterface(this, config);
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = makeArray(SelectorEngine.find(Selector$6.DATA_TOGGLE));

      for (var i = 0, len = toggles.length; i < len; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);

        var context = Data.getData(toggles[i], DATA_KEY$6);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;

        if (!parent.classList.contains(ClassName$6.SHOW)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && parent.contains(event.target)) {
          continue;
        }

        var hideEvent = EventHandler.trigger(parent, Event$7.HIDE, relatedTarget);

        if (hideEvent.defaultPrevented) {
          continue;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          makeArray(document.body.children).forEach(function (elem) {
            return EventHandler.off(elem, 'mouseover', null, noop());
          });
        }

        toggles[i].setAttribute('aria-expanded', 'false');
        dropdownMenu.classList.remove(ClassName$6.SHOW);
        parent.classList.remove(ClassName$6.SHOW);
        EventHandler.trigger(parent, Event$7.HIDDEN, relatedTarget);
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent;
      var selector = getSelectorFromElement(element);

      if (selector) {
        parent = SelectorEngine.findOne(selector);
      }

      return parent || element.parentNode;
    };

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || SelectorEngine.closest(event.target, Selector$6.MENU)) : !REGEXP_KEYDOWN.test(event.which)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || this.classList.contains(ClassName$6.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);

      var isActive = parent.classList.contains(ClassName$6.SHOW);

      if (!isActive || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
        if (event.which === ESCAPE_KEYCODE) {
          EventHandler.trigger(SelectorEngine.findOne(Selector$6.DATA_TOGGLE, parent), 'focus');
        }

        Dropdown._clearMenus();

        return;
      }

      var items = makeArray(SelectorEngine.find(Selector$6.VISIBLE_ITEMS, parent));

      if (!items.length) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // Up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // Down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    Dropdown._getInstance = function _getInstance(element) {
      return Data.getData(element, DATA_KEY$6);
    };

    _createClass(Dropdown, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$6;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$4;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$2;
      }
    }]);

    return Dropdown;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, Event$7.KEYDOWN_DATA_API, Selector$6.DATA_TOGGLE, Dropdown._dataApiKeydownHandler);
  EventHandler.on(document, Event$7.KEYDOWN_DATA_API, Selector$6.MENU, Dropdown._dataApiKeydownHandler);
  EventHandler.on(document, Event$7.CLICK_DATA_API, Dropdown._clearMenus);
  EventHandler.on(document, Event$7.KEYUP_DATA_API, Dropdown._clearMenus);
  EventHandler.on(document, Event$7.CLICK_DATA_API, Selector$6.DATA_TOGGLE, function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._dropdownInterface(this, 'toggle');
  });
  EventHandler.on(document, Event$7.CLICK_DATA_API, Selector$6.FORM_CHILD, function (e) {
    return e.stopPropagation();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .dropdown to jQuery only if jQuery is present
   */

  if (typeof jQuery !== 'undefined') {
    var JQUERY_NO_CONFLICT$6 = jQuery.fn[NAME$6];
    jQuery.fn[NAME$6] = Dropdown._jQueryInterface;
    jQuery.fn[NAME$6].Constructor = Dropdown;

    jQuery.fn[NAME$6].noConflict = function () {
      jQuery.fn[NAME$6] = JQUERY_NO_CONFLICT$6;
      return Dropdown._jQueryInterface;
    };
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$7 = 'modal';
  var VERSION$7 = '3.0.0-alpha.9';
  var DATA_KEY$7 = 'coreui.modal';
  var EVENT_KEY$7 = "." + DATA_KEY$7;
  var DATA_API_KEY$7 = '.data-api';
  var ESCAPE_KEYCODE$1 = 27; // KeyboardEvent.which value for Escape (Esc) key

  var PREFIX$7 = window.CoreUIDefaults ? window.CoreUIDefaults.prefix ? window.CoreUIDefaults.prefix : 'c-' : 'c-';
  var Default$5 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType$3 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var Event$8 = {
    HIDE: "hide" + EVENT_KEY$7,
    HIDDEN: "hidden" + EVENT_KEY$7,
    SHOW: "show" + EVENT_KEY$7,
    SHOWN: "shown" + EVENT_KEY$7,
    FOCUSIN: "focusin" + EVENT_KEY$7,
    RESIZE: "resize" + EVENT_KEY$7,
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY$7,
    KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY$7,
    MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY$7,
    MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY$7,
    CLICK_DATA_API: "click" + EVENT_KEY$7 + DATA_API_KEY$7
  };
  var ClassName$7 = {
    SCROLLABLE: PREFIX$7 + "modal-dialog-scrollable",
    SCROLLBAR_MEASURER: PREFIX$7 + "modal-scrollbar-measure",
    BACKDROP: PREFIX$7 + "modal-backdrop",
    OPEN: PREFIX$7 + "modal-open",
    FADE: PREFIX$7 + "fade",
    SHOW: PREFIX$7 + "show"
  };
  var Selector$7 = {
    DIALOG: "." + PREFIX$7 + "modal-dialog",
    MODAL_BODY: "." + PREFIX$7 + "modal-body",
    DATA_TOGGLE: "[data-toggle=\"" + PREFIX$7 + "modal\"]",
    DATA_DISMISS: "[data-dismiss=\"" + PREFIX$7 + "modal\"]",
    FIXED_CONTENT: "." + PREFIX$7 + "fixed-top, ." + PREFIX$7 + "fixed-bottom, ." + PREFIX$7 + "is-fixed, ." + PREFIX$7 + "sticky-top",
    STICKY_CONTENT: "." + PREFIX$7 + "sticky-top"
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Modal =
  /*#__PURE__*/
  function () {
    function Modal(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = SelectorEngine.findOne(Selector$7.DIALOG, element);
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollbarWidth = 0;
      Data.setData(element, DATA_KEY$7, this);
    } // Getters


    var _proto = Modal.prototype;

    // Public
    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto.show = function show(relatedTarget) {
      var _this = this;

      if (this._isShown || this._isTransitioning) {
        return;
      }

      if (this._element.classList.contains(ClassName$7.FADE)) {
        this._isTransitioning = true;
      }

      var showEvent = EventHandler.trigger(this._element, Event$8.SHOW, {
        relatedTarget: relatedTarget
      });

      if (this._isShown || showEvent.defaultPrevented) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      EventHandler.on(this._element, Event$8.CLICK_DISMISS, Selector$7.DATA_DISMISS, function (event) {
        return _this.hide(event);
      });
      EventHandler.on(this._dialog, Event$8.MOUSEDOWN_DISMISS, function () {
        EventHandler.one(_this._element, Event$8.MOUSEUP_DISMISS, function (event) {
          if (event.target === _this._element) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    _proto.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (!this._isShown || this._isTransitioning) {
        return;
      }

      var hideEvent = EventHandler.trigger(this._element, Event$8.HIDE);

      if (!this._isShown || hideEvent.defaultPrevented) {
        return;
      }

      this._isShown = false;

      var transition = this._element.classList.contains(ClassName$7.FADE);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      EventHandler.off(document, Event$8.FOCUSIN);

      this._element.classList.remove(ClassName$7.SHOW);

      EventHandler.off(this._element, Event$8.CLICK_DISMISS);
      EventHandler.off(this._dialog, Event$8.MOUSEDOWN_DISMISS);

      if (transition) {
        var transitionDuration = getTransitionDurationFromElement(this._element);
        EventHandler.one(this._element, TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        });
        emulateTransitionEnd(this._element, transitionDuration);
      } else {
        this._hideModal();
      }
    };

    _proto.dispose = function dispose() {
      [window, this._element, this._dialog].forEach(function (htmlElement) {
        return EventHandler.off(htmlElement, EVENT_KEY$7);
      });
      /**
       * `document` has 2 events `Event.FOCUSIN` and `Event.CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `Event.CLICK_DATA_API` event that should remain
       */

      EventHandler.off(document, Event$8.FOCUSIN);
      Data.removeData(this._element, DATA_KEY$7);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning = null;
      this._scrollbarWidth = null;
    };

    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$5, config);
      typeCheckConfig(NAME$7, config, DefaultType$3);
      return config;
    };

    _proto._showElement = function _showElement(relatedTarget) {
      var _this3 = this;

      var transition = this._element.classList.contains(ClassName$7.FADE);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      if (this._dialog.classList.contains(ClassName$7.SCROLLABLE)) {
        SelectorEngine.findOne(Selector$7.MODAL_BODY, this._dialog).scrollTop = 0;
      } else {
        this._element.scrollTop = 0;
      }

      if (transition) {
        reflow(this._element);
      }

      this._element.classList.add(ClassName$7.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var transitionComplete = function transitionComplete() {
        if (_this3._config.focus) {
          _this3._element.focus();
        }

        _this3._isTransitioning = false;
        EventHandler.trigger(_this3._element, Event$8.SHOWN, {
          relatedTarget: relatedTarget
        });
      };

      if (transition) {
        var transitionDuration = getTransitionDurationFromElement(this._dialog);
        EventHandler.one(this._dialog, TRANSITION_END, transitionComplete);
        emulateTransitionEnd(this._dialog, transitionDuration);
      } else {
        transitionComplete();
      }
    };

    _proto._enforceFocus = function _enforceFocus() {
      var _this4 = this;

      EventHandler.off(document, Event$8.FOCUSIN); // guard against infinite focus loop

      EventHandler.on(document, Event$8.FOCUSIN, function (event) {
        if (document !== event.target && _this4._element !== event.target && !_this4._element.contains(event.target)) {
          _this4._element.focus();
        }
      });
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this5 = this;

      if (this._isShown && this._config.keyboard) {
        EventHandler.on(this._element, Event$8.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE$1) {
            event.preventDefault();

            _this5.hide();
          }
        });
      } else if (!this._isShown) {
        EventHandler.off(this._element, Event$8.KEYDOWN_DISMISS);
      }
    };

    _proto._setResizeEvent = function _setResizeEvent() {
      var _this6 = this;

      if (this._isShown) {
        EventHandler.on(window, Event$8.RESIZE, function (event) {
          return _this6.handleUpdate(event);
        });
      } else {
        EventHandler.off(window, Event$8.RESIZE);
      }
    };

    _proto._hideModal = function _hideModal() {
      var _this7 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._isTransitioning = false;

      this._showBackdrop(function () {
        document.body.classList.remove(ClassName$7.OPEN);

        _this7._resetAdjustments();

        _this7._resetScrollbar();

        EventHandler.trigger(_this7._element, Event$8.HIDDEN);
      });
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        this._backdrop.parentNode.removeChild(this._backdrop);

        this._backdrop = null;
      }
    };

    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this8 = this;

      var animate = this._element.classList.contains(ClassName$7.FADE) ? ClassName$7.FADE : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName$7.BACKDROP;

        if (animate) {
          this._backdrop.classList.add(animate);
        }

        document.body.appendChild(this._backdrop);
        EventHandler.on(this._element, Event$8.CLICK_DISMISS, function (event) {
          if (_this8._ignoreBackdropClick) {
            _this8._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          if (_this8._config.backdrop === 'static') {
            _this8._element.focus();
          } else {
            _this8.hide();
          }
        });

        if (animate) {
          reflow(this._backdrop);
        }

        this._backdrop.classList.add(ClassName$7.SHOW);

        if (!callback) {
          return;
        }

        if (!animate) {
          callback();
          return;
        }

        var backdropTransitionDuration = getTransitionDurationFromElement(this._backdrop);
        EventHandler.one(this._backdrop, TRANSITION_END, callback);
        emulateTransitionEnd(this._backdrop, backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        this._backdrop.classList.remove(ClassName$7.SHOW);

        var callbackRemove = function callbackRemove() {
          _this8._removeBackdrop();

          if (callback) {
            callback();
          }
        };

        if (this._element.classList.contains(ClassName$7.FADE)) {
          var _backdropTransitionDuration = getTransitionDurationFromElement(this._backdrop);

          EventHandler.one(this._backdrop, TRANSITION_END, callbackRemove);
          emulateTransitionEnd(this._backdrop, _backdropTransitionDuration);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // ----------------------------------------------------------------------
    ;

    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      }
    };

    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    _proto._setScrollbar = function _setScrollbar() {
      var _this9 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        // Adjust fixed content padding
        makeArray(SelectorEngine.find(Selector$7.FIXED_CONTENT)).forEach(function (element) {
          var actualPadding = element.style.paddingRight;
          var calculatedPadding = window.getComputedStyle(element)['padding-right'];
          Manipulator.setDataAttribute(element, 'padding-right', actualPadding);
          element.style.paddingRight = parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px";
        }); // Adjust sticky content margin

        makeArray(SelectorEngine.find(Selector$7.STICKY_CONTENT)).forEach(function (element) {
          var actualMargin = element.style.marginRight;
          var calculatedMargin = window.getComputedStyle(element)['margin-right'];
          Manipulator.setDataAttribute(element, 'margin-right', actualMargin);
          element.style.marginRight = parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px";
        }); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = window.getComputedStyle(document.body)['padding-right'];
        Manipulator.setDataAttribute(document.body, 'padding-right', actualPadding);
        document.body.style.paddingRight = parseFloat(calculatedPadding) + this._scrollbarWidth + "px";
      }

      document.body.classList.add(ClassName$7.OPEN);
    };

    _proto._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      makeArray(SelectorEngine.find(Selector$7.FIXED_CONTENT)).forEach(function (element) {
        var padding = Manipulator.getDataAttribute(element, 'padding-right');

        if (typeof padding !== 'undefined') {
          Manipulator.removeDataAttribute(element, 'padding-right');
          element.style.paddingRight = padding;
        }
      }); // Restore sticky content and navbar-toggler margin

      makeArray(SelectorEngine.find("" + Selector$7.STICKY_CONTENT)).forEach(function (element) {
        var margin = Manipulator.getDataAttribute(element, 'margin-right');

        if (typeof margin !== 'undefined') {
          Manipulator.removeDataAttribute(element, 'margin-right');
          element.style.marginRight = margin;
        }
      }); // Restore body padding

      var padding = Manipulator.getDataAttribute(document.body, 'padding-right');

      if (typeof padding === 'undefined') {
        document.body.style.paddingRight = '';
      } else {
        Manipulator.removeDataAttribute(document.body, 'padding-right');
        document.body.style.paddingRight = padding;
      }
    };

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName$7.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    } // Static
    ;

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$7);

        var _config = _objectSpread({}, Default$5, Manipulator.getDataAttributes(this), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new Modal(this, _config);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    Modal._getInstance = function _getInstance(element) {
      return Data.getData(element, DATA_KEY$7);
    };

    _createClass(Modal, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$5;
      }
    }]);

    return Modal;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, Event$8.CLICK_DATA_API, Selector$7.DATA_TOGGLE, function (event) {
    var _this10 = this;

    var target;
    var selector = getSelectorFromElement(this);

    if (selector) {
      target = SelectorEngine.findOne(selector);
    }

    var config = Data.getData(target, DATA_KEY$7) ? 'toggle' : _objectSpread({}, Manipulator.getDataAttributes(target), Manipulator.getDataAttributes(this));

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    EventHandler.one(target, Event$8.SHOW, function (showEvent) {
      if (showEvent.defaultPrevented) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      EventHandler.one(target, Event$8.HIDDEN, function () {
        if (isVisible(_this10)) {
          _this10.focus();
        }
      });
    });
    var data = Data.getData(target, DATA_KEY$7);

    if (!data) {
      data = new Modal(target, config);
    }

    data.show(this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  if (typeof jQuery !== 'undefined') {
    var JQUERY_NO_CONFLICT$7 = jQuery.fn[NAME$7];
    jQuery.fn[NAME$7] = Modal._jQueryInterface;
    jQuery.fn[NAME$7].Constructor = Modal;

    jQuery.fn[NAME$7].noConflict = function () {
      jQuery.fn[NAME$7] = JQUERY_NO_CONFLICT$7;
      return Modal._jQueryInterface;
    };
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): util/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

  var allowedAttribute = function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
      }

      return true;
    }

    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, l = regExp.length; i < l; i++) {
      if (attrName.match(regExp[i])) {
        return true;
      }
    }

    return false;
  };

  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (!unsafeHtml.length) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var whitelistKeys = Object.keys(whiteList);
    var elements = makeArray(createdDocument.body.querySelectorAll('*'));

    var _loop = function _loop(i, len) {
      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if (whitelistKeys.indexOf(elName) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      }

      var attributeList = makeArray(el.attributes);
      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i, len);

      if (_ret === "continue") continue;
    }

    return createdDocument.body.innerHTML;
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$8 = 'tooltip';
  var VERSION$8 = '3.0.0-alpha.9';
  var DATA_KEY$8 = 'coreui.tooltip';
  var EVENT_KEY$8 = "." + DATA_KEY$8;
  var PREFIX$8 = window.CoreUIDefaults ? window.CoreUIDefaults.prefix ? window.CoreUIDefaults.prefix : 'c-' : 'c-';
  var CLASS_PREFIX = PREFIX$8 + "bs-tooltip";
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
  var DefaultType$4 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    whiteList: 'object'
  };
  var AttachmentMap$1 = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default$6 = {
    animation: true,
    template: "<div class=\"" + PREFIX$8 + "tooltip\" role=\"tooltip\">\n               <div class=\"" + PREFIX$8 + "tooltip-arrow\"></div>\n               <div class=\"" + PREFIX$8 + "tooltip-inner\"></div>\n             </div>",
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist
  };
  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  };
  var Event$9 = {
    HIDE: "hide" + EVENT_KEY$8,
    HIDDEN: "hidden" + EVENT_KEY$8,
    SHOW: "show" + EVENT_KEY$8,
    SHOWN: "shown" + EVENT_KEY$8,
    INSERTED: "inserted" + EVENT_KEY$8,
    CLICK: "click" + EVENT_KEY$8,
    FOCUSIN: "focusin" + EVENT_KEY$8,
    FOCUSOUT: "focusout" + EVENT_KEY$8,
    MOUSEENTER: "mouseenter" + EVENT_KEY$8,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$8
  };
  var ClassName$8 = {
    FADE: PREFIX$8 + "fade",
    SHOW: PREFIX$8 + "show"
  };
  var Selector$8 = {
    TOOLTIP_INNER: "." + PREFIX$8 + "tooltip-inner",
    TOOLTIP_ARROW: "." + PREFIX$8 + "tooltip-arrow"
  };
  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Tooltip =
  /*#__PURE__*/
  function () {
    function Tooltip(element, config) {
      /**
       * Check for Popper dependency
       * Popper - https://popper.js.org
       */
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org)');
      } // private


      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null; // Protected

      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();

      Data.setData(element, this.constructor.DATA_KEY, this);
    } // Getters


    var _proto = Tooltip.prototype;

    // Public
    _proto.enable = function enable() {
      this._isEnabled = true;
    };

    _proto.disable = function disable() {
      this._isEnabled = false;
    };

    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    _proto.toggle = function toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = Data.getData(event.delegateTarget, dataKey);

        if (!context) {
          context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
          Data.setData(event.delegateTarget, dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if (this.getTipElement().classList.contains(ClassName$8.SHOW)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      Data.removeData(this.element, this.constructor.DATA_KEY);
      EventHandler.off(this.element, this.constructor.EVENT_KEY);
      EventHandler.off(SelectorEngine.closest(this.element, '.modal'), 'hide.bs.modal');

      if (this.tip) {
        this.tip.parentNode.removeChild(this.tip);
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;

      if (this._popper !== null) {
        this._popper.destroy();
      }

      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    };

    _proto.show = function show() {
      var _this = this;

      if (this.element.style.display === 'none') {
        throw new Error('Please use show on visible elements');
      }

      if (this.isWithContent() && this._isEnabled) {
        var showEvent = EventHandler.trigger(this.element, this.constructor.Event.SHOW);
        var shadowRoot = findShadowRoot(this.element);
        var isInTheDom = shadowRoot === null ? this.element.ownerDocument.documentElement.contains(this.element) : shadowRoot.contains(this.element);

        if (showEvent.defaultPrevented || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();

        if (this.config.animation) {
          tip.classList.add(ClassName$8.FADE);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        this.addAttachmentClass(attachment);

        var container = this._getContainer();

        Data.setData(tip, this.constructor.DATA_KEY, this);

        if (!this.element.ownerDocument.documentElement.contains(this.tip)) {
          container.appendChild(tip);
        }

        EventHandler.trigger(this.element, this.constructor.Event.INSERTED);
        this._popper = new Popper(this.element, tip, {
          placement: attachment,
          modifiers: {
            offset: this._getOffset(),
            flip: {
              behavior: this.config.fallbackPlacement
            },
            arrow: {
              element: Selector$8.TOOLTIP_ARROW
            },
            preventOverflow: {
              boundariesElement: this.config.boundary
            }
          },
          onCreate: function onCreate(data) {
            if (data.originalPlacement !== data.placement) {
              _this._handlePopperPlacementChange(data);
            }
          },
          onUpdate: function onUpdate(data) {
            return _this._handlePopperPlacementChange(data);
          }
        });
        tip.classList.add(ClassName$8.SHOW); // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          makeArray(document.body.children).forEach(function (element) {
            EventHandler.on(element, 'mouseover', noop());
          });
        }

        var complete = function complete() {
          if (_this.config.animation) {
            _this._fixTransition();
          }

          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          EventHandler.trigger(_this.element, _this.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) {
            _this._leave(null, _this);
          }
        };

        if (this.tip.classList.contains(ClassName$8.FADE)) {
          var transitionDuration = getTransitionDurationFromElement(this.tip);
          EventHandler.one(this.tip, TRANSITION_END, complete);
          emulateTransitionEnd(this.tip, transitionDuration);
        } else {
          complete();
        }
      }
    };

    _proto.hide = function hide(callback) {
      var _this2 = this;

      var tip = this.getTipElement();

      var complete = function complete() {
        if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2._cleanTipClass();

        _this2.element.removeAttribute('aria-describedby');

        EventHandler.trigger(_this2.element, _this2.constructor.Event.HIDDEN);

        if (_this2._popper !== null) {
          _this2._popper.destroy();
        }

        if (callback) {
          callback();
        }
      };

      var hideEvent = EventHandler.trigger(this.element, this.constructor.Event.HIDE);

      if (hideEvent.defaultPrevented) {
        return;
      }

      tip.classList.remove(ClassName$8.SHOW); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        makeArray(document.body.children).forEach(function (element) {
          return EventHandler.off(element, 'mouseover', noop);
        });
      }

      this._activeTrigger[Trigger.CLICK] = false;
      this._activeTrigger[Trigger.FOCUS] = false;
      this._activeTrigger[Trigger.HOVER] = false;

      if (this.tip.classList.contains(ClassName$8.FADE)) {
        var transitionDuration = getTransitionDurationFromElement(tip);
        EventHandler.one(tip, TRANSITION_END, complete);
        emulateTransitionEnd(tip, transitionDuration);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    _proto.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Protected
    ;

    _proto.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      this.getTipElement().classList.add(CLASS_PREFIX + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      if (this.tip) {
        return this.tip;
      }

      var element = document.createElement('div');
      element.innerHTML = this.config.template;
      this.tip = element.children[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var tip = this.getTipElement();
      this.setElementContent(SelectorEngine.findOne(Selector$8.TOOLTIP_INNER, tip), this.getTitle());
      tip.classList.remove(ClassName$8.FADE);
      tip.classList.remove(ClassName$8.SHOW);
    };

    _proto.setElementContent = function setElementContent(element, content) {
      if (element === null) {
        return;
      }

      if (typeof content === 'object' && (content.nodeType || content.jquery)) {
        if (content.jquery) {
          content = content[0];
        } // content is a DOM node or a jQuery


        if (this.config.html) {
          if (content.parentNode !== element) {
            element.innerHTML = '';
            element.appendChild(content);
          }
        } else {
          element.innerText = content.textContent;
        }

        return;
      }

      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
        }

        element.innerHTML = content;
      } else {
        element.innerText = content;
      }
    };

    _proto.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    } // Private
    ;

    _proto._getOffset = function _getOffset() {
      var _this3 = this;

      var offset = {};

      if (typeof this.config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _objectSpread({}, data.offsets, _this3.config.offset(data.offsets, _this3.element) || {});
          return data;
        };
      } else {
        offset.offset = this.config.offset;
      }

      return offset;
    };

    _proto._getContainer = function _getContainer() {
      if (this.config.container === false) {
        return document.body;
      }

      if (isElement(this.config.container)) {
        return this.config.container;
      }

      return SelectorEngine.findOne(this.config.container);
    };

    _proto._getAttachment = function _getAttachment(placement) {
      return AttachmentMap$1[placement.toUpperCase()];
    };

    _proto._setListeners = function _setListeners() {
      var _this4 = this;

      var triggers = this.config.trigger.split(' ');
      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          EventHandler.on(_this4.element, _this4.constructor.Event.CLICK, _this4.config.selector, function (event) {
            return _this4.toggle(event);
          });
        } else if (trigger !== Trigger.MANUAL) {
          var eventIn = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSEENTER : _this4.constructor.Event.FOCUSIN;
          var eventOut = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSELEAVE : _this4.constructor.Event.FOCUSOUT;
          EventHandler.on(_this4.element, eventIn, _this4.config.selector, function (event) {
            return _this4._enter(event);
          });
          EventHandler.on(_this4.element, eventOut, _this4.config.selector, function (event) {
            return _this4._leave(event);
          });
        }
      });
      EventHandler.on(SelectorEngine.closest(this.element, '.modal'), 'hide.bs.modal', function () {
        if (_this4.element) {
          _this4.hide();
        }
      });

      if (this.config.selector) {
        this.config = _objectSpread({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    _proto._fixTitle = function _fixTitle() {
      var titleType = typeof this.element.getAttribute('data-original-title');

      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    _proto._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || Data.getData(event.delegateTarget, dataKey);

      if (!context) {
        context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
        Data.setData(event.delegateTarget, dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
      }

      if (context.getTipElement().classList.contains(ClassName$8.SHOW) || context._hoverState === HoverState.SHOW) {
        context._hoverState = HoverState.SHOW;
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HoverState.SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    _proto._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || Data.getData(event.delegateTarget, dataKey);

      if (!context) {
        context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
        Data.setData(event.delegateTarget, dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HoverState.OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    _proto._getConfig = function _getConfig(config) {
      var dataAttributes = Manipulator.getDataAttributes(this.element);
      Object.keys(dataAttributes).forEach(function (dataAttr) {
        if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
          delete dataAttributes[dataAttr];
        }
      });

      if (config && typeof config.container === 'object' && config.container.jquery) {
        config.container = config.container[0];
      }

      config = _objectSpread({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      typeCheckConfig(NAME$8, config, this.constructor.DefaultType);

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
      }

      return config;
    };

    _proto._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var tip = this.getTipElement();
      var tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length) {
        tabClass.map(function (token) {
          return token.trim();
        }).forEach(function (tClass) {
          return tip.classList.remove(tClass);
        });
      }
    };

    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
      var popperInstance = popperData.instance;
      this.tip = popperInstance.popper;

      this._cleanTipClass();

      this.addAttachmentClass(this._getAttachment(popperData.placement));
    };

    _proto._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;

      if (tip.getAttribute('x-placement') !== null) {
        return;
      }

      tip.classList.remove(ClassName$8.FADE);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    } // Static
    ;

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$8);

        var _config = typeof config === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Tooltip._getInstance = function _getInstance(element) {
      return Data.getData(element, DATA_KEY$8);
    };

    _createClass(Tooltip, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$8;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$6;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$8;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$8;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$9;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$8;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$4;
      }
    }]);

    return Tooltip;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .tooltip to jQuery only if jQuery is present
   */


  if (typeof jQuery !== 'undefined') {
    var JQUERY_NO_CONFLICT$8 = jQuery.fn[NAME$8];
    jQuery.fn[NAME$8] = Tooltip._jQueryInterface;
    jQuery.fn[NAME$8].Constructor = Tooltip;

    jQuery.fn[NAME$8].noConflict = function () {
      jQuery.fn[NAME$8] = JQUERY_NO_CONFLICT$8;
      return Tooltip._jQueryInterface;
    };
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$9 = 'popover';
  var VERSION$9 = '3.0.0-alpha.9';
  var DATA_KEY$9 = 'coreui.popover';
  var EVENT_KEY$9 = "." + DATA_KEY$9;
  var PREFIX$9 = window.CoreUIDefaults ? window.CoreUIDefaults.prefix ? window.CoreUIDefaults.prefix : 'c-' : 'c-';
  var CLASS_PREFIX$1 = PREFIX$9 + "bs-popover";
  var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');

  var Default$7 = _objectSpread({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: "<div class=\"" + PREFIX$9 + "popover\" role=\"tooltip\">\n               <div class=\"" + PREFIX$9 + "popover-arrow\"></div>\n               <h3 class=\"" + PREFIX$9 + "popover-header\"></h3>\n               <div class=\"" + PREFIX$9 + "popover-body\"></div>\n             </div>"
  });

  var DefaultType$5 = _objectSpread({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName$9 = {
    FADE: PREFIX$9 + "fade",
    SHOW: PREFIX$9 + "show"
  };
  var Selector$9 = {
    TITLE: "." + PREFIX$9 + "popover-header",
    CONTENT: "." + PREFIX$9 + "popover-body"
  };
  var Event$a = {
    HIDE: "hide" + EVENT_KEY$9,
    HIDDEN: "hidden" + EVENT_KEY$9,
    SHOW: "show" + EVENT_KEY$9,
    SHOWN: "shown" + EVENT_KEY$9,
    INSERTED: "inserted" + EVENT_KEY$9,
    CLICK: "click" + EVENT_KEY$9,
    FOCUSIN: "focusin" + EVENT_KEY$9,
    FOCUSOUT: "focusout" + EVENT_KEY$9,
    MOUSEENTER: "mouseenter" + EVENT_KEY$9,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$9
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Popover =
  /*#__PURE__*/
  function (_Tooltip) {
    _inheritsLoose(Popover, _Tooltip);

    function Popover() {
      return _Tooltip.apply(this, arguments) || this;
    }

    var _proto = Popover.prototype;

    // Overrides
    _proto.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      this.getTipElement().classList.add(CLASS_PREFIX$1 + "-" + attachment);
    };

    _proto.setContent = function setContent() {
      var tip = this.getTipElement(); // we use append for html objects to maintain js events

      this.setElementContent(SelectorEngine.findOne(Selector$9.TITLE, tip), this.getTitle());

      var content = this._getContent();

      if (typeof content === 'function') {
        content = content.call(this.element);
      }

      this.setElementContent(SelectorEngine.findOne(Selector$9.CONTENT, tip), content);
      tip.classList.remove(ClassName$9.FADE);
      tip.classList.remove(ClassName$9.SHOW);
    } // Private
    ;

    _proto._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || this.config.content;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var tip = this.getTipElement();
      var tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX$1);

      if (tabClass !== null && tabClass.length > 0) {
        tabClass.map(function (token) {
          return token.trim();
        }).forEach(function (tClass) {
          return tip.classList.remove(tClass);
        });
      }
    } // Static
    ;

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$9);

        var _config = typeof config === 'object' ? config : null;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          Data.setData(this, DATA_KEY$9, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Popover._getInstance = function _getInstance(element) {
      return Data.getData(element, DATA_KEY$9);
    };

    _createClass(Popover, null, [{
      key: "VERSION",
      // Getters
      get: function get() {
        return VERSION$9;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$7;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$9;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$9;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$a;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$9;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$5;
      }
    }]);

    return Popover;
  }(Tooltip);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  if (typeof jQuery !== 'undefined') {
    var JQUERY_NO_CONFLICT$9 = jQuery.fn[NAME$9];
    jQuery.fn[NAME$9] = Popover._jQueryInterface;
    jQuery.fn[NAME$9].Constructor = Popover;

    jQuery.fn[NAME$9].noConflict = function () {
      jQuery.fn[NAME$9] = JQUERY_NO_CONFLICT$9;
      return Popover._jQueryInterface;
    };
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$a = 'scrollspy';
  var VERSION$a = '3.0.0-alpha.9';
  var DATA_KEY$a = 'coreui.scrollspy';
  var EVENT_KEY$a = "." + DATA_KEY$a;
  var DATA_API_KEY$8 = '.data-api';
  var PREFIX$a = window.CoreUIDefaults ? window.CoreUIDefaults.prefix ? window.CoreUIDefaults.prefix : 'c-' : 'c-';
  var Default$8 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType$6 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var Event$b = {
    ACTIVATE: "activate" + EVENT_KEY$a,
    SCROLL: "scroll" + EVENT_KEY$a,
    LOAD_DATA_API: "load" + EVENT_KEY$a + DATA_API_KEY$8
  };
  var ClassName$a = {
    DROPDOWN_ITEM: PREFIX$a + "dropdown-item",
    ACTIVE: PREFIX$a + "active"
  };
  var Selector$a = {
    DATA_SPY: "[data-spy=\"" + PREFIX$a + "scroll\"]",
    NAV_LIST_GROUP: "." + PREFIX$a + "nav, ." + PREFIX$a + "list-group",
    NAV_LINKS: "." + PREFIX$a + "nav-link",
    NAV_ITEMS: "." + PREFIX$a + "nav-item",
    LIST_ITEMS: "." + PREFIX$a + "list-group-item",
    DROPDOWN: "." + PREFIX$a + "dropdown",
    DROPDOWN_TOGGLE: "." + PREFIX$a + "dropdown-toggle"
  };
  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var ScrollSpy =
  /*#__PURE__*/
  function () {
    function ScrollSpy(element, config) {
      var _this = this;

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + " " + Selector$a.NAV_LINKS + "," + (this._config.target + " " + Selector$a.LIST_ITEMS + ",") + (this._config.target + " ." + ClassName$a.DROPDOWN_ITEM);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      EventHandler.on(this._scrollElement, Event$b.SCROLL, function (event) {
        return _this._process(event);
      });
      this.refresh();

      this._process();

      Data.setData(element, DATA_KEY$a, this);
    } // Getters


    var _proto = ScrollSpy.prototype;

    // Public
    _proto.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = makeArray(SelectorEngine.find(this._selector));
      targets.map(function (element) {
        var target;
        var targetSelector = getSelectorFromElement(element);

        if (targetSelector) {
          target = SelectorEngine.findOne(targetSelector);
        }

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);

        _this2._targets.push(item[1]);
      });
    };

    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$a);
      EventHandler.off(this._scrollElement, EVENT_KEY$a);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$8, typeof config === 'object' && config ? config : {});

      if (typeof config.target !== 'string') {
        var id = config.target.id;

        if (!id) {
          id = getUID(NAME$a);
          config.target.id = id;
        }

        config.target = "#" + id;
      }

      typeCheckConfig(NAME$a, config, DefaultType$6);
      return config;
    };

    _proto._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    _proto._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    _proto._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    _proto._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      var offsetLength = this._offsets.length;

      for (var i = offsetLength; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    _proto._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',').map(function (selector) {
        return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
      });

      var link = SelectorEngine.findOne(queries.join(','));

      if (link.classList.contains(ClassName$a.DROPDOWN_ITEM)) {
        SelectorEngine.findOne(Selector$a.DROPDOWN_TOGGLE, SelectorEngine.closest(link, Selector$a.DROPDOWN)).classList.add(ClassName$a.ACTIVE);
        link.classList.add(ClassName$a.ACTIVE);
      } else {
        // Set triggered link as active
        link.classList.add(ClassName$a.ACTIVE);
        SelectorEngine.parents(link, Selector$a.NAV_LIST_GROUP).forEach(function (listGroup) {
          // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
          SelectorEngine.prev(listGroup, Selector$a.NAV_LINKS + ", " + Selector$a.LIST_ITEMS).forEach(function (item) {
            return item.classList.add(ClassName$a.ACTIVE);
          }); // Handle special case when .nav-link is inside .nav-item

          SelectorEngine.prev(listGroup, Selector$a.NAV_ITEMS).forEach(function (navItem) {
            SelectorEngine.children(navItem, Selector$a.NAV_LINKS).forEach(function (item) {
              return item.classList.add(ClassName$a.ACTIVE);
            });
          });
        });
      }

      EventHandler.trigger(this._scrollElement, Event$b.ACTIVATE, {
        relatedTarget: target
      });
    };

    _proto._clear = function _clear() {
      makeArray(SelectorEngine.find(this._selector)).filter(function (node) {
        return node.classList.contains(ClassName$a.ACTIVE);
      }).forEach(function (node) {
        return node.classList.remove(ClassName$a.ACTIVE);
      });
    } // Static
    ;

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$a);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    ScrollSpy._getInstance = function _getInstance(element) {
      return Data.getData(element, DATA_KEY$a);
    };

    _createClass(ScrollSpy, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$a;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$8;
      }
    }]);

    return ScrollSpy;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(window, Event$b.LOAD_DATA_API, function () {
    makeArray(SelectorEngine.find(Selector$a.DATA_SPY)).forEach(function (spy) {
      return new ScrollSpy(spy, Manipulator.getDataAttributes(spy));
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  if (typeof jQuery !== 'undefined') {
    var JQUERY_NO_CONFLICT$a = jQuery.fn[NAME$a];
    jQuery.fn[NAME$a] = ScrollSpy._jQueryInterface;
    jQuery.fn[NAME$a].Constructor = ScrollSpy;

    jQuery.fn[NAME$a].noConflict = function () {
      jQuery.fn[NAME$a] = JQUERY_NO_CONFLICT$a;
      return ScrollSpy._jQueryInterface;
    };
  }

  /**
   * --------------------------------------------------------------------------
   * CoreUI Utilities (v3.0.0-alpha.9): get-css-custom-properties.js
   * Licensed under MIT (https://coreui.io/license)
   * @returns {string} css custom property name
   * --------------------------------------------------------------------------
   */
  var getCssCustomProperties = function getCssCustomProperties() {
    var cssCustomProperties = {};
    var sheets = document.styleSheets;
    var cssText = '';

    for (var i = sheets.length - 1; i > -1; i--) {
      var rules = sheets[i].cssRules;

      for (var j = rules.length - 1; j > -1; j--) {
        if (rules[j].selectorText === '.ie-custom-properties') {
          // eslint-disable-next-line prefer-destructuring
          cssText = rules[j].cssText;
          break;
        }
      }

      if (cssText) {
        break;
      }
    }

    cssText = cssText.substring(cssText.lastIndexOf('{') + 1, cssText.lastIndexOf('}'));
    cssText.split(';').forEach(function (property) {
      if (property) {
        var name = property.split(': ')[0];
        var value = property.split(': ')[1];

        if (name && value) {
          cssCustomProperties["--" + name.trim()] = value.trim();
        }
      }
    });
    return cssCustomProperties;
  };

  /**
   * --------------------------------------------------------------------------
   * CoreUI Utilities (v3.0.0-alpha.9): get-style.js
   * Licensed under MIT (https://coreui.io/license)
   * --------------------------------------------------------------------------
   */
  var minIEVersion = 10;

  var isIE1x = function isIE1x() {
    return Boolean(document.documentMode) && document.documentMode >= minIEVersion;
  };

  var isCustomProperty = function isCustomProperty(property) {
    return property.match(/^--.*/i);
  };

  var getStyle = function getStyle(property, element) {
    if (element === void 0) {
      element = document.body;
    }

    var style;

    if (isCustomProperty(property) && isIE1x()) {
      var cssCustomProperties = getCssCustomProperties();
      style = cssCustomProperties[property];
    } else {
      style = window.getComputedStyle(element, null).getPropertyValue(property).replace(/^\s/, '');
    }

    return style;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$b = 'sidebar';
  var VERSION$b = '3.0.0-alpha.9';
  var DATA_KEY$b = 'coreui.sidebar';
  var EVENT_KEY$b = "." + DATA_KEY$b;
  var DATA_API_KEY$9 = '.data-api';
  var PREFIX$b = window.CoreUIDefaults ? window.CoreUIDefaults.prefix ? window.CoreUIDefaults.prefix : 'c-' : 'c-';
  var Default$9 = {
    transition: 400
  };
  var ClassName$b = {
    ACTIVE: PREFIX$b + "active",
    NAV_DROPDOWN_TOGGLE: PREFIX$b + "nav-dropdown-toggle",
    OPEN: PREFIX$b + "open",
    SIDEBAR_MINIMIZED: PREFIX$b + "sidebar-minimized",
    SIDEBAR_SHOW: PREFIX$b + "sidebar-show"
  };
  var Event$c = {
    CLASS_TOGGLE: 'classtoggle',
    CLICK: 'click',
    CLICK_DATA_API: "click" + EVENT_KEY$b + DATA_API_KEY$9,
    DESTROY: 'destroy',
    INIT: 'init',
    LOAD_DATA_API: "load" + EVENT_KEY$b + DATA_API_KEY$9,
    TOGGLE: 'toggle',
    UPDATE: 'update'
  };
  var Selector$b = {
    NAV_DROPDOWN_TOGGLE: "." + PREFIX$b + "nav-dropdown-toggle",
    NAV_DROPDOWN: "." + PREFIX$b + "nav-dropdown",
    NAV_LINK: "." + PREFIX$b + "nav-link",
    NAV_LINK_QUERIED: "." + PREFIX$b + "nav-link-queried",
    NAVIGATION_CONTAINER: "." + PREFIX$b + "sidebar-nav",
    SIDEBAR: "." + PREFIX$b + "sidebar"
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Sidebar =
  /*#__PURE__*/
  function () {
    function Sidebar(element) {
      this._element = element;
      this.mobile = false;
      this.ps = null;

      this._perfectScrollbar(Event$c.INIT);

      this._setActiveLink();

      this._breakpointTest = this._breakpointTest.bind(this);
      this._clickOutListener = this._clickOutListener.bind(this);

      this._addEventListeners();

      this._addMediaQuery();
    } // Getters


    var _proto = Sidebar.prototype;

    // Private
    _proto._toggleDropdown = function _toggleDropdown(event) {
      var toggler = event.target;

      if (!toggler.classList.contains(ClassName$b.NAV_DROPDOWN_TOGGLE)) {
        toggler = toggler.closest(Selector$b.NAV_DROPDOWN_TOGGLE);
      }

      toggler.parentNode.classList.toggle(ClassName$b.OPEN);

      this._perfectScrollbar(Event$c.UPDATE);
    };

    _proto._closeSidebar = function _closeSidebar(event) {
      var link = event.target;

      if (!link.classList.contains(ClassName$b.NAV_LINK)) {
        link = link.closest(Selector$b.NAV_LINK);
      }

      if (this.mobile && !link.classList.contains(ClassName$b.NAV_DROPDOWN_TOGGLE)) {
        this._removeClickOut();

        this._element.classList.remove(ClassName$b.SIDEBAR_SHOW);
      }
    };

    _proto._perfectScrollbar = function _perfectScrollbar(event) {
      var _this = this;

      if (typeof PerfectScrollbar !== 'undefined') {
        if (event === Event$c.INIT && !this._element.classList.contains(ClassName$b.SIDEBAR_MINIMIZED)) {
          this.ps = this._makeScrollbar();
        }

        if (event === Event$c.DESTROY) {
          this._destroyScrollbar();
        }

        if (event === Event$c.TOGGLE) {
          if (this._element.classList.contains(ClassName$b.SIDEBAR_MINIMIZED)) {
            this._destroyScrollbar();
          } else {
            this._destroyScrollbar();

            this.ps = this._makeScrollbar();
          }
        }

        if (event === Event$c.UPDATE && !this._element.classList.contains(ClassName$b.SIDEBAR_MINIMIZED)) {
          // TODO: Add smooth transition
          setTimeout(function () {
            _this._destroyScrollbar();

            _this.ps = _this._makeScrollbar();
          }, Default$9.transition);
        }
      }
    };

    _proto._makeScrollbar = function _makeScrollbar(container) {
      if (container === void 0) {
        container = Selector$b.NAVIGATION_CONTAINER;
      }

      var ps = new PerfectScrollbar(document.querySelector(container), {
        suppressScrollX: true
      }); // TODO: find real fix for ps rtl

      ps.isRtl = false;
      return ps;
    };

    _proto._destroyScrollbar = function _destroyScrollbar() {
      if (this.ps) {
        this.ps.destroy();
        this.ps = null;
      }
    };

    _proto._getParents = function _getParents(element, selector) {
      // Element.matches() polyfill
      // if (!Element.prototype.matches) {
      //   Element.prototype.matches =
      //     Element.prototype.matchesSelector ||
      //     Element.prototype.mozMatchesSelector ||
      //     Element.prototype.msMatchesSelector ||
      //     Element.prototype.oMatchesSelector ||
      //     Element.prototype.webkitMatchesSelector ||
      //     function(s) {
      //       var matches = (this.document || this.ownerDocument).querySelectorAll(s),
      //         i = matches.length;
      //       while (--i >= 0 && matches.item(i) !== this) {}
      //       return i > -1;
      //     };
      // }
      // Setup parents array
      var parents = []; // Get matching parent elements

      for (; element && element !== document; element = element.parentNode) {
        // Add matching parents to array
        if (selector) {
          if (element.matches(selector)) {
            parents.push(element);
          }
        } else {
          parents.push(element);
        }
      }

      return parents;
    };

    _proto._setActiveLink = function _setActiveLink() {
      var _this2 = this;

      // eslint-disable-next-line unicorn/prefer-spread
      Array.from(this._element.querySelectorAll(Selector$b.NAV_LINK)).forEach(function (element) {
        var currentUrl;

        if (element.classList.contains(Selector$b.NAV_LINK_QUERIED)) {
          currentUrl = String(window.location);
        } else {
          currentUrl = String(window.location).split('?')[0];
        }

        if (currentUrl.substr(currentUrl.length - 1) === '#') {
          currentUrl = currentUrl.slice(0, -1);
        }

        if (element.href === currentUrl) {
          element.classList.add(ClassName$b.ACTIVE); // eslint-disable-next-line unicorn/prefer-spread

          Array.from(_this2._getParents(element, Selector$b.NAV_DROPDOWN)).forEach(function (element) {
            element.classList.add(ClassName$b.OPEN);
          });
        }
      });
    };

    _proto._addMediaQuery = function _addMediaQuery() {
      var sm = getStyle('--breakpoint-sm');

      if (!sm) {
        return;
      }

      var smValue = parseInt(sm, 10) - 1;
      var mediaQueryList = window.matchMedia("(max-width: " + smValue + "px)");

      this._breakpointTest(mediaQueryList);

      mediaQueryList.addListener(this._breakpointTest);
    };

    _proto._breakpointTest = function _breakpointTest(event) {
      this.mobile = Boolean(event.matches);

      this._toggleClickOut();
    };

    _proto._clickOutListener = function _clickOutListener(event) {
      if (!this._element.contains(event.target)) {
        // or use: event.target.closest(Selector.SIDEBAR) === null
        event.preventDefault();
        event.stopPropagation();

        this._removeClickOut();

        this._element.classList.remove(ClassName$b.SIDEBAR_SHOW);
      }
    };

    _proto._addClickOut = function _addClickOut() {
      document.addEventListener(Event$c.CLICK, this._clickOutListener, true);
    };

    _proto._removeClickOut = function _removeClickOut() {
      document.removeEventListener(Event$c.CLICK, this._clickOutListener, true);
    };

    _proto._toggleClickOut = function _toggleClickOut() {
      if (this.mobile && this._element.classList.contains(ClassName$b.SIDEBAR_SHOW)) {
        this._addClickOut();
      } else {
        this._removeClickOut();
      }
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this3 = this;

      EventHandler.on(this._element, Event$c.CLASS_TOGGLE, function (event) {
        if (event.detail.className === ClassName$b.SIDEBAR_MINIMIZED) {
          _this3._perfectScrollbar(Event$c.TOGGLE);
        }

        if (event.detail.className === ClassName$b.SIDEBAR_SHOW) {
          _this3._toggleClickOut();
        }
      });
      EventHandler.on(this._element, Event$c.CLICK_DATA_API, Selector$b.NAV_DROPDOWN_TOGGLE, function (event) {
        event.preventDefault();

        _this3._toggleDropdown(event);
      });
      EventHandler.on(this._element, Event$c.CLICK_DATA_API, Selector$b.NAV_LINK, function (event) {
        _this3._closeSidebar(event);
      });
    } // Static
    ;

    Sidebar._sidebarInterface = function _sidebarInterface(element, config) {
      var data = Data.getData(element, DATA_KEY$b);

      var _config = typeof config === 'object' && config;

      if (!data) {
        data = new Sidebar(element, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"" + config + "\"");
        }

        data[config]();
      }
    };

    Sidebar._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        Sidebar._sidebarInterface(this, config);
      });
    };

    _createClass(Sidebar, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$b;
      }
    }]);

    return Sidebar;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(window, Event$c.LOAD_DATA_API, function () {
    // eslint-disable-next-line unicorn/prefer-spread
    Array.from(document.querySelectorAll(Selector$b.SIDEBAR)).forEach(function (element) {
      Sidebar._sidebarInterface(element);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
  * add .asyncLoad to jQuery only if jQuery is present
   */

  if (typeof jQuery !== 'undefined') {
    var JQUERY_NO_CONFLICT$b = jQuery.fn[NAME$b];
    jQuery.fn[NAME$b] = Sidebar._jQueryInterface;
    jQuery.fn[NAME$b].Constructor = Sidebar;

    jQuery.fn[NAME$b].noConflict = function () {
      jQuery.fn[NAME$b] = JQUERY_NO_CONFLICT$b;
      return Sidebar._jQueryInterface;
    };
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$c = 'tab';
  var VERSION$c = '3.0.0-alpha.9';
  var DATA_KEY$c = 'coreui.tab';
  var EVENT_KEY$c = "." + DATA_KEY$c;
  var DATA_API_KEY$a = '.data-api';
  var PREFIX$c = window.CoreUIDefaults ? window.CoreUIDefaults.prefix ? window.CoreUIDefaults.prefix : 'c-' : 'c-';
  var Event$d = {
    HIDE: "hide" + EVENT_KEY$c,
    HIDDEN: "hidden" + EVENT_KEY$c,
    SHOW: "show" + EVENT_KEY$c,
    SHOWN: "shown" + EVENT_KEY$c,
    CLICK_DATA_API: "click" + EVENT_KEY$c + DATA_API_KEY$a
  };
  var ClassName$c = {
    DROPDOWN_MENU: PREFIX$c + "dropdown-menu",
    ACTIVE: PREFIX$c + "active",
    DISABLED: 'disabled',
    FADE: PREFIX$c + "fade",
    SHOW: PREFIX$c + "show"
  };
  var Selector$c = {
    DROPDOWN: "." + PREFIX$c + "dropdown",
    NAV_LIST_GROUP: "." + PREFIX$c + "nav, ." + PREFIX$c + "list-group",
    ACTIVE: "." + PREFIX$c + "active",
    ACTIVE_UL: ":scope > li > ." + PREFIX$c + "active",
    DATA_TOGGLE: "[data-toggle=\"" + PREFIX$c + "tab\"], [data-toggle=\"" + PREFIX$c + "pill\"], [data-toggle=\"" + PREFIX$c + "list\"]",
    DROPDOWN_TOGGLE: "." + PREFIX$c + "dropdown-toggle",
    DROPDOWN_ACTIVE_CHILD: ":scope > ." + PREFIX$c + "dropdown-menu ." + PREFIX$c + "active"
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Tab =
  /*#__PURE__*/
  function () {
    function Tab(element) {
      this._element = element;
      Data.setData(this._element, DATA_KEY$c, this);
    } // Getters


    var _proto = Tab.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(ClassName$c.ACTIVE) || this._element.classList.contains(ClassName$c.DISABLED)) {
        return;
      }

      var target;
      var previous;
      var listElement = SelectorEngine.closest(this._element, Selector$c.NAV_LIST_GROUP);
      var selector = getSelectorFromElement(this._element);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? Selector$c.ACTIVE_UL : Selector$c.ACTIVE;
        previous = makeArray(SelectorEngine.find(itemSelector, listElement));
        previous = previous[previous.length - 1];
      }

      var hideEvent = null;

      if (previous) {
        hideEvent = EventHandler.trigger(previous, Event$d.HIDE, {
          relatedTarget: this._element
        });
      }

      var showEvent = EventHandler.trigger(this._element, Event$d.SHOW, {
        relatedTarget: previous
      });

      if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
        return;
      }

      if (selector) {
        target = SelectorEngine.findOne(selector);
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        EventHandler.trigger(previous, Event$d.HIDDEN, {
          relatedTarget: _this._element
        });
        EventHandler.trigger(_this._element, Event$d.SHOWN, {
          relatedTarget: previous
        });
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      Data.removeData(this._element, DATA_KEY$c);
      this._element = null;
    } // Private
    ;

    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine.find(Selector$c.ACTIVE_UL, container) : SelectorEngine.children(container, Selector$c.ACTIVE);
      var active = activeElements[0];
      var isTransitioning = callback && active && active.classList.contains(ClassName$c.FADE);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        var transitionDuration = getTransitionDurationFromElement(active);
        active.classList.remove(ClassName$c.SHOW);
        EventHandler.one(active, TRANSITION_END, complete);
        emulateTransitionEnd(active, transitionDuration);
      } else {
        complete();
      }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        active.classList.remove(ClassName$c.ACTIVE);
        var dropdownChild = SelectorEngine.findOne(Selector$c.DROPDOWN_ACTIVE_CHILD, active.parentNode);

        if (dropdownChild) {
          dropdownChild.classList.remove(ClassName$c.ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      element.classList.add(ClassName$c.ACTIVE);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      reflow(element);

      if (element.classList.contains(ClassName$c.FADE)) {
        element.classList.add(ClassName$c.SHOW);
      }

      if (element.parentNode && element.parentNode.classList.contains(ClassName$c.DROPDOWN_MENU)) {
        var dropdownElement = SelectorEngine.closest(element, Selector$c.DROPDOWN);

        if (dropdownElement) {
          makeArray(SelectorEngine.find(Selector$c.DROPDOWN_TOGGLE)).forEach(function (dropdown) {
            return dropdown.classList.add(ClassName$c.ACTIVE);
          });
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static
    ;

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$c) || new Tab(this);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Tab._getInstance = function _getInstance(element) {
      return Data.getData(element, DATA_KEY$c);
    };

    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$c;
      }
    }]);

    return Tab;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, Event$d.CLICK_DATA_API, Selector$c.DATA_TOGGLE, function (event) {
    event.preventDefault();
    var data = Data.getData(this, DATA_KEY$c) || new Tab(this);
    data.show();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .tab to jQuery only if jQuery is present
   */

  if (typeof jQuery !== 'undefined') {
    var JQUERY_NO_CONFLICT$c = jQuery.fn[NAME$c];
    jQuery.fn[NAME$c] = Tab._jQueryInterface;
    jQuery.fn[NAME$c].Constructor = Tab;

    jQuery.fn[NAME$c].noConflict = function () {
      jQuery.fn[NAME$c] = JQUERY_NO_CONFLICT$c;
      return Tab._jQueryInterface;
    };
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$d = 'toast';
  var VERSION$d = '3.0.0-alpha.9';
  var DATA_KEY$d = 'coreui.toast';
  var EVENT_KEY$d = "." + DATA_KEY$d;
  var PREFIX$d = window.CoreUIDefaults ? window.CoreUIDefaults.prefix ? window.CoreUIDefaults.prefix : 'c-' : 'c-';
  var Event$e = {
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY$d,
    HIDE: "hide" + EVENT_KEY$d,
    HIDDEN: "hidden" + EVENT_KEY$d,
    SHOW: "show" + EVENT_KEY$d,
    SHOWN: "shown" + EVENT_KEY$d
  };
  var ClassName$d = {
    FADE: PREFIX$d + "fade",
    HIDE: PREFIX$d + "hide",
    SHOW: PREFIX$d + "show",
    SHOWING: PREFIX$d + "showing"
  };
  var DefaultType$7 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var Default$a = {
    animation: true,
    autohide: true,
    delay: 500
  };
  var Selector$d = {
    DATA_DISMISS: "[data-dismiss=\"" + PREFIX$d + "toast\"]"
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Toast =
  /*#__PURE__*/
  function () {
    function Toast(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._timeout = null;

      this._setListeners();

      Data.setData(element, DATA_KEY$d, this);
    } // Getters


    var _proto = Toast.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      EventHandler.trigger(this._element, Event$e.SHOW);

      if (this._config.animation) {
        this._element.classList.add(ClassName$d.FADE);
      }

      var complete = function complete() {
        _this._element.classList.remove(ClassName$d.SHOWING);

        _this._element.classList.add(ClassName$d.SHOW);

        EventHandler.trigger(_this._element, Event$e.SHOWN);

        if (_this._config.autohide) {
          _this.hide();
        }
      };

      this._element.classList.remove(ClassName$d.HIDE);

      this._element.classList.add(ClassName$d.SHOWING);

      if (this._config.animation) {
        var transitionDuration = getTransitionDurationFromElement(this._element);
        EventHandler.one(this._element, TRANSITION_END, complete);
        emulateTransitionEnd(this._element, transitionDuration);
      } else {
        complete();
      }
    };

    _proto.hide = function hide(withoutTimeout) {
      var _this2 = this;

      if (!this._element.classList.contains(ClassName$d.SHOW)) {
        return;
      }

      EventHandler.trigger(this._element, Event$e.HIDE);

      if (withoutTimeout) {
        this._close();
      } else {
        this._timeout = setTimeout(function () {
          _this2._close();
        }, this._config.delay);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      this._timeout = null;

      if (this._element.classList.contains(ClassName$d.SHOW)) {
        this._element.classList.remove(ClassName$d.SHOW);
      }

      EventHandler.off(this._element, Event$e.CLICK_DISMISS);
      Data.removeData(this._element, DATA_KEY$d);
      this._element = null;
      this._config = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$a, Manipulator.getDataAttributes(this._element), typeof config === 'object' && config ? config : {});
      typeCheckConfig(NAME$d, config, this.constructor.DefaultType);
      return config;
    };

    _proto._setListeners = function _setListeners() {
      var _this3 = this;

      EventHandler.on(this._element, Event$e.CLICK_DISMISS, Selector$d.DATA_DISMISS, function () {
        return _this3.hide(true);
      });
    };

    _proto._close = function _close() {
      var _this4 = this;

      var complete = function complete() {
        _this4._element.classList.add(ClassName$d.HIDE);

        EventHandler.trigger(_this4._element, Event$e.HIDDEN);
      };

      this._element.classList.remove(ClassName$d.SHOW);

      if (this._config.animation) {
        var transitionDuration = getTransitionDurationFromElement(this._element);
        EventHandler.one(this._element, TRANSITION_END, complete);
        emulateTransitionEnd(this._element, transitionDuration);
      } else {
        complete();
      }
    } // Static
    ;

    Toast._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = Data.getData(this, DATA_KEY$d);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new Toast(this, _config);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](this);
        }
      });
    };

    Toast._getInstance = function _getInstance(element) {
      return Data.getData(element, DATA_KEY$d);
    };

    _createClass(Toast, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$d;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$a;
      }
    }]);

    return Toast;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   *  add .toast to jQuery only if jQuery is present
   */


  if (typeof jQuery !== 'undefined') {
    var JQUERY_NO_CONFLICT$d = jQuery.fn[NAME$d];
    jQuery.fn[NAME$d] = Toast._jQueryInterface;
    jQuery.fn[NAME$d].Constructor = Toast;

    jQuery.fn[NAME$d].noConflict = function () {
      jQuery.fn[NAME$d] = JQUERY_NO_CONFLICT$d;
      return Toast._jQueryInterface;
    };
  }

  /**
   * --------------------------------------------------------------------------
   * CoreUI Utilities (v3.0.0-alpha.9): hex-to-rgb.js
   * Licensed under MIT (https://coreui.io/license)
   * --------------------------------------------------------------------------
   */

  /* eslint-disable no-magic-numbers */
  var hexToRgb = function hexToRgb(color) {
    if (typeof color === 'undefined') {
      throw new TypeError('Hex color is not defined');
    }

    var hex = color.match(/^#(?:[0-9a-f]{3}){1,2}$/i);

    if (!hex) {
      throw new Error(color + " is not a valid hex color");
    }

    var r;
    var g;
    var b;

    if (color.length === 7) {
      r = parseInt(color.substring(1, 3), 16);
      g = parseInt(color.substring(3, 5), 16);
      b = parseInt(color.substring(5, 7), 16);
    } else {
      r = parseInt(color.substring(1, 2), 16);
      g = parseInt(color.substring(2, 3), 16);
      b = parseInt(color.substring(3, 5), 16);
    }

    return "rgba(" + r + ", " + g + ", " + b + ")";
  };

  /**
   * --------------------------------------------------------------------------
   * CoreUI Utilities (v3.0.0-alpha.9): hex-to-rgba.js
   * Licensed under MIT (https://coreui.io/license)
   * --------------------------------------------------------------------------
   */

  /* eslint-disable no-magic-numbers */
  var hexToRgba = function hexToRgba(color, opacity) {
    if (opacity === void 0) {
      opacity = 100;
    }

    if (typeof color === 'undefined') {
      throw new TypeError('Hex color is not defined');
    }

    var hex = color.match(/^#(?:[0-9a-f]{3}){1,2}$/i);

    if (!hex) {
      throw new Error(color + " is not a valid hex color");
    }

    var r;
    var g;
    var b;

    if (color.length === 7) {
      r = parseInt(color.substring(1, 3), 16);
      g = parseInt(color.substring(3, 5), 16);
      b = parseInt(color.substring(5, 7), 16);
    } else {
      r = parseInt(color.substring(1, 2), 16);
      g = parseInt(color.substring(2, 3), 16);
      b = parseInt(color.substring(3, 5), 16);
    }

    return "rgba(" + r + ", " + g + ", " + b + ", " + opacity / 100 + ")";
  };

  /**
   * --------------------------------------------------------------------------
   * CoreUI (v3.0.0-alpha.9): rgb-to-hex.js
   * Licensed under MIT (https://coreui.io/license)
   * --------------------------------------------------------------------------
   */

  /* eslint-disable no-magic-numbers */
  var rgbToHex = function rgbToHex(color) {
    if (typeof color === 'undefined') {
      throw new TypeError('Hex color is not defined');
    }

    if (color === 'transparent') {
      return '#00000000';
    }

    var rgb = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

    if (!rgb) {
      throw new Error(color + " is not a valid rgb color");
    }

    var r = "0" + parseInt(rgb[1], 10).toString(16);
    var g = "0" + parseInt(rgb[2], 10).toString(16);
    var b = "0" + parseInt(rgb[3], 10).toString(16);
    return "#" + r.slice(-2) + g.slice(-2) + b.slice(-2);
  };

  /**
   * --------------------------------------------------------------------------
   * CoreUI (v3.0.0-alpha.9): index.umd.js
   * Licensed under MIT (https://coreui.io/license)
   * --------------------------------------------------------------------------
   */
  var index_umd = {
    AsyncLoad: AsyncLoad,
    Alert: Alert,
    Button: Button,
    Carousel: Carousel,
    ClassToggler: ClassToggler,
    Collapse: Collapse,
    Dropdown: Dropdown,
    Modal: Modal,
    Popover: Popover,
    Scrollspy: ScrollSpy,
    Sidebar: Sidebar,
    Tab: Tab,
    Toast: Toast,
    Tooltip: Tooltip // Global functions

  };
  window.getStyle = getStyle;
  window.hexToRgb = hexToRgb;
  window.hexToRgba = hexToRgba;
  window.rgbToHex = rgbToHex;

  return index_umd;

}));
//# sourceMappingURL=coreui.js.map
