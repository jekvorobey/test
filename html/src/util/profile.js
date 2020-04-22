import { $http } from '@services';

export function generateReferralLink(referralCode = '') {
    return `${$http.baseURL}?ref=${referralCode}`;
}

export function generateReferralPromopageLink(referralCode = '') {
    return `${$http.baseURL}/referrer/${referralCode}`;
}
