/**
 * @Module
 */

const QnAAsync = () => import(/* webpackChunkName: "qna-view" */ './QnA.vue');

/**
 * Модуль компонента QnA
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'QnA',
            path: 'qna',
            component: QnAAsync,
        },
    ],
};
