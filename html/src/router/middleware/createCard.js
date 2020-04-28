import { httpCodes, injectionType, interval, cookieNames } from '@enums';
import { breakMiddleware } from '@util/router';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as BILLING_MODULE } from '@store/modules/Profile/modules/Billing';
import { CREATE_CARD } from '@store/modules/Profile/modules/Billing/actions';

const BILLING_MODULE_PATH = `${PROFILE_MODULE}/${BILLING_MODULE}`;

export default async function createCard({ to, next, container, nextMiddleware }) {
    const appContext = container.get(injectionType.APPLICATION_CONTEXT);
    const store = container.get(injectionType.STORE);

    try {
        const {
            query: {
                skr_destinationCardPanmask: cardPanmask,
                skr_destinationCardSynonim: cardSynonim,
                skr_destinationCardCountryCode: cardCountryCode,
                skr_destinationCardType: cardType,
                accountNumber,
                identificationStatus,
            },
        } = to;

        if (!appContext.isServer) {
            await store.dispatch(`${BILLING_MODULE_PATH}/${CREATE_CARD}`, {
                identificationStatus,
                cardPanmask,
                cardSynonim,
                cardCountryCode,
                cardType,
                accountNumber,
            });
        }
        next({ name: 'Account' });
    } catch (error) {
        if (error.status === httpCodes.FORBIDDEN) breakMiddleware(appContext, next, null, httpCodes.FORBIDDEN);
        else next({ name: 'Account' });
    }
}
