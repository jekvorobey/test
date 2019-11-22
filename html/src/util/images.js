import { $http } from '../services/ServiceLocator';

export function generatePictureSourcePath(x = '', y = '', id, ext) {
    return `${$http.baseURL}/content/${id}${x ? `/${x}` : ''}${y ? `/${y}` : ''}/${ext}`;
}

export default { generatePictureSourcePath };
