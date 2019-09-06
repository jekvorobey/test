import Vue from 'vue';
import Router from 'vue-router';

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
Vue.use(Router);

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

    return new Router({
        mode: 'history',
        fallback: false,
        // eslint-disable-next-line no-unused-vars
        scrollBehavior: (to, from, savedPosition) => {
            // Возвращаем промис, который срабатывает на 50 мс после того, как срабатывает анимация нового компонента
            return new Promise(resolve => {
                setTimeout(() => {
                    if (to.hash) resolve({ selector: to.hash });
                    if (savedPosition) resolve(savedPosition);
                    resolve({ x: 0, y: 0 });
                }, 250);
            });
        },
        routes,
    });
}
