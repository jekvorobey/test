export const SET_LOAD_PATH = 'SET_LOAD_PATH';
export const SET_CHATS = 'SET_CHATS';
export const SET_CHAT_MESSAGES = 'SET_CHAT_MESSAGES ';
export const PUSH_NEW_MESSAGE = 'PUSH_NEW_MESSAGE';
export const SET_THEMES = 'SET_THEMES';

export default {
    [SET_LOAD_PATH](state, payload = '') {
        state.loadPath = payload;
    },

    [SET_CHATS](state, payload = []) {
        state.items = payload;
    },

    [SET_CHAT_MESSAGES](state, payload = {}) {
        const { chatId = null, title = '', messages = [] } = payload;
        state.items.find((chat) => chat.id === chatId).isRead = true;
        state.chatId = chatId;
        state.title = title;
        state.messages = messages;
    },

    [PUSH_NEW_MESSAGE](state, payload) {
        state.messages.push(payload);
    },

    [SET_THEMES](state, payload) {
        state.themes = payload;
    },
};
