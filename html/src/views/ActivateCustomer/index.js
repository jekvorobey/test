import activateCustomer from '@router/middleware/activateCustomer';

/**
 * Модуль компонента подтверждения статуса профессионала
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            path: '/activate-customer/:customerId/:signature/',
            meta: {
                middleware: [activateCustomer],
            },
        },
    ],
};
