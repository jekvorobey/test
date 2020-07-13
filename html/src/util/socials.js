export function getInstagramUserNameFromUrl(url = '') {
    return url.split('/').slice(-1);
}
