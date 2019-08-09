import Vue from 'vue';
import ProgressBar from '../components/ProgressBar/ProgressBar.vue';

const progress = new Vue(ProgressBar).$mount();
Vue.prototype.$progress = progress;
document.body.appendChild(progress.$el);

/**
 * Глобальный прогресс бар, сервис юзается только на клиенте
 */
export default progress;
