<template>
    <div class="navigation-panel">
        <div class="navigation-panel__group" v-for="group in groups" :key="group.id">
            <p v-if="group.name" class="text-medium navigation-panel__group-hl">{{ group.name }}</p>
            <ul class="navigation-panel__group-list">
                <li class="navigation-panel__group-item" v-for="route in group.routes" :key="route.name">
                    <v-link class="navigation-panel__group-link" :to="{ name: route.name }" :exact="route.exact">
                        {{ route.displayName || $t(`profile.routes.${route.name}`) }}
                    </v-link>
                </li>
            </ul>
        </div>
        <div class="navigation-panel__group" key="logout">
            <ul class="navigation-panel__group-list">
                <li class="navigation-panel__group-item">
                    <v-link tag="button" class="navigation-panel__group-link" @click.prevent="onLogout">
                        Выйти
                    </v-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';

import { mapActions } from 'vuex';
import { NAME as AUTH_MODULE } from '@store/modules/Auth';
import { LOGOUT } from '@store/modules/Auth/actions';

import './NavigationPanel.css';

export default {
    name: 'navigation-panel',

    components: {
        VLink,
    },

    props: {
        groups: {
            type: Array,
            default() {
                return [];
            },
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
