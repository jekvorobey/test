Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault(ex) {
    return ex && typeof ex === 'object' && 'default' in ex ? ex.default : ex;
}

const he = _interopDefault(require('he'));

/*  */

const emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef(v) {
    return v === undefined || v === null;
}

function isDef(v) {
    return v !== undefined && v !== null;
}

function isTrue(v) {
    return v === true;
}

function isFalse(v) {
    return v === false;
}

/**
 * Check if value is primitive.
 */
function isPrimitive(value) {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        // $flow-disable-line
        typeof value === 'symbol' ||
        typeof value === 'boolean'
    );
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
const _toString = Object.prototype.toString;

function toRawType(value) {
    return _toString.call(value).slice(8, -1);
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject(obj) {
    return _toString.call(obj) === '[object Object]';
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex(val) {
    const n = parseFloat(String(val));
    return n >= 0 && Math.floor(n) === n && isFinite(val);
}

function isPromise(val) {
    return isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function';
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString(val) {
    return val == null
        ? ''
        : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
        ? JSON.stringify(val, null, 2)
        : String(val);
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber(val) {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap(str, expectsLowerCase) {
    const map = Object.create(null);
    const list = str.split(',');
    for (let i = 0; i < list.length; i++) {
        map[list[i]] = true;
    }
    return expectsLowerCase
        ? function(val) {
              return map[val.toLowerCase()];
          }
        : function(val) {
              return map[val];
          };
}

/**
 * Check if a tag is a built-in tag.
 */
const isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
const isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove(arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item);
        if (index > -1) {
            return arr.splice(index, 1);
        }
    }
}

/**
 * Check whether an object has the property.
 */
const { hasOwnProperty } = Object.prototype;
function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
    const cache = Object.create(null);
    return function cachedFn(str) {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    };
}

/**
 * Camelize a hyphen-delimited string.
 */
const camelizeRE = /-(\w)/g;
const camelize = cached(function(str) {
    return str.replace(camelizeRE, function(_, c) {
        return c ? c.toUpperCase() : '';
    });
});

/**
 * Capitalize a string.
 */
const capitalize = cached(function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
});

/**
 * Hyphenate a camelCase string.
 */
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cached(function(str) {
    return str.replace(hyphenateRE, '-$1').toLowerCase();
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind(fn, ctx) {
    function boundFn(a) {
        const l = arguments.length;
        return l ? (l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a)) : fn.call(ctx);
    }

    boundFn._length = fn.length;
    return boundFn;
}

function nativeBind(fn, ctx) {
    return fn.bind(ctx);
}

const bind = Function.prototype.bind ? nativeBind : polyfillBind;

/**
 * Mix properties into target object.
 */
function extend(to, _from) {
    for (const key in _from) {
        to[key] = _from[key];
    }
    return to;
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject(arr) {
    const res = {};
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            extend(res, arr[i]);
        }
    }
    return res;
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop(a, b, c) {}

/**
 * Always return false.
 */
const no = function(a, b, c) {
    return false;
};

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
const identity = function(_) {
    return _;
};

/**
 * Generate a string containing static keys from compiler modules.
 */
function genStaticKeys(modules) {
    return modules
        .reduce(function(keys, m) {
            return keys.concat(m.staticKeys || []);
        }, [])
        .join(',');
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual(a, b) {
    if (a === b) {
        return true;
    }
    const isObjectA = isObject(a);
    const isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
        try {
            const isArrayA = Array.isArray(a);
            const isArrayB = Array.isArray(b);
            if (isArrayA && isArrayB) {
                return (
                    a.length === b.length &&
                    a.every(function(e, i) {
                        return looseEqual(e, b[i]);
                    })
                );
            }
            if (a instanceof Date && b instanceof Date) {
                return a.getTime() === b.getTime();
            }
            if (!isArrayA && !isArrayB) {
                const keysA = Object.keys(a);
                const keysB = Object.keys(b);
                return (
                    keysA.length === keysB.length &&
                    keysA.every(function(key) {
                        return looseEqual(a[key], b[key]);
                    })
                );
            }
            /* istanbul ignore next */
            return false;
        } catch (e) {
            /* istanbul ignore next */
            return false;
        }
    } else if (!isObjectA && !isObjectB) {
        return String(a) === String(b);
    } else {
        return false;
    }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf(arr, val) {
    for (let i = 0; i < arr.length; i++) {
        if (looseEqual(arr[i], val)) {
            return i;
        }
    }
    return -1;
}

/**
 * Ensure a function is called only once.
 */
function once(fn) {
    let called = false;
    return function() {
        if (!called) {
            called = true;
            fn.apply(this, arguments);
        }
    };
}

/*  */

const isAttr = makeMap(
    'accept,accept-charset,accesskey,action,align,alt,async,autocomplete,' +
        'autofocus,autoplay,autosave,bgcolor,border,buffered,challenge,charset,' +
        'checked,cite,class,code,codebase,color,cols,colspan,content,http-equiv,' +
        'name,contenteditable,contextmenu,controls,coords,data,datetime,default,' +
        'defer,dir,dirname,disabled,download,draggable,dropzone,enctype,method,for,' +
        'form,formaction,headers,height,hidden,high,href,hreflang,http-equiv,' +
        'icon,id,ismap,itemprop,keytype,kind,label,lang,language,list,loop,low,' +
        'manifest,max,maxlength,media,method,GET,POST,min,multiple,email,file,' +
        'muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,' +
        'preload,radiogroup,readonly,rel,required,reversed,rows,rowspan,sandbox,' +
        'scope,scoped,seamless,selected,shape,size,type,text,password,sizes,span,' +
        'spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,' +
        'target,title,type,usemap,value,width,wrap'
);

const unsafeAttrCharRE = /[\u0009\u000a\u000c "'/=>]/; // eslint-disable-line no-control-regex
const isSSRUnsafeAttr = function(name) {
    return unsafeAttrCharRE.test(name);
};

/* istanbul ignore next */
const isRenderableAttr = function(name) {
    return isAttr(name) || name.indexOf('data-') === 0 || name.indexOf('aria-') === 0;
};

const propsToAttrMap = {
    acceptCharset: 'accept-charset',
    className: 'class',
    htmlFor: 'for',
    httpEquiv: 'http-equiv',
};

const ESC = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '&': '&amp;',
};

function escape(s) {
    return s.replace(/["&<>]/g, escapeChar);
}

function escapeChar(a) {
    return ESC[a] || a;
}

const noUnitNumericStyleProps = {
    'animation-iteration-count': true,
    'border-image-outset': true,
    'border-image-slice': true,
    'border-image-width': true,
    'box-flex': true,
    'box-flex-group': true,
    'box-ordinal-group': true,
    'column-count': true,
    columns: true,
    flex: true,
    'flex-grow': true,
    'flex-positive': true,
    'flex-shrink': true,
    'flex-negative': true,
    'flex-order': true,
    'grid-row': true,
    'grid-row-end': true,
    'grid-row-span': true,
    'grid-row-start': true,
    'grid-column': true,
    'grid-column-end': true,
    'grid-column-span': true,
    'grid-column-start': true,
    'font-weight': true,
    'line-clamp': true,
    'line-height': true,
    opacity: true,
    order: true,
    orphans: true,
    'tab-size': true,
    widows: true,
    'z-index': true,
    zoom: true,
    // SVG
    'fill-opacity': true,
    'flood-opacity': true,
    'stop-opacity': true,
    'stroke-dasharray': true,
    'stroke-dashoffset': true,
    'stroke-miterlimit': true,
    'stroke-opacity': true,
    'stroke-width': true,
};

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
const isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
const acceptValue = makeMap('input,textarea,option,select,progress');
const mustUseProp = function(tag, type, attr) {
    return (
        (attr === 'value' && acceptValue(tag) && type !== 'button') ||
        (attr === 'selected' && tag === 'option') ||
        (attr === 'checked' && tag === 'input') ||
        (attr === 'muted' && tag === 'video')
    );
};

const isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

const isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

const convertEnumeratedValue = function(key, value) {
    return isFalsyAttrValue(value) || value === 'false'
        ? 'false'
        : // allow arbitrary string value for contenteditable
        key === 'contenteditable' && isValidContentEditableValue(value)
        ? value
        : 'true';
};

const isBooleanAttr = makeMap(
    'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
        'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
        'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
        'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
        'required,reversed,scoped,seamless,selected,sortable,translate,' +
        'truespeed,typemustmatch,visible'
);

var isFalsyAttrValue = function(val) {
    return val == null || val === false;
};

/*  */

function renderAttrs(node) {
    let { attrs } = node.data;
    let res = '';

    const opts = node.parent && node.parent.componentOptions;
    if (isUndef(opts) || opts.Ctor.options.inheritAttrs !== false) {
        let { parent } = node;
        while (isDef(parent)) {
            if (isDef(parent.data) && isDef(parent.data.attrs)) {
                attrs = extend(extend({}, attrs), parent.data.attrs);
            }
            parent = parent.parent;
        }
    }

    if (isUndef(attrs)) {
        return res;
    }

    for (const key in attrs) {
        if (isSSRUnsafeAttr(key)) {
            continue;
        }
        if (key === 'style') {
            // leave it to the style module
            continue;
        }
        res += renderAttr(key, attrs[key]);
    }
    return res;
}

function renderAttr(key, value) {
    if (isBooleanAttr(key)) {
        if (!isFalsyAttrValue(value)) {
            return ` ${key}="${key}"`;
        }
    } else if (isEnumeratedAttr(key)) {
        return ` ${key}="${escape(convertEnumeratedValue(key, value))}"`;
    } else if (!isFalsyAttrValue(value)) {
        return ` ${key}="${escape(String(value))}"`;
    }
    return '';
}

/*  */

const VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.ns = undefined;
    this.context = context;
    this.fnContext = undefined;
    this.fnOptions = undefined;
    this.fnScopeId = undefined;
    this.key = data && data.key;
    this.componentOptions = componentOptions;
    this.componentInstance = undefined;
    this.parent = undefined;
    this.raw = false;
    this.isStatic = false;
    this.isRootInsert = true;
    this.isComment = false;
    this.isCloned = false;
    this.isOnce = false;
    this.asyncFactory = asyncFactory;
    this.asyncMeta = undefined;
    this.isAsyncPlaceholder = false;
};

const prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function() {
    return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

const createEmptyVNode = function(text) {
    if (text === void 0) text = '';

    const node = new VNode();
    node.text = text;
    node.isComment = true;
    return node;
};

function createTextVNode(val) {
    return new VNode(undefined, undefined, undefined, String(val));
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode(vnode) {
    const cloned = new VNode(
        vnode.tag,
        vnode.data,
        // #7975
        // clone children array to avoid mutating original in case of cloning
        // a child.
        vnode.children && vnode.children.slice(),
        vnode.text,
        vnode.elm,
        vnode.context,
        vnode.componentOptions,
        vnode.asyncFactory
    );
    cloned.ns = vnode.ns;
    cloned.isStatic = vnode.isStatic;
    cloned.key = vnode.key;
    cloned.isComment = vnode.isComment;
    cloned.fnContext = vnode.fnContext;
    cloned.fnOptions = vnode.fnOptions;
    cloned.fnScopeId = vnode.fnScopeId;
    cloned.asyncMeta = vnode.asyncMeta;
    cloned.isCloned = true;
    return cloned;
}

/*  */

function renderDOMProps(node) {
    let props = node.data.domProps;
    let res = '';

    let { parent } = node;
    while (isDef(parent)) {
        if (parent.data && parent.data.domProps) {
            props = extend(extend({}, props), parent.data.domProps);
        }
        parent = parent.parent;
    }

    if (isUndef(props)) {
        return res;
    }

    const { attrs } = node.data;
    for (const key in props) {
        if (key === 'innerHTML') {
            setText(node, props[key], true);
        } else if (key === 'textContent') {
            setText(node, props[key], false);
        } else if (key === 'value' && node.tag === 'textarea') {
            setText(node, props[key], false);
        } else {
            // $flow-disable-line (WTF?)
            const attr = propsToAttrMap[key] || key.toLowerCase();
            if (
                isRenderableAttr(attr) &&
                // avoid rendering double-bound props/attrs twice
                !(isDef(attrs) && isDef(attrs[attr]))
            ) {
                res += renderAttr(attr, props[key]);
            }
        }
    }
    return res;
}

function setText(node, text, raw) {
    const child = new VNode(undefined, undefined, undefined, text);
    child.raw = raw;
    node.children = [child];
}

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Define a property.
 */
function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true,
    });
}

/*  */

// can we use __proto__?
const hasProto = '__proto__' in {};

// Browser environment sniffing
const inBrowser = typeof window !== 'undefined';
const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
const UA = inBrowser && window.navigator.userAgent.toLowerCase();
const isIE = UA && /msie|trident/.test(UA);
const isIE9 = UA && UA.indexOf('msie 9.0') > 0;
const isEdge = UA && UA.indexOf('edge/') > 0;
const isAndroid = (UA && UA.indexOf('android') > 0) || weexPlatform === 'android';
const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || weexPlatform === 'ios';
const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
const isPhantomJS = UA && /phantomjs/.test(UA);
const isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
const nativeWatch = {}.watch;
if (inBrowser) {
    try {
        const opts = {};
        Object.defineProperty(opts, 'passive', {
            get: function get() {},
        }); // https://github.com/facebook/flow/issues/285
        window.addEventListener('test-passive', null, opts);
    } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
let _isServer;
const isServerRendering = function() {
    if (_isServer === undefined) {
        /* istanbul ignore if */
        if (!inBrowser && !inWeex && typeof global !== 'undefined') {
            // detect presence of vue-server-renderer and avoid
            // Webpack shimming the process
            _isServer = global.process && global.process.env.VUE_ENV === 'server';
        } else {
            _isServer = false;
        }
    }
    return _isServer;
};

// detect devtools
const devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative(Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

const hasSymbol =
    typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

let _Set; // $flow-disable-line
/* istanbul ignore if */ if (typeof Set !== 'undefined' && isNative(Set)) {
    // use native Set when available.
    _Set = Set;
} else {
    // a non-standard Set polyfill that only works with primitive keys.
    _Set = /* @__PURE__ */ (function() {
        function Set() {
            this.set = Object.create(null);
        }
        Set.prototype.has = function has(key) {
            return this.set[key] === true;
        };
        Set.prototype.add = function add(key) {
            this.set[key] = true;
        };
        Set.prototype.clear = function clear() {
            this.set = Object.create(null);
        };

        return Set;
    })();
}

const SSR_ATTR = 'data-server-rendered';

const ASSET_TYPES = ['component', 'directive', 'filter'];

const LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated',
    'errorCaptured',
    'serverPrefetch',
];

/*  */

const config = {
    /**
     * Option merge strategies (used in core/util/options)
     */
    // $flow-disable-line
    optionMergeStrategies: Object.create(null),

    /**
     * Whether to suppress warnings.
     */
    silent: false,

    /**
     * Show production mode tip message on boot?
     */
    productionTip: 'development' !== 'production',

    /**
     * Whether to enable devtools
     */
    devtools: 'development' !== 'production',

    /**
     * Whether to record perf
     */
    performance: false,

    /**
     * Error handler for watcher errors
     */
    errorHandler: null,

    /**
     * Warn handler for watcher warns
     */
    warnHandler: null,

    /**
     * Ignore certain custom elements
     */
    ignoredElements: [],

    /**
     * Custom user key aliases for v-on
     */
    // $flow-disable-line
    keyCodes: Object.create(null),

    /**
     * Check if a tag is reserved so that it cannot be registered as a
     * component. This is platform-dependent and may be overwritten.
     */
    isReservedTag: no,

    /**
     * Check if an attribute is reserved so that it cannot be used as a component
     * prop. This is platform-dependent and may be overwritten.
     */
    isReservedAttr: no,

    /**
     * Check if a tag is an unknown element.
     * Platform-dependent.
     */
    isUnknownElement: no,

    /**
     * Get the namespace of an element
     */
    getTagNamespace: noop,

    /**
     * Parse the real tag name for the specific platform.
     */
    parsePlatformTagName: identity,

    /**
     * Check if an attribute must be bound using property, e.g. value
     * Platform-dependent.
     */
    mustUseProp: no,

    /**
     * Perform updates asynchronously. Intended to be used by Vue Test Utils
     * This will significantly reduce performance if set to false.
     */
    async: true,

    /**
     * Exposed for legacy reasons
     */
    _lifecycleHooks: LIFECYCLE_HOOKS,
};

/*  */

let warn = noop;
let tip = noop;
let generateComponentTrace = noop; // work around flow check
let formatComponentName = noop;

{
    const hasConsole = typeof console !== 'undefined';
    const classifyRE = /(?:^|[-_])(\w)/g;
    const classify = function(str) {
        return str
            .replace(classifyRE, function(c) {
                return c.toUpperCase();
            })
            .replace(/[-_]/g, '');
    };

    warn = function(msg, vm) {
        const trace = vm ? generateComponentTrace(vm) : '';

        if (hasConsole && !config.silent) {
            console.error(`[Vue warn]: ${msg}${trace}`);
        }
    };

    tip = function(msg, vm) {
        if (hasConsole && !config.silent) {
            console.warn(`[Vue tip]: ${msg}${vm ? generateComponentTrace(vm) : ''}`);
        }
    };

    formatComponentName = function(vm, includeFile) {
        if (vm.$root === vm) {
            return '<Root>';
        }
        const options =
            typeof vm === 'function' && vm.cid != null
                ? vm.options
                : vm._isVue
                ? vm.$options || vm.constructor.options
                : vm;
        let name = options.name || options._componentTag;
        const file = options.__file;
        if (!name && file) {
            const match = file.match(/([^/\\]+)\.vue$/);
            name = match && match[1];
        }

        return (name ? `<${classify(name)}>` : '<Anonymous>') + (file && includeFile !== false ? ` at ${file}` : '');
    };

    const repeat = function(str, n) {
        let res = '';
        while (n) {
            if (n % 2 === 1) {
                res += str;
            }
            if (n > 1) {
                str += str;
            }
            n >>= 1;
        }
        return res;
    };

    generateComponentTrace = function(vm) {
        if (vm._isVue && vm.$parent) {
            const tree = [];
            let currentRecursiveSequence = 0;
            while (vm) {
                if (tree.length > 0) {
                    const last = tree[tree.length - 1];
                    if (last.constructor === vm.constructor) {
                        currentRecursiveSequence++;
                        vm = vm.$parent;
                        continue;
                    } else if (currentRecursiveSequence > 0) {
                        tree[tree.length - 1] = [last, currentRecursiveSequence];
                        currentRecursiveSequence = 0;
                    }
                }
                tree.push(vm);
                vm = vm.$parent;
            }
            return `\n\nfound in\n\n${tree
                .map(function(vm, i) {
                    return `${
                        i === 0 ? '---> ' : repeat(' ', 5 + i * 2)
                    }${Array.isArray(vm) ? `${formatComponentName(vm[0])}... (${vm[1]} recursive calls)` : formatComponentName(vm)}`;
                })
                .join('\n')}`;
        }
        return `\n\n(found in ${formatComponentName(vm)})`;
    };
}

/*  */

let uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
const Dep = function Dep() {
    this.id = uid++;
    this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
    this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
    remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
    if (Dep.target) {
        Dep.target.addDep(this);
    }
};

Dep.prototype.notify = function notify() {
    // stabilize the subscriber list first
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
        subs[i].update();
    }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
const targetStack = [];

function pushTarget(target) {
    targetStack.push(target);
    Dep.target = target;
}

function popTarget() {
    targetStack.pop();
    Dep.target = targetStack[targetStack.length - 1];
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);

const methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function(method) {
    // cache original method
    const original = arrayProto[method];
    def(arrayMethods, method, function mutator() {
        const args = [];
        let len = arguments.length;
        while (len--) args[len] = arguments[len];

        const result = original.apply(this, args);
        const ob = this.__ob__;
        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2);
                break;
        }
        if (inserted) {
            ob.observeArray(inserted);
        }
        // notify change
        ob.dep.notify();
        return result;
    });
});

/*  */

const arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
let shouldObserve = true;

function toggleObserving(value) {
    shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
const Observer = function Observer(value) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    def(value, '__ob__', this);
    if (Array.isArray(value)) {
        if (hasProto) {
            protoAugment(value, arrayMethods);
        } else {
            copyAugment(value, arrayMethods, arrayKeys);
        }
        this.observeArray(value);
    } else {
        this.walk(value);
    }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        defineReactive$$1(obj, keys[i]);
    }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray(items) {
    for (let i = 0, l = items.length; i < l; i++) {
        observe(items[i]);
    }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment(target, src) {
    /* eslint-disable no-proto */
    target.__proto__ = src;
    /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment(target, src, keys) {
    for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        def(target, key, src[key]);
    }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe(value, asRootData) {
    if (!isObject(value) || value instanceof VNode) {
        return;
    }
    let ob;
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__;
    } else if (
        shouldObserve &&
        !isServerRendering() &&
        (Array.isArray(value) || isPlainObject(value)) &&
        Object.isExtensible(value) &&
        !value._isVue
    ) {
        ob = new Observer(value);
    }
    if (asRootData && ob) {
        ob.vmCount++;
    }
    return ob;
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1(obj, key, val, customSetter, shallow) {
    const dep = new Dep();

    const property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
        return;
    }

    // cater for pre-defined getter/setters
    const getter = property && property.get;
    const setter = property && property.set;
    if ((!getter || setter) && arguments.length === 2) {
        val = obj[key];
    }

    let childOb = !shallow && observe(val);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            const value = getter ? getter.call(obj) : val;
            if (Dep.target) {
                dep.depend();
                if (childOb) {
                    childOb.dep.depend();
                    if (Array.isArray(value)) {
                        dependArray(value);
                    }
                }
            }
            return value;
        },
        set: function reactiveSetter(newVal) {
            const value = getter ? getter.call(obj) : val;
            /* eslint-disable no-self-compare */
            if (newVal === value || (newVal !== newVal && value !== value)) {
                return;
            }
            /* eslint-enable no-self-compare */
            if (customSetter) {
                customSetter();
            }
            // #7981: for accessor properties without setter
            if (getter && !setter) {
                return;
            }
            if (setter) {
                setter.call(obj, newVal);
            } else {
                val = newVal;
            }
            childOb = !shallow && observe(newVal);
            dep.notify();
        },
    });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set(target, key, val) {
    if (isUndef(target) || isPrimitive(target)) {
        warn(`Cannot set reactive property on undefined, null, or primitive value: ${target}`);
    }
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, key);
        target.splice(key, 1, val);
        return val;
    }
    if (key in target && !(key in Object.prototype)) {
        target[key] = val;
        return val;
    }
    const ob = target.__ob__;
    if (target._isVue || (ob && ob.vmCount)) {
        warn(
            'Avoid adding reactive properties to a Vue instance or its root $data ' +
                'at runtime - declare it upfront in the data option.'
        );
        return val;
    }
    if (!ob) {
        target[key] = val;
        return val;
    }
    defineReactive$$1(ob.value, key, val);
    ob.dep.notify();
    return val;
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray(value) {
    for (let e = void 0, i = 0, l = value.length; i < l; i++) {
        e = value[i];
        e && e.__ob__ && e.__ob__.dep.depend();
        if (Array.isArray(e)) {
            dependArray(e);
        }
    }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
const strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
{
    strats.el = strats.propsData = function(parent, child, vm, key) {
        if (!vm) {
            warn(`option "${key}" can only be used during instance ` + `creation with the \`new\` keyword.`);
        }
        return defaultStrat(parent, child);
    };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData(to, from) {
    if (!from) {
        return to;
    }
    let key;
    let toVal;
    let fromVal;

    const keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);

    for (let i = 0; i < keys.length; i++) {
        key = keys[i];
        // in case the object is already observed...
        if (key === '__ob__') {
            continue;
        }
        toVal = to[key];
        fromVal = from[key];
        if (!hasOwn(to, key)) {
            set(to, key, fromVal);
        } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
            mergeData(toVal, fromVal);
        }
    }
    return to;
}

/**
 * Data
 */
function mergeDataOrFn(parentVal, childVal, vm) {
    if (!vm) {
        // in a Vue.extend merge, both should be functions
        if (!childVal) {
            return parentVal;
        }
        if (!parentVal) {
            return childVal;
        }
        // when parentVal & childVal are both present,
        // we need to return a function that returns the
        // merged result of both functions... no need to
        // check if parentVal is a function here because
        // it has to be a function to pass previous merges.
        return function mergedDataFn() {
            return mergeData(
                typeof childVal === 'function' ? childVal.call(this, this) : childVal,
                typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
            );
        };
    }
    return function mergedInstanceDataFn() {
        // instance merge
        const instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
        const defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal;
        if (instanceData) {
            return mergeData(instanceData, defaultData);
        }
        return defaultData;
    };
}

