<template>
    <div class="header-logo-panel">
        <router-link v-if="hasRouter" class="header-logo-panel__link" to="/">
            <v-svg name="logo-text" width="340" height="35" />
        </router-link>
        <a v-else class="header-logo-panel__link" href="/">
            <v-svg name="logo-text" width="340" height="35" />
        </a>
        <div class="header-logo-panel__text">
            <slot />
        </div>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';

import '@images/sprites/logo.svg';
import '@images/sprites/logo-text.svg';

import './HeaderLogoPanel.critical.css';

export default {
    name: 'header-logo-panel',

    components: {
        VSvg,
    },

    computed: {
        hasRouter() {
            return !!this.$router;
        },
    },
};
</script>
