<template>
    <section class="section message-details-view">
        <div class="container container--tablet-lg">
            <v-link class="message-details-view__back-link" :to="backUrl">
                <v-svg modifier="icon--rotate-deg90" name="arrow-small" width="24" height="24" />&nbsp;Назад ко всем
                сообщениям
            </v-link>
            <h2 class="message-details-view__hl">{{ chatId }} Доставка в Зеленоград</h2>
        </div>

        <ul class="message-details-view__list">
            <message-card
                tabindex="0"
                class="message-details-view__list-item"
                v-for="message in items"
                :key="message.id"
                :message="message.message"
                :name="message.name"
                :last-name="message.lastName"
                :title="getTitle(message)"
                :date="message.date"
                :is-system="message.isSystem"
            />
        </ul>

        <div class="message-details-view__controls">
            <v-input
                class="message-details-view__controls-input"
                v-model="message"
                tag="textarea"
                placeholder="Написать ответ"
            />
            <v-button
                class="message-details-view__controls-btn"
                :disabled="isBtnDisabled && !message.length"
                @click="onSendMessage"
            >
                Отправить
            </v-button>
        </div>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';

import MessageCard from '@components/MessageCard/MessageCard.vue';

import { mapState, mapActions } from 'vuex';
import { LOCALE } from '@store';

import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE, BREADCRUMBS } from '@store/modules/Profile';
import { UPDATE_BREADCRUMB } from '@store/modules/Profile/actions';

import { NAME as MESSAGES_MODULE, MESSAGES } from '@store/modules/Profile/modules/Messages';
import { FETCH_CHAT_MESSAGES, CREATE_CHAT_MESSAGE } from '@store/modules/Profile/modules/Messages/actions';

import { NAME as AUTH_MODULE, USER } from '@store/modules/Auth';

import { $store, $progress } from '@services';
import { modalName } from '@enums';
import '@images/sprites/arrow-small.svg';
import './MessageDetails.css';

const MESSAGES_MODULE_PATH = `${PROFILE_MODULE}/${MESSAGES_MODULE}`;

export default {
    name: 'message-details',

    components: {
        VSvg,
        VLink,
        VButton,
        VInput,

        MessageCard,
    },

    data() {
        return {
            message: '',
            isBtnDisabled: false,
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapState(AUTH_MODULE, [USER]),
        ...mapState(MESSAGES_MODULE_PATH, [MESSAGES]),
        ...mapState('route', {
            chatId: state => state.params && state.params.chatId,
        }),

        items() {
            const messages = this[MESSAGES] || [];
            return messages.map(m => ({ ...m, date: this.formatDate(m.date) }));
        },

        backUrl() {
            return { name: 'Messages' };
        },
    },

    methods: {
        ...mapActions(PROFILE_MODULE, [UPDATE_BREADCRUMB]),
        ...mapActions(MESSAGES_MODULE_PATH, [CREATE_CHAT_MESSAGE]),

        formatDate(date) {
            const dateObj = new Date(date);
            return dateObj.toLocaleDateString(this[LOCALE]);
        },

        getTitle(message) {
            if (message.isSystem) return 'Команда Бессовестно Талантливый';
            const { firstName, lastName } = this[USER] || {};
            return `${firstName} ${lastName}`;
        },

        async onSendMessage() {
            try {
                this.isBtnDisabled = true;
                await this[CREATE_CHAT_MESSAGE]({
                    chatId: this.chatId,
                    message: this.message,
                });
                this.message = '';
            } catch (error) {
                this[CHANGE_MODAL_STATE]({
                    name: modalName.general.NOTIFICATION,
                    open: true,
                    state: {
                        title: 'Ошибка',
                        message: 'Не удалось отправить сообщение. Попробуйте ещё раз.',
                    },
                });
            }

            this.isBtnDisabled = false;
        },
    },

    beforeRouteEnter(to, from, next) {
        const { name, params } = to;

        $progress.start();
        $store
            .dispatch(`${MESSAGES_MODULE_PATH}/${FETCH_CHAT_MESSAGES}`, params.chatId)
            .then(() =>
                next(vm => {
                    $progress.finish();
                    vm[UPDATE_BREADCRUMB]([
                        { name: vm.$t('profile.routes.Messages'), to: { name: 'Messages' } },
                        { name: params.chatId, to: { name, params } },
                    ]);
                })
            )
            .catch(error => next(vm => $progress.fail()));
    },

    beforeRouteLeave(to, from, next) {
        this[UPDATE_BREADCRUMB]([]);
        next();
    },
};
</script>
