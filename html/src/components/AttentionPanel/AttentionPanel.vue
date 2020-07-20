<template>
    <div class="attention-panel">
        <div class="attention-panel__icon">
            <v-svg name="alert-new" width="24" height="24" />
        </div>
        <slot />
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';

import '@images/sprites/alert-new.svg';
import './AttentionPanel.css';

export default {
    name: 'attention-panel',

    components: {
        VSvg,
    },
};
</script>