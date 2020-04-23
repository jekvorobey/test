import { httpCodes, injectionType } from '@enums';

export default function notFound({ next, container }) {
    const appContext = container.get(injectionType.APPLICATION_CONTEXT);
    if (appContext.isServer) appContext.statusCode = httpCodes.NOT_FOUND;
    return next();
}
