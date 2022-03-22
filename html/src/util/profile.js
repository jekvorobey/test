import { $http, $store } from '@services';
import { HAS_SESSION, NAME as AUTH_MODULE } from '@store/modules/Auth';
import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';
import { authMode, modalName } from '@enums';

export function generateReferralLink(referralCode = '') {
    return `${$http.baseURL}?ref=${referralCode}`;
}

export function generateReferralPromopageLink(referralCode = '') {
    return `${$http.baseURL}/referrer/${referralCode}`;
}

export function generateYandexCardAuthBackUrl() {
    return `${$http.baseURL}/profile/account-card`;
}

export function generateYandexCardAuthUrl(url_error, url_success, identify = true) {
    return `https://yoomoney.ru/cardauth/payout?url_error=${url_error}&url_success=${url_success}&identify=${identify}`;
}

export const checkSession = () => {
    const hasSession = $store.state[AUTH_MODULE][HAS_SESSION];

    if (!hasSession) {
        $store.dispatch(`${MODAL_MODULE}/${CHANGE_MODAL_STATE}`, {
            name: modalName.general.AUTH,
            open: true,
            state: {
                activeTab: authMode.LOGIN,
            },
        });

        return false;
    }

    return true;
};
