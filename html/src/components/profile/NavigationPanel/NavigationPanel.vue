<template>
    <div class="navigation-panel">
        <div class="navigation-panel__group" v-for="group in groups" :key="group.id">
            <p class="text-medium navigation-panel__group-hl">{{ group.name }}</p>
            <ul class="navigation-panel__group-list">
                <li class="navigation-panel__group-item" v-for="route in group.routes" :key="route">
                    <v-link class="navigation-panel__group-link" :to="{ name: route }" exact>
                        {{ $t(`profile.routes.${route}`) }}
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
                    routes: ['Account'],
                },
                {
                    id: 2,
                    name: this.$t('profile.groups.business'),
                    routes: ['Referal', 'ProPreferences', 'Promopage', 'Seo', 'Promocodes'],
                },
                // {
                //     id: 3,
                //     name: $t('profile.groups.training'),
                //     routes: [],
                // },
            ];
        },
    },
};
</script>
