export const SET_LOAD = 'SET_LOAD';
export const SET_CHATS = 'SET_CHATS';
export const SET_CHAT_MESSAGES = 'SET_CHAT_MESSAGES ';
export const PUSH_NEW_MESSAGE = 'PUSH_NEW_MESSAGE';
export const SET_THEMES = 'SET_THEMES';

export default {
    [SET_LOAD](state, payload = false) {
        state.load = payload;
    },

    [SET_CHATS](state, payload = []) {
        state.items = payload;
    },

    [SET_CHAT_MESSAGES](state, payload = {}) {
        const { chatId = null, title = '', messages = [] } = payload;
        const { items = [] } = state;
        const chat = items.find((c) => c.id === chatId);
        if (chat) chat.isRead = true;

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
