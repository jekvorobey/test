import { storeErrorHandler } from '@util/store';
import { getProfileChats, getProfileChatMessages, createProfileChat, createProfileChatMessage } from '@api';

import { SET_CHATS, SET_CHAT_MESSAGES, PUSH_NEW_MESSAGE } from './mutations';

export const FETCH_CHATS = 'FETCH_CHATS';
export const FETCH_CHAT_MESSAGES = 'FETCH_CHAT_MESSAGES';

export const CREATE_CHAT = 'CREATE_CHAT';
export const CREATE_CHAT_MESSAGE = 'CREATE_CHAT_MESSAGE';
export const SET_LOAD_PATH = 'SET_LOAD_PATH';

export default {
    [SET_LOAD_PATH]({ commit }, payload) {
        commit(SET_LOAD_PATH, payload);
    },

    async [FETCH_CHATS]({ state, commit }) {
        try {
            const { chats } = await getProfileChats();
            commit(SET_CHATS, chats);
        } catch (error) {
            storeErrorHandler(FETCH_CHATS, true)(error);
        }
    },

    async [FETCH_CHAT_MESSAGES]({ state, commit }, chatId) {
        try {
            const { messages } = await getProfileChatMessages(chatId);
            commit(SET_CHAT_MESSAGES, { chatId, messages });
        } catch (error) {
            storeErrorHandler(FETCH_CHAT_MESSAGES, true)(error);
        }
    },

    async [CREATE_CHAT]({ state, commit, dispatch }, formData = {}) {
        try {
            const { chat } = await createProfileChat(formData);
            dispatch(FETCH_CHATS);
            //commit(SET_CHAT, data);
        } catch (error) {
            storeErrorHandler(CREATE_CHAT, true)(error);
        }
    },

    async [CREATE_CHAT_MESSAGE]({ state, commit }, { chatId, message, files }) {
        try {
            const data = await createProfileChatMessage(chatId, message, files);
            commit(PUSH_NEW_MESSAGE, data.message);
            //commit(SET_CHAT_MESSAGE, data);
        } catch (error) {
            storeErrorHandler(CREATE_CHAT_MESSAGE, true)(error);
        }
    },
};
