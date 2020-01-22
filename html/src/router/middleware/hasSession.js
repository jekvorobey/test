import { NAME as AUTH_MODULE, HAS_SESSION } from '../../store/modules/Auth';

export default function hasSession({ next, store }) {
    const hasSession = store.state[AUTH_MODULE][HAS_SESSION];
    if (!hasSession) {
        return next({
            path: '/',
            replace: true,
        });
    }
    return next();
}
