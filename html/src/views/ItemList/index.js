/**
 * @Module
 */

/**
 * Метод слоздания HoC компонента для листа. можно сказать - это фабрика
 * @param {*} id
 */
const createListView = id => () =>
    import(/* webpackChunkName: "create-list-view" */ './CreateListView').then(m => m.default(id));

/**
 * Модуль компонента ItemList
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        { name: 'top', path: '/top/:page(\\d+)?', component: createListView('top') },
        { name: 'new', path: '/new/:page(\\d+)?', component: createListView('new') },
        { name: 'show', path: '/show/:page(\\d+)?', component: createListView('show') },
        { name: 'ask', path: '/ask/:page(\\d+)?', component: createListView('ask') },
        { name: 'job', path: '/job/:page(\\d+)?', component: createListView('job') },
        { path: '/', redirect: '/top' },
    ],
};
