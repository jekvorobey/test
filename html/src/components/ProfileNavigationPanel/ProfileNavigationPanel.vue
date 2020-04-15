<template>
    <general-popup-panel
        popover-class="tooltip--white profile-navigation-panel"
        placement="bottom"
        trigger="hover"
        :disabled="!hasSession"
    >
        <slot />
        <template v-slot:header>
            <span />
        </template>
        <template v-slot:body>
            <navigation-panel class="profile-navigation-panel__navigation" :groups="groups" />
        </template>
    </general-popup-panel>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';

import GeneralPopupPanel from '@components/GeneralPopupPanel/GeneralPopupPanel.vue';
import NavigationPanel from '@components/profile/NavigationPanel/NavigationPanel.vue';

import { mapActions, mapState, mapGetters } from 'vuex';
import { NAME as AUTH_MODULE, HAS_SESSION, USER, REFERRAL_PARTNER } from '@store/modules/Auth';

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
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapState(AUTH_MODULE, {
            [REFERRAL_PARTNER]: state => (state[USER] && state[USER][REFERRAL_PARTNER]) || false,
        }),

        groups() {
            const groups = [
                {
                    id: 1,
                    routes: [
                        { name: 'Cabinet', exact: true },
                        { name: 'Messages', displayName: this.$tc('profile.format.messages', 5) },
                        { name: 'Orders' },
                    ],
                },
            ];

            if (this[REFERRAL_PARTNER])
                groups.push({
                    id: 2,
                    routes: [
                        { name: 'Referal', exact: true },
                        { name: 'Account', exact: true },
                        { name: 'Billing', exact: true },
                        { name: 'Documents', exact: true },
                        // { name: 'Masterclasses', exact: true },
                    ],
                });

            return groups;
        },
    },
};
</script>
