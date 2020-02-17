import { NAME as AUTH_MODULE, HAS_SESSION } from '../../store/modules/Auth';

export default function hasSession({ next, store: { state }, appContext }) {
    const hasSession = state[AUTH_MODULE][HAS_SESSION];
    if (!hasSession) {
        if (appContext.isServer) appContext.statusCode = 403;
        return next({
            path: '/',
            replace: true,
        });
    }
    return next();
}
