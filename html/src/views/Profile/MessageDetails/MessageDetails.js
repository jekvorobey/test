/**
 * @Module
 */

const MessageDetailsAsync = () => import(/* webpackChunkName: "message-details-view" */ './MessageDetails.vue');

/**
 * Модуль компонента MessageDetails
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'MessageDetails',
            path: 'messages/:messageId',
            component: MessageDetailsAsync,
        },
    ],
};
