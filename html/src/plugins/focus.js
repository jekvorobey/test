import Vue from 'vue';

Vue.directive('focus', {
    inserted(el) {
        const focusable = 'input, a, button';
        let element = null;
        if (el.matches(focusable)) element = el;
        else element = el.querySelector(focusable);

        if (element) setTimeout(() => element.focus(), 300);
    },
});
