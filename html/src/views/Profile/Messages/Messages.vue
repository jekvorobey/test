<template>
    <section class="section messages-view">
        <div class="messages-view__header">
            <h2 class="messages-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
            <v-button class="messages-view__btn" @click="onCreateMessage">Новое сообщение</v-button>
        </div>

        <ul class="messages-view__list" v-if="chats && chats.length > 0">
            <message-card
                tabindex="0"
                class="messages-view__list-item"
                v-for="chat in chats"
                :key="chat.id"
                :message-id="chat.id"
                :message="chat.message"
                :name="chat.name"
                :last-name="chat.lastName"
                :title="chat.title"
                :date="chat.date"
                :is-system="chat.isSystem"
                :is-read="chat.isRead"
                :use-header-clamp="!isTablet"
                use-clamp
                @click.prevent="onOpenMessage(chat.id)"
            />
        </ul>
        <empty-placeholder-panel
            class="messages-view__attention"
            v-else
            :show-btn="!isTablet"
            @btn-click="onCreateMessage"
        >
            У Вас пока нет ни одного сообщения.
            <template v-slot:btn>
                Написать сообщение
            </template>
        </empty-placeholder-panel>

        <transition name="fade">
            <message-modal v-if="$isServer || isMessageOpen" />
        </transition>
    </section>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import VPagination from '@controls/VPagination/VPagination.vue';

import EmptyPlaceholderPanel from '@components/EmptyPlaceholderPanel/EmptyPlaceholderPanel.vue';

import MessageCard from '@components/MessageCard/MessageCard.vue';
import MessageModal from '@components/profile/MessageModal/MessageModal.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { LOCALE } from '@store';
import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as MESSAGES_MODULE, ITEMS } from '@store/modules/Profile/modules/Messages';
import { FETCH_CHATS } from '@store/modules/Profile/modules/Messages/actions';

import { $store, $progress } from '@services';
import { modalName } from '@enums';
import { numericYearDateSettings } from '@settings';
import './Messages.css';

const MESSAGES_MODULE_PATH = `${PROFILE_MODULE}/${MESSAGES_MODULE}`;

export default {
    name: 'messages',

    components: {
        VButton,
        VInput,

        MessageCard,
        MessageModal,

        EmptyPlaceholderPanel,
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapState(MESSAGES_MODULE_PATH, [ITEMS]),

        ...mapState(MODAL_MODULE, {
            isMessageOpen: state =>
                state[MODALS][modalName.profile.MESSAGE] && state[MODALS][modalName.profile.MESSAGE].open,
        }),

        chats() {
            const chats = this[ITEMS] || [];
            return chats.map(c => ({
                ...c,
                date: this.formatDate(c.date),
            }));
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        formatDate(date) {
            const dateObj = new Date(date);
            return dateObj.toLocaleDateString(this[LOCALE], numericYearDateSettings);
        },

        onCreateMessage() {
            this[CHANGE_MODAL_STATE]({ name: modalName.profile.MESSAGE, open: true });
        },

        onOpenMessage(id) {
            this.$router.push({ name: 'MessageDetails', params: { chatId: id } });
        },
    },

    beforeRouteEnter(to, from, next) {
        $progress.start();
        $store
            .dispatch(`${MESSAGES_MODULE_PATH}/${FETCH_CHATS}`)
            .then(() => next(vm => $progress.finish()))
            .catch(error => next(vm => $progress.fail()));
    },
};
</script>
