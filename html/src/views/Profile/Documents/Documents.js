/**
 * @Module
 */

import isUserReferral from '@router/middleware/isUserReferral';

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
            path: 'documents',
            component: DocumentsAsync,

            meta: {
                middleware: [isUserReferral],
            },
        },
    ],
};
