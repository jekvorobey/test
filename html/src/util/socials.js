export function getInstagramUserNameFromUrl(url = '') {
    return url.replace('@', '');
}

export default {
    getInstagramUserNameFromUrl,
};
