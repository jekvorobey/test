import { breakMiddleware } from '@util/router';

import { NAME as AUTH_MODULE, USER, CAN_BUY } from '@store/modules/Auth';
import { FETCH_USER } from '@store/modules/Auth/actions';
import { httpCodes } from '@enums';

export default async function canUserBuy({ next, store: { state, dispatch }, appContext, nextMiddleware }) {
    try {
        let user = state[AUTH_MODULE][USER];
        if (!user) user = await dispatch(`${AUTH_MODULE}/${FETCH_USER}`);
        if (!user[CAN_BUY]) breakMiddleware(appContext, next, null, httpCodes.FORBIDDEN);
        else nextMiddleware();
    } catch (error) {
        breakMiddleware(appContext, next, null, httpCodes.FORBIDDEN);
    }
}