strats.data = function(parentVal, childVal, vm) {
    if (!vm) {
        if (childVal && typeof childVal !== 'function') {
            warn(
                'The "data" option should be a function ' +
                    'that returns a per-instance value in component ' +
                    'definitions.',
                vm
            );

            return parentVal;
        }
        return mergeDataOrFn(parentVal, childVal);
    }

    return mergeDataOrFn(parentVal, childVal, vm);
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook(parentVal, childVal) {
    const res = childVal
        ? parentVal
            ? parentVal.concat(childVal)
            : Array.isArray(childVal)
            ? childVal
            : [childVal]
        : parentVal;
    return res ? dedupeHooks(res) : res;
}

function dedupeHooks(hooks) {
    const res = [];
    for (let i = 0; i < hooks.length; i++) {
        if (res.indexOf(hooks[i]) === -1) {
            res.push(hooks[i]);
        }
    }
    return res;
}

LIFECYCLE_HOOKS.forEach(function(hook) {
    strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets(parentVal, childVal, vm, key) {
    const res = Object.create(parentVal || null);
    if (childVal) {
        assertObjectType(key, childVal, vm);
        return extend(res, childVal);
    }
    return res;
}

ASSET_TYPES.forEach(function(type) {
    strats[`${type}s`] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function(parentVal, childVal, vm, key) {
    // work around Firefox's Object.prototype.watch...
    if (parentVal === nativeWatch) {
        parentVal = undefined;
    }
    if (childVal === nativeWatch) {
        childVal = undefined;
    }
    /* istanbul ignore if */
    if (!childVal) {
        return Object.create(parentVal || null);
    }
    {
        assertObjectType(key, childVal, vm);
    }
    if (!parentVal) {
        return childVal;
    }
    const ret = {};
    extend(ret, parentVal);
    for (const key$1 in childVal) {
        let parent = ret[key$1];
        const child = childVal[key$1];
        if (parent && !Array.isArray(parent)) {
            parent = [parent];
        }
        ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
    }
    return ret;
};

/**
 * Other object hashes.
 */
strats.props = strats.methods = strats.inject = strats.computed = function(parentVal, childVal, vm, key) {
    if (childVal && 'development' !== 'production') {
        assertObjectType(key, childVal, vm);
    }
    if (!parentVal) {
        return childVal;
    }
    const ret = Object.create(null);
    extend(ret, parentVal);
    if (childVal) {
        extend(ret, childVal);
    }
    return ret;
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function(parentVal, childVal) {
    return childVal === undefined ? parentVal : childVal;
};

/**
 * Validate component names
 */
function checkComponents(options) {
    for (const key in options.components) {
        validateComponentName(key);
    }
}

function validateComponentName(name) {
    if (!new RegExp(`^[a-zA-Z][\\-\\.0-9_${unicodeRegExp.source}]*$`).test(name)) {
        warn(
            `Invalid component name: "${name}". Component names ` +
                `should conform to valid custom element name in html5 specification.`
        );
    }
    if (isBuiltInTag(name) || config.isReservedTag(name)) {
        warn(`${'Do not use built-in or reserved HTML elements as component ' + 'id: '}${name}`);
    }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps(options, vm) {
    const { props } = options;
    if (!props) {
        return;
    }
    const res = {};
    let i;
    let val;
    let name;
    if (Array.isArray(props)) {
        i = props.length;
        while (i--) {
            val = props[i];
            if (typeof val === 'string') {
                name = camelize(val);
                res[name] = { type: null };
            } else {
                warn('props must be strings when using array syntax.');
            }
        }
    } else if (isPlainObject(props)) {
        for (const key in props) {
            val = props[key];
            name = camelize(key);
            res[name] = isPlainObject(val) ? val : { type: val };
        }
    } else {
        warn(
            `${'Invalid value for option "props": expected an Array or an Object, ' + 'but got '}${toRawType(props)}.`,
            vm
        );
    }
    options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject(options, vm) {
    const { inject } = options;
    if (!inject) {
        return;
    }
    const normalized = (options.inject = {});
    if (Array.isArray(inject)) {
        for (let i = 0; i < inject.length; i++) {
            normalized[inject[i]] = { from: inject[i] };
        }
    } else if (isPlainObject(inject)) {
        for (const key in inject) {
            const val = inject[key];
            normalized[key] = isPlainObject(val) ? extend({ from: key }, val) : { from: val };
        }
    } else {
        warn(
            `${'Invalid value for option "inject": expected an Array or an Object, ' + 'but got '}${toRawType(
                inject
            )}.`,
            vm
        );
    }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives(options) {
    const dirs = options.directives;
    if (dirs) {
        for (const key in dirs) {
            const def$$1 = dirs[key];
            if (typeof def$$1 === 'function') {
                dirs[key] = { bind: def$$1, update: def$$1 };
            }
        }
    }
}

function assertObjectType(name, value, vm) {
    if (!isPlainObject(value)) {
        warn(`Invalid value for option "${name}": expected an Object, ` + `but got ${toRawType(value)}.`, vm);
    }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions(parent, child, vm) {
    {
        checkComponents(child);
    }

    if (typeof child === 'function') {
        child = child.options;
    }

    normalizeProps(child, vm);
    normalizeInject(child, vm);
    normalizeDirectives(child);

    // Apply extends and mixins on the child options,
    // but only if it is a raw options object that isn't
    // the result of another mergeOptions call.
    // Only merged options has the _base property.
    if (!child._base) {
        if (child.extends) {
            parent = mergeOptions(parent, child.extends, vm);
        }
        if (child.mixins) {
            for (let i = 0, l = child.mixins.length; i < l; i++) {
                parent = mergeOptions(parent, child.mixins[i], vm);
            }
        }
    }

    const options = {};
    let key;
    for (key in parent) {
        mergeField(key);
    }
    for (key in child) {
        if (!hasOwn(parent, key)) {
            mergeField(key);
        }
    }
    function mergeField(key) {
        const strat = strats[key] || defaultStrat;
        options[key] = strat(parent[key], child[key], vm, key);
    }
    return options;
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset(options, type, id, warnMissing) {
    /* istanbul ignore if */
    if (typeof id !== 'string') {
        return;
    }
    const assets = options[type];
    // check local registration variations first
    if (hasOwn(assets, id)) {
        return assets[id];
    }
    const camelizedId = camelize(id);
    if (hasOwn(assets, camelizedId)) {
        return assets[camelizedId];
    }
    const PascalCaseId = capitalize(camelizedId);
    if (hasOwn(assets, PascalCaseId)) {
        return assets[PascalCaseId];
    }
    // fallback to prototype chain
    const res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
    if (warnMissing && !res) {
        warn(`Failed to resolve ${type.slice(0, -1)}: ${id}`, options);
    }
    return res;
}

/*  */

function validateProp(key, propOptions, propsData, vm) {
    const prop = propOptions[key];
    const absent = !hasOwn(propsData, key);
    let value = propsData[key];
    // boolean casting
    const booleanIndex = getTypeIndex(Boolean, prop.type);
    if (booleanIndex > -1) {
        if (absent && !hasOwn(prop, 'default')) {
            value = false;
        } else if (value === '' || value === hyphenate(key)) {
            // only cast empty string / same name to boolean if
            // boolean has higher priority
            const stringIndex = getTypeIndex(String, prop.type);
            if (stringIndex < 0 || booleanIndex < stringIndex) {
                value = true;
            }
        }
    }
    // check default value
    if (value === undefined) {
        value = getPropDefaultValue(vm, prop, key);
        // since the default value is a fresh copy,
        // make sure to observe it.
        const prevShouldObserve = shouldObserve;
        toggleObserving(true);
        observe(value);
        toggleObserving(prevShouldObserve);
    }
    {
        assertProp(prop, key, value, vm, absent);
    }
    return value;
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue(vm, prop, key) {
    // no default, return undefined
    if (!hasOwn(prop, 'default')) {
        return undefined;
    }
    const def = prop.default;
    // warn against non-factory defaults for Object & Array
    if (isObject(def)) {
        warn(
            `Invalid default value for prop "${key}": ` +
                `Props with type Object/Array must use a factory function ` +
                `to return the default value.`,
            vm
        );
    }
    // the raw prop value was also undefined from previous render,
    // return previous default value to avoid unnecessary watcher trigger
    if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
        return vm._props[key];
    }
    // call factory function for non-Function types
    // a value is Function if its prototype is function even across different execution context
    return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}

/**
 * Assert whether a prop is valid.
 */
function assertProp(prop, name, value, vm, absent) {
    if (prop.required && absent) {
        warn(`Missing required prop: "${name}"`, vm);
        return;
    }
    if (value == null && !prop.required) {
        return;
    }
    let { type } = prop;
    let valid = !type || type === true;
    const expectedTypes = [];
    if (type) {
        if (!Array.isArray(type)) {
            type = [type];
        }
        for (let i = 0; i < type.length && !valid; i++) {
            const assertedType = assertType(value, type[i]);
            expectedTypes.push(assertedType.expectedType || '');
            valid = assertedType.valid;
        }
    }

    if (!valid) {
        warn(getInvalidTypeMessage(name, value, expectedTypes), vm);
        return;
    }
    const { validator } = prop;
    if (validator) {
        if (!validator(value)) {
            warn(`Invalid prop: custom validator check failed for prop "${name}".`, vm);
        }
    }
}

const simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value, type) {
    let valid;
    const expectedType = getType(type);
    if (simpleCheckRE.test(expectedType)) {
        const t = typeof value;
        valid = t === expectedType.toLowerCase();
        // for primitive wrapper objects
        if (!valid && t === 'object') {
            valid = value instanceof type;
        }
    } else if (expectedType === 'Object') {
        valid = isPlainObject(value);
    } else if (expectedType === 'Array') {
        valid = Array.isArray(value);
    } else {
        valid = value instanceof type;
    }
    return {
        valid,
        expectedType,
    };
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType(fn) {
    const match = fn && fn.toString().match(/^\s*function (\w+)/);
    return match ? match[1] : '';
}

function isSameType(a, b) {
    return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
    if (!Array.isArray(expectedTypes)) {
        return isSameType(expectedTypes, type) ? 0 : -1;
    }
    for (let i = 0, len = expectedTypes.length; i < len; i++) {
        if (isSameType(expectedTypes[i], type)) {
            return i;
        }
    }
    return -1;
}

function getInvalidTypeMessage(name, value, expectedTypes) {
    let message =
        `Invalid prop: type check failed for prop "${name}".` + ` Expected ${expectedTypes.map(capitalize).join(', ')}`;
    const expectedType = expectedTypes[0];
    const receivedType = toRawType(value);
    const expectedValue = styleValue(value, expectedType);
    const receivedValue = styleValue(value, receivedType);
    // check if we need to specify expected value
    if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
        message += ` with value ${expectedValue}`;
    }
    message += `, got ${receivedType} `;
    // check if we need to specify received value
    if (isExplicable(receivedType)) {
        message += `with value ${receivedValue}.`;
    }
    return message;
}

function styleValue(value, type) {
    if (type === 'String') {
        return `"${value}"`;
    }
    if (type === 'Number') {
        return `${Number(value)}`;
    }
    return `${value}`;
}

function isExplicable(value) {
    const explicitTypes = ['string', 'number', 'boolean'];
    return explicitTypes.some(function(elem) {
        return value.toLowerCase() === elem;
    });
}

function isBoolean() {
    const args = [];
    let len = arguments.length;
    while (len--) args[len] = arguments[len];

    return args.some(function(elem) {
        return elem.toLowerCase() === 'boolean';
    });
}

/*  */

function handleError(err, vm, info) {
    // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
    // See: https://github.com/vuejs/vuex/issues/1505
    pushTarget();
    try {
        if (vm) {
            let cur = vm;
            while ((cur = cur.$parent)) {
                const hooks = cur.$options.errorCaptured;
                if (hooks) {
                    for (let i = 0; i < hooks.length; i++) {
                        try {
                            const capture = hooks[i].call(cur, err, vm, info) === false;
                            if (capture) {
                                return;
                            }
                        } catch (e) {
                            globalHandleError(e, cur, 'errorCaptured hook');
                        }
                    }
                }
            }
        }
        globalHandleError(err, vm, info);
    } finally {
        popTarget();
    }
}

function invokeWithErrorHandling(handler, context, args, vm, info) {
    let res;
    try {
        res = args ? handler.apply(context, args) : handler.call(context);
        if (res && !res._isVue && isPromise(res) && !res._handled) {
            res.catch(function(e) {
                return handleError(e, vm, `${info} (Promise/async)`);
            });
            // issue #9511
            // avoid catch triggering multiple times when nested calls
            res._handled = true;
        }
    } catch (e) {
        handleError(e, vm, info);
    }
    return res;
}

function globalHandleError(err, vm, info) {
    logError(err, vm, info);
}

function logError(err, vm, info) {
    {
        warn(`Error in ${info}: "${err.toString()}"`, vm);
    }
    /* istanbul ignore else */
    if ((inBrowser || inWeex) && typeof console !== 'undefined') {
        console.error(err);
    } else {
        throw err;
    }
}

/*  */

const callbacks = [];

function flushCallbacks() {
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
        copies[i]();
    }
}

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise));
else if (
    !isIE &&
    typeof MutationObserver !== 'undefined' &&
    (isNative(MutationObserver) ||
        // PhantomJS and iOS 7.x
        MutationObserver.toString() === '[object MutationObserverConstructor]')
) {
    // Use MutationObserver where native Promise is not available,
    // e.g. PhantomJS, iOS7, Android 4.4
    // (#6466 MutationObserver is unreliable in IE11)
    const counter = 1;
    const observer = new MutationObserver(flushCallbacks);
    const textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
        characterData: true,
    });
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate));

/*  */

/*  */

function genClassForVnode(vnode) {
    let { data } = vnode;
    let parentNode = vnode;
    let childNode = vnode;
    while (isDef(childNode.componentInstance)) {
        childNode = childNode.componentInstance._vnode;
        if (childNode && childNode.data) {
            data = mergeClassData(childNode.data, data);
        }
    }
    while (isDef((parentNode = parentNode.parent))) {
        if (parentNode && parentNode.data) {
            data = mergeClassData(data, parentNode.data);
        }
    }
    return renderClass(data.staticClass, data.class);
}

function mergeClassData(child, parent) {
    return {
        staticClass: concat(child.staticClass, parent.staticClass),
        class: isDef(child.class) ? [child.class, parent.class] : parent.class,
    };
}

function renderClass(staticClass, dynamicClass) {
    if (isDef(staticClass) || isDef(dynamicClass)) {
        return concat(staticClass, stringifyClass(dynamicClass));
    }
    /* istanbul ignore next */
    return '';
}

function concat(a, b) {
    return a ? (b ? `${a} ${b}` : a) : b || '';
}

function stringifyClass(value) {
    if (Array.isArray(value)) {
        return stringifyArray(value);
    }
    if (isObject(value)) {
        return stringifyObject(value);
    }
    if (typeof value === 'string') {
        return value;
    }
    /* istanbul ignore next */
    return '';
}

function stringifyArray(value) {
    let res = '';
    let stringified;
    for (let i = 0, l = value.length; i < l; i++) {
        if (isDef((stringified = stringifyClass(value[i]))) && stringified !== '') {
            if (res) {
                res += ' ';
            }
            res += stringified;
        }
    }
    return res;
}

function stringifyObject(value) {
    let res = '';
    for (const key in value) {
        if (value[key]) {
            if (res) {
                res += ' ';
            }
            res += key;
        }
    }
    return res;
}

/*  */

const isHTMLTag = makeMap(
    'html,body,base,head,link,meta,style,title,' +
        'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
        'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
        'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
        's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
        'embed,object,param,source,canvas,script,noscript,del,ins,' +
        'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
        'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
        'output,progress,select,textarea,' +
        'details,dialog,menu,menuitem,summary,' +
        'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
const isSVG = makeMap(
    'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
        'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
        'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
    true
);

const isPreTag = function(tag) {
    return tag === 'pre';
};

const isReservedTag = function(tag) {
    return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
    if (isSVG(tag)) {
        return 'svg';
    }
    // basic support for MathML
    // note it doesn't support other MathML elements being component roots
    if (tag === 'math') {
        return 'math';
    }
}

const isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/*  */

function renderClass$1(node) {
    const classList = genClassForVnode(node);
    if (classList !== '') {
        return ` class="${escape(classList)}"`;
    }
}

/*  */

const parseStyleText = cached(function(cssText) {
    const res = {};
    const listDelimiter = /;(?![^(]*\))/g;
    const propertyDelimiter = /:(.+)/;
    cssText.split(listDelimiter).forEach(function(item) {
        if (item) {
            const tmp = item.split(propertyDelimiter);
            tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
        }
    });
    return res;
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData(data) {
    const style = normalizeStyleBinding(data.style);
    // static style is pre-processed into an object during compilation
    // and is always a fresh object, so it's safe to merge into it
    return data.staticStyle ? extend(data.staticStyle, style) : style;
}

// normalize possible array / string values into Object
function normalizeStyleBinding(bindingStyle) {
    if (Array.isArray(bindingStyle)) {
        return toObject(bindingStyle);
    }
    if (typeof bindingStyle === 'string') {
        return parseStyleText(bindingStyle);
    }
    return bindingStyle;
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle(vnode, checkChild) {
    const res = {};
    let styleData;

    if (checkChild) {
        let childNode = vnode;
        while (childNode.componentInstance) {
            childNode = childNode.componentInstance._vnode;
            if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
                extend(res, styleData);
            }
        }
    }

    if ((styleData = normalizeStyleData(vnode.data))) {
        extend(res, styleData);
    }

    let parentNode = vnode;
    while ((parentNode = parentNode.parent)) {
        if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
            extend(res, styleData);
        }
    }
    return res;
}

/*  */

function genStyle(style) {
    let styleText = '';
    for (const key in style) {
        const value = style[key];
        const hyphenatedKey = hyphenate(key);
        if (Array.isArray(value)) {
            for (let i = 0, len = value.length; i < len; i++) {
                styleText += normalizeValue(hyphenatedKey, value[i]);
            }
        } else {
            styleText += normalizeValue(hyphenatedKey, value);
        }
    }
    return styleText;
}

function normalizeValue(key, value) {
    if (typeof value === 'string' || (typeof value === 'number' && noUnitNumericStyleProps[key]) || value === 0) {
        return `${key}:${value};`;
    }
    // invalid values
    return '';
}

function renderStyle(vnode) {
    const styleText = genStyle(getStyle(vnode, false));
    if (styleText !== '') {
        return ` style=${JSON.stringify(escape(styleText))}`;
    }
}

const modules = [renderAttrs, renderDOMProps, renderClass$1, renderStyle];

/*  */

function show(node, dir) {
    if (!dir.value) {
        const style = node.data.style || (node.data.style = {});
        if (Array.isArray(style)) {
            style.push({ display: 'none' });
        } else {
            style.display = 'none';
        }
    }
}

/*  */

// this is only applied for <select v-model> because it is the only edge case
// that must be done at runtime instead of compile time.
function model(node, dir) {
    if (!node.children) {
        return;
    }
    const { value } = dir;
    const isMultiple = node.data.attrs && node.data.attrs.multiple;
    for (let i = 0, l = node.children.length; i < l; i++) {
        const option = node.children[i];
        if (option.tag === 'option') {
            if (isMultiple) {
                const selected = Array.isArray(value) && looseIndexOf(value, getValue(option)) > -1;
                if (selected) {
                    setSelected(option);
                }
            } else if (looseEqual(value, getValue(option))) {
                setSelected(option);
                return;
            }
        }
    }
}

function getValue(option) {
    const data = option.data || {};
    return (
        (data.attrs && data.attrs.value) ||
        (data.domProps && data.domProps.value) ||
        (option.children && option.children[0] && option.children[0].text)
    );
}

function setSelected(option) {
    const data = option.data || (option.data = {});
    const attrs = data.attrs || (data.attrs = {});
    attrs.selected = '';
}

const baseDirectives = {
    show,
    model,
};

/*  */

const isUnaryTag = makeMap(
    'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' + 'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
const canBeLeftOpenTag = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source');

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
const isNonPhrasingTag = makeMap(
    'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
        'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
        'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
        'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
        'title,tr,track'
);

/*  */

const MAX_STACK_DEPTH = 800;
const noop$1 = function(_) {
    return _;
};

const defer =
    typeof process !== 'undefined' && process.nextTick
        ? process.nextTick
        : typeof Promise !== 'undefined'
        ? function(fn) {
              return Promise.resolve().then(fn);
          }
        : typeof setTimeout !== 'undefined'
        ? setTimeout
        : noop$1;

if (defer === noop$1) {
    throw new Error(
        'Your JavaScript runtime does not support any asynchronous primitives ' +
            'that are required by vue-server-renderer. Please use a polyfill for ' +
            'either Promise or setTimeout.'
    );
}

function createWriteFunction(write, onError) {
    let stackDepth = 0;
    var cachedWrite = function(text, next) {
        if (text && cachedWrite.caching) {
            cachedWrite.cacheBuffer[cachedWrite.cacheBuffer.length - 1] += text;
        }
        const waitForNext = write(text, next);
        if (waitForNext !== true) {
            if (stackDepth >= MAX_STACK_DEPTH) {
                defer(function() {
                    try {
                        next();
                    } catch (e) {
                        onError(e);
                    }
                });
            } else {
                stackDepth++;
                next();
                stackDepth--;
            }
        }
    };
    cachedWrite.caching = false;
    cachedWrite.cacheBuffer = [];
    cachedWrite.componentBuffer = [];
    return cachedWrite;
}

/*  */

/**
 * Original RenderStream implementation by Sasha Aickin (@aickin)
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Modified by Evan You (@yyx990803)
 */

const stream = require('stream');

const RenderStream = /* @__PURE__ */ (function(superclass) {
    function RenderStream(render) {
        const this$1 = this;

        superclass.call(this);
        this.buffer = '';
        this.render = render;
        this.expectedSize = 0;

        this.write = createWriteFunction(
            function(text, next) {
                const n = this$1.expectedSize;
                this$1.buffer += text;
                if (this$1.buffer.length >= n) {
                    this$1.next = next;
                    this$1.pushBySize(n);
                    return true; // we will decide when to call next
                }
                return false;
            },
            function(err) {
                this$1.emit('error', err);
            }
        );

        this.end = function() {
            this$1.emit('beforeEnd');
            // the rendering is finished; we should push out the last of the buffer.
            this$1.done = true;
            this$1.push(this$1.buffer);
        };
    }

    if (superclass) RenderStream.__proto__ = superclass;
    RenderStream.prototype = Object.create(superclass && superclass.prototype);
    RenderStream.prototype.constructor = RenderStream;

    RenderStream.prototype.pushBySize = function pushBySize(n) {
        const bufferToPush = this.buffer.substring(0, n);
        this.buffer = this.buffer.substring(n);
        this.push(bufferToPush);
    };

    RenderStream.prototype.tryRender = function tryRender() {
        try {
            this.render(this.write, this.end);
        } catch (e) {
            this.emit('error', e);
        }
    };

    RenderStream.prototype.tryNext = function tryNext() {
        try {
            this.next();
        } catch (e) {
            this.emit('error', e);
        }
    };

    RenderStream.prototype._read = function _read(n) {
        this.expectedSize = n;
        // it's possible that the last chunk added bumped the buffer up to > 2 * n,
        // which means we will need to go through multiple read calls to drain it
        // down to < n.
        if (isTrue(this.done)) {
            this.push(null);
            return;
        }
        if (this.buffer.length >= n) {
            this.pushBySize(n);
            return;
        }
        if (isUndef(this.next)) {
            // start the rendering chain.
            this.tryRender();
        } else {
            // continue with the rendering.
            this.tryNext();
        }
    };

    return RenderStream;
})(stream.Readable);

/*  */

const RenderContext = function RenderContext(options) {
    this.userContext = options.userContext;
    this.activeInstance = options.activeInstance;
    this.renderStates = [];

    this.write = options.write;
    this.done = options.done;
    this.renderNode = options.renderNode;

    this.isUnaryTag = options.isUnaryTag;
    this.modules = options.modules;
    this.directives = options.directives;

    const { cache } = options;
    if (cache && (!cache.get || !cache.set)) {
        throw new Error('renderer cache must implement at least get & set.');
    }
    this.cache = cache;
    this.get = cache && normalizeAsync(cache, 'get');
    this.has = cache && normalizeAsync(cache, 'has');

    this.next = this.next.bind(this);
};

RenderContext.prototype.next = function next() {
    // eslint-disable-next-line
    while (true) {
        const lastState = this.renderStates[this.renderStates.length - 1];
        if (isUndef(lastState)) {
            return this.done();
        }
        /* eslint-disable no-case-declarations */
        switch (lastState.type) {
            case 'Element':
            case 'Fragment':
                var { children } = lastState;
                var { total } = lastState;
                var rendered = lastState.rendered++;
                if (rendered < total) {
                    return this.renderNode(children[rendered], false, this);
                }
                this.renderStates.pop();
                if (lastState.type === 'Element') {
                    return this.write(lastState.endTag, this.next);
                }

                break;
            case 'Component':
                this.renderStates.pop();
                this.activeInstance = lastState.prevActive;
                break;
            case 'ComponentWithCache':
                this.renderStates.pop();
                var { buffer } = lastState;
                var { bufferIndex } = lastState;
                var { componentBuffer } = lastState;
                var { key } = lastState;
                var result = {
                    html: buffer[bufferIndex],
                    components: componentBuffer[bufferIndex],
                };
                this.cache.set(key, result);
                if (bufferIndex === 0) {
                    // this is a top-level cached component,
                    // exit caching mode.
                    this.write.caching = false;
                } else {
                    // parent component is also being cached,
                    // merge self into parent's result
                    buffer[bufferIndex - 1] += result.html;
                    var prev = componentBuffer[bufferIndex - 1];
                    result.components.forEach(function(c) {
                        return prev.add(c);
                    });
                }
                buffer.length = bufferIndex;
                componentBuffer.length = bufferIndex;
                break;
        }
    }
};

function normalizeAsync(cache, method) {
    const fn = cache[method];
    if (isUndef(fn)) {
        return;
    }
    if (fn.length > 1) {
        return function(key, cb) {
            return fn.call(cache, key, cb);
        };
    }
    return function(key, cb) {
        return cb(fn.call(cache, key));
    };
}

/*  */

const validDivisionCharRE = /[\w$)+\-.\]]/;

function parseFilters(exp) {
    let inSingle = false;
    let inDouble = false;
    let inTemplateString = false;
    let inRegex = false;
    let curly = 0;
    let square = 0;
    let paren = 0;
    let lastFilterIndex = 0;
    let c;
    let prev;
    let i;
    let expression;
    let filters;

    for (i = 0; i < exp.length; i++) {
        prev = c;
        c = exp.charCodeAt(i);
        if (inSingle) {
            if (c === 0x27 && prev !== 0x5c) {
                inSingle = false;
            }
        } else if (inDouble) {
            if (c === 0x22 && prev !== 0x5c) {
                inDouble = false;
            }
        } else if (inTemplateString) {
            if (c === 0x60 && prev !== 0x5c) {
                inTemplateString = false;
            }
        } else if (inRegex) {
            if (c === 0x2f && prev !== 0x5c) {
                inRegex = false;
            }
        } else if (
            c === 0x7c && // pipe
            exp.charCodeAt(i + 1) !== 0x7c &&
            exp.charCodeAt(i - 1) !== 0x7c &&
            !curly &&
            !square &&
            !paren
        ) {
            if (expression === undefined) {
                // first filter, end of expression
                lastFilterIndex = i + 1;
                expression = exp.slice(0, i).trim();
            } else {
                pushFilter();
            }
        } else {
            switch (c) {
                case 0x22:
                    inDouble = true;
                    break; // "
                case 0x27:
                    inSingle = true;
                    break; // '
                case 0x60:
                    inTemplateString = true;
                    break; // `
                case 0x28:
                    paren++;
                    break; // (
                case 0x29:
                    paren--;
                    break; // )
                case 0x5b:
                    square++;
                    break; // [
                case 0x5d:
                    square--;
                    break; // ]
                case 0x7b:
                    curly++;
                    break; // {
                case 0x7d:
                    curly--;
                    break; // }
            }
            if (c === 0x2f) {
                // /
                let j = i - 1;
                let p = void 0;
                // find first non-whitespace prev char
                for (; j >= 0; j--) {
                    p = exp.charAt(j);
                    if (p !== ' ') {
                        break;
                    }
                }
                if (!p || !validDivisionCharRE.test(p)) {
                    inRegex = true;
                }
            }
        }
    }

    if (expression === undefined) {
        expression = exp.slice(0, i).trim();
    } else if (lastFilterIndex !== 0) {
        pushFilter();
    }

    function pushFilter() {
        (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
        lastFilterIndex = i + 1;
    }

    if (filters) {
        for (i = 0; i < filters.length; i++) {
            expression = wrapFilter(expression, filters[i]);
        }
    }

    return expression;
}

function wrapFilter(exp, filter) {
    const i = filter.indexOf('(');
    if (i < 0) {
        // _f: resolveFilter
        return `_f("${filter}")(${exp})`;
    }
    const name = filter.slice(0, i);
    const args = filter.slice(i + 1);
    return `_f("${name}")(${exp}${args !== ')' ? `,${args}` : args}`;
}

/*  */

const defaultTagRE = /{{((?:.|\r?\n)+?)}}/g;
const regexEscapeRE = /[$()*+-./?[\\\]^{|}]/g;

const buildRegex = cached(function(delimiters) {
    const open = delimiters[0].replace(regexEscapeRE, '\\$&');
    const close = delimiters[1].replace(regexEscapeRE, '\\$&');
    return new RegExp(`${open}((?:.|\\n)+?)${close}`, 'g');
});

function parseText(text, delimiters) {
    const tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
    if (!tagRE.test(text)) {
        return;
    }
    const tokens = [];
    const rawTokens = [];
    let lastIndex = (tagRE.lastIndex = 0);
    let match;
    let index;
    let tokenValue;
    while ((match = tagRE.exec(text))) {
        index = match.index;
        // push text token
        if (index > lastIndex) {
            rawTokens.push((tokenValue = text.slice(lastIndex, index)));
            tokens.push(JSON.stringify(tokenValue));
        }
        // tag token
        const exp = parseFilters(match[1].trim());
        tokens.push(`_s(${exp})`);
        rawTokens.push({ '@binding': exp });
        lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
        rawTokens.push((tokenValue = text.slice(lastIndex)));
        tokens.push(JSON.stringify(tokenValue));
    }
    return {
        expression: tokens.join('+'),
        tokens: rawTokens,
    };
}

/*  */

/* eslint-disable no-unused-vars */
function baseWarn(msg, range) {
    console.error(`[Vue compiler]: ${msg}`);
}
/* eslint-enable no-unused-vars */

function pluckModuleFunction(modules, key) {
    return modules
        ? modules
              .map(function(m) {
                  return m[key];
              })
              .filter(function(_) {
                  return _;
              })
        : [];
}

function addProp(el, name, value, range, dynamic) {
    (el.props || (el.props = [])).push(rangeSetItem({ name, value, dynamic }, range));
    el.plain = false;
}

function addAttr(el, name, value, range, dynamic) {
    const attrs = dynamic ? el.dynamicAttrs || (el.dynamicAttrs = []) : el.attrs || (el.attrs = []);
    attrs.push(rangeSetItem({ name, value, dynamic }, range));
    el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr(el, name, value, range) {
    el.attrsMap[name] = value;
    el.attrsList.push(rangeSetItem({ name, value }, range));
}

function addDirective(el, name, rawName, value, arg, isDynamicArg, modifiers, range) {
    (el.directives || (el.directives = [])).push(
        rangeSetItem(
            {
                name,
                rawName,
                value,
                arg,
                isDynamicArg,
                modifiers,
            },
            range
        )
    );
    el.plain = false;
}

function prependModifierMarker(symbol, name, dynamic) {
    return dynamic ? `_p(${name},"${symbol}")` : symbol + name; // mark the event as captured
}

function addHandler(el, name, value, modifiers, important, warn, range, dynamic) {
    modifiers = modifiers || emptyObject;
    // warn prevent and passive modifier
    /* istanbul ignore if */
    if (warn && modifiers.prevent && modifiers.passive) {
        warn("passive and prevent can't be used together. " + "Passive handler can't prevent default event.", range);
    }

    // normalize click.right and click.middle since they don't actually fire
    // this is technically browser-specific, but at least for now browsers are
    // the only target envs that have right/middle clicks.
    if (modifiers.right) {
        if (dynamic) {
            name = `(${name})==='click'?'contextmenu':(${name})`;
        } else if (name === 'click') {
            name = 'contextmenu';
            delete modifiers.right;
        }
    } else if (modifiers.middle) {
        if (dynamic) {
            name = `(${name})==='click'?'mouseup':(${name})`;
        } else if (name === 'click') {
            name = 'mouseup';
        }
    }

    // check capture modifier
    if (modifiers.capture) {
        delete modifiers.capture;
        name = prependModifierMarker('!', name, dynamic);
    }
    if (modifiers.once) {
        delete modifiers.once;
        name = prependModifierMarker('~', name, dynamic);
    }
    /* istanbul ignore if */
    if (modifiers.passive) {
        delete modifiers.passive;
        name = prependModifierMarker('&', name, dynamic);
    }

    let events;
    if (modifiers.native) {
        delete modifiers.native;
        events = el.nativeEvents || (el.nativeEvents = {});
    } else {
        events = el.events || (el.events = {});
    }

    const newHandler = rangeSetItem({ value: value.trim(), dynamic }, range);
    if (modifiers !== emptyObject) {
        newHandler.modifiers = modifiers;
    }

    const handlers = events[name];
    /* istanbul ignore if */
    if (Array.isArray(handlers)) {
        important ? handlers.unshift(newHandler) : handlers.push(newHandler);
    } else if (handlers) {
        events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
    } else {
        events[name] = newHandler;
    }

    el.plain = false;
}

function getRawBindingAttr(el, name) {
    return el.rawAttrsMap[`:${name}`] || el.rawAttrsMap[`v-bind:${name}`] || el.rawAttrsMap[name];
}

function getBindingAttr(el, name, getStatic) {
    const dynamicValue = getAndRemoveAttr(el, `:${name}`) || getAndRemoveAttr(el, `v-bind:${name}`);
    if (dynamicValue != null) {
        return parseFilters(dynamicValue);
    }
    if (getStatic !== false) {
        const staticValue = getAndRemoveAttr(el, name);
        if (staticValue != null) {
            return JSON.stringify(staticValue);
        }
    }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr(el, name, removeFromMap) {
    let val;
    if ((val = el.attrsMap[name]) != null) {
        const list = el.attrsList;
        for (let i = 0, l = list.length; i < l; i++) {
            if (list[i].name === name) {
                list.splice(i, 1);
                break;
            }
        }
    }
    if (removeFromMap) {
        delete el.attrsMap[name];
    }
    return val;
}

function getAndRemoveAttrByRegex(el, name) {
    const list = el.attrsList;
    for (let i = 0, l = list.length; i < l; i++) {
        const attr = list[i];
        if (name.test(attr.name)) {
            list.splice(i, 1);
            return attr;
        }
    }
}

function rangeSetItem(item, range) {
    if (range) {
        if (range.start != null) {
            item.start = range.start;
        }
        if (range.end != null) {
            item.end = range.end;
        }
    }
    return item;
}

/*  */

function transformNode(el, options) {
    const warn = options.warn || baseWarn;
    const staticClass = getAndRemoveAttr(el, 'class');
    if (staticClass) {
        const res = parseText(staticClass, options.delimiters);
        if (res) {
            warn(
                `class="${staticClass}": ` +
                    `Interpolation inside attributes has been removed. ` +
                    `Use v-bind or the colon shorthand instead. For example, ` +
                    `instead of <div class="{{ val }}">, use <div :class="val">.`,
                el.rawAttrsMap.class
            );
        }
    }
    if (staticClass) {
        el.staticClass = JSON.stringify(staticClass);
    }
    const classBinding = getBindingAttr(el, 'class', false /* getStatic */);
    if (classBinding) {
        el.classBinding = classBinding;
    }
}

function genData(el) {
    let data = '';
    if (el.staticClass) {
        data += `staticClass:${el.staticClass},`;
    }
    if (el.classBinding) {
        data += `class:${el.classBinding},`;
    }
    return data;
}

const klass = {
    staticKeys: ['staticClass'],
    transformNode,
    genData,
};

/*  */

function transformNode$1(el, options) {
    const warn = options.warn || baseWarn;
    const staticStyle = getAndRemoveAttr(el, 'style');
    if (staticStyle) {
        /* istanbul ignore if */
        {
            const res = parseText(staticStyle, options.delimiters);
            if (res) {
                warn(
                    `style="${staticStyle}": ` +
                        `Interpolation inside attributes has been removed. ` +
                        `Use v-bind or the colon shorthand instead. For example, ` +
                        `instead of <div style="{{ val }}">, use <div :style="val">.`,
                    el.rawAttrsMap.style
                );
            }
        }
        el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
    }

    const styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
    if (styleBinding) {
        el.styleBinding = styleBinding;
    }
}

function genData$1(el) {
    let data = '';
    if (el.staticStyle) {
        data += `staticStyle:${el.staticStyle},`;
    }
    if (el.styleBinding) {
        data += `style:(${el.styleBinding}),`;
    }
    return data;
}

const style = {
    staticKeys: ['staticStyle'],
    transformNode: transformNode$1,
    genData: genData$1,
};

/**
 * Not type-checking this file because it's mostly vendor code.
 */

// Regular Expressions for parsing tags and attributes
const attribute = /^\s*([^\s"'/<=>]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'<=>`]+)))?/;
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+][^\s"'/<=>]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'<=>`]+)))?/;
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const startTagClose = /^\s*(\/?)>/;
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
const doctype = /^<!doctype [^>]+>/i;
// #7298: escape - to avoid being pased as HTML comment when inlined in page
const comment = /^<!--/;
const conditionalComment = /^<!\[/;

// Special Elements (can contain anything)
const isPlainTextElement = makeMap('script,style,textarea', true);
const reCache = {};

const decodingMap = {
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&amp;': '&',
    '&#10;': '\n',
    '&#9;': '\t',
    '&#39;': "'",
};
const encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
const encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;

// #5992
const isIgnoreNewlineTag = makeMap('pre,textarea', true);
const shouldIgnoreFirstNewline = function(tag, html) {
    return tag && isIgnoreNewlineTag(tag) && html[0] === '\n';
};

function decodeAttr(value, shouldDecodeNewlines) {
    const re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
    return value.replace(re, function(match) {
        return decodingMap[match];
    });
}

function parseHTML(html, options) {
    const stack = [];
    const { expectHTML } = options;
    const isUnaryTag$$1 = options.isUnaryTag || no;
    const canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
    let index = 0;
    let last;
    let lastTag;
    while (html) {
        last = html;
        // Make sure we're not in a plaintext content element like script/style
        if (!lastTag || !isPlainTextElement(lastTag)) {
            let textEnd = html.indexOf('<');
            if (textEnd === 0) {
                // Comment:
                if (comment.test(html)) {
                    const commentEnd = html.indexOf('-->');

                    if (commentEnd >= 0) {
                        if (options.shouldKeepComment) {
                            options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3);
                        }
                        advance(commentEnd + 3);
                        continue;
                    }
                }

                // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
                if (conditionalComment.test(html)) {
                    const conditionalEnd = html.indexOf(']>');

                    if (conditionalEnd >= 0) {
                        advance(conditionalEnd + 2);
                        continue;
                    }
                }

                // Doctype:
                const doctypeMatch = html.match(doctype);
                if (doctypeMatch) {
                    advance(doctypeMatch[0].length);
                    continue;
                }

                // End tag:
                const endTagMatch = html.match(endTag);
                if (endTagMatch) {
                    const curIndex = index;
                    advance(endTagMatch[0].length);
                    parseEndTag(endTagMatch[1], curIndex, index);
                    continue;
                }

                // Start tag:
                const startTagMatch = parseStartTag();
                if (startTagMatch) {
                    handleStartTag(startTagMatch);
                    if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
                        advance(1);
                    }
                    continue;
                }
            }

            let text = void 0;
            let rest = void 0;
            let next = void 0;
            if (textEnd >= 0) {
                rest = html.slice(textEnd);
                while (
                    !endTag.test(rest) &&
                    !startTagOpen.test(rest) &&
                    !comment.test(rest) &&
                    !conditionalComment.test(rest)
                ) {
                    // < in plain text, be forgiving and treat it as text
                    next = rest.indexOf('<', 1);
                    if (next < 0) {
                        break;
                    }
                    textEnd += next;
                    rest = html.slice(textEnd);
                }
                text = html.substring(0, textEnd);
            }

            if (textEnd < 0) {
                text = html;
            }

            if (text) {
                advance(text.length);
            }

            if (options.chars && text) {
                options.chars(text, index - text.length, index);
            }
        } else {
            var endTagLength = 0;
            var stackedTag = lastTag.toLowerCase();
            const reStackedTag =
                reCache[stackedTag] || (reCache[stackedTag] = new RegExp(`([\\s\\S]*?)(</${stackedTag}[^>]*>)`, 'i'));
            const rest$1 = html.replace(reStackedTag, function(all, text, endTag) {
                endTagLength = endTag.length;
                if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
                    text = text
                        .replace(/<!--([\S\s]*?)-->/g, '$1') // #7298
                        .replace(/<!\[CDATA\[([\S\s]*?)]]>/g, '$1');
                }
                if (shouldIgnoreFirstNewline(stackedTag, text)) {
                    text = text.slice(1);
                }
                if (options.chars) {
                    options.chars(text);
                }
                return '';
            });
            index += html.length - rest$1.length;
            html = rest$1;
            parseEndTag(stackedTag, index - endTagLength, index);
        }

        if (html === last) {
            options.chars && options.chars(html);
            if (!stack.length && options.warn) {
                options.warn(`Mal-formatted tag at end of template: "${html}"`, { start: index + html.length });
            }
            break;
        }
    }

    // Clean up any remaining tags
    parseEndTag();

    function advance(n) {
        index += n;
        html = html.substring(n);
    }

    function parseStartTag() {
        const start = html.match(startTagOpen);
        if (start) {
            const match = {
                tagName: start[1],
                attrs: [],
                start: index,
            };
            advance(start[0].length);
            let end;
            let attr;
            while (
                !(end = html.match(startTagClose)) &&
                (attr = html.match(dynamicArgAttribute) || html.match(attribute))
            ) {
                attr.start = index;
                advance(attr[0].length);
                attr.end = index;
                match.attrs.push(attr);
            }
            if (end) {
                match.unarySlash = end[1];
                advance(end[0].length);
                match.end = index;
                return match;
            }
        }
    }

    function handleStartTag(match) {
        const { tagName } = match;
        const { unarySlash } = match;

        if (expectHTML) {
            if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
                parseEndTag(lastTag);
            }
            if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
                parseEndTag(tagName);
            }
        }

        const unary = isUnaryTag$$1(tagName) || !!unarySlash;

        const l = match.attrs.length;
        const attrs = new Array(l);
        for (let i = 0; i < l; i++) {
            const args = match.attrs[i];
            const value = args[3] || args[4] || args[5] || '';
            const shouldDecodeNewlines =
                tagName === 'a' && args[1] === 'href'
                    ? options.shouldDecodeNewlinesForHref
                    : options.shouldDecodeNewlines;
            attrs[i] = {
                name: args[1],
                value: decodeAttr(value, shouldDecodeNewlines),
            };
            if (options.outputSourceRange) {
                attrs[i].start = args.start + args[0].match(/^\s*/).length;
                attrs[i].end = args.end;
            }
        }

        if (!unary) {
            stack.push({
                tag: tagName,
                lowerCasedTag: tagName.toLowerCase(),
                attrs,
                start: match.start,
                end: match.end,
            });
            lastTag = tagName;
        }

        if (options.start) {
            options.start(tagName, attrs, unary, match.start, match.end);
        }
    }

    function parseEndTag(tagName, start, end) {
        let pos;
        let lowerCasedTagName;
        if (start == null) {
            start = index;
        }
        if (end == null) {
            end = index;
        }

        // Find the closest opened tag of the same type
        if (tagName) {
            lowerCasedTagName = tagName.toLowerCase();
            for (pos = stack.length - 1; pos >= 0; pos--) {
                if (stack[pos].lowerCasedTag === lowerCasedTagName) {
                    break;
                }
            }
        } else {
            // If no tag name is provided, clean shop
            pos = 0;
        }

        if (pos >= 0) {
            // Close all the open elements, up the stack
            for (let i = stack.length - 1; i >= pos; i--) {
                if (i > pos || (!tagName && options.warn)) {
                    options.warn(`tag <${stack[i].tag}> has no matching end tag.`, {
                        start: stack[i].start,
                        end: stack[i].end,
                    });
                }
                if (options.end) {
                    options.end(stack[i].tag, start, end);
                }
            }

            // Remove the open elements from the stack
            stack.length = pos;
            lastTag = pos && stack[pos - 1].tag;
        } else if (lowerCasedTagName === 'br') {
            if (options.start) {
                options.start(tagName, [], true, start, end);
            }
        } else if (lowerCasedTagName === 'p') {
            if (options.start) {
                options.start(tagName, [], false, start, end);
            }
            if (options.end) {
                options.end(tagName, start, end);
            }
        }
    }
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel(el, value, modifiers) {
    const ref = modifiers || {};
    const { number } = ref;
    const { trim } = ref;

    const baseValueExpression = '$$v';
    let valueExpression = baseValueExpression;
    if (trim) {
        valueExpression =
            `(typeof ${baseValueExpression} === 'string'` +
            `? ${baseValueExpression}.trim()` +
            `: ${baseValueExpression})`;
    }
    if (number) {
        valueExpression = `_n(${valueExpression})`;
    }
    const assignment = genAssignmentCode(value, valueExpression);

    el.model = {
        value: `(${value})`,
        expression: JSON.stringify(value),
        callback: `function (${baseValueExpression}) {${assignment}}`,
    };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode(value, assignment) {
    const res = parseModel(value);
    if (res.key === null) {
        return `${value}=${assignment}`;
    }
    return `$set(${res.exp}, ${res.key}, ${assignment})`;
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

let len;
let str;
let chr;
let index;
let expressionPos;
let expressionEndPos;

function parseModel(val) {
    // Fix https://github.com/vuejs/vue/pull/7730
    // allow v-model="obj.val " (trailing whitespace)
    val = val.trim();
    len = val.length;

    if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
        index = val.lastIndexOf('.');
        if (index > -1) {
            return {
                exp: val.slice(0, index),
                key: `"${val.slice(index + 1)}"`,
            };
        }
        return {
            exp: val,
            key: null,
        };
    }

    str = val;
    index = expressionPos = expressionEndPos = 0;

    while (!eof()) {
        chr = next();
        /* istanbul ignore if */
        if (isStringStart(chr)) {
            parseString(chr);
        } else if (chr === 0x5b) {
            parseBracket(chr);
        }
    }

    return {
        exp: val.slice(0, expressionPos),
        key: val.slice(expressionPos + 1, expressionEndPos),
    };
}

function next() {
    return str.charCodeAt(++index);
}

function eof() {
    return index >= len;
}

function isStringStart(chr) {
    return chr === 0x22 || chr === 0x27;
}

function parseBracket(chr) {
    let inBracket = 1;
    expressionPos = index;
    while (!eof()) {
        chr = next();
        if (isStringStart(chr)) {
            parseString(chr);
            continue;
        }
        if (chr === 0x5b) {
            inBracket++;
        }
        if (chr === 0x5d) {
            inBracket--;
        }
        if (inBracket === 0) {
            expressionEndPos = index;
            break;
        }
    }
}

function parseString(chr) {
    const stringQuote = chr;
    while (!eof()) {
        chr = next();
        if (chr === stringQuote) {
            break;
        }
    }
}

/*  */

const onRE = /^@|^v-on:/;
const dirRE = /^v-|^@|^:/;
const forAliasRE = /([\S\s]*?)\s+(?:in|of)\s+([\S\s]*)/;
const forIteratorRE = /,([^,\]}]*)(?:,([^,\]}]*))?$/;
const stripParensRE = /^\(|\)$/g;
const dynamicArgRE = /^\[.*]$/;

const argRE = /:(.*)$/;
const bindRE = /^:|^\.|^v-bind:/;
const modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;

const slotRE = /^v-slot(:|$)|^#/;

const lineBreakRE = /[\n\r]/;
const whitespaceRE = /\s+/g;

const invalidAttributeRE = /[\s"'/<=>]/;

const decodeHTMLCached = cached(he.decode);

const emptySlotScopeToken = '_empty_';

// configurable state
let warn$1;
let delimiters;
let transforms;
let preTransforms;
let postTransforms;
let platformIsPreTag;
let platformMustUseProp;
let platformGetTagNamespace;
let maybeComponent;

function createASTElement(tag, attrs, parent) {
    return {
        type: 1,
        tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        rawAttrsMap: {},
        parent,
        children: [],
    };
}

/**
 * Convert HTML string to AST.
 */
function parse(template, options) {
    warn$1 = options.warn || baseWarn;

    platformIsPreTag = options.isPreTag || no;
    platformMustUseProp = options.mustUseProp || no;
    platformGetTagNamespace = options.getTagNamespace || no;
    const isReservedTag = options.isReservedTag || no;
    maybeComponent = function(el) {
        return !!el.component || !isReservedTag(el.tag);
    };

    transforms = pluckModuleFunction(options.modules, 'transformNode');
    preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
    postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

    delimiters = options.delimiters;

    const stack = [];
    const preserveWhitespace = options.preserveWhitespace !== false;
    const whitespaceOption = options.whitespace;
    let root;
    let currentParent;
    let inVPre = false;
    let inPre = false;
    let warned = false;

    function warnOnce(msg, range) {
        if (!warned) {
            warned = true;
            warn$1(msg, range);
        }
    }

    function closeElement(element) {
        trimEndingWhitespace(element);
        if (!inVPre && !element.processed) {
            element = processElement(element, options);
        }
        // tree management
        if (!stack.length && element !== root) {
            // allow root elements with v-if, v-else-if and v-else
            if (root.if && (element.elseif || element.else)) {
                {
                    checkRootConstraints(element);
                }
                addIfCondition(root, {
                    exp: element.elseif,
                    block: element,
                });
            } else {
                warnOnce(
                    'Component template should contain exactly one root element. ' +
                        'If you are using v-if on multiple elements, ' +
                        'use v-else-if to chain them instead.',
                    { start: element.start }
                );
            }
        }
        if (currentParent && !element.forbidden) {
            if (element.elseif || element.else) {
                processIfConditions(element, currentParent);
            } else {
                if (element.slotScope) {
                    // scoped slot
                    // keep it in the children list so that v-else(-if) conditions can
                    // find it as the prev node.
                    const name = element.slotTarget || '"default"';
                    (currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
                }
                currentParent.children.push(element);
                element.parent = currentParent;
            }
        }

        // final children cleanup
        // filter out scoped slots
        element.children = element.children.filter(function(c) {
            return !c.slotScope;
        });
        // remove trailing whitespace node again
        trimEndingWhitespace(element);

        // check pre state
        if (element.pre) {
            inVPre = false;
        }
        if (platformIsPreTag(element.tag)) {
            inPre = false;
        }
        // apply post-transforms
        for (let i = 0; i < postTransforms.length; i++) {
            postTransforms[i](element, options);
        }
    }

    function trimEndingWhitespace(el) {
        // remove trailing whitespace node
        if (!inPre) {
            let lastNode;
            while ((lastNode = el.children[el.children.length - 1]) && lastNode.type === 3 && lastNode.text === ' ') {
                el.children.pop();
            }
        }
    }

    function checkRootConstraints(el) {
        if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(`Cannot use <${el.tag}> as component root element because it may ` + `contain multiple nodes.`, {
                start: el.start,
            });
        }
        if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
                'Cannot use v-for on stateful component root element because ' + 'it renders multiple elements.',
                el.rawAttrsMap['v-for']
            );
        }
    }

    parseHTML(template, {
        warn: warn$1,
        expectHTML: options.expectHTML,
        isUnaryTag: options.isUnaryTag,
        canBeLeftOpenTag: options.canBeLeftOpenTag,
        shouldDecodeNewlines: options.shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
        shouldKeepComment: options.comments,
        outputSourceRange: options.outputSourceRange,
        start: function start(tag, attrs, unary, start$1, end) {
            // check namespace.
            // inherit parent ns if there is one
            const ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

            // handle IE svg bug
            /* istanbul ignore if */
            if (isIE && ns === 'svg') {
                attrs = guardIESVGBug(attrs);
            }

            let element = createASTElement(tag, attrs, currentParent);
            if (ns) {
                element.ns = ns;
            }

            {
                if (options.outputSourceRange) {
                    element.start = start$1;
                    element.end = end;
                    element.rawAttrsMap = element.attrsList.reduce(function(cumulated, attr) {
                        cumulated[attr.name] = attr;
                        return cumulated;
                    }, {});
                }
                attrs.forEach(function(attr) {
                    if (invalidAttributeRE.test(attr.name)) {
                        warn$1(
                            'Invalid dynamic argument expression: attribute names cannot contain ' +
                                'spaces, quotes, <, >, / or =.',
                            {
                                start: attr.start + attr.name.indexOf('['),
                                end: attr.start + attr.name.length,
                            }
                        );
                    }
                });
            }

            if (isForbiddenTag(element) && !isServerRendering()) {
                element.forbidden = true;
                warn$1(
                    `${'Templates should only be responsible for mapping the state to the ' +
                        'UI. Avoid placing tags with side-effects in your templates, such as ' +
                        '<'}${tag}>` + `, as they will not be parsed.`,
                    { start: element.start }
                );
            }

            // apply pre-transforms
            for (let i = 0; i < preTransforms.length; i++) {
                element = preTransforms[i](element, options) || element;
            }

            if (!inVPre) {
                processPre(element);
                if (element.pre) {
                    inVPre = true;
                }
            }
            if (platformIsPreTag(element.tag)) {
                inPre = true;
            }
            if (inVPre) {
                processRawAttrs(element);
            } else if (!element.processed) {
                // structural directives
                processFor(element);
                processIf(element);
                processOnce(element);
            }

            if (!root) {
                root = element;
                {
                    checkRootConstraints(root);
                }
            }

            if (!unary) {
                currentParent = element;
                stack.push(element);
            } else {
                closeElement(element);
            }
        },

        end: function end(tag, start, end$1) {
            const element = stack[stack.length - 1];
            // pop stack
            stack.length -= 1;
            currentParent = stack[stack.length - 1];
            if (options.outputSourceRange) {
                element.end = end$1;
            }
            closeElement(element);
        },

        chars: function chars(text, start, end) {
            if (!currentParent) {
                {
                    if (text === template) {
                        warnOnce('Component template requires a root element, rather than just text.', {
                            start,
                        });
                    } else if ((text = text.trim())) {
                        warnOnce(`text "${text}" outside root element will be ignored.`, { start });
                    }
                }
                return;
            }
            // IE textarea placeholder bug
            /* istanbul ignore if */
            if (isIE && currentParent.tag === 'textarea' && currentParent.attrsMap.placeholder === text) {
                return;
            }
            const { children } = currentParent;
            if (inPre || text.trim()) {
                text = isTextTag(currentParent) ? text : decodeHTMLCached(text);
            } else if (!children.length) {
                // remove the whitespace-only node right after an opening tag
                text = '';
            } else if (whitespaceOption) {
                if (whitespaceOption === 'condense') {
                    // in condense mode, remove the whitespace node if it contains
                    // line break, otherwise condense to a single space
                    text = lineBreakRE.test(text) ? '' : ' ';
                } else {
                    text = ' ';
                }
            } else {
                text = preserveWhitespace ? ' ' : '';
            }
            if (text) {
                if (!inPre && whitespaceOption === 'condense') {
                    // condense consecutive whitespaces into single space
                    text = text.replace(whitespaceRE, ' ');
                }
                let res;
                let child;
                if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
                    child = {
                        type: 2,
                        expression: res.expression,
                        tokens: res.tokens,
                        text,
                    };
                } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
                    child = {
                        type: 3,
                        text,
                    };
                }
                if (child) {
                    if (options.outputSourceRange) {
                        child.start = start;
                        child.end = end;
                    }
                    children.push(child);
                }
            }
        },
        comment: function comment(text, start, end) {
            // adding anyting as a sibling to the root node is forbidden
            // comments should still be allowed, but ignored
            if (currentParent) {
                const child = {
                    type: 3,
                    text,
                    isComment: true,
                };
                if (options.outputSourceRange) {
                    child.start = start;
                    child.end = end;
                }
                currentParent.children.push(child);
            }
        },
    });
    return root;
}

function processPre(el) {
    if (getAndRemoveAttr(el, 'v-pre') != null) {
        el.pre = true;
    }
}

function processRawAttrs(el) {
    const list = el.attrsList;
    const len = list.length;
    if (len) {
        const attrs = (el.attrs = new Array(len));
        for (let i = 0; i < len; i++) {
            attrs[i] = {
                name: list[i].name,
                value: JSON.stringify(list[i].value),
            };
            if (list[i].start != null) {
                attrs[i].start = list[i].start;
                attrs[i].end = list[i].end;
            }
        }
    } else if (!el.pre) {
        // non root node in pre blocks with no attributes
        el.plain = true;
    }
}

function processElement(element, options) {
    processKey(element);

    // determine whether this is a plain element after
    // removing structural attributes
    element.plain = !element.key && !element.scopedSlots && !element.attrsList.length;

    processRef(element);
    processSlotContent(element);
    processSlotOutlet(element);
    processComponent(element);
    for (let i = 0; i < transforms.length; i++) {
        element = transforms[i](element, options) || element;
    }
    processAttrs(element);
    return element;
}

function processKey(el) {
    const exp = getBindingAttr(el, 'key');
    if (exp) {
        {
            if (el.tag === 'template') {
                warn$1(
                    '<template> cannot be keyed. Place the key on real elements instead.',
                    getRawBindingAttr(el, 'key')
                );
            }
            if (el.for) {
                const iterator = el.iterator2 || el.iterator1;
                const { parent } = el;
                if (iterator && iterator === exp && parent && parent.tag === 'transition-group') {
                    warn$1(
                        'Do not use v-for index as key on <transition-group> children, ' +
                            'this is the same as not using keys.',
                        getRawBindingAttr(el, 'key'),
                        true /* tip */
                    );
                }
            }
        }
        el.key = exp;
    }
}

function processRef(el) {
    const ref = getBindingAttr(el, 'ref');
    if (ref) {
        el.ref = ref;
        el.refInFor = checkInFor(el);
    }
}

function processFor(el) {
    let exp;
    if ((exp = getAndRemoveAttr(el, 'v-for'))) {
        const res = parseFor(exp);
        if (res) {
            extend(el, res);
        } else {
            warn$1(`Invalid v-for expression: ${exp}`, el.rawAttrsMap['v-for']);
        }
    }
}

function parseFor(exp) {
    const inMatch = exp.match(forAliasRE);
    if (!inMatch) {
        return;
    }
    const res = {};
    res.for = inMatch[2].trim();
    const alias = inMatch[1].trim().replace(stripParensRE, '');
    const iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
        res.alias = alias.replace(forIteratorRE, '').trim();
        res.iterator1 = iteratorMatch[1].trim();
        if (iteratorMatch[2]) {
            res.iterator2 = iteratorMatch[2].trim();
        }
    } else {
        res.alias = alias;
    }
    return res;
}

