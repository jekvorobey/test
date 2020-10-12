/**
 * @Module
 */

const MessagesAsync = () => import(/* webpackChunkName: "messages-view" */ './Messages.vue');

/**
 * Модуль компонента Messages
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Messages',
            path: 'messages/',
            pathToRegexpOptions: { strict: true },
            component: MessagesAsync,
        },
    ],
};
