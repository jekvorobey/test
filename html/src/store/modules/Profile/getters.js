const CABINET_DATA = 'cabinetData';
const MESSAGES_DATA = 'messagesData';

export const PORTFOLIOS = 'portfolios';
export const PROFILES = 'profiles';
export const REQUISITES = 'requisites';

export const AVAILABLE_PROFILES = 'availableProfiles';
export const PROFILES_STRING = 'profilesString';
export const FULL_NAME = 'fullName';

export const MESSAGES = 'messages';
export const MESSAGE_DETAILS = 'messageDetails';

export default {
    [PORTFOLIOS]: state => (state[CABINET_DATA] && state[CABINET_DATA][PORTFOLIOS]) || [],

    [PROFILES]: state => (state[CABINET_DATA] && state[CABINET_DATA][PROFILES]) || [],

    [REQUISITES]: state => (state[CABINET_DATA] && state[CABINET_DATA][REQUISITES]) || {},

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

    [MESSAGES]: state => (state[MESSAGES_DATA] && state[MESSAGES_DATA][MESSAGES]) || [],

    [MESSAGE_DETAILS]: state => state[MESSAGES_DATA] && state[MESSAGES_DATA][MESSAGE_DETAILS],
};
