import Vue from 'vue';
import VueRouter from 'vue-router';
import pipeline from './pipeline';

import { $store } from '../services/ServiceLocator';
import { SET_MENU_OPEN } from '../store/actions';

import { NAME as SEARCH_MODULE } from '../store/modules/Search';
import { SET_SEARCH } from '../store/modules/Search/actions';

import { NAME as MODAL_MODULE } from '../store/modules/Modal';
import { CLOSE_ALL } from '../store/modules/Modal/actions';

/*
 * Preventing errors in console in Vue-router >= 3.1.0
 * https://github.com/vuejs/vue-router/issues/2881#issuecomment-520554378
 * https://router.vuejs.org/ru/api/#router-push
 * */
const routerMethods = ['push', 'replace'];
routerMethods.forEach(method => {
    const originalCall = VueRouter.prototype[method];

    VueRouter.prototype[method] = function(location, onResolve, onReject) {
        if (onResolve || onReject) return originalCall.call(this, location, onResolve, onReject);
        return originalCall.call(this, location).catch(err => err);
    };
});

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

    router.beforeEach((to, from, next) => {
        const { matched } = to;
        const middlewares = [];

        for (let i = 0; i < matched.length; i++) {
            const {
                meta: { middleware = [] },
            } = matched[i];
            middlewares.push(...middleware);
        }

        if (middlewares.length === 0) return next();

        const context = {
            to,
            from,
            next,
            store: $store,
        };

        return middlewares[0]({
            ...context,
            next: pipeline(context, middlewares, 1),
        });
    });

    // eslint-disable-next-line
    router.afterEach((to, from) => {
        if ($store) {
            $store.dispatch(SET_MENU_OPEN, false);
            $store.dispatch(`${SEARCH_MODULE}/${SET_SEARCH}`, false);
            $store.dispatch(`${MODAL_MODULE}/${CLOSE_ALL}`);
        }
    });

    return router;
}
