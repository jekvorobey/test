import { httpCodes } from '@enums';

export default function notFound({ next, appContext }) {
    if (appContext.isServer) appContext.statusCode = httpCodes.NOT_FOUND;
    return next();
}
