import { breakMiddleware } from '@util/router';
import { httpCodes } from '@enums';

import { NAME as GEO_MODULE, SELECTED_CITY } from '@store/modules/Geolocation';
import { SET_SELECTED_CITY_BY_IP } from '@store/modules/Geolocation/actions';

export default async function setGeolocation({ next, store: { state, dispatch }, appContext, nextMiddleware }) {
    try {
        const selectedCity = state[GEO_MODULE][SELECTED_CITY];
        if (!selectedCity) await dispatch(`${GEO_MODULE}/${SET_SELECTED_CITY_BY_IP}`);
        return nextMiddleware();
    } catch (error) {
        breakMiddleware(appContext, next, null, httpCodes.FORBIDDEN);
    }
}
