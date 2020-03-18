import 'core-js/stable/symbol';
import 'core-js/stable/object';
import 'core-js/stable/promise';
import 'core-js/stable/array';
import 'core-js/stable/number';
import 'core-js/stable/string';
import 'core-js/stable/dom-collections';
import 'regenerator-runtime/runtime';
import 'proxy-polyfill';
import 'reflect-metadata';

import '@polyfills/insertAdjacentElement';
import '@polyfills/classlist-polyfill';
import '@polyfills/linq-es6';
import 'custom-event-polyfill';
import 'intersection-observer';
import 'focus-visible';

import lazysizes from 'lazysizes';
import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/respimg/ls.respimg';
import 'lazysizes/plugins/blur-up/ls.blur-up';

import '@constants';
import '@enums';
import '@regex';

lazysizes.cfg.blurupMode = 'auto';
