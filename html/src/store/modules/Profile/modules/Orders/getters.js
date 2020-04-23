import { REFERRAL_ORDERS_PAGE_SIZE } from '@constants/profile';

const REFERRAL_DATA = 'referralData';

export const REFERRAL_ARC_DATA = 'referralArcData';
export const SUM_ARC_DATA = 'sumArcData';
export const LEVEL_DATA = 'levelData';
export const PAGES_COUNT = 'pagesCount';

export default {
    [PAGES_COUNT](state) {
        return Math.ceil(state.range / REFERRAL_ORDERS_PAGE_SIZE);
    },

    [LEVEL_DATA](state) {
        const {
            level: { current_level, next_level } = {
                current_level: {},
                next_level: {},
            },
        } = state[REFERRAL_DATA];

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
        } = state[REFERRAL_DATA];

        return {
            current: current_level.order_personal_count,
            next: next_level.order_personal_count,
        };
    },

    [SUM_ARC_DATA](state) {
        const {
            level: { current_level, next_level } = {
                current_level: {},
                next_level: {},
            },
        } = state[REFERRAL_DATA];

        return {
            current: current_level.order_personal_sum,
            next: next_level.order_personal_sum,
        };
    },
};
