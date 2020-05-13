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
                :title="`${message.name || ''} ${message.lastName || ''}`"
                :date="message.date"
                :is-system="message.isSystem"
            />
        </ul>

        <!-- <div class="message-details-view__controls">
            <v-input tag="textarea"></v-input>
            <v-button>Отправить</v-button>
        </div> -->
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

import { NAME as PROFILE_MODULE, BREADCRUMBS } from '@store/modules/Profile';
import { UPDATE_BREADCRUMB } from '@store/modules/Profile/actions';

import { NAME as MESSAGES_MODULE, MESSAGES } from '@store/modules/Profile/modules/Messages';
import { FETCH_CHAT_MESSAGES } from '@store/modules/Profile/modules/Messages/actions';

import { $store, $progress } from '@services';

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
        return {};
    },

    computed: {
        ...mapState([LOCALE]),
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

        formatDate(date) {
            const dateObj = new Date(date);
            return dateObj.toLocaleDateString(this[LOCALE]);
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
