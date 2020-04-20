const CHART_DATA = 'chartData';
const REFERRAL_DATA = 'referralData';

export const REFERRAL_ARC_DATA = 'referralArcData';
export const SUM_ARC_DATA = 'sumArcData';
export const LEVEL_DATA = 'levelData';

export default {
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
            current: current_level.referral_count,
            next: next_level.referral_count,
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
            current: current_level.referral_count,
            next: next_level.referral_count,
        };
    },
};