function processIf(el) {
    const exp = getAndRemoveAttr(el, 'v-if');
    if (exp) {
        el.if = exp;
        addIfCondition(el, {
            exp,
            block: el,
        });
    } else {
        if (getAndRemoveAttr(el, 'v-else') != null) {
            el.else = true;
        }
        const elseif = getAndRemoveAttr(el, 'v-else-if');
        if (elseif) {
            el.elseif = elseif;
        }
    }
}

function processIfConditions(el, parent) {
    const prev = findPrevElement(parent.children);
    if (prev && prev.if) {
        addIfCondition(prev, {
            exp: el.elseif,
            block: el,
        });
    } else {
        warn$1(
            `v-${el.elseif ? `else-if="${el.elseif}"` : 'else'} ` +
                `used on element <${el.tag}> without corresponding v-if.`,
            el.rawAttrsMap[el.elseif ? 'v-else-if' : 'v-else']
        );
    }
}

function findPrevElement(children) {
    let i = children.length;
    while (i--) {
        if (children[i].type === 1) {
            return children[i];
        }
        if (children[i].text !== ' ') {
            warn$1(`text "${children[i].text.trim()}" between v-if and v-else(-if) ` + `will be ignored.`, children[i]);
        }
        children.pop();
    }
}

function addIfCondition(el, condition) {
    if (!el.ifConditions) {
        el.ifConditions = [];
    }
    el.ifConditions.push(condition);
}

