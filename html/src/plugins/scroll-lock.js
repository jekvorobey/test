import Vue from 'vue';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Helpers from '../util/helpers';

/**
 * Class
 *
 */
class VScrollLock {
    /**
     * Constructor.
     *
     * @param {*} disableScrollHook
     * @param {*} enableScrollHook
     */
    constructor(disableScrollHook, enableScrollHook) {
        this.disableBodyScroll = disableScrollHook;
        this.enableBodyScroll = enableScrollHook;
    }

    /**
     * Called when plugin is initialized.
     *
     * @param {Object} Vue The Vue instance.
     * @param {Object} options Options passed to plugin.
     */
    install(Vue, options) {
        Vue.directive('scroll-lock', {
            inserted: this.inserted.bind(this),
            componentUpdated: this.componentUpdated.bind(this),
            unbind: this.unbind.bind(this),
        });
    }

    /**
     * Inserted directive hook. Called when the bound element has been inserted into its parent node.
     *
     * @param {Node} el Element directive is bound to.
     * @param {Object} binding Binding options.
     */
    inserted(el, binding) {
        if (binding.value) {
            this.disableBodyScroll(el);
        }
    }

    /**
     * Update directive hook. Called after the containing component’s VNode and the VNodes of its children have updated.
     *
     * @param {Node} el Element directive is bound to.
     * @param {Object} binding Binding options.
     */
    componentUpdated(el, binding) {
        if (binding.oldValue !== binding.value) {
            if (binding.value) this.disableBodyScroll(el);
            else this.enableBodyScroll(el);
        }
    }

    /**
     * Unbind directive hook.
     *
     * @param {Node} el Element directive is bound to.
     */
    unbind(el) {
        this.enableBodyScroll(el);
    }
}

/**
 * Выключение скрола страницы.
 *
 * @param {*} targetElement
 * @param {*} options
 */
function disableScroll(targetElement, options) {
    const bodyElement =
        typeof document !== 'undefined' ? document.scrollingElement || document.documentElement || document.body : null;
    if (bodyElement) {
        setTimeout(() => {
            // Helpers.addClass(bodyElement, 'html-modal-open');
            // Helpers.addClass(document.querySelector('.header-main__top'), 'html-modal-open');
            // Helpers.addClass(document.querySelector('.header-main__panel'), 'html-modal-open');
            // Helpers.addClass(document.querySelector('.footer-main'), 'html-modal-open');
        }, 0);
    }
    disableBodyScroll(targetElement, options);
}

/**
 * Включение скрола страницы.
 *
 * @param {*} targetElement
 */
function enableScroll(targetElement) {
    const bodyElement =
        typeof document !== 'undefined' ? document.scrollingElement || document.documentElement || document.body : null;
    if (bodyElement) {
        setTimeout(() => {
            // Helpers.removeClass(bodyElement, 'html-modal-open');
            // Helpers.removeClass(document.querySelector('.header-main__top'), 'html-modal-open');
            // Helpers.removeClass(document.querySelector('.header-main__panel'), 'html-modal-open');
            // Helpers.removeClass(document.querySelector('.footer-main'), 'html-modal-open');
        }, 0);
    }
    enableBodyScroll(targetElement);
}

Vue.use(new VScrollLock(disableScroll, enableScroll));
