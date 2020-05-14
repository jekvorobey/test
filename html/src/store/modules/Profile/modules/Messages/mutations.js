export const SET_LOAD_PATH = 'SET_LOAD_PATH';
export const SET_CHATS = 'SET_CHATS';
export const SET_CHAT_MESSAGES = 'SET_CHAT_MESSAGES ';

export default {
    [SET_LOAD_PATH](state, payload = '') {
        state.loadPath = payload;
    },

    [SET_CHATS](state, payload = []) {
        state.items = payload;
    },

    [SET_CHAT_MESSAGES](state, payload = {}) {
        const { chatId = null, messages = [] } = payload;
        state.chatId = chatId;
        state.messages = messages;
    },
};
