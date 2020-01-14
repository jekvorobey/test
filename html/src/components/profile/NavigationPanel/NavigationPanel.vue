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
        <v-link class="navigation-panel__group-link" to="/">Выйти</v-link>
    </div>
</template>

<script>
import VLink from '../../controls/VLink/VLink.vue';

import './NavigationPanel.css';

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
                        { name: 'Account', exact: true },
                        { name: 'Preferences', exact: true },
                        { name: 'Addresses', exact: true },
                        { name: 'Payment', exact: true },
                        { name: 'Subscribes', exact: true },
                        { name: 'Messages', displayName: this.$tc('profile.format.messages', 5) },
                        { name: 'Certificates', exact: true },
                        { name: 'Bonuses', exact: true },
                        { name: 'Orders' },
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
                    ],
                },
                {
                    id: 3,
                    name: this.$t('profile.groups.training'),
                    routes: [
                        { name: 'Guides' },
                        // { name: 'Masterclasses', exact: true },
                        { name: 'QnA', exact: true },
                    ],
                },
            ];
        },
    },
};
</script>
