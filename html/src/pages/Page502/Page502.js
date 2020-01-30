import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Page502 from './Page502.vue';

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: document.head.lang,
    fallbackLocale: 'en',
    messages: {},
});

// Boot the current Vue component
const root = document.getElementById('app');

window.vue = new Vue({
    i18n,
    render: h => h(Page502),
}).$mount(root);
