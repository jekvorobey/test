const RegisterConfirmationAsync = () =>
    import(/* webpackChunkName: "register-confirmation-view" */ './RegisterConfirmation.vue');

export default {
    routes: [
        {
            name: 'RegisterConfirmation',
            path: '/user/:id/change-password/:signature/',
            component: RegisterConfirmationAsync,
            props: true,
            meta: {
                hideDefaultHeader: true,
                hideDefaultFooter: true,
            },
        },
    ],
};
