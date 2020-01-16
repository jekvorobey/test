import 'core-js/stable/object';
import 'core-js/stable/promise';
import 'core-js/stable/array';
import 'core-js/stable/number';
import 'core-js/stable/dom-collections';
import 'regenerator-runtime/runtime';

import './insertAdjacentElement';
import './classlist-polyfill';
import 'custom-event-polyfill';
import 'intersection-observer';
import 'focus-visible';

import lazysizes from 'lazysizes';
import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/respimg/ls.respimg';
import 'lazysizes/plugins/blur-up/ls.blur-up';

lazysizes.cfg.blurupMode = 'auto';
