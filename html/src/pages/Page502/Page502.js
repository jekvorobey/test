import Vue from 'vue';
import Page502 from './Page502.vue';
import i18n from '../../plugins/i18n';

// Boot the current Vue component
const root = document.getElementById('app');

window.vue = new Vue({
    i18n,
    render: h => h(Page502),
}).$mount(root);
