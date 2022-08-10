import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Page403 from './Page403.vue';

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
    render: (h) => h(Page403),
}).$mount(root);