function processOnce(el) {
    const once$$1 = getAndRemoveAttr(el, 'v-once');
    if (once$$1 != null) {
        el.once = true;
    }
}

// handle content being passed to a component as slot,
// e.g. <template slot="xxx">, <div slot-scope="xxx">
function processSlotContent(el) {
    let slotScope;
    if (el.tag === 'template') {
        slotScope = getAndRemoveAttr(el, 'scope');
        /* istanbul ignore if */
        if (slotScope) {
            warn$1(
                'the "scope" attribute for scoped slots have been deprecated and ' +
                    'replaced by "slot-scope" since 2.5. The new "slot-scope" attribute ' +
                    'can also be used on plain elements in addition to <template> to ' +
                    'denote scoped slots.',
                el.rawAttrsMap.scope,
                true
            );
        }
        el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
        /* istanbul ignore if */
        if (el.attrsMap['v-for']) {
            warn$1(
                `Ambiguous combined usage of slot-scope and v-for on <${el.tag}> ` +
                    `(v-for takes higher priority). Use a wrapper <template> for the ` +
                    `scoped slot to make it clearer.`,
                el.rawAttrsMap['slot-scope'],
                true
            );
        }
        el.slotScope = slotScope;
    }

    // slot="xxx"
    const slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
        el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
        el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot']);
        // preserve slot as an attribute for native shadow DOM compat
        // only for non-scoped slots.
        if (el.tag !== 'template' && !el.slotScope) {
            addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'));
        }
    }

    // 2.6 v-slot syntax
    {
        if (el.tag === 'template') {
            // v-slot on <template>
            const slotBinding = getAndRemoveAttrByRegex(el, slotRE);
            if (slotBinding) {
                {
                    if (el.slotTarget || el.slotScope) {
                        warn$1('Unexpected mixed usage of different slot syntaxes.', el);
                    }
                    if (el.parent && !maybeComponent(el.parent)) {
                        warn$1(
                            '<template v-slot> can only appear at the root level inside ' +
                                'the receiving the component',
                            el
                        );
                    }
                }
                const ref = getSlotName(slotBinding);
                const { name } = ref;
                const { dynamic } = ref;
                el.slotTarget = name;
                el.slotTargetDynamic = dynamic;
                el.slotScope = slotBinding.value || emptySlotScopeToken; // force it into a scoped slot for perf
            }
        } else {
            // v-slot on component, denotes default slot
            const slotBinding$1 = getAndRemoveAttrByRegex(el, slotRE);
            if (slotBinding$1) {
                {
                    if (!maybeComponent(el)) {
                        warn$1('v-slot can only be used on components or <template>.', slotBinding$1);
                    }
                    if (el.slotScope || el.slotTarget) {
                        warn$1('Unexpected mixed usage of different slot syntaxes.', el);
                    }
                    if (el.scopedSlots) {
                        warn$1(
                            'To avoid scope ambiguity, the default slot should also use ' +
                                '<template> syntax when there are other named slots.',
                            slotBinding$1
                        );
                    }
                }
                // add the component's children to its default slot
                const slots = el.scopedSlots || (el.scopedSlots = {});
                const ref$1 = getSlotName(slotBinding$1);
                const name$1 = ref$1.name;
                const dynamic$1 = ref$1.dynamic;
                const slotContainer = (slots[name$1] = createASTElement('template', [], el));
                slotContainer.slotTarget = name$1;
                slotContainer.slotTargetDynamic = dynamic$1;
                slotContainer.children = el.children.filter(function(c) {
                    if (!c.slotScope) {
                        c.parent = slotContainer;
                        return true;
                    }
                });
                slotContainer.slotScope = slotBinding$1.value || emptySlotScopeToken;
                // remove children as they are returned from scopedSlots now
                el.children = [];
                // mark el non-plain so data gets generated
                el.plain = false;
            }
        }
    }
}

function getSlotName(binding) {
    let name = binding.name.replace(slotRE, '');
    if (!name) {
        if (binding.name[0] !== '#') {
            name = 'default';
        } else {
            warn$1('v-slot shorthand syntax requires a slot name.', binding);
        }
    }
    return dynamicArgRE.test(name)
        ? // dynamic [name]
          { name: name.slice(1, -1), dynamic: true }
        : // static name
          { name: `"${name}"`, dynamic: false };
}

// handle <slot/> outlets
function processSlotOutlet(el) {
    if (el.tag === 'slot') {
        el.slotName = getBindingAttr(el, 'name');
        if (el.key) {
            warn$1(
                '`key` does not work on <slot> because slots are abstract outlets ' +
                    'and can possibly expand into multiple elements. ' +
                    'Use the key on a wrapping element instead.',
                getRawBindingAttr(el, 'key')
            );
        }
    }
}

function processComponent(el) {
    let binding;
    if ((binding = getBindingAttr(el, 'is'))) {
        el.component = binding;
    }
    if (getAndRemoveAttr(el, 'inline-template') != null) {
        el.inlineTemplate = true;
    }
}

function processAttrs(el) {
    const list = el.attrsList;
    let i;
    let l;
    let name;
    let rawName;
    let value;
    let modifiers;
    let syncGen;
    let isDynamic;
    for (i = 0, l = list.length; i < l; i++) {
        name = rawName = list[i].name;
        value = list[i].value;
        if (dirRE.test(name)) {
            // mark element as dynamic
            el.hasBindings = true;
            // modifiers
            modifiers = parseModifiers(name.replace(dirRE, ''));
            // support .foo shorthand syntax for the .prop modifier
            if (modifiers) {
                name = name.replace(modifierRE, '');
            }
            if (bindRE.test(name)) {
                // v-bind
                name = name.replace(bindRE, '');
                value = parseFilters(value);
                isDynamic = dynamicArgRE.test(name);
                if (isDynamic) {
                    name = name.slice(1, -1);
                }
                if (value.trim().length === 0) {
                    warn$1(`The value for a v-bind expression cannot be empty. Found in "v-bind:${name}"`);
                }
                if (modifiers) {
                    if (modifiers.prop && !isDynamic) {
                        name = camelize(name);
                        if (name === 'innerHtml') {
                            name = 'innerHTML';
                        }
                    }
                    if (modifiers.camel && !isDynamic) {
                        name = camelize(name);
                    }
                    if (modifiers.sync) {
                        syncGen = genAssignmentCode(value, '$event');
                        if (!isDynamic) {
                            addHandler(el, `update:${camelize(name)}`, syncGen, null, false, warn$1, list[i]);
                            if (hyphenate(name) !== camelize(name)) {
                                addHandler(el, `update:${hyphenate(name)}`, syncGen, null, false, warn$1, list[i]);
                            }
                        } else {
                            // handler w/ dynamic event name
                            addHandler(
                                el,
                                `"update:"+(${name})`,
                                syncGen,
                                null,
                                false,
                                warn$1,
                                list[i],
                                true // dynamic
                            );
                        }
                    }
                }
                if (
                    (modifiers && modifiers.prop) ||
                    (!el.component && platformMustUseProp(el.tag, el.attrsMap.type, name))
                ) {
                    addProp(el, name, value, list[i], isDynamic);
                } else {
                    addAttr(el, name, value, list[i], isDynamic);
                }
            } else if (onRE.test(name)) {
                // v-on
                name = name.replace(onRE, '');
                isDynamic = dynamicArgRE.test(name);
                if (isDynamic) {
                    name = name.slice(1, -1);
                }
                addHandler(el, name, value, modifiers, false, warn$1, list[i], isDynamic);
            } else {
                // normal directives
                name = name.replace(dirRE, '');
                // parse arg
                const argMatch = name.match(argRE);
                let arg = argMatch && argMatch[1];
                isDynamic = false;
                if (arg) {
                    name = name.slice(0, -(arg.length + 1));
                    if (dynamicArgRE.test(arg)) {
                        arg = arg.slice(1, -1);
                        isDynamic = true;
                    }
                }
                addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i]);
                if (name === 'model') {
                    checkForAliasModel(el, value);
                }
            }
        } else {
            // literal attribute
            {
                const res = parseText(value, delimiters);
                if (res) {
                    warn$1(
                        `${name}="${value}": ` +
                            `Interpolation inside attributes has been removed. ` +
                            `Use v-bind or the colon shorthand instead. For example, ` +
                            `instead of <div id="{{ val }}">, use <div :id="val">.`,
                        list[i]
                    );
                }
            }
            addAttr(el, name, JSON.stringify(value), list[i]);
            // #6887 firefox doesn't update muted state if set via attribute
            // even immediately after element creation
            if (!el.component && name === 'muted' && platformMustUseProp(el.tag, el.attrsMap.type, name)) {
                addProp(el, name, 'true', list[i]);
            }
        }
    }
}

function checkInFor(el) {
    let parent = el;
    while (parent) {
        if (parent.for !== undefined) {
            return true;
        }
        parent = parent.parent;
    }
    return false;
}

function parseModifiers(name) {
    const match = name.match(modifierRE);
    if (match) {
        const ret = {};
        match.forEach(function(m) {
            ret[m.slice(1)] = true;
        });
        return ret;
    }
}

