import Vue from 'vue';
import VueRouter from 'vue-router';

import { $store } from '../services/ServiceLocator';
import { SET_MENU_OPEN } from '../store/actions';
import { SET_SEARCH } from '../store/modules/Search/actions';

const routes = [];
let keys = [];

function importViews(r) {
    keys = r.keys();
    keys.forEach(key => {
        routes.push(...r(key).default.routes);
    });
}

importViews(require.context('../views', true, /index.js$/));

/*  Подключение роутера  */
Vue.use(VueRouter);

/* 
    Route-level bundle splitting
    Разделение бандлов страниц на уровне роутера
*/

/**
 * Инициализация нового экземпляра роутера
 */
export default function createRouter() {
    if (process.env.VUE_ENV === 'client' && 'scrollRestoration' in window.history) {
        // включаем ручной режим выставления скрола на странице
        // только в клиентской сборке
        window.history.scrollRestoration = 'manual';
    }

    const router = new VueRouter({
        mode: 'history',
        fallback: false,
        // eslint-disable-next-line no-unused-vars
        scrollBehavior: (to, from, savedPosition) => {
            if (!savedPosition && to.meta.skipScroll) return null;
            if (to.hash) return { selector: to.hash };
            if (savedPosition) return savedPosition;

            return { x: 0, y: 0 };

            // Возвращаем промис, который срабатывает на 50 мс после того, как срабатывает анимация нового компонента
            // return new Promise(resolve => {
            //     setTimeout(() => {
            //         if (to.hash) resolve({ selector: to.hash });
            //         if (savedPosition) resolve(savedPosition);
            //         resolve({ x: 0, y: 0 });
            //     }, 250);
            // });
        },
        routes,
    });

    // eslint-disable-next-line
    router.afterEach((to, from) => {
        if ($store) {
            $store.dispatch(SET_MENU_OPEN, false);
            $store.dispatch(`search/${SET_SEARCH}`, false);
        }
    });

    return router;
}
