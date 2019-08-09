// this is aliased in webpack config based on server/client build
// eslint-disable-next-line
import createAPI from 'create-api';
import ServiceLocator from '../services/ServiceLocator';

const logger = ServiceLocator.$logger();
const logRequests = !!process.env.DEBUG_API;

const api = createAPI({
    version: '/v0',
    config: {
        databaseURL: 'https://hacker-news.firebaseio.com',
    },
});

// warm the front page cache every 15 min
// make sure to do this only once across all requests
if (api.onServer) {
    warmCache();
}

function warmCache() {
    fetchItems((api.cachedIds.top || []).slice(0, 30));
    setTimeout(warmCache, 1000 * 60 * 15);
}

function fetch(child) {
    if (logRequests) logger.info(`fetching ${child}...`);
    const cache = api.cachedItems;
    if (cache && cache.has(child)) {
        if (logRequests) logger.info(`cache hit for ${child}.`);
        return Promise.resolve(cache.get(child));
    }
    return new Promise((resolve, reject) => {
        api.child(child).once(
            'value',
            snapshot => {
                const val = snapshot.val();
                // mark the timestamp when this item is cached
                if (val) val.__lastUpdated = Date.now();
                if (cache) cache.set(child, val);
                if (logRequests) logger.info(`fetched ${child}.`);
                resolve(val);
            },
            reject
        );
    });
}

export function fetchIdsByType(type) {
    return api.cachedIds && api.cachedIds[type] ? Promise.resolve(api.cachedIds[type]) : fetch(`${type}stories`);
}

export function fetchItem(id) {
    return fetch(`item/${id}`);
}

export function fetchItems(ids) {
    return Promise.all(ids.map(id => fetchItem(id)));
}

export function fetchUser(id) {
    return fetch(`user/${id}`);
}

export function watchList(type, cb) {
    let first = true;
    const ref = api.child(`${type}stories`);
    const handler = snapshot => {
        if (first) {
            first = false;
        } else {
            cb(snapshot.val());
        }
    };
    ref.on('value', handler);
    return () => {
        ref.off('value', handler);
    };
}