function makeAttrsMap(attrs) {
    const map = {};
    for (let i = 0, l = attrs.length; i < l; i++) {
        if (map[attrs[i].name] && !isIE && !isEdge) {
            warn$1(`duplicate attribute: ${attrs[i].name}`, attrs[i]);
        }
        map[attrs[i].name] = attrs[i].value;
    }
    return map;
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag(el) {
    return el.tag === 'script' || el.tag === 'style';
}

function isForbiddenTag(el) {
    return el.tag === 'style' || (el.tag === 'script' && (!el.attrsMap.type || el.attrsMap.type === 'text/javascript'));
}

const ieNSBug = /^xmlns:NS\d+/;
const ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug(attrs) {
    const res = [];
    for (let i = 0; i < attrs.length; i++) {
        const attr = attrs[i];
        if (!ieNSBug.test(attr.name)) {
            attr.name = attr.name.replace(ieNSPrefix, '');
            res.push(attr);
        }
    }
    return res;
}

function checkForAliasModel(el, value) {
    let _el = el;
    while (_el) {
        if (_el.for && _el.alias === value) {
            warn$1(
                `<${el.tag} v-model="${value}">: ` +
                    `You are binding v-model directly to a v-for iteration alias. ` +
                    `This will not be able to modify the v-for source array because ` +
                    `writing to the alias is like modifying a function local variable. ` +
                    `Consider using an array of objects and use v-model on an object property instead.`,
                el.rawAttrsMap['v-model']
            );
        }
        _el = _el.parent;
    }
}

/*  */

function preTransformNode(el, options) {
    if (el.tag === 'input') {
        const map = el.attrsMap;
        if (!map['v-model']) {
            return;
        }

        let typeBinding;
        if (map[':type'] || map['v-bind:type']) {
            typeBinding = getBindingAttr(el, 'type');
        }
        if (!map.type && !typeBinding && map['v-bind']) {
            typeBinding = `(${map['v-bind']}).type`;
        }

        if (typeBinding) {
            const ifCondition = getAndRemoveAttr(el, 'v-if', true);
            const ifConditionExtra = ifCondition ? `&&(${ifCondition})` : '';
            const hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
            const elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
            // 1. checkbox
            const branch0 = cloneASTElement(el);
            // process for on the main node
            processFor(branch0);
            addRawAttr(branch0, 'type', 'checkbox');
            processElement(branch0, options);
            branch0.processed = true; // prevent it from double-processed
            branch0.if = `(${typeBinding})==='checkbox'${ifConditionExtra}`;
            addIfCondition(branch0, {
                exp: branch0.if,
                block: branch0,
            });
            // 2. add radio else-if condition
            const branch1 = cloneASTElement(el);
            getAndRemoveAttr(branch1, 'v-for', true);
            addRawAttr(branch1, 'type', 'radio');
            processElement(branch1, options);
            addIfCondition(branch0, {
                exp: `(${typeBinding})==='radio'${ifConditionExtra}`,
                block: branch1,
            });
            // 3. other
            const branch2 = cloneASTElement(el);
            getAndRemoveAttr(branch2, 'v-for', true);
            addRawAttr(branch2, ':type', typeBinding);
            processElement(branch2, options);
            addIfCondition(branch0, {
                exp: ifCondition,
                block: branch2,
            });

            if (hasElse) {
                branch0.else = true;
            } else if (elseIfCondition) {
                branch0.elseif = elseIfCondition;
            }

            return branch0;
        }
    }
}

function cloneASTElement(el) {
    return createASTElement(el.tag, el.attrsList.slice(), el.parent);
}

const model$1 = {
    preTransformNode,
};

const modules$1 = [klass, style, model$1];

/*  */

let warn$2;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
const RANGE_TOKEN = '__r';

function model$2(el, dir, _warn) {
    warn$2 = _warn;
    const { value } = dir;
    const { modifiers } = dir;
    const { tag } = el;
    const { type } = el.attrsMap;

    {
        // inputs with type="file" are read only and setting the input's
        // value will throw an error.
        if (tag === 'input' && type === 'file') {
            warn$2(
                `<${el.tag} v-model="${value}" type="file">:\n` +
                    `File inputs are read only. Use a v-on:change listener instead.`,
                el.rawAttrsMap['v-model']
            );
        }
    }

    if (el.component) {
        genComponentModel(el, value, modifiers);
        // component v-model doesn't need extra runtime
        return false;
    }
    if (tag === 'select') {
        genSelect(el, value, modifiers);
    } else if (tag === 'input' && type === 'checkbox') {
        genCheckboxModel(el, value, modifiers);
    } else if (tag === 'input' && type === 'radio') {
        genRadioModel(el, value, modifiers);
    } else if (tag === 'input' || tag === 'textarea') {
        genDefaultModel(el, value, modifiers);
    } else {
        genComponentModel(el, value, modifiers);
        // component v-model doesn't need extra runtime
        return false;
    }

    // ensure runtime directive metadata
    return true;
}

function genCheckboxModel(el, value, modifiers) {
    const number = modifiers && modifiers.number;
    const valueBinding = getBindingAttr(el, 'value') || 'null';
    const trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
    const falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
    addProp(
        el,
        'checked',
        `Array.isArray(${value})` +
            `?_i(${value},${valueBinding})>-1${
                trueValueBinding === 'true' ? `:(${value})` : `:_q(${value},${trueValueBinding})`
            }`
    );
    addHandler(
        el,
        'change',
        `var $$a=${value},` +
            `$$el=$event.target,` +
            `$$c=$$el.checked?(${trueValueBinding}):(${falseValueBinding});` +
            `if(Array.isArray($$a)){` +
            `var $$v=${number ? `_n(${valueBinding})` : valueBinding},` +
            `$$i=_i($$a,$$v);` +
            `if($$el.checked){$$i<0&&(${genAssignmentCode(value, '$$a.concat([$$v])')})}` +
            `else{$$i>-1&&(${genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')})}` +
            `}else{${genAssignmentCode(value, '$$c')}}`,
        null,
        true
    );
}

function genRadioModel(el, value, modifiers) {
    const number = modifiers && modifiers.number;
    let valueBinding = getBindingAttr(el, 'value') || 'null';
    valueBinding = number ? `_n(${valueBinding})` : valueBinding;
    addProp(el, 'checked', `_q(${value},${valueBinding})`);
    addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect(el, value, modifiers) {
    const number = modifiers && modifiers.number;
    const selectedVal = `${'Array.prototype.filter' +
        '.call($event.target.options,function(o){return o.selected})' +
        '.map(function(o){var val = "_value" in o ? o._value : o.value;' +
        'return '}${number ? '_n(val)' : 'val'}})`;

    const assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
    let code = `var $$selectedVal = ${selectedVal};`;
    code = `${code} ${genAssignmentCode(value, assignment)}`;
    addHandler(el, 'change', code, null, true);
}

function genDefaultModel(el, value, modifiers) {
    const { type } = el.attrsMap;

    // warn if v-bind:value conflicts with v-model
    // except for inputs with v-bind:type
    {
        const value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
        const typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
        if (value$1 && !typeBinding) {
            const binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
            warn$2(
                `${binding}="${value$1}" conflicts with v-model on the same element ` +
                    `because the latter already expands to a value binding internally`,
                el.rawAttrsMap[binding]
            );
        }
    }

    const ref = modifiers || {};
    const { lazy } = ref;
    const { number } = ref;
    const { trim } = ref;
    const needCompositionGuard = !lazy && type !== 'range';
    const event = lazy ? 'change' : type === 'range' ? RANGE_TOKEN : 'input';

    let valueExpression = '$event.target.value';
    if (trim) {
        valueExpression = '$event.target.value.trim()';
    }
    if (number) {
        valueExpression = `_n(${valueExpression})`;
    }

    let code = genAssignmentCode(value, valueExpression);
    if (needCompositionGuard) {
        code = `if($event.target.composing)return;${code}`;
    }

    addProp(el, 'value', `(${value})`);
    addHandler(el, event, code, null, true);
    if (trim || number) {
        addHandler(el, 'blur', '$forceUpdate()');
    }
}

/*  */

function text(el, dir) {
    if (dir.value) {
        addProp(el, 'textContent', `_s(${dir.value})`, dir);
    }
}

/*  */

function html(el, dir) {
    if (dir.value) {
        addProp(el, 'innerHTML', `_s(${dir.value})`, dir);
    }
}

const directives = {
    model: model$2,
    text,
    html,
};

/*  */

const baseOptions = {
    expectHTML: true,
    modules: modules$1,
    directives,
    isPreTag,
    isUnaryTag,
    mustUseProp,
    canBeLeftOpenTag,
    isReservedTag,
    getTagNamespace,
    staticKeys: genStaticKeys(modules$1),
};

/*  */

const fnExpRE = /^([\w$]+|\([^)]*?\))\s*=>|^function\s*(?:[\w$]+)?\s*\(/;
const fnInvokeRE = /\([^)]*?\);*$/;
const simplePathRE = /^[$A-Z_a-z][\w$]*(?:\.[$A-Z_a-z][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[$A-Z_a-z][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
const keyCodes = {
    esc: 27,
    tab: 9,
    enter: 13,
    space: 32,
    up: 38,
    left: 37,
    right: 39,
    down: 40,
    delete: [8, 46],
};

// KeyboardEvent.key aliases
const keyNames = {
    // #7880: IE11 and Edge use `Esc` for Escape key name.
    esc: ['Esc', 'Escape'],
    tab: 'Tab',
    enter: 'Enter',
    // #9112: IE11 uses `Spacebar` for Space key name.
    space: [' ', 'Spacebar'],
    // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
    up: ['Up', 'ArrowUp'],
    left: ['Left', 'ArrowLeft'],
    right: ['Right', 'ArrowRight'],
    down: ['Down', 'ArrowDown'],
    // #9112: IE11 uses `Del` for Delete key name.
    delete: ['Backspace', 'Delete', 'Del'],
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
const genGuard = function(condition) {
    return `if(${condition})return null;`;
};

const modifierCode = {
    stop: '$event.stopPropagation();',
    prevent: '$event.preventDefault();',
    self: genGuard('$event.target !== $event.currentTarget'),
    ctrl: genGuard('!$event.ctrlKey'),
    shift: genGuard('!$event.shiftKey'),
    alt: genGuard('!$event.altKey'),
    meta: genGuard('!$event.metaKey'),
    left: genGuard("'button' in $event && $event.button !== 0"),
    middle: genGuard("'button' in $event && $event.button !== 1"),
    right: genGuard("'button' in $event && $event.button !== 2"),
};

function genHandlers(events, isNative) {
    const prefix = isNative ? 'nativeOn:' : 'on:';
    let staticHandlers = '';
    let dynamicHandlers = '';
    for (const name in events) {
        const handlerCode = genHandler(events[name]);
        if (events[name] && events[name].dynamic) {
            dynamicHandlers += `${name},${handlerCode},`;
        } else {
            staticHandlers += `"${name}":${handlerCode},`;
        }
    }
    staticHandlers = `{${staticHandlers.slice(0, -1)}}`;
    if (dynamicHandlers) {
        return `${prefix}_d(${staticHandlers},[${dynamicHandlers.slice(0, -1)}])`;
    }
    return prefix + staticHandlers;
}

function genHandler(handler) {
    if (!handler) {
        return 'function(){}';
    }

    if (Array.isArray(handler)) {
        return `[${handler
            .map(function(handler) {
                return genHandler(handler);
            })
            .join(',')}]`;
    }

    const isMethodPath = simplePathRE.test(handler.value);
    const isFunctionExpression = fnExpRE.test(handler.value);
    const isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''));

    if (!handler.modifiers) {
        if (isMethodPath || isFunctionExpression) {
            return handler.value;
        }
        return `function($event){${isFunctionInvocation ? `return ${handler.value}` : handler.value}}`; // inline statement
    }
    let code = '';
    let genModifierCode = '';
    const keys = [];
    for (const key in handler.modifiers) {
        if (modifierCode[key]) {
            genModifierCode += modifierCode[key];
            // left/right
            if (keyCodes[key]) {
                keys.push(key);
            }
        } else if (key === 'exact') {
            var { modifiers } = handler;
            genModifierCode += genGuard(
                ['ctrl', 'shift', 'alt', 'meta']
                    .filter(function(keyModifier) {
                        return !modifiers[keyModifier];
                    })
                    .map(function(keyModifier) {
                        return `$event.${keyModifier}Key`;
                    })
                    .join('||')
            );
        } else {
            keys.push(key);
        }
    }
    if (keys.length) {
        code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
        code += genModifierCode;
    }
    const handlerCode = isMethodPath
        ? `return ${handler.value}($event)`
        : isFunctionExpression
        ? `return (${handler.value})($event)`
        : isFunctionInvocation
        ? `return ${handler.value}`
        : handler.value;
    return `function($event){${code}${handlerCode}}`;
}

function genKeyFilter(keys) {
    return (
        // make sure the key filters only apply to KeyboardEvents
        // #9441: can't use 'keyCode' in $event because Chrome autofill fires fake
        // key events that do not have keyCode property...
        `if(!$event.type.indexOf('key')&&${keys.map(genFilterCode).join('&&')})return null;`
    );
}

function genFilterCode(key) {
    const keyVal = parseInt(key, 10);
    if (keyVal) {
        return `$event.keyCode!==${keyVal}`;
    }
    const keyCode = keyCodes[key];
    const keyName = keyNames[key];
    return (
        `_k($event.keyCode,${JSON.stringify(key)},${JSON.stringify(keyCode)},` +
        `$event.key,` +
        `${JSON.stringify(keyName)})`
    );
}

/*  */

function on(el, dir) {
    if (dir.modifiers) {
        warn('v-on without argument does not support modifiers.');
    }
    el.wrapListeners = function(code) {
        return `_g(${code},${dir.value})`;
    };
}

/*  */

function bind$1(el, dir) {
    el.wrapData = function(code) {
        return `_b(${code},'${el.tag}',${dir.value},${dir.modifiers && dir.modifiers.prop ? 'true' : 'false'}${
            dir.modifiers && dir.modifiers.sync ? ',true' : ''
        })`;
    };
}

/*  */

const baseDirectives$1 = {
    on,
    bind: bind$1,
    cloak: noop,
};

/*  */

const CodegenState = function CodegenState(options) {
    this.options = options;
    this.warn = options.warn || baseWarn;
    this.transforms = pluckModuleFunction(options.modules, 'transformCode');
    this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
    this.directives = extend(extend({}, baseDirectives$1), options.directives);
    const isReservedTag = options.isReservedTag || no;
    this.maybeComponent = function(el) {
        return !!el.component || !isReservedTag(el.tag);
    };
    this.onceId = 0;
    this.staticRenderFns = [];
    this.pre = false;
};

function generate(ast, options) {
    const state = new CodegenState(options);
    const code = ast ? genElement(ast, state) : '_c("div")';
    return {
        render: `with(this){return ${code}}`,
        staticRenderFns: state.staticRenderFns,
    };
}

function genElement(el, state) {
    if (el.parent) {
        el.pre = el.pre || el.parent.pre;
    }

    if (el.staticRoot && !el.staticProcessed) {
        return genStatic(el, state);
    }
    if (el.once && !el.onceProcessed) {
        return genOnce(el, state);
    }
    if (el.for && !el.forProcessed) {
        return genFor(el, state);
    }
    if (el.if && !el.ifProcessed) {
        return genIf(el, state);
    }
    if (el.tag === 'template' && !el.slotTarget && !state.pre) {
        return genChildren(el, state) || 'void 0';
    }
    if (el.tag === 'slot') {
        return genSlot(el, state);
    }
    // component or element
    let code;
    if (el.component) {
        code = genComponent(el.component, el, state);
    } else {
        let data;
        if (!el.plain || (el.pre && state.maybeComponent(el))) {
            data = genData$2(el, state);
        }

        const children = el.inlineTemplate ? null : genChildren(el, state, true);
        code = `_c('${el.tag}'${data ? `,${data}` : ''}${children ? `,${children}` : ''})`;
    }
    // module transforms
    for (let i = 0; i < state.transforms.length; i++) {
        code = state.transforms[i](el, code);
    }
    return code;
}

// hoist static sub-trees out
function genStatic(el, state) {
    el.staticProcessed = true;
    // Some elements (templates) need to behave differently inside of a v-pre
    // node.  All pre nodes are static roots, so we can use this as a location to
    // wrap a state change and reset it upon exiting the pre node.
    const originalPreState = state.pre;
    if (el.pre) {
        state.pre = el.pre;
    }
    state.staticRenderFns.push(`with(this){return ${genElement(el, state)}}`);
    state.pre = originalPreState;
    return `_m(${state.staticRenderFns.length - 1}${el.staticInFor ? ',true' : ''})`;
}

// v-once
function genOnce(el, state) {
    el.onceProcessed = true;
    if (el.if && !el.ifProcessed) {
        return genIf(el, state);
    }
    if (el.staticInFor) {
        let key = '';
        let { parent } = el;
        while (parent) {
            if (parent.for) {
                key = parent.key;
                break;
            }
            parent = parent.parent;
        }
        if (!key) {
            state.warn('v-once can only be used inside v-for that is keyed. ', el.rawAttrsMap['v-once']);
            return genElement(el, state);
        }
        return `_o(${genElement(el, state)},${state.onceId++},${key})`;
    }
    return genStatic(el, state);
}

function genIf(el, state, altGen, altEmpty) {
    el.ifProcessed = true; // avoid recursion
    return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty);
}

function genIfConditions(conditions, state, altGen, altEmpty) {
    if (!conditions.length) {
        return altEmpty || '_e()';
    }

    const condition = conditions.shift();
    if (condition.exp) {
        return `(${condition.exp})?${genTernaryExp(condition.block)}:${genIfConditions(
            conditions,
            state,
            altGen,
            altEmpty
        )}`;
    }
    return `${genTernaryExp(condition.block)}`;

    // v-if with v-once should generate code like (a)?_m(0):_m(1)
    function genTernaryExp(el) {
        return altGen ? altGen(el, state) : el.once ? genOnce(el, state) : genElement(el, state);
    }
}

function genFor(el, state, altGen, altHelper) {
    const exp = el.for;
    const { alias } = el;
    const iterator1 = el.iterator1 ? `,${el.iterator1}` : '';
    const iterator2 = el.iterator2 ? `,${el.iterator2}` : '';

    if (state.maybeComponent(el) && el.tag !== 'slot' && el.tag !== 'template' && !el.key) {
        state.warn(
            `<${el.tag} v-for="${alias} in ${exp}">: component lists rendered with ` +
                `v-for should have explicit keys. ` +
                `See https://vuejs.org/guide/list.html#key for more info.`,
            el.rawAttrsMap['v-for'],
            true /* tip */
        );
    }

    el.forProcessed = true; // avoid recursion
    return (
        `${altHelper || '_l'}((${exp}),` +
        `function(${alias}${iterator1}${iterator2}){` +
        `return ${(altGen || genElement)(el, state)}})`
    );
}

function genData$2(el, state) {
    let data = '{';

    // directives first.
    // directives may mutate the el's other properties before they are generated.
    const dirs = genDirectives(el, state);
    if (dirs) {
        data += `${dirs},`;
    }

    // key
    if (el.key) {
        data += `key:${el.key},`;
    }
    // ref
    if (el.ref) {
        data += `ref:${el.ref},`;
    }
    if (el.refInFor) {
        data += 'refInFor:true,';
    }
    // pre
    if (el.pre) {
        data += 'pre:true,';
    }
    // record original tag name for components using "is" attribute
    if (el.component) {
        data += `tag:"${el.tag}",`;
    }
    // module data generation functions
    for (let i = 0; i < state.dataGenFns.length; i++) {
        data += state.dataGenFns[i](el);
    }
    // attributes
    if (el.attrs) {
        data += `attrs:${genProps(el.attrs)},`;
    }
    // DOM props
    if (el.props) {
        data += `domProps:${genProps(el.props)},`;
    }
    // event handlers
    if (el.events) {
        data += `${genHandlers(el.events, false)},`;
    }
    if (el.nativeEvents) {
        data += `${genHandlers(el.nativeEvents, true)},`;
    }
    // slot target
    // only for non-scoped slots
    if (el.slotTarget && !el.slotScope) {
        data += `slot:${el.slotTarget},`;
    }
    // scoped slots
    if (el.scopedSlots) {
        data += `${genScopedSlots(el, el.scopedSlots, state)},`;
    }
    // component v-model
    if (el.model) {
        data += `model:{value:${el.model.value},callback:${el.model.callback},expression:${el.model.expression}},`;
    }
    // inline-template
    if (el.inlineTemplate) {
        const inlineTemplate = genInlineTemplate(el, state);
        if (inlineTemplate) {
            data += `${inlineTemplate},`;
        }
    }
    data = `${data.replace(/,$/, '')}}`;
    // v-bind dynamic argument wrap
    // v-bind with dynamic arguments must be applied using the same v-bind object
    // merge helper so that class/style/mustUseProp attrs are handled correctly.
    if (el.dynamicAttrs) {
        data = `_b(${data},"${el.tag}",${genProps(el.dynamicAttrs)})`;
    }
    // v-bind data wrap
    if (el.wrapData) {
        data = el.wrapData(data);
    }
    // v-on data wrap
    if (el.wrapListeners) {
        data = el.wrapListeners(data);
    }
    return data;
}

function genDirectives(el, state) {
    const dirs = el.directives;
    if (!dirs) {
        return;
    }
    let res = 'directives:[';
    let hasRuntime = false;
    let i;
    let l;
    let dir;
    let needRuntime;
    for (i = 0, l = dirs.length; i < l; i++) {
        dir = dirs[i];
        needRuntime = true;
        const gen = state.directives[dir.name];
        if (gen) {
            // compile-time directive that manipulates AST.
            // returns true if it also needs a runtime counterpart.
            needRuntime = !!gen(el, dir, state.warn);
        }
        if (needRuntime) {
            hasRuntime = true;
            res += `{name:"${dir.name}",rawName:"${dir.rawName}"${
                dir.value ? `,value:(${dir.value}),expression:${JSON.stringify(dir.value)}` : ''
            }${dir.arg ? `,arg:${dir.isDynamicArg ? dir.arg : `"${dir.arg}"`}` : ''}${
                dir.modifiers ? `,modifiers:${JSON.stringify(dir.modifiers)}` : ''
            }},`;
        }
    }
    if (hasRuntime) {
        return `${res.slice(0, -1)}]`;
    }
}

function genInlineTemplate(el, state) {
    const ast = el.children[0];
    if (el.children.length !== 1 || ast.type !== 1) {
        state.warn('Inline-template components must have exactly one child element.', { start: el.start });
    }
    if (ast && ast.type === 1) {
        const inlineRenderFns = generate(ast, state.options);
        return `inlineTemplate:{render:function(){${
            inlineRenderFns.render
        }},staticRenderFns:[${inlineRenderFns.staticRenderFns
            .map(function(code) {
                return `function(){${code}}`;
            })
            .join(',')}]}`;
    }
}

function genScopedSlots(el, slots, state) {
    // by default scoped slots are considered "stable", this allows child
    // components with only scoped slots to skip forced updates from parent.
    // but in some cases we have to bail-out of this optimization
    // for example if the slot contains dynamic names, has v-if or v-for on them...
    let needsForceUpdate =
        el.for ||
        Object.keys(slots).some(function(key) {
            const slot = slots[key];
            return (
                slot.slotTargetDynamic || slot.if || slot.for || containsSlotChild(slot) // is passing down slot from parent which may be dynamic
            );
        });

    // #9534: if a component with scoped slots is inside a conditional branch,
    // it's possible for the same component to be reused but with different
    // compiled slot content. To avoid that, we generate a unique key based on
    // the generated code of all the slot contents.
    let needsKey = !!el.if;

    // OR when it is inside another scoped slot or v-for (the reactivity may be
    // disconnected due to the intermediate scope variable)
    // #9438, #9506
    // TODO: this can be further optimized by properly analyzing in-scope bindings
    // and skip force updating ones that do not actually use scope variables.
    if (!needsForceUpdate) {
        let { parent } = el;
        while (parent) {
            if ((parent.slotScope && parent.slotScope !== emptySlotScopeToken) || parent.for) {
                needsForceUpdate = true;
                break;
            }
            if (parent.if) {
                needsKey = true;
            }
            parent = parent.parent;
        }
    }

    const generatedSlots = Object.keys(slots)
        .map(function(key) {
            return genScopedSlot(slots[key], state);
        })
        .join(',');

    return `scopedSlots:_u([${generatedSlots}]${needsForceUpdate ? ',null,true' : ''}${
        !needsForceUpdate && needsKey ? `,null,false,${hash(generatedSlots)}` : ''
    })`;
}

function hash(str) {
    let hash = 5381;
    let i = str.length;
    while (i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);
    }
    return hash >>> 0;
}

function containsSlotChild(el) {
    if (el.type === 1) {
        if (el.tag === 'slot') {
            return true;
        }
        return el.children.some(containsSlotChild);
    }
    return false;
}

function genScopedSlot(el, state) {
    const isLegacySyntax = el.attrsMap['slot-scope'];
    if (el.if && !el.ifProcessed && !isLegacySyntax) {
        return genIf(el, state, genScopedSlot, 'null');
    }
    if (el.for && !el.forProcessed) {
        return genFor(el, state, genScopedSlot);
    }
    const slotScope = el.slotScope === emptySlotScopeToken ? '' : String(el.slotScope);
    const fn =
        `function(${slotScope}){` +
        `return ${
            el.tag === 'template'
                ? el.if && isLegacySyntax
                    ? `(${el.if})?${genChildren(el, state) || 'undefined'}:undefined`
                    : genChildren(el, state) || 'undefined'
                : genElement(el, state)
        }}`;
    // reverse proxy v-slot without scope on this.$slots
    const reverseProxy = slotScope ? '' : ',proxy:true';
    return `{key:${el.slotTarget || '"default"'},fn:${fn}${reverseProxy}}`;
}

function genChildren(el, state, checkSkip, altGenElement, altGenNode) {
    const { children } = el;
    if (children.length) {
        const el$1 = children[0];
        // optimize single v-for
        if (children.length === 1 && el$1.for && el$1.tag !== 'template' && el$1.tag !== 'slot') {
            const normalizationType = checkSkip ? (state.maybeComponent(el$1) ? ',1' : ',0') : '';
            return `${(altGenElement || genElement)(el$1, state)}${normalizationType}`;
        }
        const normalizationType$1 = checkSkip ? getNormalizationType(children, state.maybeComponent) : 0;
        const gen = altGenNode || genNode;
        return `[${children
            .map(function(c) {
                return gen(c, state);
            })
            .join(',')}]${normalizationType$1 ? `,${normalizationType$1}` : ''}`;
    }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType(children, maybeComponent) {
    let res = 0;
    for (let i = 0; i < children.length; i++) {
        const el = children[i];
        if (el.type !== 1) {
            continue;
        }
        if (
            needsNormalization(el) ||
            (el.ifConditions &&
                el.ifConditions.some(function(c) {
                    return needsNormalization(c.block);
                }))
        ) {
            res = 2;
            break;
        }
        if (
            maybeComponent(el) ||
            (el.ifConditions &&
                el.ifConditions.some(function(c) {
                    return maybeComponent(c.block);
                }))
        ) {
            res = 1;
        }
    }
    return res;
}

function needsNormalization(el) {
    return el.for !== undefined || el.tag === 'template' || el.tag === 'slot';
}

function genNode(node, state) {
    if (node.type === 1) {
        return genElement(node, state);
    }
    if (node.type === 3 && node.isComment) {
        return genComment(node);
    }
    return genText(node);
}

function genText(text) {
    return `_v(${
        text.type === 2
            ? text.expression // no need for () because already wrapped in _s()
            : transformSpecialNewlines(JSON.stringify(text.text))
    })`;
}

function genComment(comment) {
    return `_e(${JSON.stringify(comment.text)})`;
}

function genSlot(el, state) {
    const slotName = el.slotName || '"default"';
    const children = genChildren(el, state);
    let res = `_t(${slotName}${children ? `,${children}` : ''}`;
    const attrs =
        el.attrs || el.dynamicAttrs
            ? genProps(
                  (el.attrs || []).concat(el.dynamicAttrs || []).map(function(attr) {
                      return {
                          // slot props are camelized
                          name: camelize(attr.name),
                          value: attr.value,
                          dynamic: attr.dynamic,
                      };
                  })
              )
            : null;
    const bind$$1 = el.attrsMap['v-bind'];
    if ((attrs || bind$$1) && !children) {
        res += ',null';
    }
    if (attrs) {
        res += `,${attrs}`;
    }
    if (bind$$1) {
        res += `${attrs ? '' : ',null'},${bind$$1}`;
    }
    return `${res})`;
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent(componentName, el, state) {
    const children = el.inlineTemplate ? null : genChildren(el, state, true);
    return `_c(${componentName},${genData$2(el, state)}${children ? `,${children}` : ''})`;
}

function genProps(props) {
    let staticProps = '';
    let dynamicProps = '';
    for (let i = 0; i < props.length; i++) {
        const prop = props[i];
        const value = transformSpecialNewlines(prop.value);
        if (prop.dynamic) {
            dynamicProps += `${prop.name},${value},`;
        } else {
            staticProps += `"${prop.name}":${value},`;
        }
    }
    staticProps = `{${staticProps.slice(0, -1)}}`;
    if (dynamicProps) {
        return `_d(${staticProps},[${dynamicProps.slice(0, -1)}])`;
    }
    return staticProps;
}

// #3895, #4268
function transformSpecialNewlines(text) {
    return text.replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}

/*  */

const plainStringRE = /^"(?:[^"\\]|\\.)*"$|^'(?:[^'\\]|\\.)*'$/;

// let the model AST transform translate v-model into appropriate
// props bindings
function applyModelTransform(el, state) {
    if (el.directives) {
        for (let i = 0; i < el.directives.length; i++) {
            const dir = el.directives[i];
            if (dir.name === 'model') {
                state.directives.model(el, dir, state.warn);
                // remove value for textarea as its converted to text
                if (el.tag === 'textarea' && el.props) {
                    el.props = el.props.filter(function(p) {
                        return p.name !== 'value';
                    });
                }
                break;
            }
        }
    }
}

function genAttrSegments(attrs) {
    return attrs.map(function(ref) {
        const { name } = ref;
        const { value } = ref;

        return genAttrSegment(name, value);
    });
}

function genDOMPropSegments(props, attrs) {
    const segments = [];
    props.forEach(function(ref) {
        let { name } = ref;
        const { value } = ref;

        name = propsToAttrMap[name] || name.toLowerCase();
        if (
            isRenderableAttr(name) &&
            !(
                attrs &&
                attrs.some(function(a) {
                    return a.name === name;
                })
            )
        ) {
            segments.push(genAttrSegment(name, value));
        }
    });
    return segments;
}

function genAttrSegment(name, value) {
    if (plainStringRE.test(value)) {
        // force double quote
        value = value.replace(/^'|'$/g, '"');
        // force enumerated attr to "true"
        if (isEnumeratedAttr(name) && value !== '"false"') {
            value = '"true"';
        }
        return {
            type: RAW,
            value: isBooleanAttr(name)
                ? ` ${name}="${name}"`
                : value === '""'
                ? ` ${name}`
                : ` ${name}="${JSON.parse(value)}"`,
        };
    }
    return {
        type: EXPRESSION,
        value: `_ssrAttr(${JSON.stringify(name)},${value})`,
    };
}

function genClassSegments(staticClass, classBinding) {
    if (staticClass && !classBinding) {
        return [{ type: RAW, value: ` class="${JSON.parse(staticClass)}"` }];
    }
    return [
        {
            type: EXPRESSION,
            value: `_ssrClass(${staticClass || 'null'},${classBinding || 'null'})`,
        },
    ];
}

function genStyleSegments(staticStyle, parsedStaticStyle, styleBinding, vShowExpression) {
    if (staticStyle && !styleBinding && !vShowExpression) {
        return [{ type: RAW, value: ` style=${JSON.stringify(staticStyle)}` }];
    }
    return [
        {
            type: EXPRESSION,
            value: `_ssrStyle(${parsedStaticStyle || 'null'},${styleBinding || 'null'}, ${
                vShowExpression ? `{ display: (${vShowExpression}) ? '' : 'none' }` : 'null'
            })`,
        },
    ];
}

/*  */

// optimizability constants
const optimizability = {
    FALSE: 0, // whole sub tree un-optimizable
    FULL: 1, // whole sub tree optimizable
    SELF: 2, // self optimizable but has some un-optimizable children
    CHILDREN: 3, // self un-optimizable but have fully optimizable children
    PARTIAL: 4, // self un-optimizable with some un-optimizable children
};

let isPlatformReservedTag;

function optimize(root, options) {
    if (!root) {
        return;
    }
    isPlatformReservedTag = options.isReservedTag || no;
    walk(root, true);
}

function walk(node, isRoot) {
    if (isUnOptimizableTree(node)) {
        node.ssrOptimizability = optimizability.FALSE;
        return;
    }
    // root node or nodes with custom directives should always be a VNode
    const selfUnoptimizable = isRoot || hasCustomDirective(node);
    const check = function(child) {
        if (child.ssrOptimizability !== optimizability.FULL) {
            node.ssrOptimizability = selfUnoptimizable ? optimizability.PARTIAL : optimizability.SELF;
        }
    };
    if (selfUnoptimizable) {
        node.ssrOptimizability = optimizability.CHILDREN;
    }
    if (node.type === 1) {
        for (let i = 0, l = node.children.length; i < l; i++) {
            const child = node.children[i];
            walk(child);
            check(child);
        }
        if (node.ifConditions) {
            for (let i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
                const { block } = node.ifConditions[i$1];
                walk(block, isRoot);
                check(block);
            }
        }
        if (node.ssrOptimizability == null || (!isRoot && (node.attrsMap['v-html'] || node.attrsMap['v-text']))) {
            node.ssrOptimizability = optimizability.FULL;
        } else {
            node.children = optimizeSiblings(node);
        }
    } else {
        node.ssrOptimizability = optimizability.FULL;
    }
}

function optimizeSiblings(el) {
    const { children } = el;
    const optimizedChildren = [];

    let currentOptimizableGroup = [];
    const pushGroup = function() {
        if (currentOptimizableGroup.length) {
            optimizedChildren.push({
                type: 1,
                parent: el,
                tag: 'template',
                attrsList: [],
                attrsMap: {},
                rawAttrsMap: {},
                children: currentOptimizableGroup,
                ssrOptimizability: optimizability.FULL,
            });
        }
        currentOptimizableGroup = [];
    };

    for (let i = 0; i < children.length; i++) {
        const c = children[i];
        if (c.ssrOptimizability === optimizability.FULL) {
            currentOptimizableGroup.push(c);
        } else {
            // wrap fully-optimizable adjacent siblings inside a template tag
            // so that they can be optimized into a single ssrNode by codegen
            pushGroup();
            optimizedChildren.push(c);
        }
    }
    pushGroup();
    return optimizedChildren;
}

function isUnOptimizableTree(node) {
    if (node.type === 2 || node.type === 3) {
        // text or expression
        return false;
    }
    return (
        isBuiltInTag(node.tag) || // built-in (slot, component)
        !isPlatformReservedTag(node.tag) || // custom component
        !!node.component || // "is" component
        isSelectWithModel(node) // <select v-model> requires runtime inspection
    );
}

const isBuiltInDir = makeMap('text,html,show,on,bind,model,pre,cloak,once');

function hasCustomDirective(node) {
    return (
        node.type === 1 &&
        node.directives &&
        node.directives.some(function(d) {
            return !isBuiltInDir(d.name);
        })
    );
}

// <select v-model> cannot be optimized because it requires a runtime check
// to determine proper selected option
function isSelectWithModel(node) {
    return (
        node.type === 1 &&
        node.tag === 'select' &&
        node.directives != null &&
        node.directives.some(function(d) {
            return d.name === 'model';
        })
    );
}

/*  */

// segment types
var RAW = 0;
const INTERPOLATION = 1;
var EXPRESSION = 2;

function generate$1(ast, options) {
    const state = new CodegenState(options);
    const code = ast ? genSSRElement(ast, state) : '_c("div")';
    return {
        render: `with(this){return ${code}}`,
        staticRenderFns: state.staticRenderFns,
    };
}

function genSSRElement(el, state) {
    if (el.for && !el.forProcessed) {
        return genFor(el, state, genSSRElement);
    }
    if (el.if && !el.ifProcessed) {
        return genIf(el, state, genSSRElement);
    }
    if (el.tag === 'template' && !el.slotTarget) {
        return el.ssrOptimizability === optimizability.FULL
            ? genChildrenAsStringNode(el, state)
            : genSSRChildren(el, state) || 'void 0';
    }

    switch (el.ssrOptimizability) {
        case optimizability.FULL:
            // stringify whole tree
            return genStringElement(el, state);
        case optimizability.SELF:
            // stringify self and check children
            return genStringElementWithChildren(el, state);
        case optimizability.CHILDREN:
            // generate self as VNode and stringify children
            return genNormalElement(el, state, true);
        case optimizability.PARTIAL:
            // generate self as VNode and check children
            return genNormalElement(el, state, false);
        default:
            // bail whole tree
            return genElement(el, state);
    }
}

function genNormalElement(el, state, stringifyChildren) {
    const data = el.plain ? undefined : genData$2(el, state);
    const children = stringifyChildren ? `[${genChildrenAsStringNode(el, state)}]` : genSSRChildren(el, state, true);
    return `_c('${el.tag}'${data ? `,${data}` : ''}${children ? `,${children}` : ''})`;
}

function genSSRChildren(el, state, checkSkip) {
    return genChildren(el, state, checkSkip, genSSRElement, genSSRNode);
}

function genSSRNode(el, state) {
    return el.type === 1 ? genSSRElement(el, state) : genText(el);
}

function genChildrenAsStringNode(el, state) {
    return el.children.length ? `_ssrNode(${flattenSegments(childrenToSegments(el, state))})` : '';
}

function genStringElement(el, state) {
    return `_ssrNode(${elementToString(el, state)})`;
}

function genStringElementWithChildren(el, state) {
    const children = genSSRChildren(el, state, true);
    return `_ssrNode(${flattenSegments(elementToOpenTagSegments(el, state))},"</${el.tag}>"${
        children ? `,${children}` : ''
    })`;
}

function elementToString(el, state) {
    return `(${flattenSegments(elementToSegments(el, state))})`;
}

function elementToSegments(el, state) {
    // v-for / v-if
    if (el.for && !el.forProcessed) {
        el.forProcessed = true;
        return [
            {
                type: EXPRESSION,
                value: genFor(el, state, elementToString, '_ssrList'),
            },
        ];
    }
    if (el.if && !el.ifProcessed) {
        el.ifProcessed = true;
        return [
            {
                type: EXPRESSION,
                value: genIf(el, state, elementToString, '"<!---->"'),
            },
        ];
    }
    if (el.tag === 'template') {
        return childrenToSegments(el, state);
    }

    const openSegments = elementToOpenTagSegments(el, state);
    const childrenSegments = childrenToSegments(el, state);
    const ref = state.options;
    const { isUnaryTag } = ref;
    const close = isUnaryTag && isUnaryTag(el.tag) ? [] : [{ type: RAW, value: `</${el.tag}>` }];
    return openSegments.concat(childrenSegments, close);
}

function elementToOpenTagSegments(el, state) {
    applyModelTransform(el, state);
    let binding;
    const segments = [{ type: RAW, value: `<${el.tag}` }];
    // attrs
    if (el.attrs) {
        segments.push.apply(segments, genAttrSegments(el.attrs));
    }
    // domProps
    if (el.props) {
        segments.push.apply(segments, genDOMPropSegments(el.props, el.attrs));
    }
    // v-bind="object"
    if ((binding = el.attrsMap['v-bind'])) {
        segments.push({ type: EXPRESSION, value: `_ssrAttrs(${binding})` });
    }
    // v-bind.prop="object"
    if ((binding = el.attrsMap['v-bind.prop'])) {
        segments.push({ type: EXPRESSION, value: `_ssrDOMProps(${binding})` });
    }
    // class
    if (el.staticClass || el.classBinding) {
        segments.push.apply(segments, genClassSegments(el.staticClass, el.classBinding));
    }
    // style & v-show
    if (el.staticStyle || el.styleBinding || el.attrsMap['v-show']) {
        segments.push.apply(
            segments,
            genStyleSegments(el.attrsMap.style, el.staticStyle, el.styleBinding, el.attrsMap['v-show'])
        );
    }
    // _scopedId
    if (state.options.scopeId) {
        segments.push({ type: RAW, value: ` ${state.options.scopeId}` });
    }
    segments.push({ type: RAW, value: '>' });
    return segments;
}

function childrenToSegments(el, state) {
    let binding;
    if ((binding = el.attrsMap['v-html'])) {
        return [{ type: EXPRESSION, value: `_s(${binding})` }];
    }
    if ((binding = el.attrsMap['v-text'])) {
        return [{ type: INTERPOLATION, value: `_s(${binding})` }];
    }
    if (el.tag === 'textarea' && (binding = el.attrsMap['v-model'])) {
        return [{ type: INTERPOLATION, value: `_s(${binding})` }];
    }
    return el.children ? nodesToSegments(el.children, state) : [];
}

function nodesToSegments(children, state) {
    const segments = [];
    for (let i = 0; i < children.length; i++) {
        const c = children[i];
        if (c.type === 1) {
            segments.push.apply(segments, elementToSegments(c, state));
        } else if (c.type === 2) {
            segments.push({ type: INTERPOLATION, value: c.expression });
        } else if (c.type === 3) {
            let text = escape(c.text);
            if (c.isComment) {
                text = `<!--${text}-->`;
            }
            segments.push({ type: RAW, value: text });
        }
    }
    return segments;
}

function flattenSegments(segments) {
    const mergedSegments = [];
    let textBuffer = '';

    const pushBuffer = function() {
        if (textBuffer) {
            mergedSegments.push(JSON.stringify(textBuffer));
            textBuffer = '';
        }
    };

    for (let i = 0; i < segments.length; i++) {
        const s = segments[i];
        if (s.type === RAW) {
            textBuffer += s.value;
        } else if (s.type === INTERPOLATION) {
            pushBuffer();
            mergedSegments.push(`_ssrEscape(${s.value})`);
        } else if (s.type === EXPRESSION) {
            pushBuffer();
            mergedSegments.push(`(${s.value})`);
        }
    }
    pushBuffer();

    return mergedSegments.join('+');
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
const prohibitedKeywordRE = new RegExp(
    `\\b${(
        'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
        'super,throw,while,yield,delete,export,import,return,switch,default,' +
        'extends,finally,continue,debugger,function,arguments'
    )
        .split(',')
        .join('\\b|\\b')}\\b`
);

// these unary operators should not be used as property/method names
const unaryOperatorsRE = new RegExp(
    `\\b${'delete,typeof,void'.split(',').join('\\s*\\([^\\)]*\\)|\\b')}\\s*\\([^\\)]*\\)`
);

// strip strings in expressions
const stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^\\`]|\\.)*\${|}(?:[^\\`]|\\.)*`|`(?:[^\\`]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors(ast, warn) {
    if (ast) {
        checkNode(ast, warn);
    }
}

function checkNode(node, warn) {
    if (node.type === 1) {
        for (const name in node.attrsMap) {
            if (dirRE.test(name)) {
                const value = node.attrsMap[name];
                if (value) {
                    const range = node.rawAttrsMap[name];
                    if (name === 'v-for') {
                        checkFor(node, `v-for="${value}"`, warn, range);
                    } else if (onRE.test(name)) {
                        checkEvent(value, `${name}="${value}"`, warn, range);
                    } else {
                        checkExpression(value, `${name}="${value}"`, warn, range);
                    }
                }
            }
        }
        if (node.children) {
            for (let i = 0; i < node.children.length; i++) {
                checkNode(node.children[i], warn);
            }
        }
    } else if (node.type === 2) {
        checkExpression(node.expression, node.text, warn, node);
    }
}

function checkEvent(exp, text, warn, range) {
    const stipped = exp.replace(stripStringRE, '');
    const keywordMatch = stipped.match(unaryOperatorsRE);
    if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
        warn(
            `${'avoid using JavaScript unary operator as property name: ' + '"'}${
                keywordMatch[0]
            }" in expression ${text.trim()}`,
            range
        );
    }
    checkExpression(exp, text, warn, range);
}

