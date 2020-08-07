import { $http } from '@services';

export function generateFileOriginalPath(id) {
    return `${$http.baseURL}/files/original/${id}`;
}

export function generatePictureSourcePath(x = '', y = '', id, ext) {
    return `${$http.baseURL}/files/compressed/${id}${x ? `/${x}` : ''}${y ? `/${y}` : ''}/${ext || 'orig'}`;
}

export function generateYoutubeVideoSourcePath(videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`;
}

export function generateYoutubeImagePlaceholderPath(videoId) {
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
}

export function formatFileSize(size, si = true) {
    const thresh = si ? 1000 : 1024;
    if (Math.abs(size) < thresh) {
        return `${size} B`;
    }
    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    do {
        size /= thresh;
        u += 1;
    } while (Math.abs(size) >= thresh && u < units.length - 1);
    return `${size.toFixed(1)} ${units[u]}`;
}

export default {
    generatePictureSourcePath,
    generateYoutubeImagePlaceholderPath,
    generateYoutubeVideoSourcePath,
    generateFileOriginalPath,
    formatFileSize,
};
