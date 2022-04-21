import { NAME as AUTH_MODULE } from '@store/modules/Auth';
import { LOGIN_BY_SIGNATURE } from '@store/modules/Auth/actions';

import { breakMiddleware } from '@util/router';
import { httpCodes, injectionType } from '@enums';

export default {
    routes: [
        {
            name: 'RegisterConfirmation',
            path: '/user/:id/change-password/:signature',
            component: {
                render() {
                    return {};
                },
            },
            meta: {
                middleware: [
                    async function ({ to, next, container }) {
                        const appContext = container.get(injectionType.APPLICATION_CONTEXT);
                        const store = container.get(injectionType.STORE);

                        const {
                            params: { id, signature },
                        } = to;

                        try {
                            await store.dispatch(`${AUTH_MODULE}/${LOGIN_BY_SIGNATURE}`, {
                                userId: id,
                                signature,
                            });

                            return next({
                                path: '/profile',
                            });
                        } catch (error) {
                            return breakMiddleware(appContext, next, null, httpCodes.FORBIDDEN);
                        }
                    },
                ],
            },
        },
    ],
};
