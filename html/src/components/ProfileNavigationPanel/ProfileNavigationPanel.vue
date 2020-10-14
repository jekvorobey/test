<template>
    <general-popup-panel
        popover-class="tooltip--white profile-navigation-panel"
        placement="bottom"
        trigger="hover"
        :disabled="isTabletLg || !hasSession"
    >
        <slot />
        <template v-slot:header>
            <span />
        </template>
        <template v-slot:body>
            <navigation-panel class="profile-navigation-panel__navigation" :groups="groups" disable-links />
        </template>
    </general-popup-panel>
</template>

<script>
import GeneralPopupPanel from '@components/GeneralPopupPanel/GeneralPopupPanel.vue';
import NavigationPanel from '@components/profile/NavigationPanel/NavigationPanel.vue';

import { mapState } from 'vuex';
import { NAME as AUTH_MODULE, HAS_SESSION, USER, REFERRAL_PARTNER, UNREAD_MESSAGES } from '@store/modules/Auth';

import './ProfileNavigationPanel.css';

export default {
    name: 'profile-navigation-panel',

    components: {
        GeneralPopupPanel,
        NavigationPanel,
    },

    computed: {
        ...mapState(AUTH_MODULE, [HAS_SESSION, UNREAD_MESSAGES]),
        ...mapState(AUTH_MODULE, {
            [REFERRAL_PARTNER]: (state) => (state[USER] && state[USER][REFERRAL_PARTNER]) || false,
        }),

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        groups() {
            const groups = [
                {
                    id: 1,
                    routes: [
                        { name: 'Cabinet', exact: true },
                        {
                            name: 'Messages',
                            displayName:
                                `${this.$tc('profile.format.messages')}` +
                                (this[UNREAD_MESSAGES] ? ` (${this[UNREAD_MESSAGES]})` : ''),
                        },
                        { name: 'Addresses' },
                        { name: 'Orders' },
                    ],
                },
            ];

            // #60151
            // if (this[REFERRAL_PARTNER]) {
            //     groups.push({
            //         id: 2,
            //         routes: [
            //             { name: 'Referal', exact: true },
            //             { name: 'Account', exact: true },
            //             { name: 'Documents', exact: true },
            //             // { name: 'Masterclasses', exact: true },
            //         ],
            //     });
            // }

            return groups;
        },
    },
};
</script>
