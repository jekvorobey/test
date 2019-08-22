<template>
    <div id="app" class="fake-vue-body">
        <layout-header />
        <main>
            <transition name="fade" mode="out-in">
                <router-view class="view" />
            </transition>
        </main>
        <layout-footer />
    </div>
</template>

<script>
/**
 * Basic polyfills and libs for application
 * Полифилы и базовые либы приложения
 */
import 'core-js/modules/es.promise';
import 'core-js/modules/es.array.iterator';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'custom-event-polyfill';
import 'intersection-observer';
import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/respimg/ls.respimg';
import 'focus-visible';

import './App.critical.css';
import './App.css';

/**
 * Базовые компоненты страницы
 */
import LayoutHeader from '../components/LayoutHeader/LayoutHeader.vue';
import LayoutFooter from '../components/LayoutFooter/LayoutFooter.vue';

export default {
    name: 'app',
    components: {
        LayoutHeader,
        LayoutFooter,
    },
};
</script>



