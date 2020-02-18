export default function notFound({ next, store: { state }, appContext }) {
    if (appContext.isServer) appContext.statusCode = 404;
    return next();
}
