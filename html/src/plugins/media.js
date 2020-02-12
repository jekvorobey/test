import Vue from 'vue';
import { breakpoints } from '../assets/scripts/enums';

const MQ = 'GREENSIGHT_MEDIA_MQ';
const MQMAP = 'GREENSIGHT_MEDIA_MQ_MAP';

const MediaPlugin = vue => {
    Object.defineProperty(Vue.prototype, '$mq', {
        get() {
            return this[MQ];
        },
    });
    vue.mixin({
        beforeCreate() {
            const isRoot = this === this.$root;
            const inherited = this.$parent && this.$parent[MQ];

            if (isRoot && this.$options.mq) {
                const mergedKeys = Object.keys(this.$options.mq);
                const observed = mergedKeys.reduce((obs, k) => {
                    obs[k] = false;
                    return obs;
                }, {});

                Object.defineProperty(observed, 'all', {
                    enumerable: true,
                    configurable: true,
                    get() {
                        return Object.keys(this)
                            .filter(k => k !== 'all')
                            .filter(k => this[k]);
                    },
                });

                Vue.util.defineReactive(this, MQ, observed);
            } else if (inherited) Vue.util.defineReactive(this, MQ, this.$parent[MQ]);
        },
        mounted() {
            const isRoot = this === this.$root;
            const inherited = this.$parent && this.$parent[MQ];

            if (isRoot && this.$options.mq) {
                this[MQMAP] = {};

                const mergedKeys = Object.keys(this.$options.mq);
                mergedKeys.forEach(k => {
                    const ownQuery = this.$options.mq[k];
                    const mql = ownQuery ? window.matchMedia(ownQuery) : inherited[k];
                    const handler = e => {
                        this[MQ][k] = e.matches;
                    };
                    mql.addListener(handler);

                    this[MQ][k] = mql.matches;
                    this[MQMAP][k] = { mql, handler };
                });
            }
        },
        beforeDestroy() {
            const isRoot = this === this.$root;
            const inherited = this.$parent && this.$parent[MQ];

            if (isRoot && this.$options.mq) {
                Object.keys(this[MQMAP]).forEach(key => {
                    const map = this[MQMAP][key];
                    map.mql.removeListener(map.handler);
                    map.mql = null;
                    map.handler = null;
                });
                this[MQMAP] = null;
                this[MQ] = null;
            } else if (inherited) this[MQ] = null;
        },
    });
};

// eslint-disable-next-line no-prototype-builtins
if (!Vue.prototype.hasOwnProperty('$mq')) Vue.use(MediaPlugin);

export default {
    mobileSm: `(max-width: ${360 - 1}px)`,
    mobile: `(max-width: ${breakpoints.mobile - 1}px)`,
    mobileLg: `(max-width: ${breakpoints.mobileLg - 1}px)`,
    tablet: `(max-width: ${breakpoints.tablet - 1}px)`,
    tabletLg: `(max-width: ${breakpoints.tabletLg - 1}px)`,
    desktop: `(max-width: ${breakpoints.desktop - 1}px)`,
    desktopLg: `(max-width: ${breakpoints.desktopLg - 1}px)`,
    desktopXl: `(max-width: ${breakpoints.desktopXl - 1}px)`,
};
