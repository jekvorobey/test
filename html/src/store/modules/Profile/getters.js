const CABINET_DATA = 'cabinetData';

export const PORTFOLIOS = 'portfolios';
export const PROFILES = 'profiles';
export const AVAILABLE_PROFILES = 'availableProfiles';
export const PROFILES_STRING = 'profilesString';
export const FULL_NAME = 'fullName';

export default {
    [PORTFOLIOS]: state => (state[CABINET_DATA] && state[CABINET_DATA][PORTFOLIOS]) || [],

    [AVAILABLE_PROFILES]: state => (state[CABINET_DATA] && state[CABINET_DATA][AVAILABLE_PROFILES]) || [],

    [PROFILES]: state => (state[CABINET_DATA] && state[CABINET_DATA][PROFILES]) || [],

    [PROFILES_STRING]: (state, getters) => {
        const profiles = getters[PROFILES];
        return profiles ? profiles.map(p => p.name).join(', ') : '';
    },

    [FULL_NAME]: state => {
        let fullName = '';
        const cabinetData = state[CABINET_DATA];
        if (cabinetData)
            fullName = `${cabinetData.name || ''} ${cabinetData.lastName || ''} ${cabinetData.middleName || ''}`;
        return fullName;
    },
};
