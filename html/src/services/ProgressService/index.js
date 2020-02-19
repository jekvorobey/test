import Vue from 'vue';
import ProgressBar from '../../components/ProgressBar/ProgressBar.vue';

/**
 * Глобальный прогресс бар, сервис юзается только на клиенте
 */
export default class ProgressService {
    constructor() {
        this._bar = new Vue(ProgressBar).$mount();
        Vue.prototype.$progress = this;
        document.body.appendChild(this._bar.$el);
    }

    start() {
        this._bar.start();
        return this;
    }

    set(num) {
        this._bar.set(num);
        return this;
    }

    get() {
        return this._bar.get();
    }

    increase(num) {
        this._bar.increase(num);
        return this;
    }

    decrease(num) {
        this._bar.decrease(num);
        return this;
    }

    finish() {
        this._bar.finish();
        return this;
    }

    pause() {
        this._bar.pause();
        return this;
    }

    hide() {
        this._bar.hide();
        return this;
    }

    fail() {
        this._bar.fail();
        return this;
    }

    dispose() {
        this._bar.$destroy();
        this._bar = null;
    }
}
