import { storeErrorHandler } from '@util/store';
import {
    getProfileChats,
    getProfileChatMessages,
    createProfileChat,
    createProfileChatMessage,
    getMessageThemes,
} from '@api';

import { SET_CHATS, SET_CHAT_MESSAGES, PUSH_NEW_MESSAGE, SET_THEMES } from './mutations';

export const FETCH_CHATS = 'FETCH_CHATS';
export const FETCH_CHAT_MESSAGES = 'FETCH_CHAT_MESSAGES';
export const FETCH_THEMES = 'FETCH_THEMES';

export const CREATE_CHAT = 'CREATE_CHAT';
export const CREATE_CHAT_MESSAGE = 'CREATE_CHAT_MESSAGE';
export const SET_LOAD = 'SET_LOAD';

export default {
    [SET_LOAD]({ commit }, payload) {
        commit(SET_LOAD, payload);
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
            const { title, messages } = await getProfileChatMessages(chatId);
            commit(SET_CHAT_MESSAGES, { chatId, title, messages });
        } catch (error) {
            storeErrorHandler(FETCH_CHAT_MESSAGES, true)(error);
        }
    },

    async [CREATE_CHAT]({ state, commit, dispatch }, formData = {}) {
        try {
            const { chat } = await createProfileChat(formData);
            dispatch(FETCH_CHATS);
            // commit(SET_CHAT, data);
        } catch (error) {
            storeErrorHandler(CREATE_CHAT, true)(error);
        }
    },

    async [CREATE_CHAT_MESSAGE]({ state, commit }, { chatId, message, files }) {
        try {
            const data = await createProfileChatMessage(chatId, message, files);
            commit(PUSH_NEW_MESSAGE, data.message);
            // commit(SET_CHAT_MESSAGE, data);
        } catch (error) {
            storeErrorHandler(CREATE_CHAT_MESSAGE, true)(error);
        }
    },

    async [FETCH_THEMES]({ commit }) {
        try {
            const { themes } = await getMessageThemes();
            commit(SET_THEMES, themes);
        } catch (error) {
            storeErrorHandler(FETCH_THEMES)(error);
        }
    },
};
