<template>
    <v-link tag="button" v-on="handlers">
        <v-svg name="wishlist-full" width="18" height="20" v-if="isActive" />
        <v-svg name="wishlist-middle" width="18" height="20" v-else />
    </v-link>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import VSvg from '@controls/VSvg/VSvg.vue';

import { mapState, mapActions } from 'vuex';
import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';
import { NAME as AUTH_MODULE, HAS_SESSION } from '@store/modules/Auth';

import { modalName } from '@enums';
import '@images/sprites/wishlist-middle.svg';
import '@images/sprites/wishlist-full.svg';
import './FavoritesButton.css';

export default {
    name: 'favorites-button',

    components: {
        VLink,
        VSvg,
    },

    props: {
        isActive: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        ...mapState(AUTH_MODULE, [HAS_SESSION]),

        handlers() {
            const keys = Object.keys(this.$listeners);
            const handlers = {};
            keys.forEach((k) => (handlers[k] = (e) => this.$emit(k, e)));
            handlers.click = this.onBtnClick;
            return handlers;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onBtnClick(e) {
            e.stopPropagation();
            if (this.checkPermissions()) this.$emit('click', e);
        },

        checkPermissions() {
            const hasSession = this[HAS_SESSION];
            if (!hasSession) {
                this[CHANGE_MODAL_STATE]({ name: modalName.general.LOGIN, open: true });
                return false;
            }
            return hasSession;
        },
    },
};
</script>
