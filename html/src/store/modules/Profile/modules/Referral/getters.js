import { REFERRAL_ORDERS_PAGE_SIZE } from '@constants/profile';

const CHART_DATA = 'chartData';
const REFERRAL_DATA = 'referralData';

export const REFERRAL_ARC_DATA = 'referralArcData';
export const SUM_ARC_DATA = 'sumArcData';
export const LEVEL_DATA = 'levelData';
export const PAGES_COUNT = 'pagesCount';
export const REFERRALS = 'referrals';

export default {
    [PAGES_COUNT]({ range }) {
        return Math.ceil(range / REFERRAL_ORDERS_PAGE_SIZE);
    },

    [REFERRALS](state) {
        return (state[REFERRAL_DATA] && state[REFERRAL_DATA][REFERRALS]) || [];
    },

    [LEVEL_DATA](state) {
        const {
            level: { current_level, next_level } = {
                current_level: {},
                next_level: {},
            },
        } = state[REFERRAL_DATA] || {};

        return {
            currentLevelName: current_level.name,
            nextLevelName: next_level.name,
        };
    },

    [REFERRAL_ARC_DATA](state) {
        const {
            level: { current_level, next_level } = {
                current_level: {},
                next_level: {},
            },
        } = state[REFERRAL_DATA] || {};

        return {
            current: current_level.referral_count,
            next: next_level.referral_count,
            currentPercent: Math.round((current_level.referral_count * 100) / next_level.referral_count),
        };
    },

    [SUM_ARC_DATA](state) {
        const {
            level: { current_level, next_level } = {
                current_level: {},
                next_level: {},
            },
        } = state[REFERRAL_DATA] || {};

        return {
            current: current_level.order_referral_sum,
            next: next_level.order_referral_sum,
            currentPercent: Math.round((current_level.order_referral_sum * 100) / next_level.order_referral_sum),
        };
    },
};
