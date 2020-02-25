const MESSAGES_DATA = 'messagesData';

export const AVAILABLE_PROFILES = 'availableProfiles';

export const MESSAGES = 'messages';
export const MESSAGE_DETAILS = 'messageDetails';

export default {
    [MESSAGES]: state => (state[MESSAGES_DATA] && state[MESSAGES_DATA][MESSAGES]) || [],

    [MESSAGE_DETAILS]: state => state[MESSAGES_DATA] && state[MESSAGES_DATA][MESSAGE_DETAILS],
};
