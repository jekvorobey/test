<template>
    <div class="header-logo-panel">
        <router-link class="header-logo-panel__link" to="/">
            <v-svg name="logo-text" width="340" height="35" />
        </router-link>
        <div class="header-logo-panel__text">
            {{ $t('header.middle.professionals') }}
        </div>
    </div>
</template>

<script>
import VSvg from '../../controls/VSvg/VSvg.vue';

import '../../../assets/images/sprites/logo.svg';
import '../../../assets/images/sprites/logo-text.svg';

import './HeaderLogoPanel.critical.css';

export default {
    name: 'header-logo-panel',

    components: {
        VSvg,
    },
};
</script>
