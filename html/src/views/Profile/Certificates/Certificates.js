/**
 * @Module
 */

const CertificatesAsync = () => import(/* webpackChunkName: "certificates-view" */ './Certificates.vue');

/**
 * Модуль компонента Certificates
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Certificates',
            path: 'certificates/',
            pathToRegexpOptions: { strict: true },
            component: CertificatesAsync,
        },
    ],
};
