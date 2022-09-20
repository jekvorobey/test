import {injectionType} from "@enums";

let used = false;

export default async function UTMParserCookie({to, nextMiddleware, container}) {
    const logger = container.get(injectionType.LOGGER);

    if (!used) {
        try {
            used = true
            const cookies = container.get(injectionType.COOKIE);
            const {query} = to,
                UTMArray = ['utm_campaign', 'utm_source', 'utm_medium', 'utm_content', 'utm_term'];

            for (let q in query) if (UTMArray.includes(q)) cookies.set(q, query[q], {
                maxAge: 1000 * 60 * 60 * 24,
                path: '/',
            });

            nextMiddleware();
        } catch (e) {
            logger.error(`Error in UTMParserCookie: ${e}`);
            nextMiddleware();
        }
    }
    nextMiddleware();
}
