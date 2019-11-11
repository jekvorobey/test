export function generatePictureSourcePath(x = '', y = '', id, ext) {
    return `${x ? `/${x}` : ''}${y ? `/${y}` : ''}/${id}.${ext}`;
}

export default { generatePictureSourcePath };
