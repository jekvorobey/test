import Vue from 'vue';

if (process.env.VUE_ENV === 'client') {
    const VueHead = require('vue-head');
    Vue.use(VueHead);
}
