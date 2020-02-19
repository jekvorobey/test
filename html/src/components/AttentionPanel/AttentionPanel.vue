<template>
    <div class="attention-panel">
        <div class="attention-panel__icon">
            <v-svg name="info-middle" width="24" height="24" />
        </div>
        <slot />
    </div>
</template>

<script>
import VSvg from '../controls/VSvg/VSvg.vue';

import '../../assets/images/sprites/info-middle.svg';
import './AttentionPanel.css';

export default {
    name: 'attention-panel',

    components: {
        VSvg,
    },
};
</script>