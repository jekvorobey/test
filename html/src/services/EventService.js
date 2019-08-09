import Vue from 'vue';

const events = new Vue();
Vue.prototype.$events = events;

/**
 * Сервис глобальных событий
 */
export default events;
