import { injectionType } from '@enums';
import { REDIRECTS } from '@store/getters';
import { FETCH_REDIRECTS } from '@store/actions';
// import { slashUrl } from '@regex';

export default async function redirectResolve({ to, next, container, nextMiddleware }) {
    const { path, params, query, hash } = to;
    const logger = container.get(injectionType.LOGGER);
    const { dispatch, state } = container.get(injectionType.STORE);

    if (!state[REDIRECTS].length) {
        dispatch(FETCH_REDIRECTS);
    }

    const uri = path.replace(new RegExp('[/]+$'), '');
    const redirect = state[REDIRECTS].find((el) => el.from === uri.toLowerCase());

    if (redirect) {
        if (logger) logger.warn(`Redirect from ${path} to ${redirect.to}`);
        return next({ path: `${path}`, params, query, hash });
    }
    nextMiddleware();
}
