<template>
    <general-popup-panel
        popover-class="tooltip--white profile-navigation-panel"
        placement="bottom"
        :open="hasSession && isProfilePanelOpen"
        @hide="onClose"
    >
        <slot />
        <template v-slot:header>
            <button class="general-popup-panel__header-close" @click="onClose">
                <v-svg name="cross" width="24" height="24" />
            </button>
        </template>
        <template v-slot:body>
            <navigation-panel class="profile-navigation-panel__navigation" :groups="groups" />
        </template>
    </general-popup-panel>
</template>

<script>
import VSvg from '../controls/VSvg/VSvg.vue';
import VLink from '../controls/VLink/VLink.vue';

import GeneralPopupPanel from '../GeneralPopupPanel/GeneralPopupPanel.vue';
import NavigationPanel from '../profile/NavigationPanel/NavigationPanel.vue';

import { mapActions, mapState, mapGetters } from 'vuex';
import { IS_PROFILE_PANEL_OPEN } from '../../store';
import { SET_PROFILE_PANEL_OPEN } from '../../store/actions';

import { NAME as AUTH_MODULE, HAS_SESSION } from '../../store/modules/Auth';

import '../../assets/images/sprites/cross.svg';
import './ProfileNavigationPanel.css';

export default {
    name: 'profile-navigation-panel',

    components: {
        VSvg,
        VLink,

        GeneralPopupPanel,
        NavigationPanel,
    },

    computed: {
        ...mapState([IS_PROFILE_PANEL_OPEN]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),

        groups() {
            return [
                {
                    id: 1,
                    routes: [
                        { name: 'Cabinet', exact: true },
                        { name: 'Messages', displayName: this.$tc('profile.format.messages', 5) },
                        { name: 'Orders' },
                        { name: 'ReferalOrders' },
                    ],
                },
                {
                    id: 2,
                    routes: [
                        { name: 'Referal', exact: true },
                        { name: 'Account', exact: true },
                        { name: 'Billing', exact: true },
                        { name: 'Documents', exact: true },
                        { name: 'Masterclasses', exact: true },
                    ],
                },
            ];
        },
    },

    methods: {
        ...mapActions([SET_PROFILE_PANEL_OPEN]),

        onClose() {
            this[SET_PROFILE_PANEL_OPEN](false);
        },
    },
};
</script>
