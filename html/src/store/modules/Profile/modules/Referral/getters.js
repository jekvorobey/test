import { REFERRAL_ORDERS_PAGE_SIZE } from '@constants/profile';

const CHART_DATA = 'chartData';
const REFERRAL_DATA = 'referralData';

export const REFERRAL_ARC_DATA = 'referralArcData';
export const SUM_ARC_DATA = 'sumArcData';
export const LEVEL_DATA = 'levelData';
export const PAGES_COUNT = 'pagesCount';
export const REFERRALS = 'referrals';
export const LEVEL = 'level';

export default {
    [PAGES_COUNT]({ range }) {
        return Math.ceil(range / REFERRAL_ORDERS_PAGE_SIZE);
    },

    [REFERRALS](state) {
        return (state[REFERRAL_DATA] && state[REFERRAL_DATA][REFERRALS]) || [];
    },

    [LEVEL](state) {
        return (state[REFERRAL_DATA] && state[REFERRAL_DATA][LEVEL]) || null;
    },

    [LEVEL_DATA](state, getters) {
        const { current_level, next_level } = getters[LEVEL] || {
            current_level: {},
            next_level: {},
        };

        return {
            currentLevelName: current_level && current_level.name,
            nextLevelName: next_level && next_level.name,
        };
    },

    [REFERRAL_ARC_DATA](state, getters) {
        const { current_level, next_level, referral_count = 0 } = getters[LEVEL] || {
            current_level: {},
            next_level: {},
        };

        const percent = current_level && next_level && Math.round((referral_count * 100) / next_level.referral_count);

        return {
            current: current_level && current_level.referral_count,
            next: next_level && next_level.referral_count,
            value: referral_count,
            currentPercent: percent && percent > 100 ? 100 : percent,
        };
    },

    [SUM_ARC_DATA](state, getters) {
        const { current_level, next_level, order_sum = 0 } = getters[LEVEL] || {
            current_level: {},
            next_level: {},
        };

        const percent = current_level && next_level && Math.round((order_sum * 100) / next_level.order_referral_sum);

        return {
            current: current_level && current_level.order_referral_sum,
            next: next_level && next_level.order_referral_sum,
            value: order_sum,
            currentPercent: percent && percent > 100 ? 100 : percent,
        };
    },
};