function checkFor(node, text, warn, range) {
    checkExpression(node.for || '', text, warn, range);
    checkIdentifier(node.alias, 'v-for alias', text, warn, range);
    checkIdentifier(node.iterator1, 'v-for iterator', text, warn, range);
    checkIdentifier(node.iterator2, 'v-for iterator', text, warn, range);
}

function checkIdentifier(ident, type, text, warn, range) {
    if (typeof ident === 'string') {
        try {
            new Function(`var ${ident}=_`);
        } catch (e) {
            warn(`invalid ${type} "${ident}" in expression: ${text.trim()}`, range);
        }
    }
}

function checkExpression(exp, text, warn, range) {
    try {
        new Function(`return ${exp}`);
    } catch (e) {
        const keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
        if (keywordMatch) {
            warn(
                `${'avoid using JavaScript keyword as property name: ' + '"'}${
                    keywordMatch[0]
                }"\n  Raw expression: ${text.trim()}`,
                range
            );
        } else {
            warn(
                `invalid expression: ${e.message} in\n\n` + `    ${exp}\n\n` + `  Raw expression: ${text.trim()}\n`,
                range
            );
        }
    }
}

/*  */

const range = 2;

function generateCodeFrame(source, start, end) {
    if (start === void 0) start = 0;
    if (end === void 0) end = source.length;

    const lines = source.split(/\r?\n/);
    let count = 0;
    const res = [];
    for (let i = 0; i < lines.length; i++) {
        count += lines[i].length + 1;
        if (count >= start) {
            for (let j = i - range; j <= i + range || end > count; j++) {
                if (j < 0 || j >= lines.length) {
                    continue;
                }
                res.push(`${j + 1}${repeat$1(' ', 3 - String(j + 1).length)}|  ${lines[j]}`);
                const lineLength = lines[j].length;
                if (j === i) {
                    // push underline
                    const pad = start - (count - lineLength) + 1;
                    const length = end > count ? lineLength - pad : end - start;
                    res.push(`   |  ${repeat$1(' ', pad)}${repeat$1('^', length)}`);
                } else if (j > i) {
                    if (end > count) {
                        const length$1 = Math.min(end - count, lineLength);
                        res.push(`   |  ${repeat$1('^', length$1)}`);
                    }
                    count += lineLength + 1;
                }
            }
            break;
        }
    }
    return res.join('\n');
}

function repeat$1(str, n) {
    let result = '';
    if (n > 0) {
        while (true) {
            // eslint-disable-line
            if (n & 1) {
                result += str;
            }
            n >>>= 1;
            if (n <= 0) {
                break;
            }
            str += str;
        }
    }
    return result;
}

/*  */

function createFunction(code, errors) {
    try {
        return new Function(code);
    } catch (err) {
        errors.push({ err, code });
        return noop;
    }
}

function createCompileToFunctionFn(compile) {
    const cache = Object.create(null);

    return function compileToFunctions(template, options, vm) {
        options = extend({}, options);
        const warn$$1 = options.warn || warn;
        delete options.warn;

        /* istanbul ignore if */
        {
            // detect possible CSP restriction
            try {
                new Function('return 1');
            } catch (e) {
                if (e.toString().match(/unsafe-eval|CSP/)) {
                    warn$$1(
                        'It seems you are using the standalone build of Vue.js in an ' +
                            'environment with Content Security Policy that prohibits unsafe-eval. ' +
                            'The template compiler cannot work in this environment. Consider ' +
                            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
                            'templates into render functions.'
                    );
                }
            }
        }

        // check cache
        const key = options.delimiters ? String(options.delimiters) + template : template;
        if (cache[key]) {
            return cache[key];
        }

        // compile
        const compiled = compile(template, options);

        // check compilation errors/tips
        {
            if (compiled.errors && compiled.errors.length) {
                if (options.outputSourceRange) {
                    compiled.errors.forEach(function(e) {
                        warn$$1(
                            `Error compiling template:\n\n${e.msg}\n\n${generateCodeFrame(template, e.start, e.end)}`,
                            vm
                        );
                    });
                } else {
                    warn$$1(
                        `Error compiling template:\n\n${template}\n\n${compiled.errors
                            .map(function(e) {
                                return `- ${e}`;
                            })
                            .join('\n')}\n`,
                        vm
                    );
                }
            }
            if (compiled.tips && compiled.tips.length) {
                if (options.outputSourceRange) {
                    compiled.tips.forEach(function(e) {
                        return tip(e.msg, vm);
                    });
                } else {
                    compiled.tips.forEach(function(msg) {
                        return tip(msg, vm);
                    });
                }
            }
        }

        // turn code into functions
        const res = {};
        const fnGenErrors = [];
        res.render = createFunction(compiled.render, fnGenErrors);
        res.staticRenderFns = compiled.staticRenderFns.map(function(code) {
            return createFunction(code, fnGenErrors);
        });

        // check function generation errors.
        // this should only happen if there is a bug in the compiler itself.
        // mostly for codegen development use
        /* istanbul ignore if */
        {
            if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
                warn$$1(
                    `Failed to generate render function:\n\n${fnGenErrors
                        .map(function(ref) {
                            const { err } = ref;
                            const { code } = ref;

                            return `${err.toString()} in\n\n${code}\n`;
                        })
                        .join('\n')}`,
                    vm
                );
            }
        }

        return (cache[key] = res);
    };
}

/*  */

function createCompilerCreator(baseCompile) {
    return function createCompiler(baseOptions) {
        function compile(template, options) {
            const finalOptions = Object.create(baseOptions);
            const errors = [];
            const tips = [];

            let warn = function(msg, range, tip) {
                (tip ? tips : errors).push(msg);
            };

            if (options) {
                if (options.outputSourceRange) {
                    // $flow-disable-line
                    const leadingSpaceLength = template.match(/^\s*/)[0].length;

                    warn = function(msg, range, tip) {
                        const data = { msg };
                        if (range) {
                            if (range.start != null) {
                                data.start = range.start + leadingSpaceLength;
                            }
                            if (range.end != null) {
                                data.end = range.end + leadingSpaceLength;
                            }
                        }
                        (tip ? tips : errors).push(data);
                    };
                }
                // merge custom modules
                if (options.modules) {
                    finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
                }
                // merge custom directives
                if (options.directives) {
                    finalOptions.directives = extend(Object.create(baseOptions.directives || null), options.directives);
                }
                // copy other options
                for (const key in options) {
                    if (key !== 'modules' && key !== 'directives') {
                        finalOptions[key] = options[key];
                    }
                }
            }

            finalOptions.warn = warn;

            const compiled = baseCompile(template.trim(), finalOptions);
            {
                detectErrors(compiled.ast, warn);
            }
            compiled.errors = errors;
            compiled.tips = tips;
            return compiled;
        }

        return {
            compile,
            compileToFunctions: createCompileToFunctionFn(compile),
        };
    };
}

/*  */

const createCompiler = createCompilerCreator(function baseCompile(template, options) {
    const ast = parse(template.trim(), options);
    optimize(ast, options);
    const code = generate$1(ast, options);
    return {
        ast,
        render: code.render,
        staticRenderFns: code.staticRenderFns,
    };
});

/*  */

const ref = createCompiler(baseOptions);
const { compile } = ref;
const { compileToFunctions } = ref;

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren(children) {
    for (let i = 0; i < children.length; i++) {
        if (Array.isArray(children[i])) {
            return Array.prototype.concat.apply([], children);
        }
    }
    return children;
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren(children) {
    return isPrimitive(children)
        ? [createTextVNode(children)]
        : Array.isArray(children)
        ? normalizeArrayChildren(children)
        : undefined;
}

function isTextNode(node) {
    return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}

function normalizeArrayChildren(children, nestedIndex) {
    const res = [];
    let i;
    let c;
    let lastIndex;
    let last;
    for (i = 0; i < children.length; i++) {
        c = children[i];
        if (isUndef(c) || typeof c === 'boolean') {
            continue;
        }
        lastIndex = res.length - 1;
        last = res[lastIndex];
        //  nested
        if (Array.isArray(c)) {
            if (c.length > 0) {
                c = normalizeArrayChildren(c, `${nestedIndex || ''}_${i}`);
                // merge adjacent text nodes
                if (isTextNode(c[0]) && isTextNode(last)) {
                    res[lastIndex] = createTextVNode(last.text + c[0].text);
                    c.shift();
                }
                res.push.apply(res, c);
            }
        } else if (isPrimitive(c)) {
            if (isTextNode(last)) {
                // merge adjacent text nodes
                // this is necessary for SSR hydration because text nodes are
                // essentially merged when rendered to HTML strings
                res[lastIndex] = createTextVNode(last.text + c);
            } else if (c !== '') {
                // convert primitive to vnode
                res.push(createTextVNode(c));
            }
        } else if (isTextNode(c) && isTextNode(last)) {
            // merge adjacent text nodes
            res[lastIndex] = createTextVNode(last.text + c.text);
        } else {
            // default key for nested array children (likely generated by v-for)
            if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
                c.key = `__vlist${nestedIndex}_${i}__`;
            }
            res.push(c);
        }
    }
    return res;
}

/*  */

const ssrHelpers = {
    _ssrEscape: escape,
    _ssrNode: renderStringNode,
    _ssrList: renderStringList,
    _ssrAttr: renderAttr,
    _ssrAttrs: renderAttrs$1,
    _ssrDOMProps: renderDOMProps$1,
    _ssrClass: renderSSRClass,
    _ssrStyle: renderSSRStyle,
};

function installSSRHelpers(vm) {
    if (vm._ssrNode) {
        return;
    }
    let Vue = vm.constructor;
    while (Vue.super) {
        Vue = Vue.super;
    }
    extend(Vue.prototype, ssrHelpers);
    if (Vue.FunctionalRenderContext) {
        extend(Vue.FunctionalRenderContext.prototype, ssrHelpers);
    }
}

const StringNode = function StringNode(open, close, children, normalizationType) {
    this.isString = true;
    this.open = open;
    this.close = close;
    if (children) {
        this.children =
            normalizationType === 1
                ? simpleNormalizeChildren(children)
                : normalizationType === 2
                ? normalizeChildren(children)
                : children;
    } else {
        this.children = void 0;
    }
};

function renderStringNode(open, close, children, normalizationType) {
    return new StringNode(open, close, children, normalizationType);
}

function renderStringList(val, render) {
    let ret = '';
    let i;
    let l;
    let keys;
    let key;
    if (Array.isArray(val) || typeof val === 'string') {
        for (i = 0, l = val.length; i < l; i++) {
            ret += render(val[i], i);
        }
    } else if (typeof val === 'number') {
        for (i = 0; i < val; i++) {
            ret += render(i + 1, i);
        }
    } else if (isObject(val)) {
        keys = Object.keys(val);
        for (i = 0, l = keys.length; i < l; i++) {
            key = keys[i];
            ret += render(val[key], key, i);
        }
    }
    return ret;
}

function renderAttrs$1(obj) {
    let res = '';
    for (const key in obj) {
        if (isSSRUnsafeAttr(key)) {
            continue;
        }
        res += renderAttr(key, obj[key]);
    }
    return res;
}

function renderDOMProps$1(obj) {
    let res = '';
    for (const key in obj) {
        const attr = propsToAttrMap[key] || key.toLowerCase();
        if (isRenderableAttr(attr)) {
            res += renderAttr(attr, obj[key]);
        }
    }
    return res;
}

function renderSSRClass(staticClass, dynamic) {
    const res = renderClass(staticClass, dynamic);
    return res === '' ? res : ` class="${escape(res)}"`;
}

function renderSSRStyle(staticStyle, dynamic, extra) {
    const style = {};
    if (staticStyle) {
        extend(style, staticStyle);
    }
    if (dynamic) {
        extend(style, normalizeStyleBinding(dynamic));
    }
    if (extra) {
        extend(style, extra);
    }
    const res = genStyle(style);
    return res === '' ? res : ` style=${JSON.stringify(escape(res))}`;
}

/* not type checking this file because flow doesn't play well with Proxy */

{
    const allowedGlobals = makeMap(
        'Infinity,undefined,NaN,isFinite,isNaN,' +
            'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
            'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
            'require' // for Webpack/Browserify
    );

    const hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy);

    if (hasProxy) {
        const isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
        config.keyCodes = new Proxy(config.keyCodes, {
            set: function set(target, key, value) {
                if (isBuiltInModifier(key)) {
                    warn(`Avoid overwriting built-in modifier in config.keyCodes: .${key}`);
                    return false;
                }
                target[key] = value;
                return true;
            },
        });
    }
}

/*  */

const seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse(val) {
    _traverse(val, seenObjects);
    seenObjects.clear();
}

function _traverse(val, seen) {
    let i;
    let keys;
    const isA = Array.isArray(val);
    if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
        return;
    }
    if (val.__ob__) {
        const depId = val.__ob__.dep.id;
        if (seen.has(depId)) {
            return;
        }
        seen.add(depId);
    }
    if (isA) {
        i = val.length;
        while (i--) {
            _traverse(val[i], seen);
        }
    } else {
        keys = Object.keys(val);
        i = keys.length;
        while (i--) {
            _traverse(val[keys[i]], seen);
        }
    }
}

{
    const perf = inBrowser && window.performance;
    /* istanbul ignore if */
    if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures);
}

/*  */

const normalizeEvent = cached(function(name) {
    const passive = name.charAt(0) === '&';
    name = passive ? name.slice(1) : name;
    const once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
    name = once$$1 ? name.slice(1) : name;
    const capture = name.charAt(0) === '!';
    name = capture ? name.slice(1) : name;
    return {
        name,
        once: once$$1,
        capture,
        passive,
    };
});

function createFnInvoker(fns, vm) {
    function invoker() {
        const arguments$1 = arguments;

        const { fns } = invoker;
        if (Array.isArray(fns)) {
            const cloned = fns.slice();
            for (let i = 0; i < cloned.length; i++) {
                invokeWithErrorHandling(cloned[i], null, arguments$1, vm, 'v-on handler');
            }
        } else {
            // return handler return value for single handlers
            return invokeWithErrorHandling(fns, null, arguments, vm, 'v-on handler');
        }
    }
    invoker.fns = fns;
    return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, createOnceHandler, vm) {
    let name;
    let def$$1;
    let cur;
    let old;
    let event;
    for (name in on) {
        def$$1 = cur = on[name];
        old = oldOn[name];
        event = normalizeEvent(name);
        if (isUndef(cur)) {
            warn(`Invalid handler for event "${event.name}": got ${String(cur)}`, vm);
        } else if (isUndef(old)) {
            if (isUndef(cur.fns)) {
                cur = on[name] = createFnInvoker(cur, vm);
            }
            if (isTrue(event.once)) {
                cur = on[name] = createOnceHandler(event.name, cur, event.capture);
            }
            add(event.name, cur, event.capture, event.passive, event.params);
        } else if (cur !== old) {
            old.fns = cur;
            on[name] = old;
        }
    }
    for (name in oldOn) {
        if (isUndef(on[name])) {
            event = normalizeEvent(name);
            remove$$1(event.name, oldOn[name], event.capture);
        }
    }
}

/*  */

/*  */

function extractPropsFromVNodeData(data, Ctor, tag) {
    // we are only extracting raw values here.
    // validation and default values are handled in the child
    // component itself.
    const propOptions = Ctor.options.props;
    if (isUndef(propOptions)) {
        return;
    }
    const res = {};
    const { attrs } = data;
    const { props } = data;
    if (isDef(attrs) || isDef(props)) {
        for (const key in propOptions) {
            const altKey = hyphenate(key);
            {
                const keyInLowerCase = key.toLowerCase();
                if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
                    tip(
                        `Prop "${keyInLowerCase}" is passed to component ${formatComponentName(
                            tag || Ctor
                        )}, but the declared prop name is` +
                            ` "${key}". ` +
                            `Note that HTML attributes are case-insensitive and camelCased ` +
                            `props need to use their kebab-case equivalents when using in-DOM ` +
                            `templates. You should probably use "${altKey}" instead of "${key}".`
                    );
                }
            }
            checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
        }
    }
    return res;
}

function checkProp(res, hash, key, altKey, preserve) {
    if (isDef(hash)) {
        if (hasOwn(hash, key)) {
            res[key] = hash[key];
            if (!preserve) {
                delete hash[key];
            }
            return true;
        }
        if (hasOwn(hash, altKey)) {
            res[key] = hash[altKey];
            if (!preserve) {
                delete hash[altKey];
            }
            return true;
        }
    }
    return false;
}

/*  */

const SIMPLE_NORMALIZE = 1;
const ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
    if (Array.isArray(data) || isPrimitive(data)) {
        normalizationType = children;
        children = data;
        data = undefined;
    }
    if (isTrue(alwaysNormalize)) {
        normalizationType = ALWAYS_NORMALIZE;
    }
    return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
    if (isDef(data) && isDef(data.__ob__)) {
        warn(
            `Avoid using observed data object as vnode data: ${JSON.stringify(data)}\n` +
                `Always create fresh vnode data objects in each render!`,
            context
        );
        return createEmptyVNode();
    }
    // object syntax in v-bind
    if (isDef(data) && isDef(data.is)) {
        tag = data.is;
    }
    if (!tag) {
        // in case of component :is set to falsy value
        return createEmptyVNode();
    }
    // warn against non-primitive key
    if (isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
        {
            warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
        }
    }
    // support single function children as default scoped slot
    if (Array.isArray(children) && typeof children[0] === 'function') {
        data = data || {};
        data.scopedSlots = { default: children[0] };
        children.length = 0;
    }
    if (normalizationType === ALWAYS_NORMALIZE) {
        children = normalizeChildren(children);
    } else if (normalizationType === SIMPLE_NORMALIZE) {
        children = simpleNormalizeChildren(children);
    }
    let vnode;
    let ns;
    if (typeof tag === 'string') {
        let Ctor;
        ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
        if ((!data || !data.pre) && isDef((Ctor = resolveAsset(context.$options, 'components', tag)))) {
            // component
            vnode = createComponent(Ctor, data, context, children, tag);
        } else {
            // unknown or unlisted namespaced elements
            // check at runtime because it may get assigned a namespace when its
            // parent normalizes children
            vnode = new VNode(tag, data, children, undefined, undefined, context);
        }
    } else {
        // direct component options / constructor
        vnode = createComponent(tag, data, context, children);
    }
    if (Array.isArray(vnode)) {
        return vnode;
    }
    if (isDef(vnode)) {
        if (isDef(ns)) {
            applyNS(vnode, ns);
        }
        if (isDef(data)) {
            registerDeepBindings(data);
        }
        return vnode;
    }
    return createEmptyVNode();
}

