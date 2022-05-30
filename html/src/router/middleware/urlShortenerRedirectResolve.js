import {httpCodes, injectionType} from '@enums';
import {breakMiddleware} from "@util/router";
import {getUrlShortenerRedirect} from '@api';

export default async function urlShortenerRedirectResolve({ to, next, container, nextMiddleware }) {
    const { path, params, query, hash } = to;
    const appContext = container.get(injectionType.APPLICATION_CONTEXT);
    const logger = container.get(injectionType.LOGGER);

    //если путь начинается с '/o/', то ищем шортлинк в базе
    if (path.indexOf('/o/') === 0) {
        const rightTrimSlashes = (uri) => uri.replace(new RegExp('[/]+$'), '');
        const uri = rightTrimSlashes(path);

        try {
            if (logger) logger.warn(`Start fetching redirect by short url ${uri}`);
            const redirect = await getUrlShortenerRedirect(uri);

            if (redirect.to) {
                if (logger) logger.warn(`Redirect from short url ${uri} to ${redirect.to}`);
                breakMiddleware(appContext, next, redirect.to, httpCodes.FOUND);
            }
        } catch (error) {
            if (logger) logger.warn(`Error during fetching short url ${uri}: ${error.name} ${error.message}`);
            nextMiddleware();
        }
    }

    nextMiddleware();
}
