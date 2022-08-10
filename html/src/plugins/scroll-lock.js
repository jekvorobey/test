import Vue from 'vue';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

/**
 * VScrollLock плагин
 */
class VScrollLock {
    /**
     * Constructor.
     *
     * @param {*} disableScrollHook
     * @param {*} enableScrollHook
     */
    constructor(disableScrollHook, enableScrollHook, defaultOptions) {
        this.disableBodyScroll = disableScrollHook;
        this.enableBodyScroll = enableScrollHook;
        this.options = Object.assign({}, defaultOptions);
    }

    /**
     * Called when plugin is initialized.
     *
     * @param {Object} Vue The Vue instance.
     * @param {Object} options Options passed to plugin.
     */
    // eslint-disable-next-line no-unused-vars
    install(vue, options) {
        vue.directive('scroll-lock', {
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
            this.disableBodyScroll(el, this.options);
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
            if (binding.value) this.disableBodyScroll(el, this.options);
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
    options.reserveScrollBarGap = false;
    options.allowTouchMove = (targetElement) => {
        let allow = false;

        // Для селектов скролл должен быть разрешён всегда
        if (targetElement.closest('.multiselect__container') !== null) {
            allow = true;
        }

        return allow;
    };

    disableBodyScroll(targetElement, options);
}

/**
 * Включение скрола страницы.
 *
 * @param {*} targetElement
 */
function enableScroll(targetElement) {
    enableBodyScroll(targetElement);
}

if (process.env.VUE_ENV === 'client') {
    Vue.use(new VScrollLock(disableScroll, enableScroll));
}
