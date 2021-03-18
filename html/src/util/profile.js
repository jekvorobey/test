import { $http } from '@services';

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
