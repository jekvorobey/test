import { NAME as AUTH_MODULE, BACK_URL } from '../../store/modules/Auth';
import { LOGIN_BY_SOCIAL } from '../../store/modules/Auth/actions';

export default async function socialLogin({ from, to, next, store: { state, dispatch }, appContext, resolve }) {
    try {
        const {
            params: { driver },
            query,
        } = to;

        if (appContext.isServer) {
            const url = await dispatch(`${AUTH_MODULE}/${LOGIN_BY_SOCIAL}`, { driver, query });
            appContext.statusCode = 302;
            appContext.redirect = url;
            return next();
        }
        return next(false);
    } catch (error) {
        appContext.statusCode = 500;
        return next({ path: '/', replace: true });
    }
}
