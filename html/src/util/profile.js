import { $http } from '@services';

export function generateReferralLink(referralCode = '') {
    return `${$http.baseURL}?ref=${referralCode}`;
}
