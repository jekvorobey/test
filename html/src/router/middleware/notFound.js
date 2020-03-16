import { httpCodes } from '@enums';

export default function notFound({ next, store: { state }, appContext }) {
    if (appContext.isServer) appContext.statusCode = httpCodes.NOT_FOUND;
    return next();
}