function applyNS(vnode, ns, force) {
    vnode.ns = ns;
    if (vnode.tag === 'foreignObject') {
        // use default namespace inside foreignObject
        ns = undefined;
        force = true;
    }
    if (isDef(vnode.children)) {
        for (let i = 0, l = vnode.children.length; i < l; i++) {
            const child = vnode.children[i];
            if (isDef(child.tag) && (isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
                applyNS(child, ns, force);
            }
        }
    }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings(data) {
    if (isObject(data.style)) {
        traverse(data.style);
    }
    if (isObject(data.class)) {
        traverse(data.class);
    }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList(val, render) {
    let ret;
    let i;
    let l;
    let keys;
    let key;
    if (Array.isArray(val) || typeof val === 'string') {
        ret = new Array(val.length);
        for (i = 0, l = val.length; i < l; i++) {
            ret[i] = render(val[i], i);
        }
    } else if (typeof val === 'number') {
        ret = new Array(val);
        for (i = 0; i < val; i++) {
            ret[i] = render(i + 1, i);
        }
    } else if (isObject(val)) {
        if (hasSymbol && val[Symbol.iterator]) {
            ret = [];
            const iterator = val[Symbol.iterator]();
            let result = iterator.next();
            while (!result.done) {
                ret.push(render(result.value, ret.length));
                result = iterator.next();
            }
        } else {
            keys = Object.keys(val);
            ret = new Array(keys.length);
            for (i = 0, l = keys.length; i < l; i++) {
                key = keys[i];
                ret[i] = render(val[key], key, i);
            }
        }
    }
    if (!isDef(ret)) {
        ret = [];
    }
    ret._isVList = true;
    return ret;
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot(name, fallback, props, bindObject) {
    const scopedSlotFn = this.$scopedSlots[name];
    let nodes;
    if (scopedSlotFn) {
        // scoped slot
        props = props || {};
        if (bindObject) {
            if (!isObject(bindObject)) {
                warn('slot v-bind without argument expects an Object', this);
            }
            props = extend(extend({}, bindObject), props);
        }
        nodes = scopedSlotFn(props) || fallback;
    } else {
        nodes = this.$slots[name] || fallback;
    }

    const target = props && props.slot;
    if (target) {
        return this.$createElement('template', { slot: target }, nodes);
    }
    return nodes;
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter(id) {
    return resolveAsset(this.$options, 'filters', id, true) || identity;
}

/*  */

function isKeyNotMatch(expect, actual) {
    if (Array.isArray(expect)) {
        return expect.indexOf(actual) === -1;
    }
    return expect !== actual;
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
    const mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
    if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
        return isKeyNotMatch(builtInKeyName, eventKeyName);
    }
    if (mappedKeyCode) {
        return isKeyNotMatch(mappedKeyCode, eventKeyCode);
    }
    if (eventKeyName) {
        return hyphenate(eventKeyName) !== key;
    }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps(data, tag, value, asProp, isSync) {
    if (value) {
        if (!isObject(value)) {
            warn('v-bind without argument expects an Object or Array value', this);
        } else {
            if (Array.isArray(value)) {
                value = toObject(value);
            }
            let hash;
            const loop = function(key) {
                if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
                    hash = data;
                } else {
                    const type = data.attrs && data.attrs.type;
                    hash =
                        asProp || config.mustUseProp(tag, type, key)
                            ? data.domProps || (data.domProps = {})
                            : data.attrs || (data.attrs = {});
                }
                const camelizedKey = camelize(key);
                const hyphenatedKey = hyphenate(key);
                if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
                    hash[key] = value[key];

                    if (isSync) {
                        const on = data.on || (data.on = {});
                        on[`update:${key}`] = function($event) {
                            value[key] = $event;
                        };
                    }
                }
            };

            for (const key in value) loop(key);
        }
    }
    return data;
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic(index, isInFor) {
    const cached = this._staticTrees || (this._staticTrees = []);
    let tree = cached[index];
    // if has already-rendered static tree and not inside v-for,
    // we can reuse the same tree.
    if (tree && !isInFor) {
        return tree;
    }
    // otherwise, render a fresh tree.
    tree = cached[index] = this.$options.staticRenderFns[index].call(
        this._renderProxy,
        null,
        this // for render fns generated for functional component templates
    );
    markStatic(tree, `__static__${index}`, false);
    return tree;
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce(tree, index, key) {
    markStatic(tree, `__once__${index}${key ? `_${key}` : ''}`, true);
    return tree;
}

function markStatic(tree, key, isOnce) {
    if (Array.isArray(tree)) {
        for (let i = 0; i < tree.length; i++) {
            if (tree[i] && typeof tree[i] !== 'string') {
                markStaticNode(tree[i], `${key}_${i}`, isOnce);
            }
        }
    } else {
        markStaticNode(tree, key, isOnce);
    }
}

function markStaticNode(node, key, isOnce) {
    node.isStatic = true;
    node.key = key;
    node.isOnce = isOnce;
}

/*  */

function bindObjectListeners(data, value) {
    if (value) {
        if (!isPlainObject(value)) {
            warn('v-on without argument expects an Object value', this);
        } else {
            const on = (data.on = data.on ? extend({}, data.on) : {});
            for (const key in value) {
                const existing = on[key];
                const ours = value[key];
                on[key] = existing ? [].concat(existing, ours) : ours;
            }
        }
    }
    return data;
}

/*  */

function resolveScopedSlots(
    fns, // see flow/vnode
    res,
    // the following are added in 2.6
    hasDynamicKeys,
    contentHashKey
) {
    res = res || { $stable: !hasDynamicKeys };
    for (let i = 0; i < fns.length; i++) {
        const slot = fns[i];
        if (Array.isArray(slot)) {
            resolveScopedSlots(slot, res, hasDynamicKeys);
        } else if (slot) {
            // marker for reverse proxying v-slot without scope on this.$slots
            if (slot.proxy) {
                slot.fn.proxy = true;
            }
            res[slot.key] = slot.fn;
        }
    }
    if (contentHashKey) {
        res.$key = contentHashKey;
    }
    return res;
}

/*  */

function bindDynamicKeys(baseObj, values) {
    for (let i = 0; i < values.length; i += 2) {
        const key = values[i];
        if (typeof key === 'string' && key) {
            baseObj[values[i]] = values[i + 1];
        } else if (key !== '' && key !== null) {
            // null is a speical value for explicitly removing a binding
            warn(`Invalid value for dynamic directive argument (expected string or null): ${key}`, this);
        }
    }
    return baseObj;
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier(value, symbol) {
    return typeof value === 'string' ? symbol + value : value;
}

/*  */

function installRenderHelpers(target) {
    target._o = markOnce;
    target._n = toNumber;
    target._s = toString;
    target._l = renderList;
    target._t = renderSlot;
    target._q = looseEqual;
    target._i = looseIndexOf;
    target._m = renderStatic;
    target._f = resolveFilter;
    target._k = checkKeyCodes;
    target._b = bindObjectProps;
    target._v = createTextVNode;
    target._e = createEmptyVNode;
    target._u = resolveScopedSlots;
    target._g = bindObjectListeners;
    target._d = bindDynamicKeys;
    target._p = prependModifier;
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots(children, context) {
    if (!children || !children.length) {
        return {};
    }
    const slots = {};
    for (let i = 0, l = children.length; i < l; i++) {
        const child = children[i];
        const { data } = child;
        // remove slot attribute if the node is resolved as a Vue slot node
        if (data && data.attrs && data.attrs.slot) {
            delete data.attrs.slot;
        }
        // named slots should only be respected if the vnode was rendered in the
        // same context.
        if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
            const name = data.slot;
            const slot = slots[name] || (slots[name] = []);
            if (child.tag === 'template') {
                slot.push.apply(slot, child.children || []);
            } else {
                slot.push(child);
            }
        } else {
            (slots.default || (slots.default = [])).push(child);
        }
    }
    // ignore slots that contains only whitespace
    for (const name$1 in slots) {
        if (slots[name$1].every(isWhitespace)) {
            delete slots[name$1];
        }
    }
    return slots;
}

function isWhitespace(node) {
    return (node.isComment && !node.asyncFactory) || node.text === ' ';
}

/*  */

function normalizeScopedSlots(slots, normalSlots, prevSlots) {
    let res;
    const hasNormalSlots = Object.keys(normalSlots).length > 0;
    const isStable = slots ? !!slots.$stable : !hasNormalSlots;
    const key = slots && slots.$key;
    if (!slots) {
        res = {};
    } else if (slots._normalized) {
        // fast path 1: child component re-render only, parent did not change
        return slots._normalized;
    } else if (
        isStable &&
        prevSlots &&
        prevSlots !== emptyObject &&
        key === prevSlots.$key &&
        !hasNormalSlots &&
        !prevSlots.$hasNormal
    ) {
        // fast path 2: stable scoped slots w/ no normal slots to proxy,
        // only need to normalize once
        return prevSlots;
    } else {
        res = {};
        for (const key$1 in slots) {
            if (slots[key$1] && key$1[0] !== '$') {
                res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
            }
        }
    }
    // expose normal slots on scopedSlots
    for (const key$2 in normalSlots) {
        if (!(key$2 in res)) {
            res[key$2] = proxyNormalSlot(normalSlots, key$2);
        }
    }
    // avoriaz seems to mock a non-extensible $scopedSlots object
    // and when that is passed down this would cause an error
    if (slots && Object.isExtensible(slots)) {
        slots._normalized = res;
    }
    def(res, '$stable', isStable);
    def(res, '$key', key);
    def(res, '$hasNormal', hasNormalSlots);
    return res;
}

function normalizeScopedSlot(normalSlots, key, fn) {
    const normalized = function() {
        let res = arguments.length ? fn.apply(null, arguments) : fn({});
        res =
            res && typeof res === 'object' && !Array.isArray(res)
                ? [res] // single vnode
                : normalizeChildren(res);
        return res && (res.length === 0 || (res.length === 1 && res[0].isComment)) // #9658
            ? undefined
            : res;
    };
    // this is a slot using the new v-slot syntax without scope. although it is
    // compiled as a scoped slot, render fn users would expect it to be present
    // on this.$slots because the usage is semantically a normal slot.
    if (fn.proxy) {
        Object.defineProperty(normalSlots, key, {
            get: normalized,
            enumerable: true,
            configurable: true,
        });
    }
    return normalized;
}

function proxyNormalSlot(slots, key) {
    return function() {
        return slots[key];
    };
}

/*  */

const currentRenderingInstance = null;

/*  */

function ensureCtor(comp, base) {
    if (comp.__esModule || (hasSymbol && comp[Symbol.toStringTag] === 'Module')) {
        comp = comp.default;
    }
    return isObject(comp) ? base.extend(comp) : comp;
}

function createAsyncPlaceholder(factory, data, context, children, tag) {
    const node = createEmptyVNode();
    node.asyncFactory = factory;
    node.asyncMeta = { data, context, children, tag };
    return node;
}

function resolveAsyncComponent(factory, baseCtor) {
    if (isTrue(factory.error) && isDef(factory.errorComp)) {
        return factory.errorComp;
    }

    if (isDef(factory.resolved)) {
        return factory.resolved;
    }

    const owner = currentRenderingInstance;
    if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
        // already pending
        factory.owners.push(owner);
    }

    if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
        return factory.loadingComp;
    }

    if (owner && !isDef(factory.owners)) {
        const owners = (factory.owners = [owner]);
        let sync = true;
        let timerLoading = null;
        let timerTimeout = null;

        owner.$on('hook:destroyed', function() {
            return remove(owners, owner);
        });

        const forceRender = function(renderCompleted) {
            for (let i = 0, l = owners.length; i < l; i++) {
                owners[i].$forceUpdate();
            }

            if (renderCompleted) {
                owners.length = 0;
                if (timerLoading !== null) {
                    clearTimeout(timerLoading);
                    timerLoading = null;
                }
                if (timerTimeout !== null) {
                    clearTimeout(timerTimeout);
                    timerTimeout = null;
                }
            }
        };

        const resolve = once(function(res) {
            // cache resolved
            factory.resolved = ensureCtor(res, baseCtor);
            // invoke callbacks only if this is not a synchronous resolve
            // (async resolves are shimmed as synchronous during SSR)
            if (!sync) {
                forceRender(true);
            } else {
                owners.length = 0;
            }
        });

        const reject = once(function(reason) {
            warn(`Failed to resolve async component: ${String(factory)}${reason ? `\nReason: ${reason}` : ''}`);
            if (isDef(factory.errorComp)) {
                factory.error = true;
                forceRender(true);
            }
        });

        const res = factory(resolve, reject);

        if (isObject(res)) {
            if (isPromise(res)) {
                // () => Promise
                if (isUndef(factory.resolved)) {
                    res.then(resolve, reject);
                }
            } else if (isPromise(res.component)) {
                res.component.then(resolve, reject);

                if (isDef(res.error)) {
                    factory.errorComp = ensureCtor(res.error, baseCtor);
                }

                if (isDef(res.loading)) {
                    factory.loadingComp = ensureCtor(res.loading, baseCtor);
                    if (res.delay === 0) {
                        factory.loading = true;
                    } else {
                        timerLoading = setTimeout(function() {
                            timerLoading = null;
                            if (isUndef(factory.resolved) && isUndef(factory.error)) {
                                factory.loading = true;
                                forceRender(false);
                            }
                        }, res.delay || 200);
                    }
                }

                if (isDef(res.timeout)) {
                    timerTimeout = setTimeout(function() {
                        timerTimeout = null;
                        if (isUndef(factory.resolved)) {
                            reject(`timeout (${res.timeout}ms)`);
                        }
                    }, res.timeout);
                }
            }
        }

        sync = false;
        // return in case resolved synchronously
        return factory.loading ? factory.loadingComp : factory.resolved;
    }
}

/*  */

/*  */

/*  */

/*  */

let target;

function add(event, fn) {
    target.$on(event, fn);
}

function remove$1(event, fn) {
    target.$off(event, fn);
}

function createOnceHandler(event, fn) {
    const _target = target;
    return function onceHandler() {
        const res = fn.apply(null, arguments);
        if (res !== null) {
            _target.$off(event, onceHandler);
        }
    };
}

function updateComponentListeners(vm, listeners, oldListeners) {
    target = vm;
    updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
    target = undefined;
}

/*  */

const activeInstance = null;

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
    // determine whether component has slot children
    // we need to do this before overwriting $options._renderChildren.

    // check if there are dynamic scopedSlots (hand-written or compiled but with
    // dynamic slot names). Static scoped slots compiled from template has the
    // "$stable" marker.
    const newScopedSlots = parentVnode.data.scopedSlots;
    const oldScopedSlots = vm.$scopedSlots;
    const hasDynamicScopedSlot = !!(
        (newScopedSlots && !newScopedSlots.$stable) ||
        (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
        (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
    );

    // Any static slot children from the parent may have changed during parent's
    // update. Dynamic scoped slots may also have changed. In such cases, a forced
    // update is necessary to ensure correctness.
    const needsForceUpdate = !!(
        renderChildren || // has new static slots
        vm.$options._renderChildren || // has old static slots
        hasDynamicScopedSlot
    );

    vm.$options._parentVnode = parentVnode;
    vm.$vnode = parentVnode; // update vm's placeholder node without re-render

    if (vm._vnode) {
        // update child tree's parent
        vm._vnode.parent = parentVnode;
    }
    vm.$options._renderChildren = renderChildren;

    // update $attrs and $listeners hash
    // these are also reactive so they may trigger child update if the child
    // used them during render
    vm.$attrs = parentVnode.data.attrs || emptyObject;
    vm.$listeners = listeners || emptyObject;

    // update props
    if (propsData && vm.$options.props) {
        toggleObserving(false);
        const props = vm._props;
        const propKeys = vm.$options._propKeys || [];
        for (let i = 0; i < propKeys.length; i++) {
            const key = propKeys[i];
            const propOptions = vm.$options.props; // wtf flow?
            props[key] = validateProp(key, propOptions, propsData, vm);
        }
        toggleObserving(true);
        // keep a copy of raw propsData
        vm.$options.propsData = propsData;
    }

    // update listeners
    listeners = listeners || emptyObject;
    const oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);

    // resolve slots + force update if has children
    if (needsForceUpdate) {
        vm.$slots = resolveSlots(renderChildren, parentVnode.context);
        vm.$forceUpdate();
    }
}

function isInInactiveTree(vm) {
    while (vm && (vm = vm.$parent)) {
        if (vm._inactive) {
            return true;
        }
    }
    return false;
}

function activateChildComponent(vm, direct) {
    if (direct) {
        vm._directInactive = false;
        if (isInInactiveTree(vm)) {
            return;
        }
    } else if (vm._directInactive) {
        return;
    }
    if (vm._inactive || vm._inactive === null) {
        vm._inactive = false;
        for (let i = 0; i < vm.$children.length; i++) {
            activateChildComponent(vm.$children[i]);
        }
        callHook(vm, 'activated');
    }
}

function deactivateChildComponent(vm, direct) {
    if (direct) {
        vm._directInactive = true;
        if (isInInactiveTree(vm)) {
            return;
        }
    }
    if (!vm._inactive) {
        vm._inactive = true;
        for (let i = 0; i < vm.$children.length; i++) {
            deactivateChildComponent(vm.$children[i]);
        }
        callHook(vm, 'deactivated');
    }
}

function callHook(vm, hook) {
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    const handlers = vm.$options[hook];
    const info = `${hook} hook`;
    if (handlers) {
        for (let i = 0, j = handlers.length; i < j; i++) {
            invokeWithErrorHandling(handlers[i], vm, null, vm, info);
        }
    }
    if (vm._hasHookEvent) {
        vm.$emit(`hook:${hook}`);
    }
    popTarget();
}

/*  */

// Async edge case fix requires storing an event listener's attach timestamp.
let getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
    const { performance } = window;
    if (performance && typeof performance.now === 'function' && getNow() > document.createEvent('Event').timeStamp) {
        // if the event timestamp, although evaluated AFTER the Date.now(), is
        // smaller than it, it means the event is using a hi-res timestamp,
        // and we need to use the hi-res version for event listener timestamps as
        // well.
        getNow = function() {
            return performance.now();
        };
    }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent(vm) {
    // setting _inactive to false here so that a render function can
    // rely on checking whether it's in an inactive tree (e.g. router-view)
    vm._inactive = false;
}

/*  */

/*  */

/*  */

function resolveInject(inject, vm) {
    if (inject) {
        // inject is :any because flow is not smart enough to figure out cached
        const result = Object.create(null);
        const keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            // #6574 in case the inject object is observed...
            if (key === '__ob__') {
                continue;
            }
            const provideKey = inject[key].from;
            let source = vm;
            while (source) {
                if (source._provided && hasOwn(source._provided, provideKey)) {
                    result[key] = source._provided[provideKey];
                    break;
                }
                source = source.$parent;
            }
            if (!source) {
                if ('default' in inject[key]) {
                    const provideDefault = inject[key].default;
                    result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
                } else {
                    warn(`Injection "${key}" not found`, vm);
                }
            }
        }
        return result;
    }
}

/*  */

function resolveConstructorOptions(Ctor) {
    let { options } = Ctor;
    if (Ctor.super) {
        const superOptions = resolveConstructorOptions(Ctor.super);
        const cachedSuperOptions = Ctor.superOptions;
        if (superOptions !== cachedSuperOptions) {
            // super option changed,
            // need to resolve new options.
            Ctor.superOptions = superOptions;
            // check if there are any late-modified/attached options (#4976)
            const modifiedOptions = resolveModifiedOptions(Ctor);
            // update base extend options
            if (modifiedOptions) {
                extend(Ctor.extendOptions, modifiedOptions);
            }
            options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
            if (options.name) {
                options.components[options.name] = Ctor;
            }
        }
    }
    return options;
}

function resolveModifiedOptions(Ctor) {
    let modified;
    const latest = Ctor.options;
    const sealed = Ctor.sealedOptions;
    for (const key in latest) {
        if (latest[key] !== sealed[key]) {
            if (!modified) {
                modified = {};
            }
            modified[key] = latest[key];
        }
    }
    return modified;
}

/*  */

function FunctionalRenderContext(data, props, children, parent, Ctor) {
    const this$1 = this;

    const { options } = Ctor;
    // ensure the createElement function in functional components
    // gets a unique context - this is necessary for correct named slot check
    let contextVm;
    if (hasOwn(parent, '_uid')) {
        contextVm = Object.create(parent);
        // $flow-disable-line
        contextVm._original = parent;
    } else {
        // the context vm passed in is a functional context as well.
        // in this case we want to make sure we are able to get a hold to the
        // real context instance.
        contextVm = parent;
        // $flow-disable-line
        parent = parent._original;
    }
    const isCompiled = isTrue(options._compiled);
    const needNormalization = !isCompiled;

    this.data = data;
    this.props = props;
    this.children = children;
    this.parent = parent;
    this.listeners = data.on || emptyObject;
    this.injections = resolveInject(options.inject, parent);
    this.slots = function() {
        if (!this$1.$slots) {
            normalizeScopedSlots(data.scopedSlots, (this$1.$slots = resolveSlots(children, parent)));
        }
        return this$1.$slots;
    };

    Object.defineProperty(this, 'scopedSlots', {
        enumerable: true,
        get: function get() {
            return normalizeScopedSlots(data.scopedSlots, this.slots());
        },
    });

    // support for compiled functional template
    if (isCompiled) {
        // exposing $options for renderStatic()
        this.$options = options;
        // pre-resolve slots for renderSlot()
        this.$slots = this.slots();
        this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
    }

    if (options._scopeId) {
        this._c = function(a, b, c, d) {
            const vnode = createElement(contextVm, a, b, c, d, needNormalization);
            if (vnode && !Array.isArray(vnode)) {
                vnode.fnScopeId = options._scopeId;
                vnode.fnContext = parent;
            }
            return vnode;
        };
    } else {
        this._c = function(a, b, c, d) {
            return createElement(contextVm, a, b, c, d, needNormalization);
        };
    }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
    const { options } = Ctor;
    const props = {};
    const propOptions = options.props;
    if (isDef(propOptions)) {
        for (const key in propOptions) {
            props[key] = validateProp(key, propOptions, propsData || emptyObject);
        }
    } else {
        if (isDef(data.attrs)) {
            mergeProps(props, data.attrs);
        }
        if (isDef(data.props)) {
            mergeProps(props, data.props);
        }
    }

    const renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);

    const vnode = options.render.call(null, renderContext._c, renderContext);

    if (vnode instanceof VNode) {
        return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
    }
    if (Array.isArray(vnode)) {
        const vnodes = normalizeChildren(vnode) || [];
        const res = new Array(vnodes.length);
        for (let i = 0; i < vnodes.length; i++) {
            res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
        }
        return res;
    }
}

function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
    // #7817 clone node before setting fnContext, otherwise if the node is reused
    // (e.g. it was from a cached normal slot) the fnContext causes named slots
    // that should not be matched to match.
    const clone = cloneVNode(vnode);
    clone.fnContext = contextVm;
    clone.fnOptions = options;
    {
        (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
    }
    if (data.slot) {
        (clone.data || (clone.data = {})).slot = data.slot;
    }
    return clone;
}

function mergeProps(to, from) {
    for (const key in from) {
        to[camelize(key)] = from[key];
    }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
    init: function init(vnode, hydrating) {
        if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
            // kept-alive components, treat as a patch
            const mountedNode = vnode; // work around flow
            componentVNodeHooks.prepatch(mountedNode, mountedNode);
        } else {
            const child = (vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance));
            child.$mount(hydrating ? vnode.elm : undefined, hydrating);
        }
    },

    prepatch: function prepatch(oldVnode, vnode) {
        const options = vnode.componentOptions;
        const child = (vnode.componentInstance = oldVnode.componentInstance);
        updateChildComponent(
            child,
            options.propsData, // updated props
            options.listeners, // updated listeners
            vnode, // new parent vnode
            options.children // new children
        );
    },

    insert: function insert(vnode) {
        const { context } = vnode;
        const { componentInstance } = vnode;
        if (!componentInstance._isMounted) {
            componentInstance._isMounted = true;
            callHook(componentInstance, 'mounted');
        }
        if (vnode.data.keepAlive) {
            if (context._isMounted) {
                // vue-router#1212
                // During updates, a kept-alive component's child components may
                // change, so directly walking the tree here may call activated hooks
                // on incorrect children. Instead we push them into a queue which will
                // be processed after the whole patch process ended.
                queueActivatedComponent(componentInstance);
            } else {
                activateChildComponent(componentInstance, true /* direct */);
            }
        }
    },

    destroy: function destroy(vnode) {
        const { componentInstance } = vnode;
        if (!componentInstance._isDestroyed) {
            if (!vnode.data.keepAlive) {
                componentInstance.$destroy();
            } else {
                deactivateChildComponent(componentInstance, true /* direct */);
            }
        }
    },
};

const hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent(Ctor, data, context, children, tag) {
    if (isUndef(Ctor)) {
        return;
    }

    const baseCtor = context.$options._base;

    // plain options object: turn it into a constructor
    if (isObject(Ctor)) {
        Ctor = baseCtor.extend(Ctor);
    }

    // if at this stage it's not a constructor or an async component factory,
    // reject.
    if (typeof Ctor !== 'function') {
        {
            warn(`Invalid Component definition: ${String(Ctor)}`, context);
        }
        return;
    }

    // async component
    let asyncFactory;
    if (isUndef(Ctor.cid)) {
        asyncFactory = Ctor;
        Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
        if (Ctor === undefined) {
            // return a placeholder node for async component, which is rendered
            // as a comment node but preserves all the raw information for the node.
            // the information will be used for async server-rendering and hydration.
            return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
        }
    }

    data = data || {};

    // resolve constructor options in case global mixins are applied after
    // component constructor creation
    resolveConstructorOptions(Ctor);

    // transform component v-model data into props & events
    if (isDef(data.model)) {
        transformModel(Ctor.options, data);
    }

    // extract props
    const propsData = extractPropsFromVNodeData(data, Ctor, tag);

    // functional component
    if (isTrue(Ctor.options.functional)) {
        return createFunctionalComponent(Ctor, propsData, data, context, children);
    }

    // extract listeners, since these needs to be treated as
    // child component listeners instead of DOM listeners
    const listeners = data.on;
    // replace with listeners with .native modifier
    // so it gets processed during parent component patch.
    data.on = data.nativeOn;

    if (isTrue(Ctor.options.abstract)) {
        // abstract components do not keep anything
        // other than props & listeners & slot

        // work around flow
        const { slot } = data;
        data = {};
        if (slot) {
            data.slot = slot;
        }
    }

    // install component management hooks onto the placeholder node
    installComponentHooks(data);

    // return a placeholder vnode
    const name = Ctor.options.name || tag;
    const vnode = new VNode(
        `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
        data,
        undefined,
        undefined,
        undefined,
        context,
        { Ctor, propsData, listeners, tag, children },
        asyncFactory
    );

    return vnode;
}

function createComponentInstanceForVnode(
    vnode, // we know it's MountedComponentVNode but flow doesn't
    parent // activeInstance in lifecycle state
) {
    const options = {
        _isComponent: true,
        _parentVnode: vnode,
        parent,
    };
    // check inline-template render functions
    const { inlineTemplate } = vnode.data;
    if (isDef(inlineTemplate)) {
        options.render = inlineTemplate.render;
        options.staticRenderFns = inlineTemplate.staticRenderFns;
    }
    return new vnode.componentOptions.Ctor(options);
}

function installComponentHooks(data) {
    const hooks = data.hook || (data.hook = {});
    for (let i = 0; i < hooksToMerge.length; i++) {
        const key = hooksToMerge[i];
        const existing = hooks[key];
        const toMerge = componentVNodeHooks[key];
        if (existing !== toMerge && !(existing && existing._merged)) {
            hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
        }
    }
}

function mergeHook$1(f1, f2) {
    const merged = function(a, b) {
        // flow complains about extra args which is why we use any
        f1(a, b);
        f2(a, b);
    };
    merged._merged = true;
    return merged;
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel(options, data) {
    const prop = (options.model && options.model.prop) || 'value';
    const event = (options.model && options.model.event) || 'input';
    (data.attrs || (data.attrs = {}))[prop] = data.model.value;
    const on = data.on || (data.on = {});
    const existing = on[event];
    const { callback } = data.model;
    if (isDef(existing)) {
        if (Array.isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
            on[event] = [callback].concat(existing);
        }
    } else {
        on[event] = callback;
    }
}

/*  */

let warned = Object.create(null);
const warnOnce = function(msg) {
    if (!warned[msg]) {
        warned[msg] = true;
        // eslint-disable-next-line no-console
        console.warn(`\n\u001b[31m${msg}\u001b[39m\n`);
    }
};

const onCompilationError = function(err, vm) {
    const trace = vm ? generateComponentTrace(vm) : '';
    throw new Error(`\n\u001b[31m${err}${trace}\u001b[39m\n`);
};

const normalizeRender = function(vm) {
    const ref = vm.$options;
    const { render } = ref;
    const { template } = ref;
    const { _scopeId } = ref;
    if (isUndef(render)) {
        if (template) {
            const compiled = compileToFunctions(
                template,
                {
                    scopeId: _scopeId,
                    warn: onCompilationError,
                },
                vm
            );

            vm.$options.render = compiled.render;
            vm.$options.staticRenderFns = compiled.staticRenderFns;
        } else {
            throw new Error(
                `render function or template not defined in component: ${vm.$options.name ||
                    vm.$options._componentTag ||
                    'anonymous'}`
            );
        }
    }
};

function waitForServerPrefetch(vm, resolve, reject) {
    let handlers = vm.$options.serverPrefetch;
    if (isDef(handlers)) {
        if (!Array.isArray(handlers)) {
            handlers = [handlers];
        }
        try {
            const promises = [];
            for (let i = 0, j = handlers.length; i < j; i++) {
                const result = handlers[i].call(vm, vm);
                if (result && typeof result.then === 'function') {
                    promises.push(result);
                }
            }
            Promise.all(promises)
                .then(resolve)
                .catch(reject);
            return;
        } catch (e) {
            reject(e);
        }
    }
    resolve();
}

function renderNode(node, isRoot, context) {
    if (node.isString) {
        renderStringNode$1(node, context);
    } else if (isDef(node.componentOptions)) {
        renderComponent(node, isRoot, context);
    } else if (isDef(node.tag)) {
        renderElement(node, isRoot, context);
    } else if (isTrue(node.isComment)) {
        if (isDef(node.asyncFactory)) {
            // async component
            renderAsyncComponent(node, isRoot, context);
        } else {
            context.write(`<!--${node.text}-->`, context.next);
        }
    } else {
        context.write(node.raw ? node.text : escape(String(node.text)), context.next);
    }
}

function registerComponentForCache(options, write) {
    // exposed by vue-loader, need to call this if cache hit because
    // component lifecycle hooks will not be called.
    const register = options._ssrRegister;
    if (write.caching && isDef(register)) {
        write.componentBuffer[write.componentBuffer.length - 1].add(register);
    }
    return register;
}

function renderComponent(node, isRoot, context) {
    const { write } = context;
    const { next } = context;
    const { userContext } = context;

    // check cache hit
    const { Ctor } = node.componentOptions;
    const getKey = Ctor.options.serverCacheKey;
    const { name } = Ctor.options;
    const { cache } = context;
    const registerComponent = registerComponentForCache(Ctor.options, write);

    if (isDef(getKey) && isDef(cache) && isDef(name)) {
        const rawKey = getKey(node.componentOptions.propsData);
        if (rawKey === false) {
            renderComponentInner(node, isRoot, context);
            return;
        }
        const key = `${name}::${rawKey}`;
        const { has } = context;
        const { get } = context;
        if (isDef(has)) {
            has(key, function(hit) {
                if (hit === true && isDef(get)) {
                    get(key, function(res) {
                        if (isDef(registerComponent)) {
                            registerComponent(userContext);
                        }
                        res.components.forEach(function(register) {
                            return register(userContext);
                        });
                        write(res.html, next);
                    });
                } else {
                    renderComponentWithCache(node, isRoot, key, context);
                }
            });
        } else if (isDef(get)) {
            get(key, function(res) {
                if (isDef(res)) {
                    if (isDef(registerComponent)) {
                        registerComponent(userContext);
                    }
                    res.components.forEach(function(register) {
                        return register(userContext);
                    });
                    write(res.html, next);
                } else {
                    renderComponentWithCache(node, isRoot, key, context);
                }
            });
        }
    } else {
        if (isDef(getKey) && isUndef(cache)) {
            warnOnce(
                `[vue-server-renderer] Component ${Ctor.options.name || '(anonymous)'} implemented serverCacheKey, ` +
                    `but no cache was provided to the renderer.`
            );
        }
        if (isDef(getKey) && isUndef(name)) {
            warnOnce(
                '[vue-server-renderer] Components that implement "serverCacheKey" ' +
                    'must also define a unique "name" option.'
            );
        }
        renderComponentInner(node, isRoot, context);
    }
}

function renderComponentWithCache(node, isRoot, key, context) {
    const { write } = context;
    write.caching = true;
    const buffer = write.cacheBuffer;
    const bufferIndex = buffer.push('') - 1;
    const { componentBuffer } = write;
    componentBuffer.push(new Set());
    context.renderStates.push({
        type: 'ComponentWithCache',
        key,
        buffer,
        bufferIndex,
        componentBuffer,
    });
    renderComponentInner(node, isRoot, context);
}

function renderComponentInner(node, isRoot, context) {
    const prevActive = context.activeInstance;
    // expose userContext on vnode
    node.ssrContext = context.userContext;
    const child = (context.activeInstance = createComponentInstanceForVnode(node, context.activeInstance));
    normalizeRender(child);

    const resolve = function() {
        const childNode = child._render();
        childNode.parent = node;
        context.renderStates.push({
            type: 'Component',
            prevActive,
        });
        renderNode(childNode, isRoot, context);
    };

    const reject = context.done;

    waitForServerPrefetch(child, resolve, reject);
}

function renderAsyncComponent(node, isRoot, context) {
    const factory = node.asyncFactory;

    const resolve = function(comp) {
        if (comp.__esModule && comp.default) {
            comp = comp.default;
        }
        const ref = node.asyncMeta;
        const { data } = ref;
        const { children } = ref;
        const { tag } = ref;
        const nodeContext = node.asyncMeta.context;
        const resolvedNode = createComponent(comp, data, nodeContext, children, tag);
        if (resolvedNode) {
            if (resolvedNode.componentOptions) {
                // normal component
                renderComponent(resolvedNode, isRoot, context);
            } else if (!Array.isArray(resolvedNode)) {
                // single return node from functional component
                renderNode(resolvedNode, isRoot, context);
            } else {
                // multiple return nodes from functional component
                context.renderStates.push({
                    type: 'Fragment',
                    children: resolvedNode,
                    rendered: 0,
                    total: resolvedNode.length,
                });
                context.next();
            }
        } else {
            // invalid component, but this does not throw on the client
            // so render empty comment node
            context.write('<!---->', context.next);
        }
    };

    if (factory.resolved) {
        resolve(factory.resolved);
        return;
    }

    const reject = context.done;
    let res;
    try {
        res = factory(resolve, reject);
    } catch (e) {
        reject(e);
    }
    if (res) {
        if (typeof res.then === 'function') {
            res.then(resolve, reject).catch(reject);
        } else {
            // new syntax in 2.3
            const comp = res.component;
            if (comp && typeof comp.then === 'function') {
                comp.then(resolve, reject).catch(reject);
            }
        }
    }
}

function renderStringNode$1(el, context) {
    const { write } = context;
    const { next } = context;
    if (isUndef(el.children) || el.children.length === 0) {
        write(el.open + (el.close || ''), next);
    } else {
        const { children } = el;
        context.renderStates.push({
            type: 'Element',
            children,
            rendered: 0,
            total: children.length,
            endTag: el.close,
        });
        write(el.open, next);
    }
}

function renderElement(el, isRoot, context) {
    const { write } = context;
    const { next } = context;

    if (isTrue(isRoot)) {
        if (!el.data) {
            el.data = {};
        }
        if (!el.data.attrs) {
            el.data.attrs = {};
        }
        el.data.attrs[SSR_ATTR] = 'true';
    }

    if (el.fnOptions) {
        registerComponentForCache(el.fnOptions, write);
    }

    const startTag = renderStartingTag(el, context);
    const endTag = `</${el.tag}>`;
    if (context.isUnaryTag(el.tag)) {
        write(startTag, next);
    } else if (isUndef(el.children) || el.children.length === 0) {
        write(startTag + endTag, next);
    } else {
        const { children } = el;
        context.renderStates.push({
            type: 'Element',
            children,
            rendered: 0,
            total: children.length,
            endTag,
        });
        write(startTag, next);
    }
}

function hasAncestorData(node) {
    const parentNode = node.parent;
    return isDef(parentNode) && (isDef(parentNode.data) || hasAncestorData(parentNode));
}

function getVShowDirectiveInfo(node) {
    let dir;
    let tmp;

    while (isDef(node)) {
        if (node.data && node.data.directives) {
            tmp = node.data.directives.find(function(dir) {
                return dir.name === 'show';
            });
            if (tmp) {
                dir = tmp;
            }
        }
        node = node.parent;
    }
    return dir;
}

function renderStartingTag(node, context) {
    let markup = `<${node.tag}`;
    const { directives } = context;
    const { modules } = context;

    // construct synthetic data for module processing
    // because modules like style also produce code by parent VNode data
    if (isUndef(node.data) && hasAncestorData(node)) {
        node.data = {};
    }
    if (isDef(node.data)) {
        // check directives
        const dirs = node.data.directives;
        if (dirs) {
            for (let i = 0; i < dirs.length; i++) {
                const { name } = dirs[i];
                if (name !== 'show') {
                    const dirRenderer = resolveAsset(context, 'directives', name);
                    if (dirRenderer) {
                        // directives mutate the node's data
                        // which then gets rendered by modules
                        dirRenderer(node, dirs[i]);
                    }
                }
            }
        }

        // v-show directive needs to be merged from parent to child
        const vshowDirectiveInfo = getVShowDirectiveInfo(node);
        if (vshowDirectiveInfo) {
            directives.show(node, vshowDirectiveInfo);
        }

        // apply other modules
        for (let i$1 = 0; i$1 < modules.length; i$1++) {
            const res = modules[i$1](node);
            if (res) {
                markup += res;
            }
        }
    }
    // attach scoped CSS ID
    let scopeId;
    const { activeInstance } = context;
    if (
        isDef(activeInstance) &&
        activeInstance !== node.context &&
        isDef((scopeId = activeInstance.$options._scopeId))
    ) {
        markup += ` ${scopeId}`;
    }
    if (isDef(node.fnScopeId)) {
        markup += ` ${node.fnScopeId}`;
    } else {
        while (isDef(node)) {
            if (isDef((scopeId = node.context.$options._scopeId))) {
                markup += ` ${scopeId}`;
            }
            node = node.parent;
        }
    }
    return `${markup}>`;
}

function createRenderFunction(modules, directives, isUnaryTag, cache) {
    return function render(component, write, userContext, done) {
        warned = Object.create(null);
        const context = new RenderContext({
            activeInstance: component,
            userContext,
            write,
            done,
            renderNode,
            isUnaryTag,
            modules,
            directives,
            cache,
        });
        installSSRHelpers(component);
        normalizeRender(component);

        const resolve = function() {
            renderNode(component._render(), true, context);
        };
        waitForServerPrefetch(component, resolve, done);
    };
}

/*  */

const isJS = function(file) {
    return /\.js(\?[^.]+)?$/.test(file);
};

const isCSS = function(file) {
    return /\.css(\?[^.]+)?$/.test(file);
};

function createPromiseCallback() {
    let resolve;
    let reject;
    const promise = new Promise(function(_resolve, _reject) {
        resolve = _resolve;
        reject = _reject;
    });
    const cb = function(err, res) {
        if (err) {
            return reject(err);
        }
        resolve(res || '');
    };
    return { promise, cb };
}

/*  */

const { Transform } = require('stream');

const TemplateStream = /* @__PURE__ */ (function(Transform) {
    function TemplateStream(renderer, template, context) {
        Transform.call(this);
        this.started = false;
        this.renderer = renderer;
        this.template = template;
        this.context = context || {};
        this.inject = renderer.inject;
    }

    if (Transform) TemplateStream.__proto__ = Transform;
    TemplateStream.prototype = Object.create(Transform && Transform.prototype);
    TemplateStream.prototype.constructor = TemplateStream;

    TemplateStream.prototype._transform = function _transform(data, encoding, done) {
        if (!this.started) {
            this.emit('beforeStart');
            this.start();
        }
        this.push(data);
        done();
    };

    TemplateStream.prototype.start = function start() {
        this.started = true;
        this.push(this.template.head(this.context));

        if (this.inject) {
            // inline server-rendered head meta information
            if (this.context.head) {
                this.push(this.context.head);
            }

            // inline preload/prefetch directives for initial/async chunks
            const links = this.renderer.renderResourceHints(this.context);
            if (links) {
                this.push(links);
            }

            // CSS files and inline server-rendered CSS collected by vue-style-loader
            const styles = this.renderer.renderStyles(this.context);
            if (styles) {
                this.push(styles);
            }
        }

        this.push(this.template.neck(this.context));
    };

    TemplateStream.prototype._flush = function _flush(done) {
        this.emit('beforeEnd');

        if (this.inject) {
            // inline initial store state
            const state = this.renderer.renderState(this.context);
            if (state) {
                this.push(state);
            }

            // embed scripts needed
            const scripts = this.renderer.renderScripts(this.context);
            if (scripts) {
                this.push(scripts);
            }
        }

        this.push(this.template.tail(this.context));
        done();
    };

    return TemplateStream;
})(Transform);

/*  */

const compile$1 = require('lodash.template');

const compileOptions = {
    escape: /{{([^{][\S\s]+?[^}])}}/g,
    interpolate: /{{{([\S\s]+?)}}}/g,
};

function parseTemplate(template, contentPlaceholder) {
    if (contentPlaceholder === void 0) contentPlaceholder = '<!--vue-ssr-outlet-->';

    if (typeof template === 'object') {
        return template;
    }

    let i = template.indexOf('</head>');
    const j = template.indexOf(contentPlaceholder);

    if (j < 0) {
        throw new Error('Content placeholder not found in template.');
    }

    if (i < 0) {
        i = template.indexOf('<body>');
        if (i < 0) {
            i = j;
        }
    }

    return {
        head: compile$1(template.slice(0, i), compileOptions),
        neck: compile$1(template.slice(i, j), compileOptions),
        tail: compile$1(template.slice(j + contentPlaceholder.length), compileOptions),
    };
}

/*  */

/**
 * Creates a mapper that maps components used during a server-side render
 * to async chunk files in the client-side build, so that we can inline them
 * directly in the rendered HTML to avoid waterfall requests.
 */

function createMapper(clientManifest) {
    const map = createMap(clientManifest);
    // map server-side moduleIds to client-side files
    return function mapper(moduleIds) {
        const res = new Set();
        // //commented
        // for (let i = 0; i < moduleIds.length; i++) {
        //     const mapped = map.get(moduleIds[i]);
        //     if (mapped) {
        //         for (let j = 0; j < mapped.length; j++) {
        //             res.add(mapped[j]);
        //         }
        //     }
        // }

        // new
        for (let i = moduleIds.length - 1; i >= 0; i--) {
            const mapped = map.get(moduleIds[i]);
            if (mapped) {
                for (let j = 0; j < mapped.length; j++) {
                    res.add(mapped[j]);
                }
            }
        }
        return Array.from(res);
    };
}

function createMap(clientManifest) {
    const map = new Map();
    Object.keys(clientManifest.modules).forEach(function(id) {
        map.set(id, mapIdToFile(id, clientManifest));
    });
    return map;
}

function mapIdToFile(id, clientManifest) {
    const files = [];
    const fileIndices = clientManifest.modules[id];
    if (fileIndices) {
        fileIndices.forEach(function(index) {
            const file = clientManifest.all[index];
            // only include async files or non-js, non-css assets
            if (clientManifest.async.indexOf(file) > -1 || !/\.(js|css)($|\?)/.test(file)) {
                files.push(file);
            }
        });
    }
    return files;
}

/*  */

const path = require('path');
const serialize = require('serialize-javascript');

const TemplateRenderer = function TemplateRenderer(options) {
    this.options = options;
    this.inject = options.inject !== false;
    // if no template option is provided, the renderer is created
    // as a utility object for rendering assets like preload links and scripts.

    const { template } = options;
    this.parsedTemplate = template ? (typeof template === 'string' ? parseTemplate(template) : template) : null;

    // function used to serialize initial state JSON
    this.serialize =
        options.serializer ||
        function(state) {
            return serialize(state, { isJSON: true });
        };

    // extra functionality with client manifest
    if (options.clientManifest) {
        const clientManifest = (this.clientManifest = options.clientManifest);
        // ensure publicPath ends with /
        this.publicPath = clientManifest.publicPath === '' ? '' : clientManifest.publicPath.replace(/([^/])$/, '$1/');
        // preload/prefetch directives
        this.preloadFiles = (clientManifest.initial || []).map(normalizeFile);
        this.prefetchFiles = (clientManifest.async || []).map(normalizeFile);
        // initial async chunk mapping
        this.mapFiles = createMapper(clientManifest);
    }
};

TemplateRenderer.prototype.bindRenderFns = function bindRenderFns(context) {
    const renderer = this;
    ['ResourceHints', 'State', 'Scripts', 'Styles'].forEach(function(type) {
        context[`render${type}`] = renderer[`render${type}`].bind(renderer, context);
    });
    // also expose getPreloadFiles, useful for HTTP/2 push
    context.getPreloadFiles = renderer.getPreloadFiles.bind(renderer, context);
};

// render synchronously given rendered app content and render context
TemplateRenderer.prototype.render = function render(content, context) {
    const template = this.parsedTemplate;
    if (!template) {
        throw new Error('render cannot be called without a template.');
    }
    context = context || {};

    if (typeof template === 'function') {
        return template(content, context);
    }

    if (this.inject) {
        return (
            template.head(context) +
            (context.head || '') +
            this.renderResourceHints(context) +
            this.renderStyles(context) +
            template.neck(context) +
            content +
            this.renderState(context) +
            this.renderScripts(context) +
            template.tail(context)
        );
    }
    return template.head(context) + template.neck(context) + content + template.tail(context);
};

TemplateRenderer.prototype.renderStyles = function renderStyles(context) {
    const this$1 = this;

    const initial = this.preloadFiles || [];
    const async = this.getUsedAsyncFiles(context) || [];
    const cssFiles = initial.concat(async).filter(function(ref) {
        const { file } = ref;

        return isCSS(file);
    });
    return (
        // ИЗМЕНЕНО
        // render links for css files
        (context.styles || '') +
        // context.styles is a getter exposed by vue-style-loader which contains
        // the inline component styles collected during SSR
        (cssFiles.length
            ? cssFiles
                  .map(function(ref) {
                      const { file } = ref;

                      return `<link rel="stylesheet" href="${this$1.publicPath}${file}">`;
                  })
                  .join('')
            : '')
    );
};

TemplateRenderer.prototype.renderResourceHints = function renderResourceHints(context) {
    return this.renderPreloadLinks(context) + this.renderPrefetchLinks(context);
};

TemplateRenderer.prototype.getPreloadFiles = function getPreloadFiles(context) {
    const usedAsyncFiles = this.getUsedAsyncFiles(context);
    if (this.preloadFiles || usedAsyncFiles) {
        return (this.preloadFiles || []).concat(usedAsyncFiles || []);
    }
    return [];
};

TemplateRenderer.prototype.renderPreloadLinks = function renderPreloadLinks(context) {
    const this$1 = this;

    const files = this.getPreloadFiles(context);
    const { shouldPreload } = this.options;
    if (files.length) {
        return files
            .map(function(ref) {
                const { file } = ref;
                const { extension } = ref;
                const { fileWithoutQuery } = ref;
                const { asType } = ref;

                let extra = '';
                // by default, we only preload scripts or css
                if (!shouldPreload && asType !== 'script' && asType !== 'style') {
                    return '';
                }
                // user wants to explicitly control what to preload
                if (shouldPreload && !shouldPreload(fileWithoutQuery, asType)) {
                    return '';
                }
                if (asType === 'font') {
                    extra = ` type="font/${extension}" crossorigin`;
                }
                return `<link rel="preload" href="${
                    this$1.publicPath
                }${file}"${asType !== '' ? ` as="${asType}"` : ''}${extra}>`;
            })
            .join('');
    }
    return '';
};

TemplateRenderer.prototype.renderPrefetchLinks = function renderPrefetchLinks(context) {
    const this$1 = this;

    const { shouldPrefetch } = this.options;
    if (this.prefetchFiles) {
        const usedAsyncFiles = this.getUsedAsyncFiles(context);
        const alreadyRendered = function(file) {
            return (
                usedAsyncFiles &&
                usedAsyncFiles.some(function(f) {
                    return f.file === file;
                })
            );
        };
        return this.prefetchFiles
            .map(function(ref) {
                const { file } = ref;
                const { fileWithoutQuery } = ref;
                const { asType } = ref;

                if (shouldPrefetch && !shouldPrefetch(fileWithoutQuery, asType)) {
                    return '';
                }
                if (alreadyRendered(file)) {
                    return '';
                }
                return `<link rel="prefetch" href="${this$1.publicPath}${file}">`;
            })
            .join('');
    }
    return '';
};

TemplateRenderer.prototype.renderState = function renderState(context, options) {
    const ref = options || {};
    let { contextKey } = ref;
    if (contextKey === void 0) contextKey = 'state';
    let { windowKey } = ref;
    if (windowKey === void 0) windowKey = '__INITIAL_STATE__';
    const state = this.serialize(context[contextKey]);
    const autoRemove = '';
    const nonceAttr = context.nonce ? ` nonce="${context.nonce}"` : '';
    return context[contextKey] ? `<script${nonceAttr}>window.${windowKey}=${state}${autoRemove}</script>` : '';
};

TemplateRenderer.prototype.renderScripts = function renderScripts(context) {
    const this$1 = this;

    if (this.clientManifest) {
        const initial = this.preloadFiles.filter(function(ref) {
            const { file } = ref;

            return isJS(file);
        });
        const async = (this.getUsedAsyncFiles(context) || []).filter(function(ref) {
            const { file } = ref;

            return isJS(file);
        });
        // old
        // const needed = [initial[0]].concat(async, initial.slice(1));

        // new
        const needed = [...initial].concat(async);
        return needed
            .map(function(ref) {
                const { file } = ref;

                return `<script src="${this$1.publicPath}${file}" defer></script>`;
            })
            .join('');
    }
    return '';
};

TemplateRenderer.prototype.getUsedAsyncFiles = function getUsedAsyncFiles(context) {
    if (!context._mappedFiles && context._registeredComponents && this.mapFiles) {
        const registered = Array.from(context._registeredComponents);
        context._mappedFiles = this.mapFiles(registered).map(normalizeFile);
    }
    return context._mappedFiles;
};

// create a transform stream
TemplateRenderer.prototype.createStream = function createStream(context) {
    if (!this.parsedTemplate) {
        throw new Error('createStream cannot be called without a template.');
    }
    return new TemplateStream(this, this.parsedTemplate, context || {});
};

function normalizeFile(file) {
    const withoutQuery = file.replace(/\?.*/, '');
    const extension = path.extname(withoutQuery).slice(1);
    return {
        file,
        extension,
        fileWithoutQuery: withoutQuery,
        asType: getPreloadType(extension),
    };
}

function getPreloadType(ext) {
    if (ext === 'js') {
        return 'script';
    }
    if (ext === 'css') {
        return 'style';
    }
    if (/jpe?g|png|svg|gif|webp|ico/.test(ext)) {
        return 'image';
    }
    if (/woff2?|ttf|otf|eot/.test(ext)) {
        return 'font';
    }
    // not exhausting all possibilities here, but above covers common cases
    return '';
}

/*  */

function createRenderer(ref) {
    if (ref === void 0) ref = {};
    let { modules } = ref;
    if (modules === void 0) modules = [];
    let { directives } = ref;
    if (directives === void 0) directives = {};
    let { isUnaryTag } = ref;
    if (isUnaryTag === void 0)
        isUnaryTag = function() {
            return false;
        };
    const { template } = ref;
    const { inject } = ref;
    const { cache } = ref;
    const { shouldPreload } = ref;
    const { shouldPrefetch } = ref;
    const { clientManifest } = ref;
    const { serializer } = ref;

    const render = createRenderFunction(modules, directives, isUnaryTag, cache);
    const templateRenderer = new TemplateRenderer({
        template,
        inject,
        shouldPreload,
        shouldPrefetch,
        clientManifest,
        serializer,
    });

    return {
        renderToString: function renderToString(component, context, cb) {
            let assign;

            if (typeof context === 'function') {
                cb = context;
                context = {};
            }
            if (context) {
                templateRenderer.bindRenderFns(context);
            }

            // no callback, return Promise
            let promise;
            if (!cb) {
                (assign = createPromiseCallback()), (promise = assign.promise), (cb = assign.cb);
            }

            let result = '';
            const write = createWriteFunction(function(text) {
                result += text;
                return false;
            }, cb);
            try {
                render(component, write, context, function(err) {
                    if (err) {
                        return cb(err);
                    }
                    if (context && context.rendered) {
                        context.rendered(context);
                    }
                    if (template) {
                        try {
                            const res = templateRenderer.render(result, context);
                            if (typeof res !== 'string') {
                                // function template returning promise
                                res.then(function(html) {
                                    return cb(null, html);
                                }).catch(cb);
                            } else {
                                cb(null, res);
                            }
                        } catch (e) {
                            cb(e);
                        }
                    } else {
                        cb(null, result);
                    }
                });
            } catch (e) {
                cb(e);
            }

            return promise;
        },

        renderToStream: function renderToStream(component, context) {
            if (context) {
                templateRenderer.bindRenderFns(context);
            }
            const renderStream = new RenderStream(function(write, done) {
                render(component, write, context, done);
            });
            if (!template) {
                if (context && context.rendered) {
                    const { rendered } = context;
                    renderStream.once('beforeEnd', function() {
                        rendered(context);
                    });
                }
                return renderStream;
            }
            if (typeof template === 'function') {
                throw new Error('function template is only supported in renderToString.');
            } else {
                const templateStream = templateRenderer.createStream(context);
                renderStream.on('error', function(err) {
                    templateStream.emit('error', err);
                });
                renderStream.pipe(templateStream);
                if (context && context.rendered) {
                    const rendered$1 = context.rendered;
                    renderStream.once('beforeEnd', function() {
                        rendered$1(context);
                    });
                }
                return templateStream;
            }
        },
    };
}

const vm = require('vm');
const path$1 = require('path');
const resolve = require('resolve');
const NativeModule = require('module');

function createSandbox(context) {
    const sandbox = {
        Buffer,
        console,
        process,
        setTimeout,
        setInterval,
        setImmediate,
        clearTimeout,
        clearInterval,
        clearImmediate,
        __VUE_SSR_CONTEXT__: context,
    };
    sandbox.global = sandbox;
    return sandbox;
}

function compileModule(files, basedir, runInNewContext) {
    const compiledScripts = {};
    const resolvedModules = {};

    function getCompiledScript(filename) {
        if (compiledScripts[filename]) {
            return compiledScripts[filename];
        }
        const code = files[filename];
        const wrapper = NativeModule.wrap(code);
        const script = new vm.Script(wrapper, {
            filename,
            displayErrors: true,
        });
        compiledScripts[filename] = script;
        return script;
    }

    function evaluateModule(filename, sandbox, evaluatedFiles) {
        if (evaluatedFiles === void 0) evaluatedFiles = {};

        if (evaluatedFiles[filename]) {
            return evaluatedFiles[filename];
        }

        const script = getCompiledScript(filename);
        const compiledWrapper = runInNewContext === false ? script.runInThisContext() : script.runInNewContext(sandbox);
        const m = { exports: {} };
        const r = function(file) {
            file = path$1.posix.join('.', file);
            if (files[file]) {
                return evaluateModule(file, sandbox, evaluatedFiles);
            }
            if (basedir) {
                return require(resolvedModules[file] || (resolvedModules[file] = resolve.sync(file, { basedir })));
            }
            return require(file);
        };
        compiledWrapper.call(m.exports, m.exports, r, m);

        const res = Object.prototype.hasOwnProperty.call(m.exports, 'default') ? m.exports.default : m.exports;
        evaluatedFiles[filename] = res;
        return res;
    }
    return evaluateModule;
}

function deepClone(val) {
    if (isPlainObject(val)) {
        const res = {};
        for (const key in val) {
            res[key] = deepClone(val[key]);
        }
        return res;
    }
    if (Array.isArray(val)) {
        return val.slice();
    }
    return val;
}

function createBundleRunner(entry, files, basedir, runInNewContext) {
    const evaluate = compileModule(files, basedir, runInNewContext);
    if (runInNewContext !== false && runInNewContext !== 'once') {
        // new context mode: creates a fresh context and re-evaluate the bundle
        // on each render. Ensures entire application state is fresh for each
        // render, but incurs extra evaluation cost.
        return function(userContext) {
            if (userContext === void 0) userContext = {};

            return new Promise(function(resolve) {
                userContext._registeredComponents = new Set();
                const res = evaluate(entry, createSandbox(userContext));
                resolve(typeof res === 'function' ? res(userContext) : res);
            });
        };
    }
    // direct mode: instead of re-evaluating the whole bundle on
    // each render, it simply calls the exported function. This avoids the
    // module evaluation costs but requires the source code to be structured
    // slightly differently.
    let runner; // lazy creation so that errors can be caught by user
    let initialContext;
    return function(userContext) {
        if (userContext === void 0) userContext = {};

        return new Promise(function(resolve) {
            if (!runner) {
                const sandbox = runInNewContext === 'once' ? createSandbox() : global;
                // the initial context is only used for collecting possible non-component
                // styles injected by vue-style-loader.
                initialContext = sandbox.__VUE_SSR_CONTEXT__ = {};
                runner = evaluate(entry, sandbox);
                // On subsequent renders, __VUE_SSR_CONTEXT__ will not be available
                // to prevent cross-request pollution.
                delete sandbox.__VUE_SSR_CONTEXT__;
                if (typeof runner !== 'function') {
                    throw new Error('bundle export should be a function when using ' + '{ runInNewContext: false }.');
                }
            }
            userContext._registeredComponents = new Set();

            // vue-style-loader styles imported outside of component lifecycle hooks
            if (initialContext._styles) {
                userContext._styles = deepClone(initialContext._styles);
                // #6353 ensure "styles" is exposed even if no styles are injected
                // in component lifecycles.
                // the renderStyles fn is exposed by vue-style-loader >= 3.0.3
                const renderStyles = initialContext._renderStyles;
                if (renderStyles) {
                    Object.defineProperty(userContext, 'styles', {
                        enumerable: true,
                        get: function get() {
                            return renderStyles(userContext._styles);
                        },
                    });
                }
            }

            resolve(runner(userContext));
        });
    };
}

/*  */

const { SourceMapConsumer } = require('source-map');

const filenameRE = /\(([^)]+\.js):(\d+):(\d+)\)$/;

function createSourceMapConsumers(rawMaps) {
    const maps = {};
    Object.keys(rawMaps).forEach(function(file) {
        maps[file] = new SourceMapConsumer(rawMaps[file]);
    });
    return maps;
}

function rewriteErrorTrace(e, mapConsumers) {
    if (e && typeof e.stack === 'string') {
        e.stack = e.stack
            .split('\n')
            .map(function(line) {
                return rewriteTraceLine(line, mapConsumers);
            })
            .join('\n');
    }
}

function rewriteTraceLine(trace, mapConsumers) {
    const m = trace.match(filenameRE);
    const map = m && mapConsumers[m[1]];
    if (m != null && map) {
        const originalPosition = map.originalPositionFor({
            line: Number(m[2]),
            column: Number(m[3]),
        });
        if (originalPosition.source != null) {
            const { source } = originalPosition;
            const { line } = originalPosition;
            const { column } = originalPosition;
            const mappedPosition = `(${source.replace(/^webpack:\/{3}/, '')}:${String(line)}:${String(column)})`;
            return trace.replace(filenameRE, mappedPosition);
        }
        return trace;
    }
    return trace;
}

/*  */

const fs = require('fs');
const path$2 = require('path');
const { PassThrough } = require('stream');

const INVALID_MSG =
    'Invalid server-rendering bundle format. Should be a string ' +
    'or a bundle Object of type:\n\n' +
    '{\n  entry: string;\n  files: { [filename: string]: string; };\n  maps: { [filename: string]: string; };\n}\n';

// The render bundle can either be a string (single bundled file)
// or a bundle manifest object generated by vue-ssr-webpack-plugin.

function createBundleRendererCreator(createRenderer) {
    return function createBundleRenderer(bundle, rendererOptions) {
        if (rendererOptions === void 0) rendererOptions = {};

        let files;
        let entry;
        let maps;
        let { basedir } = rendererOptions;

        // load bundle if given filepath
        if (typeof bundle === 'string' && /\.js(on)?$/.test(bundle) && path$2.isAbsolute(bundle)) {
            if (fs.existsSync(bundle)) {
                const isJSON = /\.json$/.test(bundle);
                basedir = basedir || path$2.dirname(bundle);
                bundle = fs.readFileSync(bundle, 'utf-8');
                if (isJSON) {
                    try {
                        bundle = JSON.parse(bundle);
                    } catch (e) {
                        throw new Error(`Invalid JSON bundle file: ${bundle}`);
                    }
                }
            } else {
                throw new Error(`Cannot locate bundle file: ${bundle}`);
            }
        }

        if (typeof bundle === 'object') {
            entry = bundle.entry;
            files = bundle.files;
            basedir = basedir || bundle.basedir;
            maps = createSourceMapConsumers(bundle.maps);
            if (typeof entry !== 'string' || typeof files !== 'object') {
                throw new Error(INVALID_MSG);
            }
        } else if (typeof bundle === 'string') {
            entry = '__vue_ssr_bundle__';
            files = { __vue_ssr_bundle__: bundle };
            maps = {};
        } else {
            throw new Error(INVALID_MSG);
        }

        const renderer = createRenderer(rendererOptions);

        const run = createBundleRunner(entry, files, basedir, rendererOptions.runInNewContext);

        return {
            renderToString(context, cb) {
                let assign;

                if (typeof context === 'function') {
                    cb = context;
                    context = {};
                }

                let promise;
                if (!cb) {
                    (assign = createPromiseCallback()), (promise = assign.promise), (cb = assign.cb);
                }

                run(context)
                    .catch(function(err) {
                        rewriteErrorTrace(err, maps);
                        cb(err);
                    })
                    .then(function(app) {
                        if (app) {
                            renderer.renderToString(app, context, function(err, res) {
                                rewriteErrorTrace(err, maps);
                                cb(err, res);
                            });
                        }
                    });

                return promise;
            },

            renderToStream(context) {
                const res = new PassThrough();
                run(context)
                    .catch(function(err) {
                        rewriteErrorTrace(err, maps);
                        // avoid emitting synchronously before user can
                        // attach error listener
                        process.nextTick(function() {
                            res.emit('error', err);
                        });
                    })
                    .then(function(app) {
                        if (app) {
                            const renderStream = renderer.renderToStream(app, context);

                            renderStream.on('error', function(err) {
                                rewriteErrorTrace(err, maps);
                                res.emit('error', err);
                            });

                            // relay HTMLStream special events
                            if (rendererOptions && rendererOptions.template) {
                                renderStream.on('beforeStart', function() {
                                    res.emit('beforeStart');
                                });
                                renderStream.on('beforeEnd', function() {
                                    res.emit('beforeEnd');
                                });
                            }

                            renderStream.pipe(res);
                        }
                    });

                return res;
            },
        };
    };
}

/*  */

process.env.VUE_ENV = 'server';

function createRenderer$1(options) {
    if (options === void 0) options = {};

    return createRenderer(
        extend(extend({}, options), {
            isUnaryTag,
            canBeLeftOpenTag,
            modules,
            // user can provide server-side implementations for custom directives
            // when creating the renderer.
            directives: extend(baseDirectives, options.directives),
        })
    );
}

const createBundleRenderer = createBundleRendererCreator(createRenderer$1);

exports.createRenderer = createRenderer$1;
exports.createBundleRenderer = createBundleRenderer;
