<template>
    <div class="navigation-panel">
        <div class="navigation-panel__group" v-for="group in groups" :key="group.id">
            <p class="text-medium navigation-panel__group-hl">{{ group.name }}</p>
            <ul class="navigation-panel__group-list">
                <li class="navigation-panel__group-item" v-for="route in group.routes" :key="route.name">
                    <v-link class="navigation-panel__group-link" :to="{ name: route.name }" :exact="route.exact">
                        {{ route.displayName || $t(`profile.routes.${route.name}`) }}
                    </v-link>
                </li>
            </ul>
        </div>
        <br />
        <v-link tag="button" class="navigation-panel__group-link" @click.prevent="onLogout">
            Выйти
        </v-link>
    </div>
</template>

<script>
import VLink from '../../controls/VLink/VLink.vue';

import { NAME as AUTH_MODULE } from '../../../store/modules/Auth';
import { LOGOUT } from '../../../store/modules/Auth/actions';

import './NavigationPanel.css';
import { mapActions } from 'vuex';

export default {
    name: 'navigation-panel',

    components: {
        VLink,
    },

    computed: {
        groups() {
            return [
                {
                    id: 1,
                    name: this.$t('profile.groups.profile'),
                    routes: [
                        { name: 'Cabinet', exact: true },
                        { name: 'Preferences', exact: true },
                        { name: 'Addresses', exact: true },
                        { name: 'Payment', exact: true },
                        { name: 'Subscribes', exact: true },
                        { name: 'Messages', displayName: this.$tc('profile.format.messages', 5) },
                        { name: 'Certificates', exact: true },
                        { name: 'Bonuses', exact: true },
                        { name: 'Orders' },
                        { name: 'ReferalOrders' },
                    ],
                },
                {
                    id: 2,
                    name: this.$t('profile.groups.business'),
                    routes: [
                        { name: 'Referal', exact: true },
                        { name: 'ProPreferences', exact: true },
                        { name: 'Promopage', exact: true },
                        { name: 'Seo', exact: true },
                        { name: 'Promocodes', exact: true },
                        { name: 'Account', exact: true },
                        { name: 'Billing', exact: true },
                        { name: 'Documents', exact: true },
                    ],
                },
                {
                    id: 3,
                    name: this.$t('profile.groups.training'),
                    routes: [
                        { name: 'HowItWorks', exact: true },
                        { name: 'Guides' },
                        { name: 'Masterclasses', exact: true },
                        { name: 'QnA', exact: true },
                    ],
                },
            ];
        },
    },

    methods: {
        ...mapActions(AUTH_MODULE, [LOGOUT]),

        async onLogout() {
            try {
                await this[LOGOUT]();
            } catch (error) {
                $logger.error(error);
            }
        },
    },
};
</script>
