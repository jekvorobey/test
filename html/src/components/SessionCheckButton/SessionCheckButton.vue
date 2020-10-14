<template>
    <component :is="component" v-on="handlers">
        <slot />
    </component>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';

import { mapState, mapActions } from 'vuex';
import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';
import { NAME as AUTH_MODULE, HAS_SESSION } from '@store/modules/Auth';

import { modalName, authMode } from '@enums';

export default {
    name: 'session-check-button',

    components: {
        VButton,
    },

    props: {
        component: {
            type: [Object, String],
            default() {
                return VButton;
            },
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
            e.preventDefault();
            e.stopPropagation();
            if (this.checkPermissions()) this.$emit('click', e);
        },

        checkPermissions() {
            const hasSession = this[HAS_SESSION];
            if (!hasSession) {
                this[CHANGE_MODAL_STATE]({
                    name: modalName.general.AUTH,
                    open: true,
                    state: {
                        activeTab: authMode.LOGIN,
                    },
                });
                return false;
            }

            return hasSession;
        },
    },
};
</script>
