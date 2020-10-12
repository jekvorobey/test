import { injectionType } from '@enums';
import { slashUrl } from '@regex';

export default async function routeResolve({ to, next, container, nextMiddleware }) {
    const { path, params, query, hash } = to;
    const logger = container.get(injectionType.LOGGER);

    if (!slashUrl.test(path)) {
        const redirectRoute = { path: `${path}/`, params, query, hash };
        if (logger) logger.warn(`Redirect from ${path} to ${redirectRoute.path}`);
        return next({ path: `${path}/`, params, query, hash });
    }
    nextMiddleware();
}
