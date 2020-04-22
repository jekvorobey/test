import { httpCodes, injectionType } from '@enums';
import { breakMiddleware } from '@util/router';

import { NAME as GEO_MODULE, SELECTED_CITY } from '@store/modules/Geolocation';
import { SET_SELECTED_CITY_BY_IP } from '@store/modules/Geolocation/actions';

export default async function setGeolocation({ next, container, nextMiddleware }) {
    const { state, dispatch } = container.get(injectionType.STORE);
    const appContext = container.get(injectionType.APPLICATION_CONTEXT);

    try {
        const selectedCity = state[GEO_MODULE][SELECTED_CITY];
        if (!selectedCity) await dispatch(`${GEO_MODULE}/${SET_SELECTED_CITY_BY_IP}`);
        return nextMiddleware();
    } catch (error) {
        breakMiddleware(appContext, next, null, httpCodes.FORBIDDEN);
    }
}
