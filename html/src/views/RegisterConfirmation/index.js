import { breakMiddleware } from '@util/router';
import { httpCodes, injectionType } from '@enums';
import { loginBySignature } from '@api';

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
                middleware: [
                    async function ({ to, next, container, nextMiddleware }) {
                        const appContext = container.get(injectionType.APPLICATION_CONTEXT);

                        if (appContext.isServer) {
                            const {
                                params: { id, signature },
                            } = to;

                            try {
                                await loginBySignature({
                                    userId: id,
                                    signature,
                                });

                                nextMiddleware();
                            } catch (error) {
                                console.error(error);
                                breakMiddleware(appContext, next, null, httpCodes.FORBIDDEN);
                            }
                        } else {
                            nextMiddleware();
                        }
                    },
                ],
            },
        },
    ],
};
