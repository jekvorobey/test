export const PROFILES_STRING = 'profilesString';
export const FULL_NAME = 'fullName';

export default {
    [PROFILES_STRING]: (state) => {
        const profiles = state.activities;
        return profiles ? profiles.map((p) => p.name).join(', ') : '';
    },

    [FULL_NAME]({ firstName, lastName, middleName }) {
        let fullName = '';
        if (lastName) fullName += `${lastName} `;
        if (firstName) fullName += `${firstName} `;
        if (middleName) fullName += middleName;
        return fullName;
    },
};
