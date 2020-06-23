import Vue from 'vue';

if (process.env.VUE_ENV === 'client') {
    const VueStickyDirective = require('@renatodeleao/vue-sticky-directive');
    Vue.use(VueStickyDirective);
}
