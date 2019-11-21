export function generatePictureSourcePath(x = '', y = '', id, ext) {
    return `https://master-front.ibt-mas.greensight.ru/content/${id}${x ? `/${x}` : ''}${y ? `/${y}` : ''}/${ext}`;
}

export default { generatePictureSourcePath };
