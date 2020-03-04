import { httpCodes } from '../../assets/scripts/enums/general';

export default function notFound({ next, store: { state }, appContext }) {
    if (appContext.isServer) appContext.statusCode = httpCodes.NOT_FOUND;
    return next();
}
