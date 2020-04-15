<template>
    <section class="section messages-view">
        <div class="messages-view__header">
            <h2 class="messages-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
            <v-button class="messages-view__btn" @click="onCreateMessage">Новое сообщение</v-button>
        </div>

        <ul class="messages-view__list">
            <message-card
                tabindex="0"
                class="messages-view__list-item"
                v-for="message in messages"
                :key="message.id"
                :message-id="message.id"
                :message="message.message"
                :name="message.name"
                :last-name="message.lastName"
                :title="message.title"
                :date="formatDate(message.date)"
                :is-system="message.isSystem"
                :is-read="message.isRead"
                :use-header-clamp="!isTablet"
                use-clamp
                @click.prevent="onOpenMessage(message.id)"
            />
        </ul>

        <transition name="fade">
            <message-modal v-show="isMessageOpen" v-if="$isServer || isMessageOpen" />
        </transition>
    </section>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import VPagination from '@controls/VPagination/VPagination.vue';

import MessageCard from '@components/MessageCard/MessageCard.vue';
import MessageModal from '@components/profile/MessageModal/MessageModal.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';
import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { MESSAGES } from '@store/modules/Profile/getters';

import { modalName } from '@enums';
import './Messages.css';

export default {
    name: 'messages',

    components: {
        VButton,
        VInput,

        MessageCard,
        MessageModal,
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isMessageOpen: (state) =>
                state[MODALS][modalName.profile.MESSAGE] && state[MODALS][modalName.profile.MESSAGE].open,
        }),
        ...mapGetters(PROFILE_MODULE, [MESSAGES]),

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        formatDate(date) {
            const dateObj = new Date(date);
            const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
            return dateObj.toLocaleDateString(options);
        },

        onCreateMessage() {
            this[CHANGE_MODAL_STATE]({ name: modalName.profile.MESSAGE, open: true });
        },

        onOpenMessage(id) {
            this.$router.push({ name: 'MessageDetails', params: { messageId: id } });
        },
    },
};
</script>
