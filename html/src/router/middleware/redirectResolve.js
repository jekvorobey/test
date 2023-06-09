import { injectionType } from '@enums';
import { REDIRECTS } from '@store/getters';
import { FETCH_REDIRECTS } from '@store/actions';
import { slashUrl } from '@regex';

export default async function redirectResolve({ to, next, container, nextMiddleware }) {
    const { path, params, query, hash } = to;
    const logger = container.get(injectionType.LOGGER);
    const { dispatch, state } = container.get(injectionType.STORE);

    if (!state[REDIRECTS].length) {
        await dispatch(FETCH_REDIRECTS);
    }

    const rightTrimSlashes = (uri) => uri.replace(new RegExp('[/]+$'), '');
    const uri = rightTrimSlashes(path);
    const redirect = state[REDIRECTS].find((el) => rightTrimSlashes(el.from) === uri.toLowerCase());

    if (redirect) {
        let target = redirect.to;
        if (!slashUrl.test(path)) target = `${target}/`;
        if (logger) logger.warn(`Redirect from ${path} to ${target}`);
        return next({ path: target, params, query, hash });
    }
    nextMiddleware();
}
