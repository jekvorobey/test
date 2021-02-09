<template>
    <section class="section messages-view">
        <div class="messages-view__header">
            <h2 class="messages-view__hl">
                {{ pageTitle }}
            </h2>
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
                @click.prevent="onOpenMessage(chat)"
            />
        </ul>
        <empty-placeholder-panel
            class="messages-view__attention"
            v-else
            :show-btn="!isTablet"
            @btn-click="onCreateMessage"
        >
            У Вас пока нет ни одного сообщения.
            <template v-slot:btn>Написать сообщение</template>
        </empty-placeholder-panel>

        <transition name="fade">
            <message-modal v-if="$isServer || isMessageOpen" />
        </transition>
    </section>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';

import EmptyPlaceholderPanel from '@components/EmptyPlaceholderPanel/EmptyPlaceholderPanel.vue';

import MessageCard from '@components/MessageCard/MessageCard.vue';
import MessageModal from '@components/profile/MessageModal/MessageModal.vue';

import { mapState, mapActions } from 'vuex';
import { LOCALE } from '@store';
import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as MESSAGES_MODULE, ITEMS } from '@store/modules/Profile/modules/Messages';
import { FETCH_CHATS, SET_LOAD } from '@store/modules/Profile/modules/Messages/actions';

import { NAME as AUTH_MODULE } from '@store/modules/Auth';
import { FETCH_UNREAD_MESSAGES } from '@store/modules/Auth/actions';

import { $store, $progress, $context } from '@services';
import { getDate } from '@util';
import { modalName } from '@enums';
import { numericYearDateSettings } from '@settings';
import metaMixin from '@plugins/meta';
import './Messages.css';
import { NAME as LANDING_MODULE } from '@store/modules/Landing';

const MESSAGES_MODULE_PATH = `${PROFILE_MODULE}/${MESSAGES_MODULE}`;

export default {
    name: 'messages',
    mixins: [metaMixin],

    components: {
        VButton,

        MessageCard,
        MessageModal,

        EmptyPlaceholderPanel,
    },

    metaInfo() {
        const { pageTitle } = this;
        return {
            title: pageTitle,
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapState(MESSAGES_MODULE_PATH, [ITEMS]),

        ...mapState(MODAL_MODULE, {
            isMessageOpen: (state) =>
                state[MODALS][modalName.profile.MESSAGE] && state[MODALS][modalName.profile.MESSAGE].open,
        }),

        chats() {
            const chats = this[ITEMS] || [];
            return chats.map((c) => ({
                ...c,
                date: this.formatDate(c.date),
            }));
        },

        pageTitle() {
            return this.$t(`profile.routes.${this.$route.name}`);
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(AUTH_MODULE, [FETCH_UNREAD_MESSAGES]),

        formatDate(date) {
            return date && getDate(date).toLocaleDateString(this[LOCALE], numericYearDateSettings);
        },

        onCreateMessage() {
            this[CHANGE_MODAL_STATE]({ name: modalName.profile.MESSAGE, open: true });
        },

        onOpenMessage({ id, isRead }) {
            if (!isRead) this[FETCH_UNREAD_MESSAGES]();
            this.$router.push({ name: 'MessageDetails', params: { chatId: id } });
        },
    },

    beforeRouteEnter(to, from, next) {
        function proceed() {
            if ($store.state[PROFILE_MODULE][MESSAGES_MODULE]) {
                const { load } = $store.state[PROFILE_MODULE][MESSAGES_MODULE];

                if (load) {
                    $store.dispatch(`${MESSAGES_MODULE_PATH}/${SET_LOAD}`, false);
                    return next();
                }

                $progress.start();
                $store
                    .dispatch(`${MESSAGES_MODULE_PATH}/${FETCH_CHATS}`)
                    .then(() => {
                        $store.dispatch(`${MESSAGES_MODULE_PATH}/${SET_LOAD}`, $context.isServer);
                        next(() => $progress.finish());
                    })
                    .catch(() => next(() => $progress.fail()));
            }
        }

        if ($store.state[PROFILE_MODULE][MESSAGES_MODULE]) proceed();
        else {
            $store.watch(
                (state) => state[PROFILE_MODULE][MESSAGES_MODULE],
                (value) => {
                    if (value) proceed();
                }
            );
        }
    },
};
</script>
