import { $cookie } from '@services';

export default async function UTMParserCookie({to, nextMiddleware }) {
    const { query } = to,
        UTMArray = ['utm_campaign', 'utm_source', 'utm_medium', 'utm_content', 'utm_term'];

    for (let q in query) if (UTMArray.includes(q)) $cookie.set(q, query[q], {maxAge: 1000 * 60 * 60 * 24 , path: '/',});

    nextMiddleware();
}
