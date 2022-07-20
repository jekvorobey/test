/**
 * @Module
 */

const DocumentsAsync = () => import(/* webpackChunkName: "documents-view" */ './Documents.vue');

/**
 * Модуль компонента Documents
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Documents',
            path: 'documents/',
            pathToRegexpOptions: { strict: true },
            component: DocumentsAsync,
        },
    ],
};
