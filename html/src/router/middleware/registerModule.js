import { httpCodes, injectionType } from '@enums';
import { breakMiddleware } from '@util/router';
import { registerModuleIfNotExists } from '@util/store';
import { $logger } from '@services';

export default function registerModule(asyncModule) {
    return async ({ to, next, container, nextMiddleware }) => {
        const appContext = container.get(injectionType.APPLICATION_CONTEXT);
        const store = container.get(injectionType.STORE);

        try {
            const module = await asyncModule();
            registerModuleIfNotExists(store, module.NAME, module.default);
            nextMiddleware();
        } catch (error) {
            $logger.error(error);
            breakMiddleware(appContext, next, null, httpCodes.INTERNAL_SERVER_ERROR);
        }
    };
}
