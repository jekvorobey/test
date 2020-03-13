import { $http } from '../services/ServiceLocator';

export function generatePictureSourcePath(x = '', y = '', id, ext) {
    return `${$http.baseURL}/files/compressed/${id}${x ? `/${x}` : ''}${y ? `/${y}` : ''}/${ext}`;
}

export function generateYoutubeVideoSourcePath(videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`;
}

export function generateYoutubeImagePlaceholderPath(videoId) {
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
}

export default { generatePictureSourcePath, generateYoutubeImagePlaceholderPath, generateYoutubeVideoSourcePath };
